
/**
 * k-pop
 * version: 0.6.1,
 * (c) Christian Kienle, 2019
 * LICENCE: MIT
 * http://github.com/christiankienle/k-pop
*/
import { Portal } from '@linusborg/vue-simple-portal';
import Popper from 'popper.js';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

// @ts-check

/**
 * @param {any} cls
 * @returns {boolean}
 */
var invalidClasses = function invalidClasses(cls) {
  return typeof cls === "string" && cls.length > 0;
};
/**
 * @typedef {string | null | undefined} Value
 *
 * @returns {Array.<string> | null}
 * @param {Array.<Value>} classes
 */


var _classes = function _classes(classes) {
  // Filter out null, undefined and ""
  var onlyClasses = classes.filter(invalidClasses);

  if (onlyClasses.length === 0) {
    return null;
  } // @ts-ignore


  return onlyClasses;
};

// Adopted from https://raw.githubusercontent.com/egoist/vue-no-ssr
// LICENSE: see LICENSE-no-ssr.text
var NoSsr = {
  name: "NoSsr",
  functional: true,
  props: {
    placeholder: String,
    placeholderTag: {
      type: String,
      default: "div"
    }
  },
  render: function render(h, _ref) {
    var parent = _ref.parent,
        slots = _ref.slots,
        props = _ref.props;

    var _slots = slots(),
        _slots$default = _slots.default,
        defaultSlot = _slots$default === void 0 ? [] : _slots$default,
        placeholderSlot = _slots.placeholder;

    if (parent._isMounted) {
      return defaultSlot;
    }

    parent.$once("hook:mounted", function () {
      parent.$forceUpdate();
    });

    if (props.placeholderTag && (props.placeholder || placeholderSlot)) {
      return h(props.placeholderTag, {
        class: ["no-ssr-placeholder"]
      }, props.placeholder || placeholderSlot);
    } // Return a placeholder element for each child in the default slot
    // Or if no children return a single placeholder


    return defaultSlot.length > 0 ? defaultSlot.map(function () {
      return h(false);
    }) : h(false);
  }
};

var boundaries = ["scrollParent", "viewport", "window"];
var defaultBoundary = boundaries[0];
var isValidBoundary = function isValidBoundary(value) {
  return boundaries.indexOf(value) >= 0;
};

var AUTO = "auto";
var EQUALS_TRIGGER = "equal-trigger";
var AT_LEAST_TRIGGER = "at-least-trigger";
var all = [AUTO, // default
EQUALS_TRIGGER, AT_LEAST_TRIGGER];
var isValid = function isValid(value) {
  return all.indexOf(value) >= 0;
};
var defaultMode = AUTO;

var KPopTrigger = {
  mounted: function mounted() {
    this.$forceUpdate();
  },
  updated: function updated() {
    this.$parent.popperReference = this.$el;
    this.$parent.updatePopperInstance();
  },
  render: function render(h) {
    return this.$scopedSlots.default();
  }
}; // Because IE does not support Number.MAX_SAFE_INTEGER we hardcode
// it's value here.

