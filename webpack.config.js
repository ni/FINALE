const path = require('path');

module.exports = {
    mode: 'development',
    entry:
    {
        finale: './src/script/finale.ts',
        main: './src/script/main.ts',
        aimaratree: './src/script/treeView/lib/wrapper.ts',
        search: './src/script/search.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build', 'script')
    }
};
