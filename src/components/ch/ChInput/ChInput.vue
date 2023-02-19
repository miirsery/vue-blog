<template>
  <div class="ch-input" @click="handleFocus">
    <input v-model="value" class="ch-input__inner" @blur="handleBlur" @focus="handleFocus" />

    <span v-if="!props.searchable" :class="labelClasses">
      {{ props.label }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { TypesType } from '@/components/ch/ChInput/ChInput.type'

type Props = {
  modelValue: string
  type?: TypesType
  label?: string
  disabled?: boolean
  showPassword?: boolean
  searchable?: boolean
}

type Emits = {
  (e: 'update:modelValue', value: string): void
  (e: 'focus'): void
  (e: 'blur'): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  label: '',
  disabled: false,
  showPassword: false,
  searchable: false,
})

const emits = defineEmits<Emits>()

const value = ref('')
const isInFocus = ref(false)

const labelClasses = computed(() => [
  'ch-input__label',
  `ch-input--${props.type}`,
  { 'ch-input__label--focus': isInFocus.value || props.modelValue },
  { 'ch-input__label--disabled': props.disabled },
])

watch(
  () => value.value,
  () => {
    emits('update:modelValue', value.value)
  }
)

onMounted(() => {
  emits('update:modelValue', value.value)
})

const handleFocus = (): void => {
  isInFocus.value = true

  emits('focus')
}

const handleBlur = (): void => {
  isInFocus.value = false

  emits('blur')
}
</script>

<style lang="scss" scoped>
.ch-input {
  position: relative;

  &__inner {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    background-color: transparent;
  }

  &__label {
    top: 0;
    left: 5px;
    position: absolute;
    color: $color--gray;
    transition-duration: 0.15s;

    &--focus {
      @include font(12px, 20px);

      top: -20px;
      left: 5px;
    }
  }
}
</style>
