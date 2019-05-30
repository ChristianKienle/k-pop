<template>
  <div>
    <k-pop-trigger
      ref="trigger"
      @click.native="handleClickOnTrigger"
    >
      <slot
        name="trigger"
        v-bind="slotProps"
      />
    </k-pop-trigger>
    <no-ssr>
      <portal :selector="portalSelector">
        <div ref="body" :class="bodyClasses" :style="bodyStyles" :aria-hidden="String(!visible_)">
          <slot v-bind="slotProps" />
          <vp-arrow
            x-arrow
            :class="arrowClasses"
          />
        </div>
      </portal>
    </no-ssr>
  </div>
</template>

<script>
import { shortId, NoSsr, normalizedClasses } from "./helper"
import { Portal } from "./../vendor/vue-simple-portal.umd.min"
// import { Portal } from "@linusborg/vue-simple-portal"
import Popper from "popper.js"

const KPopTrigger = {
  mounted() {
    this.$forceUpdate()
  },
  updated() {
    this.$parent.popperReference = this.$el
    this.$parent.updatePopperInstance()
  },
  render(h) {
    return this.$scopedSlots.default()
  }
}

// Because IE does not support Number.MAX_SAFE_INTEGER we hardcode
// it's value here.
const maxSafeInt = Math.pow(2, 53) - 1
const isBrowser = typeof window !== "undefined" && typeof document !== undefined
import { isValidBoundary, defaultBoundary } from "./boundary"

export default {
  name: "k-pop",
  components: {
    KPopTrigger,
    NoSsr,
    Portal,
    VpArrow: { render: h => h("span") }
  },
  props: {
    portalId: { default: () => `k-pop-portal-container`, type: String },
    offset: { type: Number, default: 0 },
    adjustsBodyWidth: { type: Boolean, default: false },
    adjustsVisibility: { type: Boolean, default: true },
    boundary: {
      type: String,
      default: defaultBoundary,
      validator: isValidBoundary
    },
    theme: { type: String, default: null },
    bodyClass: { type: String, default: "" },
    defaultBodyZIndex: { type: [Number, String], default: maxSafeInt },
    arrowClass: { type: String, default: null },
    transition: { type: String, default: "fade" },
    withArrow: { type: Boolean, default: false },
    flips: { type: Boolean, default: true },
    visible: { type: Boolean, default: false },
    modifiers: {
      type: Object,
      default: () => {}
    },
    placement: {
      type: String,
      validator: value => Popper.placements.indexOf(value) >= 0,
      default: "bottom"
    }
  },
  data() {
    return {
      visible_: this.visible,
      outOfBoundaries_: false
    }
  },
  computed: {
    slotProps() {
      return {
        visible: this.visible_,
        show: this.show,
        hide: this.hide,
        toggle: this.toggle
      }
    },
    portalSelector() {
      return `#${this.portalId}`
    },
    // This computed prop simply references every prop that, when changed
    // should cause the Popper-instance to be recreated.
    stateThatRequiredPopperInstanceUpdate() {
      return {
        offset: this.offset,
        flips: this.flips,
        withArrow: this.withArrow,
        placement: this.placement
      }
    },
    hasCustomTriggerLogic() {
      return this.$slots.trigger == null && this.$scopedSlots.trigger != null
    },
    arrowClasses() {
      const { theme, arrowClass } = this
      return normalizedClasses([arrowClass, theme ? "kpop-arrow" : null])
    },
    bodyStyles() {
      const result = {
        zIndex: this.defaultBodyZIndex
      }

      if(this.theme == null && this.adjustsVisibility) {
        result.display = (this.visible_ && this.outOfBoundaries_ === false) ? "block" : "none"
      }
      return result
    },
    bodyClasses() {
      const { theme, bodyClass, withArrow } = this
      const bodyClassAsArray = bodyClass.split(" ")
      return normalizedClasses([
        ...bodyClassAsArray,
        "kpop-body",
        theme ? `kpop-theme-${this.theme}` : null,
        !withArrow ? "kpop-no-arrow" : null
      ])
    },
    // We merge the user defined modifiers with the modifiers required by FdPopper
    modifiers_() {
      return {
        updateState: {
          enabled: true,
          order: 9999999,
          fn: this.handleNewPopperState
        },
        adjustsBodyWidth: {
          enabled: this.adjustsBodyWidth,
          order: 0,
          fn(data) {
            const { instance, offsets } = data
            // we cant use style.width because it may be something like 100%
            const referenceWidth = instance.reference.clientWidth
            // data.offsets.popper.width = data.styles.width =
        // Math.max(data.offsets.reference.width, data.offsets.popper.width);
            const delta = referenceWidth - offsets.popper.width
            instance.popper.style.width = referenceWidth + "px"
            offsets.popper.width = referenceWidth
            offsets.popper.left = offsets.popper.left - (0.5 * delta)
            return data
          }
        },
        flip: {
          enabled: this.flips
        },
        arrow: { enabled: this.withArrow },
        preventOverflow: {
          enabled: true,
          escapeWithReference: true,
          boundariesElement: this.boundary
        },
        offset: {
          enabled: true,
          offset: `0,${this.offset}`
        },
        ...this.modifiers
      }
    }
  },
  watch: {
    adjustsBodyWidth() {
      this.updatePopperInstance()
    },
    stateThatRequiredPopperInstanceUpdate: {
      deep: true,
      handler() {
        this.updatePopperInstance()
      }
    },
    visible(visible) {
      this.visible_ = visible
      if (visible && this.popperInstance == null) {
        this.updatePopperInstance()
      }
      this.scheduleUpdate()
    }
  },
  beforeDestroy() {
    this.destroyPopperInstance()
  },
  mounted() {
    this.$forceUpdate()
  },
  methods: {
    handleNewPopperState(data) {
      const rawOutOfBoundaries = data.attributes["x-out-of-boundaries"];
      const isOutOfBoundaries = rawOutOfBoundaries === true || rawOutOfBoundaries === "" || rawOutOfBoundaries === "true";
      this.outOfBoundaries_ = isOutOfBoundaries;
      return data
    },
    handleClickOnTrigger() {
      if(this.hasCustomTriggerLogic) {
        return
      }
      this.toggle()
    },
    destroyPopperInstance() {
      if (!this.popperInstance) {
        return
      }
      this.popperInstance.destroy()
      this.popperInstance = null
    },
    updatePopperInstance() {
      this.destroyPopperInstance()

      const { placement, modifiers_: modifiers, popperReference } = this
      if(popperReference == null) {
        return
      }

      const body = this.$refs.body
      if(body == null) { return }

      const options = { modifiers, placement }
      this.popperInstance = new Popper(popperReference, body, options)
    },
    scheduleUpdate() {
      if (this.popperInstance) {
        this.popperInstance.scheduleUpdate()
      }
    },
    setVisible(newVisible) {
      this.visible_ = newVisible
      this.$emit("update:visible", this.visible_)
      if (this.visible_ && this.popperInstance == null) {
        this.updatePopperInstance()
      }
      this.$nextTick(() => {
        this.scheduleUpdate();
      })
    },
    show() {
      this.setVisible(true)
    },
    hide(event) {
      this.setVisible(false)
    },
    toggle() {
      this.setVisible(!this.visible_)
    }
  }
}
</script>
