(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/admin/category/AddCategory.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/admin/category/AddCategory.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _validators_category__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validators/category */ \"./resources/js/admin/validators/category.js\");\n/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../validators */ \"./resources/js/validators/index.js\");\n/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../http */ \"./resources/js/http.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  props: [],\n  data: function data() {\n    return {\n      dafaultValues: {\n        name: '',\n        slug: '',\n        parentCategoryId: null,\n        canHaveDivisions: 'yes'\n      },\n      values: {\n        name: '',\n        slug: '',\n        parentCategoryId: null,\n        canHaveDivisions: 'yes'\n      },\n      errors: {\n        name: '',\n        slug: '',\n        parentCategoryId: '',\n        canHaveDivisions: ''\n      },\n      adminPath: window.adminPath,\n      categoryOptions: [{\n        name: 'None',\n        value: null\n      }],\n      divisionOptions: [{\n        name: 'Yes',\n        value: 'yes'\n      }, {\n        name: 'No',\n        value: 'no'\n      }],\n      newCategory: null,\n      isLoading: false,\n      isInitialized: false\n    };\n  },\n  mounted: function mounted() {\n    this.getOptions();\n  },\n  methods: {\n    checkForm: function checkForm() {\n      this.errors = Object(_validators__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_validators_category__WEBPACK_IMPORTED_MODULE_0__[\"default\"], this.values) || {};\n      return Object.keys(this.errors).length == 0;\n    },\n    getOptions: function getOptions() {\n      var _this = this;\n\n      _http__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get('/admin/category/parent-options').then(function (res) {\n        if (res && res.data) {\n          var categories = res.data.categories;\n\n          if (categories) {\n            _this.categoryOptions = _this.categoryOptions.concat(categories.map(function (category) {\n              return {\n                value: category.id,\n                name: category.name\n              };\n            }));\n          }\n        } else {\n          throw new Error('No data');\n        }\n      })[\"catch\"](function (error) {\n        _this.errors[\"default\"] = 'Failed to communicate with server.';\n        console.log(error);\n      })[\"finally\"](function () {\n        _this.isInitialized = true;\n      });\n    },\n    submit: function submit() {\n      var _this2 = this;\n\n      if (this.checkForm()) {\n        console.log('Loading');\n        this.isLoading = true;\n        _http__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post('/admin/category', _objectSpread({}, this.values)).then(function (res) {\n          if (res && res.data && res.data.category) {\n            _this2.newCategory = res.data.category;\n            _this2.values = _this2.dafaultValues;\n          }\n        })[\"catch\"](function (error) {\n          if (error && error.data) {\n            _this2.errors = error.data;\n          }\n        })[\"finally\"](function () {\n          _this2.isLoading = false;\n        });\n      }\n    },\n    nameChanged: function nameChanged() {\n      this.values.slug = this.values.name.toLowerCase().split(' ').join('-');\n    }\n  }\n});\n\n//# sourceURL=webpack:///./resources/js/admin/category/AddCategory.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/admin/category/AddCategory.vue?vue&type=template&id=5a2959cc&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/admin/category/AddCategory.vue?vue&type=template&id=5a2959cc& ***!
  \******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", { staticClass: \"card card-medium m-auto\" }, [\n    _c(\"div\", { staticClass: \"card-header\" }, [\n      _vm._v(\"\\n    Add Category\\n  \")\n    ]),\n    _vm._v(\" \"),\n    _c(\"div\", { staticClass: \"card-body\" }, [\n      _vm.isInitialized\n        ? _c(\n            \"form\",\n            {\n              ref: \"form\",\n              staticClass: \"mb-l\",\n              attrs: {\n                action: _vm.adminPath + \"/categories/new\",\n                method: \"post\"\n              }\n            },\n            [\n              _c(\"input-box\", {\n                staticClass: \"mx-auto\",\n                attrs: {\n                  type: \"text\",\n                  label: \"Name\",\n                  name: \"name\",\n                  error: _vm.errors.name\n                },\n                on: { input: _vm.nameChanged },\n                model: {\n                  value: _vm.values.name,\n                  callback: function($$v) {\n                    _vm.$set(_vm.values, \"name\", $$v)\n                  },\n                  expression: \"values.name\"\n                }\n              }),\n              _vm._v(\" \"),\n              _c(\"input-box\", {\n                staticClass: \"mx-auto\",\n                attrs: {\n                  type: \"text\",\n                  label: \"Slug\",\n                  name: \"slug\",\n                  error: _vm.errors.slug,\n                  hint: \"This will be used as the URL path for the category.\"\n                },\n                model: {\n                  value: _vm.values.slug,\n                  callback: function($$v) {\n                    _vm.$set(_vm.values, \"slug\", $$v)\n                  },\n                  expression: \"values.slug\"\n                }\n              }),\n              _vm._v(\" \"),\n              _c(\"select-box\", {\n                staticClass: \"mx-auto\",\n                attrs: {\n                  label: \"Parent category\",\n                  name: \"parentCategoryId\",\n                  error: _vm.errors.parentCategoryId,\n                  options: _vm.categoryOptions\n                },\n                model: {\n                  value: _vm.values.parentCategoryId,\n                  callback: function($$v) {\n                    _vm.$set(_vm.values, \"parentCategoryId\", $$v)\n                  },\n                  expression: \"values.parentCategoryId\"\n                }\n              }),\n              _vm._v(\" \"),\n              _c(\"radio-input\", {\n                staticClass: \"mx-auto\",\n                attrs: {\n                  label: \"Can it have sub categories?\",\n                  name: \"canHaveDivisions\",\n                  error: _vm.errors.canHaveDivisions,\n                  options: _vm.divisionOptions,\n                  hint: \"If yes then it cannot have products directly under it.\"\n                },\n                model: {\n                  value: _vm.values.canHaveDivisions,\n                  callback: function($$v) {\n                    _vm.$set(_vm.values, \"canHaveDivisions\", $$v)\n                  },\n                  expression: \"values.canHaveDivisions\"\n                }\n              }),\n              _vm._v(\" \"),\n              _vm.errors && _vm.errors.default\n                ? _c(\"small\", { staticClass: \"text-danger\" }, [\n                    _vm._v(_vm._s(_vm.errors.default))\n                  ])\n                : _vm._e(),\n              _vm._v(\" \"),\n              _c(\"div\", { staticClass: \"flex justify-content-center mt-xl\" }, [\n                _c(\n                  \"button\",\n                  {\n                    staticClass: \"btn btn-primary btn-lg\",\n                    attrs: { type: \"submit\", disabled: _vm.isLoading },\n                    on: {\n                      click: function($event) {\n                        $event.preventDefault()\n                        return _vm.submit($event)\n                      }\n                    }\n                  },\n                  [_vm._v(\"\\n          Submit\\n        \")]\n                )\n              ])\n            ],\n            1\n          )\n        : _vm._e(),\n      _vm._v(\" \"),\n      !_vm.isInitialized\n        ? _c(\"div\", { staticClass: \"loader loader-lg my-l\" })\n        : _vm._e()\n    ])\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./resources/js/admin/category/AddCategory.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/admin/category/Home.vue?vue&type=template&id=281503a2&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/admin/category/Home.vue?vue&type=template&id=281503a2& ***!
  \***********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", [_c(\"add-category-form\")], 1)\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./resources/js/admin/category/Home.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./resources/js/admin/category/AddCategory.vue":
/*!*****************************************************!*\
  !*** ./resources/js/admin/category/AddCategory.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _AddCategory_vue_vue_type_template_id_5a2959cc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddCategory.vue?vue&type=template&id=5a2959cc& */ \"./resources/js/admin/category/AddCategory.vue?vue&type=template&id=5a2959cc&\");\n/* harmony import */ var _AddCategory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddCategory.vue?vue&type=script&lang=js& */ \"./resources/js/admin/category/AddCategory.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _AddCategory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _AddCategory_vue_vue_type_template_id_5a2959cc___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _AddCategory_vue_vue_type_template_id_5a2959cc___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"resources/js/admin/category/AddCategory.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./resources/js/admin/category/AddCategory.vue?");

/***/ }),

