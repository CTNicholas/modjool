const path = require('path')

module.exports = {
  entry: {
    main: './src/index.js'
    // CustomElementExample: './src/components/example.js'
  },
  output: {
    filename: 'Modjool.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'Modjool',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
