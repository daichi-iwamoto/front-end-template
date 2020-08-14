# front-end-template (pure-js)
> npm-scriptを使用して素のjsを圧縮するテンプレート

## 使用方法

```
# モジュールインストール
npm install

# jsの圧縮処理
npm run js
```

---
> 以下は自身のnode.js環境に手動で導入する場合の手順

## plugins
> 使用するモジュール群

* uglify-js
* onchange

## js圧縮環境構築手順
[uglify-js](https://www.npmjs.com/package/uglify-js)と[onchange](https://www.npmjs.com/package/onchange)インストール
```
npm install onchange -D
npm install uglify-js -D
```

### package.json
`package.json`の`script`箇所に下記を追加
```
"js": "onchange src/js/**/*.js -- node uglify-js.js {{changed}}"
```

`onchange src/js/**/*.js`で`src/js/`ディレクトリ以下のjsファイルを監視して
変更があれば`uglify-js.js`が実行される
引数として`{{changed}}`（onchangeが検知した変更のかかったファイルのパス）を渡している

### uglify-js.js
`package.json`で指定した`uglify-js.js`を下記の様に作成
解説はコメントアウトで記載

```javascript
// 使用するモジュールを読み込む
var UglifyJS = require("uglify-js");
var fs = require('fs');
var path = require('path');

// 変更されたJSのパスを引数(process.argv[2])から取得し、バックスラッシュをスラッシュに変換
var inputPath = process.argv[2].replace(/\\/g, '/');

// 変更されたJSのパスを元に、アウトプット先のディレクトリを指定する為の変数を作成
var outputPath = inputPath.replace('src\/', 'dist\/');

// 圧縮処理
// 変更されたJSを読み込み変数に格納
var code = fs.readFileSync(inputPath, "utf8");
// uglify-jsモジュールを使用して圧縮・変数に格納（圧縮形式等を指定する場合はここで行う）
var result = UglifyJS.minify(code);

// 出力先のディレクトリの存在確認
fs.access(path.dirname(outputPath), fs.constants.W_OK, (err) => {
  // ディレクトリが存在しなかった場合
  if (err) {
    // ディレクトリを作成
    fs.mkdir(path.dirname(outputPath), (err) => {
      if (err) throw err;
      // ディレクトリが作成されたらファイルを作成し圧縮後のコードを書き込む
      fs.writeFile(outputPath, result.code, (err) => {
        if (err) throw err;
        // ディレクトリ作成とJS圧縮の成功ログ出力
        console.log('Success mkdir & press (" ' + outputPath + ' ") !');
      });
    });
  }
  // ディレクトリが存在していた場合、圧縮後のコードを書き込む
  fs.writeFile(outputPath, result.code, (err) => {
    if (err) throw err;
  　//　JS圧縮成功のログ出力 
    console.log('Success press (" ' + outputPath + ' ") !');
  });
});
```