import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';


const app = createApp(App)

app.use(router)
app.config.globalProperties.$vkToken = '059f1c48059f1c48059f1c489606b89aea0059f059f1c486219d39470f3fb1e3279147e';
app.mount('#app')
