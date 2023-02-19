<template>
  <teleport to="body">
    <transition name="dialog-fade">
      <div class="ch-dialog" role="dialog" aria-modal="true">
        <div class="ch-dialog__content" :style="contentStyles">
          <div class="ch-dialog__close">
            <div class="ch-dialog__close-inner">
              <img src="@/assets/icons/close.svg" width="20" height="20" />
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
import { computed } from 'vue'

type Props = {
  modelVisible: boolean
  title: string
  width: string | number
}

const props = withDefaults(defineProps<Props>(), {
  modelVisible: false,
  title: '',
  width: 300,
})

const contentStyles = computed(() => ({
  width: `${props.width}px`,
}))
</script>

<style lang="scss" scoped>
.ch-dialog {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background-color: rgb(0 0 0 / 0.2);

  &__content {
    top: 50%;
    left: 50%;
    position: absolute;
    border: 2px solid rgb(255 255 255 / 0.5);
    border-radius: 20px;
    box-shadow: 0 0 30px rgb(0 0 0 / 0.5);
    background-color: transparent;
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

      &:hover {
        background-color: rgb(203 223 246 / 0.7);
      }
    }
  }
}
</style>
