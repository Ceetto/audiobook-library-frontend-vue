<template>
  <SideBar></SideBar>
<!--  <div id="content"><component :is="currentView" :link=links /></div>-->
<!--  <div v-if="true">-->
<!--    <Home/>-->
<!--  </div>-->
  <router-view :links=this.links></router-view>

</template>

<script>
import SideBar from './components/Sidebar'
//import Home from "./components/Home"
// import Books from "./components/Books"
// import VueRouter from 'vue-router'

// const routes = {
//   '/': Home,
//   '/books': Books
// }



export default {
  name: 'App',
  components: {
    SideBar,
  },
  data() {
    return {
      message: "deez nuts",
      currentPath: window.location.hash,
      links: null,
      cw: this.$route.hash
    }
  },
  methods:{
    async fetchData(){
      const res = await fetch("https://groep34.webdev.ilabt.imec.be/")
      this.links = await res.json()
      //return res.json();
    }
  },
  // computed: {
  //   currentView() {
  //     return routes[this.currentPath.slice(1) || '/']
  //   }
  // },
  async mounted(){
    await this.fetchData()
    // console.log(window.location.hash)
    // window.addEventListener('hashchange', async () => {
    //   this.currentPath = window.location.hash
    // })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
#content {
  /*text-align: center;*/
}
</style>
