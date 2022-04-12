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
import BookForm from "@/components/books/BookForm";

const routes = [
    {path: '/', component: Home},
    {name: 'books', path: '/books/:link/:genresLink', component: Books},
    {name: 'book', path: '/books/book/:link/:genresLink', component: Book},
    {name: 'bookForm', path: '/books/create/:title/:request/:link/:redirectLink/:route/:genresLink', component: BookForm},

    {name: 'genres', path: '/genres/:link/:books', component: Genres},
    {name: 'genre', path: '/genres/genre/:link/:books', component: Genre},
    {name: 'genreForm', path: '/genres/create/:title/:request/:link/:redirectRoute/:redirectUrl/:books', component: GenreForm},

    {name: 'users', path:'/users/:link', component: Users},
    {name: 'user', path: '/users/user/:link', component: User},
    {name: 'userForm', path: '/users/create/:title/:request/:link/:redirectLink/:route', component: UserForm},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).mount('#app')