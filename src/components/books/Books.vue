<template>
  <div id="AllBooks" v-if="!isFetching">
    <h1 v-if="!hasParent"> All Audiobooks</h1>
    <ul>
      <li v-for="book in books " :key="book">
        <router-link :to= "{name: 'book', params:{link: book['url'], users: $route.params.users, genresLink: $route.params.genresLink}}"> {{ book['name'] }} </router-link> <br>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>loading...</p>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Books",
  props:{
    hasParent: Boolean
  },
  data() {
    return {
      isFetching: true,
      books: this.fetchData(this.$route.params["link"].toString())
    }
  },
  methods: {
    async fetchData(url){
      const res = await fetch(url);
      const books = await res.json();
      this.books = [];
      for (let i in books['audiobooks']) {
        let book = await this.fetchBookData(books['audiobooks'][i]);
        if(!book.removed)
          this.books.push(await this.fetchBookData(books['audiobooks'][i]));
      }
      await this.books.sort((b1, b2) => b1["name"].localeCompare(b2["name"]))
      this.isFetching = false;
      return this.books;
    },
    async fetchBookData(url){
      const bres = await fetch(url);
      return bres.json();
    }
  }

}
</script>

<style scoped>

</style>