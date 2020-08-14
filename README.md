# front-end-template
> npm-scriptを使用して作成したpug, scss, typescriptのコンパイル環境

## 使用方法

```
# モジュールインストール
npm install

# コンパイル実行 & localhost立ち上げ
npm run watch
```

## plugins
> 使用するモジュール群

* pug-cli
* node-sass
* postcss-cli
* autoprefixer
* typescript
* browser-sync
* npm-run-all
* onchange

---

> 以下は自身のnode.js環境に手動で導入する場合の

## pugコンパイル環境構築
[pug-cli](https://www.npmjs.com/package/pug-cli)のインストール
```
npm install pug-cli -D
```

`package.json`の`script`箇所に下記を追加
```
"pug": "pug src/pug/ -o dist/ --hierarchy -w -P"
```

| option | description |
| --- | --- |
| -o, --out | 出力先のディレクトリを指定 |
| -w, --watch | コンパイル前のディレクトリを監視 |
| -P, --pretty | ピュアなHTMLを出力する |
| --hierarchy | ディレクトリ構造を維持して出力 |

```
# pugのコンパイル単体で実行
npm run pug
```

## scssコンパイル環境構築
[node-sass](https://www.npmjs.com/package/node-sass), [postcss-cli](https://www.npmjs.com/package/postcss-cli), [autoprefixer](https://www.npmjs.com/package/autoprefixer), [onchange](https://www.npmjs.com/package/onchange), [npm-run-all](https://www.npmjs.com/package/npm-run-all) をインストール
```
npm install node-sass -D
npm install postcss-cli -D
npm install autoprefixer -D
npm install onchange -D
npm install npm-run-all -D
```

### scssをcssにコンパイルを単体実行
[node-sass](https://www.npmjs.com/package/node-sass)を使用

`package.json`の`script`箇所に下記を追加
```
"compile": "node-sass src/scss/ --output dist/css/ --output-style compressed --source-map true"
```

`node-sass`のオプション
| option | description |
| --- | --- |
| -o, --output | 出力先のディレクトリを指定 |
| --output-style | 出力後の形式指定(compressed:1行に圧縮) |
| --source-map | source-mapを出力有無 |

```
# scssをcssにコンパイルを単体実行
npm run compile
```

### ベンダープレフィックスを付与する処理単体を実行
[postcss-cli](https://www.npmjs.com/package/postcss-cli)とそのプラグイン[autoprefixer](https://www.npmjs.com/package/autoprefixer)を使用

`package.json`の`script`箇所に下記を追加
```
"prefix": "postcss dist/css/ -u autoprefixer --replace"
```

`postcss-cli`のオプション
| option | description |
| --- | --- |
| -u, --use | 使用するプラグイン(今回は`autoprefixer`) |
| --replace | 出力ファイルを今あるファイルと置き換える |


`package.json`に下記を追加
```
  ・
  ・
  ・
"browserslist": [
  "since 2000"
],
  ・
  ・
  ・
```

`browserslist`には対応するブラウザを指定
今回は2000年以降のバージョンのすべてのブラウザに対応

```
# ベンダープレフィックスを付与する処理単体を実行
npm run prefix
```

### scssのコンパイル・ベンダープレフィックス対応を実行
[onchange](https://www.npmjs.com/package/onchange)と[npm-run-all](https://www.npmjs.com/package/npm-run-all)を使用

`package.json`の`script`箇所に下記を追加
```
"scss": "onchange src/scss/*.scss -- run-s compile prefix"
```

```
# onchangeの使用方法
onchange (監視対象ファイル) -- (実行内容)

# npm-run-allの使用方法
run-s (1番目に行う処理) (2番目に行う処理) …
```

```
# scssのコンパイル・ベンダープレフィックス対応を実行
npm run scss
```

## TypeScriptコンパイル環境構築
[typescript](https://www.npmjs.com/package/typescript)を使用
```
npm install typescript -D
```

```
# tsconfig.jsonを生成
tsc --init
```

`tsconfig.json`の下記を編集
| option | description |
| --- | --- |
| target | 出力時のJSの形式を指定(今回はes5) |
| lib | コンパイル時に使用するモジュール(今回は`ES2015`と`ES2020`の使用を想定) |

`package.json`の`script`箇所に下記を追加
```
"ts": "tsc --rootDir src/ts --outDir dist/js -w"
```

```
# typescriptをjsにコンパイルを単体実行
npm run ts
```

## 画像圧縮
Qiitaで詳細を投稿しました
https://qiita.com/omochironn/items/ecf36d25f8064e8fe4c2

## ホットリロード対応
[browser-sync](https://www.npmjs.com/package/browser-sync)を使用
```
npm install browser-sync -D
```

`package.json`の`script`箇所に下記を追加
```
"start": "browser-sync start -s dist/ -w dist/*.html dist/*.css dist/*.js"
```

`browser-sync start -s dist/`の箇所で`dist/`をルートディレクトリと設定しローカルホストを立ち上げる
`-w dist/*.html dist/*.css dist/*.j`の箇所で`dist`下の「html, css, js」のファイルを監視し
変更がかかる度にリロードを行う

```
# ホットリロードを単体実行
npm run start
```

## 全ての処理を並列実行
[npm-run-all](https://www.npmjs.com/package/npm-run-all)を使用
```
npm install npm-run-all -D
```

`package.json`の`script`箇所に下記を追加
```
"watch": "run-p scss pug ts press start"
```
作成した全てのscriptを指定

```
# 全ての処理を実行
npm run watch
```
