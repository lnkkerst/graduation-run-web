<script setup lang="ts">
import { UserType } from "../../../types";
import MduiButton from "../../../components/mdItems/Button.vue";
import Icon from "../../../components/mdItems/Icon.vue";
import { defineComponent } from "vue";
</script>

<script lang="ts">
export default defineComponent({
    data() {
        return {
            thead: [
                {
                    content: "学号",
                    show: true,
                    kId: "sduId",
                },
                {
                    content: "号码",
                    show: true,
                    kId: "number",
                },
                {
                    content: "姓名",
                    show: true,
                    kId: "name",
                },
                {
                    content: "是否报名",
                    show: true,
                    kId: "signup",
                },
                {
                    content: "性别",
                    show: true,
                    kId: "sex",
                },
                {
                    content: "校区",
                    show: true,
                    kId: "campus",
                },
                {
                    content: "衣服尺寸",
                    show: true,
                    kId: "clothingSize",
                },
                {
                    content: "学院",
                    show: true,
                    kId: "branch",
                },
                {
                    content: "手机号",
                    show: true,
                    kId: "phone",
                },
                {
                    content: "身份证号",
                    show: true,
                    kId: "id",
                },
                {
                    content: "紧急联系人",
                    show: true,
                    kId: "contact",
                },
                {
                    content: "紧急联系人电话",
                    show: true,
                    kId: "cPhone",
                },
            ] as {
                content: string;
                show: boolean;
                kId: string;
            }[],
            filterItems: [
                {
                    type: 1,
                    title: "是否报名",
                    abbr: "signup",
                    items: [
                        {
                            content: true,
                            displayContent: "是",
                            checked: true,
                        },
                        {
                            content: false,
                            displayContent: "否",
                            checked: false,
                        },
                    ],
                },
                {
                    type: 1,
                    title: "性别",
                    abbr: "sex",
                    items: [
                        {
                            content: "男",
                            displayContent: "男",
                            checked: true,
                        },
                        {
                            content: "女",
                            displayContent: "女",
                            checked: true,
                        },
                    ],
                },
                {
                    type: 1,
                    title: "校区",
                    abbr: "campus",
                    items: [
                        {
                            content: "中心校区",
                            displayContent: "中心校区",
                            checked: true,
                        },
                        {
                            content: "洪家楼校区",
                            displayContent: "洪家楼校区",
                            checked: true,
                        },
                        {
                            content: "兴隆山校区",
                            displayContent: "兴隆山校区",
                            checked: true,
                        },
                        {
                            content: "趵突泉校区",
                            displayContent: "趵突泉校区",
                            checked: true,
                        },
                        {
                            content: "千佛山校区",
                            displayContent: "千佛山校区",
                            checked: true,
                        },
                        {
                            content: "软件园校区",
                            displayContent: "软件园校区",
                            checked: true,
                        },
                    ],
                },
                {
                    type: 1,
                    title: "衣服尺寸",
                    abbr: "clothingSize",
                    items: [
                        {
                            content: "S",
                            displayContent: "S",
                            checked: true,
                        },
                        {
                            content: "M",
                            displayContent: "M",
                            checked: true,
                        },
                        {
                            content: "L",
                            displayContent: "L",
                            checked: true,
                        },
                        {
                            content: "XL",
                            displayContent: "XL",
                            checked: true,
                        },
                        {
                            content: "XXL",
                            displayContent: "XXL",
                            checked: true,
                        },
                    ],
                },
            ],
            searchItems: [
                {
                    type: 2,
                    title: "学号",
                    abbr: "sduId",
                    keywords: [],
                },
                {
                    type: 2,
                    title: "号码",
                    abbr: "number",
                    keywords: [],
                },
                {
                    type: 2,
                    title: "姓名",
                    abbr: "name",
                    keywords: [],
                },
                {
                    type: 2,
                    title: "学院",
                    abbr: "name",
                    keywords: [],
                },
                {
                    type: 2,
                    title: "手机号",
                    abbr: "phone",
                    keywords: [],
                },
                {
                    type: 2,
                    title: "身份证号",
                    abbr: "id",
                    keywords: [],
                },
                {
                    type: 2,
                    title: "紧急联系人",
                    abbr: "contact",
                    keywords: [],
                },
                {
                    type: 2,
                    title: "紧急联系人电话",
                    abbr: "cPhone",
                    keywords: [],
                },
            ] as {
                type: number;
                title: string;
                abbr: string;
                keywords: {
                    type: number;
                    content: string;
                }[];
            }[],

            info: [] as UserType[],
            amount: 0,
            onePageHas: 20,
            curPage: 1,
            jumpPage: 1,
            tableLoading: false,
        };
    },
    watch: {
        info() {
            this.$mdui.updateTables();
        },
        async curPage() {
            await this.fetchPage();
        },
    },
    computed: {
        showedHead() {
            return this.thead.filter((head) => head.show);
        },
        maxPage() {
            return Math.floor((this.amount + this.onePageHas - 1) / this.onePageHas);
        },
        avaliablePage() {
            let res: number[] = [];
            for (let i = 0; i <= 9; ++i) {
                if (this.curPage + i > this.maxPage) {
                    break;
                }
                res.push(i + this.curPage);
            }
            return res;
        },
    },
    methods: {
        async fetchPage(page: number = -1) {
            if (page == -1) {
                page = this.curPage;
            }
            try {
                this.tableLoading = true;
                this.fetchAmount();
                const where = [] as { kId: string; items: (string | boolean)[] }[];
                for (let i of this.filterItems) {
                    if (i.type !== 1) {
                        continue;
                    }
                    let tmp = { kId: i.abbr, items: [] as (string | boolean)[] };
                    for (let j of i.items) {
                        if (j.checked) {
                            tmp.items.push(j.content);
                        }
                    }
                    where.push(tmp);
                }
                const res = await this.$axios.get("/admin/info/details", {
                    params: {
                        offset: this.onePageHas * (page - 1),
                        limit: this.onePageHas,
                        where: JSON.stringify(where),
                    },
                });
                this.info = res.data.data.info;
            } catch (_e) {
                this.$mdui.alert("获取信息失败", "警告", undefined, {
                    confirmText: "确定",
                });
                const e = _e as Error;
                if (import.meta.env.DEV) {
                    console.error(e.message);
                }
            } finally {
                this.tableLoading = false;
            }
        },
        async fetchAmount() {
            try {
                const where = [] as { kId: string; items: (string | boolean)[] }[];
                for (let i of this.filterItems) {
                    if (i.type !== 1) {
                        continue;
                    }
                    let tmp = { kId: i.abbr, items: [] as (string | boolean)[] };
                    for (let j of i.items) {
                        if (j.checked) {
                            tmp.items.push(j.content);
                        }
                    }
                    where.push(tmp);
                }
                const res = await this.$axios.get("/admin/info/amount", {
                    params: {
                        where: JSON.stringify(where)
                    }
                });
                if (res.data.code !== 0) {
                    throw new Error("error code 1");
                }
                this.amount = res.data.data.amount;
            } catch (_e) {
                this.$mdui.alert("获取信息失败", "警告", undefined, {
                    confirmText: "确定",
                });
                const e = _e as Error;
                if (import.meta.env.DEV) {
                    console.error(e.message);
                }
            }
        },
    },
    async mounted() {
        this.$mdui.mutation();
        this.fetchAmount();
        this.fetchPage();
    },
});
</script>

