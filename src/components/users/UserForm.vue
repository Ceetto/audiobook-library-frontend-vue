<template>
  <h1> {{getTitle()}}</h1>
  <div v-if="isDeleteRequest()">
    <p>Do you really want to delete this user?</p>
  </div>
  <div v-else>
    <div>
      <label> Username:</label>
      <input id="username" type="text" placeholder="username" name="username" value="">
    </div>

    <div>
      <label> Email: </label>
      <input class="form-control" id="email" type="text" placeholder="email" name="email" value="">
    </div>
  </div>
  <button class="btn btn-primary" type="submit" @click="sendRequest()">{{ isDeleteRequest() ? 'Delete' : 'Submit'}}</button>
</template>

<script>
export default {
  name: "UserForm",
  methods: {
    getTitle(){
      return this.$route.params["title"];
    },
    async sendRequest(){
      let requestOptions;
      if (this.isDeleteRequest()){
        requestOptions = {
          method: 'DELETE',
          headers: {'Content-Type': 'application/vnd.audiobooks+json; charset=utf-8'}
        };
      } else {
        let username = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        requestOptions = {
          method: this.$route.params["request"].toString(),
          headers: {'Content-Type': 'application/vnd.audiobooks+json; charset=utf-8'},
          body: JSON.stringify({name: username, email: email})
        };
      }
      await fetch(this.$route.params["link"].toString(), requestOptions);
      await this.$router.push({name: this.$route.params["route"].toString(), params: {link: this.$route.params["redirectLink"]}})
    },
    isDeleteRequest(){
      return this.$route.params["request"] === 'DELETE'
    }
  }
}
</script>

<style scoped>

</style>