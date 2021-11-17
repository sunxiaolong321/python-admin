import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import Router from './router'

import 'element-plus/dist/index.css'


const app = createApp(App)
app.use(ElementPlus)
app.use(Router)
app.mount('#app')
