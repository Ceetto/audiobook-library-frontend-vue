<template>
  <div class="center">
    <div id="app">
      <div><TopBar></TopBar></div>
      <div><router-view></router-view></div>
    </div>
  </div>
</template>

<script>
import TopBar from './components/Topbar'

export default {
  name: 'App',
  components: {
    TopBar
  },
  methods: {
    async checkStatusAndRedirect(res, route, router){
      let status = await res.status;
      if (status === 400){
        let message = await res.json();
        alert(message.message);
      } else {
        await router.push(route);
      }
    }
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
  background: #111;
  word-break: break-all;
}
.center{
  margin: auto;
  width: fit-content;
}
a{
  color: cadetblue;
}
body{
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background: #222;
}
input, textarea, button{
  background-color: #555;
}
input::placeholder, textarea::placeholder, button{
  color: white;
}

.button{
  width: 80px;
  height: 40px;
  margin: 15px;
}

textarea {
  font-size:15px;
  width:100%;
  height: 200px;
}
</style>
