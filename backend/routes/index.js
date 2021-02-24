var express = require('express');
var router = express.Router();
var cloudinary = require('cloudinary').v2;
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

var uniqid = require('uniqid');

router.post('/upload', async function (req, res, next) {
  const imagePath = './tmp/' + uniqid() + '.jpg'

  const resultCopy = await req.files.avatar.mv(imagePath)

  if (!resultCopy) {

    cloudinary.config({
      cloud_name: 'dicdkyp3a',
      api_key: '223251262178638',
      api_secret: '-Fk3YqHylNGDPYp6woNf3SbadtY'
    })

    const resultCloudinary = await cloudinary.uploader.upload(imagePath)

    if (resultCloudinary.url && resultCloudinary.url.length > 0) {
      fs.unlinkSync(imagePath)
      res.json({ result: true, resultCloudinary })
    } else {
      res.json({ result: false, error: 'pb sur cloudinary' })
    }

  } else {
    res.json({ result: false, error: resultCopy })
  }
})

router.post('/upload_video', async function (req, res, next) {
  const moviePath = './tmp/' + uniqid() + '.mp4'

  const resultCopy = await req.files.movie.mv(moviePath)

  // if (!resultCopy) {

  //   cloudinary.config({
  //     cloud_name: 'dicdkyp3a',
  //     api_key: '223251262178638',
  //     api_secret: '-Fk3YqHylNGDPYp6woNf3SbadtY'
  //   })

  //   const resultCloudinary = await cloudinary.uploader.upload(moviePath)

  //   if (resultCloudinary.url && resultCloudinary.url.length > 0) {
  //     fs.unlinkSync(moviePath)
  //     res.json({ result: true, resultCloudinary })
  //   } else {
  //     res.json({ result: false, error: 'pb sur cloudinary' })
  //   }

  // } else {
  //   res.json({ result: false, error: resultCopy })
  // }
})

module.exports = router;
