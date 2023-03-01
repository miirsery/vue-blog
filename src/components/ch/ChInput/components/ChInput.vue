<template>
  <div :class="inputClasses" @click="handleFocus">
    <div class="ch-input__wrapper">
      <template v-if="props.type !== 'textarea'">
        <i v-if="slots.prefix" class="ch-input__prefix">
          <slot name="prefix" />
        </i>

        <input
          ref="inputInstance"
          v-model="value"
          :type="currentType"
          class="ch-input__inner"
          @blur="handleBlur"
          @focus="handleFocus"
        />

        <template v-if="slots.suffix">
          <i v-if="isClearIconVisible" class="ch-input__suffix" @click="handleValueClear">
            <slot name="suffix" />
          </i>
        </template>

        <i v-if="props.type === 'password'" class="ch-input__suffix" @click="handleEyeVisibleToggle">
          <base-icon :name="setEyeState" class="icon-20" />
        </i>
      </template>

      <template v-else>
        <i v-if="slots.prefix" class="ch-input__prefix">
          <slot name="prefix" />
        </i>

        <textarea
          ref="textAreaInstance"
          v-model="value"
          class="ch-input__textarea"
          @blur="handleBlur"
          @focus="handleFocus"
        />

        <i v-if="slots.suffix" class="ch-input__suffix" @click="handleValueClear">
          <slot name="suffix" />
        </i>
      </template>
    </div>

    <span v-if="!props.searchable" :class="labelClasses">
      {{ props.label }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, unref, useSlots, watch } from 'vue'
import type { CHInputExposeType, CHInputType } from '@/shared/ui/CheetahUI/ChInput/ChInput.type'
import BaseIcon from '@/shared/ui/BaseIcon/BaseIcon.vue'

type Props = {
  modelValue: string
  type?: CHInputType
  label?: string
  disabled?: boolean
  showPassword?: boolean
  searchable?: boolean
  clearable?: boolean
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
  clearable: false,
})

const emits = defineEmits<Emits>()

const slots = useSlots()

const inputInstance = ref<HTMLInputElement>()
const textAreaInstance = ref<HTMLTextAreaElement>()

const value = ref('')
const currentType = ref(props.type)

const isInFocus = ref(false)
const isEyeOpen = ref(false)

const inputClasses = computed(() => [
  'ch-input',
  `ch-input--${props.type}`,
  { 'is-focused': unref(isInFocus) },
  { 'is-fulfilled': !!unref(value) },
])

const labelClasses = computed(() => [
  'ch-input__label',
  { 'ch-input__label--focus': unref(isInFocus) || props.modelValue },
  { 'ch-input__label--disabled': props.disabled },
])

const isClearIconVisible = computed(() => props.type !== 'password' && props.clearable)
const setEyeState = computed(() => (unref(isEyeOpen) ? 'eye' : 'eye-off'))

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

  inputInstance.value?.focus()

  emits('focus')
}

const handleBlur = (): void => {
  isInFocus.value = false

  inputInstance.value?.blur()

  emits('blur')
}

const handleValueClear = (): void => {
  value.value = ''
}

const handleEyeVisibleToggle = (): void => {
  currentType.value === 'text' ? (currentType.value = 'password') : (currentType.value = 'text')

  isEyeOpen.value = !isEyeOpen.value
}

defineExpose<CHInputExposeType>({
  focus: handleFocus,
  blur: handleBlur,
  inputInstance,
})
</script>

<style lang="scss" scoped>
.ch-input {
  @include text-sm;

  position: relative;
  border: 1px solid $color--divider;
  transition: box-shadow 0.15s ease-in;

  &__wrapper {
    display: flex;
    align-items: center;
    background-color: $color--white;
    padding: 10px 0;
  }

  &__inner {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    background-color: transparent;
    padding-left: 10px;
  }

  &__label {
    top: 10px;
    left: 15px;
    position: absolute;
    color: $color--gray;
    background-color: #fff;
    transition-duration: 0.15s;

    &--focus {
      @include font(12px, 20px);

      top: -10px;
      left: 10px;
      padding: 0 2px;
    }
  }

  &__suffix {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $color--gray;
    cursor: pointer;
    padding: 0 10px;
  }

  &__prefix {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
  }

  &__textarea {
    width: 100%;
    height: 30px;
    outline: none;
    border: none;
    background-color: transparent;

    // TODO: Поправить стили resize
    resize: none;
    padding: 0 0 0 10px;
  }

  &.is-fulfilled {
    .ch-input__suffix {
      color: $color--black;
    }
  }

  &.is-focused,
  &.is-fulfilled {
    box-shadow: 0 0 2px $color--primary;
  }
}
</style>
