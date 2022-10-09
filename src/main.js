import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/index.js';

import jQuery from 'jquery';
import "bootstrap"
import 'jquery-ui/ui/widgets/draggable'

import common from './assets/js/common.js'

import '@/assets/solartec-template/lib/animate/animate.min.css';
import '@/assets/solartec-template/css/bootstrap.min.css';
import '@/assets/solartec-template/css/style.css';

let app = createApp(App);

app.config.productionTip  = false;

app.config.globalProperties.globalVar = 'globalVar';
global.$ = jQuery;
app.use(router)
    .use(jQuery)
    .use(common)
    .mount('#app');

