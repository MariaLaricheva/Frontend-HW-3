const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

const srcPath = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'dist');
const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => {
  return [
    isProd? miniCssExtractPlugin.loader : 'style-loader',
    !withModules? 'css-loader': {
    loader: 'css-loader',
    options: {
        modules:{
            localIdentName: !isProd? '[path][name]__[local]' : '[hash:base64]'
        }
    }

}, {
    loader: "postcss-loader",
    options: {
        postcssOptions: {
            plugins: ['autoprefixer']
        }
    }
}, 'sass-loader']
}

module.exports = {
    entry: path.join(srcPath, 'index.tsx'),
    target: !isProd ? 'web' : 'browserslist',
    devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
    output: {
        path: buildPath,
        filename: "bundle.js",
        publicPath: "/", // required for font loading on historyApiFallback
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html')
        }),
        !isProd && new ReactRefreshWebpackPlugin(),
        new miniCssExtractPlugin(
            {
                filename: '[name]-[hash].css'
            }
        ),
        new TsCheckerPlugin()
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.module\.s?css$/,
                use: getSettingsForStyles(true)
            },
            {
                test: /\.s?css$/,
                exclude: /\.module\.s?css$/,
                use: getSettingsForStyles()
            },
            {
                test: /\.[tj]sx?$/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|svg|jpg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition:{
                        maxSize: 10 * 1024
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            components: path.join(srcPath, 'App/components'),
            config:  path.join(srcPath, 'config'),
            context:  path.join(srcPath, 'context'),
            static: path.join(srcPath, 'static'),
            store: path.join(srcPath, 'store'),
            styles: path.join(srcPath, 'styles'),
            utils: path.join(srcPath, 'utils'),
            pages: path.join(srcPath, 'App/Pages'),
            models: path.join(srcPath, 'store/models'),
        }
    },
    devServer: {
        host: '127.0.0.1',
        port: 9000,
        hot: true,
        historyApiFallback: true,
    }
}