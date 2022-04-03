<script setup lang="ts">
import router from "../router";
import Button from "./mdItems/Button.vue";
import Icon from "./mdItems/Icon.vue";
import { defineComponent } from "vue";
</script>

<script lang="ts">

export default defineComponent({
    data() {
        return {
            isPassswdVaild: true,
            username: "",
            password: "",
            captcha: "",
            captchaSvg: "",
            logging: false
        }
    },
    methods: {
        async login() {
            if (this.$data.username.length == 0) {
                this.$mdui.alert("请输入用户名", "提示", undefined, {
                    "confirmText": "确定"
                });
            } else if (this.password.length == 0) {
                this.$mdui.alert("请输入密码", "提示", undefined, {
                    "confirmText": "确定"
                });
            } else if (this.password.length < 8) {
                this.$mdui.alert("密码长度必须大于 8 位", "提示", undefined, {
                    "confirmText": "确定"
                });
            } else if (this.captcha.length !== 4) {
                this.$mdui.alert("验证码格式不正确", "提示", undefined, {
                    "confirmText": "确定"
                });
            } else {
                this.logging = true;
                try {
                    const res = await this.$axios.post("/auth/admin", {
                        username: this.$data.username,
                        password: this.password,
                        captcha: this.captcha,
                        uuid: localStorage.getItem("uuid")
                    })
                    if (res.data.code === 0) {
                        localStorage.setItem("admin_token", res.data.data.admin_token as string);
                        this.$mdui.snackbar("登陆成功", {buttonText:"确定"});
                        this.$router.push("/");
                    } else {
                        let msg: string;
                        if (res.data.data.type === 1) {
                            msg = "验证码错误";
                        } else if (res.data.data.type === 3) {
                            msg = "用户名或密码错误";
                        } else {
                            msg = "未知错误";
                        }
                        this.$mdui.alert(msg, "提示", undefined, {
                            confirmText: "确定"
                        });
                    }
                } catch (_e) {
                    const e = _e as Error;
                    if (import.meta.env.DEV) {
                        console.log(e.message);
                    }
                }

            }
            this.logging = false;
        },
        checkPassword() {
            this.isPassswdVaild = this.password.length > 8;
        },
        async changeCaptcha() {
            try {
                const res = await this.$axios.get("/auth/captcha");
                this.captchaSvg = res.data.data.svg;
                localStorage.setItem("uuid", res.data.data.uuid);
            } catch (_e) {
                this.$mdui.alert("获取验证码失败", "警告", undefined, {
                    confirmText: "确定"
                })
                const e = _e as Error;
                if (import.meta.env.DEV) {
                    console.log(e.message);
                }
            }
        }
    },
    mounted() {
        this.$mdui.mutation();
        this.changeCaptcha();
        
    }
});
</script>

<template>
    <div id="login-card" class="mdui-card mdui-center">
        <p class="mdui-typo-headline" id="login-header">登录</p>
        <form id="login-form">
            <div class="mdui-textfield mdui-textfield-floating-label mdui-textfield-has-bottom">
                <i class="mdui-icon material-icons">&#xe853;</i>
                <label class="mdui-textfield-label">用户名</label>
                <input v-model.lazy="username" class="mdui-textfield-input" type="text" required />
                <div class="mdui-textfield-error">用户名不能为空</div>
            </div>
            <div class="mdui-textfield mdui-textfield-floating-label mdui-textfield-has-bottom">
                <i class="mdui-icon material-icons">&#xe0da;</i>
                <label class="mdui-textfield-label">密码</label>
                <input
                    v-model.lazy="password"
                    class="mdui-textfield-input"
                    type="password"
                    @change="checkPassword"
                    pattern="^.*(?=.{8,}).*$"
                    required
                />
                <div class="mdui-textfield-error">密码至少 8 位</div>
                <div class="mdui-textfield-helper">请输入至少 8 位</div>
            </div>
            <div class="mdui-valign mdui-row">
                <div
                    class="mdui-textfield mdui-textfield-floating-label mdui-textfield-has-bottom mdui-col-xs-6"
                >
                    <i class="mdui-icon material-icons">&#xe32a;</i>
                    <label class="mdui-textfield-label">验证码</label>
                    <input v-model.lazy="captcha" class="mdui-textfield-input" type="text" required />
                    <div class="mdui-textfield-error">请输入验证码</div>
                </div>
                <div v-html="captchaSvg" @click.prevent="changeCaptcha" class="mdui-col-xs-6"></div>
            </div>
            <div id="login-action" class="mdui-valign mdui-center mdui-col">
                <button
                    v-if="!logging"
                    class="mdui-btn mdui-ripple mdui-center mdui-btn-block mdui-color-theme"
                    @click.prevent="login"
                >使用通行证登录</button>
                <div class="mdui-progress" v-if="logging">
                    <div class="mdui-progress-indeterminate"></div>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>
.mdui-card {
    margin-top: 96px;
    padding: 20px;
    max-width: 400px;
    width: 80%;
}

#login-form {
    padding: 0 24px 16px 16px;
}

#login-action {
    margin-top: 16px;
    height: 64px;
}

#login-header {
    text-align: center;
    margin-bottom: 0;
}
</style>