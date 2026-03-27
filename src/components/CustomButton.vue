<template>
    <el-button-group class="btns">
        <el-button type="primary" :icon="ArrowLeft" :disabled="leftDisabled"  @click="$emit('prev')">上一题</el-button>
        <el-button type="primary" :icon="ArrowRight" @click="$emit('next')">下一题</el-button>
    </el-button-group>
</template>

<script setup>
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
defineProps({'leftDisabled': Boolean})

</script>

<style scoped>
.btns {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>