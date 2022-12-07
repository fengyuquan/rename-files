import fs from 'fs'
import path from 'path'

// 遍历指定目录下的所有文件
function listAllFiles(dir: string) {
  const result: string[] = []
  // 读取目录中的所有文件/目录
  const files = fs.readdirSync(dir)

  // 遍历所有文件/目录
  for (const file of files) {
    // 判断当前文件是否是一个目录
    const fullPath = path.resolve(dir, file)
    const stats = fs.statSync(fullPath)

    if (stats.isDirectory()) {
      // 如果是一个目录，则递归遍历该目录
      result.push(...listAllFiles(fullPath))
    } else {
      // 如果是一个文件，则返回文件的完整路径
      result.push(fullPath)
    }
  }

  return result
}

export { listAllFiles }
