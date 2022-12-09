import '@babel/polyfill'
import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/index.js';
import store from './store/index.js';
import axios from 'axios';

import jQuery from 'jquery';
import "bootstrap"
import 'jquery-ui/ui/widgets/draggable'
import '@/assets/solartec-template/lib/animate/animate.min.css';
import '@/assets/solartec-template/css/bootstrap.min.css';
import '@/assets/solartec-template/css/style.css';

import common from './assets/js/common.js'
import naive from 'naive-ui'

let app = createApp(App);

app.config.productionTip  = false;
app.config.globalProperties.$axios = axios;
app.config.globalProperties.globalVar = 'globalVar';

global.$ = jQuery;
global.session = window.localStorage;

window.Kakao.init(process.env.VUE_APP_KAKAO_JAVASCRIPT_KEY);

app.use(router)
    .use(store)
    .use(jQuery)
    .use(common)
    .use(naive)
    .mount('#app');

