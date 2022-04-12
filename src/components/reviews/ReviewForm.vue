<template>
    <h2> {{ $route.params.title }}</h2>
    <label>User:</label>
    <select id="dropDownUser" name="user" >
      <option v-for="user in users" :key="user" :value="user.url"> {{user.name}} </option>
    </select>
    <label>Score:</label>
    <select id="dropDownScore" name="score">
      <option v-for="score in [1,2,3,4,5,6,7,8,9,10]" :key="score"> {{score}} </option>
    </select>
    <div class="textWrapper">
      <textarea id="review" rows="10"></textarea>
    </div>
    <button @click="sendReviewRequest()">Submit</button>
</template>

<script>
export default {
  name: "ReviewForm",
  data(){
    return {
      users: this.fetchUsers()
    }
  },
  methods:{
    async fetchUsers(){
      const res = await fetch(this.$route.params.users.toString());
      const usersJson = await res.json();
      this.users = [];
      for (let i in usersJson['users']) {
        this.users.push(await this.fetchuserData(usersJson['users'][i]));
      }
      this.users.sort((b1, b2) => b1["name"].localeCompare(b2["name"]));
    },
    async fetchuserData(url){
      const bres = await fetch(url);
      return bres.json();
    },
    async sendReviewRequest() {
      //let review = document.getElementById("review").value;
      let score = document.getElementById("dropDownScore").value;
      let user = document.getElementById("dropDownUser").value;
      console.log(user);
      let requestOptions = {
        method: this.$route.params["request"].toString(),
        headers: {'Content-Type': 'application/vnd.audiobooks+json; charset=utf-8'},
        body: JSON.stringify({user: user, score: score})
      }
      await fetch(this.$route.params["link"].toString(), requestOptions);
    }
  }
}
</script>

<style scoped>
.textWrapper{
  padding: 5px;
}

textarea {
  font-size:15px;
  width:100%;
}
</style>