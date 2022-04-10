<template>
  <div id="sideBar">
    <ul>
      <li><router-link to="/">Home</router-link> </li>
      <li><router-link to="/books">All audiobooks</router-link> </li>
<!--      <li><router-link to="/genres">All genres</router-link> </li>-->
<!--      <li><router-link to="/users">All users</router-link> </li>-->
    </ul>
  </div>

</template>

<script>
export default {
  name: 'SideBar',
  data(){
    return{}
  }
}
</script>

<style scoped>
#sideBar{
  float: left;
  width: 200px;
}

</style>