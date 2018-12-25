/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server-dev.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/custom-webpack/cat-plugin.js":
/*!*************************************************!*\
  !*** ./src/server/custom-webpack/cat-plugin.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! webpack-sources */ \"webpack-sources\"),\n    RawSource = _require.RawSource;\n\nvar _require2 = __webpack_require__(/*! webpack-sources */ \"webpack-sources\"),\n    Source = _require2.Source;\n\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nfunction MyPlugin(context) {\n  this.context = context;\n}\n\nMyPlugin.prototype.apply = function (compiler) {\n  var context = this.context;\n  var resourceRegExp = /\\.(cat)/;\n  var newResource = 'hola.js';\n  compiler.hooks.normalModuleFactory.tap(\"NormalModuleReplacementPlugin\", function (nmf) {\n    nmf.hooks.beforeResolve.tap(\"NormalModuleReplacementPlugin\", function (result) {\n      if (!result) return;\n\n      if (resourceRegExp.test(result.request)) {\n        if (typeof newResource === \"function\") {\n          newResource(result);\n        } else {\n          var catFile = fs.readFileSync(path.resolve(context, result.request), 'utf8');\n          catJSON = JSON.parse(catFile);\n          newResource = catJSON[0].config.js;\n          result.request = path.resolve(context, catJSON[0].config.js);\n        }\n      }\n\n      return result;\n    });\n    nmf.hooks.afterResolve.tap(\"NormalModuleReplacementPlugin\", function (result) {\n      if (!result) return;\n      path.resolve(path.dirname(result.resource), newResource);\n      /*console.log()*/\n\n      /*if (resourceRegExp.test(result.resource)) {\n      \tconsole.log(newResource)\n      \tif (typeof newResource === \"function\") {\n      \t\tnewResource(result);\n      \t} else {\n      \t\tconsole.log(newResource)\n      \t\tresult.resource = path.resolve(\n      \t\t\tpath.dirname(result.resource),\n      \t\t\tnewResource\n      \t\t);\n      \t}\n      }*/\n\n      return result;\n    });\n  }); //compiler.hooks.emit.tap('MyPlugin', (compilationParams, callback) => {\n  // console.log(compilationParams.fileDependencies)\n\n  /*compilationParams.fileDependencies.forEach((dependency) => {\n  \tif (dependency.indexOf(\".cat\") != -1) {\n  \t\tconsole.log(dependency)\n  \t\t// dependency.replace(\".cat\", \".js\")\n  \t\tcompilationParams.fileDependencies.delete(dependency);\n  \t}\n  })\n  console.log(compilationParams.fileDependencies)\n  compilationParams.chunks.forEach(chunk => { \n  \tchunk.files.forEach(filename => {\n  \t\t// Get the asset source for each file generated by the chunk:\n  \t\tconsole.log(filename)\n  \t\tif (filename.indexOf(\".cat\")) { \n  \t\t\tlet source = compilationParams.assets[filename].source();\n  \t\t\t// console.log(source)\n  \t\t}\n  \t  });\n  })*/\n\n  /*compilationParams.hooks.buildModule.tap('MyPlugin', (module) => {\n  \tconsole.log(module.source());\n  \tif (module.name) {\n  \t\tcompilation.assets[module.name]=new RawSource(module.source().replace(/.cat/gi, \".js\"));\n  \t}\n  });*/\n\n  /*compilation.assets.forEach((asset, filename) => {\n  \tcompilation.assets[filename] = new RawSource(compilation.assets[filename].source().replace(\".cat\", \".js\"));\n  });*/\n\n  /*\t\tcompilationParams.chunks.forEach((chunk) => {\n  \t\t\tchunk.files.forEach((filename) => { \n  \t\t\tfor (const module of chunk.modulesIterable) {\n  \t\t\t\tchunk.removeModule(module)\n  \t\t\t}\n  \t\t});*/\n  // do your thing here\n  // });\n\n  /*compiler.plugin('emit', function(compilation, callback) {\n    \n    // Explore each chunk (build output):\n    compilation.chunks.forEach(function(chunk) {\n   // Explore each module within the chunk (built inputs):\n  \n  for (const module of chunk.modulesIterable) {\n  \t// module.fileDependencies.forEach(function(filepath) {\n  \t// console.log(module.dependencies);\n  \tchunk.removeModule(module)\n  \t // });\n   \n   }\n       // Explore each asset filename generated by the chunk:\n     chunk.files.forEach(function(filename) {\n        // Get the asset source for each file generated by the chunk:\n        var source = compilation.assets[filename].source();\n      });\n    });\n     callback();\n  });*/\n};\n\nmodule.exports = MyPlugin;\n\n//# sourceURL=webpack:///./src/server/custom-webpack/cat-plugin.js?");

