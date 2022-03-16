const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin}  = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/app.js",
    output: {
        filename: "bundle.[contenthash].js",
        path: path.resolve(__dirname, "./dist/build")
    },
    devServer: {
        port: 9000,
        static: {
            directory:path.resolve(__dirname, "./dist/build"), 
        },
        devMiddleware: {
            index: 'index.html',
            writeToDisk: true
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, "css-loader", "sass-loader"
                ]
            },
            {
                test: /\.(png|jpg)$/,
                type: "asset/resource",
                
            },
            

        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss']
          },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.[contenthash].css",
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/img", to: "img/" },
            ],
        }),
    ]
}