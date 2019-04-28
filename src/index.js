import Pop from "./Pop"

if (typeof window !== "undefined" && window.Vue && window.Vue === Vue) {
  Vue.use(Pop)
}

export default Pop
