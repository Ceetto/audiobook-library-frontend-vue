<template>
  <div id="AllBooks" v-if="!isFetching">
    <h1> All Audiobooks</h1>
    <ul>
      <li v-for="book in books " :key="book">
        <router-link :to= "{name: 'book', params:{link: book['url']}}" > {{ book['name'] }} </router-link> <br>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Books",
  data() {
    return {
      isFetching: true,
      books: this.fetchData()
    }
  },
  methods: {
    async fetchData(){
      const res = await fetch(this.$route.params["link"].toString());
      const books = await res.json();
      this.books = [];
      for (let i in books['audiobooks'])
        await this.fetchBookData(books['audiobooks'][i]);
      await this.books.sort((b1, b2) => b1["name"].localeCompare(b2["name"]))
      this.isFetching = false;
    },
    async fetchBookData(url){
      const bres = await fetch(url);
      const bdata = await bres.json();
      this.books.push(bdata);
    }
  }

}
</script>

<style scoped>

</style>