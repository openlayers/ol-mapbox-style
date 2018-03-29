
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/** Get the list of examples from the example directory.
 *
 *  @param {String} dirName - Name of the directory to read.
 *  @param {Function} callback - Function to execute for each example.
 *
 *  @returns {undefined} Nothing.
 */
function getExamples(dirName, callback) {
  const example_files = fs.readdirSync(dirName);
  const entries = {};

  // iterate through the list of files in the directory.
  for (const filename of example_files) {
    // ooo, javascript file!
    if (filename.endsWith('.js')) {
      // trim the entry name down to the file without the extension.
      const entry_name = filename.split('.')[0];
      callback(entry_name, path.join(dirName, filename));
    }
  }

  return entries;
}

/** Creates an object with the entry names and file names
 *  to be transformed.
 *
 *  @param {String} dirName - Name of the directory to read.
 *
 *  @returns {Object} with webpack entry points.
 */
function getEntries(dirName) {
  const entries = {};
  getExamples(dirName, (entryName, filename) => {
    entries[entryName] = filename;
  });
  return entries;
}

/** Each example needs a dedicated HTML file.
 *  This will create a "plugin" that outputs HTML from a template.
 *
 *  @param {String} dirName - Name of the directory to read.
 *
 *  @returns {Array} specifying webpack plugins.
 */
function getHtmlTemplates(dirName) {
  const html_conf = [];
  // create the array of HTML plugins.
  const template = path.join(dirName, '_template.html');
  getExamples(dirName, (entryName, filename) => {
    html_conf.push(
      new HtmlWebpackPlugin({
        title: entryName,
        // ensure each output has a unique filename
        filename: entryName + '.html',
        template,
        // without specifying chunks, all chunks are
        //  included with the file.
        chunks: [entryName]
      })
    );
  });
  return html_conf;
}


module.exports = {
  entry: getEntries(path.resolve(__dirname, './example')),
  output: {
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'ol-mapbox-style': path.resolve(__dirname, '.')
    }
  },
  devtool: 'source-map',
  node: {fs: 'empty'},
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // ensure the data is copied over.
    // currently the index.html is manually created.
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './example/data'),
        to: 'data'
      },
      {
        from: path.resolve(__dirname, './example/index.html'),
        to: 'index.html'
      }
    ])
  ].concat(getHtmlTemplates('./example'))
};
