'use strict';

const Webpack           = require('webpack');
const config            = require('./webpack.config-3.js');
const path              = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractSASS       = new ExtractTextPlugin('main.css');
const debug             = options.isProduction !== 'production';

module.exports = (options) => {
  
  let webpackConfig = {
    context: path.resolve(__dirname, './web/bundles/build'),
    devtool: options.devtool,
    entry  : [
      `webpack-dev-server/client?http://localhost:${options.port}`,
      'webpack/hot/dev-server',
      config.scripts.SRC
    ],
    output : {
      path    : config.scripts.DEST,
      filename: 'app.min.js'
    },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(debug)
        }
      })
    ],
    module : {
      loaders: [{
        test   : /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader : 'babel',
        query  : {
          presets: ['es2015']
        }
      }]
    }
  };
  
  if (debug) {
    webpackConfig.entry = [config.scripts.SRC];
    
    webpackConfig.plugins.push(
      new Webpack.optimize.OccurenceOrderPlugin(),
      new Webpack.optimize.UglifyJsPlugin({
        comments  : false,
        compressor: {
          warnings: false
        }
      }),
      ExtractSASS
    );
    
    webpackConfig.module.loaders.push({
      test  : /\.scss$/i,
      loader: ExtractSASS.extract(['css', 'sass'])
    });
    
  } else {
    webpackConfig.entry = [config.scripts.SRC];
    
    webpackConfig.plugins.push(
      new Webpack.HotModuleReplacementPlugin()
    );
    
    webpackConfig.module.loaders.push({
      test   : /\.scss$/i,
      loaders: ['style', 'css', 'sass']
    }, {
      test   : /\.js$/,
      loader : 'eslint',
      exclude: /node_modules/
    });
    
    webpackConfig.devServer = {
      proxy         : {
        "**": "http://localhost:4242",
      },
      // entry         : {
      //   app: config.scripts.SRC
      // },
      // output        : {
      //   path    : config.base,
      //   filename: "app.min.js"
      // },
      clientLogLevel: "warning",
      // publicPath: config.base,
      // contentBase: path.join(__dirname, "dist"),
      contentBase   : false,
      compress      : false,
      hot           : true,
      port          : options.port,
      inline        : true,
      progress      : true
    };
  }
  
  return webpackConfig;
  
};