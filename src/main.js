import { createApp } from 'vue'
import App from './App.vue'
import Home from "@/components/Home";
import Books from "@/components/Books";
import Genres from "@/components/Genres";
import Genre from "@/components/Genre";
import { createRouter,createWebHistory} from 'vue-router'

const routes = [
    {path: '/', component: Home},
    {path: '/books', component: Books, props: true},
    {path: '/genres', component: Genres, props: true, children: [
            {path: ':id', component: Genre, props: true}
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).mount('#app')
// const app = Vue.createApp({})

// app.use(router)