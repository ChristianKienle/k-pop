<template>
  <k-pop
    with-arrow theme="clean" :flips="false"
    :body-styles="{
      overflowY: 'scroll',
      maxWidth: '350px',
      maxHeight: '200px'
    }"
  >
    <button slot="trigger">Show Popover</button>
    <div><div v-for="idx in indices" :key="String(idx)">
      I am part {{idx + 1}} of a wonderful popover.
    </div></div>
  </k-pop>
</template>

<script>
export default {
  data: () => ({ indices: Array.from({ length: 35 }).map((_, idx) => idx) })
}
</script>

<style lang="scss">@import "./../../themes/clean";</style>
