<template>
  <div class="ch-message"> Сообщение </div>
</template>

<script lang="ts" setup>
import { CommonType } from '@/types'

type Props = {
  type: CommonType
  showClose: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  showClose: false,
})
</script>
