<template>
  <div v-if="!isFetching">
    <h1> {{getTitle()}}</h1>
    <div v-if="errorMessage !== undefined">
      <p id="error"> {{errorMessage.message}} </p>
    </div>
    <div v-if="isDeleteRequest()">
      <p>Do you really want to delete this user?</p>
    </div>
    <div v-else>
      <div>
        <label> Username:</label>
        <input id="username" type="text" placeholder="username" name="username" :value="undefined===userData ? '' : userData.name">
      </div>

      <div>
        <label> Email: </label>
        <input class="form-control" id="email" type="text" placeholder="email" name="email" :value="undefined===userData ? '' : userData.email">
      </div>
    </div>
    <button class="button" type="submit" @click="sendRequest()">{{ isDeleteRequest() ? 'Delete' : 'Submit'}}</button>
  </div>
</template>

<script>
import App from "@/App";

export default {
  name: "UserForm",
  data(){
    let isFetching = false;
    let userData = undefined;
    if(this.$route.params['request'] === "PATCH"){
      isFetching = true;
      userData = this.fetchUserData();
    }
    return{
      isFetching: isFetching,
      userData: userData,
      errorMessage: undefined,
    }
  },
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
      const res = await fetch(this.$route.params["link"].toString(), requestOptions);
      //await this.$router.push({name: this.$route.params["route"].toString(), params: {link: this.$route.params["redirectLink"]}})
      this.errorMessage = await App.methods.checkStatusAndRedirect(res, {name: this.$route.params["route"].toString(), params: {link: this.$route.params["redirectLink"]}}, this.$router)
    },
    isDeleteRequest(){
      return this.$route.params["request"] === 'DELETE'
    },

    async fetchUserData(){
      const res = await fetch(this.$route.params['link'].toString())
      this.userData = await res.json();
      this.isFetching = false;
    }
  },
  updated(){
    if (this.$route.params.request === "POST"){
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
    }
  }
}
</script>

<style scoped>

</style>