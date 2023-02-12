<template>
  <div class="ch-pagination">
    <div class="ch-pagination__pages">
      <div
        v-for="(page, index) in props.countPages"
        :key="index"
        class="ch-pagination__page"
        @click="$emit('update:modelValue', page)"
      >
        {{ page }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type IProps = {
  modelValue: string
  countPages: number
}

type Emits = {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  countPages: 0,
})

const emits = defineEmits<Emits>()
</script>

<style lang="scss" scoped>
.ch-pagination {
  &__pages {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__page {
    width: 40px;
    height: 40px;
    color: $color--white;
    background-color: $color--primary;
  }
}
</style>
