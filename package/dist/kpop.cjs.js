
/**
 * k-pop
 * version: 0.5.0,
 * (c) Christian Kienle, 2019
 * LICENCE: MIT
 * http://github.com/christiankienle/k-pop
*/
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue$1 = _interopDefault(require('vue'));
var id = _interopDefault(require('nanoid/non-secure'));
var Popper = _interopDefault(require('popper.js'));
var __vue_normalize__ = _interopDefault(require('vue-runtime-helpers/dist/normalize-component.js'));

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

function _typeof$1(obj) {
  if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
    _typeof$1 = function _typeof$1(obj) {
      return _typeof(obj);
    };
  } else {
    _typeof$1 = function _typeof$1(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
    };
  }

  return _typeof$1(obj);
}

var config = {
  selector: "vue-portal-target-".concat(id())
};

var setSelector = function setSelector(selector) {
  return config.selector = selector;
};

var isBrowser = typeof window !== 'undefined' && (typeof document === "undefined" ? "undefined" : _typeof$1(document)) !== undefined;
var TargetContainer = Vue$1.extend({
  // as an abstract component, it doesn't appear in
  // the $parent chain of components.
  // which means the next parent of any component rendered inside of this oen
  // will be the parent from which is was portal'd
  abstract: true,
  name: 'PortalOutlet',
  props: ['nodes', 'tag'],
  data: function data(vm) {
    return {
      updatedNodes: vm.nodes
    };
  },
  render: function render(h) {
    var nodes = this.updatedNodes && this.updatedNodes();
    if (!nodes) return h();
    return nodes.length < 2 && !nodes[0].text ? nodes : h(this.tag || 'DIV', nodes);
  },
  destroyed: function destroyed() {
    var el = this.$el;
    el.parentNode.removeChild(el);
  }
});
var Portal = Vue$1.extend({
  name: 'VueSimplePortal',
  props: {
    disabled: {
      type: Boolean
    },
    prepend: {
      type: Boolean
    },
    selector: {
      type: String,
      default: function _default() {
        return "#".concat(config.selector);
      }
    },
    tag: {
      type: String,
      default: 'DIV'
    }
  },
  render: function render(h) {
    if (this.disabled) {
      var nodes = this.$scopedSlots && this.$scopedSlots.default();
      if (!nodes) return h();
      return nodes.length < 2 && !nodes[0].text ? nodes : h(this.tag, nodes);
    }

    return h();
  },
  created: function created() {
    if (!this.getTargetEl()) {
      this.insertTargetEl();
    }
  },
  updated: function updated() {
    var _this = this; // We only update the target container component
    // if the scoped slot function is a fresh one
    // The new slot syntax (since Vue 2.6) can cache unchanged slot functions
    // and we want to respect that here.


    this.$nextTick(function () {
      if (!_this.disabled && _this.slotFn !== _this.$scopedSlots.default) {
        _this.container.updatedNodes = _this.$scopedSlots.default;
      }

      _this.slotFn = _this.$scopedSlots.default;
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.unmount();
  },
  watch: {
    disabled: {
      immediate: true,
      handler: function handler(disabled) {
        disabled ? this.unmount() : this.$nextTick(this.mount);
      }
    }
  },
  methods: {
    // This returns the element into which the content should be mounted.
    getTargetEl: function getTargetEl() {
      if (!isBrowser) return;
      return document.querySelector(this.selector);
    },
    insertTargetEl: function insertTargetEl() {
      if (!isBrowser) return;
      var parent = document.querySelector('body');
      var child = document.createElement(this.tag);
      child.id = this.selector.substring(1);
      parent.appendChild(child);
    },
    mount: function mount() {
      var targetEl = this.getTargetEl();
      var el = document.createElement('DIV');

      if (this.prepend && targetEl.firstChild) {
        targetEl.insertBefore(el, targetEl.firstChild);
      } else {
        targetEl.appendChild(el);
      }

      this.container = new TargetContainer({
        el: el,
        parent: this,
        propsData: {
          tag: this.tag,
          nodes: this.$scopedSlots.default
        }
      });
    },
    unmount: function unmount() {
      if (this.container) {
        this.container.$destroy();
        delete this.container;
      }
    }
  }
});

function install(_Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _Vue.component(options.name || 'portal', Portal);

  if (options.defaultSelector) {
    setSelector(options.defaultSelector);
  }
}

if (typeof window !== 'undefined' && window.Vue && window.Vue === Vue$1) {
  // plugin was inlcuded directly in a browser
  Vue$1.use(install);
}

var boundaries = ["scrollParent", "viewport", "window"];
var defaultBoundary = boundaries[0];
var isValidBoundary = function isValidBoundary(value) {
  return boundaries.indexOf(value) >= 0;
};

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
var isBrowser$1 = typeof window !== "undefined" && (typeof document === "undefined" ? "undefined" : _typeof(document)) !== undefined;
var script = {
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
    bodyStyles: function bodyStyles() {
      var result = {
        zIndex: this.defaultBodyZIndex
      };

      if (this.theme == null && this.adjustsVisibility) {
        result.display = this.visible_ && this.outOfBoundaries_ === false ? "block" : "none";
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
          fn: this.handleNewPopperState
        },
        adjustsBodyWidth: {
          enabled: this.adjustsBodyWidth,
          order: 0,
          fn: function fn(data) {
            var instance = data.instance,
                offsets = data.offsets; // we cant use style.width because it may be something like 100%

            var referenceWidth = instance.reference.clientWidth; // data.offsets.popper.width = data.styles.width =
            // Math.max(data.offsets.reference.width, data.offsets.popper.width);

            var delta = referenceWidth - offsets.popper.width;
            instance.popper.style.width = referenceWidth + "px";
            offsets.popper.width = referenceWidth;
            offsets.popper.left = offsets.popper.left - 0.5 * delta;
            return data;
          }
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
    handleNewPopperState: function handleNewPopperState(data) {
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
      var _this = this;

      this.visible_ = newVisible;
      this.$emit("update:visible", this.visible_);

      if (this.visible_ && this.popperInstance == null) {
        this.updatePopperInstance();
      }

      this.$nextTick(function () {
        _this.scheduleUpdate();
      });
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
    style: _vm.bodyStyles,
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

module.exports = KPop;
