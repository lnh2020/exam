<template>
    <el-container>
        <el-header>
            <el-dropdown @command="command">
                <span class="el-dropdown-link">
                    <el-icon :size="18">
                        <Operation />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item :command="question_type" v-for="question_type in question_type_list">{{ question_type.label }}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <div class="title">{{ paper_type[code] }}</div>
            <span class="el-form-item__label el-form-item--small" style="margin: 0 auto 0 10px;" @click="router.push('/')">首页</span>
            <span class="el-form-item__label el-form-item--small" style="margin: 0 0 0 auto;">{{ current_question_type.label }}</span>
            <el-form-item :label="examStore.show_answer ? '背题模式' : '答题模式'">
                <el-switch :modelValue="examStore.show_answer" @change="examStore.set_show_answer" />
            </el-form-item>
        </el-header>
        <el-main>
            <router-view :type="current_question_type.value" :show_answer="examStore.show_answer" />
        </el-main>
    </el-container>
</template>

<script setup>
import { Operation } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import paper_type, { question_type_list } from '@/utils/paper_type.js'
import { computed, ref } from 'vue'
import { useExamStore } from '@/store'

const examStore = useExamStore()
const route = useRoute()
const router = useRouter()
const code = computed(() => route.params.code)

const current_question_type = ref(question_type_list[0])

const command = (val) => {
    current_question_type.value = val
}
</script>

<style scoped lang="scss">
.el-container {
    width: 100%;
    height: 100%;
}

.el-header {
    border-bottom: 1px solid var(--el-border-color);
    display: flex;
    align-items: center;

    .title {
        margin-left: 10px;
        font-weight: bold;
        color: var(--el-text-color-primary);
    }

    .el-form-item--small {
        margin: 0;
    }
}

.el-main {
    height: calc(100% - 64px);
    overflow-x: hidden;
    overflow-y: auto;
    padding-top: 0;
}
</style>