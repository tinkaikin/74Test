const mysql = require('mysql');

const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'alishow',
  multipleStatements: true

})
conn.connect();

 

module.exports = conn;
//测试
// const sql = 'select * from ali_cate';
// conn.query(sql, (err, data) => {
//   console.log(data);
// })