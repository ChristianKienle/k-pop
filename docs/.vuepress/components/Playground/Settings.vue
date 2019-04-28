<template>
  <div class="settings">
    <select v-model="placement">
      <option v-for="aPlacement in placements" :value="aPlacement" :key="aPlacement">{{aPlacement}}</option>
    </select>
    <select v-model="overflowContainer">
      <option
        v-for="container in overflowContainers"
        :value="container"
        :key="container"
      >{{container}}</option>
    </select>
    <label>
      <input type="checkbox" v-model="flips">Flip
    </label>
    <label>
      <input type="checkbox" v-model="withArrow">Arrow
    </label>
    <select v-model="theme">
      <option v-for="aTheme in themes" :value="aTheme" :key="aTheme">{{aTheme}}</option>
    </select>
  </div>
</template>

<script>
export default {
  watch: {
    popperProps(newProps) {
      this.$emit("changed", newProps)
    }
  },
  computed: {
    popperProps() {
      const modifiers = {
        preventOverflow: {
          enabled: this.overflowContainer !== "disabled",
          boundariesElement:
            this.overflowContainer === "disabled"
              ? "scrollParent"
              : this.overflowContainer
        }
      }
      return {
        modifiers,
        flip: this.flips,
        placement: this.placement,
        withArrow: this.withArrow,
        theme: this.theme
      };
    }
  },
  data() {
    return {
      theme: "clean",
      overflowContainer: "scrollParent",
      placement: "bottom",
      flips: true,
      withArrow: true,
      overflowContainers: ["disabled", "scrollParent", "window", "viewport"],
      placements: [
        "top-start",
        "top",
        "top-end",
        "left-start",
        "left",
        "left-end",
        "right-start",
        "right",
        "right-end",
        "bottom-start",
        "bottom",
        "bottom-end"
      ],
      themes: ["none", "clean", "big-arrow", "dark"]
    };
  }
};
</script>

<style scoped>
.settings {
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #fdfdfd;
  border: 1px solid #eeeeee;
}
</style>
