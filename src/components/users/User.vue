<template>
  <div id="user" v-if="!isFetching">
    <h1>{{user["name"]}}</h1>
    <p>{{user["email"]}}</p>
    <router-link :to="{name: 'userForm', params: {title: 'Delete User', request: 'DELETE', link:user.url, redirectLink: user['index'], route: 'users'}}"> Delete User </router-link>
    <br>
    <router-link :to="{name: 'userForm', params: {title: 'Update User', request: 'PATCH', link:user.url, redirectLink: user['url'], route: 'user'}}"> Update User </router-link>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  data() {
    return{
      isFetching: true,
      user: this.fetchData()
    }
  },
  methods: {
    async fetchData(){
      const res = await fetch(this.$route.params["link"].toString());
      this.user = await res.json();
      this.isFetching = false;
    }
  }
}
</script>

<style scoped>

</style>