var express = require('express');
var app = express();
const path = require('path')
app.use(express.static(path.join(__dirname, '')))
var bodyParser = require("body-parser");
var mutipart = require('connect-multiparty');
var mutipartMiddeware = mutipart();
app.use(mutipart({
	uploadDir: './public/image'
}));
app.use(bodyParser.urlencoded({
	extended: false
}));
var mysql = require('mysql');
var db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'runoob'
});
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
// 查找数据
app.get('/home/:id', function(req, res, next) {
	db.query(`SELECT * FROM product_image WHERE product_id =${req.params.id}`, (err, data) => {
		if(err) {
			return err
		}
		res.send(JSON.stringify(data))
	});
});

// upload  上传
app.post('/upload', mutipartMiddeware, function(req, res) {
	console.log(req.files[0])
	let data = JSON.stringify(req.files)
	res.send(data[file0])

});

// login  插入数据
app.post('/login', (req, res, next) => {
	let user_name = req.body.userName
	let pwd = req.body.pwd
	let phone = req.body.phone
	console.log(req.body)
	let sql = `INSERT INTO user (pay_password,user_name,login_password,user_number) VALUES ('19','${user_name}',${pwd},'${phone}')`
	db.query(sql, (err, data) => {
		console.log(err)
		if(err) {
			return err
		}
		res.send('ok')
	});
});

app.listen(90, () => {
	console.log('listen:' + 90)
});