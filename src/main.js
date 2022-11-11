import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import './assets/alert.css'
import api from './service/CommonService.js'
import { initAlert } from './plugIns/alert.js'
initAlert()

const app = createApp(App)

// 绑定到 app 的实例上
app.use(api)

// 挂载
app.mount('#app')

