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

        <ch-input v-model="registrationForm.name" label="Name" />

        <ch-button mode="primary" @click="handleMessageSend">Send</ch-button>

        <h2>Names</h2>

        <div v-for="(name, index) in names" :key="index">{{ name }}</div>

        <h4 v-if="!isTaskAddVisible" @click="handleAddTaskVisibleToggle">Добавить задачу</h4>

        <task-add v-else @close="handleAddTaskVisibleToggle" />
      </div>
    </div>

    <!--    <ch-dialog title="Создать пользака" width="400">-->
    <!--      <div class="login">-->
    <!--        <ch-form class="login-form">-->
    <!--          <ch-form-item class="login-form__item">-->
    <!--            <ch-input v-model="registrationForm.email" label="email" type="email" />-->
    <!--          </ch-form-item>-->
    <!--          <ch-form-item class="login-form__item">-->
    <!--            <ch-input v-model="registrationForm.name" label="name" />-->
    <!--          </ch-form-item>-->
    <!--          <ch-form-item class="login-form__item">-->
    <!--            <ch-checkbox v-model="registrationForm.isRemember" label="Remember me" />-->
    <!--          </ch-form-item>-->
    <!--        </ch-form>-->
    <!--        <ch-button mode="primary" type="submit" @click="handleFormSubmit">Login</ch-button>-->
    <!--      </div>-->
    <!--    </ch-dialog>-->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, unref } from 'vue'
import io from 'socket.io-client'
import { useLazyQuery, useMutation } from '@vue/apollo-composable'
import { TodoType } from '@/types/todo.type'
import { GET_ALL } from '@/services/TodoService/TodoService'
import { CREATE } from '@/services/UserService/UserService'
import ChDialog from '@/components/ch/ChDialog/ChDialog.vue'

const isTaskAddVisible = ref(false)
const tasks = ref<TodoType[]>([])
const names = ref<any>([])

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

const handleMessageSend = (): void => {
  const socketInstance = io('http://localhost:3000')

  socketInstance.emit('newMessage', registrationForm.name)
}

const getCoins = (): void => {
  const eventSource = new EventSource('http://localhost:3000/coins')

  eventSource.onmessage = ({ data }): void => {
    console.log(data)
  }
}

onMounted(() => {
  loadTodos()

  getCoins()

  const socketInstance = io('http://localhost:3000')

  socketInstance.on('onMessage', (data) => {
    console.log('Data:', data)

    names.value = [...unref(names), data.content]
  })
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
