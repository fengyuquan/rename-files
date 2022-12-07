import { IRule } from './../common'
import { defineStore } from 'pinia'

export default defineStore('files', {
  state: () => ({
    paths: new Array<string[]>(),
    rules: new Array<IRule>(),
    mode: 0,
  }),
  getters: {},
  actions: {
    setPaths(paths: string[][]) {
      this.paths = paths
    },
    addPath(str: string[]) {
      this.paths.push(str)
    },

    cleanPaths() {
      this.paths = []
    },
    addRule(rule: IRule) {
      this.rules.push(rule)
    },
    cleanRules() {
      this.rules = []
    },
    setMode(val: number) {
      this.mode = val
    },
  },
})
