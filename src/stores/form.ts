import { defineStore } from 'pinia'

import { generateInitInputs } from '../lib/utils'

export interface Input {
  idx: string
  value: string
}

interface StateShape {
  inputs: Record<string, Input>
  searchValue: string
  searchMatches: string[]
}

export const useFormStore = defineStore('form', {
  state: (): StateShape => ({
    inputs: {
      ...generateInitInputs()
    },
    searchValue: '',
    searchMatches: []
  }),
  getters: {
    getInputs: state => state.inputs,
    getInputsCount: state => Object.keys(state.inputs).length,
    getSearchValue: state => state.searchValue,
    getSearchMatches: state => state.searchMatches
  },
  actions: {
    addInput() {
      const idx = crypto.randomUUID()

      this.inputs[idx] = {
        idx,
        value: ''
      }
    },
    removeInput(idx: string) {
      delete this.inputs[idx]
      this.updateSearchMatches()
    },
    updateInput(idx: string, value: string) {
      this.inputs[idx].value = value
      this.updateSearchMatches()
    },
    updateSearchValue(value: string) {
      this.searchValue = value
      this.updateSearchMatches()
    },
    updateSearchMatches() {
      this.searchMatches = []

      if (this.searchValue !== '') {
        Object.values(this.inputs).forEach(input => {
          if (
            input.value.toLowerCase().includes(this.searchValue.toLowerCase())
          ) {
            this.searchMatches.push(input.idx)
          }
        })
      }
    }
  }
})
