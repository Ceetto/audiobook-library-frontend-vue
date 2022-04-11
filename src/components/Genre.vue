<template>
  <h1> Genre test</h1>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Genre",
  props: {
    genre: Object
  },
  methods:{

  },
  data(){
    return {
      name: this.genre["name"]
    }
  }
}
</script>

<style scoped>

</style>