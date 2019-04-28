var isVueComponent = function isVueComponent(component) {
  return component != null && component._isVue;
};

export default (function (ref) {
  if (ref == null) {
    if (process.env.NODE_ENV === "development") {
      throw Error("[FdPopper] cannot get element from null-ref.");
    }

    return;
  }

  if (isVueComponent(ref)) {
    var el = ref.$el;

    if (process.env.NODE_ENV === "development") {
      if (el == null) {
        throw Error("[FdPopper] ref \"".concat(ref, "\" is not a Vue component\u2026"));
      }
    }

    return el;
  }

  return ref;
});