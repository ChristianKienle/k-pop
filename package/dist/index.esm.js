
/**
 * k-pop
 * version: 0.1.4,
 * (c) Christian Kienle, 2019
 * LICENCE: MIT
 * http://github.com/christiankienle/k-pop
*/
import _regeneratorRuntime from '../node_modules/@babel/runtime/regenerator';
import { Portal } from '@linusborg/vue-simple-portal';
import Popper from 'popper.js';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
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

var isVueComponent = function isVueComponent(component) {
  return component != null && component._isVue;
};

var elFromRef = (function (ref) {
  if (ref == null) {

    return;
  }

  if (isVueComponent(ref)) {
    var el = ref.$el;

    return el;
  }

  return ref;
});

var VpArrow = {
  render: function render(h) {
    return h("span");
  }
};
var VpBody = {
  render: function render(h) {
    return h("div", [this.$slots.default]);
  }
};
var VpTrigger = {
  render: function render(h) {
    return h("span", this.$slots.default);
  }
};
var PLACEMENTS = Popper.placements;
var script = {
  name: "k-pop",
  components: {
    Portal: Portal,
    VpTrigger: VpTrigger,
    VpArrow: VpArrow,
    VpBody: VpBody
  },
  props: {
    offset: {
      type: Number,
      default: 30
    },
    theme: {
      type: String,
      default: null
    },
    bodyClass: {
      type: String,
      default: null
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
        return PLACEMENTS.indexOf(value) >= 0;
      },
      default: "bottom"
    }
  },
  data: function data() {
    return {
      visible_: this.visible
    };
  },
  computed: {
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
    bodyClasses: function bodyClasses() {
      var theme = this.theme,
          bodyClass = this.bodyClass,
          withArrow = this.withArrow;
      return _classes([bodyClass, theme ? "kpop-theme-".concat(this.theme, " kpop-body") : null, !withArrow ? "kpop-no-arrow" : null]);
    },
    // We merge the user defined modifiers with the modifiers required by FdPopper
    modifiers_: function modifiers_() {
      return _objectSpread({
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
          offset: "0,".concat(this.offset)
        }
      }, this.modifiers);
    }
  },
  watch: {
    stateThatRequiredPopperInstanceUpdate: {
      deep: true,
      handler: function handler() {
        this.updatePopperInstance();
      }
    },
    visible: function visible(_visible) {
      this.visible_ = _visible;
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.destroyPopperInstance();

    if (!this.hasCustomTriggerLogic) {
      this.elements().rigger.removeEventListener("click", this.toggle, false);
    }
  },
  mounted: function () {
    var _mounted = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.$nextTick();

            case 2:
              this.updatePopperInstance();

              if (!this.hasCustomTriggerLogic) {
                this.elements().trigger.addEventListener("click", this.toggle, false);
              }

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function mounted() {
      return _mounted.apply(this, arguments);
    }

    return mounted;
  }(),
  methods: {
    destroyPopperInstance: function destroyPopperInstance() {
      if (!this.popperInstance) {
        return;
      }

      this.popperInstance.destroy();
      this.popperInstance = null;
    },
    updatePopperInstance: function updatePopperInstance() {
      this.destroyPopperInstance();
      var reference = this.elements().trigger || this.trigger;
      var body = this.elements().body;
      var options = {
        modifiers: this.modifiers_,
        placement: this.placement
      };
      this.popperInstance = new Popper(reference, body, options);
    },
    scheduleUpdate: function scheduleUpdate() {
      if (this.popperInstance) {
        this.popperInstance.scheduleUpdate();
      }
    },
    setVisible: function setVisible(newVisible) {
      this.visible_ = newVisible;
      this.$emit("update:visible", this.visible_);
      this.scheduleUpdate();
    },
    show: function show() {
      this.setVisible(true);
    },
    hide: function hide(event) {
      if (event != null) {
        var target = event.target;

        var _this$elements = this.elements(),
            trigger = _this$elements.trigger;

        var targetsReference = reference.contains(target);

        if (targetsReference) {
          return;
        }
      }

      this.setVisible(false);
    },
    toggle: function toggle() {
      this.setVisible(!this.visible_);
    },
    elements: function elements() {
      var $refs = this.$refs;
      return {
        arrow: elFromRef($refs.arrow),
        body: elFromRef($refs.body),
        trigger: elFromRef($refs.trigger)
      };
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

  return _c('div', [_c('vp-trigger', {
    ref: "trigger"
  }, [_vm._t("trigger", null, {
    "show": _vm.show,
    "hide": _vm.hide,
    "toggle": _vm.toggle
  })], 2), _vm._v(" "), _c('Portal', [_c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('vp-body', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.visible_,
      expression: "visible_"
    }],
    ref: "body",
    class: _vm.bodyClasses,
    attrs: {
      "aria-hidden": String(!_vm.visible_)
    }
  }, [_vm._t("default", null, {
    "show": _vm.show,
    "hide": _vm.hide,
    "toggle": _vm.toggle
  }), _vm._v(" "), _c('vp-arrow', {
    ref: "arrow",
    class: _vm.arrowClasses,
    attrs: {
      "x-arrow": ""
    }
  })], 2)], 1)], 1)], 1);
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

var Pop = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

Pop.install = function (_vue) {
  _vue.component("KPop", Pop);
};

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  Vue.use(Pop);
}

export default Pop;
