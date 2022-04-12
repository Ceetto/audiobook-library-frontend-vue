<template>
  <h3> Reviews </h3>
  <div v-for="review in fetchedReviews" :key="review">
    <hr>
    <p class="data">User: </p>
    <router-link class="data" :to="{name: 'user', params: {link: review.user}}"> {{review.userName}} </router-link>
    <p class="data">  |  Score: {{review.score}}  |  </p>

    <p> {{review.description}}</p>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Reviews",
  props: {
    reviews: [Object],
    users: [Object],
    genresLink: String
  },
  methods: {
    async fetchData(){
      this.fetchedReviews = [];
      for (const review of this.reviews){
        const res = await fetch(review);
        let fetchedReview = await res.json();
        fetchedReview.userName = await this.fetchUserName(fetchedReview.user);
        this.fetchedReviews.push(fetchedReview);
      }
    },
    async fetchUserName(url){
      const res = await fetch(url);
      let user = await res.json();
      return user.name;
    }
  },
  data(){
    return {
      fetchedReviews: []
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style scoped>
.data {
  display: inline;
}
</style>