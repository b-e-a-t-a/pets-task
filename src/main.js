import './assets/main.css'
import './assets/main.sass'

import { createApp } from 'vue'
import App from './App.vue'
import store from "./store"

createApp(App).use(store).mount('#app')
