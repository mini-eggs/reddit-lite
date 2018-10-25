var path = require("path");
var webpack = require("webpack")
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// var BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: "./src/main.js",
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "main.js"
  },
  resolve: {
    alias: {
      wigly: path.resolve(__dirname, "node_modules/wigly/dist/es6.js"),
      "wigly-class": path.resolve(__dirname, "node_modules/wigly-class/dist/es6.js"),
      "wigly-ctx": path.resolve(__dirname, "node_modules/wigly-ctx/dist/es6.js"),
      "wigly-customizer": path.resolve(__dirname, "node_modules/wigly-customizer/dist/es6.js"),
      "wigly-jsx": path.resolve(__dirname, "node_modules/wigly-jsx/dist/es6.js")
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          "css-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            // presets: [
            //   [
            //     "@babel/preset-env",
            //     {
            //       useBuiltIns: false,
            //       targets: { chrome: "60" }
            //     }
            //   ]
            // ],
            plugins: [
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-proposal-object-rest-spread",
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }],
              ["@babel/plugin-transform-react-jsx", { pragma: "h" }]
            ]
          }
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: "./dist",
    compress: true,
    port: 8080,
    proxy: { "*": "http://localhost:5050" }
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new OptimizeCSSAssetsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        REDDIT_CLIENT_ID: `'${process.env.REDDIT_CLIENT_ID}'` ,
        REDDIT_REDIRECT_URI: `'${process.env.REDDIT_REDIRECT_URI}'` 
      }
    })
    // new BundleAnalyzerPlugin()
  ]
};
