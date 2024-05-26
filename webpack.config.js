const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  context: path.resolve(__dirname, "src"),
  entry: ["@babel/polyfill", "./index.js"],
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "[name][ext]",
  },

  devServer: {
    port: 9000,
    liveReload: false,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./main.html",
    }),
    new CleanWebpackPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.(html|htm)$/,
        use: ["html-loader"],
      },
      {
        test: /\.(m?js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
};
