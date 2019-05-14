import Vue from "vue"
import KPop from "./../../src"
import App from "./App.vue"
import KPlayground from "./../k-playground.vue"

Vue.use(KPop)

new Vue({
  render(h) {
    return h(KPlayground)
  }
}).$mount("#app")
