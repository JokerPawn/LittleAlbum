var fs = require('fs');
var path = require('path');
var file = require('../models/file.js');
var sd = require('silly-datetime');
var formidable = require('formidable');
var gm = require('gm');

exports.showIndex = function (req, res, next) {
    file.getAllAlbums(function (err, allAlbums) {
        if (err) {
            console.log(err);
            next();
            return;
        }
        res.render('index', {
            'active': 'index',
            'allAlbums': allAlbums
        });
    });
}
exports.showAlbum = function (req, res, next) {
    var albumName = req.params.albumName;
    file.getAllImagesByAlbumName(albumName, function (err, allImages) {
        if (err) {
            console.log(err);
            next();
            return;
        }
        res.render('album', {
            'active': 'album',
            'allImages': allImages,
            'albumName': albumName
        });
    });
}

exports.showUp = function (req, res, next) {
    file.getAllAlbums(function (err, allAlbums) {
        if (err) {
            console.log(err);
            next();
            return;
        }
        res.render('up', {
            'active': 'up',
            'allAlbums': allAlbums,
            'albumName': ''
        });
    });
}

exports.doUp = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + '/../tempup/');
    form.parse(req, function(err, fields, files) {
        console.log(files);
        console.log(fields);
        console.log(files.image);
        if (err) {
            console.log(err);
            next();
            return;
        }
        if (files.image.name === '') {
            res.send('请选择图片！');
            fs.unlink(files.image.path);
            return;
        }
        if (parseInt(files.image.size) > 1024000) {
            res.send('图片不能大于1M！');
            fs.unlink(files.image.path);
            return;
        }
        var albumName = fields.albumName;
        var time = sd.format(new Date(), 'YYYYMMDDHHmmss');
        var random = parseInt(Math.random() * 89999 + 10000);
        var extname = path.extname(files.image.name);
        var oldPath = files.image.path;
        var newPath = path.normalize(__dirname + '/../uploads/' + albumName + '/'+ time +  random + extname);

        gm(oldPath)
        .resize(200, 130, '!')
        .write(newPath, function (err) {
            if (err) {
                console.log(err);
                res.send('修改失败！');
                return;
            }
            res.redirect('/albumName/' + albumName);
            //res.send('1');//改名成功
        });

       /* fs.rename(oldPath, newPath, function (err) {
            if (err) {
                console.log(err);
                res.send('-2');//改名失败
                return;
            }
            res.redirect('/albumName/' + albumName);
            //res.send('1');//改名成功
        });*/
    });

}