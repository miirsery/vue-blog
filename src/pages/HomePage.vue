<template>
  <div class="home-page">
    <h1 class="mb-8">Задачи</h1>

    <div class="d-f jc-sb">
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

    <ch-dialog title="Создать пользака" width="400">
      <div class="login">
        <ch-form class="login-form">
          <ch-form-item class="login-form__item">
            <ch-input v-model="registrationForm.email" label="email" type="email" />
          </ch-form-item>
          <ch-form-item class="login-form__item">
            <ch-input v-model="registrationForm.name" label="name" />
          </ch-form-item>
          <ch-form-item class="login-form__item">
            <ch-checkbox v-model="registrationForm.isRemember" label="Remember me" />
          </ch-form-item>
        </ch-form>
        <ch-button mode="primary" type="submit" @click="handleFormSubmit">Login</ch-button>
      </div>
    </ch-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useLazyQuery, useMutation } from '@vue/apollo-composable'
import { TodoType } from '@/types/todo.type'
import { GET_ALL } from '@/services/TodoService/TodoService'
import { CREATE } from '@/services/UserService/UserService'
import ChDialog from '@/components/ch/ChDialog/ChDialog.vue'

const isTaskAddVisible = ref(false)
const tasks = ref<TodoType[]>([])

const registrationForm = reactive({
  email: '',
  name: '',
  isRemember: false,
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

<style lang="scss" scoped>
.login {
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;

  //backdrop-filter: blur(10px);

  &-form {
    &__item {
      position: relative;
      border-bottom: 2px solid #162938;
      margin: 30px 0;
    }
  }
}
</style>
