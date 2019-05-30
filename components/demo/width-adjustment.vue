<template>
<div style="display: flex;">
  <k-pop
    adjusts-body-width
    with-arrow
    theme="clean"
  >
    <button slot="trigger">Small Trigger</button>
    <div style="padding: 20px; width: 250px;">
    I am a Popover Body.
    </div>
  </k-pop>
  <k-pop
    adjusts-body-width
    with-arrow
    theme="clean"
  >
    <button style="width: 250px;" slot="trigger">Show Popover</button>
    I am a Popover Body.
  </k-pop>
  </div>
</template>

<style lang="scss">
@import "./../../themes/clean";
</style>
