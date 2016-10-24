require('babel-register');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.babel');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
      chunks: false
  }
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
