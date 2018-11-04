const path = require("path");
const config = require("./src/config");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: config.isDev ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(webpack-dev-server|node_modules)/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /(\.eot|\.otf|\.woff|\.woff2|\.ttf|\/fonts\/.*\.svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[hash:16].[ext]"
            }
          }
        ]
      },
      {
        test: /favicon\.ico$/,
        use: [
          {
            loader: "file-loader?name=[name].[ext]",
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "css/[name].[hash:16].css"
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "css-loader",
            options: {
              minimize: config.isDev,
              sourceMap: config.isDev
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              interpolate: true,
              minimize: config.isDev,
              removeComments: !config.isDev,
              collapseWhitespace: true,
              attrs: ["img:src", "link:href", "script:src", "div:data-bg"]
            }
          }
        ]
      }
    ]
  },
  entry: "./src/app/index.js",
  output: {
    filename: "[name].[hash].js",
    path: path.resolve("./dist"),
    publicPath: "/"
  },
  resolve: {
    extensions: [".mjs", ".web.js", ".js", ".json", ".web.jsx", ".jsx"]
  },
  devServer: {
    host: "localhost",
    port: 3000,
    compress: true,
    historyApiFallback: false,
    hot: false,
    https: false,
    noInfo: false
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/app/index.html" })]
};
