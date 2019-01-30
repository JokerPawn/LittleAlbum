var express = require('express');
var app = express();
/*var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));*/

var router = require('./controller/router.js')

app.set('view engine', 'ejs');

app.use(express.static('./uploads'));
app.use(express.static('./public'));

app.get('/', router.showIndex);
app.get('/albumName/:albumName', router.showAlbum);
app.get('/up', router.showUp);
//app.post('/doUp', upload.array(), router.doUp);
app.post('/doUp', router.doUp);

//404
//app.use(function (req, res) {
//    res.render('err',{
//        'active': 'err'
//    });
//});

app.listen(3000);