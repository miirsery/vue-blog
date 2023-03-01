<template>
  <button :class="buttonClasses" :type="props.type">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { CommonType } from '@/types'
import { computed } from 'vue'

type Props = {
  mode?: CommonType
  type?: 'button' | 'reset' | 'submit'
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'info',
  type: 'button',
})

const buttonClasses = computed(() => ['ch-button', `bg-${props.mode}`])
</script>

<style lang="scss" scoped>
.ch-button {
  padding: 8px 12px;

  &:hover {
    background-color: #a7a7a7;
  }
}
</style>
