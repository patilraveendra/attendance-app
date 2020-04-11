import Vue from 'vue'
// @ts-ignore 
import App from './App'

import router from './router'
import { store } from './store'
const fb = require('./firebaseConfig.ts')
import './assets/scss/app.scss'

Vue.config.productionTip = false

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

// handle page reloads
let app
fb.auth.onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(App)
        })
    }
})