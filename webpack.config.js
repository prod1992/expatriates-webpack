/**
 * Assets Config file
 */
const serverConfiguration = {
  internal: {
    server: {
      baseDir: "dist"
    },
    port: 3000
  },
  external: {
    proxy: "http://localhost:9000/path/to/project/"
  }
};
const path = require("path");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageMinPlugin = require("imagemin-webpack-plugin").default;
const webpack = require("webpack");

let targetServerConfiguration = serverConfiguration.internal;

const config = function(env, args) {
  if (args.externalServer !== undefined && args.externalServer) {
    targetServerConfiguration = serverConfiguration.external;
  }

  return {
    target: "web",
    entry: {
      app: "./src/js/app.js",
      homepage: "./src/homepage.js"
    },
    output: {
      filename: "js/[name].js",
      path: path.resolve(__dirname, "dist")
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            "style-loader",
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader"
        },
        {
          test: /\.(png|gif|jpg|jpeg)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                name: "images/[name].[hash:6].[ext]",
                publicPath: "../",
                limit: 8192
              }
            }
          ]
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                name: "fonts/[name].[hash:6].[ext]",
                publicPath: "../",
                limit: 8192
              }
            }
          ]
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: "all"
      },
      minimizer: [
        new TerserPlugin({
          parallel: true
        }),
        new OptimizeCssAssetsPlugin({})
      ]
    },
    watchOptions: {
      poll: 1000,
      ignored: /node_modules/
    },
    plugins: [
      new BrowserSyncPlugin({
        ...targetServerConfiguration,
        files: ["src/*"],
        ghostMode: {
          clicks: false,
          location: false,
          forms: false,
          scroll: false
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: "debug",
        logPrefix: "wepback",
        notify: true,
        reloadDelay: 0
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jquery: "jquery",
        "window.jQuery": "jquery",
        jQuery: "jquery"
      }),

      new HtmlWebpackPlugin({
        inject: true,
        hash: false,
        filename: "header.html",
        template: path.resolve(__dirname, "src", "partials", "header.html"),
        favicon: path.resolve(__dirname, "src", "images", "favicon.ico")
      }),
      new HtmlWebpackPlugin({
        inject: true,
        hash: false,
        filename: "footer.html",
        template: path.resolve(__dirname, "src", "partials", "footer.html"),
        favicon: path.resolve(__dirname, "src", "images", "favicon.ico")
      }),
      new HtmlWebpackPlugin({
        inject: true,
        hash: false,
        filename: "index.html",
        template: path.resolve(__dirname, "src", "index.html"),
        favicon: path.resolve(__dirname, "src", "images", "favicon.ico")
      }),
      new HtmlWebpackPlugin({
        chunks: ["homepage"],
        inject: true,
        hash: false,
        filename: "home-page.html",
        template: path.resolve(__dirname, "src", "pages", "home-page.html"),
        favicon: path.resolve(__dirname, "src", "images", "favicon.ico")
      }),
      new HtmlWebpackPlugin({
        excludeChunks: ["homepage"],
        inject: true,
        hash: false,
        filename: "profile-page.html",
        template: path.resolve(__dirname, "src", "pages", "profile-page.html"),
        favicon: path.resolve(__dirname, "src", "images", "favicon.ico")
      }),
      new HtmlWebpackPlugin({
        excludeChunks: ["homepage"],
        inject: true,
        hash: false,
        filename: "region-page.html",
        template: path.resolve(__dirname, "src", "pages", "region-page.html"),
        favicon: path.resolve(__dirname, "src", "images", "favicon.ico")
      }),
      new HtmlWebpackPlugin({
        excludeChunks: ["homepage"],
        inject: true,
        hash: false,
        filename: "search-page.html",
        template: path.resolve(__dirname, "src", "pages", "search-page.html"),
        favicon: path.resolve(__dirname, "src", "images", "favicon.ico")
      }),
      new HtmlWebpackPlugin({
        excludeChunks: ["homepage"],
        inject: true,
        hash: false,
        filename: "create_ad-page0.html",
        template: path.resolve(
          __dirname,
          "src",
          "pages",
          "create_ad-page0.html"
        ),
        favicon: path.resolve(__dirname, "src", "images", "favicon.ico")
      }),
      new HtmlWebpackPlugin({
        excludeChunks: ["homepage"],
        inject: true,
        hash: false,
        filename: "create_ad-page1.html",
        template: path.resolve(
          __dirname,
          "src",
          "pages",
          "create_ad-page1.html"
        ),
        favicon: path.resolve(__dirname, "src", "images", "favicon.ico")
      }),
      new HtmlWebpackPlugin({
        excludeChunks: ["homepage"],
        inject: true,
        hash: false,
        filename: "create_ad-page2.html",
        template: path.resolve(
          __dirname,
          "src",
          "pages",
          "create_ad-page2.html"
        ),
        favicon: path.resolve(__dirname, "src", "images", "favicon.ico")
      }),
      new HtmlWebpackPlugin({
        excludeChunks: ["homepage"],
        inject: true,
        hash: false,
        filename: "create_ad-page3.html",
        template: path.resolve(
          __dirname,
          "src",
          "pages",
          "create_ad-page3.html"
        ),
        favicon: path.resolve(__dirname, "src", "images", "favicon.ico")
      }),
      new HtmlWebpackPlugin({
        excludeChunks: ["homepage"],
        inject: true,
        hash: false,
        filename: "single_ad-page.html",
        template: path.resolve(
          __dirname,
          "src",
          "pages",
          "single_ad-page.html"
        ),
        favicon: path.resolve(__dirname, "src", "images", "favicon.ico")
      }),
      new HtmlWebpackPlugin({
        excludeChunks: ["homepage"],
        inject: true,
        hash: false,
        filename: "single_ad__modify-page.html",
        template: path.resolve(
          __dirname,
          "src",
          "pages",
          "single_ad__modify-page.html"
        ),
        favicon: path.resolve(__dirname, "src", "images", "favicon.ico")
      }),
      new HtmlWebpackPlugin({
        excludeChunks: ["homepage"],
        inject: true,
        hash: false,
        filename: "single_ad__own-page.html",
        template: path.resolve(
          __dirname,
          "src",
          "pages",
          "single_ad__own-page.html"
        ),
        favicon: path.resolve(__dirname, "src", "images", "favicon.ico")
      }),
      new HtmlWebpackPlugin({
        excludeChunks: ["homepage"],
        inject: true,
        hash: false,
        filename: "single_ad__premium-page.html",
        template: path.resolve(
          __dirname,
          "src",
          "pages",
          "single_ad__premium-page.html"
        ),
        favicon: path.resolve(__dirname, "src", "images", "favicon.ico")
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css"
      }),
      new ImageMinPlugin({ test: /\.(jpg|jpeg|png|gif|svg)$/i }),
      new CleanWebpackPlugin({
        /**
         * Some plugins used do not correctly save to webpack's asset list.
         * Disable automatic asset cleaning until resolved
         */
        cleanStaleWebpackAssets: false,
        // Alternative:
        // cleanAfterEveryBuildPatterns: [
        // copy-webpackPlugin:
        //   '!images/content/**/*',
        // url-loader fonts:
        //   '!**/*.+(eot|svg|ttf|woff|woff2)',
        // url-loader images:
        //   '!**/*.+(jpg|jpeg|png|gif|svg)',
        // ],
        verbose: true
      }),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, "src", "images"),
          to: path.resolve(__dirname, "dist", "images"),
          toType: "dir"
        }
      ])
    ],
    devtool: "cheap-eval-source-map"
  };
};

module.exports = config;
