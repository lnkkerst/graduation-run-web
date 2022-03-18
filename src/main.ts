import { createApp } from "vue";
import App from "./App.vue";
import "mdui/dist/css/mdui.css";
import mdui from "mdui";
import router from "./router";
import "@vue/runtime-core";
import { JQStatic } from 'mdui.jq/es/interfaces/JQStatic';
import { MduiStatic } from 'mdui/es/interfaces/MduiStatic';

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $jq: JQStatic;
        $mdui: MduiStatic;
    }
}

const app = createApp(App);
app.config.globalProperties.$mdui = mdui;
app.config.globalProperties.$jq = mdui.$;
app.use(router);
app.mount("#app");
