<script setup lang="ts">
import mdui from "mdui";
import AppBar from "./components/mdItems/AppBar.vue";
import Button from "./components/mdItems/Button.vue";
import Drawer from "./components/mdItems/Drawer.vue";
import List from "./components/mdItems/List.vue";
import ListItem from "./components/mdItems/ListItem.vue";
import { ref } from "vue";
import Icon from "./components/mdItems/Icon.vue";
import ListItemContent from "./components/mdItems/ListItemContent.vue";

let isNightMode = ref(false);

</script>

<script lang="ts">
export default {
  mounted() {
    mdui.mutation();
  }
}
</script>

<template>
  <AppBar site-name="毕业跑" page-title="主页">
    <Button mdui-icon mdui-icon-name="account_circle"></Button>
    <Button mdui-icon :mdui-icon-name="isNightMode ? 'brightness_2' : 'brightness_7'"></Button>
  </AppBar>
  <Drawer id="drawer">
    <List>
      <ListItem>
        <Icon class="mdui-list-item-icon">home</Icon>
        <ListItemContent>主页</ListItemContent>
      </ListItem>
      <ListItem>
        <Icon class="mdui-list-item-icon">person_add</Icon>
        <ListItemContent>报名</ListItemContent>
      </ListItem>
      <ListItem>
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