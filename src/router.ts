import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import Person from "./components/Person.vue";

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
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/signup",
        name: "signup",
        component: SignUp
    },
    {
        path: "/personal",
        name: "personal",
        component: Person
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

export default router;