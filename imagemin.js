const imagemin = require('imagemin-keep-folder');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');

imagemin([process.argv[2]], {
  plugins: [
    imageminMozjpeg({
      quality: 85,
      progressive: true 
    }),
    imageminPngquant({
      quality: [.65, .8],
      speed: 1,
      floyd: 0
    }),
    imageminGifsicle(),
    imageminSvgo()
  ],
  replaceOutputDir: output => {
    return (
      console.log(process.argv[2]),
      output.replace(/img\//, '../dist/img/')
    )
  }
}).then(() => {
  console.log('Images optimized');
});