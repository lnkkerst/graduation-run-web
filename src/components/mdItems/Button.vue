<script setup lang="ts">
import Icon from "./Icon.vue";
import { defineComponent } from "vue";

const props = defineProps<{
    content?: string;
    mduiRaised?: boolean;
    mduiIcon?: boolean;
    mduiDense?: boolean;
    mduiBlock?: boolean;
    mduiIconName?: string;
}>();

let isRaised = props.mduiRaised;
let isIcon = props.mduiIcon;
let isDense = props.mduiRaised;
let iconName = props.mduiIconName;
let isBlock = props.mduiBlock;

</script>

<script lang="ts">
export default defineComponent({
    
})
</script>

<template>
    <button
        class="mdui-btn mdui-ripple"
        :class="[
            { 'mdui-btn-raised': isRaised },
            { 'mdui-btn-icon': isIcon },
            { 'mdui-btn-dense': isDense },
            { 'mdui-btn-block': isBlock }
        ]"
    >
        <Icon v-if="iconName">{{ iconName }}</Icon>
        <slot v-else>Button</slot>
    </button>
</template>

<style scoped>
</style>