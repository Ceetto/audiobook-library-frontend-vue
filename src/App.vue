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
}
</script>

<style>
</style>
