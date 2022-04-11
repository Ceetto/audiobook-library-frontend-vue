import { createApp } from 'vue'
import App from './App.vue'
import Home from "@/components/Home";
import Books from "@/components/Books";
import Book from "./components/Book"
import Genres from "@/components/Genres";
import Genre from "@/components/Genre";
import GenreForm from "@/components/GenreForm";
import { createRouter,createWebHistory} from 'vue-router'
import Users from "@/components/Users";
import User from "@/components/User";

const routes = [
    {path: '/', component: Home},
    {name: 'books', path: '/books/:link', component: Books},
    {name: 'book', path: '/books/book/:link', component: Book},
    {name: 'genres', path: '/genres/:link', component: Genres},
    {name: 'genre', path: '/genres/genre/:link', component: Genre},
    {name: 'genreForm', path: '/genres/create/:title', component: GenreForm},
    {name: 'users', path:'/users/:link', component: Users},
    {name: 'user', path: '/users/user/:link', component: User},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).mount('#app')
// const app = Vue.createApp({})

// app.use(router)