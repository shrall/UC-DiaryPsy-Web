import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index";
import "./index.css";
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

const app = createApp(App);
app.use(router);
app.mixin({
  methods: {
    checkLogin: function () {
      if (!localStorage["access_token"]) {
        router.push("/login");
      }
    },
  },
});
app.config.globalProperties.url = "http://uc-diarypsy.test/api/";
app.mount("#app");