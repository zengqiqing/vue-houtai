// 模块处理，端口处理
const path = require('path');
const htmlWP = require('html-webpack-plugin');

// 模板入口
module.exports = {
    // 配置打包入口文件
    entry: path.resolve(__dirname, './src/main.js'),

    // 输出配置
    output: {
        path: path.resolve(__dirname, './dist'), //输出配置：输出到一个dist文件上
        filename: 'bundle.js'
    },
    // 插件配置
    plugins: [
        // html处理
        new htmlWP({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        })
    ],
    // 模块设置
    module: {
        // 路由规则配置
        rules: [
            // 添加css模块处理
            {
                test: /\.css$/, //文件的类型
                use: ['style-loader', 'css-loader'],
            },
            //添加less模块处理
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            // 添加处理html和tpl的处理
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            // 添加静态资源模块处理
            {
                test: /\.(gif|png|jpg|jpeg|svg|woff|ttf)$/,
                use: [{
                    loader: 'url-loader',
                    // 小于10kb的文件转换为base64打包, 大的文件不打包, 可以通过name属性设起新的名字
                    options: { limit: 10240, name: '[name]_[hash:8].[ext]' }
                }, ],
            },
            // 添加js模块处理
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            // vue模块
            {
                test: /\.vue$/,
                use: ['vue-loader'],
            },

        ],
    },
    // dev-sever
    devServer: {
        open: true,
        port: 8845,
        contentBase: 'dist',
    }

};