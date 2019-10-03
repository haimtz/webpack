const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

function resolve(dir) {
    return path.join(__dirname, 'View', dir);
}

module.exports = {
    
    mode: 'development',
    devtool: 'source-map',
    entry: ['babel-polyfill', './View/js/app.js'],
    context: path.resolve(__dirname),
    output: {
        devtoolLineToLine: false,
        filename: 'app/app.js',
        chunkFilename: 'app/[name].app.js',
        path: path.resolve(__dirname, './public'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue$: 'vue/dist/vue.runtime.min.js',
            '@': resolve('js')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
                include: [resolve('js')]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        plugins: ['@babel/plugin-syntax-dynamic-import']
                    }
                }
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new Dotenv(),
        new CopyPlugin([
            {
                context: 'View',
                from: 'assets/**/*.*'
            }
        ])
    ]
};
