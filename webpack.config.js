const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const commonChunkList = [
  'vue',
  '@babel/polyfill',
  'vue-toasted',
  'vue-filter-date-format',
  'core-js'
];

module.exports = {
  entry: {
    user: [
      '@babel/polyfill',
      path.resolve(__dirname, 'resources', 'js', 'main.js')
    ],
    'admin-category': [
      '@babel/polyfill',
      path.resolve(__dirname, 'resources', 'js', 'admin', 'category', 'main.js')
    ],
    'admin-product': [
      '@babel/polyfill',
      path.resolve(__dirname, 'resources', 'js', 'admin', 'product', 'main.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public', 'js'),
    filename: '[name].bundle.js',
    publicPath: '/js/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [new VueLoaderPlugin(), new CleanWebpackPlugin()],
  optimization: {
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vendor: {
          test: new RegExp(
            `[\\/]node_modules[\\/](${commonChunkList.join('|')})[\\/]`
          ),
          chunks: 'initial',
          name: 'common',
          enforce: true
        }
      }
    }
  }
};