/***/ "./resources/js/admin/category/AddCategory.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/admin/category/AddCategory.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AddCategory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib!../../../../node_modules/vue-loader/lib??vue-loader-options!./AddCategory.vue?vue&type=script&lang=js& */ \"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/admin/category/AddCategory.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AddCategory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./resources/js/admin/category/AddCategory.vue?");

/***/ }),

/***/ "./resources/js/admin/category/AddCategory.vue?vue&type=template&id=5a2959cc&":
/*!************************************************************************************!*\
  !*** ./resources/js/admin/category/AddCategory.vue?vue&type=template&id=5a2959cc& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddCategory_vue_vue_type_template_id_5a2959cc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./AddCategory.vue?vue&type=template&id=5a2959cc& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/admin/category/AddCategory.vue?vue&type=template&id=5a2959cc&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddCategory_vue_vue_type_template_id_5a2959cc___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddCategory_vue_vue_type_template_id_5a2959cc___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./resources/js/admin/category/AddCategory.vue?");

/***/ }),

/***/ "./resources/js/admin/category/Home.vue":
/*!**********************************************!*\
  !*** ./resources/js/admin/category/Home.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Home_vue_vue_type_template_id_281503a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home.vue?vue&type=template&id=281503a2& */ \"./resources/js/admin/category/Home.vue?vue&type=template&id=281503a2&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _Home_vue_vue_type_template_id_281503a2___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Home_vue_vue_type_template_id_281503a2___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"resources/js/admin/category/Home.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./resources/js/admin/category/Home.vue?");

