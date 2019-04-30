<template>
  <div class="settings">
    <Playground-Settings-Row label="Placement">
      <select v-model="placement">
        <option
          v-for="aPlacement in placements"
          :value="aPlacement"
          :key="aPlacement"
        >{{aPlacement}}</option>
      </select>
    </Playground-Settings-Row>

    <Playground-Settings-Row label="Overflow">
      <select v-model="overflowContainer">
        <option
          v-for="container in overflowContainers"
          :value="container"
          :key="container"
        >{{container}}</option>
      </select>
    </Playground-Settings-Row>

    <Playground-Settings-Row label="Theme">
      <select v-model="theme">
        <option v-for="aTheme in themes" :value="aTheme" :key="aTheme">{{aTheme}}</option>
      </select>
    </Playground-Settings-Row>
    <Playground-Settings-Row label="Offset">
        <input type="range" v-model.number="offset" min="0" max="100" value="10">
    </Playground-Settings-Row>

    <Playground-Settings-Row label="Options">
      <label>
        <input type="checkbox" v-model="flips">Flip
      </label>
      <br />
      <label>
        <input type="checkbox" v-model="withArrow">Arrow
      </label>
      <br />
      <slot/>
    </Playground-Settings-Row>
  </div>
</template>

<script>
export default {
  watch: {
    kPopProps(newProps) {
      this.$emit("changed", newProps);
    }
  },
  computed: {
    kPopProps() {
      const modifiers = {
        preventOverflow: {
          enabled: this.overflowContainer !== "disabled",
          boundariesElement:
            this.overflowContainer === "disabled"
              ? "scrollParent"
              : this.overflowContainer
        }
      };
      return {
        modifiers,
        offset: this.offset,
        flips: this.flips,
        placement: this.placement,
        withArrow: this.withArrow,
        theme: this.theme === "none" ? null : this.theme
      };
    }
  },
  data() {
    return {
      offset: 10,
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
      themes: ["none", "v2", "clean", "big-arrow", "dark"]
    };
  }
};
</script>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #fdfdfd;
  border: 1px solid #eeeeee;
  font-size: 11px;
}
</style>
