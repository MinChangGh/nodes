// 合并分片
function mergeChunks(fileName, chunks, callback) {
  console.log('chunks:' + chunks);
  let chunkPaths = chunks.map(function (name) {
    return path.join(process.env.IMAGESDIR, name)
  });

  // 采用Buffer方式合并
  const readStream = function (chunkArray, cb) {
    let buffers = [];
    chunkPaths.forEach(function (path) {
      let buffer = fs.readFileSync(path);
      buffers.push(buffer);
    });

    let concatBuffer = Buffer.concat(buffers);
    let concatFilePath = path.join(process.env.IMAGESDIR, fileName);
    fs.writeFileSync(concatFilePath, concatBuffer);

    chunkPaths.forEach(function (path) {
      fs.unlinkSync(path)
    })
    cb();
  };


  readStream(chunkPaths, callback);

}