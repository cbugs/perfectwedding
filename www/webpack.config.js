const webpack  = require("webpack");
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  devServer: {
    proxy: {
      "**": "http://localhost",
    },
  },
  entry: {
    app: "./src/WeddingBundle/Resources/assets/app/scripts/main.js",
    vendor: "./src/WeddingBundle/Resources/assets/app/scripts/vendor.js"
  },
  output: {
    publicPath: 'http://localhost:3000/perfectwedding/web/bundles/build',
    path: path.join(__dirname, "web/bundles/build"),
    filename: "[name].min.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:{
          presets:['es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader?sourceMap!sass-loader?sourceMap"
      },
      // {
      //   test  : /\.scss$/i,
      //   use   : ExtractTextPlugin.extract({
      //     fallback  : "style-loader",
      //     use       : {
      //       loader: ["sass-loader", "css-loader"],
      //       options: {
      //         sourceMap: true
      //       }
      //     }
      //   }),
      // },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options:{
              query: {
                progressive: true,
                optimizationLevel: 7,
                interlaced: false,
                pngquant: {
                  quality: '65-90',
                  speed: 4
                }
              }
            }
          }
        ]
      }
    ]
  },
  plugins : [
    // new ExtractTextPlugin({
    //   filename: "[name].css",
    //   disable: false,
    //   allChunks: true
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    })
  ]
};