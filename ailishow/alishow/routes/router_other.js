
const express = require('express');
const router = express.Router();

const path = require('path');
const db = require('../db.js');


//渲染 /admin/other/slides.html    显示
router.get('/other/slides', (req, res) => {
  
  res.render(path.join(rootPath, 'view', '/admin/other/slides.html'));
})


//-------------------------------------------

// post   //admin/other/delSlides     删除一项
router.get('/other/delSlides', (req, res) => {
  const sql = 'delete from ali_pic where pic_id=?';
  db.query(sql, req.query.id, (err, data) => {
    if (err) {
      console.log(err);
      return res.send({ code: 201, message: '删除失败' });
    }
    res.send({code:200,message:'删除成功'})
  })
})


module.exports = router;