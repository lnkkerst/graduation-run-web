<script setup lang="ts">
import MduiButton from "../../../components/mdItems/Button.vue";
import { defineComponent, onMounted } from "vue";
import xlsx, { IJsonSheet } from "json-as-xlsx";
onMounted(() => {

});
</script>

<script lang="ts">
export default defineComponent({
    data() {
        return {
            fetching: false
        }
    },
    methods: {
        async fetchCSV() {
            try {
                this.fetching = true;
                const res = await this.$axios.get("/admin/info/csv", {
                    responseType: "blob"
                });
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'table.csv');
                document.body.appendChild(link);
                link.click();
            } catch (_e) {
                this.$mdui.alert("导出失败", "警告", undefined, {
                    confirmText: "确定"
                })
            } finally {
                this.fetching = false;
            }
        },
        async fetchXLSX() {
            try {
                this.fetching = true;
                const res = await this.$axios.get("/admin/info/json");
                let data: IJsonSheet[] = [{
                    sheet: "报名信息",
                    columns: [
                        { label: "学号", value: "sduId" },
                        { label: "号码", value: "number" },
                        { label: "姓名", value: "name" },
                        { label: "性别", value: "sex" },
                        { label: "校区", value: "campus" },
                        { label: "衣服尺寸", value: "clothingSize" },
                        { label: "学院", value: "branch" },
                        { label: "手机号", value: "phone" },
                        { label: "身份证号", value: "id" },
                        { label: "紧急联系人", value: "contact" },
                        { label: "紧急联系人电话", value: "cPhone" },
                        { label: "是否报名", value: "signup" }
                    ],
                    content: (res.data as any[]).map(item => {
                        item.signup = item.signup ? "是" : "否";
                        return item;
                    })
                }]
                xlsx(data, {
                    fileName: "table",
                    extraLength: 3,
                    writeOptions: {}
                });
            } catch (_e) {
                const e = _e as Error;
                this.$mdui.alert("导出失败", "警告", undefined, {
                    confirmText: "确定"
                })
                console.log(e.message);
            } finally {
                this.fetching = false;
            }
        }
    }
})
</script> 

<template>
    <div class="mdui-valign mdui-m-t-4">
        <MduiButton v-if="!fetching" @click.prevent="fetchCSV" class="mdui-color-theme" mdui-block>导出 CSV 表格
        </MduiButton>
        <div class="mdui-progress" v-if="fetching">
            <div class="mdui-progress-indeterminate"></div>
        </div>
    </div>
    <div class="mdui-valign mdui-m-t-4">
        <MduiButton v-if="!fetching" @click.prevent="fetchXLSX" class="mdui-color-theme" mdui-block>导出 XLSX 表格
        </MduiButton>
        <div class="mdui-progress" v-if="fetching">
            <div class="mdui-progress-indeterminate"></div>
        </div>
    </div>
</template>

<style scoped>
</style>