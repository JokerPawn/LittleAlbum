var fs = require('fs');

exports.getAllAlbums = function (callback) {
    fs.readdir('./uploads', function (err, files) {
        var allAlbums = [];
        if (err) {
            console.log(err);
            callback('没有找到uploads', null);
            return;
        }
        (function iterator(i) {
            if (i == files.length) {
                callback(null, allAlbums);
                return;
            }
            fs.stat('./uploads/' + files[i], function (err, stats) {
                if (err) {
                    console.log(err);
                    callback('没有找到' + files[i], null);
                    return;
                }
                if (stats.isDirectory()) {
                    allAlbums.push(files[i]);
                }
                iterator(i + 1);
            });
        })(0);
    });
}

exports.getAllImagesByAlbumName = function (albumName, callback) {
    fs.readdir('./uploads/' + albumName, function (err, files) {
        if (err) {
            console.log(err);
            callback('没有找到' + albumName, null);
            return;
        }
        var allImages = [];
        (function iterator(i){
            if (i == files.length) {
                console.log(allImages);
                callback(null, allImages);
                return;
            }
            fs.stat('./uploads/' + albumName + '/' + files[i], function (err, stats) {
                if (err) {
                    console.log(err);
                    callback('没有找到' + files[i], null);
                    return;
                }
                if (stats.isFile()) {
                    allImages.push(files[i]);
                }
                iterator(i + 1);
            });
        })(0);
    });
}