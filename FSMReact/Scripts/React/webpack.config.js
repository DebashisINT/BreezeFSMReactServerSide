//module.exports = {
//    mode: 'development',
//    context: __dirname,
//    entry: "./src/Index.js",
//    output: {
//        path: __dirname + "/dist",
//        filename: "bundle.js",
//    },
//    watch: true,
//    module: {
//        rules: [
//            {
//            test: /\.js$/,
//            exclude: /(node_modules)/,
//            use: {
//                loader: 'babel-loader',
//                options: {
//                    presets: ['@babel/preset-env', '@babel/preset-react']
//                }
//            }
//            },
//            {
//                test: /\.css$/,
//                use: ['style-loader', 'css-loader'],
//            },
//        ]
//    }
//} 





const path = require('path');

module.exports = {

    mode: 'development',

    devtool: 'inline-source-map',

    entry: ['babel-polyfill', './src/Index.js'],

    output: {

        filename: 'bundle.js',

        path: path.join(__dirname, '/dist')

    },

    module: {

        rules: [
            {

            test: /\.js$/,

            exclude: /node_modules/,

            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            //{
            //    test: /\.(png|jpe?g|gif)$/i,
            //    use: [
            //        {
            //            loader: 'file-loader',
            //            options: {
            //                outputPath: 'Assets/images',
            //                name: '[name].[ext]',
            //            },
            //        },
            //    ],
            //},
        ]

    }

};