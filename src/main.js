import { createApp } from 'vue'
import App from './App.vue'
import Home from "@/components/Home";
import Books from "@/components/Books";
import Book from "./components/Book"
import Genres from "@/components/Genres";
import Genre from "@/components/Genre";
import { createRouter,createWebHistory} from 'vue-router'

const routes = [
    {path: '/', component: Home},
    {name: 'books', path: '/books/:link', component: Books},
    {name: 'book', path: '/books/book/:link', component: Book},
    {name: 'genres', path: '/genres/:link', component: Genres},
    {name: 'genre', path: '/genres/genre/:link', component: Genre}
    // {path: '/genres', component: Genres, props: true, children: [
    //         {path: ':id', component: Genre, props: true}
    //     ]
    // },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).mount('#app')
// const app = Vue.createApp({})

// app.use(router)