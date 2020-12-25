var http = require('http');
var url = require('url');
var fs = require('fs');
var express = require('express');
var app = express();
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
http.createServer(function(req, res) {

	//获取get请求中的参数
	// req.setHeader("Access-Control-Allow-Origin", "*");
	// res.setHeader("Access-Control-Allow-Origin", "*");
	let post
	// console.log(req)

	req.on('data', function(chunck) { //通过req的data事件监听，每当接收到请求体的数据，进行叠加
		if (req.url!== '')  {}
		post += chunck;
		console.log(post)
	});

	res.on('end',function(data) {
		console.log(data)
		res.end(data)
	})
	
	return
	var requset_url = req.url;
	//将字符串格式参数转化为对象使用
	var strurl = url.parse(requset_url, true).query
	var sum = Number(strurl.username) + Number(strurl.password)
	console.log(sum);
	//下面这个对象是buffer类型的对象
	var content = fs.readFileSync('homework.html')
	//现在我们要将他转换为字符串类型的对象
	content = content.toString().replace('{{sum}}', sum);
	console.log(content)
	response.end(content)
}).listen(3000, function() {
	console.log('服务启动!!!')
})
