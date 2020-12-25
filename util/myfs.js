const fs = require('fs')
const path = require('path')
var i = 0

fs.readdir('E:/nodes/public/file',(err,file)=>{
 
    setTimeout (()=>{
        console.log(file)
        console.log(file[0])
        mergeFile(file) 
    },1000) 
   
    // file.forEach((item,index)=>{
    //     let path = __dirname + item
        
    // })
})
let ends = fs.createWriteStream('E:/nodes/public/fileDone/1.mp4')
function mergeFile (file) {
    console.log(`E:/nodes/public/file/${file[i]}`)
    console.log(`E:/nodes/public/file/${file[i]}`)
    let curfile = fs.createReadStream(`E:/nodes/public/file/${file[i]}`)

    curfile.pipe(ends, { end: false });
    curfile.on('end',()=>{
        i++
        if (i>=10) {
            console.log('ds')
            return
        }
        mergeFile(file)
    })
    curfile.on('error', function(error) { // 监听错误事件，关闭可写流，防止内存泄漏
        console.error(error);
        curfile.close();
      });
  
} 

// let mp1 = fs.createReadStream('E:/nodes/public/file/1')

// let mp = fs.createWriteStream('./1.mp4')
// mp1.on('data',(chunk)=>{
//     mp.write(chunk,()=>{
//         console.log('正在写入1')
//     })
// })
// mp1.on('end',()=>{
//     let mp2 = fs.createReadStream('E:/nodes/public/file/2')
//     mp2.on('data',(chunk)=>{
//         mp.write(chunk,()=>{
//             console.log('正在写入2')
//         })
//     })
// })

// let flag = 1
// fs.readdir('E:/nodes/public/file',(err,data)=>{
//     if (err) {
//         console.log(err)
//     }
//     fs.readFile('E:/nodes/public/file/1',(err)=>{
//         if (err) {
//             console.log(err)
//             return
//         }
//         fs.appendFileSync('./1.mp4',data,(err)=>{
//             if (err) {
//                 console.log(err)
//             }
//             flag =  flag + 1
//             callback ()
//         })
//     })


// })

// function callback () {
    
//     fs.readFile('E:/nodes/public/file/2',(err)=>{
//         if (err) {
//             console.log(err)
//             return
//         }
//         fs.appendFileSync('./1.mp4',data,(err)=>{
//             if (err) {
//                 console.log(err)
//                 return
//             }
         
//         })
//     })
// }
