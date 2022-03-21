<script setup lang="ts">
import MduiButton from "./mdItems/Button.vue";
</script>

<script lang="ts">
export default {
    data() {
        return {
            form: {
                sduId: "error",
                number: "error",
                name: "",
                sex: "",
                campus: "",
                clothingSize: "",
                branch: "",
                phone: "",
                id: "",
                contact: "",
                cPhone: ""
            },
            campus: [
                "中心校区",
                "洪家楼校区",
                "兴隆山校区",
                "趵突泉校区",
                "千佛山校区",
                "软件园校区"
            ],
            clothingSize: [
                "S",
                "M",
                "L",
                "XL",
                "XXL"
            ]
        }
    },
    mounted() {
        this.$mdui.mutation();
    },
    methods: {
        updatePersonal() {
            this.$mdui.alert(JSON.stringify(this.form));
        }
    }
}
</script>

<template>
    <form>
        <div
            class="mdui-card mdui-m-y-4 mdui-shadow-12 mdui-card-content mdui-p-x-4 mdui-container mdui-center"
            id="personal-card"
        >
            <div class="mdui-row mdui-valign mdui-m-t-2">
                <span class="mdui-col-xs-4 mdui-typo-subheading">学号：</span>
                <div class="mdui-col-xs-8 mdui-textfield mdui-textfield-has-bottom">
                    <input
                        class="mdui-textfield-input"
                        type="text"
                        disabled
                        :placeholder="form.sduId"
                    />
                </div>
            </div>
            <div class="mdui-divider mdui-m-y-2"></div>
            <div class="mdui-row mdui-valign">
                <span class="mdui-col-xs-4 mdui-typo-subheading">参赛号码：</span>
                <div class="mdui-col-xs-8 mdui-textfield mdui-textfield-has-bottom">
                    <input
                        class="mdui-textfield-input"
                        type="text"
                        disabled
                        :placeholder="form.number"
                    />
                </div>
            </div>
            <div class="mdui-divider mdui-m-y-2"></div>
            <div class="mdui-row mdui-valign">
                <span class="mdui-col-xs-4 mdui-typo-subheading">姓名：</span>
                <div class="mdui-col-xs-8 mdui-textfield mdui-textfield-has-bottom">
                    <label class="mdui-textfield-label"></label>
                    <input v-model="form.name" class="mdui-textfield-input" type="text" required />
                    <div class="mdui-textfield-error">请输入姓名</div>
                </div>
            </div>
            <div class="mdui-divider mdui-m-t-2"></div>
            <div class="mdui-row mdui-m-y-4 mdui-valign">
                <span class="mdui-col-xs-4 mdui-typo-subheading">性别：</span>
                <label class="mdui-radio mdui-col-xs-4">
                    <input v-model="form.sex" type="radio" name="group1" />
                    <i class="mdui-radio-icon"></i>
                    男
                </label>

                <label class="mdui-radio mdui-col-xs-4">
                    <input v-model="form.sex" type="radio" name="group1" />
                    <i class="mdui-radio-icon"></i>
                    女
                </label>
            </div>
            <div class="mdui-divider"></div>
            <div class="mdui-row mdui-m-y-4 mdui-valign">
                <span class="mdui-col-xs-4 mdui-typo-subheading">校区：</span>
                <select
                    v-model="form.campus"
                    class="mdui-select"
                    mdui-select="{position: 'bottom'}"
                >
                    <option v-for="option in campus">{{ option }}</option>
                </select>
            </div>
            <div class="mdui-divider"></div>
            <div class="mdui-row mdui-m-y-4 mdui-valign">
                <span class="mdui-col-xs-4 mdui-typo-subheading">衣服尺寸：</span>
                <select
                    v-model="form.clothingSize"
                    class="mdui-select mdui-col-xs-8"
                    mdui-select="{position: 'bottom'}"
                >
                    <option v-for="size in clothingSize">{{ size }}</option>
                </select>
            </div>
            <div class="mdui-divider mdui-m-y-2"></div>
            <div class="mdui-row mdui-valign">
                <span class="mdui-col-xs-4 mdui-typo-subheading">学院：</span>
                <div class="mdui-col-xs-8 mdui-textfield mdui-textfield-has-bottom">
                    <label class="mdui-textfield-label"></label>
                    <input v-model="form.branch" class="mdui-textfield-input" type="text" required />
                    <div class="mdui-textfield-error">请输入学院</div>
                </div>
            </div>
            <div class="mdui-divider mdui-m-y-2"></div>
            <div class="mdui-row mdui-valign">
                <span class="mdui-col-xs-4 mdui-typo-subheading">手机号：</span>
                <div class="mdui-col-xs-8 mdui-textfield mdui-textfield-has-bottom">
                    <label class="mdui-textfield-label"></label>
                    <input v-model="form.phone" class="mdui-textfield-input" type="text" required />
                    <div class="mdui-textfield-error">请输入手机号</div>
                </div>
            </div>
            <div class="mdui-divider mdui-m-y-2"></div>
            <div class="mdui-row mdui-valign">
                <span class="mdui-col-xs-4 mdui-typo-subheading">身份证号：</span>
                <div class="mdui-col-xs-8 mdui-textfield mdui-textfield-has-bottom">
                    <label class="mdui-textfield-label"></label>
                    <input v-model="form.id" class="mdui-textfield-input" type="text" required />
                    <div class="mdui-textfield-error">请输入身份证号</div>
                </div>
            </div>
            <div class="mdui-divider mdui-m-y-2"></div>
            <div class="mdui-row mdui-valign">
                <span class="mdui-col-xs-4 mdui-typo-subheading">紧急联系人：</span>
                <div class="mdui-col-xs-8 mdui-textfield mdui-textfield-has-bottom">
                    <label class="mdui-textfield-label"></label>
                    <input v-model="form.contact" class="mdui-textfield-input" type="text" required />
                    <div class="mdui-textfield-error">请输入紧急联系人</div>
                </div>
            </div>
            <div class="mdui-divider mdui-m-y-2"></div>
            <div class="mdui-row mdui-valign">
                <span class="mdui-col-xs-4 mdui-typo-subheading">紧急联系人电话：</span>
                <div class="mdui-col-xs-8 mdui-textfield mdui-textfield-has-bottom">
                    <label class="mdui-textfield-label"></label>
                    <input v-model="form.cPhone" class="mdui-textfield-input" type="text" required />
                    <div class="mdui-textfield-error">请输入紧急联系人电话</div>
                </div>
            </div>
            <div class="mdui-divider mdui-m-y-2"></div>
            <div class="mdui-card-actions">
                <MduiButton
                    mdui-block
                    @click.prevent="updatePersonal"
                    class="mdui-color-theme"
                >更新个人信息</MduiButton>
            </div>
        </div>
    </form>
</template>

<style>
#personal-card {
    max-width: 640px;
}
</style>