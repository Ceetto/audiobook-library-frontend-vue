<template>
    <h1> All Genres</h1>
    <ul>
      <li v-for="genre in genres " :key="genre">
        <router-link :to= "{name: 'genre', params:{link: genre['url'], reviewsLink: $route.params.reviewsLink, pbLink:$route.params['pbLink']}}" > {{ genre['name'] }} </router-link> <br>
      </li>
    </ul>
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
        this.genres.push(await this.fetchGenreData(genres['genres'][i]));
      await this.genres.sort((b1, b2) => b1["name"].localeCompare(b2["name"]))
      this.isFetching = false;
    },
    async fetchGenreData(url){
      const res = await fetch(url);
      return res.json();
    }
  }
}
</script>

<style scoped>

</style>