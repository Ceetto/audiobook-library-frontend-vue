<template>
  <h1> {{ getTitle() }} </h1>
  <div v-if="isDeleteRequest()">
    <p> Do you really want to delete this genre?</p>
  </div>
  <div v-else>
    <div>
      <label> Genre name:</label>
      <input id="name" type="text" placeholder="Fantasy, Poetry etc." name="name" value="">
    </div>

    <div>
      <label> Description: </label>
      <input class="form-control" id="description" type="text" placeholder="Put the description here." name="name" value="">
    </div>
  </div>

  <button class="btn btn-primary" type="submit" @click="sendRequest()">{{ isDeleteRequest() ? 'Delete' : 'Submit'}}</button>
</template>

<script>
export default {
  name: "GenreForm",
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
      await fetch(this.$route.params["link"].toString(), requestOptions);
    },
    isDeleteRequest(){
      return this.$route.params["request"] === 'DELETE'
    }
  }
}
</script>

<style scoped>

</style>