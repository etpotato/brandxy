module.exports = {
  mode: 'production',
  entry: {
    index: [
      './source/js/scroll.js',
      './source/js/select.js',
      './source/js/slider.js',
    ],
  },
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
  },
};