<template>
    <div class="mdui-row" hidden>
        <div v-for="item in thead">
            <label class="mdui-switch mdui-col-xs-3 mdui-valign">
                {{ item.content }}
                <div class="mdui-float-right">
                    <input type="checkbox" v-model="item.show" />
                    <i class="mdui-switch-icon"></i>
                </div>
            </label>
        </div>
    </div>

    <div class="mdui-raw mdui-m-t-4">
        <span class="mdui-float-right mdui-m-t-2">检索到 {{ amount }} 条信息</span>
    </div>
    <div class="mdui-collapse mdui-m-t-4" mdui-collapse>
        <div class="mdui-collapse-item">
            <div class="mdui-collapse-item-header mdui-valign">
                <div>
                    <MduiButton class="mdui-color-theme">
                        <Icon>filter_list</Icon>
                        <span class="mdui-m-l-1">筛选</span>
                    </MduiButton>
                </div>
            </div>

            <div class="mdui-collapse-item-body mdui-m-y-1 mdui-container-fiuld mdui-card mdui-shadow-10 mdui-m-y-2">
                <div class="mdui-p-a-3">
                    <div class="mdui-row mdui-valign mdui-m-b-2">
                        <div class="mdui-col-xs-2 mdui-type-subheading">显示</div>
                        <div class="mdui-col-xs-10 mdui-cotainer-fiuld">
                            <div class="mdui-chip mdui-m-l-2 mdui-p-x-1 mdui-ripple" v-for="item in thead"
                                :class="{ 'mdui-color-theme': item.show }" @click.prevent="item.show = !item.show">
                                <span class="mdui-chip-title">{{ item.content }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="mdui-row mdui-valign mdui-m-y-2" v-for="line in filterItems">
                        <div class="mdui-col-xs-2 mdui-typo-subheading">
                            {{ line.title }}
                        </div>
                        <div class="mdui-col-xs-10 mdui-cotainer-fiuld">
                            <div class="mdui-chip mdui-m-l-2 mdui-p-x-1 mdui-ripple" v-for="item in line.items"
                                :class="{ 'mdui-color-theme': item.checked }"
                                @click.prevent="item.checked = !item.checked">
                                <span class="mdui-chip-title">{{ item.displayContent }}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <MduiButton class="mdui-color-theme" @click.prevent="fetchPage()">应用</MduiButton>
                        <MduiButton class="mdui-color-theme mdui-m-l-3">重置</MduiButton>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="mdui-table-fluid mdui-shadow-10">
        <div class="mdui-spinner mdui-spinner-colorful mdui-center mdui-m-a-4" v-if="tableLoading"></div>
        <table class="mdui-table mdui-table-hoverable" v-if="!tableLoading">
            <thead>
                <tr>
                    <th v-for="h in showedHead">{{ h.content }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item of info">
                    <td v-show="thead[0].show">{{ item.sduId }}</td>
                    <td v-show="thead[1].show">{{ item.number }}</td>
                    <td v-show="thead[2].show">{{ item.name }}</td>
                    <td v-show="thead[3].show">{{ item.signup ? "是" : "否" }}</td>
                    <td v-show="thead[4].show">{{ item.sex }}</td>
                    <td v-show="thead[5].show">{{ item.campus }}</td>
                    <td v-show="thead[6].show">{{ item.clothingSize }}</td>
                    <td v-show="thead[7].show">{{ item.branch }}</td>
                    <td v-show="thead[8].show">{{ item.phone }}</td>
                    <td v-show="thead[9].show">{{ item.id }}</td>
                    <td v-show="thead[10].show">{{ item.contact }}</td>
                    <td v-show="thead[11].show">{{ item.cPhone }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="mdui-m-t-3 mdui-m-b-2 mdui-row mdui-valign">
        <div class="mdui-col-xs-8">
            <MduiButton mdui-raised class="mdui-btn-icon mdui-color-white mdui-shadow-6 mdui-m-l-1"
                @click.prevent="curPage = curPage == 1 ? 1 : curPage - 1">
                <span class="mdui-center mdui-typo-body-1">{{ "<" }}</span>
            </MduiButton>
            <MduiButton mdui-raised v-for="i of avaliablePage"
                class="mdui-btn-icon mdui-color-white mdui-shadow-6 mdui-m-l-1" @click.prevent="curPage = i"
                :class="{ 'mdui-color-theme': curPage === i }">
                <span class="mdui-typo-body-1 mdui-center">{{ i }}</span>
            </MduiButton>
            <MduiButton mdui-raised class="mdui-btn-icon mdui-color-white mdui-shadow-6 mdui-m-l-1"
                @click.prevent="curPage = curPage == maxPage ? curPage : curPage + 1">
                <span class="mdui-center mdui-typo-body-1">{{ ">" }}</span>
            </MduiButton>
        </div>
        <div class="mdui-col-xs-1 mdui-typo-subheading mdui-p-t-1">跳转到</div>
        <div class="mdui-textfield mdui-textfield-floating-label mdui-p-a-0 mdui-col-xs-1">
            <!-- <label class="mdui-textfield-label">跳转到</label> -->
            <input class="mdui-textfield-input" type="number" v-model="jumpPage" />
        </div>
        <div class="mdui-col-xs-2">
            <MduiButton class="mdui-color-theme" @click.prevent="curPage = Math.min(Math.max(1, jumpPage), maxPage)">Go!
            </MduiButton>
        </div>
    </div>
</template>

<style scoped>
td {
    white-space: nowrap;
}
</style>
