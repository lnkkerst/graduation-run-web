import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../components/Home.vue";
import Info from "../components/Info.vue";
import Login from "../components/Login.vue";
import Export from "../components/Export.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "root",
        component: Home
    },
    {
        path: "/home",
        name: "home",
        component: Home
    },
    {
        path: "/info",
        name: "info",
        component: Info,
        meta: {
            keepAlive: true
        }
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/export",
        name: "export",
        component: Export 
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

export default router;