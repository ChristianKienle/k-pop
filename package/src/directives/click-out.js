var warn = console.log;
var HANDLER = "__fundamentalvue_clickout_handler__";
/** @type {import("vue").DirectiveFunction} */

var unbind = function unbind(el, _ref) {
  var modifiers = _ref.modifiers;
  document.documentElement.removeEventListener("click", el[HANDLER], modifiers.capture);
  delete el[HANDLER];
};
/** @type {import("vue").DirectiveFunction} */


var bind = function bind(el, binding, _ref2) {
  var vm = _ref2.context;
  unbind(el, binding);
  var expression = binding.expression,
      name = binding.name,
      modifiers = binding.modifiers,
      callback = binding.value;

  if (typeof callback !== "function") {
    if (process.env.NODE_ENV !== "production") {
      warn("v-".concat(name, "=").concat(expression, " expects a function value, got ").concat(callback));
    }

    return;
  }

  var initialMacrotaskEnded = false;
  setTimeout(function () {
    return initialMacrotaskEnded = true;
  });

  el[HANDLER] = function (ev) {
    var path = ev.path || (ev.composedPath ? ev.composedPath() : undefined);

    if (initialMacrotaskEnded && (path ? path.indexOf(el) < 0 : !el.contains(ev.target))) {
      if (modifiers.stop) {
        ev.stopPropagation();
      }

      return callback.call(vm, ev);
    }
  };

  document.documentElement.addEventListener("click", el[HANDLER], modifiers.capture);
};

export default {
  bind: bind,
  unbind: unbind,
  update: function update(el, binding, vnode) {
    if (binding.value === binding.oldValue) {
      return;
    }

    bind(el, binding, vnode);
  }
}; // Adopted from https://github.com/mrastiak/vue-clickout
// Below is the original license in order to give proper credits. Thanks man.
// The MIT License (MIT)
// Copyright (c) 2015 Denis Karabaza
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.