<script setup lang="ts">
import { computed } from 'vue'

import FormInput from './components/FormInput.vue'
import SearchInput from './components/SearchInput.vue'
import { useFormStore } from './stores/form'

const formStore = useFormStore()
const inputs = computed(() => formStore.getInputs)
const inputsCount = computed(() => formStore.getInputsCount)
const searchValue = computed(() => formStore.getSearchValue)
const searchMatches = computed(() => formStore.getSearchMatches)

const addInput = () => {
  if (inputsCount.value < 10) {
    formStore.addInput()
  }
}

const removeInput = (idx: string) => {
  if (inputsCount.value > 1) {
    formStore.removeInput(idx)
    formStore.updateSearchMatches()
  }
}

const updateInput = (idx: string, value: string) => {
  formStore.updateInput(idx, value)
}

const updateSearch = (value: string) => {
  formStore.updateSearchValue(value)
}
</script>

<template>
  <div class="form-wrap">
    <form class="form">
      <SearchInput
        :value="searchValue"
        :hasMatch="searchMatches.length > 0"
        @update="updateSearch"
      />

      <FormInput
        v-for="input in inputs"
        :key="input.idx"
        :idx="input.idx"
        :value="input.value"
        :isMatched="searchMatches.includes(input.idx)"
        @remove="removeInput"
        @update="updateInput"
      />

      <div className="form-field">
        <button
          className="btn"
          @click.prevent="addInput"
          :disabled="inputsCount === 10"
        >
          Add Field
        </button>
      </div>
    </form>
  </div>
</template>
