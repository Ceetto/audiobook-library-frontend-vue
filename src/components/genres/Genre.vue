<template>
  <div id="genre" v-if="!isFetching">
    <h1> Genre: {{ genre.name }}</h1>
    <h3> Description:</h3>
    <p>{{ genre.description}}</p>
    <h3>Books with this genre:</h3>
    <router-link :to="{name: 'book', params:{link: book['url'], genresLink: this.genre.index}}" v-for="book in genre['books']" :key="book">{{book["name"]}}</router-link>
    <hr>
    <router-link :to="{name: 'genreForm', params: {title: 'Delete Genre', request: 'DELETE', link:genre.url,
                        redirectRoute: 'genres', redirectUrl: genre.index, books:$route.params.books}}"> Delete Genre </router-link>
    <br>
    <router-link :to="{name: 'genreForm', params: {title: 'Update Genre', request: 'PATCH', link:genre.url,
                        redirectRoute: 'genre', redirectUrl: genre.url, books:$route.params.books}}"> Update Genre </router-link>
  </div>
</template>

<script>
import Books from '../books/Books.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Genre",
  methods:{
    async fetchGenreData(){
      const res = await fetch(this.$route.params["link"].toString());
      this.genre = await res.json();
      let books = await Books.methods.fetchData(this.$route.params['books']);
      this.genre.books = [];
      for (let i in books){
        if(books[i]["genres"].includes(this.$route.params["link"])){
          this.genre.books.push(books[i])
        }
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