<template>
  <div>demo
    <KPop theme="clean">
      <template #trigger="{toggle}">
      <k-btn @click="toggle">hi</k-btn>
      </template>
        hello
    </KPop>

  </div>

</template>

<script>
import "./../../../themes/clean.scss"
export default {
  name: "Demo",
  components: {
    KPop: () => ({ component: import("./../../../src/Pop/k-pop.vue") })
  },
}
</script>

<style>

</style>