/***/ }),

/***/ "./resources/js/admin/category/Home.vue?vue&type=template&id=281503a2&":
/*!*****************************************************************************!*\
  !*** ./resources/js/admin/category/Home.vue?vue&type=template&id=281503a2& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_281503a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=template&id=281503a2& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/admin/category/Home.vue?vue&type=template&id=281503a2&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_281503a2___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_281503a2___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./resources/js/admin/category/Home.vue?");

/***/ }),

/***/ "./resources/js/admin/validators/category.js":
/*!***************************************************!*\
  !*** ./resources/js/admin/validators/category.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hapi/joi */ \"./node_modules/@hapi/joi/dist/joi-browser.min.js\");\n/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hapi_joi__WEBPACK_IMPORTED_MODULE_0__);\n\nvar schema = _hapi_joi__WEBPACK_IMPORTED_MODULE_0___default.a.object({\n  name: _hapi_joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().required().messages({\n    'string.empty': \"Name is required.\",\n    'string.required': \"Name is required.\"\n  }),\n  slug: _hapi_joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().required().regex(new RegExp('^[A-Z-]+$', 'i')).messages({\n    'string.empty': \"Slug is required.\",\n    'string.required': \"Slug is required.\",\n    'string.pattern.base': \"Slug should contain only alphabets and '-'.\"\n  }),\n  parentCategoryId: _hapi_joi__WEBPACK_IMPORTED_MODULE_0___default.a.optional(),\n  canHaveDivisions: _hapi_joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().required().messages({\n    'string.empty': \"Please select one.\",\n    'string.required': \"Please select one.\"\n  })\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (schema);\n\n//# sourceURL=webpack:///./resources/js/admin/validators/category.js?");

/***/ }),

/***/ "./resources/js/config.js":
/*!********************************!*\
  !*** ./resources/js/config.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  baseUrl: 'http://localhost:3000/api',\n  adminPath: '/admin'\n});\n\n//# sourceURL=webpack:///./resources/js/config.js?");

/***/ }),

/***/ "./resources/js/http.js":
/*!******************************!*\
  !*** ./resources/js/http.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ \"./resources/js/config.js\");\n/* harmony import */ var _csrfToken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./csrfToken */ \"./resources/js/csrfToken.js\");\n\n\n\nvar instance = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({\n  baseURL: _config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].baseUrl,\n  headers: {\n    'csrf-token': Object(_csrfToken__WEBPACK_IMPORTED_MODULE_2__[\"default\"])()\n  }\n});\ninstance.interceptors.response.use(function (response) {\n  return response;\n}, function (error) {\n  var extractedErrors = {};\n\n  if (!(error && error.response)) {\n    extractedErrors[\"default\"] = 'Can not reach the server at the moment.';\n  } else if (error.response.data) {\n    if (error.response.data.errors && Object.keys(error.response.data.errors).length > 0) {\n      extractedErrors = error.response.data.errors;\n    } else if (error.response.data.message) {\n      extractedErrors[\"default\"] = error.response.data.message;\n    }\n  } else {\n    extractedErrors[\"default\"] = 'Unexpected error occured.';\n  }\n\n  var errorObj = {\n    data: extractedErrors\n  };\n\n  if (error && error.response && error.response.status) {\n    errorObj.status = error.response.status;\n  }\n\n  return Promise.reject(errorObj);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (instance);\n\n//# sourceURL=webpack:///./resources/js/http.js?");

/***/ })

}]);