<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all"
            >
              <!-- content -->
              <div class="mt-2">
                <TabGroup>
                  <TabList class="flex space-x-1 rounded-xl bg-blue-900/10 p-1">
                    <Tab
                      v-for="(category, index) in categories"
                      as="template"
                      :key="category"
                      v-slot="{ selected }"
                      @click="() => (idx = index)"
                    >
                      <button
                        :class="[
                          'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                          'ring-white/50 ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                          selected
                            ? ' shadow'
                            : 'hover:/[0.12] hover:text-white',
                        ]"
                      >
                        {{ category }}
                      </button>
                    </Tab>
                  </TabList>

                  <TabPanels class="mt-2 h-32">
                    <!-- 1 -->
                    <TabPanel
                      :class="[
                        'rounded-xl  p-3',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      ]"
                    >
                      <input
                        type="text"
                        placeholder="???????????????..."
                        v-model="preStr"
                      />
                    </TabPanel>
                    <!-- 2 -->
                    <TabPanel
                      :class="[
                        'rounded-xl  p-3',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      ]"
                    >
                      <input
                        type="text"
                        placeholder="???????????????..."
                        v-model="postStr"
                      />
                    </TabPanel>
                    <!-- 3 -->
                    <TabPanel
                      :class="[
                        'grid gap-1',
                        'rounded-xl  p-3',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      ]"
                    >
                      <input
                        type="text"
                        placeholder="?????????????????????????????????..."
                        v-model="oldStr"
                      />
                      <input
                        type="text"
                        placeholder="?????????????????????????????????..."
                        v-model="newStr"
                      />
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </div>

              <div class="mt-4 text-right">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border ml-2 border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-400 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="cleanModal"
                >
                  ??????
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border ml-2 border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="addRules"
                >
                  ??????
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border ml-2 border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-red-500 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  ??????
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
      <div class="fixed top-[16px] right-[10px]">
        <Tost :content="content" :tost-type="tostType" @close="closeTost" />
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@headlessui/vue'
import { ref } from 'vue'
import { IRule } from '../common'
import useFilesStore from '../stores/files'
import Tost from './Tost.vue'

const filesStore = useFilesStore()

const categories = ref(['????????????', '????????????', '???????????????'])
const idx = ref(0)

// TOost
const content = ref('')
const tostType = ref('')
function closeTost() {
  content.value = ''
  tostType.value = ''
}

// ??????????????????????????????????????????
const preStr = ref('')
const postStr = ref('')
const oldStr = ref('')
const newStr = ref('')

// ????????????????????????
function closeModal() {
  emit('close')
}

function cleanModal() {
  preStr.value = ''
  postStr.value = ''
  oldStr.value = ''
  newStr.value = ''
}

const emit = defineEmits(['close'])

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

// ????????????
async function addRules() {
  // ??????????????????
  let preRule: IRule | null = null
  if (preStr.value) {
    preRule = {
      name: 'addPre',
      oldVal: preStr.value.trim(),
      desc: `?????? ${preStr.value.trim()} ??????`,
    }
  }

  // ??????????????????
  let postRule: IRule | null = null
  if (postStr.value) {
    postRule = {
      name: 'addPost',
      oldVal: postStr.value.trim(),
      desc: `?????? ${postStr.value.trim()} ??????`,
    }
  }

  // ???????????????????????????
  let rRule: IRule | null = null
  if (oldStr.value) {
    rRule = {
      name: 'r',
      oldVal: oldStr.value.trim(),
      newVal: newStr.value.trim(),
      desc: `??? ${oldStr.value.trim()} ????????? ${newStr.value.trim()}`,
    }
  }

  // ??????????????????
  for (const e of filesStore.rules) {
    if (
      preRule &&
      e.name === preRule.name &&
      e.oldVal === preRule.oldVal &&
      e.newVal === preRule.newVal
    ) {
      console.log('????????????????????????????????????')
      content.value = '?????????????????????????????????!'
      tostType.value = 'warning'
      preRule = null
    } else if (
      postRule &&
      e.name === postRule.name &&
      e.oldVal === postRule.oldVal &&
      e.newVal === postRule.newVal
    ) {
      console.log('????????????????????????????????????')
      content.value = '?????????????????????????????????!'
      tostType.value = 'warning'
      postRule = null
    } else if (
      rRule &&
      e.name === rRule.name &&
      e.oldVal === rRule.oldVal &&
      e.newVal === rRule.newVal
    ) {
      console.log('????????????????????????????????????')
      content.value = '?????????????????????????????????!'
      tostType.value = 'warning'
      rRule = null
    }
  }

  // ??????????????????
  if (idx.value === 0 && preRule) {
    filesStore.addRule(preRule)
    console.log(`????????? ${preRule.oldVal} ???????????????`)
    content.value = `????????? ${preRule.oldVal} ???????????????`
    tostType.value = 'success'
    preRule = null
    preStr.value = ''
  }

  // ??????????????????
  if (idx.value === 1 && postRule) {
    filesStore.addRule(postRule)
    console.log(`????????? ${postRule.oldVal} ???????????????`)
    content.value = `????????? ${postRule.oldVal} ???????????????`
    tostType.value = 'success'
    postRule = null
    postStr.value = ''
  }

  // ??????????????????
  if (idx.value === 2 && rRule) {
    filesStore.addRule(rRule)
    console.log(`??? ${oldStr.value.trim()} ????????? ${newStr.value.trim()}!`)
    content.value = `??? ${oldStr.value.trim()} ????????? ${
      newStr.value.trim() ? newStr.value.trim() : '????????????'
    }!`
    tostType.value = 'success'
    rRule = null
    oldStr.value = ''
    newStr.value = ''
  }
}
</script>

<style scoped>
input {
  @apply form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none;
}
</style>
