<script setup lang="ts">
import Icon from "./Icon.vue";

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

</script>

<script lang="ts">
export default {

}
</script>

<template>
    <button
        class="mdui-btn mdui-ripple"
        :class="[
            { 'mdui-btn-raised': isRaised },
            { 'mdui-btn-icon': isIcon },
            { 'mdui-btn-dense': isDense }
        ]"
    >
        <Icon v-if="iconName">{{ iconName }}</Icon>
        <slot v-else>Button</slot>
    </button>
</template>

<style scoped>
</style>