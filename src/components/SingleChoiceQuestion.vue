<template>
  <div>
    <div class="question-content">
      <div class="question-text">
        <span class="question-number">{{ index + 1 }}.</span>
        <span v-html="question.题目"></span>
      </div>

      <el-radio-group v-model="userAnswer" class="options-group" @change="setAnswerHandle" :data-error="dataError">
        <el-radio
          v-for="option in question.选项"
          :key="option"
          :value="option.charAt(0)"
          class="option-item"
        >
          {{ option }}
        </el-radio>
      </el-radio-group>
    </div>

    <div class="answer-section" v-show="showAnswer || examStore.show_answer">
      <el-divider />
      <div class="answer-info">
        <div class="answer-item">
          <span class="label">正确答案：</span>
          <el-tag type="success" size="small">{{ question.答案 }}</el-tag>
        </div>
        <div class="answer-item" v-if="question.考点">
          <span class="label">考点：</span>
          <span class="value">{{ question.考点 }}</span>
        </div>
        <div class="answer-item" v-if="question.解析">
          <span class="label">解析：</span>
          <span class="value">{{ question.解析 }}</span>
        </div>
      </div>
    </div>

    <div class="action-buttons" v-if="!examStore.show_answer">
      <el-button type="primary" size="small" @click="showAnswer = !showAnswer">
        {{ showAnswer ? '隐藏答案' : '查看答案' }}
      </el-button>
      <el-button type="info" size="small" @click="clearAnswer" v-if="userAnswer">
        清除答案
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useExamStore } from '@/store'

const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
})

const examStore = useExamStore()


const userAnswer = ref('')
const showAnswer = ref(false)

const clearAnswer = () => {
  userAnswer.value = ''
}

watch(() => [examStore.show_answer, props.question.id, props.index], newv => {
  if (newv[0]) userAnswer.value = props.question.答案
  else clearAnswer()
}, {immediate: true})


const dataError = ref(false)
const setAnswerHandle = (val) => {
  dataError.value = props.question.答案 !== val
}

</script>

<style scoped lang="scss">
.question-card {
  margin-bottom: 20px;
  border-radius: 12px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.question-id {
  color: #909399;
  font-size: 12px;
}

.question-content {
  padding: 8px 0;
}

.question-text {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #2c3e50;
}

.question-number {
  font-weight: 600;
  margin-right: 8px;
  color: #409eff;
}

.options-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-left: 24px;
  align-items: flex-start;
}

.option-item {
  margin-right: 0;
}

.answer-section {
  margin-top: 16px;
}

.answer-info {
  background-color: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
}

.answer-item {
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.5;
}

.answer-item:last-child {
  margin-bottom: 0;
}

.label {
  font-weight: 600;
  color: #606266;
  margin-right: 8px;
}

.value {
  color: #2c3e50;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}
.el-radio {
  white-space: pre-wrap;
}
.el-radio-group[data-error=true] {
  .el-radio.is-checked {
      ::v-deep(.el-radio__input) {
        .el-radio__inner {
          border-color: var(--el-color-error-dark-2);
          background: var(--el-color-error-dark-2);
        }
      }

      ::v-deep(.el-radio__label) {
        color: var(--el-color-error-dark-2) !important;
      }
  }
}
</style>