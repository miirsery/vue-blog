<template>
  <button ref="chButtonInstance" :class="buttonClasses" :type="props.type" @click.prevent.stop="handleRippleMake">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { colorMixer, colorRgbToNumbers } from '@/shared/lib/helpers'

type Props = {
  mode?: 'success' | 'info' | 'primary'
  type?: 'button' | 'reset' | 'submit'
  ripples?: boolean
  round?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'info',
  type: 'button',
  ripples: true,
  round: true,
})

const chButtonInstance = ref<HTMLButtonElement>()
const isClicked = ref(false)

const buttonClasses = computed(() => ['ch-button', `bg-${props.mode}`, { 'is-round': props.round }])

const handleRippleMake = (event: MouseEvent): void => {
  if (props.ripples && !isClicked.value) {
    const target = event.target as HTMLElement

    isClicked.value = true

    const x = event.clientX - target?.offsetLeft
    const y = event.clientY - target?.offsetTop

    const ripples = document.createElement('span')
    const currentBackgroundColor = getComputedStyle(chButtonInstance.value as HTMLElement).backgroundColor

    ripples.classList.add('ch-button__ripple')

    ripples.style.left = `${x}px`

    ripples.style.top = `${y}px`

    ripples.style.backgroundColor = colorMixer(colorRgbToNumbers(currentBackgroundColor), [255, 255, 255], 0.6)

    chButtonInstance.value?.appendChild(ripples)

    setTimeout(() => {
      ripples.remove()

      isClicked.value = false
    }, 600)
  }
}
</script>

<style lang="scss" scoped>
.ch-button {
  position: relative;
  border: none;
  color: $color--white;
  cursor: pointer;
  padding: 8px 12px;
  overflow: hidden;

  :deep(.ch-button__ripple) {
    width: calc(100% + 100px);
    height: calc(100% + 100px);
    position: absolute;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: animate 0.6s linear infinite;
    pointer-events: none;
  }

  &.is-round {
    border-radius: 8px;
  }
}

@keyframes animate {
  0% {
    width: 0;
    height: 0;
    opacity: 0.5;
  }

  100% {
    width: calc(100% + 100px);
    height: calc(100% + 100px);
    opacity: 0;
  }
}
</style>
