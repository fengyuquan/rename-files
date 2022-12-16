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
          <div class="relative p-1">
            <div class="container">
              <div class="tabs">
                <input
                  type="radio"
                  id="radio-1"
                  name="tabs"
                  checked
                  @click="changeTab($event)"
                />
                <label class="tab" for="radio-1"
                  >两者<span class="notification">{{
                    filesName.length
                  }}</span></label
                >
                <input
                  type="radio"
                  id="radio-2"
                  name="tabs"
                  @click="changeTab($event)"
                />
                <label class="tab" for="radio-2">修改前</label>
                <input
                  type="radio"
                  id="radio-3"
                  name="tabs"
                  @click="changeTab($event)"
                />
                <label class="tab" for="radio-3">修改后</label>
                <span class="glider"></span>
              </div>

              <ul class="tabs__contents">
                <li>
                  <div
                    class="tabs__content"
                    :class="{ active: activeIdx === 0 }"
                  >
                    <table class="w-full table-hover responsive nowrap">
                      <thead @click="togglePathSort">
                        <tr>
                          <th
                            class="flex items-center cursor-pointer px-6 py-1"
                          >
                            File Name
                            <svg
                              v-show="!isUp"
                              class="w-4 h-3 ml-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1"
                                d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                              ></path>
                            </svg>

                            <svg
                              v-show="isUp"
                              class="w-4 h-3 ml-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1"
                                d="M5 11l7-7 7 7M5 19l7-7 7 7"
                              ></path>
                            </svg>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          class="transition duration-300 ease-in-out hover:bg-gray-100 py-4 w-full"
                          v-for="item in filesName"
                          :key="item[0]"
                        >
                          <td class="text-sm font-light px-6 py-1 border-b">
                            <p :class="{ 'delete-line': item[1] }">
                              {{ item[0] }}
                            </p>
                            <p>{{ item[1] }}</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
                <li>
                  <div
                    class="tabs__content"
                    :class="{ active: activeIdx === 1 }"
                  >
                    <table class="w-full table-hover responsive nowrap">
                      <thead @click="togglePathSort">
                        <tr>
                          <th
                            class="flex items-center cursor-pointer px-6 py-1"
                          >
                            File Name
                            <svg
                              v-show="!isUp"
                              class="w-4 h-3 ml-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1"
                                d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                              ></path>
                            </svg>

                            <svg
                              v-show="isUp"
                              class="w-4 h-3 ml-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1"
                                d="M5 11l7-7 7 7M5 19l7-7 7 7"
                              ></path>
                            </svg>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          class="transition duration-300 ease-in-out hover:bg-gray-100 py-4 w-full"
                          v-for="item in filesName"
                          :key="item[0]"
                        >
                          <td class="text-sm font-light px-6 py-1 border-b">
                            <p>{{ item[0] }}</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
                <li>
                  <div
                    class="tabs__content"
                    :class="{ active: activeIdx === 2 }"
                  >
                    <table class="w-full table-hover responsive nowrap">
                      <thead @click="togglePathSort">
                        <tr>
                          <th
                            class="flex items-center cursor-pointer px-6 py-1"
                          >
                            File Name
                            <svg
                              v-show="!isUp"
                              class="w-4 h-3 ml-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1"
                                d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                              ></path>
                            </svg>

                            <svg
                              v-show="isUp"
                              class="w-4 h-3 ml-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1"
                                d="M5 11l7-7 7 7M5 19l7-7 7 7"
                              ></path>
                            </svg>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          class="transition duration-300 ease-in-out hover:bg-gray-100 py-4 w-full"
                          v-for="item in filesName"
                          :key="item[0]"
                        >
                          <td class="text-sm font-light px-6 py-1 border-b">
                            <p>{{ item[1] }}</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
              </ul>
            </div>
            <!--container-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import path from 'path'
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
      return [p0, p1]
    })
    if (isUp) {
      filesName.value.sort((a, b) => a[0].localeCompare(b[0]))
    }
  }
)

function cleanPaths() {
  filesStore.cleanPaths()
}

// filenames sort
const isUp = ref(true)
function togglePathSort() {
  isUp.value = !isUp.value
  if (isUp.value) {
    filesName.value = filesName.value.sort((a, b) => a[0].localeCompare(b[0]))
  } else {
    filesName.value = filesName.value.sort((a, b) => -a[0].localeCompare(b[0]))
  }
}

// tab menu
const activeIdx = ref(0)
interface myTarget extends EventTarget {
  id: string
}
function changeTab(e: MouseEvent) {
  const { id } = e.target as myTarget
  switch (id) {
    case 'radio-1':
      activeIdx.value = 0
      break
    case 'radio-2':
      activeIdx.value = 1
      break
    case 'radio-3':
      activeIdx.value = 2
      break
    default:
      activeIdx.value = 0
  }
}
</script>

<style scoped lang="scss">
$primary-color: #185ee0;
$secondary-color: #e6eef9;

*,
*:after,
*:before {
  box-sizing: border-box;
}
.container {
  padding: 0 1rem;
  margin: auto;
}
.tabs {
  width: 600px;
  margin: auto;
  display: flex;
  position: relative;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 1px 0 rgba($theme-color, 0.15),
    0 6px 12px 0 rgba(rgb(87, 86, 86), 0.25);
  padding: 0.25rem;
  border-radius: 99px; // just a high number to create pill effect
  * {
    z-index: 2;
  }
}

input[type='radio'] {
  display: none;
}

.tab {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 200px;
  font-size: 1.2em;
  font-weight: 300;
  border-radius: 99px;
  cursor: pointer;
  transition: color 0.15s ease-in;
}

.notification {
  position: absolute;
  left: 145px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  margin-left: 0.75rem;
  border-radius: 50%;
  background-color: $secondary-color;
  transition: 0.15s ease-in;
}

input[type='radio'] {
  &:checked {
    & + label {
      color: $theme-color;
      & > .notification {
        background-color: $theme-color;
        color: #fff;
      }
    }
  }
}

input[id='radio-1'] {
  &:checked {
    & ~ .glider {
      transform: translateX(0);
    }
  }
}

input[id='radio-2'] {
  &:checked {
    & ~ .glider {
      transform: translateX(100%);
    }
  }
}

input[id='radio-3'] {
  &:checked {
    & ~ .glider {
      transform: translateX(200%);
    }
  }
}

.glider {
  position: absolute;
  display: flex;
  height: 44px;
  width: 200px;
  background-color: $secondary-color;
  z-index: 1;
  border-radius: 99px;
  transition: 0.25s ease-out;
}

.tabs__contents {
  padding: 40px 0;
  background: white;
  list-style-type: none;
  transition: 1s;

  .tabs__content {
    display: none;
    min-height: 200px;
    font-weight: 300;
    line-height: 1.8;
    opacity: 0;
    transform: translateY(-2%);
    animation: fadeIn 0.5s forwards;

    &.active {
      display: block;
    }
  }
}

.delete-line {
  text-decoration: line-through;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

th {
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  user-select: none;
}
</style>
