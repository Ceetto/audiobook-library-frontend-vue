<template>
  <!-- Load an icon library to show a hamburger menu (bars) on small screens -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <div class="topnav">
    <div v-if="!isFetching">
      <router-link to="/">Home</router-link>
      <router-link :to="{name: 'books', params: {link: links['audiobooks'], users: links['users']}}">All books</router-link>
      <router-link :to="{name: 'genres', params: {link: links['genres']}}">All genres</router-link>
      <router-link :to="{name: 'users', params: {link: links['users']}}">All Users</router-link>

      <router-link :to="{name: 'bookForm', params: {title: 'Create Book', request: 'POST', link: links.audiobooks,
        redirectLink: links.audiobooks, route:'books', genresLink: links.genres}}">Create Book</router-link>
      <router-link :to="{name: 'genreForm', params: {title: 'Create Genre', request: 'POST', link: links.genres,
            redirectRoute: 'genres', redirectUrl: links.genres}}">Create Genre</router-link>
      <router-link :to="{name: 'userForm', params: {title: 'Create User', request: 'POST', link: links.users,
      redirectLink: links.users, route:'users'}}">Create User</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  data() {
    return {
      isFetching: true,
      links: this.fetchData(),
    }
  },
  methods: {
    async fetchData(){
      const res = await fetch("https://groep34.webdev.ilabt.imec.be/");
      this.links = await res.json();
      this.isFetching = false;
    }
  }
}
</script>

<style scoped>
/* css van https://www.w3schools.com/howto/howto_js_topnav.asp*/

/* Add a black background color to the top navigation */
.topnav {
  background-color: #333;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}


</style>