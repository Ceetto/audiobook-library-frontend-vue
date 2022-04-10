<template>
  <h1> All Audiobooks</h1>
  <p> {{ typeof links }} </p>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Books",
  props:{
    links: Object
  },
  async data() {
    //console.log(this.props)
    return {
      //link: await this.props.links["audiobooks"]
    }
  }
}
</script>

<style scoped>

</style>