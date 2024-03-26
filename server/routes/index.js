var express = require('express');
var router = express.Router();
const mammoth = require("mammoth");
const pdfjs = require('pdfjs-dist');


// 解决跨域问题
router.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OP0TIONS");
  res.header("X-Powered-By", "Express");
  res.header("Content-Type", "text/html; charset=UTF-8");
  next();
});


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// 自定义接口
router.get('/list', function (req, res, next) {
  let { path } = req.query;
  //用 promise 获取页面
  pdfjs.getDocument(path).then(function (pdf) {
    // 获取i页的页面
    pdf.getPage(i).then(function (page) {
      // 识别pdf中文本
      page.getTextContent().then(function (textContent) {
        for (let j = 0; j < textContent.items.length; j++) {
          // textContent.items[j].str为识别到的文本字符串
          console.log( textContent.items[j].str);
        }
      });
    })
  });
  res.send({
    "code": 1,
    data: req.query,
  })
  // console.log(path);
  // const html = '';

  // mammoth.convertToHtml({path})
  // .then((result) => {
  //   html = result.value;
  //   res.send({
  //     "code":1,
  //     data:req.query,
  // })
  // })
  // .done();

});

module.exports = router;
