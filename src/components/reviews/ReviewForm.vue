<template>
  <h2> {{ $route.params.title }}</h2>
  <label>User:</label>
  <select id="dropDownUser" name="user" ></select>
  <select id="dropDownScore" name="score"></select>
</template>

<script>
export default {
  name: "ReviewForm",
  methods:{
    async fetchuserData(url){
      const bres = await fetch(url);
      return bres.json();
    }
  },
  async mounted() {
    let scoreOptions = "";
    for (let step = 1; step <= 10; step++) {
      scoreOptions += "<option>" + step + "</option>";
    }
    document.getElementById("dropDownScore").innerHTML = scoreOptions;

    let userOptions = "";
    const res = await fetch(this.$route.params.users.toString());
    const usersJson = await res.json();
    let users = [];
    for (let i in usersJson['users']) {
      users.push(await this.fetchuserData(usersJson['users'][i]));
    }
    users.sort((b1, b2) => b1["name"].localeCompare(b2["name"]));
    for (const user of users){
      userOptions += "<option :value=user.url>" + user.name + "</option>";
    }
    document.getElementById("dropDownUser").innerHTML = userOptions;

  }
}
</script>

<style scoped>

</style>