import { createApp } from "vue";
import App from "./App.vue";
import "mdui/dist/css/mdui.css";
import mdui from "mdui";
import router from "./router";
import "@vue/runtime-core";
import { JQStatic } from 'mdui.jq/es/interfaces/JQStatic';
import { MduiStatic } from 'mdui/es/interfaces/MduiStatic';
import { AxiosInstance } from "axios";
import axios from "axios";

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $jq: JQStatic;
        $mdui: MduiStatic;
        $axios: AxiosInstance;
    }
}

const app = createApp(App);
app.config.globalProperties.$mdui = mdui;
app.config.globalProperties.$jq = mdui.$;
axios.defaults.baseURL = "http://localhost:3000";
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token !== null) {
        config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
},
    function (error) {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(function (res) {
    if(res.status === 401) {
        mdui.snackbar("登陆过期，请重新登陆", {
            buttonText: "确定",
            timeout: 10000
        })
        router.push("/login");
    }
    return res;
});
app.config.globalProperties.$axios = axios;
app.use(router);
app.mount("#app");