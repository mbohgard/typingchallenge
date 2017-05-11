import autoprefixer from 'autoprefixer';

import path from 'path';
import webpack from 'webpack';
import { argv } from 'yargs';

const production = argv.p ? true : false;
const development = !production

let plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(production ? 'production' : 'development')
        }
    })
]

if (development) {
    plugins = plugins.concat([
        new webpack.HotModuleReplacementPlugin()
    ])
}

module.exports = {
    devtool: 'source-map',
    entry: production ? './src/index' : [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins,
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.svg$/,
                loader: 'raw-loader'
            },
            {
                test: /\.(png|jpg|woff|woff2)$/,
                loader: 'url-loader?limit=10000'
            }
        ]
    }
}
