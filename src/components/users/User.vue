<template>
  <div id="user" v-if="!isFetching">
    <h1>{{user["name"]}}</h1>
    <p>{{user["email"]}}</p>
    <router-link :to="{name: 'userForm', params: {title: 'Delete User', request: 'DELETE', link:user.url, redirectLink: user['index'], route: 'users'}}"> Delete User </router-link>
    <br>
    <router-link :to="{name: 'userForm', params: {title: 'Update User', request: 'PATCH', link:user.url, redirectLink: user['url'], route: 'user', books:$route.params.books, pbLink:$route.params.pbLink}}"> Update User </router-link>
    <hr style="height: 3px">
    <h1>Playbacks:</h1>

    <div v-for="pb in user['playbacks']" :key="pb">
      <hr>
      <h3>{{pb.audiobook.name}}</h3>
      <label style="display: inline">Position: </label>
      <p style="display: inline;"> {{pb.position / 1000}}s / {{pb.audiobook.duration}}s</p>
      <router-link :to="{name: 'playbackForm', params:{title: 'Update Playback for user:' + user.name, request:'PATCH',
                         link:pb.url, user:user.url, redirectLink: user['url'], route: 'user', books:$route.params.books}}"> Update playback </router-link> |
      <router-link :to="{name: 'playbackForm', params:{title: 'Update Playback for user:' + user.name, request:'DELETE',
                         link:pb.url, user:user.url, redirectLink: user['url'], route: 'user', books:$route.params.books}}"> Delete playback </router-link>
    </div>
    <hr style="height: 3px">
    <router-link :to="{name: 'playbackForm', params: {title: 'Create Playback for user: ' + user.name, request: 'POST',link:$route.params.pbLink, user:user.url, redirectLink: user['url'], route: 'user', books:$route.params.books}}"> Add Playback position </router-link>
  </div>
  <div v-else>
    <p>loading...</p>
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
      let playbacks = this.user['playbacks'];
      this.user.playbacks = [];
      for(let pb of playbacks){
        let pbToadd = await this.fetchDataHelp(pb);
        pbToadd.audiobook = await this.fetchDataHelp(pbToadd.audiobook)
        this.user.playbacks.push(pbToadd);
      }
      this.isFetching = false;
    },
    async fetchDataHelp(url){
      const res = await fetch(url);
      return res.json();
    },
  }
}
</script>

<style scoped>

</style>