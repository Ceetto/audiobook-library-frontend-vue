<template>
  <h1> All Users</h1>
  <ul>
    <li v-for="user in users " :key="user">
      <router-link to=""> {{ user['name'] }} </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Users",
  props:{
    links: Object
  },
  methods: {
    async fetchData(){
      await this.links;
      const res = await fetch(this.links["users"]);
      const users = await res.json();
      this.users = [];
      for (let i in users['users'])
        await this.fetchuserData(users['users'][i]);
      await this.users.sort((b1, b2) => b1["name"].localeCompare(b2["name"]))
    },
    async fetchuserData(url){
      const bres = await fetch(url);
      const bdata = await bres.json();
      this.users.push(bdata)
    }
  },
  data() {
    return {
      users: this.fetchData()
    }
  }
}
</script>

<style scoped>

</style>