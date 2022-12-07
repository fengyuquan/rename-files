<template>
  <div class="container p-6 mx-auto">
    <div class="grid lg:grid-cols-3 gap-6 lg:gap-x-12">
      <div class="mb-6 lg:mb-0">
        <div class="block rounded-lg shadow-lg h-full">
          <div class="p-2 border-b flex content-center justify-between">
            <div
              class="inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-sm leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
            >
              当前规则
            </div>
            <button
              @click="cleanRules"
              type="button"
              class="relative inline-block pl-6 pr-2 px py-1 text-red-600 text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              清空规则
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
            <ol class="text-xs grid grid-cols-2 gap-x-8">
              <li
                class="mb-1 flex items-center"
                v-for="item in filesStore.rules"
                :key="`${item.name}-${item.oldVal}`"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="check"
                  class="text-green-600 mr-2 flex-shrink-0 w-3 h-3"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                  ></path>
                </svg>
                <p class="line-clamp-1 flex-shrink">
                  {{ item.desc }}
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useFilesStore from '../stores/files'

const filesStore = useFilesStore()
function cleanRules() {
  filesStore.cleanRules()
}
</script>

<style scoped></style>
