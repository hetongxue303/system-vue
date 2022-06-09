import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from './plugins/element-plus'
import router from './router'
import {axios, VueAxios} from './utils/axios'
import {createPinia} from 'pinia'
import 'nprogress/nprogress.css'
import 'virtual:windi.css'

const app = createApp(App)

app.use(ElementPlus)
    .use(router)
    .use(VueAxios, axios)
    .use(createPinia())
    .mount('#app')