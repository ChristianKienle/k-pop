<template>
  <div>
    <k-trigger ref="trigger" @click.native="handleClickOnTrigger">
      <slot name="trigger" v-bind="slotProps" />
    </k-trigger>
    <no-ssr>
      <portal :selector="portalSelector">
        <slot v-bind="slotProps" />
        <vp-arrow x-arrow :class="arrowClasses" />
      </portal>
    </no-ssr>
  </div>
</template>

<script>
import { shortId, NoSsr, normalizedClasses } from "./helper"
import { Portal } from "@linusborg/vue-simple-portal"
import Popper from "popper.js"

const KTrigger = {
  mounted() {
    this.$forceUpdate();
  },
  updated() {
    this.$parent.popperReference = this.$el;
    this.$parent.updatePopperInstance();
  },
  render(h) {
    return this.$scopedSlots.default();
  }
}

// Because IE does not support Number.MAX_SAFE_INTEGER we hardcode
// it's value here.
const maxSafeInt = Math.pow(2, 53) - 1
const isBrowser = typeof window !== "undefined" && typeof document !== undefined

export default {
  name: "k-pop",
  components: {
    KTrigger,
    NoSsr,
    Portal,
    VpArrow: { render: h => h("span") }
  },
  props: {
    portalId: { default: () => `k-pop-portal-${shortId()}`, type: String },
    offset: { type: Number, default: 0 },
    adjustsBodyWidth: { type: Boolean, default: false },
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
      visible_: this.visible
    }
  },
  computed: {
    slotProps() {
      return {
        show: this.show,
        hide: this.hide,
        toggle: this.toggle
      }
    },
    stateThatRequiresPopBodyToUpdate() {
      return {
        visible: this.visible_,
        bodyClasses: this.bodyClasses
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
    bodyClasses() {
      const { theme, bodyClass, withArrow } = this
      const bodyClassAsArray = bodyClass.split(" ");
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
        onShow: {
          enabled: this.adjustsBodyWidth,
          order: 999,
          fn({instance}) {
            const { popper, reference } = instance;
            popper.style.width = reference.style.width;
          }
        },
        flip: {
          enabled: this.flips
        },
        arrow: { enabled: this.withArrow },
        preventOverflow: {
          padding: 5,
          boundariesElement: "scrollParent"
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
      this.scheduleUpdate();
    },
    stateThatRequiresPopBodyToUpdate: {
      deep: true,
      handler() {
        this.updatePopBodyElement()
      }
    },
    stateThatRequiredPopperInstanceUpdate: {
      deep: true,
      handler() {
        this.updatePopperInstance()
      }
    },
    visible(visible) {
      this.visible_ = visible
    }
  },
  beforeMount() {
    if (!isBrowser) {
      return
    }
    const popBody = document.createElement("DIV")
    popBody.id = this.portalId
    this.popBody = popBody
    document.querySelector("body").appendChild(popBody)
    this.updatePopBodyElement()
  },
  beforeDestroy() {
    this.destroyPopperInstance()
  },
  mounted() {
    this.$forceUpdate();
  },
  methods: {
    handleClickOnTrigger() {
      if(this.hasCustomTriggerLogic) {
        return
      }
      this.toggle();
    },
    updatePopBodyElement() {
      const {
        popBody,
        bodyClasses
      } = this

      const { classList } = popBody

      classList.forEach(existingClass => {
        if (bodyClasses.indexOf(existingClass) < 0) {
          classList.remove(existingClass)
        }
      })

      bodyClasses.forEach(bodyClass => {
        if (!classList.contains(bodyClass)) {
          classList.add(bodyClass)
        }
      })
      popBody.style.display = this.visible_ ? "block" : "none"
      popBody.style.zIndex = this.defaultBodyZIndex
      popBody.setAttribute("aria-hidden", String(!this.visible_))
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
      if(this.popperReference == null) {
        return;
      }
      const reference = this.popperReference;
      const body = this.elements().body
      const options = {
        modifiers: this.modifiers_,
        placement: this.placement
      }
      this.popperInstance = new Popper(reference, body, options)
    },
    scheduleUpdate() {
      if (this.popperInstance) {
        this.popperInstance.scheduleUpdate()
      }
    },
    setVisible(newVisible) {
      this.visible_ = newVisible
      this.$emit("update:visible", this.visible_)
      this.scheduleUpdate()
    },
    show() {
      this.setVisible(true)
    },
    hide(event) {
      this.setVisible(false)
    },
    toggle() {
      this.setVisible(!this.visible_)
    },
    elements() {
      const { $refs } = this
      return {
        body: this.popBody,
      }
    }
  }
}
</script>
