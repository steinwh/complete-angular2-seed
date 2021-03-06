const path = require("path");
const _ = require("lodash");

const webpack = require("webpack");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OpenBrowserWebpackPlugin = require("open-browser-webpack-plugin");

const CONFIG_DEFAULT = {
    context: path.join(__dirname, "./src"),
    entry: {
        main: "./main.ts"
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: "ts",
                exclude: /node_modules|typings/,
                query: {
                    compilerOptions: {
                        //"target": "es6",
                        //"module": "es2015"
                    }
                }
            }, {
                test: /\.json/,
                loader: "json"
            }, {
                test: /\.css/,
                loaders: [
                    "style",
                    { loader: "css", query: { modules: false } }
                ]
            }
        ]
    },
    resolve: {
        extensions: ["", ".ts", ".js"],
        modules: [
            path.resolve("./src"),
            "node_modules"
        ]
    }
};

const CONFIG_TARGET = {
    DEV: {
        debug: true,
        devtool: "source-map",
        output: {
            path: path.join(__dirname, "./dev"),
            filename: "[name].js"
        },
        module: {
          loaders: [
          ]
        },
        plugins: [
            new OpenBrowserWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: "./index.html"
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: false,
                debug: true
            })
        ]
    },
    PROD: {
        output: {
            path: path.join(__dirname, "./prod"),
            filename: "[name].[chunkhash].js",
            publicPath: "complete-angular2-seed/"
        },
        plugins: [
            new CleanWebpackPlugin(["prod"]),
            new HtmlWebpackPlugin({
                template: "./index.html"
            })
            //,
            //new webpack.LoaderOptionsPlugin({
            //    minimize: true,
            //    debug: false
            //}),
            //new webpack.optimize.DedupePlugin(),
            //new webpack.optimize.UglifyJsPlugin()
        ]
    }
};

module.exports = function(env) {
    return _.merge(CONFIG_DEFAULT, CONFIG_TARGET[env.TARGET || "DEV"])
};