<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
html,body{
  height: 100%;
}
#app {
  min-width: 900px;
  height: 100%;
}
</style>
