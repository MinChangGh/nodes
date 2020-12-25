const http = require('http')
const fs = require('fs')
http.createServer(function(req, res) {
    res.setHeader("Access-Control-Allow-Origin","*");

	//获取get请求中的参数
    if (req.url == '/upload') {

        req.on('data',(chunk)=>{
            console.log(chunk)
            fs.writeFile('./2.jpg',chunk,(err)=>{
                if (err) {
                    console.log(err)
                    return
                }
            })
        }) 
    
        res.on('end',function(data) {
          
            res.end('ok')
        })
    }

}).listen(3001, function() {
	console.log('port: 3001   服务启动!!!')
})