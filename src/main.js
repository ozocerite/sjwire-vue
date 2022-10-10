import '@babel/polyfill'
import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/index.js';
import store from './store/index.js';

import jQuery from 'jquery';
import "bootstrap"
import 'jquery-ui/ui/widgets/draggable'

import common from './assets/js/common.js'

import '@/assets/solartec-template/lib/animate/animate.min.css';
import '@/assets/solartec-template/css/bootstrap.min.css';
import '@/assets/solartec-template/css/style.css';

import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

let app = createApp(App);

app.config.productionTip  = false;

app.config.globalProperties.globalVar = 'globalVar';
global.$ = jQuery;
app.use(router)
    .use(store)
    .use(jQuery)
    .use(common)
    .use(VueSidebarMenu)
    .mount('#app');

