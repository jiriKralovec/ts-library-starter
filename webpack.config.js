const path = require('path');
const glob = require('glob');
const { debugPath, sourcePath } = require('./environment');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
    /** Example */
    {
        mode: 'development',
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.html$/i,
                    loader: "html-loader",
                    options: {
                        sources: false
                    }
                }
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                lib: path.resolve(process.cwd(), `${sourcePath}/library`)
            }
        },
        entry: {
            main: glob.sync(`${sourcePath}/example/**/*.{ts,tsx,js,html}`)
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Output management',
                template: `${sourcePath}/example/index.html`
            })
        ],
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, `${debugPath}/example`)
        },
        devServer: {
            liveReload: true,
            static: {
                directory: path.join(__dirname, `${debugPath}/example`),
                watch: true
            },
            watchFiles: [ `${debugPath}/**/*` ],
            client: {
                overlay: {
                    errors: true,
                    warnings: false
                },
                progress: true
            },
            compress: false,
            port: 9000
        }
    },
    /** Library */
    {
        mode: 'development',
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, `${debugPath}/library`),
        },
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                }
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                lib: path.resolve(process.cwd(), `${sourcePath}/library`)
            }
        },
        entry: {
            main: glob.sync(`${sourcePath}/library/**/*.{ts,tsx,js}`)
        }
    }
];