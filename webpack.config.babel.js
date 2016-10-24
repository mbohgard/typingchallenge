import autoprefixer from 'autoprefixer';

import path from 'path';
import webpack from 'webpack';
import { argv } from 'yargs';

const production = argv.p ? true : false;

let plugins = [
    new webpack.HotModuleReplacementPlugin()
];

if (production) {
    plugins = plugins.concat([
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ])
}

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
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
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules', 'src']
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.(scss|css)$/,
                loader: 'style-loader!css-loader?sourceMap?root=.!postcss-loader!sass-loader?sourceMap&outputStyle=expanded'
            },
            {
                test: /\.svg$/,
                loaders: ['raw']
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.(jpg|woff|woff2)/,
                loader: "file-loader"
            }
        ]
    },
    postcss: function () {
        return [ autoprefixer({ browsers: ['last 2 versions'] }) ]
    }
}
