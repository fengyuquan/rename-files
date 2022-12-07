<template>
  <div class="w-full">
    <div class="mx-auto w-full max-w-md">
      <RadioGroup v-model="selected">
        <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
        <div class="space-y-2">
          <RadioGroupOption
            as="template"
            v-for="(plan, index) in plans"
            :key="plan.name"
            :value="plan"
            v-slot="{ active, checked }"
            @click="changeMode(index)"
          >
            <div
              :class="[
                active
                  ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                  : '',
                checked ? 'bg-sky-600 bg-opacity-75 text-white ' : 'bg-white ',
              ]"
              class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"
            >
              <div class="flex w-full items-center justify-between">
                <div class="flex items-center">
                  <div class="text-sm">
                    <RadioGroupLabel
                      as="p"
                      :class="checked ? 'text-white' : 'text-gray-900'"
                      class="font-medium"
                    >
                      {{ plan.name }}
                    </RadioGroupLabel>
                    <RadioGroupDescription
                      as="span"
                      :class="checked ? 'text-sky-100' : 'text-gray-500'"
                      class="inline"
                    >
                      <span>{{ plan.desc }}</span>
                    </RadioGroupDescription>
                  </div>
                </div>
                <div v-show="checked" class="shrink-0 text-white">
                  <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="12"
                      fill="#fff"
                      fill-opacity="0.2"
                    />
                    <path
                      d="M7 13l3 3 7-7"
                      stroke="#fff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from '@headlessui/vue'
import useFilesStore from '../stores/files'

const filesStore = useFilesStore()

const plans = [
  {
    name: '打开文件',
    desc: '在对话窗口中，选择多个文件',
  },
  {
    name: '打开文件夹',
    desc: '递归的遍历文件夹，找到该文件夹下的所有文件',
  },
]

const selected = ref(plans[0])

function changeMode(idx: number) {
  filesStore.setMode(idx)
}
</script>
