/**
 * Created by BaiBai on 2017/2/6.
 */
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./config/paths');

module.exports = {
  entry: {
    index: ['babel-polyfill', './pages/index/index.js']
  },
  output: {
    path: paths.distDir,
    filename: 'js/[name].[hash:4].js',
    chunkFilename: '[id].[name].[chunkhash:4].js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'config' : path.join(__dirname, './config')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader?minimize=true!postcss-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax',
            'less': 'vue-style-loader!css-loader?minimize=true!postcss-loader!less-loader'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: 'css-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|eot|ttf)(\?.*)?$/,
        use: 'url-loader?limit=10000&name=images/[name].[ext]'
      }
    ]
  },
  plugins: [
    // 设置环境变量  NODE_ENV
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"dev"'
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new HtmlWebpackPlugin({
      template: './pages/index.html',
      filename: 'index.html',
      chunks: ['vendor', 'index'],
      inject: true,
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, './node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ]
}
