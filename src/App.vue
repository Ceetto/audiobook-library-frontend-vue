<template>
  <TopBar></TopBar>
  <router-view></router-view>
</template>

<script>
import TopBar from './components/Topbar'

export default {
  name: 'App',
  components: {
    TopBar,
  },
  data() {
    return {
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
