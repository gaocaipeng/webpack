const HtmlWebpackPlugin = require("html-webpack-plugin")
    // const ExtractText = require('extract-text-webpack-plugin')
const webpack = require("webpack")
const path = require('path');
module.exports = {
    // mode: "development",
    entry: {
        index: "./src/js/index.js",
        // main:{  多页面开发的时候用对象的形式，进行打包，当对象内的文件之间没有任何依赖关系时候可以使用这种语法
        //     index1:"./src/js/index.js",
        //     index2:"./src/js/index.js",
        //     index3:"./src/js/index.js"
        // },
        // main:["./src/js/index.js","./src/js/index1.js","./src/js/index2.js"]  这种语法会把所有路径的js打包到一个js文件里面
    },
    output: {
        filename: './js/[name].js',
        //filename: '[name].[hash].js',为了防止缓存，可以使用hash的方法
        path: __dirname + '/dist'
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader' //这样写需要配置.babelrc文件
            },
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['@babel/preset-env']
            //         }
            //     }
            // }
            {
                test: /\.html$/,
                loader: "html-loader"
            }, {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }, {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'] //sass-loader中自动依赖了一个node-sass包，所以也需要下载node-sass
                    //sass-loader把sass的语法编译成css语法,
                    //css-loader把css转成commonJs
                    //style-loader转成script标签插入页面
                    //extract-text-webpack-plugin@next插件配合使用，这样可以抽离css，需要下载
                    // use:ExtractText.extract({
                    //     fallback:'style-loader',
                    //     use:['css-loader','sass-loader']
                    // })
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        //1000就是1kb，小于这个大小时，会转成base64格式加载，否则以图片方式加载
                        name: 'img/[name].[ext]',
                        publicPath: '/'
                    }
                }
            }
        ]
    },
    devServer: {
        host: "localhost",
        port: "8888",
        open: true,
        hot: true,
        quiet: true,
        contentBase: "./", //本地服务器所加载的页面所在的目录
        inline: true, //实时刷新
        compress: true, //Enable gzip compression for everything served
        overlay: true, //Shows a full-screen overlay in the browser
        stats: "errors-only", //To show only errors in your bundle
        // before(app) {
        // app.get('/api/list', (req, res, next) => {
        //     res.json({ code: 1, data: 'ok' })
        // })
        // },
        // proxy: { //代理
        //     '/classify': 'http://localhost:3000'
        // }
    },
    plugins: [
        //插件分为两种，内置插件和外部插件
        new webpack.HotModuleReplacementPlugin(),
        // new ExtractText({
        //     filename: "css/[name].css"
        // }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index'],
            minify: {
                removeComments: true, //去除注释
                collapseWhitespace: true, //去除空格
                removeAttributeQuotes: true, //移除属性的引号
                removeEmptyAttributes: true, //去除空属性
            }
        })
    ],
    // resolve: {
    //     // alias: {
    //     //     'poem$': path.resolve(__dirname, './src/js/poem.js')
    //     // },
    //     extensions: ['.js', '.scss']
    // },
    // devtool: 'cheap-module-eval-source-map'
}