<template>
  <div class="settings">
    <SettingRow label="Placement">
      <select v-model="placement">
        <option
          v-for="aPlacement in placements"
          :value="aPlacement"
          :key="aPlacement"
        >{{aPlacement}}</option>
      </select>
    </SettingRow>

    <SettingRow label="Overflow">
      <select v-model="overflowContainer">
        <option
          v-for="container in overflowContainers"
          :value="container"
          :key="container"
        >{{container}}</option>
      </select>
    </SettingRow>

    <SettingRow label="Theme">
      <select v-model="theme">
        <option v-for="aTheme in themes" :value="aTheme" :key="aTheme">{{aTheme}}</option>
      </select>
    </SettingRow>
    <SettingRow label="Offset">
      <div style="display: flex;">
        <input type="range" v-model.number="offset" min="0" max="100" value="0">
        <label style="">{{offset}}px</label>
      </div>
    </SettingRow>
    <SettingRow label="Trigger Width">
      <div style="display: flex;">
        <input type="range" v-model.number="triggerWidth" @input="$emit('update:triggerWidth', $event.target.value)" min="200" max="400" value="250">
        <label>{{triggerWidth}}px</label>
      </div>
    </SettingRow>

    <SettingRow label="Options">
      <label>
        <input type="checkbox" v-model="flips">Flip
      </label>
      <br />
      <label>
        <input type="checkbox" v-model="withArrow">Arrow
      </label>
      <br />
      <label>
        <input type="checkbox" v-model="adjustsBodyWidth">Adjust Body Width
      </label>
      <br />
      <label>
        <input type="checkbox" v-model="useNativeButton" @change="$emit('update:useNativeButton', $event.target.checked)">Native Button
      </label>
    </SettingRow>
  </div>
</template>

<script>
import SettingRow from "./settings/k-row.vue"

export default {
  components: { SettingRow },
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
        adjustsBodyWidth: this.adjustsBodyWidth,
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
      adjustsBodyWidth: false,
      triggerWidth: 250,
      useNativeButton: false,
      offset: 0,
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
input {
  margin: 0;
  margin-right: 5px;
}
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
