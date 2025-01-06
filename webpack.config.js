// webpack.config.js
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development', // or 'production' for a production build
  entry: './src/renderer/index.js', // your React entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        // Use Babel for JS/JSX
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', 
          // Babel options can go here or in a separate babel.config.js / .babelrc
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    // Copies all files/folders in 'public' into 'dist'
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: '.' },
      ],
    }),
  ],
  devServer: {
    // If you want a dev server for live reloading in your browser (optional)
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
  },
};
