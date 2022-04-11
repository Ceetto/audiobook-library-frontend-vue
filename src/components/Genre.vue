<template>
  <div id="genre" v-if="!isFetching">
    <h1> Genre: {{ genre.name }}</h1>
    <h3> Description:</h3>
    <p>{{ genre.description}}</p>
    <h3>Books with this genre:</h3>
    <router-link :to="{name: 'book', params:{link: book['url']}}" v-for="book in genre['books']" :key="book">{{book["name"]}}</router-link>
    <hr>
    <router-link :to="{name: 'genreForm', params: {title: 'Delete Genre', request: 'DELETE', link:genre.url,
                        redirectRoute: 'genres', redirectUrl: genre.index}}"> Delete Genre </router-link>
    <br>
    <br>
    <router-link :to="{name: 'genreForm', params: {title: 'Update Genre', request: 'PATCH', link:genre.url,
                        redirectRoute: 'genre', redirectUrl: genre.url}}"> Update Genre </router-link>
  </div>
</template>

<script>
import Books from './Books.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Genre",
  methods:{
    async fetchGenreData(){
      const res = await fetch(this.$route.params["link"].toString());
      this.genre = await res.json()
      let books = this.genre.books;
      this.genre.books = [];
      for (let i in books){
        this.genre.books.push(Books.methods.fetchBookData(books[i]))
      }
      this.isFetching = false;
    }
  },
  data(){
    return {
      isFetching: true,
      genre: this.fetchGenreData()
    }
  }
}
</script>

<style scoped>

</style>