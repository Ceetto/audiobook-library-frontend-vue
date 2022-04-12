<template>
  <div id="app" class="center">
    <div><TopBar></TopBar></div>
    <div><router-view></router-view></div>

  </div>
</template>

<script>
import TopBar from './components/Topbar'

export default {
  name: 'App',
  components: {
    TopBar
  }
}
</script>

<style>
#app{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: darkgray;
}
.center{
  margin: auto;
  width: fit-content;
}
a{
  color: cadetblue;
}
body{
  background: #131516;
}
input, textarea, button{
  background-color: #555;
}
input::placeholder, textarea::placeholder, button{
  color: white;
}
</style>
