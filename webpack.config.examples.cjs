const {readdirSync} = require('fs');
const {join, resolve} = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * Get the list of examples from the examples directory.
 *
 *  @param {string} dirName Name of the directory to read.
 *  @param {Function} callback Function to execute for each example.
 *
 *  @return {Object} Entries.
 */
function getExamples(dirName, callback) {
  const example_files = readdirSync(dirName);
  const entries = {};

  // iterate through the list of files in the directory.
  for (const filename of example_files) {
    // ooo, javascript file!
    if (filename.endsWith('.js')) {
      // trim the entry name down to the file without the extension.
      const entry_name = filename.split('.')[0];
      callback(entry_name, join(dirName, filename));
    }
  }

  return entries;
}

/**
 * Creates an object with the entry names and file names
 *  to be transformed.
 *
 *  @param {string} dirName Name of the directory to read.
 *
 *  @return {Object} with webpack entry points.
 */
function getEntries(dirName) {
  const entries = {};
  getExamples(dirName, (entryName, filename) => {
    entries[entryName] = filename;
  });
  return entries;
}

/**
 * Each example needs a dedicated HTML file.
 *  This will create a "plugin" that outputs HTML from a template.
 *
 *  @param {string} dirName Name of the directory to read.
 *
 *  @return {Array} specifying webpack plugins.
 */
function getHtmlTemplates(dirName) {
  const html_conf = [];
  // create the array of HTML plugins.
  const template = join(dirName, '_template.html');
  getExamples(dirName, (entryName, filename) => {
    html_conf.push(
      new HtmlWebpackPlugin({
        title: entryName,
        // ensure each output has a unique filename
        filename: entryName + '.html',
        template,
        // without specifying chunks, all chunks are
        //  included with the file.
        chunks: ['common', entryName],
      }),
    );
  });
  return html_conf;
}

module.exports = (env, argv) => {
  const prod = argv.mode === 'production';
  return {
    context: __dirname,
    target: 'web',
    mode: prod ? 'production' : 'development',
    entry: getEntries(resolve(join(__dirname, 'examples'))),
    optimization: {
      runtimeChunk: {
        name: 'common',
      },
      splitChunks: {
        name: 'common',
        chunks: 'initial',
        minChunks: 2,
      },
    },
    output: {
      filename: '[name].js',
      path: join(__dirname, '_site', 'examples'),
      publicPath: 'auto',
    },
    resolve: {
      alias: {
        'ol-mapbox-style': join(__dirname, 'src'),
      },
      fallback: {
        'assert': join(__dirname, 'node_modules', 'nanoassert'),
      },
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            prod ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      // ensure the data is copied over.
      // currently the index.html is manually created.
      // @ts-ignore
      new CopyWebpackPlugin({
        patterns: [
          {
            from: resolve(__dirname, './examples/data'),
            to: 'data',
          },
          {
            from: resolve(__dirname, './examples/index.html'),
            to: 'index.html',
          },
        ],
      }),
    ].concat(getHtmlTemplates('./examples')),
  };
};
