<template>
  <div class="divide-y relative">
    <Switch
      v-model="isDarkMode"
      :class="isDarkMode ? 'bg-gray-700' : 'bg-slate-300'"
      class="absolute top-[-34px] right-4 inline-flex h-[19.5px] w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      @click="toggleDarkMode"
    >
      <span
        aria-hidden="true"
        :class="isDarkMode ? 'translate-x-4' : 'translate-x-0'"
        class="pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
      />
    </Switch>
    <Operate />
    <OpenMode />
    <Rules />
    <Files />
  </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from 'electron'
import { ref } from 'vue'
import { Switch } from '@headlessui/vue'
import Operate from './components/Operate.vue'
import Rules from './components/Rules.vue'
import Files from './components/Files.vue'
import OpenMode from './components/OpenMode.vue'

// 处理跟随系统的theme
const isDarkMode = ref(false)
const toggleDarkMode = async () => {
  isDarkMode.value = await ipcRenderer.invoke('dark-mode:toggle')
}
</script>

<style></style>
