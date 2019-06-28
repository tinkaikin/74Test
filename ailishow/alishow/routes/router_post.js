const express = require('express');
const router = express.Router();

const path = require('path');
const db = require('../db');

//渲染 admin/post/posts           显示文章首页
router.get('/post/posts', (req, res) => {
  res.render(path.join(rootPath, 'view', 'admin', 'post/posts.html'), {});
})
//渲染 admin/post/addpost         显示文章添加页
router.get('/post/addpost', (req, res) => {
  res.render(path.join(rootPath, 'view', 'admin', 'post/addpost.html'), {});
})

 
//-------------------请求系列-----------------------------------

// get /admin/post/getPosts                 请求所有数据
router.get('/post/getPosts', (req, res) => {
  const sql = 'select * from ali_admin';
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return res.send({code:201,message:'获取数据失败'})
    }
    res.send({ code: 200, message: "获取数据成功", list: data })
  })
})

// get /admin/post/delPosts                 根据id 删除一条数据
router.get('/post/delPosts', (req, res) => {
  const sql = 'delete from ali_article where article_id=?';
  db.query(sql,req.query.id, (err, data) => {
    if (err) {
      console.log(err);
      return res.send({ code: 201, message: '删除失败' });
    }
    res.send({ code: 200, message: '删除成功' });
  })
})



// var multer = require('multer')
// var upload = multer({ dest: 'uploads/'})
//post /admin/post/addPosts                 添加一条数据
// router.post('/post/addPosts', upload.none(), (req, res) => {
//   // console.log(req.body);
//   // console.log(req.file);
//   res.send({code:'test'})
// })



module.exports = router;