/***/ }),

/***/ "./src/server/server-dev.js":
/*!**********************************!*\
  !*** ./src/server/server-dev.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! webpack */ \"webpack\");\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\");\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _webpack_dev_config_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../webpack.dev.config.js */ \"./webpack.dev.config.js\");\n/* harmony import */ var _webpack_dev_config_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_webpack_dev_config_js__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nvar app = express__WEBPACK_IMPORTED_MODULE_1___default()(),\n    DIST_DIR = __dirname,\n    HTML_FILE = path__WEBPACK_IMPORTED_MODULE_0___default.a.join(DIST_DIR, 'index.html'),\n    compiler = webpack__WEBPACK_IMPORTED_MODULE_2___default()(_webpack_dev_config_js__WEBPACK_IMPORTED_MODULE_5___default.a);\napp.use(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3___default()(compiler, {\n  publicPath: _webpack_dev_config_js__WEBPACK_IMPORTED_MODULE_5___default.a.output.publicPath\n}));\napp.use(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_4___default()(compiler));\napp.get('*', function (req, res, next) {\n  compiler.outputFileSystem.readFile(HTML_FILE, function (err, result) {\n    if (err) {\n      return next(err);\n    }\n\n    res.set('content-type', 'text/html');\n    res.send(result);\n    res.end();\n  });\n});\nvar PORT = process.env.PORT || 8080;\napp.listen(PORT, function () {\n  console.log(\"DEV App listening to \".concat(PORT, \"....\"));\n  console.log('Press Ctrl+C to quit.');\n});\n\n//# sourceURL=webpack:///./src/server/server-dev.js?");

/***/ }),

/***/ "./webpack.dev.config.js":
/*!*******************************!*\
  !*** ./webpack.dev.config.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var path = __webpack_require__(/*! path */ \"path\");\n\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\");\n\nvar HtmlWebPackPlugin = __webpack_require__(/*! html-webpack-plugin */ \"html-webpack-plugin\");\n\nvar MyPlugin = __webpack_require__(/*! ./src/server/custom-webpack/cat-plugin */ \"./src/server/custom-webpack/cat-plugin.js\");\n\nmodule.exports = {\n  entry: {\n    main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true', './src/index.js']\n  },\n  output: {\n    path: path.join(__dirname, 'dist'),\n    publicPath: '/',\n    filename: '[name].js'\n  },\n  mode: 'development',\n  target: 'web',\n  devtool: '#source-map',\n  resolveLoader: {\n    alias: {\n      'cat-loader': path.resolve(__dirname, './src/server/custom-webpack/cat-loader.js')\n    }\n  },\n  module: {\n    rules: [{\n      test: /\\.cat?$/,\n      exclude: /node_modules/,\n      include: __dirname + '/',\n      enforce: \"pre\",\n      use: [{\n        loader: 'cat-loader',\n        options: {\n          context: __dirname + '/src'\n        }\n      }, {\n        loader: 'babel-loader'\n      }]\n    }, {\n      test: /\\.js$/,\n      exclude: /node_modules/,\n      loader: 'babel-loader'\n    }, {\n      // Loads the javacript into html template provided.\n      // Entry point is set below in HtmlWebPackPlugin in Plugins\n      test: /\\.html$/,\n      use: [{\n        loader: 'html-loader' //options: { minimize: true }\n\n      }]\n    }, {\n      test: /\\.scss$/,\n      use: ['style-loader', // creates style nodes from JS strings\n      'css-loader', // translates CSS into CommonJS\n      'sass-loader']\n    }, {\n      test: /\\.css$/,\n      use: ['style-loader', 'css-loader']\n    }, {\n      test: /\\.(png|svg|jpg|gif)$/,\n      use: ['file-loader']\n    }]\n  },\n  plugins: [new HtmlWebPackPlugin({\n    template: './src/html/index.html',\n    filename: './index.html',\n    excludeChunks: ['server']\n  }), new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin(), new MyPlugin('src')]\n};\n\n//# sourceURL=webpack:///./webpack.dev.config.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "html-webpack-plugin":
/*!**************************************!*\
  !*** external "html-webpack-plugin" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"html-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22html-webpack-plugin%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-dev-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-dev-middleware%22?");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-hot-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-hot-middleware%22?");

/***/ }),

/***/ "webpack-sources":
/*!**********************************!*\
  !*** external "webpack-sources" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-sources\");\n\n//# sourceURL=webpack:///external_%22webpack-sources%22?");

/***/ })

/******/ });