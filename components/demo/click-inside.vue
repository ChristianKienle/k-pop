<template>
  <k-pop with-arrow theme="clean">
    <button slot="trigger">Show Popover</button>

    <template #default="{hide}">
      <div>I am a Popover Body.</div>
      <button @click="hide">Click here to Hide the Popover</button>
    </template>

  </k-pop>
</template>

<style lang="scss">
@import "./../../themes/clean";
</style>
