<template>
  <div id="AllGenres" v-if="!isFetching">
    <h1> All Genres</h1>
    <ul>
      <li v-for="genre in genres " :key="genre">
        <router-link :to= "{name: 'genre', params:{link: genre['url']}}" > {{ genre['name'] }} </router-link> <br>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Genres",
  data() {
    return {
      isFetching: true,
      genres: this.fetchData()
    }
  },
  methods: {
    async fetchData(){
      const res = await fetch(this.$route.params["link"].toString());
      const genres = await res.json();
      this.genres = [];
      for (let i in genres['genres'])
        await this.fetchGenreData(genres['genres'][i]);
      await this.genres.sort((b1, b2) => b1["name"].localeCompare(b2["name"]))
      this.isFetching = false;
    },
    async fetchGenreData(url){
      const res = await fetch(url);
      const data = await res.json();
      this.genres.push(data);
    }
  }
}
</script>

<style scoped>

</style>