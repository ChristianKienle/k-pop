<template>
  <div>
    <vp-trigger ref="trigger">
    <slot name="trigger" :show="show" :hide="hide" :toggle="toggle"/>
    </vp-trigger>
    <Portal>
      <transition name="fade">
        <vp-body
          :class="bodyClasses"
          v-show="visible_"
          ref="body"
          :aria-hidden="String(!visible_)"
        >
          <slot :show="show" :hide="hide" :toggle="toggle"/>
          <vp-arrow
            x-arrow
            :class="arrowClasses"
            ref="arrow"
          />
        </vp-body>
      </transition>
    </Portal>
  </div>
</template>
<script>

import classes from "./helper/classes"
const VpArrow = { render: h => h("span") };
const VpBody = {
  render(h) {
    return h("div", [this.$slots.default]);
  }
};
const VpTrigger = {
  render(h) {
    return h("span", this.$slots.default);
  },
};

import { Portal } from "@linusborg/vue-simple-portal";
import Popper from "popper.js";
import elFromRef from "./helper/el-from-ref";
export const PLACEMENTS = Popper.placements;

export default {
  name: "k-pop",
  components: { Portal, VpTrigger, VpArrow, VpBody },
  props: {
    offset: { type: Number, default: 5 },
    theme: { type: String, default: null },
    bodyClass: { type: String, default: null },
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
      validator: value => PLACEMENTS.indexOf(value) >= 0,
      default: "bottom"
    }
  },
  data() {
    return {
      visible_: this.visible
    };
  },
  computed: {
    // This computed prop simply references every prop that, when changed
    // should cause the Popper-instance to be recreated.
    stateThatRequiredPopperInstanceUpdate() {
      return {
        offset: this.offset,
        flips: this.flips,
        withArrow: this.withArrow,
        placement: this.placement
      };
    },
    hasCustomTriggerLogic() {
      return this.$slots.trigger == null && this.$scopedSlots.trigger != null;
    },
    arrowClasses() {
      const { theme, arrowClass } = this;
      return classes([
        arrowClass,
        theme ? `kpop-arrow` : null
      ])
    },
    bodyClasses() {
      const { theme, bodyClass, withArrow } = this;
      return classes([
        bodyClass,
        theme ? `kpop-theme-${this.theme} kpop-body` : null,
        !withArrow ? "kpop-no-arrow" : null
      ])
    },
    // We merge the user defined modifiers with the modifiers required by FdPopper
    modifiers_() {
      return {
        flip: {
          enabled: this.flips
        },
        arrow: {
          enabled: this.withArrow,
          element: this.withArrow ? this.elements().arrow : undefined
        },
        preventOverflow: {
          padding: 5,
          boundariesElement: "scrollParent"
        },
        offset: {
          enabled: true,
          offset: `0,${this.offset}`
       },
        ...this.modifiers
      };
    }
  },
  watch: {
    stateThatRequiredPopperInstanceUpdate: {
      deep: true,
      handler() {
        this.updatePopperInstance();
      }
    },
    visible(visible) {
      this.visible_ = visible;
    }
  },
  beforeDestroy() {
    this.destroyPopperInstance();
    if (!this.hasCustomTriggerLogic) {
      this.elements().rigger.removeEventListener("click", this.toggle, false);
    }
  },
  async mounted() {
    await this.$nextTick();
    this.updatePopperInstance();
    if (!this.hasCustomTriggerLogic) {
      this.elements().trigger.addEventListener("click", this.toggle, false);
    }
  },
  methods: {
    destroyPopperInstance() {
      if (!this.popperInstance) {
        return;
      }
      this.popperInstance.destroy();
      this.popperInstance = null;
    },
    updatePopperInstance() {
      this.destroyPopperInstance();
      const reference = this.elements().trigger || this.trigger;
      const body = this.elements().body;
      const options = {
        modifiers: this.modifiers_,
        placement: this.placement
      };
      this.popperInstance = new Popper(reference, body, options);
    },
    scheduleUpdate() {
      if (this.popperInstance) {
        this.popperInstance.scheduleUpdate();
      }
    },
    setVisible(newVisible) {
      this.visible_ = newVisible;
      this.$emit("update:visible", this.visible_);
      this.scheduleUpdate();
    },
    show() {
      this.setVisible(true);
    },
    hide(event) {
      if (event != null) {
        const { target } = event;
        const { trigger } = this.elements();
        const targetsReference = reference.contains(target);
        if (targetsReference) {
          return;
        }
      }
      this.setVisible(false);
    },
    toggle() {
      this.setVisible(!this.visible_);
    },
    elements() {
      const { $refs } = this;
      return {
        arrow: elFromRef($refs.arrow),
        body: elFromRef($refs.body),
        trigger: elFromRef($refs.trigger)
      };
    }
  }
};
</script>
