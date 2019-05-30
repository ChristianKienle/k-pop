<template>
<div style="display: flex;">
  <k-pop
    body-size-mode="at-least-trigger"
    with-arrow
    theme="clean"
  >
    <button slot="trigger">Small Trigger</button>
    <p style="padding: 20px; width: 250px;">
      I am a Popover Body.
    </p>
  </k-pop>

  <k-pop
    body-size-mode="at-least-trigger"
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
