const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        hot: true,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            // css
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            // babel config images
            {
                test: /\.(png|jp(e)g|svg|gif)$/,
                use: ['file-loader'],
            },
            // babel config for svg as react component
            {
                test: /\.svg$/,
                use: ['@svgr/webpack']
            },
            // js
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
        }),
    ],
}