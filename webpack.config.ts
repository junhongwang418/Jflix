import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

const config: webpack.Configuration = {
  entry: './frontend/src/index.tsx',
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        use: ['ts-loader'],
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'frontend/public/index.html'
    })
  ]
};

export default config;
