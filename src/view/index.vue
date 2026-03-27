<template>
    <div style="padding: 20px;height: 100%; width: 100%;box-sizing: border-box; display: flex; justify-content: center; align-items: center;">
        <el-button style="width: 100%;" size="large" type="primary" plain v-for="item in list" @click="toQuestionRouter(item.code)">{{ item.title }} - {{ item.code }}</el-button>
    </div>
</template>
    
<script setup>
import { useRouter } from 'vue-router';
import paper_type from '@/utils/paper_type.js'
import { ref } from 'vue';

const router = useRouter()
const list = ref([])

for (const key in paper_type) {
    if (!Object.hasOwn(paper_type, key)) continue;
    list.value.push({
        code: key,
        title: paper_type[key]
    })
}

const toQuestionRouter = (code) => {
    router.push(`/question/${code}`)
}
</script>
    
<style>
    
</style>