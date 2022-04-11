<template>
  <div id="sideBar" v-if="!isFetching">
    <ul>
      <li><router-link to="/">Home</router-link> </li>
      <li><router-link :to="{name: 'books', params: {link: links['audiobooks']}}">All books</router-link> </li>
      <li><router-link :to="{name: 'genres', params: {link: links['genres']}}">All genres</router-link> </li>
<!--      <li><router-link to="/users">All users</router-link> </li>-->
    </ul>
  </div>

</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      isFetching: true,
      links: this.fetchData(),
    }
  },
  methods: {
    async fetchData(){
      const res = await fetch("https://groep34.webdev.ilabt.imec.be/");
      this.links = await res.json();
      this.isFetching = false;
    }
  }
}
</script>

<style scoped>
#sideBar{
  float: left;
  width: 200px;
  height: 1000px;
}

</style>