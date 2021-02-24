var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

var uniqid = require('uniqid');

router.get('/upload', async function (req, res, next) {
  console.log('-',req.query)
})
router.post('/upload', async function (req, res, next) {
  const pictureName = './tmp/' + uniqid() + '.jpg'
  console.log('pictureName = ', pictureName)
  console.log('req.files = ', req.files)
  
  const resultCopy = await req.files.avatar.mv(pictureName)
  console.log('resultCopy = ', resultCopy)

  if (!resultCopy) {
    console.log('ok')
    res.json({ result: true })
  } else {
    res.json({ result: false, error: resultCopy })
  }
})

module.exports = router;
