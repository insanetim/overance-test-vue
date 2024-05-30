<script setup lang="ts">
type PropsType = {
  value: string
  hasMatch: boolean
}

type EmitsType = {
  (e: 'update', value: string): void
}

const props = defineProps<PropsType>()
const emit = defineEmits<EmitsType>()
</script>

<template>
  <div
    class="form-field form-field__search"
    :class="{ 'form-field__success': props.hasMatch }"
  >
    <input
      type="text"
      :value="props.value"
      @input="emit('update', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
