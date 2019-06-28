//前端 配置子路由  
const express = require('express');
const router = express.Router();

const path = require('path');

const db = require('../db.js');

//渲染 list                         前端列表页
router.get('/list', (req, res) => {
  const sql = `select * from ali_cate;
               select * from ali_article order by rand() limit 0,5;
               select * from ali_pic;
               select ali_article.*,ali_admin.admin_nickname from ali_article
                      join ali_admin on ali_article.article_adminid=ali_admin.admin_id
                      where ali_article.article_cateid=${req.query.id}
               `
  db.query(sql, (err, result) => {
      //重构传递到模板的数据
      const obj = {
          cate: result[0],
          rand: result[1],
          pic: result[2],
          news: result[3]
    }
    res.render(path.join(rootPath, 'view', 'list.html'), obj);
  })
})


//显示                                前台首页
router.get('/index', (req, res) => {
  const sql = `select * from ali_cate;
               select * from ali_article order by rand() limit 0,5;
               select * from ali_pic;
               select * from ali_article where article_focus=1 limit 0,5;
               select ali_article.*, ali_cate.cate_name, ali_admin.admin_nickname from ali_article
                  join ali_admin on ali_article.article_adminid = ali_admin.admin_id
                  join ali_cate  on ali_article.article_cateid = ali_cate.cate_id
                  order by article_addtime asc
                  limit 0,3;
              SELECT
                  ali_article.article_title,
                  ali_article.article_click,
                  ali_article.article_good,
                  ali_article.article_addtime,
                  ali_article.article_id
                  FROM
                  ali_article
                  ORDER BY
                  ali_article.article_id DESC,
                  ali_article.article_click DESC
                  LIMIT 0, 5;
              SELECT
                  ali_article.article_title,
                  ali_article.article_id,
                  ali_article.article_file
                  FROM
                  ali_article
                  ORDER BY
                  ali_article.article_click DESC
                  LIMIT 0, 4
                  
                  
              `
  
  db.query(sql, (err, result) => {
      //重构传递到模板的数据
      const obj = {
          cate: result[0],
          rand: result[1],
          pic: result[2],
          focus: result[3],
          news: result[4],
          top: result[5],
          host:result[6],
          
    }
      res.render(path.join(rootPath, 'view', 'index.html'),obj);
    })
})


//渲染 detail    /detail  参数 为 id=?             前端详情页         
router.get('/detail',(req, res) => {
  //根据 文章的 id 请求 文章的详情页?
  const sql = `select * from ali_cate;
               select * from ali_article order by rand() limit 0,5;
               select * from ali_pic;
               select ali_article.*,ali_admin.admin_nickname,
                      ali_cate.cate_id,ali_cate.cate_name from ali_article
                      join ali_admin on ali_article.article_adminid=ali_admin.admin_id
                      join ali_cate on ali_article.article_cateid=ali_cate.cate_id
                      where ali_article.article_id=${req.query.id}
               `
    db.query(sql ,(err, result) => {
        //重构传递到模板的数据
      const obj = {
            cate: result[0],
            rand: result[1],
            pic: result[2],
            news: result[3][0]
      }
      res.render(path.join(rootPath, 'view', 'detail.html'),obj);
    })
})



module.exports = router;