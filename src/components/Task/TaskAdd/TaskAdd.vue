<template>
  <div class="task-add">
    <ch-input v-model="taskText" placeholder="Напишите задачу...." class="mb-8" />
    <div>
      <ch-button @click="handleTaskAdd">Добавить задачу</ch-button>
      <ch-button @click="handleClose">Закрыть</ch-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

type Emits = {
  (e: 'close'): void
}

const emits = defineEmits<Emits>()

const taskText = ref('')

const handleTaskAdd = async (): Promise<void> => {
  console.log(taskText.value)
}

const handleClose = (): void => {
  emits('close')
}
</script>
