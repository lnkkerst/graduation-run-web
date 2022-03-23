<script setup lang="ts">
import mdui from "mdui";
import router from "../router";
import MduiButton from "./mdItems/Button.vue";
import { defineComponent } from "vue";
</script>

<script lang="ts">
export default defineComponent({
  data() {
    return {
      notice: `1.此次活动为4公里长跑个人赛，全校师生均可以个人为单位参加此次毕业跑的活动。
2.组别设置：本次比赛分为竞赛组和大众组，竞赛组配发计时芯片计算成绩，大众组则不单独配发计时芯片，大众组可以通过终点处数码管计时器来知道自己的跑步时长。
3.比赛设置：为不造成人员拥挤，本次比赛采用不同组别分批次起跑，相同组别同时起跑的方式，竞赛组先出发，随后大众组按照相应的秩序出发，跑过起跑线感应处计时芯片开始计时，沿比赛规定路线，围绕兴隆山校区奔跑一周，跑过终点处计时器感应处停止计时，所计时长即为竞赛跑步时长，未跑完全程者没有成绩。
4.获奖方式：竞赛组中以个人跑步时长的长短为评判标准，男子组和女子组分开参与评奖，各组中用时最少的八人获胜，共十六位同学获得奖品，其中男子组女子组各组中的前三名作为冠亚季军到颁奖台领奖，大众组不参与评奖。无论哪一参赛组，凡参与者均会发放参与奖。
5.所有参赛者需身着由组委会统一提供的T恤，比赛期间，我们将为竞赛足额同学发放号码布，大众组无号码布，竞赛组参赛成员需要将参赛号码布固定于身前正面位置，且号码布不得遮挡、裁剪和折叠。
6.集合：各参赛队伍需于比赛当日08：30风雨操场集合。并按照对应的组别站好，现场设置报名点，现场报名者自动加入到大众组中，并按顺序入场。
7.出发顺序:本次比赛采用不同组别分批次起跑，相同组别同时起跑的方式，大众组先出发，随后竞赛组按照相应的秩序出发。
8.本次活动会为参赛者提供芯片计时服务，参赛者需严格按照说明书提供的方式正确佩戴计时标签以记录成绩，如因参赛者本人未能正确佩带计时标签导致无法记录成绩，概不负责。主办方会在起（终）点设有计时毯。
9.饮给站
组委会在工训中心路口处和终点处设有饮水站/能量补给站。
10.出现以下违反比赛规定的参赛选手将被取消参赛成绩，若因选手违规影响比赛正常进行，则因此引发的一切后果由其负责；
(1)携带他人计时标签参加比赛；
(2)以虚假身份报名或报名后由他人替跑；
(3)不在规定位置起跑；
(4)起跑时未按规定固定计时芯片后再出发造成秩序混乱者；
(5)没有沿规定路线跑进，绕近道或途中插入；
(6)退出比赛又强行加入者；
(7)不服从赛事工作人员指挥，干扰赛事，聚众闹事，打架斗殴者；
(8)有意冲撞、阻挡或者影响其他运动员跑进等；
(9)其他违反规则规定的行为。`.split('\n')
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      router.push("/login");
      this.$mdui.snackbar("已登出", { buttonText: "确定" });
    }
  },
  mounted() {
    this.$mdui.mutation();
  }
});
</script>

<template>
  <div class="mdui-card mdui-center mdui-shadow-16" id="notice-card">
    <div class="mdui-typo mdui-card-content">
      <p v-for="line in notice" class="mdui-typo-body-1">{{ line }}</p>
    </div>
  </div>
  <div class="mdui-row mdui-center" id="home-button-box">
    <div class="mdui-col-xs-6 mdui-valign">
      <MduiButton @click.prevent="$router.push('/signup')" class="mdui-color-theme mdui-center">前往报名页面</MduiButton>
    </div>
    <div class="mdui-col-xs-6 mdui-valign">
      <MduiButton @click.prevent="logout" class="mdui-color-theme mdui-center">退出报名系统</MduiButton>
    </div>
  </div>
</template>

<style scoped>
#notice-card {
  margin-top: 4%;
  max-width: 640px;
}
#home-button-box {
  margin-top: 6%;
  margin-bottom: 10%;
  max-width: 640px;
}
</style>
