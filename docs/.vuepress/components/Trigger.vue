<template>
  <button class="vp-button" v-on="$listeners">
    <slot/>
  </button>
</template>

<style>
.vp-button {
  display: inline-block;
  border: none;
  padding: 0.7rem 1rem;
  border-radius: 4px;
  margin: 0;
  text-decoration: none;
  background: #6a029b;
  color: #f6e3ff;
  font-family: sans-serif;
  font-size: 0.75rem;
  line-height: 1;
  cursor: pointer;
  text-align: center;
  transition: background 500ms ease-in-out, transform 250ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.vp-button:hover,
.vp-button:focus {
  color: #e4b3fa;
  background: #36014e;
}

.vp-button:focus {
  outline: none;
}

.vp-button:active {
  transform: scale(0.95);
}
</style>
