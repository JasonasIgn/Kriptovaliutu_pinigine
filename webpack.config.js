const config = require("./src/config");

module.exports = {
  mode: config.isDev ? "development" : "production",
  devServer: {
    host: "localhost",
    port: 3000,
    compress: true,
    historyApiFallback: false,
    hot: false,
    https: false,
    noInfo: false
  }
};
