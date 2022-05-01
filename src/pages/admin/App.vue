<script setup lang="ts">
import mdui from "mdui";
import AppBar from "../../components/mdItems/AppBar.vue";
import MduiButton from "../../components/mdItems/Button.vue";
import Drawer from "../../components/mdItems/Drawer.vue";
import List from "../../components/mdItems/List.vue";
import ListItem from "../../components/mdItems/ListItem.vue";
import Icon from "../../components/mdItems/Icon.vue";
import ListItemContent from "../../components/mdItems/ListItemContent.vue";
import { defineComponent, onMounted } from "vue";
</script>

<script lang="ts">
export default defineComponent({
    mounted() {
        this.$mdui.mutation();
        if (this.$router.currentRoute.value.name !== "login" &&
            localStorage.getItem("admin_token") === null) {
            this.$mdui.snackbar("请先登陆", {
                buttonText: "确定"
            });
            this.$router.push("/login");
        }
    },
    methods: {
        onTokenFailed() {
            localStorage.removeItem("admin_token");
            this.$mdui.snackbar("登陆信息失效", { buttonText: "确定" });
            this.$router.push("/login");
        }
    }
})
</script>

<template>
    <AppBar site-name="毕业跑" page-title="主页" mdui-fixed>
        <MduiButton
            @click="$mdui.snackbar('这个按钮目前还没有什么用', { buttonText: '好吧' })"
            mdui-icon
            mdui-icon-name="account_circle"
        ></MduiButton>
        <MduiButton
            @click="$mdui.snackbar('这个功能目前还在画大饼', { buttonText: '知道啦' })"
            mdui-icon
            mdui-icon-name="color_lens"
        ></MduiButton>
    </AppBar>
    <Drawer id="drawer">
        <List>
            <ListItem @click="$router.push('/home')" class="mdui-ripple">
                <Icon class="mdui-list-item-icon">home</Icon>
                <ListItemContent>主页</ListItemContent>
            </ListItem>
            <ListItem @click="$router.push('/info')" class="mdui-ripple">
                <Icon class="mdui-list-item-icon">person</Icon>
                <ListItemContent>报名信息查看</ListItemContent>
            </ListItem>
            <ListItem @click="$router.push('/export')" class="mdui-ripple">
                <Icon class="mdui-list-item-icon">assignment</Icon>
                <ListItemContent>报名信息导出</ListItemContent>
            </ListItem>
        </List>
    </Drawer>
    <div class="container mdui-container">
        <router-view></router-view>
    </div>
</template>

<style scoped>
</style>