<template>
  <h1> Genre: {{ genre.name }}</h1>
  <h2> Description:</h2>
  <h3>{{ genre.description}}</h3>
  <BooksComp :hasParent=true>  </BooksComp>
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
      genre: this.fetchGenreData()
    }
  },
  components:{
    BooksComp
  }
}
</script>

<style scoped>

</style>