<template>
  <Dialog
    :is-open="isOpen"
    :title="title"
    :content="content"
    @close="closeModal"
  />
  <RuleDialog :is-open="ruleIsOpen" @close="closeRuleModal" />
  <div class="container my-12 px-6 mx-auto">
    <div class="grid gap-4 grid-cols-4">
      <!-- 选择文件 -->
      <div
        class="relative rounded-lg shadow-lg h-full cursor-pointer my-1 hover-slider"
        @click="selectFolder"
      >
        <div class="flex justify-center">
          <div class="content-between">
            <img src="../assets/imgs/dir.gif" class="rounded mx-auto" />
            <p>{{ filesStore.mode === 0 ? '选择文件' : '选择文件夹' }}</p>
          </div>
        </div>
      </div>

      <!-- 添加规则 -->
      <div
        class="relative rounded-lg shadow-lg h-full cursor-pointer my-1 hover-slider"
        @click="addRule"
      >
        <div class="flex justify-center">
          <div class="content-between">
            <img src="../assets/imgs/rules.gif" class="rounded mx-auto" />
            <p>添加规则</p>
          </div>
        </div>
      </div>

      <!-- 预览变化 -->
      <div
        class="relative rounded-lg shadow-lg h-full cursor-pointer my-1 hover-slider"
        @click="applyRules"
      >
        <div class="flex justify-center">
          <div class="content-between">
            <img src="../assets/imgs/check.gif" class="rounded mx-auto" />
            <p>预览变化</p>
          </div>
        </div>
      </div>

      <!-- 应用修改 -->
      <div
        class="relative rounded-lg shadow-lg h-full cursor-pointer my-1 hover-slider"
        @click="modifyFiles"
      >
        <div class="flex justify-center">
          <div class="content-between">
            <img src="../assets/imgs/done.gif" class="rounded mx-auto" />
            <p>应用修改</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from 'electron'
import path from 'path'
import fs from 'fs'
import useFilesStore from '../stores/files'
import Dialog from './Dialog.vue'
import RuleDialog from './RuleDialog.vue'
import { ref } from 'vue'
import { listAllFiles } from '../utils/files'

// 对话框相关数据
const title = ref('注意')
const content = ref('')
const isOpen = ref(false)

// 对话框相关方法
function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

const filesStore = useFilesStore()

// 预览操作和应用规则操作共用的提示，必须保证有文件列表和修改规则
function tips() {
  if (!filesStore.rules.length) {
    console.log('请先选择添加规则！')
    content.value = '请先选择添加规则!'
    openModal()
    return
  }

  if (!filesStore.paths.length) {
    console.log('请先选择文件！')
    content.value = '请先选择文件!'
    openModal()
    return
  }
}

// 选择文件
async function selectFolder() {
  const { filePaths, canceled } = await ipcRenderer.invoke(
    'select-folder',
    filesStore.mode
  )
  if (!canceled) {
    if (filesStore.mode === 0) {
      filesStore.setPaths(filePaths.map((e: string) => [e, '']))
    } else if (filesStore.mode === 1) {
      const result = listAllFiles(filePaths[0]).map((e: string) => [e, ''])
      console.log(result)
      filesStore.setPaths(result)
    }
  }
}

// 添加规则
// rule 对话框
const ruleIsOpen = ref(false)
function closeRuleModal() {
  ruleIsOpen.value = false
}
async function addRule() {
  ruleIsOpen.value = true
}

// 预览修改效果
function applyRules() {
  tips()
  const paths: string[][] = []
  for (let i = 0; i < filesStore.paths.length; i++) {
    const filepath = filesStore.paths[i]
    const dir = path.dirname(filepath[0])
    const oldVal = path.basename(filepath[0])
    let newVal = ''

    for (const rule of filesStore.rules) {
      // 先判断newVal是否为空，如果不为空，就在之前的基础上去修改
      if (rule.name === 'r') {
        newVal = newVal || oldVal
        newVal = newVal.replaceAll(rule.oldVal, rule.newVal || '')
      } else if (rule.name === 'addPre') {
        // 增加前缀
        newVal = newVal || oldVal
        newVal = rule.oldVal + newVal
      } else if (rule.name === 'addPost') {
        // 增加后缀
        newVal = newVal || oldVal
        const arr = newVal.split('.')
        const ext = arr[arr.length - 1]
        arr.pop()
        newVal = `${arr.join('')}${rule.oldVal}.${ext}`
      } else {
        // 跳过当前规则
        continue
      }

      const result = [filepath[0], `${dir}/${newVal}`]
      if (paths[i]) {
        paths[i] = result
      } else {
        paths.push(result)
      }
    }
  }

  filesStore.cleanPaths()
  filesStore.setPaths(paths)
}

// 应用修改
async function modifyFiles() {
  tips()
  for (const filePath of filesStore.paths) {
    if (filePath[0] === '' || filePath[1] === '') {
      console.log('请先预览变化！')
      content.value = '请先预览变化!'
      openModal()
      return
    }
  }

  for (const filePath of filesStore.paths) {
    const oldPath = filePath[0]
    const newPath = filePath[1]
    // 使用 fs.rename() 方法重命名文件
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(
        `已将文件 “${path.basename(oldPath)}” 重命名为 “${path.basename(
          newPath
        )}”`
      )
    })
  }
  await ipcRenderer.invoke(
    'open-dir',
    filesStore.paths.length ? path.dirname(filesStore.paths[0][0]) : ''
  )
  filesStore.cleanPaths()
}
</script>

<style scoped lang="scss">
.hover-slider {
  position: relative;
  transition: all 0.25s;
  &:after {
    content: '';
    background: linear-gradient(
      to right,
      $theme-color 0%,
      $theme-color 50%,
      #fff 50%,
      #fff 100%
    );
    background-position: 100% 0;
    background-size: 200% 100%;
    width: 100%;
    height: 2px;
    position: absolute;
    top: 100%;
    left: 0;
    transition: all 0.5s;
  }
  &:hover {
    transform: scale(1.05);
    &:after {
      background-position: 0 0;
    }
  }
}
</style>
