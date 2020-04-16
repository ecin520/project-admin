<template>
  <div class="interface-call">
    <iframe
      class="api-iframe"
      width="100%"
      :style="'height:' + (height - 100) + 'px'"
      src="https://api.auauz.net/druid"
    >
    </iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: document.body.clientHeight
    };
  },
  methods: {
    getHeight() {
      this.height = document.body.clientHeight;
    }
  },
  mounted() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
  }
};
</script>

<style lang="scss">
.api-iframe {
  border: none;
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar {
  width: 1px;
}
</style>
