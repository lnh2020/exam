import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useExamStore = defineStore('exam', () => {
    const show_answer = ref(false)

    const set_show_answer = (val) => {
        show_answer.value = val
    }

    return {
        show_answer,
        set_show_answer
    }
})