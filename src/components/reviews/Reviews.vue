<template>
  <h3> Reviews </h3>
  <div v-for="review in fetchedReviews" :key="review">
    <hr>
    <p class="data">User: </p>
    <router-link class="data" :to="{name: 'user', params: {link: review.user, books:booksLink, pbLink:pbLink}}"> {{review.userName}} </router-link>
    <p class="data">  |  Score: {{review.score}}  |  </p>
    <router-link class="data" :to="{name: 'reviewForm', params: {link: review.audiobook, title: 'Edit review', users: users,
                                    request: 'PATCH', redirectRoute: 'book', redirectUrl: review.audiobook, reviewsLink: review.url,
                                    genresLink: genresLink}}"> Edit </router-link>
    <p> {{review.description}}</p>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Reviews",
  props: {
    reviews: [Object],
    users: String,
    genresLink: String,
    reviewsLink: String,
    booksLink: String,
    pbLink: String,
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