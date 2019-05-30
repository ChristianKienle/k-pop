---
displayAllHeaders: true
sidebar: auto
title: Examples
---

## Hello World

This is the a classical *Hello World* example:

::: example hello-world
<<< @/components/demo/hello-world.vue
:::

::: tip
The example above is not using any theme or custom styles. For this reason it looks like a bit boring. Most of the following examples are using a theme.
:::

## Close on Click Inside

This example shows you how to add a *close*-button inside the popover.

::: example click-inside
<<< @/components/demo/click-inside.vue
:::

## Show on Hover

{{ $page.lib }} is very flexible: This example shows how to show the popover on `mouseenter` and `mouseleave`. The result is a very simple tooltip.

::: example custom-trigger
<<< @/components/demo/custom-trigger.vue
:::

## Body Size Modes <Badge text="New"/>

By default, {{ $page.lib }} does not modify the width of the popover body. This default behavior is great is most cases and, at the same time, allows you to handle it manually if so desired.

After using {{ $page.lib }} for some time in [Fundamental Vue](https://github.com/SAP/fundamental-vue) (a component library) it became clear that this is not convenient enough – for certain use cases.

So, if you find yourself in the situation that the default sizing behavior is not working for you read ahead.

### `at-least-trigger`

By setting the `body-size-mode`-prop to `at-least-trigger` you tell {{ $page.lib }} to make the popover body at least as wide width as the trigger element/component. The example below contains two popovers + triggers. You will notice two things:

1. Big popovers stay big: Even when attached to a small trigger the popover body is not scaled down but just keeps it size.
2. Small popovers are made wider to match the width of the trigger.

::: example body-size-mode--at-least-trigger
<<< @/components/demo/body-size-mode--at-least-trigger.vue
:::

### `equal-trigger`

By setting the `body-size-mode`-prop to `equal-trigger` you tell {{ $page.lib }} to make the popover body the same width as the trigger element/component. The popovers below have the same width as the button.

::: example body-size-mode--equal-trigger
<<< @/components/demo/body-size-mode--equal-trigger.vue
:::
