import Vue from "vue"
import KPop from "./../../src"
import App from "./App.vue"
import HelloWorld from "./hello-world.vue"

Vue.use(KPop)

new Vue({
  render(h) {
    return h(HelloWorld)
  }
}).$mount("#app")
