//var glob = require("glob"); //多页面时用到
var path = require("path");
var webpack = require("webpack");
var merge = require('webpack-merge');
var chalk = require('chalk'); //添加颜色
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');//css独立打包
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;//抽出公共JS
var CopyWebpackPlugin = require('copy-webpack-plugin'); //复制文件
var OpenBrowserPlugin = require('open-browser-webpack-plugin'); //自动打开浏览器
var px2rem       = require('postcss-px2rem'); //px转rem
var precss       = require('precss');
var autoprefixer = require('autoprefixer');  //自动加前缀如 -web-,-o-
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');//css压缩

var statics = 'static/';
var baseConfig = {
    entry: {
        app: './src/main.js',
        'vendor': ['vue','vuex','vue-router','axios','jquery','babel-polyfill','element-ui']
    },
    output: { //配置打包结果， path 定义了输出的文件夹，filename则定义了打包结果文件的名称
        path: path.join(__dirname,"./dist"), // 输出文件的保存路径
        filename: statics + 'js/[name].[hash:8].js', //只要再加上hash这个参数就可以了
        publicPath : "/",
        chunkFilename: statics + "js/chunk/[name].[chunkHash:8].js"
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],//自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        alias: {
            'vue': 'vue/dist/vue.js',    //不加会报runtime-only错误
            '@': path.join(__dirname,'./src') //掉用模板时间用到
        }
    },
    module: {
        rules: [
            {test: /\.vue$/,loader: 'vue-loader'},
            {test: /\.js$/,loader: 'babel-loader?presets=es2015',exclude: /node_modules/},
            {test: /\.scss|\.css$/,use: ExtractTextPlugin.extract({fallback: 'style-loader?minimize',use: ['css-loader?minimize','sass-loader?minimize','postcss-loader?minimize']})},
            {test: /\.jpe?g$|\.gif$|\.png$/, loader: 'url-loader?limit=8192&name=' +statics+ 'image/[hash:8].[name].[ext]'},
            {test: /\.svg$|\.woff$|\.ttf$|\.eot$/, loader: 'url-loader?limit=8192&name=' +statics+ 'font/[hash:8].[name].[ext]'},
            {test: /\.json$/,loader: 'json-loader'}// JSON
        ]
    },
    plugins: [
        //生成html文件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',//启动页面
            inject: true//要把script插入到标签里
        }),
        //css
        new ExtractTextPlugin(statics + 'css/[name].css?[contenthash]'),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        //多个 html共用一个js文件(chunk)
        new CommonsChunkPlugin({
            name: ['vendor','common'],
            minChunks: Infinity
        }),
    ]
}

var buildConfig = {
    env :  'prod' ,   //dev、sat、uat、fat、prod，默认prod  //运行环境标识
    //res :  '0'        //(0,1)默认1打包  是否打包resouse.js文件
};
const argv = require('yargs').argv;
console.info(chalk.cyan("=======参数 : [ "+argv._+" ] \n"));
//带参数(npm run prod fat 1)
if( argv._.length > 0 || process.env.NODE_ENV){
    buildConfig.env = argv._[0] || process.env.NODE_ENV || buildConfig.env;
    //buildConfig.res = String(argv._[1]) || buildConfig.res;
    console.info(chalk.cyan("运行环境    （'sat','uat','fat','prod'）:"+buildConfig.env +"\n"));
    //console.info(chalk.cyan("是否打包resouse.js文件（(0,1)默认1打包）:"+buildConfig.res +"\n"));
    var fs = require('fs');
    var filename = './src/buildConfig.json';
    fs.writeFileSync(filename, JSON.stringify(buildConfig));
}else{
    buildConfig.env = 'dev';
    //buildConfig.res = '0';
}
var webpackConfig = null;
if(buildConfig.env === 'dev'){//开发环境
    console.info(chalk.green("=======开发环境======"+"\n"));
    const port = '3332'; //默认启动端口号
    webpackConfig = merge(baseConfig, {
        devtool : '#cheap-module-eval-source-map',
        devServer: {
            hot: true,
            inline: true,//实时刷新
            //colors: true,  //终端中输出结果为彩色
            host: "0.0.0.0",
            port: port,
            contentBase: './public',
            historyApiFallback: true,
            disableHostCheck: true,//新版的webpack-dev-server出于安全考虑，默认检查hostname，如果hostname不是配置内的，将中断访问。
            proxy: {//本地代理
                '/sgp-web/*': {
                    target: 'http://192.168.33.161:80/',
                    secure: false
                }
            }
        },
        plugins : [
            new webpack.HotModuleReplacementPlugin(),  //代码热替换
            new OpenBrowserPlugin({    //自动打开浏览器
                url: 'http://localhost:' + port
            })
        ]
    })
    module.exports = webpackConfig;//package.json script start : webpack-dev-server自动启动webpack
}else{//线上环境
    console.info(chalk.red("=======线上环境======\n"));
    webpackConfig = merge(baseConfig, {
        devtool : '#source-map',
        plugins : [
            new webpack.optimize.UglifyJsPlugin({// 压缩代码
                mangle: true,//是否要混淆
                compress: {
                    warnings: false,
                    drop_debugger: true,
                    drop_console: true
                },
                sourceMap: false
            })
        ]
    });
    // if( buildConfig.res == 1){
    //     console.info(chalk.red("=======是否加载resouse.js======" + buildConfig.res+"\n"));
    //     webpackConfig.plugins.push(new CopyWebpackPlugin([
    //         { from: './src/resouse.js'   , to: 'resouse.js'},
    //     ]));
    // }
    //手动启动webpack
    var ora = require('ora')
    var spinner = ora('=====开始编译中...');
    spinner.start();
    webpack(webpackConfig, function (err, stats) {
        spinner.stop();
        if (err) throw err
        process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n')
        console.log(chalk.cyan('=======编译完成.\n'))
    })
}
