<template>
  <teleport to="body">
    <transition name="dialog-fade">
      <div v-if="visible" class="ch-dialog" role="dialog" aria-modal="true" @click="handleClose">
        <div class="ch-dialog__content" :style="contentStyles" @click.stop>
          <div class="ch-dialog__close">
            <div class="ch-dialog__close-inner" @click="handleClose">
              <base-icon name="close" class="icon-20" />
            </div>
          </div>
          <h2 class="ch-dialog__title">
            {{ props.title }}
          </h2>
          <div class="ch-dialog__body">
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { BaseIcon } from '@/shared/ui'

type Props = {
  modelValue: boolean
  title?: string
  width?: string | number
}

type Emits = {
  (e: 'close'): void
  (e: 'update:modelValue', value: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
  width: 300,
})

const emits = defineEmits<Emits>()

const visible = ref(false)

const contentStyles = computed(() => ({
  width: `${props.width}px`,
}))

watch(
  () => props.modelValue,
  () => {
    visible.value = props.modelValue
  }
)

watch(
  () => visible.value,
  () => {
    emits('update:modelValue', visible.value)
  }
)

onMounted(() => {
  emits('update:modelValue', visible.value)
})

const handleClose = (): void => {
  visible.value = false
}
</script>

<style lang="scss" scoped>
.ch-dialog {
  @include z-index(modal);

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background-color: rgb(0 0 0 / 0.4);

  &__content {
    top: 50%;
    left: 50%;
    position: absolute;
    border: 2px solid rgb(255 255 255 / 0.5);
    border-radius: 20px;
    background-color: $color--white;

    //box-shadow: 0 0 30px rgb(0 0 0 / 0.5);
    transform: translate(-50%, -50%);
  }

  &__title {
    text-align: center;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;

    &-inner {
      border-top-right-radius: 20px;
      border-bottom-left-radius: 20px;
      background-color: #e5e5e5;
      transition: all 0.15s ease-in-out;
      padding: 12px;

      //&:hover {
      //  background-color: rgb(203 223 246 / 0.7);
      //}
    }
  }
}
</style>
