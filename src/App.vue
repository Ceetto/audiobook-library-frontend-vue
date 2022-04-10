<template>
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <h1>{{message}}</h1>
<!--  <SideBar></SideBar>-->
  <component :is="currentView"/>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import SideBar from './components/Sidebar'
import HelloWorld from "@/components/HelloWorld";

const routes = {
  '/': SideBar,
  '/test': HelloWorld
}

export default {
  name: 'App',
  components: {
    SideBar,
    HelloWorld
  },
  data(){
    return{
      message: "deez nuts",
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView(){
      return routes[this.currentPath.slice(1) || '/']
    }
  },
  mounted(){
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
