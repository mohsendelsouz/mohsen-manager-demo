import { createApp } from 'vue'
import App from './App.vue'
import store from "./store";
import axios from './util/axios'
import VueAxios from 'vue-axios'
import router from "./routes";
import VueSweetalert2 from 'vue-sweetalert2';
import ValidationError from "@/components/ValidationError";

import 'sweetalert2/dist/sweetalert2.min.css';
import validationErrors from "@/mixins/validationErrors";
import helperMixins from "@/mixins/helperMixins";

window._ = require('lodash')

const app = createApp(App)

app.mixin(validationErrors);
app.mixin(helperMixins);
app.component('v-errors', ValidationError);
app.use(VueAxios, axios)
app.use(store)
app.use(router)
app.use(VueSweetalert2)

app.mount('#app')