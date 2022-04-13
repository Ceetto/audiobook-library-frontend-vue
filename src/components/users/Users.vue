<template>
    <h1> All Users</h1>
    <ul>
      <li v-for="user in users " :key="user">
        <router-link :to="{name: 'user', params:{link: user['url'], books:$route.params.books, pbLink:$route.params.pbLink}}"> {{ user['name'] }} </router-link>
      </li>
    </ul>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Users",
  data() {
    return {
      isFetching: true,
      users: this.fetchData()
    }
  },
  methods: {
    async fetchData(){
      const res = await fetch(this.$route.params["link"].toString());
      const users = await res.json();
      this.users = [];
      for (let i in users['users'])
        this.users.push(await this.fetchuserData(users['users'][i]));
      await this.users.sort((b1, b2) => b1["name"].localeCompare(b2["name"]));
      this.isFetching = false;
    },
    async fetchuserData(url){
      const bres = await fetch(url);
      return bres.json();
    }
  },

}
</script>

<style scoped>

</style>