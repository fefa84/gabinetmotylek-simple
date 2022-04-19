const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin}  = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { webpack } = require('webpack');
// const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
    entry: "./src/app.js",
    output: {
        filename: "bundle.[contenthash].js",
        path: path.resolve(__dirname, "./dist/build"),
        assetModuleFilename: 'img/[hash][ext][query]',
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
            // {
            //     test:/\.(s*)css$/,
            //     use: ExtractTextPlugin.extract({ 
            //         fallback: 'style-loader',
            //         use: ['css-loader','sass-loader']
            //     })
            // },
            // {
            //     test: /\.(png|jp(e*)g|svg)$/,  
            //     use: [{
            //         loader: 'url-loader',
            //         options: { 
            //             limit: 8000, // Convert images < 8kb to base64 strings
            //             name: 'images/[hash]-[name].[ext]'
            //         } 
            //     }]
            // }
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    // This is required for asset imports in CSS, such as url()
                    // options: { publicPath: "" },
                    // options: { publicPath: "" },
                  },
                  "css-loader",
            
                  "sass-loader",
                ],
              },
              // {
              //   test: /\.(png|jpe?g|gif|svg)$/i,
              //   /**
              //    * The `type` setting replaces the need for "url-loader"
              //    * and "file-loader" in Webpack 5.
              //    *
              //    * setting `type` to "asset" will automatically pick between
              //    * outputing images to a file, or inlining them in the bundle as base64
              //    * with a default max inline size of 8kb
              //    */
              //   type: "asset",
              //   parser:{
              //     dataUrlCondition:{
              //       maxSize: 30 * 1024,
              //     }
    
              //   },
              // },
                /**
                 * If you want to inline larger images, you can set
                 * a custom `maxSize` for inline like so:
                 */
                // parser: {
                //   dataUrlCondition: {
                //     maxSize: 30 * 1024,
                //   },
                // },
              // },

            {
                test: /\.(jpe?g|png|gif|svg)$/,
                type: 'asset/resource'
            
             }
            // {
            //     test: /\.svg$/i,
            //     use: [
            //       {
            //         loader: 'url-loader',
            //         options: {
            //           generator: (content) => svgToMiniDataURI(content.toString()),
            //         },
            //       },
            //     ],
            //   },
            
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        
          },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            
        }),
        new HtmlWebpackPlugin({
            template: 'src/contact.html',
            filename: 'contact.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/img", to: "img/" },
            ],
        }),

    ],
    externals: {
        query: 'jQuery',
        
    }
}