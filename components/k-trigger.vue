<template>
  <button :class="classes" v-on="$listeners">
    <slot/>
  </button>
</template>

<script>
export default {
  name: "trigger",
  props: {
    native: { type: Boolean, default: false }
  },
  computed: {
    classes() {
      return this.native ? null : ["kpop-button"]
    }
  }
}
</script>

<style scoped>
.kpop-button {
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

.kpop-button:hover,
.kpop-button:focus {
  color: #e4b3fa;
  background: #36014e;
}

.kpop-button:focus {
  outline: none;
}

.kpop-button:active {
  transform: scale(0.95);
}
</style>
