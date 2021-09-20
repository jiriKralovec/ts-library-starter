const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const RemovePlugin = require("remove-files-webpack-plugin");
const { buildPath, sourcePath } = require('./environment');

module.exports = [
    {
        target: "web",
        mode: 'production',
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, buildPath, 'lib'),
            clean: true,
            library: "nucleus",
            libraryTarget: "umd",
            globalObject: "this",
            umdNamedDefine: true
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [{
                        loader: "ts-loader",
                        options: {
                            configFile: "tsconfig.prod.json"
                        }
                    }],
                    exclude: /node_modules/,

                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        plugins: [
            new RemovePlugin({
                before: {
                    include: [
                        buildPath
                    ]
                }
            }),
            new CopyPlugin({
                patterns: [
                    { from: 'package.json', to: path.resolve(__dirname, buildPath, 'package.json') }
                ]
            })
        ],
        entry: {
            main: path.resolve(__dirname, `${sourcePath}/nucleus`, "main.ts")
        }
    }
];