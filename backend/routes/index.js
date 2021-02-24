var express = require('express');
var router = express.Router();
var cloudinary = require('cloudinary').v2;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

var uniqid = require('uniqid');

router.get('/upload', async function (req, res, next) {
  console.log('-', req.query)
})
router.post('/upload', async function (req, res, next) {
  const pictureName = './tmp/' + uniqid() + '.jpg'

  const resultCopy = await req.files.avatar.mv(pictureName)

  if (!resultCopy) {
    cloudinary.config({
      cloud_name: 'dicdkyp3a',
      api_key: '223251262178638',
      api_secret: '-Fk3YqHylNGDPYp6woNf3SbadtY'
    });
    const resultCloudinary = await cloudinary.uploader.upload(pictureName);
    res.json({ result: true, resultCloudinary })
  } else {
    res.json({ result: false, error: resultCopy })
  }
})

module.exports = router;
