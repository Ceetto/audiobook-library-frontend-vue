<template>
  <div id="book" v-if="!isFetching">
    <h1> {{book["name"]}} </h1>
    <h3>Authors:</h3>
    <p v-for="author in book['authors']" :key="author">{{author}}</p>
    <h3>Genres:</h3>
    <div v-for="genre in book['genres']" :key="genre" id="genres">
      <router-link :to="{name: 'genre', params:{link: genre['url'], books: book['index']}}" >{{genre["name"]}}</router-link> |
    </div>

    <h3>Summary:</h3>
    <p>{{book["description"]}}</p>
    <h3>Publication Date:</h3>
    <p>{{book["publicationDate"]}}</p>
    <h3>Duration:</h3>
    <p>{{book["duration"] / 1000}}s</p>
    <h3>Purchase link:</h3>
    <a :href=" 'http://' + book['link']">{{book["link"]}}</a>
    <hr>
    <router-link :to="{name: 'bookForm', params: {title: 'Delete Book', request: 'DELETE', link:book.url, redirectLink: book['index'], route: 'books',
                      genresLink: $route.params.genresLink}}"> Delete Book </router-link>
    <br>
    <router-link :to="{name: 'bookForm', params: {title: 'Update User', request: 'PATCH', link:book.url, redirectLink: book['url'], route: 'book',
                      genresLink: $route.params.genresLink}}"> Update Book </router-link>
    <hr>
    <router-link :to="{name: 'reviewForm', params: {link: book.url, title: 'Create review', users: $route.params.users,
                      request: 'POST', redirectRoute: 'book', redirectUrl: book.url}}"> Write review </router-link>
    <Reviews></Reviews>
  </div>
  <div v-else>
    <p>loading...</p>
  </div>
</template>

<script>
import Genres from "@/components/genres/Genres";
import Reviews from "@/components/reviews/Reviews"
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Book",
  data() {
    return {
      isFetching: true,
      book: this.fetchData()
    }
  },
  components: {
    Reviews
  },
  methods: {
    async fetchData(){
      const res = await fetch(this.$route.params["link"].toString());
      this.book = await res.json();
      let genres = this.book.genres;
      this.book.genres = [];
      for (let i in genres){
        this.book.genres.push(await Genres.methods.fetchGenreData(genres[i]))
      }
      this.book.publicationDate = this.formatDate(this.book.publicationDate)
      this.isFetching = false;
    },
    formatDate(date) {
      date = new Date(date);
      return [
        this.padTo2Digits(date.getDate()),
        this.padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join('/');
    },
    padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }
  }
}
</script>

<style scoped>
#genres{
  display: inline;
}
</style>