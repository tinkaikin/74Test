const express = require('express');
const router = express.Router();

const path = require('path');
const db = require('../db');

// 渲染 /admin/user/users                   自接从数据库里拿
router.get('/user/users', (req, res) => {
  const sql = 'select * from ali_admin';
  db.query(sql, (err, data) => {
    if (err) {
      return console.log(err)
    }
    res.render(path.join(rootPath, 'view', 'admin', 'user/users.html'),{list:data});
  })
})

//渲染  /admin/user/adduser.html           添加用户页面
router.get('/user/adduser', (req, res) => {
  res.render(path.join(rootPath, 'view', 'admin/user/adduser.html'));
})

//渲染  /admin/user/edituser.html           修改用户页面
router.get('/user/edituser', (req, res) => {
  const sql = 'select * from ali_admin where admin_id=?'
  db.query(sql, req.query.id, (err, data) => {
    if (err) {
      console.log(err);
      return res.send({ code: 201, message: '获取不到' })
    }
    res.render(path.join(rootPath, 'view', 'admin/user/edituser.html'), data[0])
  })
})




//=============请求==================================

// get   /admin/user/deleUser       通过id删除数据        
router.get('/user/deleUser', (req, res) => {
  const sql = 'delete from ali_admin where admin_id=?'
  db.query(sql, req.query.id, (err, data) => {
    if (err) {
      console.log(err)
      return res.send({code:201,message:'删除失败!'})
    }
    res.send({ code: 200, message: '删除成功' })
  })
})           




module.exports = router;