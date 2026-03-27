<template>
    <div class="exam-questions">
        <el-progress :percentage="percentage" striped />
        <el-card class="question-card" shadow="hover">
            <!-- 单选题组件 -->
            <SingleChoiceQuestion v-if="type === 'X'" 
            :index="active_question_index" :question="question_list[active_question_index]" />

            <!-- 填空题组件 -->
            <FillBlankQuestion v-else-if="type === 'T'"  
            :index="active_question_index" :question="question_list[active_question_index]"/>

            <!-- 简答题组件 -->
            <ShortAnswerQuestion v-else-if="type === 'J'"  
            :index="active_question_index" :question="question_list[active_question_index]" />

            <!-- 综合题组件 -->
            <ComprehensiveQuestion v-else  :index="active_question_index" :question="question_list[active_question_index]" />

            <custom-button :leftDisabled="active_question_index <= 0" @prev="prev" @next="next" />

        </el-card>
    </div>
</template>

<script setup>
import SingleChoiceQuestion from '@/components/SingleChoiceQuestion.vue'
import FillBlankQuestion from '@/components/FillBlankQuestion.vue'
import ShortAnswerQuestion from '@/components/ShortAnswerQuestion.vue'
import ComprehensiveQuestion from '@/components/ComprehensiveQuestion.vue'
import CustomButton from '@/components/CustomButton.vue'
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import axios from 'axios'
import shuffle from '@/utils/shuffle.js'

const props = defineProps({
    type: {
        type: String,
        required: true
    },
    show_answer: {
        type: Boolean,
        required: true
    },
})

const route = useRoute()
const question_list = ref([{}])
const active_question_index = ref(0)

const code = computed(() => route.params.code)
const percentage = computed(() => parseInt(((active_question_index.value + 1) / question_list.value.length) * 100))

watch(() => props.type, (type) => {
    axios.get(`/json/${code.value}/${type}.json`).then(res => {
        question_list.value = shuffle(res.data)
    })
}, {immediate: true})


const prev = () => {
    active_question_index.value --
}
const next = () => {
    if(active_question_index.value === question_list.value.length - 1) return
    active_question_index.value ++
    if (active_question_index.value > question_list.value.length) {
        alert('超出了最大题目数了')
    }
}
</script>

<style scoped lang="scss">
.exam-questions {
    margin: 0 auto;
}

.el-progress {
    margin-top: 10px;
    margin-bottom: 10px;
    ::v-deep(.el-progress__text) {
        font-size: var(--el-font-size-extra-small) !important;
        color: var(--el-text-color-secondary);
        min-width: 30px;
    }
}
</style>