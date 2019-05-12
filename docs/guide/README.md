---
displayAllHeaders: true
sidebar: auto
title: Guide
---

[![npm version](https://badge.fury.io/js/%40ckienle%2Fk-pop.svg)](https://badge.fury.io/js/%40ckienle%2Fk-pop)
[![Minified Size](https://badgen.net/bundlephobia/min/@ckienle/k-pop)](https://bundlephobia.com/result?p=@ckienle/k-pop)
[![Minzipped Size](https://badgen.net/bundlephobia/minzip/@ckienle/k-pop)](https://bundlephobia.com/result?p=@ckienle/k-pop)
[![Build Status](https://travis-ci.org/ChristianKienle/k-pop.svg?branch=master)](https://travis-ci.org/ChristianKienle/k-pop)

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

<playground />

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
