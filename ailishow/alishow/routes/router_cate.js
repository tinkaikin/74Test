//   后台   /admin/cate/XXX 

const express = require('express');
const router = express.Router();

const path = require('path');
const db = require('../db.js');

// // //配置post对应获取数据  不会用
// const multer  = require('multer')
// const upload = multer();

const moment = require('moment');

//渲染 admin/cate/cate                            首页
router.get('/cate/cate', (req, res) => {
  res.render(path.join(rootPath, 'view', 'admin', 'cate/cate.html'), {});
})
//渲染 admin/cate/addcate                         添加页面
router.get('/cate/addcate', (req, res) => {
  res.render(path.join(rootPath, 'view', 'admin', 'cate/addcate.html'), {});
})

//-------------------请求系列-----------------------------------

//  get 请求  /admin/cate/getCate              获取全部数据
router.get('/cate/getCate', (req, res) => {
  //搜索数据库
  const sql = 'select * from ali_cate'
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        code: 201,
        message:'请求的数据有误'
      })
    } else {
      res.send({
        code: 200,
        message: '查询栏目信息成功',
        list: result
      })
    };
  })
})

// get 请求   /admin/cate/deleCate             删除对应项
router.get('/cate/deleCate', (req, res) => {
  const id = req.query.id;
  const sql = 'delete from ali_cate where cate_id=?';
  db.query(sql, id, (err, data) => {
    if (err) {
      console.log(err);
      return res.send({
        code: 201,
        message:"sorry 删除失败!"
      })
    }
    res.send({code:200,message:'Ok 删除成功'})
  })
})

// get 请求    /admin/cate/delcatess            批量删除对应项
router.get('/cate/delcatess', (req, res) => {
    const ids = req.query.ids;
    const sql = `delete from ali_cate where cate_id in (${ids})`;

    db.query(sql, (err, result) => {
        if (err || result.affectedRows == 0) {
            return res.send({code: 201, message:"删除文章失败"});
        }

        res.send({code:200, message:"删除文章成功"});
    })
})

//post 请求   /admin/cate/addCatePost           添加一条信息
router.post('/cate/addCatePost', (req, res) => {
  const obj = {
    cate_name: req.body.name,
    cate_icon: req.body.icon,
    cate_addtime: moment().format('YYYY-MM-DD')
    //旧的获取日期 cate_addtime:new Date().toLocaleDateString()   
  }
  const sql = "insert into ali_cate set ?"; 
  db.query(sql, obj, (err, data) => {
    if (err) {
      console.log(err);
      return res.send({code: 201,msg:'添加失败'})
    } 
    res.send({code: 200,msg:'添加成功'})
  })
}) 

//get 请求    //admin/cate/upCate               根据id查数找1条数据
router.get('/cate/upCate', (req, res) => {
  const sql = 'select * from ali_cate where cate_id=?';
  db.query(sql, req.query.id, (err, data) => {
    res.render(path.join(rootPath, 'view', 'admin', 'cate/upcate.html'), data[0]);
  })
})

// post 请求  /admin/cate/upCatePost           修改后表单提交
router.post('/cate/upCatePost', (req, res) => {
  const obj = {
    cate_name: req.body.name,
    cate_icon: req.body.icon,
    cate_addtime: moment().format('YYYY-MM-DD')
  }
  const id = req.body.id;
  const sql = "update ali_cate set ? where cate_id=?";
  db.query(sql, [obj, id], (err, data) => {
    if (err) {
      console.log(err);
      res.send({
        code: 201,
        message:'修改失败'
      })
    } else {
      res.send({
        code: 200,
        message: '修改成功',
      })
    }
  })
}) 


module.exports = router;