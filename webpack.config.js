module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/',
  },
  devServer: {
    contentBase: __dirname + '/dist/',
    port: 8080,
  },
};
