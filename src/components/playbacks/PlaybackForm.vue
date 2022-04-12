<template>
  <div v-if="!isFetching">
    <h1> {{ getTitle() }} </h1>
    <div v-if="isDeleteRequest()">
      <p> Do you really want to delete this playback position?</p>
    </div>
    <div v-else>
      <label>audiobook:</label>
      <select id="book">
        <option value="" disabled selected>Select audiobook</option>
        <option v-for="book in books" :key="book" :value="book.url"> {{book.name}} </option>
      </select>
      <br>
      <label>Progress:</label>
      <input id="progress" type="number" placeholder="position in book" value="">
    </div>
    <button class="btn btn-primary" type="submit" @click="sendRequest()">{{ isDeleteRequest() ? 'Delete' : 'Submit'}}</button>
  </div>
</template>

<script>
import Books from "@/components/books/Books";

export default {
  name: "PlaybackForm",
  data(){
    let isFetching = false;
    let pbData = undefined;
    if(this.$route.params['request'] === "PATCH"){
      isFetching = true;
      pbData = this.fetchPbData();
    }
    return{
      isFetching: isFetching,
      pbData: pbData,
      books: this.fetchBooksData(),
    }
  },
  methods:{
    getTitle(){
      return this.$route.params["title"]
    },
    async sendRequest(){
      let requestOptions;
      if(this.isDeleteRequest()){
        requestOptions = {
          method: 'DELETE',
          headers: {'Content-Type': 'application/vnd.audiobooks+json; charset=utf-8'}
        };
      } else {
        let book = document.getElementById("book").value;
        let progress = document.getElementById("progress").value;
        requestOptions = {
          method: this.$route.params["request"].toString(),
          headers: {'Content-Type': 'application/vnd.audiobooks+json; charset=utf-8'},
          body: JSON.stringify({user: this.$route.params.user, audiobook: book, position:progress})
        };
      }
      await fetch(this.$route.params['link'].toString(), requestOptions);
      await this.$router.push({name: this.$route.params['route'].toString(), params:{link:this.$route.params['redirectLink'],
          books:this.$route.params['books'], pbLink:this.$route.params['link']}})
    },
    isDeleteRequest(){
      return this.$route.params["request"] === 'DELETE'
    },
    async fetchPbData(){
      this.isFetching = false;
    },
    async fetchBooksData(){
      console.log(this.$route.params["books"]);
      const res = await fetch(this.$route.params["books"].toString());
      this.books = await res.json();
      let books = this.books["audiobooks"];
      this.books = [];
      for (let book of books){
        this.books.push(await Books.methods.fetchBookData(book))
      }
    }
  }
}
</script>

<style scoped>

</style>