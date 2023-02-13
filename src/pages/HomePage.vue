<template>
  <div class="home-page">
    <h1 class="mb-8">Задачи</h1>

    <div class="d-f jc-sb">
      <div>
        <h2>Создать пользака</h2>
        <ch-form>
          <ch-form-item>
            <ch-input v-model="registrationForm.email" placeholder="email" />
          </ch-form-item>
          <ch-form-item>
            <ch-input v-model="registrationForm.name" placeholder="name" />
          </ch-form-item>
        </ch-form>
        <ch-button @click="handleFormSubmit">submit</ch-button>
      </div>
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
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useLazyQuery, useMutation } from '@vue/apollo-composable'
import { TodoType } from '@/types/todo.type'
import { GET_ALL } from '@/services/TodoService/TodoService'
import { CREATE } from '@/services/UserService/UserService'

const isTaskAddVisible = ref(false)
const tasks = ref<TodoType[]>([])

const registrationForm = reactive({
  email: '',
  name: '',
})

const { onResult: onTasksResult, loading: tasksLoading, load: loadTodos, refetch: tasksRefetch } = useLazyQuery(GET_ALL)

const { mutate: createUser } = useMutation(CREATE)

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

  loadTasks()
}

const handleFormSubmit = (): void => {
  createUser({
    user: {
      name: registrationForm.name,
      email: registrationForm.email,
    },
  })
}
</script>
