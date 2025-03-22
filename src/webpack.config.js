var webpack = require('webpack');
var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const isProduction = process.argv.indexOf('-p') !== -1;

const postcss = require('postcss');
const presetEnv = require('postcss-preset-env');
const postcssImport = require("postcss-import");

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const BUILD_DIR = path.resolve(__dirname, '../assets');
const APP_DIR = path.resolve(__dirname, "");

const cssFilename = 'static/css/[name].[contenthash:8].css';

module.exports = {
    optimization: {},
    bail: true,

    devtool: 'source-map',

    entry: {
        index: APP_DIR + '/js/index.js',
    },
    mode: !isProduction ? 'development' : 'production',
    output: {
        path: BUILD_DIR,
        filename: "[name].js"
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new CopyWebpackPlugin([
            //copy images
            {
                context: APP_DIR + '/media/images/',
                from: '**/*.{jpg,png,gif}',
                to: BUILD_DIR + '/images'
            },
        ]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
    ],

    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                exclude: [
                    /\.html$/,
                    /\.(js)$/,
                    /\.css$/,
                    /\.json$/,
                    /\.bmp$/,
                    /\.gif$/,
                    /\.jpe?g$/,
                    /\.png$/,
                ],
                loader: 'file-loader',
                options: {
                    name: 'media/[name].[hash:8].[ext]',
                },
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            // publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            minimize: isProduction ? {discardComments: {removeAll: true}} : false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                postcssImport(),
                                presetEnv({preserve: false, autoprefixer: true}),
                                require('postcss-rtl')({prefixType: 'attribute'}),
                            ]
                        }
                    }

                ]
            },
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    },
};


if (isProduction) {
    module.exports.optimization.minimizer = [
        new UglifyJsPlugin({
            sourceMap: true,
            extractComments: 'all'
        }),
        new OptimizeCSSAssetsPlugin({})
    ]
}
