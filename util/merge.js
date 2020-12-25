var fs = require("fs");

// console.log("准备打开文件！");
// fs.stat('./public/image/6.txt', function (err, stats) {
//   if (err) {
//     return console.error(err);
//   }
//   console.log(stats);
//   console.log("读取文件信息成功！");
//
//   // 检测文件类型
//   console.log("是否为文件(isFile) ? " + stats.isFile());
//   console.log("是否为目录(isDirectory) ? " + stats.isDirectory());
// });
//
//
//
// console.log("准备写入文件");
// fs.writeFile('./public/image/6.txt', '我是通 过fs.writeFile 写入文件的内容',  function(err) {
//   if (err) {
//     return console.error(err);
//   }
//   console.log("数据写入成功！");
//   console.log("--------我是分割线-------------")
//   console.log("读取写入的数据！");
//   fs.readFile('./public/image/6.txt', function (err, data) {
//     if (err) {
//       return console.error(err);
//     }
//     console.log("异步读取文件数据: " + data.toString());
//   });
// });


var buf = new Buffer.alloc(2049);
console.log(buf.length)

console.log("准备打开文件！");
fs.open('./public/image/6.txt', 'r+', function(err, fd) {
  if (err) {
    return console.error(err);
  }
  console.log("文件打开成功！");
  console.log("截取10字节内的文件内容，超出部分将被去除。");

  //截取文件
  fs.ftruncate(fd, 10, function(err){
    if (err){
      console.log(err);
    }
    console.log("文件截取成功。");
    console.log("读取相同的文件");
    fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
      if (err){
        console.log(err);
      }

      // 仅输出读取的字节
      if(bytes > 0){
        console.log(buf.slice(0, bytes).toString());
      }

      // 关闭文件
      fs.close(fd, function(err){
        if (err){
          console.log(err);
        }
        console.log("文件关闭成功！");
      });
    });
  });
});



// var buf = Buffer.alloc(26);
// for (var i = 0 ; i < 26 ; i++) {
//   buf[i] = i + 97;
// }
//
// console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
// console.log( buf.toString('ascii',0,5));   // 输出: abcde
// console.log( buf.toString('utf8',0,5));    // 输出: abcde
// console.log( buf.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde



//
// var buffer1 = Buffer.from(('菜鸟教程'));
// var buffer2 = Buffer.from(('www.runoob.com'));
// var buffer3 = Buffer.concat([buffer1,buffer2]);
// console.log("buffer3 内容: " + buffer3.toString());


// fs.readdir(remotePath,function(err,files){
//   if(err){
//     console.log('111');
//     return;
//   }
//   files.forEach(function(filename){
//     var filedir = path.join(remotePath,filename);
//     fs.stat(filedir,function(err, stats){
//       if (err) throw err;
//       if(stats.isFile()){
//           console.log(filename)
//           let content = fs.readFileSync(path.join(remotePath,filename), 'utf-8')
//           console.log(content)
//           fs.appendFile('./public/test/3.txt', content)
//
//       } else if(stats.isDirectory()){
//         return false
//       }
//     });
//   });
// });
