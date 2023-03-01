<template>
  <div :class="checkboxClasses">
    <input v-model="isSelected" class="ch-checkbox__inner" type="checkbox" />
    <label class="ch-checkbox__label" @click="handleCheckboxStateToggle">{{ props.label }}</label>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'

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

const checkboxClasses = computed(() => ['ch-checkbox', { 'is-checked': props.modelValue }])

watch(
  () => isSelected.value,
  () => {
    emits('update:modelValue', isSelected.value)
  }
)

onMounted(() => {
  emits('update:modelValue', isSelected.value)
})

const handleCheckboxStateToggle = (): void => {
  isSelected.value = !isSelected.value
}
</script>

<style lang="scss" scoped>
.ch-checkbox {
  display: flex;
  align-items: center;

  &__inner {
    width: 18px;
    height: 18px;
    margin-right: 4px;
  }

  &__label {
    @include text-sm;

    cursor: pointer;
  }

  &.is-checked {
    .ch-checkbox {
      &__label {
        text-decoration: line-through;
      }
    }
  }
}
</style>
