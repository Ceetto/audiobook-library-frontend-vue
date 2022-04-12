<template>
  <div id="genre" v-if="!isFetching">
    <h1> Genre: {{ genre.name }}</h1>
    <h3> Description:</h3>
    <p>{{ genre.description}}</p>
    <h3>Books with this genre:</h3>
    <div v-for="book in genre['books']" :key="book" id="books">
      <router-link :to="{name: 'book', params:{link: book['url'], genresLink: this.genre.index,
                         reviewsLink:$route.params.reviewsLink, pbLink:$route.params.pbLink}}" >{{book["name"]}}</router-link> |
    </div>
    <hr>
    <router-link :to="{name: 'genreForm', params: {title: 'Delete Genre', request: 'DELETE', link:genre.url,
                        redirectRoute: 'genres', redirectUrl: genre.index, reviewsLink: $route.params.reviewsLink, pbLink: $route.params.pbLink}}"> Delete Genre </router-link>
    <br>
    <router-link :to="{name: 'genreForm', params: {title: 'Update Genre', request: 'PATCH', link:genre.url,
                        redirectRoute: 'genre', redirectUrl: genre.url, reviewsLink: $route.params.reviewsLink, pbLink: $route.params.pbLink}}"> Update Genre </router-link>
  </div>
  <div v-else>
    <p>loading...</p>
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
      let books = this.genre["audiobooks"];
      this.genre.books = [];
      for (let i in books){
        this.genre.books.push(await Books.methods.fetchBookData(books[i]))
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
#books{
  display: inline;
}
</style>