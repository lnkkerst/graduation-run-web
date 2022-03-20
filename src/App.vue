<script setup lang="ts">
import mdui from "mdui";
import AppBar from "./components/mdItems/AppBar.vue";
import MduiButton from "./components/mdItems/Button.vue";
import Drawer from "./components/mdItems/Drawer.vue";
import List from "./components/mdItems/List.vue";
import ListItem from "./components/mdItems/ListItem.vue";
import Icon from "./components/mdItems/Icon.vue";
import ListItemContent from "./components/mdItems/ListItemContent.vue";
import axios from "axios";
import router from "./router";
</script>

<script lang="ts">
export default {
  data() {
    return {
      isNightMode: false
    }
  },
  mounted() {
    mdui.mutation();
    router.afterEach(() => {
      if (localStorage.getItem("token") === null && router.currentRoute.value.name !== "login") {
        this.$mdui.snackbar("请先登陆", {
          buttonText: "确定"
        });
        this.$router.push("/login");
      }
    })
    // if (localStorage.getItem("uuid") === null) {
    //   try {
    //     const res = await axios.get("/auth/uuid");
    //     localStorage.setItem("uuid", res.data.data.uuid);
    //   } catch (_e) {
    //     const e = _e as Error;
    //     this.$mdui.alert("与服务器通信异常", "警告", undefined, {
    //       confirmText: "确定"
    //     });
    //     if (import.meta.env.DEV) {
    //       console.log(e.message);
    //     }
    //   }
    // }
  },
  methods: {
    onTokenFailed() {
      localStorage.clear();
      this.$mdui.snackbar("登陆信息失效", { buttonText: "确定" });
      this.$router.push("/login");
    }
  },
}
</script>

<template>
  <AppBar site-name="毕业跑" page-title="主页">
    <MduiButton
      @click="$mdui.snackbar('这个按钮目前还没有什么用', { buttonText: '好吧' })"
      mdui-icon
      mdui-icon-name="account_circle"
    ></MduiButton>
    <MduiButton
      @click="$mdui.snackbar('这个功能目前还在画大饼', { buttonText: '知道啦' })"
      mdui-icon
      :mdui-icon-name="isNightMode ? 'brightness_2' : 'brightness_7'"
    ></MduiButton>
  </AppBar>
  <Drawer id="drawer">
    <List>
      <ListItem @click="$router.push('/home')" class="mdui-ripple">
        <Icon class="mdui-list-item-icon">home</Icon>
        <ListItemContent>主页</ListItemContent>
      </ListItem>
      <ListItem @click="$router.push('/signup')" class="mdui-ripple">
        <Icon class="mdui-list-item-icon">person_add</Icon>
        <ListItemContent>报名</ListItemContent>
      </ListItem>
      <ListItem @click="$router.push('/personal')" class="mdui-ripple">
        <Icon class="mdui-list-item-icon">person</Icon>
        <ListItemContent>个人信息</ListItemContent>
      </ListItem>
    </List>
  </Drawer>
  <div class="container mdui-container">
    <router-view></router-view>
  </div>
</template>

<style scoped>
</style>