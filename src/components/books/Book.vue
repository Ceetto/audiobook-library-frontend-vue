<template>
  <div id="book" v-if="!isFetching">
    <h1> {{book["name"]}} </h1>
    <h3>Authors:</h3>
    <p v-for="author in book['authors']" :key="author">{{author}}</p>
    <h3>Genres:</h3>
    <router-link :to="{name: 'genre', params:{link: genre['url']}}" v-for="genre in book['genres']" :key="genre">{{genre["name"]}}</router-link>
    <h3>Summary:</h3>
    <p>{{book["description"]}}</p>
    <h3>Publication Date:</h3>
    <p>{{book["publicationDate"]}}</p>
    <h3>Duration:</h3>
    <p>{{book["duration"] / 1000}}s</p>
  </div>
</template>

<script>
import Genres from "@/components/genres/Genres";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Book",
  data() {
    return {
      isFetching: true,
      book: this.fetchData()
    }
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

</style>