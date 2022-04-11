<template>
  <h1> All Audiobooks</h1>
  <ul>
    <li v-for="book in books " :key="book">
      <router-link to=""> {{ book['name'] }} </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Books",
  props:{
    links: Object
  },
  methods: {
    async fetchData(){
      await this.links;
      const res = await fetch(this.links["audiobooks"]);
      const books = await res.json();
      this.books = [];
      for (let i in books['audiobooks'])
        await this.fetchBookData(books['audiobooks'][i]);
      await this.books.sort((b1, b2) => b1["name"].localeCompare(b2["name"]))
    },
    async fetchBookData(url){
      const bres = await fetch(url);
      const bdata = await bres.json();
      this.books.push(bdata)
    }
  },
  data() {
    return {
      books: this.fetchData()
    }
  }
}
</script>

<style scoped>

</style>