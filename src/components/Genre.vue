<template>
  <h1> Genre: {{ genre.name }}</h1>
  <h2> Description:</h2>
  <h3>{{ genre.description}}</h3>

<!--  <div id="AllBooks" v-if="!isFetching">-->
<!--    <h2> Books:</h2>-->
<!--    <ul>-->
<!--      <li v-for="book in books " :key="book">-->
<!--        <router-link :to= "{name: 'book', params:{link: book['url']}}" > {{ book['name'] }} </router-link> <br>-->
<!--      </li>-->
<!--    </ul>-->
<!--  </div>-->
  <BooksComp></BooksComp>
</template>

<script>
import BooksComp from './Books.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Genre",
  methods:{
    async fetchGenreData(){
      const res = await fetch(this.$route.params["link"].toString());
      this.genre = await res.json()

    }
  },
  data(){
    return {
      genre: this.fetchGenreData(),
    }
  },
  components:{
    BooksComp
  }
}
</script>

<style scoped>

</style>