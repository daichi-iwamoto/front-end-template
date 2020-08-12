var UglifyJS = require("uglify-js");

var fs = require('fs');
var path = require('path');

var inputPath = process.argv[2].replace(/\\/g, '/');
var outputPath = inputPath.replace('src\/', 'dist\/');

// 圧縮処理
var code = fs.readFileSync(inputPath, "utf8");
var result = UglifyJS.minify(code);

// ディレクトリの存在確認
fs.access(path.dirname(outputPath), fs.constants.W_OK, (err) => {
  // ディレクトリが存在しなかった場合
  if (err) {
    fs.mkdir(path.dirname(outputPath), (err) => {
      if (err) throw err;
      fs.writeFile(outputPath, result.code, (err) => {
        if (err) throw err;
        console.log('Success mkdir & press (" ' + outputPath + ' ") !');
      });
    });
  }
  // ディレクトリが存在していた場合
  fs.writeFile(outputPath, result.code, (err) => {
    if (err) throw err;
    console.log('Success press (" ' + outputPath + ' ") !');
  });
});