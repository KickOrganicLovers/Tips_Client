const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },

    module: {
        rules: [{
            test: /\.(js|ts|tsx)?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        open: true,
        historyApiFallback: true
    }
}