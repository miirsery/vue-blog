import type { Ref } from 'vue'

export type CHInputType = 'textarea' | 'text' | 'color' | 'url' | 'search' | 'tel' | 'password' | 'email' | 'number'

export type CHInputExposeType = {
  focus?: () => void
  select?: () => void
  blur?: () => void
  inputInstance?: Ref<HTMLInputElement | undefined>
}
