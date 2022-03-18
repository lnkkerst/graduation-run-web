<script setup lang="ts">

</script>

<script lang="ts">
import { ref } from "vue";
import Button from "./mdItems/Button.vue";
export default {
    data() {
        return {
            isPassswdVaild: true,
            username: "",
            password: "",
            captcha: ""
        }
    },
    methods: {
        login() {
            if(this.username.length == 0) {
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
            } else if(this.password.length != 4){
                this.$mdui.alert("验证码格式不正确", "提示", undefined, {
                    "confirmText": "确定"
                });
            } else {
                this.$jq
            }
        },
        checkPassword() {
            this.isPassswdVaild = this.password.length > 8;
        }
    }
}
</script>

<template>
    <div class="mdui-card mdui-center">
        <div class="mdui-card-header">
            <p class="mdui-typo-headline">登录</p>
        </div>
        <form>
            <div class="mdui-textfield mdui-textfield-floating-label">
                <i class="mdui-icon material-icons">&#xe853;</i>
                <label class="mdui-textfield-label">用户名</label>
                <input v-model.lazy="username" class="mdui-textfield-input" type="text" />
            </div>
            <div
                class="mdui-textfield mdui-textfield-floating-label"
                :class="[{ 'mdui-textfield-invalid': !isPassswdVaild }]"
            >
                <i class="mdui-icon material-icons">&#xe0da;</i>
                <label class="mdui-textfield-label">密码</label>
                <input
                    v-model.lazy="password"
                    class="mdui-textfield-input"
                    type="password"
                    @change="checkPassword"
                />
                <div class="mdui-textfield-error">密码长度必须在 8 位以上</div>
            </div>
            <div>
                <div class="mdui-textfield mdui-textfield-floating-label">
                    <i class="mdui-icon material-icons">&#xe32a;</i>
                    <label class="mdui-textfield-label">验证码</label>
                    <input v-model.lazy="captcha" class="mdui-textfield-input" type="text" />
                </div>
                <div>
                    <img class="mdui-center" alt="加载失败" />
                </div>
            </div>

            <div class="mdui-card-actions">
                <button
                    class="mdui-btn mdui-ripple mdui-center mdui-btn-block mdui-color-theme"
                    @click.prevent="login"
                >使用通行证登录</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.mdui-card {
    margin-top: 100px;
    max-width: 400px;
    padding: 10px;
}
.mdui-card-header {
    text-align: center;
}
.mdui-textfield {
    padding-left: 15px;
    padding-right: 30px;
}
.mdui-card-actions {
    margin-top: 15px;
}
</style>