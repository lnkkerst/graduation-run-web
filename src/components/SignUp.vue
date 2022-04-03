<script setup lang="ts">
import { rmSync } from "fs";
import { withCtx } from "vue";
import router from "../router";
import MduiButton from "./mdItems/Button.vue";
import { defineComponent } from "vue";
</script>

<script lang="ts">
export default defineComponent({
    data() {
        return {
            signup: false,
            changing: false,
            text4Button2: "正在查询是否报名..."
        }
    },
    computed: {
    },
    methods: {
        async fetchPersonal() {
            try {
                const res = await this.$axios.get("/user/info");
                this.signup = res.data.data.form.signup;
                this.updateSignUpInfo();
            } catch (_e) {
                this.$mdui.alert("获取个人信息失败", "警告", undefined, {
                    confirmText: "确定"
                })
                const e = _e as Error;
                if (import.meta.env.DEV) {
                    console.log(e.message);
                }
            }
        },
        updateSignUpInfo() {
            this.text4Button2 = this.signup ? "已经报名，点击取消报名" : "未报名，点击报名";
        },
        async change() {
            try {
                this.changing = true;
                const res = await this.$axios({
                    method: this.signup ? "DELETE" : "POST",
                    url: "/user/signup"
                });
                if(res.data.code === 0) {
                    this.$mdui.snackbar("更新报名状态成功", {
                        buttonText: "确定"
                    });
                } else {
                    this.$mdui.alert("更新报名状态失败", "警告", undefined, {
                        confirmText: "确定"
                    });
                }
                router.push("/signup");
                this.fetchPersonal();
            } catch(_e) {
                this.$mdui.alert("发生未知错误", "警告", undefined, {
                    confirmText: "确定"
                })
                const e = _e as Error;
                if(import.meta.env.DEV) {
                    console.log(e.message);
                }
            } finally {
                this.changing = false;
            }
        }
    },
    watch: {
    },
    async mounted() {
        await this.fetchPersonal();
        this.updateSignUpInfo();
    }
});
</script>

<template>
    <MduiButton
        class="mdui-m-y-4 mdui-color-theme"
        mdui-block
        @click.prevent="$router.push('/personal')"
    >去完善个人信息</MduiButton>
    <div id="signup-button" class="mdui-valign">
        <MduiButton
            v-if="!changing"
            @click.prevent="change"
            class="mdui-color-theme"
            mdui-block
        >{{ text4Button2 }}</MduiButton>
        <div class="mdui-progress" v-if="changing">
            <div class="mdui-progress-indeterminate"></div>
        </div>
    </div>
</template>

<style>
#signup-card {
    max-width: 640px;
}
#signup-button {
    height: 64px;
}
</style>