
const express = require('express');
const router = express.Router();

const path = require('path');
const db = require('../db.js');


//要求使用 promise 来 异步请求

// /admin/comment/comments
router.get('/comment/comments', (req, res) => {
  const sql = `
              SELECT
              ali_comment.*,
              ali_member.member_nickname,
              ali_article.article_title
              FROM
              ali_comment
              INNER JOIN ali_article ON ali_comment.cmt_articleid = ali_article.article_id
              INNER JOIN ali_member ON ali_comment.cmt_memid = ali_member.member_id
  
              `
  creatPromise(sql).then((data) => {
    res.render(path.join(rootPath,'view','/admin/comment/comments.html'),{list:data})
  }).catch((err) => {
    res.send({code:201,message:'请求错误'})
  })
})


module.exports = router;




function creatPromise(sql) {
  var p = new Promise(function (res, rej) {
    //异步代码
    db.query(sql, (err, data) => {
      if (err) {
        rej(err);
      }
      res(data);
    })
  })
  return p;
}