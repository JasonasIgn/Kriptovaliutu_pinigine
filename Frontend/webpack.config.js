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
        test: /\.scss$/,
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
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: config.isDev,
              ident: "postcss",
              plugins: loader => [
                require("postcss-import")({ root: loader.resourcePath }),
                require("postcss-preset-env")(),
                require("cssnano")()
              ]
            }
          },
          {
            loader: "resolve-url-loader"
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g)$/,
        exclude: /\/fonts\//,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[hash:16].[ext]"
            }
          },
          {
            loader: "sharp-image-webpack-loader",
            options: {
              cache: false,
              withMetadata: true,
              jpegQuality: 80,
              jpegProgressive: true,
              pngProgressive: true,
              pngCompressionLevel: 6,
              webpQuality: 80,
              webpAlphaQuality: 100,
              tiffQuality: 80
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
  entry: {
    app: "./src/app/index.js"
  },
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
    historyApiFallback: true,
    hot: false,
    https: false,
    noInfo: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/app/index.html",
      inject: true,
      chunks: ["app"]
    })
  ]
};
