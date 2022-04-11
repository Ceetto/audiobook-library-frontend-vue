<template>
 <div v-if="!isFetching">
   <h1> {{getTitle()}}</h1>
   <div v-if="isDeleteRequest()">
     <p>Do you really want to delete this book?</p>
   </div>
   <div v-else>

     <div>
       <label>Title</label>
       <input id="title" type="text" placeholder="title" name="title" value="">
     </div>

     <div>
       <label> Authors:</label>
       <input id="authors" type="text" placeholder="authors" name="authors" value="">
     </div>

     <div>
       <label> Summary: </label>
       <textarea class="form-control" id="summary" type="textarea" placeholder="summary" name="summary" value=""/>
     </div>

     <div>
       <label> Duration:</label>
       <input id="duration" type="text" placeholder="Duration in ms" name="duration" value="">
     </div>

     <label>Genres:</label>
     <div id="genres" v-for="genre in genres" :key="genre">
       <input type="checkbox" class="genreCheckbox" name="genre" :id="genre" :value="genre.url" :checked=false>
       <label>{{genre["name"]}}</label>
     </div>

     <div>
       <label>Publication Date</label>
       <input type="date" id="date" name="date">
     </div>

     <div>
       <label>Purchase Link:</label>
       <input type="text" id="link" name="link" placeholder="purchase link">
     </div>

   </div>
   <button class="btn btn-primary" type="submit" @click="sendRequest()">{{ isDeleteRequest() ? 'Delete' : 'Submit'}}</button>
 </div>
</template>

<script>
import Genres from "@/components/genres/Genres";

export default {
  name: "BookForm",
  data(){
    return {
      isFetching: true,
      genres: this.fetchGenres()
    }
  },
  methods:{
    async sendRequest(){
      let requestOtions;
      if(this.isDeleteRequest()){
        requestOtions = {
          method: 'DELETE',
          headers: {'Content-Type': 'application/vnd.audiobooks+json; charset=utf-8'}
        };
      } else {
        let title = document.getElementById("title").value;
        let authors = document.getElementById("authors").value;
        let summary = document.getElementById("summary").value;
        let duration = document.getElementById("duration").value;
        let genres = [];
        let genre_links = document.querySelectorAll('.genreCheckbox:checked');
        for(let i=0; i < genre_links.length; i++){
          genres.push(genre_links[i].value)
        }
        let date = document.getElementById("date").value;
        let link = document.getElementById("link").value;
        requestOtions = {
          method: this.$route.params["request"].toString(),
          headers: {'Content-Type': 'application/vnd.audiobooks+json; charset=utf-8'},
          body: JSON.stringify({authors: authors, genres: genres, name:title, description: summary, duration:duration, publicationDate:date, link:link})
        }
        await fetch(this.$route.params["link"].toString(), requestOtions);
        await this.$router.push({name: this.$route.params["route"].toString(), params: {link: this.$route.params["redirectLink"]}});
      }
    },

    async fetchGenres(){
      const genresRes = await fetch(this.$route.params["genresLink"].toString());
      let genres = await genresRes.json();
      genres = genres["genres"];
      this.genres = [];
      for(let i in genres){
        this.genres.push(await Genres.methods.fetchGenreData(genres[i]));
      }
      this.isFetching = false;
    },

    getTitle(){
      return this.$route.params["title"];
    },

    isDeleteRequest(){
      return this.$route.params["request"] === 'DELETE'
    }
  }
}
</script>

<style scoped>
#genres{
  display: inline;
}
</style>