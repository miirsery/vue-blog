<template>
  <button :class="buttonClasses">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { CommonType } from '@/types'
import { computed } from 'vue'

type Props = {
  type?: CommonType
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
})

const buttonClasses = computed(() => ['ch-button', `bg-${props.type}`])
</script>

<style lang="scss" scoped>
.ch-button {
  padding: 8px 12px;

  &:hover {
    background-color: #a7a7a7;
  }
}
</style>
