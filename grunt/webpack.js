var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    dev: {
        // webpack options
        entry: [
            "./public/js/index.js",
            "./public/scss/main.scss",
        ],
        output: {
            path: "dist/",
            filename: "bundle.js",
        },

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ["es2015", "react"],
                        cacheDirectory: true,
                    },
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract('css!sass')
                },
            ],
        },

        plugins: [
            new ExtractTextPlugin("styles.css", {
                allChunks: true
            }),
        ]
    },
};
