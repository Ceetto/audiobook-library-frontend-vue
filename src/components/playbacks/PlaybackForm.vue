<template>
  <div v-if="!isFetching">
    <h1> {{ getTitle() }} </h1>
    <div v-if="errorMessage !== undefined">
      <p id="error"> {{errorMessage.message}} </p>
    </div>
    <div v-if="isDeleteRequest()">
      <p> Do you really want to delete this playback position?</p>
    </div>
    <div v-else>
      <label>audiobook:</label>
      <select id="book">
        <option value="" disabled selected>Select audiobook</option>
        <option v-for="book in books" :key="book" :value="book.url" :selected="pbData === undefined ? false :
        (book.url.toString() === pbData.audiobook.toString())"> {{book.name}} {{}}</option>
      </select>
      <br>
      <label>Progress:</label>
      <input id="progress" type="number" placeholder="position in book" :value="pbData === undefined ? '' : pbData.position">
    </div>
    <button class="button" type="submit" @click="sendRequest()">{{ isDeleteRequest() ? 'Delete' : 'Submit'}}</button>
  </div>
</template>

<script>
import Books from "@/components/books/Books";
import App from "@/App";

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
      errorMessage: undefined,
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
      const res = await fetch(this.$route.params['link'].toString(), requestOptions);
      this.errorMessage = await App.methods.checkStatusAndRedirect(res, {name: this.$route.params['route'].toString(), params:{link:this.$route.params['redirectLink'],
          books:this.$route.params['books'], pbLink:this.$route.params['pbLink']}}, this.$router)
    },
    isDeleteRequest(){
      return this.$route.params["request"] === 'DELETE'
    },
    async fetchPbData(){
      const res = await fetch(this.$route.params['link'].toString());
      this.pbData = await res.json();
      this.isFetching = false;
    },
    async fetchBooksData(){
      console.log(this.$route.params["books"].toString())
      const res = await fetch(this.$route.params["books"].toString());
      this.books = await res.json();
      let books = this.books["audiobooks"];
      this.books = [];
      for (let book of books){
        let tmp = await Books.methods.fetchBookData(book);
        if(!tmp.removed)
          this.books.push(tmp)
      }
    }
  }
}
</script>

<style scoped>

</style>