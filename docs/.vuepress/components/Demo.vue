<template>
  <div>demo

    <KPop theme="clean">
      <template #trigger="{toggle}">
      <Trigger @click="toggle">hi</Trigger>
      </template>
        hello
    </KPop>

  </div>

</template>

<script>
import "./../../../themes/clean.css"
export default {
  name: "Demo",
  components: {
    KPop: () => ({ component: import("./../../../src/Pop/Pop.vue") })
  },
}
</script>

<style>

</style>
