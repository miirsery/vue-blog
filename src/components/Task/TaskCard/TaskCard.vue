<template>
  <div class="task-card">
    <div class="task-card__text">
      {{ props.text }}
    </div>
    <ch-button type="primary" @click="handleDelete">X</ch-button>
  </div>
</template>

<script lang="ts" setup>
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

type Props = {
  text: string
  id: number
}

type Emits = {
  (e: 'update-table'): void
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  id: 0,
})

const emits = defineEmits<Emits>()

const { mutate: deleteById } = useMutation(gql`
  mutation deleteTodo($id: Float!) {
    deleteTodo(id: $id)
  }
`)

const handleDelete = async (): Promise<void> => {
  await deleteById({
    id: props.id,
  })

  emits('update-table')
}
</script>

<style lang="scss" scoped>
.task-card {
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
