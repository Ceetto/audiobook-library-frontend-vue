<template>
  <h1> {{ getTitle() }} </h1>
  <div>
    <label> Genre name:</label>
    <input id="name" type="text" placeholder="Fantasy, Poetry etc." name="name" value="temporary placeholder">
  </div>

  <div>
    <label> Description: </label>
    <input class="form-control" id="description" type="text" placeholder="Put the description here." name="name" value="">
  </div>

  <button class="btn btn-primary" type="submit" @click="sendGenreRequest()">Submit</button>
</template>

<script>
export default {
  name: "GenreForm",
  methods:{
    getTitle(){
      return this.$route.params["title"]
    },
    async sendGenreRequest() {
      let genreName = document.getElementById("name").value;
      let description = document.getElementById("description").value
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/vnd.audiobooks+json; charset=utf-8'},
        body: JSON.stringify({name: genreName, description: description})
      };

      await fetch("https://groep34.webdev.ilabt.imec.be/genre", requestOptions);
      console.log(genreName);
      console.log(description);
    }
  }
}
</script>

<style scoped>

</style>