const path              = require('path');
const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const debug             = process.env.NODE_ENV !== 'production';

console.log(debug);

function getPlugins() {
  var plugins = [];
  
  // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
  // inside your code for any environment checks; UglifyJS will automatically
  // drop any unreachable code.
  plugins.push( new webpack.EnvironmentPlugin(['NODE_ENV']) );
  
  // Conditionally add plugins for Production builds.
  if (!debug) {
    
    plugins.push(new webpack.optimize.UglifyJsPlugin());
    
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name     : 'commons',
      filename : 'commons.js',
      minChunks: 2
    }));
    
    plugins.push(new ExtractTextPlugin({
      filename : '[name].bundle.css',
      allChunks: true
    }));
    
  }
  
  // Conditionally add plugins for Development
  else {
    
    
  }
  
  return plugins;
}


function getRules() {
  
  var rules = [];
  
  rules.push({
    test   : /\.js$/,
    exclude: [/node_modules/],
    use    : [{
      loader: 'babel-loader',
      use   : {presets: ['es2015']}
    }],
  });
  
  if (!debug) {
    
    rules.push({
        test: /\.scss$/,
        use : ExtractTextPlugin.extract({
            fallback  : 'style-loader',
            use    : [
              'css-loader',
              'sass-loader'
            ],
            publicPath: __dirname + './web/bundles/build'
          }
        )
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use : [
          'file-loader',
          {
            use  : 'image-webpack-loader',
            query: {
              progressive      : true,
              optimizationLevel: 7,
              interlaced       : false,
              pngquant         : {
                quality: '65-90',
                speed  : 4
              }
            }
          }
        ]
      }
    );
  }
  
  else {
    rules.push({
        test      : /\.scss$/,
        use       : [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
        publicPath: __dirname + './web/bundles/build'
      }
    );
  }
}


module.exports = {
  context  : path.resolve(__dirname, './src/WeddingBundle/Resources/assets/app/scripts'),
  entry    : {
    app   : './main.js',
    vendor: './vendor.js'
  },
  output   : {
    filename  : '[name].bundle.min.js',
    path      : path.resolve(__dirname, './web/bundles/build'),
    publicPath: '/build'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './web/bundles/build'),
    proxy      : {
      "**": "http://localhost:4242"
    },
    hot        : true,
    port       : 8080,
    inline     : true,
    progress   : true
  },
  module   : {
    rules: getRules()
  },
  resolve  : {
    modules: [path.resolve(__dirname, './src/WeddingBundle/Resources/assets/app/'), 'node_modules']
  },
  plugins  : getPlugins()
};