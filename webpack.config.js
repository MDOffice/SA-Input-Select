const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//import ExtractTextPlugin from 'extract-text-webpack-plugin';

const common = {
    entry: './src/index.ts',

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    optimization: {
        minimizer: [
            /*new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                },
                extractComments: false
            }),*/
            //new OptimizeCSSAssetsPlugin({})
        ]
    },

    performance: {
        hints: false
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory=true'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        //  new BundleAnalyzerPlugin()
    ],

    devServer: {
        contentBase: [
            path.join(__dirname, 'examples'),
            path.join(__dirname, 'dist')
        ],
        compress: true
    }
};

module.exports = [
    merge(common, {
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.umd.js',
            library: 'SAInputSelect',
            libraryTarget: 'umd',
            umdNamedDefine: true
        }
    }),
    merge(common, {
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js',
            library: 'SAInputSelect',
        }
    })
];
