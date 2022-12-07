<template>
  <div class="w-full p-6 mx-auto overflow-hidden dark-light">
    <div>
      <div class="mb-4 lg:mb-0">
        <div class="block rounded-lg shadow-lg h-full">
          <div class="p-2 border-b flex content-center justify-between">
            <div
              class="inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-sm leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
            >
              预览变化
            </div>
            <button
              @click="cleanPaths"
              type="button"
              class="relative inline-block pl-6 pr-2 px py-1 text-red-600 text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              清空文件
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 absolute left-[4px] top-[11px]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="p-4">
            <TabGroup>
              <TabList class="flex space-x-1 rounded-xl bg-blue-900/10 p-1">
                <Tab
                  v-for="category in categories"
                  as="template"
                  :key="category"
                  v-slot="{ selected }"
                >
                  <button
                    :class="[
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                      'ring-white/50 ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected ? ' shadow' : 'hover:/[0.12] hover:text-white',
                    ]"
                  >
                    {{ category }}
                  </button>
                </Tab>
              </TabList>

              <TabPanels class="mt-2 min-h-[45px]">
                <!-- 1 -->
                <TabPanel
                  :class="[
                    'rounded-xl  p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  ]"
                >
                  <table class="w-full">
                    <tr
                      class="transition duration-300 ease-in-out hover:bg-gray-100 py-4 w-full"
                      v-for="item in filesName"
                      :key="item[0]"
                    >
                      <td class="text-sm font-light px-6 py-1 border-b">
                        <p>{{ item[0] }}</p>
                        <p>{{ item[1] }}</p>
                      </td>
                    </tr>
                  </table>
                </TabPanel>
                <!-- 2 -->
                <TabPanel
                  :class="[
                    'rounded-xl  p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  ]"
                >
                  <table class="w-full">
                    <tr
                      class="transition duration-300 ease-in-out hover:bg-gray-100 py-4 w-full"
                      v-for="item in filesName"
                      :key="item[0]"
                    >
                      <td class="text-sm font-light px-6 py-1 border-b">
                        <p>{{ item[0] }}</p>
                      </td>
                    </tr>
                  </table>
                </TabPanel>
                <!-- 3 -->
                <TabPanel
                  :class="[
                    'rounded-xl  p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  ]"
                >
                  <table class="w-full">
                    <tr
                      class="transition duration-300 ease-in-out hover:bg-gray-100 py-4 w-full"
                      v-for="item in filesName"
                      :key="item[0]"
                    >
                      <td class="text-sm font-light px-6 py-1 border-b">
                        <p>{{ item[1] }}</p>
                      </td>
                    </tr>
                  </table>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import path from 'path'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { ref, watch } from 'vue'
import useFilesStore from '../stores/files'

const filesStore = useFilesStore()
const filesName = ref<string[][]>([])

watch(
  () => filesStore.paths,
  () => {
    filesName.value = filesStore.paths.map((e) => {
      const p0 = path.basename(e[0])
      const p1 = path.basename(e[1])
      console.log(p0, '-----', p1)
      return [p0, p1]
    })
  }
)

const categories = ref(['两者', '修改前', '修改后'])
function cleanPaths() {
  filesStore.cleanPaths()
}
</script>

<style scoped></style>
