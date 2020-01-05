import HtmlWebpackPlugin from "html-webpack-plugin";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import webpack from "webpack";

const config: webpack.Configuration = {
  entry: './frontend/src/index.tsx',
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', 'jsx', '.ts', '.tsx']
  },
  mode: 'development',
  module: {
    rules: [
      // tell webpack how to bundle typescript and ES6 files
      {
        use: 'babel-loader',
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/
      },
      // tell webpack how to bundle css files
      {
        test:/\.css$/,
        use:['style-loader','css-loader'],
        exclude: /node_modules/
      },
      // tell webpack how to bundle media files
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: 'file-loader',
      }
    ]
  },
  plugins: [
    new FaviconsWebpackPlugin("./frontend/public/favicon.ico"),
    new HtmlWebpackPlugin({
      template: 'frontend/public/index.html'
    })

  ]
};

export default config;
