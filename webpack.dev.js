module.exports = {
  mode: 'development',
  entry: {
    index: [
      './source/js/scroll.js',
      './source/js/popup.js',
      './source/js/main.js',
    ],
  },
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
  },
};
