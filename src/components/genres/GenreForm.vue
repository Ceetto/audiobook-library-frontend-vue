<template>
  <div v-if="!isFetching">
    <h1> {{ getTitle() }} </h1>
    <div v-if="errorMessage !== undefined">
      <p id="error"> {{errorMessage.message}} </p>
    </div>
    <div v-if="isDeleteRequest()">
      <p> Do you really want to delete this genre?</p>
    </div>
    <div v-else>
      <div>
        <label> Genre name:</label>
        <input id="name" type="text" placeholder="Fantasy, Poetry etc." name="name" :value="undefined===genreData ? '' : genreData.name">
      </div>

      <div>
        <label> Description: </label>
        <input class="form-control" id="description" type="text" placeholder="Put the description here." name="name" :value="undefined===genreData ? '' : genreData.description">
      </div>
    </div>

    <button class="button" type="submit" @click="sendRequest()">{{ isDeleteRequest() ? 'Delete' : 'Submit'}}</button>
  </div>
</template>

<script>
import App from '@/App';
export default {
  name: "GenreForm",
  data(){
    let isFetching = false;
    let genreData = undefined;
    if(this.$route.params['request'] === "PATCH"){
      isFetching = true;
      genreData = this.fetchGenreData();
    }

    return{
      isFetching: isFetching,
      genreData: genreData,
      errorMessage: undefined,
    }
  },
  methods:{
    getTitle(){
      return this.$route.params["title"]
    },
    async sendRequest() {
      let requestOptions;
      if (this.isDeleteRequest()){
        requestOptions = {
          method: 'DELETE',
          headers: {'Content-Type': 'application/vnd.audiobooks+json; charset=utf-8'}
        };
      } else {
        let genreName = document.getElementById("name").value;
        let description = document.getElementById("description").value
        requestOptions = {
          method: this.$route.params["request"].toString(),
          headers: {'Content-Type': 'application/vnd.audiobooks+json; charset=utf-8'},
          body: JSON.stringify({name: genreName, description: description})
        };
      }
      const res = await fetch(this.$route.params["link"].toString(), requestOptions);
      this.errorMessage = await App.methods.checkStatusAndRedirect(res, {
        name: this.$route.params.redirectRoute.toString(),
        params: {link: this.$route.params.redirectUrl.toString(), pbLink:this.$route.params.pbLink}
      }, this.$router);
    },
    isDeleteRequest(){
      return this.$route.params["request"] === 'DELETE'
    },

    async fetchGenreData(){
      const res = await fetch(this.$route.params['link'].toString())
      this.genreData = await res.json();
      this.isFetching = false;
    }
  },
  updated() {
    if (this.$route.params.request === "POST"){
      document.getElementById("name").value = "";
      document.getElementById("description").value = "";
    }
  }
}
</script>

<style scoped>

</style>