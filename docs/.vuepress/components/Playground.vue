<template>
  <div>
    <Settings @changed="kPopProps = $event">
      <label>
        <input type="checkbox" v-model="useNativeButton">Native Button
      </label>
    </Settings>

    <div class="outer">
      <div class="inner">
        <ClientOnly>
          <KPop ref="trigger" v-bind="kPopProps">
            <template #trigger="{toggle}">
              <Trigger :native="useNativeButton" @click="toggle">Show Popover</Trigger>
            </template>
            <SampleContent/>
          </KPop>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script>
import Settings from "./Playground/Settings.vue";

export default {
  name: "Playground",
  components: { Settings },
  data: () => ({
    useNativeButton: false,
    kPopProps: {
      offset: 10,
      overflowContainer: "scrollParent",
      placement: "bottom",
      flips: true,
      withArrow: true,
      theme: "clean"
    }
  }),
  methods: {
    scrollTriggerIntoView() {
      const target = this.$refs.trigger.$el;
      const scrollView = target.parentNode.parentNode;

      // We subtract target.clientHeight 2x to cause the trigger to be slightly above the
      // center because we show the popover to the bottom initially.
      const y =
        target.offsetTop -
        0.5 * (scrollView.clientHeight - 2 * target.clientWidth);
      const x =
        target.offsetLeft - 0.5 * (scrollView.clientWidth - target.clientWidth);
      scrollView.scrollTop = y;
      scrollView.scrollLeft = x;
    }
  },
  mounted() {
    setTimeout(this.scrollTriggerIntoView, 500);
  }
};
</script>

<style lang="scss">
@import "./../../../themes/all.scss";
</style>

<style scoped>
.inner {
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  position: relative;
  height: 300%;
  width: 300%;
  align-items: center;
}
.outer {
  height: 400px;
  background-color: #fdfdfd;
  overflow: auto;
  border: 1px solid #eeeeee;
}
</style>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
