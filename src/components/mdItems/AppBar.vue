<script setup lang="ts">import router from '../../router';
const props = defineProps<{
  mduiFixed?: boolean;
  drawerTaget?: string;
  siteName?: string;
  pageTitle?: string;

}>();

let fixed = props.mduiFixed;
let drawer = props.drawerTaget || "drawer";
let siteName = props.siteName;
let title = props.pageTitle;

</script>

<template>
  <div class="mdui-appbar mdui-color-theme" :class="[{ 'mdui-appbar-fixed': fixed }]">
    <div class="mdui-toolbar">
      <Button class="mdui-btn mdui-btn-icon" mdui-drawer="{target: '#drawer'}">
        <i class="mdui-icon material-icons">menu</i>
      </Button>
      <a v-if="siteName" class="mdui-typo-headline" @click="$router.push('/')">{{ siteName }}</a>
      <a v-if="title" class="mdui-typo-title">{{ title }}</a>
      <div class="mdui-toolbar-spacer"></div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
</style>