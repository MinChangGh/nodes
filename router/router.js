 // 路由相关
var express = require('express');
const fs = require('fs')
const router = express.Router();
var mysql = require('mysql');
var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'zym123456',
    database: 'jd'
});


// var mutipart = require('connect-multiparty');
// var mutipartMiddeware = mutipart(); // mutipartMiddeware 作用


var multer = require('multer');
// var storage = multer.diskStorage({
//   //文件存储路径
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, "/../uploads/temps"));
//     },
//    //修改上传文件的名字
//    //file 是个文件对象 ,fieldname对应在客户端的name属性
//    //存储的文件需要自己加上文件的后缀，multer并不会自动添加
//    //这里直接忽略文件的后缀.
//     filename: function (req, file, cb) {
//         var date = new Date();
//         cb(null, moment().format("YYYYMMDDhhmmss") + file.originalname);
//     }
// });
// let objMulter = multer({storage : storage });
// 查找数据
router.get('/home/:id', function (req, res, next) {
    db.query(`SELECT * FROM product_image WHERE product_id =${req.params.id}`, (err, data) => {
        if (err) {
            return err
        }
        res.send(JSON.stringify(data))
    });
});
router.get('/banner', function (req, res, next) {
    db.query(`SELECT * FROM product_image WHERE product_id >3 AND product_id<10 GROUP BY product_id `, (err, data) => {
        if (err) {
            return err
        }
        res.send(JSON.stringify(data))
    });
});

// 获取列表

router.get('/getlist', function (req, res, next) {
    db.query(`SELECT * FROM product WHERE product_id%3=0`, (err, data) => {
        if (err) {
            console.log(err)
            return err
        }
        res.send(JSON.stringify(data))
    });
});


// upload  上传
router.post('/upload', function (req, res) {
    console.log('++++++++++++++++++++++')
    console.log(req.body)
    console.log(req.query)

    req.on('data',(chunk)=>{
        fs.writeFile('./1.png',chunk,(err)=>{
            if (err) {
                console.log(err)
                return
            }
        })
    }) 
    console.log('++++++++++++++++++++++')

    let data = JSON.stringify(req.files)
    res.send(data)
});

// login  插入数据
router.post('/login', (req, res, next) => {
    let user_name = req.body.userName
    let pwd = req.body.pwd
    let phone = req.body.phone
    let sql = `INSERT INTO user (pay_password,user_name,login_password,user_number) VALUES ('19','${user_name}',${pwd},'${phone}')`
    db.query(sql, (err, data) => {
    	if(err) {
    		return err
    	}
    	res.send(data)
    });
});

// 搜索商品

router.post('/findGoods', (req, res, next) => {
    let txt = req.body.txt

    let sql = `SELECT * FROM product WHERE product_name LIKE '%${txt}%'`
    db.query(sql, (err, data) => {
        if (err) {
            return err
        }
        res.send(JSON.stringify(data))
    });
});




module.exports = router