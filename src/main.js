/* eslint-disable */
import VuePikaday from "@enrian/vue-pikaday";
import "@enrian/vue-pikaday/dist/vue-pikaday.min.css";
import BootstrapVue from "bootstrap-vue";
import { VueMaskDirective } from "v-mask";
import Vue from "vue";
import VueEvents from "vue-events";
import excel from "vue-excel-export";
import VModal from "vue-js-modal";
import VueResource from "vue-resource";
import App from "./App";
import router from "./routes";
import VueNotification from "@kugatsu/vuenotification";

window.jQuery = require("jquery");

Vue.config.productionTip = false;

Vue.directive("mask", VueMaskDirective);
Vue.use(excel);
Vue.use(VueEvents);
Vue.use(VueResource);
Vue.use(BootstrapVue);
Vue.use(VModal, { dialog: true });
Vue.use(VuePikaday);
Vue.use(VueNotification, {
  timer: 20
});

new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App },
  VueResource: VueResource
});
