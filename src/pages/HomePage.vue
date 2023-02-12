<template>
  <div class="home-page">
    <h1 class="mb-8">Задачи</h1>

    <div class="cards">
      <div class="cards__content">
        <template v-if="!tasksLoading && tasks.length">
          <task-card v-for="task in tasks" :id="task.id" :key="task.id" :text="task.text" @update-table="loadTasks" />
        </template>

        <div v-else>Loading...</div>
      </div>

      <h4 v-if="!isTaskAddVisible" @click="handleAddTaskVisibleToggle">Добавить задачу</h4>

      <task-add v-else @close="handleAddTaskVisibleToggle" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useLazyQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { TodoType } from '@/types/todo.type'

const isTaskAddVisible = ref(false)
const tasks = ref<TodoType[]>([])

const {
  onResult: onTasksResult,
  loading: tasksLoading,
  load: loadTodos,
  refetch: tasksRefetch,
} = useLazyQuery(
  gql`
    query {
      getAllTodos {
        id
        userId
        updatedAt
        text
        createdAt
        status
      }
    }
  `
)

onTasksResult(({ data }) => {
  tasks.value = data?.getAllTodos
})

onMounted(() => {
  loadTodos()
})

const loadTasks = async (): Promise<void> => {
  tasksRefetch()
}

const handleAddTaskVisibleToggle = (): void => {
  isTaskAddVisible.value = !isTaskAddVisible.value
}
</script>
