var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  console.log("requested BH");
  res.render('behaviour_at_home', { title: 'BWP – BH' });
  // res.render('nutrition-and-aging', { title: 'BWP – N&A' });
});

router.get('/img', function(req, res, next) {
  console.log("requested Img");
  // res.render('behaviour_at_home', { title: 'BWP – BH' });
  // res.render('nutrition-and-aging', { title: 'BWP – N&A' });
});


router.post('/', function(req, res, next) {
  console.log("got a post from behaviour_at_home");
});



module.exports = router;
