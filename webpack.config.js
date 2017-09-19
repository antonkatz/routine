const ExtractPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    contentscript: "./src/content-script.js",
    index: "./src/index.js",
    background: "./src/background.js"
  },
  output: {
    path: __dirname + "/extension",
    filename: '[name].js',
  },
  module : {
    loaders :[
      {
        test: [/\.js$/, /\.es6$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
        // loader: ExtractPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(png|jpg|svg)$/,
        loaders: ['url', 'image-webpack']
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new ExtractPlugin("styles.css"),
  ],
  resolve: {
    extensions: ['.js', '.es6']
  },
}
