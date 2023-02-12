<template>
  <input v-model="value" :placeholder="props.placeholder" />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'

type Props = {
  modelValue: string
  placeholder: string
}

type Emits = {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
})

const emits = defineEmits<Emits>()

const value = ref('')

watch(
  () => value.value,
  () => {
    emits('update:modelValue', value.value)
  }
)

onMounted(() => {
  emits('update:modelValue', value.value)
})
</script>
