module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['last 2 version', 'not ie < 11', 'iOS >= 9', 'Android >= 4.4'],
      cascade: true
    })
  ]
}