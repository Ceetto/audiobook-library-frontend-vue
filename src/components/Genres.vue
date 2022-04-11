<template>
  <h1> All Genres</h1>
  <ul>
    <li v-for="genre in genres " :key="genre">
<!--      <router-link to="{{ 'genres/' + genre['url'].split('/').pop() }}"> {{ genre['name'] }} </router-link>-->
<!--      <router-link to="{{ '/genres/' + genre['url'].split('/').pop() }}"> {{ genre['url'].split('/').pop() }} </router-link>-->
      <router-link to="{{ getUrl(genre) }}"> {{ '/genres/' +  genre['url'].split('/').pop() }} </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Genres",
  props: {
    links: Object
  },
  methods: {
    async fetchData() {
      await this.links;
      const res = await fetch(this.links["genres"]);
      const genres = await res.json();
      this.genres = [];
      for (let i in genres['genres'])
        await this.fetchGenreData(genres['genres'][i]);
      await this.genres.sort((b1, b2) => b1["name"].localeCompare(b2["name"]))
    },
    async fetchGenreData(url) {
      const res = await fetch(url);
      const data = await res.json();
      this.genres.push(data)
    },
    getUrl(genre){
      return '/genres/' + genre['url'].split('/').pop()
    }
  },
  data() {
    return {
      genres: this.fetchData()
    }
  }
}
</script>

<style scoped>

</style>