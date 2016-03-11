var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BWP' });
});



router.post('/', function(req, res, next) {
  // res.render('index', { title: 'BWP' });
  console.log("got a post");
  // myPort.write("2\n", function(err, results) {
  //   console.log("sent data", err, results);
  // });
});
/* GET home page. */
router.get('/p', function(req, res, next) {
  res.render('page', { title: 'test' });
});






module.exports = router;