var maxSafeInt = Math.pow(2, 53) - 1;
var isBrowser = typeof window !== "undefined" && (typeof document === "undefined" ? "undefined" : _typeof(document)) !== undefined;
var script = {
  // eslint-disable-next-line vue/name-property-casing
  name: "k-pop",
  components: {
    KPopTrigger: KPopTrigger,
    NoSsr: NoSsr,
    Portal: Portal,
    VpArrow: {
      render: function render(h) {
        return h("span");
      }
    }
  },
  props: {
    bodyStyles: {
      type: Object,
      default: function _default() {}
    },
    portalId: {
      default: function _default() {
        return "k-pop-portal-container";
      },
      type: String
    },
    offset: {
      type: Number,
      default: 0
    },
    adjustsBodyWidth: {
      type: Boolean,
      default: false
    },
    adjustsVisibility: {
      type: Boolean,
      default: true
    },
    boundary: {
      type: String,
      default: defaultBoundary,
      validator: isValidBoundary
    },
    bodySizeMode: {
      type: String,
      default: defaultMode,
      validator: isValid
    },
    theme: {
      type: String,
      default: null
    },
    bodyClass: {
      type: String,
      default: ""
    },
    defaultBodyZIndex: {
      type: [Number, String],
      default: maxSafeInt
    },
    arrowClass: {
      type: String,
      default: null
    },
    transition: {
      type: String,
      default: "fade"
    },
    withArrow: {
      type: Boolean,
      default: false
    },
    flips: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    modifiers: {
      type: Object,
      default: function _default() {}
    },
    placement: {
      type: String,
      validator: function validator(value) {
        return Popper.placements.indexOf(value) >= 0;
      },
      default: "bottom"
    }
  },
  data: function data() {
    return {
      visible_: this.visible,
      outOfBoundaries_: false
    };
  },
  computed: {
    bodySizeMode_: function bodySizeMode_() {
      // Handle deprecated first for compatibility
      if (this.adjustsBodyWidth) {
        return EQUALS_TRIGGER;
      }

      return this.bodySizeMode;
    },
    slotProps: function slotProps() {
      return {
        visible: this.visible_,
        show: this.show,
        hide: this.hide,
        toggle: this.toggle
      };
    },
    portalSelector: function portalSelector() {
      return "#".concat(this.portalId);
    },
    // This computed prop simply references every prop that, when changed
    // should cause the Popper-instance to be recreated.
    stateThatRequiredPopperInstanceUpdate: function stateThatRequiredPopperInstanceUpdate() {
      return {
        offset: this.offset,
        flips: this.flips,
        withArrow: this.withArrow,
        placement: this.placement
      };
    },
    hasCustomTriggerLogic: function hasCustomTriggerLogic() {
      return this.$slots.trigger == null && this.$scopedSlots.trigger != null;
    },
    arrowClasses: function arrowClasses() {
      var theme = this.theme,
          arrowClass = this.arrowClass;
      return _classes([arrowClass, theme ? "kpop-arrow" : null]);
    },
    bodyStyles_: function bodyStyles_() {
      var result = _objectSpread({}, this.bodyStyles, {
        zIndex: this.defaultBodyZIndex
      });

      if (this.theme == null && this.adjustsVisibility) {
        // We cannot adjust "display" because this will result in the popover body jumping around.
        result.visibility = this.visible_ && this.outOfBoundaries_ === false ? "visible" : "hidden";
      }

      return result;
    },
    bodyClasses: function bodyClasses() {
      var theme = this.theme,
          bodyClass = this.bodyClass,
          withArrow = this.withArrow;
      var bodyClassAsArray = bodyClass.split(" ");
      return _classes([].concat(_toConsumableArray(bodyClassAsArray), ["kpop-body", theme ? "kpop-theme-".concat(this.theme) : null, !withArrow ? "kpop-no-arrow" : null]));
    },
    // We merge the user defined modifiers with the modifiers required by FdPopper
    modifiers_: function modifiers_() {
      return _objectSpread({
        updateState: {
          enabled: true,
          order: 9999999,
          fn: this.modifier_updateState
        },
        bodySizeMode: {
          enabled: true,
          order: 0,
          fn: this.modifier_bodySizeMode
        },
        flip: {
          enabled: this.flips
        },
        arrow: {
          enabled: this.withArrow
        },
        preventOverflow: {
          enabled: true,
          escapeWithReference: true,
          boundariesElement: this.boundary
        },
        offset: {
          enabled: true,
          offset: "0,".concat(this.offset)
        }
      }, this.modifiers);
    }
  },
  watch: {
    adjustsBodyWidth: function adjustsBodyWidth() {
      this.updatePopperInstance();
    },
    stateThatRequiredPopperInstanceUpdate: {
      deep: true,
      handler: function handler() {
        this.updatePopperInstance();
      }
    },
    visible: function visible(_visible) {
      this.visible_ = _visible;

      if (_visible && this.popperInstance == null) {
        this.updatePopperInstance();
      }

      this.scheduleUpdate();
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.destroyPopperInstance();
  },
  mounted: function mounted() {
    this.$forceUpdate();
  },
  methods: {
    modifier_bodySizeMode: function modifier_bodySizeMode(data) {
      var mode = this.bodySizeMode_;

      if (mode === AUTO) {
        return data;
      }

      var instance = data.instance,
          offsets = data.offsets;
      var reference = instance.reference,
          popper = instance.popper;
      var referenceWidth = instance.reference.clientWidth;

      if (mode === AT_LEAST_TRIGGER) {
        popper.style.minWidth = referenceWidth + "px";
        return data;
      }

      if (mode === EQUALS_TRIGGER) {
        var delta = referenceWidth - offsets.popper.width;
        popper.style.width = referenceWidth + "px";
        offsets.popper.width = referenceWidth;
        offsets.popper.left = offsets.popper.left - 0.5 * delta;
        return data;
      }

      return data;
    },
    modifier_updateState: function modifier_updateState(data) {
      var rawOutOfBoundaries = data.attributes["x-out-of-boundaries"];
      var isOutOfBoundaries = rawOutOfBoundaries === true || rawOutOfBoundaries === "" || rawOutOfBoundaries === "true";
      this.outOfBoundaries_ = isOutOfBoundaries;
      return data;
    },
    handleClickOnTrigger: function handleClickOnTrigger() {
      if (this.hasCustomTriggerLogic) {
        return;
      }

      this.toggle();
    },
    destroyPopperInstance: function destroyPopperInstance() {
      if (!this.popperInstance) {
        return;
      }

      this.popperInstance.destroy();
      this.popperInstance = null;
    },
    updatePopperInstance: function updatePopperInstance() {
      this.destroyPopperInstance();
      var placement = this.placement,
          modifiers = this.modifiers_,
          popperReference = this.popperReference;

      if (popperReference == null) {
        return;
      }

      var body = this.$refs.body;

      if (body == null) {
        return;
      }

      var options = {
        modifiers: modifiers,
        placement: placement
      };
      this.popperInstance = new Popper(popperReference, body, options);
    },
    scheduleUpdate: function scheduleUpdate() {
      if (this.popperInstance) {
        this.popperInstance.scheduleUpdate();
      }
    },
    setVisible: function setVisible(newVisible) {
      this.visible_ = newVisible;
      this.$emit("update:visible", this.visible_);

      if (this.visible_ && this.popperInstance == null) {
        this.updatePopperInstance();
      }

      setTimeout(this.scheduleUpdate);
    },
    show: function show() {
      this.setVisible(true);
    },
    hide: function hide(event) {
      this.setVisible(false);
    },
    toggle: function toggle() {
      this.setVisible(!this.visible_);
    }
  }
};

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('k-pop-trigger', {
    ref: "trigger",
    nativeOn: {
      "click": function click($event) {
        return _vm.handleClickOnTrigger($event);
      }
    }
  }, [_vm._t("trigger", null, null, _vm.slotProps)], 2), _vm._v(" "), _c('no-ssr', [_c('portal', {
    attrs: {
      "selector": _vm.portalSelector
    }
  }, [_c('div', {
    ref: "body",
    class: _vm.bodyClasses,
    style: _vm.bodyStyles_,
    attrs: {
      "aria-hidden": String(!_vm.visible_)
    }
  }, [_vm._t("default", null, null, _vm.slotProps), _vm._v(" "), _c('vp-arrow', {
    class: _vm.arrowClasses,
    attrs: {
      "x-arrow": ""
    }
  })], 2)])], 1)], 1);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

var KPop = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

KPop.install = function (_vue) {
  _vue.component("k-pop", KPop);
};

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  Vue.use(KPop);
}

export default KPop;
