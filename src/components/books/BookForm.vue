<template>
 <div v-if="!isFetching">
   <h1> {{getTitle()}}</h1>
   <div v-if="isDeleteRequest()">
     <p>Do you really want to delete this book?</p>
   </div>
   <div v-else>

     <div>
       <label>Title</label>
       <input id="title" type="text" placeholder="title" name="title" :value="undefined===bookData ? '' : bookData.name">
     </div>

     <div>
       <label> Authors:</label>
       <input id="authors" type="text" placeholder="authors" name="authors" :value="undefined===bookData ? '' : bookData.authors">
     </div>

     <div>
       <label> Summary: </label>
       <textarea class="form-control" id="summary" placeholder="summary" name="summary" :value="undefined===bookData ? '' : bookData.description"/>
     </div>

     <div>
       <label> Duration:</label>
       <input id="duration" type="text" placeholder="Duration in ms" name="duration" :value="undefined===bookData ? '' : bookData.duration">
     </div>

     <label>Genres:</label>
     <div id="genres" v-for="genre in genres" :key="genre">
       <input type="checkbox" class="genreCheckbox" name="genre" :id="genre" :value="genre.url" :checked=genre.checked>
       <label>{{genre["name"]}}</label>
     </div>

     <div>
       <label>Publication Date</label>
       <input type="date" id="date" name="date" :value="undefined===bookData ? '' : bookData.publicationDate">
     </div>

     <div>
       <label>Purchase Link:</label>
       <input type="text" id="link" name="link" placeholder="purchase link" :value="undefined===bookData ? '' : bookData.url">
     </div>

   </div>
   <button class="button" type="submit" @click="sendRequest()">{{ isDeleteRequest() ? 'Delete' : 'Submit'}}</button>
  </div>
  <div v-else>
    <p>loading...</p>
  </div>

</template>

<script>
import Genres from "@/components/genres/Genres";
import App from '@/App';
export default {
  name: "BookForm",
  data(){

    let bookData = undefined
    if(this.$route.params["request"] === 'PATCH'){
      bookData = this.fetchBookData();
    }
    return {
      isFetching: true,
      genres: this.fetchGenres(),
      bookData: bookData,
    }
  },
  methods:{
    async sendRequest(){
      let requestOtions;
      if(this.isDeleteRequest()){
        requestOtions = {
          method: 'PATCH',
          headers: {'Content-Type': 'application/vnd.audiobooks+json; charset=utf-8'},
          body: JSON.stringify({removed:true})
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

      }
      const res = await fetch(this.$route.params["link"].toString(), requestOtions);
      await App.methods.checkStatusAndRedirect(res, {name: this.$route.params["route"].toString(), params: {link: this.$route.params["redirectLink"], reviewsLink:this.$route.params["reviewsLink"], pbLink:this.$route.params.pbLink}}, this.$router);

    },

    async fetchGenres(){
      const genresRes = await fetch(this.$route.params["genresLink"].toString());
      let genres = await genresRes.json();
      genres = genres["genres"];
      this.genres = [];
      for(let i in genres){
        this.genres.push(await Genres.methods.fetchGenreData(genres[i]));
        if(this.bookData !== undefined)
          this.genres[i].checked = this.bookData.genres.includes(genres[i])
        else
          this.genres[i].checked = false
      }
      this.isFetching = false;
    },

    getTitle(){
      return this.$route.params["title"];
    },

    isDeleteRequest(){
      return this.$route.params["request"] === 'DELETE'
    },

    async fetchBookData(){
      const res = await fetch(this.$route.params["link"].toString());
      this.bookData = await res.json();
      this.bookData.publicationDate = new Date(this.bookData.publicationDate);
      this.bookData.publicationDate = this.bookData.publicationDate.toISOString().split('T')[0];

    }
  }
}
</script>

<style scoped>
#genres{
  display: inline;
}
</style>