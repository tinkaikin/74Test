//创建服务器

const express = require('express');
const app = express();

app.listen(8080, () => { console.log('8080 Alishow Server is Running...') })

const bp = require('body-parser');
app.use(bp.urlencoded({ extended: false }));

global.rootPath = __dirname;

//配置session
const session = require('express-session');

app.use(session({
  secret: '4ey32erfyf3fgpg',
  resave: false,
  saveUninitialized: false
}))




//挂载静态资源
app.use('/assets', express.static('./view/assets'));
app.use('/uploads', express.static('./view/uploads'));
app.use('/upload', express.static('./upload'));

//配置模板引擎
const template = require('express-art-template');
app.engine('html', template);

const url = require('url');
//判断登录  //如果不是以/admin开始的过

let admit = ['/admin/login','/api/login/checkLogin','/index','/list','/detail']
app.use(function (req, res, next) {
  let pathurl = url.parse(req.url).pathname;
  // console.log(pathurl)   || !req.url.startsWith('/admin')
  if (admit.includes(pathurl)) {
    return next();
  }
  if (req.session.isLogin !== true) {
    res.redirect('/admin/login');
  }
  next();
})



 

//配置主路由
const former_router = require('./routes/former_router');
app.use(former_router);

//配置后端的路由
const router_cate = require('./routes/router_cate.js');
app.use('/admin', router_cate);

const router_bork = require('./routes/router_bork.js');
app.use('/admin', router_bork);

const router_post = require('./routes/router_post.js');
app.use('/admin', router_post);

const router_user = require('./routes/router_user.js');
app.use('/admin', router_user);

const router_profile = require('./routes/router_profile.js');
app.use('/admin', router_profile);

const router_other = require('./routes/router_other.js');
app.use('/admin', router_other);

const router_comment = require('./routes/router_comment.js');
app.use('/admin', router_comment);

const api = require('./api.js');
app.use(api);


