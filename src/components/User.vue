<template>
  <div id="user" v-if="!isFetching">
    <h1>{{user["name"]}}</h1>
    <p>{{user["email"]}}</p>
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