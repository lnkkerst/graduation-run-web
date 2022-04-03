import { createApp } from "vue";
import App from "./App.vue";
import "mdui/dist/css/mdui.css";
import mdui from "mdui";
import router from "./router";
import "@vue/runtime-core";
import { JQStatic } from 'mdui.jq/es/interfaces/JQStatic';
import { MduiStatic } from 'mdui/es/interfaces/MduiStatic';
import { AxiosInstance } from "axios";
import axiosRoot from "axios";

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
const axios = axiosRoot.create({});
axios.defaults.baseURL = import.meta.env.VITE_API_ADDRESS as string;
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('admin_token');
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
