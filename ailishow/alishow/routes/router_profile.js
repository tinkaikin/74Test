const express = require('express');
const router = express.Router();

const path = require('path');

//渲染 /admin/center/profile.html           显示个人页
router.get('/center/profile', (req, res) => {
  res.render(path.join(rootPath, 'view', '/admin/center/profile.html'))
})

//渲染 /admin/center/password-reset         显示修改密码页
router.get('/center/password-reset', (req, res) => {
  res.render(path.join(rootPath, 'view', '/admin/center/password-reset.html'));
})

module.exports = router;