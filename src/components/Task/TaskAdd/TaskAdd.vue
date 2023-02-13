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
import { useMutation } from '@vue/apollo-composable'
import { CREATE } from '@/services/TodoService/TodoService'

type Emits = {
  (e: 'close'): void
  (e: 'update'): void
}

const emits = defineEmits<Emits>()

const taskText = ref('')

const { mutate: create } = useMutation(CREATE)

const handleTaskAdd = async (): Promise<void> => {
  await create({
    todo: {
      userId: 1,
      text: taskText.value,
    },
  })

  handleClose()
}

const handleClose = (): void => {
  emits('close')

  emits('update')
}
</script>
