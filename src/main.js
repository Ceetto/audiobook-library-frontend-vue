import { createApp } from 'vue'
import App from './App.vue'
import Home from "@/components/Home";
import Books from "@/components/books/Books";
import Book from "./components/books/Book"
import Genres from "@/components/genres/Genres";
import Genre from "@/components/genres/Genre";
import GenreForm from "@/components/genres/GenreForm";
import { createRouter,createWebHistory} from 'vue-router'
import Users from "@/components/users/Users";
import User from "@/components/users/User";
import UserForm from "@/components/users/UserForm";

const routes = [
    {path: '/', component: Home},
    {name: 'books', path: '/books/:link', component: Books},
    {name: 'book', path: '/books/book/:link', component: Book},
    {name: 'genres', path: '/genres/:link', component: Genres},
    {name: 'genre', path: '/genres/genre/:link', component: Genre},
    {name: 'genreForm', path: '/genres/create/:title', component: GenreForm},
    {name: 'users', path:'/users/:link', component: Users},
    {name: 'user', path: '/users/user/:link', component: User},
    {name: 'userForm', path: '/users/create/:title', component: UserForm},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).mount('#app')