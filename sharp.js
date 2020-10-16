const fs = require('fs');
const sharp = require('sharp');

const files = fs.readdirSync('./src/img', { withFileTypes: false });

if (process.argv[2] == 'w') {
  files.map(file => {
    sharp(`./src/img/${file}`)
      .resize(Number(process.argv[3]))
      .toFile(`./dist/img/${file}`)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
  });
} else if (process.argv[2] == 'h') {
  files.map(file => {
    sharp(`./src/img/${file}`)
      .resize(null, Number(process.argv[3]))
      .toFile(`./dist/img/${file}`, (err, info) => {
        if (err) {
          throw err;
        }
        console.log(info);
      })
  });
} else if (process.argv[2] == 'wh') {
  files.map(file => {
    sharp(`./src/img/${file}`)
      .resize({
        width: Number(process.argv[3]),
        height: Number(process.argv[4]),
        position: 'top'
      })
      .toFile(`./dist/img/${file}`, (err, info) => {
        if (err) {
          throw err;
        }
        console.log(info);
      })
  });
} else {
  console.log('引数の指定を見直してください。');
}