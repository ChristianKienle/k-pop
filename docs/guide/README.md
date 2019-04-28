---
displayAllHeaders: true
sidebar: auto
title: Guide
---

[![npm version](https://badge.fury.io/js/%40ckienle%2Fk-pop.svg)](https://badge.fury.io/js/%40ckienle%2Fk-pop)
[![Minified Size](https://badgen.net/bundlephobia/min/@ckienle/k-pop)](https://bundlephobia.com/result?p=@ckienle/k-pop)
[![Minzipped Size](https://badgen.net/bundlephobia/minzip/@ckienle/k-pop)](https://bundlephobia.com/result?p=@ckienle/k-pop)
[![Build Status](https://api.travis-ci.com/ChristianKienle/k-pop.png?branch=master)](https://travis-ci.org/ChristianKienle/k-pop)

# {{ $page.lib }}

{{ $page.lib }} is a simple, yet powerful, popover component for [Vue](https://vuejs.org).


## Getting Started

Import {{ $page.lib }} along with one of the themes.

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@ckienle/k-pop/themes/clean.css">
<script src="https://unpkg.com/@ckienle/k-pop"></script>
```

Then you can use it like this:

```html
<script>
  new Vue({
    template: `
      <div style="padding: 3rem;">
        <k-pop theme="clean" placement="right">
          <button slot="trigger">Show</button>
          Hello From k-pop
        </k-pop>
      </div>
    `}).$mount("#app")
</script>
```

You can also install and use {{ $page.lib }} via *npm*:

```sh
$ npm install @ckienle/k-pop --save
```

You can the use {{ $page.lib }} like this:

```js
import Vue from "vue"
import KPop from "@ckienle/k-pop"
Vue.use(KPop);
// …
```

You can include themes like so:

```js
// if this does not work try the next import-statement
import "~@ckienle/k-pop/themes/clean.css"

import "./../node_modules/@ckienle/k-pop/themes/clean.css"
//      ^^^^^ make sure to adjust the path to make it fit your layout
```

## Playground

<Playground-index />

## Usage Notes

Using `{{ $page.lib }} ` is straight forward:

```html
<k-pop>
  <button slot="trigger">Toggle</button>

  Popover Body
</k-pop>
```

This will render a button that toggles the visibility of the *Popover Body*. No worries: There are a lot of options you can play with in order to customize almost anything. By default, `{{ $page.lib }}` does not style the appearance of the rendered popover. It is up to you to make it nice (using CSS). However, `{{ $page.lib }}` comes with a set of stylesheets that you can use to get started quickly.

Before we dig deeper into `{{ $page.lib }}`, let's make it just a little nicer:

```html
<template>
  <!-- 'clean' is just a simple theme -->
  <k-pop theme="clean">
    <button slot="trigger">Toggle</button>

    Popover Body
  </k-pop>
</template>
```

Just setting the `theme`-prop is not enough. You also have to include the *clean*-theme:

```html
<script>
  import "~@ckienle/k-pop/themes/clean.css"
</script>
```

Now it should look much better.

## Props

### `theme`

|type|required|default|
|------|------|-------|
|String| no | `null` |

### `bodyClass`

| type | required | default |
|------|------|-------|
| String | no | `"popper"` |

### `arrowClass`

| type | required | default |
|------|------|-------|
| String | no | `"popper__arrow"` |

### `transition`

| type | required | default |
|------|------|-------|
| String | no | `"fade"` |

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

