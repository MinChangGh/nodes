// git 测试 01
// 测试02

var express = require('express');
var app = express();
var router = require('./router/router')
const path = require('path')

//  var bodyParser = require("body-parser");
var mutipart = require('connect-multiparty');
app.use(express.static(path.join(__dirname, 'public')))
var mutipartMiddeware = mutipart(); // mutipartMiddeware 作用
// app.use(mutipart({
// 	uploadDir: './public/image'
// }));


// app.use(bodyParser.urlencoded({  // bodyParser 的作用
// 	extended: false
// }));
app.use(router)

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", '3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});



app.listen(9001, () => {
	console.log('listen:' + 9001)
});
