<script setup lang="ts">
import { computed } from 'vue'
import { MdDeleteForever } from '@kalimahapps/vue-icons'

import { getVowelsCount } from '../lib/utils'

type PropsType = {
  idx: string
  value: string
  isMatched: boolean
}

type EmitsType = {
  (e: 'remove', idx: string): void
  (e: 'update', idx: string, value: string): void
}

const props = defineProps<PropsType>()
const emit = defineEmits<EmitsType>()
const vowels = computed(() => getVowelsCount(props.value))
</script>

<template>
  <div
    class="form-field"
    :class="{ 'form-field__success': props.isMatched }"
  >
    <input
      type="text"
      :value="props.value"
      @input="
        emit('update', props.idx, ($event.target as HTMLInputElement).value)
      "
    />
    <button
      className="btn-delete"
      @click.prevent="emit('remove', props.idx)"
    >
      <MdDeleteForever />
    </button>
    <span className="count">{{ vowels }}</span>
  </div>
</template>
