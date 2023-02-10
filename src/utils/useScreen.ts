import { computed, reactive } from 'vue'

function calculateSizes(screen: number) {
  if (screen >= 1920) return 'lg'
  else if (screen >= 1366) return 'md'
  else if (screen >= 800) return 'sm'
  else if (screen >= 320) return 'xs'
  else return ''
}

const screen = reactive({
  width: window.innerWidth,
  size: calculateSizes(window.innerWidth),
})

const isMobile = computed(() => {
  return screen.size === 'xs'
})

const isTablet = computed(() => {
  return screen.size === 'sm'
})

const laptop = computed(() => {
  return screen.size === 'md'
})
const isDesktop = computed(() => {
  return screen.size === 'lg'
})

window.addEventListener('resize', () => {
  screen.width = window.innerWidth

  screen.size = calculateSizes(window.innerWidth)
})

export const useScreen = () => {
  return {
    screen,
    isMobile,
    isTablet,
    laptop,
    isDesktop,
  }
}
