import KPop from "./../../src/index"
import PopperJS from "popper.js"
import VueSimplePortal from "@linusborg/vue-simple-portal";
import pageComponents from '@internal/page-components'

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.use(VueSimplePortal)
  Vue.use(KPop)
  // Without this errors are logged.
  // This is the suggested workaround.
  // see https://github.com/vuejs/vuepress/issues/1173
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }
}