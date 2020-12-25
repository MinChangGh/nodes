const fs = require('fs') // 文件组件





function mergeFile(dirPath, filePath, hash, total) {
    return new Promise((resolve, reject) => {
      fs.readdir(dirPath, (err, files) => {
        if (err) {
          return reject(err)
        }
        if(files.length !== total || !files.length) {
          return reject('上传失败，切片数量不符')
        }
  
        const fileWriteStream = fs.createWriteStream(filePath)
        function merge(i) {
          return new Promise((res, rej) => {
            // 合并完成
            if (i === files.length) {
              fs.rmdir(dirPath, (err) => {
                console.log(err, 'rmdir')
              })
              return res()
            }
  
            let chunkpath = dirPath + hasn + '_' + i
            fs.readFile(chunkpath, (err, data) => {
              if (err) return rej(err)
  
              // 将切片追加到存储文件
              fs.appendFile(filePath, data, () => {
                // 删除切片文件
                fs.unlink(chunkpath, () => {
                  // 递归合并
                  res(merge(i + 1))
                })
              })
            })
  
          })
        }
        merge(0).then(() => {
          // 默认情况下不需要手动关闭，但是在某些文件的合并并不会自动关闭可写流，比如压缩文件，所以这里在合并完成之后，统一关闭下
          resolve(fileWriteStream.close())
        })
      })
    })
  }

  //mergeFile('E:/nodes/public/file',)

  module.exports = mergeFile