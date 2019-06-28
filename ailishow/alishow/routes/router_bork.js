//后台 首页 / 登录页

const express = require('express');
const router = express.Router();

const path = require('path');
const db = require('../db.js');


// const id = req.session.userInfo.admin_id;
// const sql = 'select ali_admin.admin_pic from ali_admin where admin_id=?';
// db.query(sql, id, (err, data) => {
  
// })

//渲染 admin/index.html 首页 
router.get('/index', (req, res) => {
  res.render(path.join(rootPath, 'view', 'admin', 'index.html'));
  
})
//渲染 admin/login.html 登录页
router.get('/login', (req, res) => {
  res.render(path.join(rootPath, 'view', 'admin', 'login.html'), {});
})

//=================请求============================================


// 渲染   /admin/index/imgUrl
router.get('/index/imgUrl', (req, res) => {
  const id = req.session.userInfo.admin_id;
  const sql = 'select ali_admin.admin_pic from ali_admin where admin_id=?';
  db.query(sql, id, (err, data) => {
    res.send({code:200,message:'获取成功',data:data[0]})
  })
})

module.exports = router;