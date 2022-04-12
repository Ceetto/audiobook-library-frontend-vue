<template>
    <h2> {{ $route.params.title }}</h2>
    <label>User:</label>

    <select id="dropDownUser" name="user" >
    <option v-for="user in users" :key="user" :value="user.url" :selected="user.url === currentUser"> {{user.name}} </option>
    </select>
    <label>Score:</label>
    <select id="dropDownScore" name="score">
      <option v-for="score in [1,2,3,4,5,6,7,8,9,10]" :key="score" :selected="score === currentScore"> {{score}} </option>
    </select>
    <div class="textWrapper">
      <textarea id="review" rows="10" :value="currentDescription ? currentDescription : ''"></textarea>
    </div>
    <button @click="sendReviewRequest()">Submit</button>
</template>

<script>

export default {
  name: "ReviewForm",
  data(){
    return {
      users: this.fetchUsers(),
      currentUser: String,
      currentScore: Number,
      currentDescription: String
    }
  },
  methods:{
    async fetchUsers(){
      await this.setCurrentData();
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
      let description = document.getElementById("review").value;
      let score = document.getElementById("dropDownScore").value;
      let user = document.getElementById("dropDownUser").value;
      let requestOptions = {
        method: this.$route.params["request"].toString(),
        headers: {'Content-Type': 'application/vnd.audiobooks+json; charset=utf-8'},
        body: JSON.stringify({user: user, audiobook: this.$route.params.link, description: description, score: score})
      }
      await fetch(this.$route.params["reviewsLink"].toString(), requestOptions);
      await this.$router.push({name: 'book', params: {link: this.$route.params.link, users: this.$route.params.users,
                              genresLink: this.$route.params.genresLink, reviewsLink: this.$route.params.reviewsLink}})
    },
    async setCurrentData(){
      if(this.$route.params.request === "PATCH"){
        const res = await fetch(this.$route.params["reviewsLink"].toString());
        let review = await res.json();
        this.currentUser = review.user;
        this.currentScore = review.score;
        this.currentDescription = review.description
      }
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