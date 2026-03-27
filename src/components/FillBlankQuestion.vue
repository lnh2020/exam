<template>
  <div>
    <div class="question-content">
      <div class="question-text">
        <span class="question-number">{{ index + 1 }}.</span>
        <span v-html="formattedQuestion"></span>
      </div>

      <div class="input-group">
        <el-input
          v-model="userAnswer"
          type="textarea"
          :rows="2"
          placeholder="请输入您的答案，多个空用空格分隔"
          class="answer-input"
        />
      </div>
    </div>

    <div class="answer-section" v-if="showAnswer || examStore.show_answer">
      <el-divider />
      <div class="answer-info">
        <div class="answer-item">
          <span class="label">正确答案：</span>
          <el-tag type="success" style="margin-right: 4px;" v-for="value in question.答案" :key="value">{{ value }}</el-tag>
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

    <div class="action-buttons">
      <el-button type="primary" size="small" @click="showAnswer = !showAnswer">
        {{ showAnswer ? '隐藏答案' : '查看答案' }}
      </el-button>
      <el-button type="info" size="small" @click="clearAnswer" v-if="userAnswer && !examStore.show_answer">
        清除答案
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useExamStore } from '@/store'

const examStore = useExamStore()
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

const userAnswer = ref('')
const showAnswer = ref(false)

const formattedQuestion = computed(() => {
  // 将下划线替换为输入框样式
  return props.question.题目.replace(/______/g, '<span class="blank">______</span>')
})

watch(() => [examStore.show_answer, props.question.id, props.index], newv => {
  if (newv[0]) userAnswer.value = props.question.答案
}, {immediate: true})

const clearAnswer = () => {
  userAnswer.value = ''
}
</script>

<style scoped>
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
  line-height: 1.8;
  margin-bottom: 20px;
  color: #2c3e50;
}

.question-number {
  font-weight: 600;
  margin-right: 8px;
  color: #e6a23c;
}

.blank {
  display: inline-block;
  min-width: 80px;
  border-bottom: 2px dashed #409eff;
  margin: 0 4px;
  color: #409eff;
  font-weight: 500;
}

.input-group {
  margin-top: 16px;
}

.answer-input {
  width: 100%;
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
</style>