---
displayAllHeaders: true
sidebar: auto
title: API
---

## Props

### `portalId`

|type|required|default|
|------|------|-------|
|String| no | `k-pop-portal-$shortId` |

### `offset`

|type|required|default|
|------|------|-------|
|Number| no | `0` |

### `adjustsBodyWidth`

|type|required|default|
|------|------|-------|
|Boolean| no | `false` |

### `boundary`

::: tip
Valid Boundaries are `scrollParent`, `viewport` and `window`.
:::

|type|required|default|
|------|------|-------|
|String| no |`scrollParent`|


### `theme`

|type|required|default|
|------|------|-------|
|String| no | `null` |

### `bodyClass`

| type | required | default |
|------|------|-------|
| String | no | `""` |

### `defaultBodyZIndex`

| type | required | default |
|------|------|-------|
| Number | no | `Math.pow(2, 53) - 1` |

### `arrowClass`

| type | required | default |
|------|------|-------|
| String | no | `""` |

### `withArrow`

| type | required | default |
|------|------|-------|
| Boolean | no | `true` |

### `flips`

| type | required | default |
|------|------|-------|
| Boolean | no | `true` |

### `modifiers`

| type | required | default |
|------|------|-------|
| Object | no | `{}` |

### `visible`

| type | required | default |
|------|------|-------|
| Boolean | no | `false` |

### `placement`

| type | required | default |
|------|------|-------|
| String | no | `bottom` |

## Methods

### `show()`
Shows the popover.

### `hide()`
Hides the popover.

### `toggle()`
Shows the popover when hidden. Hides the popover when shown.


## Custom Trigger

By default, `k-pop` listens for `click`-events on the trigger provided by you. If you want to take control of the whole event + trigger-mechanism you simply have to provide a scoped `trigger`-slot:

```html
<k-pop theme="clean">
  <template #trigger="{toggle}">
    <button @click="toggle">Toggle</button>
  </template>

  <!-- default slot = Popover Content -->
  Popover Body
</k-pop>
```

`k-pop` automatically stops listening for `click`-events once you provide a scoped-`trigger`-slot. The `trigger`-slot has access several slot-props.

## `trigger`-slot-props

### toggle: `Function`
When called, toggles the popover.

### show: `Function`
When called, shows the popover.

### hide: `Function`
When called, hides the popover.

## Dismiss Button inside the Popover

The `default`-slot also has access to several slot-props. This allows you to easily add a button inside your popover that hides the popover.


```html
<k-pop theme="clean">
  <template #trigger="{toggle}">
    <button @click="toggle">Toggle</button>
  </template>

  <!-- default slot = Popover Content -->
  <template #default="{hide}">
    <p>Popover Body</p>
    <button @click="hide">Hide Popover</button>
  </template>
</k-pop>
```

The `default`-slot has access to the following slot-props:

## `default`-slot-props

### toggle: `Function`
When called, toggles the popover.

### show: `Function`
When called, shows the popover.

### hide: `Function`
When called, hides the popover.

