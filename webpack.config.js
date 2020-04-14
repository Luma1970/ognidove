const currentTask = process.env.npm_lifecycle_event // determina quale script utilizzare per npm quando viene avviato
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fse = require('fs-extra')

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-hexrgba'),
    require('autoprefixer')
]

class RunAfterCompile { // nome a piacere
    apply(compiler) {
        compiler.hooks.done.tap('Copia immagini', () => (
            fse.copySync('./app/assets/images', './docs/assets/images') // copia le immagini nella cartella di build
        ))
    }
}

let cssConfig = {
    test: /\.css$/i,
    use: ['css-loader?url=false', { 
        loader: 'postcss-loader', options: {
            plugins: postCSSPlugins
        }
    }]
}

let pages = fse.readdirSync('./app').filter(file => ( // la prima parte seleziona tutti i file nella directory
    file.endsWith('.html') // la seconda filtra dall'array quelli che finiscono per html
)).map(page => ( // crea un nuovo array con un nome e un path dinamico
    new HtmlWebpackPlugin({
        filename: page,
        template: `./app/${page}`
    })
))

let config = {
    entry: "./app/assets/scripts/App.js",
    plugins: pages,
    module: {
        rules: [
            cssConfig
        ]
    }
}

if (currentTask == 'dev') {
    cssConfig.use.unshift(/* per aggiungere un elemento all'inizio dell'array*/ 'style-loader')
    config.output = {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    }
    config.devServer = {
        before: function(app, server) {
            server._watch('./app/**/*.html')
        },
        contentBase: path.join(__dirname, 'app'),
        hot: true,
        port: 3000,
        host: '0.0.0.0'
    }
    config.mode = 'development'
}

if (currentTask == 'build') {
    config.module.rules.push({ // assegno a babel ilcompito di verificare che JS sia compatibile anche con i vecchi browser e che escluda dai test i mnode-modules
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    })
    cssConfig.use.unshift(MiniCssExtractPlugin.loader)
    postCSSPlugins.push(/* per aggiungere un elemento alla fine dell'array esistente*/ require('cssnano'))
    config.output = {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'docs')
    }
    config.mode = 'production'
    config.optimization = {
        splitChunks: {chunks: 'all'}
    }
    config.plugins.push(
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename: 'style.[chunkhash].css'}),
        new RunAfterCompile()
    )
}

module.exports = config