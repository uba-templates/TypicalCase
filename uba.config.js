const path = require('path');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const svrConfig = {
  historyApiFallback: false
};
//远程代理访问，可以配置多个代理服务
//pathRewrite规则参考https://www.npmjs.com/package/http-proxy-middleware
const proxyConfig = [
  {
    enable: true,
    headers: {
      "Referer": "http://10.10.24.43:8080/wbalone/index-view.html"
    },
    router: ['/iuap-saas-filesystem-service/','/newref/' ,'/wbalone/', '/example/', '/iuap-saas-message-center/', '/iuap-example/','/eiap-plus/', '/uitemplate_web/','/iuap-saas-billcode-service/'],
    url: 'http://10.10.24.43:8080'
  }
];
//提取package里的包
function getVendors() {
  let pkg = require("./package.json");
  let _vendors = [];
  for (const key in pkg.dependencies) {
    _vendors.push(key);
  }
  return _vendors;
}
//优化配置，对于使用CDN作为包资源的引用从外到内的配置
const externals = {
  // 'axios': 'axios',
  // 'react': 'React',
  // 'react-dom': 'ReactDOM',
  //'tinper-bee': 'TinperBee'
}
//默认加载扩展名、相对JS路径模块的配置
const resolve = {
  extensions: [
    '.jsx', '.js', '.less', '.css', '.json'
  ],
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    modules: path.resolve(__dirname, 'src/modules/'),
    routes: path.resolve(__dirname, 'src/routes/'),
    layout: path.resolve(__dirname, 'src/layout/'),
    utils: path.resolve(__dirname, 'src/utils/'),
    static: path.resolve(__dirname, 'src/static/')
  }
}
//开发和生产需要的loader
const rules = [{
  test: /\.js[x]?$/,
  exclude: /(node_modules)/,
  include: path.resolve('src'),
  use: [{
    loader: 'babel-loader'
  }]
}, {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    use: [{
      loader: 'css-loader',
      options: {
        modules: false
      }
    }, 'postcss-loader'],
    fallback: 'style-loader'
  })
}, {
  test: /\.less$/,
  use: ExtractTextPlugin.extract({
    use: [{
      loader: 'css-loader',
      options: {
        modules: false
      }
    }, 'postcss-loader', 'less-loader'],
    fallback: 'style-loader'
  })
}, {
  test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
  //exclude: /favicon\.png$/,
  use: [{
    loader: 'url-loader',
    options: {
      limit: 8196,
      name: 'images/[name].[hash:8].[ext]'
    }
  }]
}, {
  test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: 'fonts/[name].[hash:8].[ext]'
    }
  }]
}]
//开发环境的webpack配置
const devConfig = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    vendors: getVendors(),
    app: ['./src/app.jsx', hotMiddlewareScript]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[hash:8].bundle.js',
    publicPath: '/'
  },
  externals: externals,
  module: {
    rules: rules
  },
  plugins: [
    new CommonsChunkPlugin({
      name: "vendors"
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash:8].css'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: 'body',
      hash: false,
      favicon: './src/static/images/favicon.png'
    })
    
  ],
  resolve: resolve
}


//生产环境的webpack配置
const prodConfig = {
  devtool: 'source-map',
  entry: {
    vendors: getVendors(),
    app: './src/app.jsx'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    chunkFilename: 'js/[name].[hash:8].bundle.js',
    filename: 'js/[name].[hash:8].js'
  },
  externals: externals,
  module: {
    rules: rules
  },
  plugins: [
    new CommonsChunkPlugin({
      name: "vendors"
    }),
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: 'body',
      hash: true,
      favicon: './src/static/images/favicon.png',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    })
  ],
  resolve: resolve
}





//最终向uba导出配置文件
module.exports = {
  devConfig,
  prodConfig,
  svrConfig,
  proxyConfig
};