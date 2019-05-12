<template>
  <k-pop placement="bottom" with-arrow theme="clean">
    <template #trigger="{ show, hide }">
      <button @mouseenter="show" @mouseleave="hide">Tooltip shows hover</button>
    </template>
    Popover Body
  </k-pop>
</template>

<style lang="scss">
@import "./../../themes/clean";
</style>
