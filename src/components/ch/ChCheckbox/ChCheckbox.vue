<template>
  <input v-model="isSelected" class="ch-checkbox" type="checkbox" />
  <label>{{ props.label }}</label>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'

type Props = {
  modelValue: boolean
  label: string
}

type Emits = {
  (e: 'update:modelValue', value: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: '',
})

const emits = defineEmits<Emits>()

const isSelected = ref(props.modelValue)

watch(
  () => isSelected.value,
  () => {
    emits('update:modelValue', isSelected.value)
  }
)

onMounted(() => {
  emits('update:modelValue', isSelected.value)
})
</script>
