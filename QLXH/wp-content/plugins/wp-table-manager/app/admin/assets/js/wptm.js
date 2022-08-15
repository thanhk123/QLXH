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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/admin/assets/js/_alternating.js":
/*!*********************************************!*\
  !*** ./app/admin/assets/js/_alternating.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_functions */ "./app/admin/assets/js/_functions.js");
//alternate color handling functions


const alternating = {
    /**
     * Check that the selection matches the saved alternate values
     *
     * @param selection
     * @param oldAlternate
     * @returns {*}
     */
    setNumberAlternate : (selection, oldAlternate) => {
        var count = _.size(oldAlternate);

        window.jquery.each(oldAlternate, function (i, v) {
            if (typeof v.selection !== 'undefined') {
                if (v.selection[0] == selection[0] &&
                    v.selection[1] == selection[1] &&
                    v.selection[2] == selection[2] &&
                    v.selection[3] == selection[3]) {
                    count = i;
                }
            } else {
                return count;
            }
        });

        return count;
    },
    /**
     * when select alternating_color
     *
     * @param value
     * @param selection
     * @param count
     */
    selectAlternatingColor : (value, selection, count) => {//when select alternating_color
        //ij is row, ik is coll
        var ij, ik;
        var beforeChange = window.jquery.extend({}, window.Wptm.style.cells);
        var size = _.size(window.table_function_data.checkChangeAlternate);
        window.table_function_data.checkChangeAlternate[size] = {};

        for (ij = selection[0]; ij <= selection[2]; ij++) {
            for (ik = selection[1]; ik <= selection[3]; ik++) {
                if (typeof (beforeChange[ij + "!" + ik]) !== 'undefined') {
                    window.table_function_data.checkChangeAlternate[size][ij + "!" + ik] = beforeChange[ij + "!" + ik][2].AlternateColor;
                    beforeChange[ij + "!" + ik][2] = window.jquery.extend(beforeChange[ij + "!" + ik][2], {AlternateColor: count});
                } else { //cell not have style
                    beforeChange[ij + "!" + ik] = [ij, ik, {}];
                    beforeChange[ij + "!" + ik][2] = {AlternateColor: count};
                }
                if (typeof window.table_function_data.checkChangeAlternate[size][ij + "!" + ik] === 'undefined' || window.table_function_data.checkChangeAlternate[size][ij + "!" + ik] === null) {
                    window.table_function_data.checkChangeAlternate[size][ij + "!" + ik] = -1;
                }
            }
        }

        window.Wptm.style.cells = beforeChange;

        var listChangeAlternate = [];
        var i = count, oldCount = count;
        window.table_function_data.changeAlternate = [];
        for (var ii = count - 1; ii >= 0; ii--) {
            var check = 1;
            if (value[ii] !== false && typeof value[ii].selection !== 'undefined') {
                if(value[ii].selection[0] >= value[i].selection[0]) {
                    check++;
                }

                if(value[ii].selection[1] >= value[i].selection[1]) {
                    check++;
                }

                if(value[ii].selection[2] <= value[i].selection[2]) {
                    check++;
                }

                if(value[ii].selection[3] <= value[i].selection[3]) {
                    check++;
                }
            } else {
                check = 5;
            }

            if (check === 5) {
                value[ii] = value[count];
                listChangeAlternate[ii] = count;
                if (typeof listChangeAlternate[count] !== 'undefined') {
                    listChangeAlternate[ii] = listChangeAlternate[count];
                    delete listChangeAlternate[count];
                }
                delete value[count];
                count--;
                i = ii;
            }
        }
        for (var j = 0; j < oldCount; j ++) {
            if (typeof listChangeAlternate[j] !== 'undefined') {
                window.table_function_data.changeAlternate[listChangeAlternate[j]] = j;
            }
        }
        window.table_function_data.alternateIndex = count;
        window.table_function_data.alternateSelection = selection;
    },
    /**
     * Cancel alternateColor
     */
    reAlternateColor : () => {
        var styleCells = {};
        styleCells = window.jquery.extend({}, Wptm.style.cells);

        for (var i = _.size(window.table_function_data.checkChangeAlternate) - 1; i >= 0; i--) {
            window.jquery.map(window.table_function_data.checkChangeAlternate[i], function (v, ii) {
                if (typeof styleCells[ii] !== 'undefined') {
                    if (v !== -1) {
                        styleCells[ii][2].AlternateColor = v;
                    } else {
                        delete styleCells[ii][2].AlternateColor;
                    }
                }
            });
        }

        window.table_function_data.checkChangeAlternate = [];
        return styleCells;
    },



    /**
     * Set alternate color by alternate_row_odd_color option(in params)
     *
     * @param styleRows style.rows
     * @param Wptm
     * @param $element
     */
    setAlternateColor : (styleRows, Wptm, $element) => {
        Wptm.style.table.alternateColorValue = {};

        if (typeof Wptm.container !== 'undefined') {
            var countCols = Wptm.container.handsontable('countCols');
            var countRows = Wptm.container.handsontable('countRows');
        } else {/*get count cols, rows when handsontable not activated*/
            countCols = Wptm.datas[0].length - 1;
            countRows = Wptm.datas.length - 1;
        }

        var checkExistAlternateOld = 0;
        var checkExistAlternateEven = 0;

        if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNested(Wptm.style.table, 'alternate_row_odd_color') && Wptm.style.table.alternate_row_odd_color) {
            checkExistAlternateOld = 1;
            // Wptm.style.table.alternate_row_odd_color;
        }
        if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNested(Wptm.style.table, 'alternate_row_even_color') && Wptm.style.table.alternate_row_even_color) {
            checkExistAlternateEven = 1;
            // Wptm.style.table.alternate_row_even_color;
        }

        var header = '';
        if (styleRows !== null && typeof styleRows[0][1].cell_background_color !== 'undefined') {
            header = styleRows[0][1].cell_background_color;
        }

        if (checkExistAlternateEven + checkExistAlternateOld > 0) {
            Wptm.style.table.alternateColorValue = {};
            Wptm.style.table.alternateColorValue[0] = {};
            Wptm.style.table.alternateColorValue[0].selection = [0, 0, countRows - 1, countCols - 1];
            Wptm.style.table.alternateColorValue[0].footer = '';
            Wptm.style.table.alternateColorValue[0].even = checkExistAlternateEven === 1 ? Wptm.style.table.alternate_row_even_color : '#ffffff';
            Wptm.style.table.alternateColorValue[0].header = header;
            Wptm.style.table.alternateColorValue[0].old = checkExistAlternateOld === 1 ? Wptm.style.table.alternate_row_odd_color : '#ffffff';
            Wptm.style.table.alternateColorValue[0].default = '' + header + '|' + Wptm.style.table.alternateColorValue[0].even + '|' + Wptm.style.table.alternateColorValue[0].old + '|' + '';
            saveData.push({action: 'style', selection: [[0, 0, countRows, countCols]], style: {AlternateColor: 0}});
        }

        Wptm.style.table.alternate_row_even_color = null;
        Wptm.style.table.alternate_row_odd_color = null;

        if (typeof Wptm.style.table.alternateColorValue[0] !== 'undefined') {
            var ij, ik;
            for (ij = 0; ij <= countRows; ij++) {
                for (ik = 0; ik <= countCols; ik++) {
                    if (typeof (Wptm.style.cells[ij + "!" + ik]) !== 'undefined') {
                        Wptm.style.cells[ij + "!" + ik][2].AlternateColor = 0;
                    } else {
                        Wptm.style.cells[ij + "!" + ik] = [ij, ik, {}];
                        Wptm.style.cells[ij + "!" + ik][2] = jQuery.extend({}, {AlternateColor: 0});
                    }
                    if (header !== '' && ij === 0) {
                        delete Wptm.style.cells[ij + "!" + ik][2].cell_background_color;
                    }
                }
            }
        }

        window.Wptm = window.jquery.extend({}, Wptm);
    },
    /**
     * add new alternate to saving function and Wptm.style.table
     */
    applyAlternate : function () { //save oldAlternate value to Wptm and save
        window.Wptm.style.table.alternateColorValue = window.jquery.extend({}, window.table_function_data.oldAlternate);
        window.Wptm.style.table.allAlternate = window.jquery.extend({}, window.table_function_data.allAlternate);

        if(window.table_function_data.alternateIndex !== '') {
            var i, k;
            for (i = window.table_function_data.alternateSelection[0]; i <= window.table_function_data.alternateSelection[2]; i++) {
                for (k = window.table_function_data.alternateSelection[1]; k <= window.table_function_data.alternateSelection[3]; k++) {
                    if (typeof (window.Wptm.style.cells[i + "!" + k]) !== 'undefined') {
                        window.Wptm.style.cells[i + "!" + k][2] = window.jquery.extend(window.Wptm.style.cells[i + "!" + k][2], {AlternateColor: window.table_function_data.alternateIndex});
                    } else { //cell not have style
                        window.Wptm.style.cells[i + "!" + k] = [i, k, {}];
                        window.Wptm.style.cells[i + "!" + k][2] = {AlternateColor: window.table_function_data.alternateIndex};
                    }
                }
            }

            window.table_function_data.save_table_params.push({action: 'style', selection: [window.table_function_data.alternateSelection], style: {AlternateColor: window.table_function_data.alternateIndex}});
        }
        window.table_function_data.checkChangeAlternate = [];

        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].saveChanges(true);
        this.siblings('.colose_popup').trigger('click');
    },
    /**
     * set the change options of altenate when selector cell/change rangeLabe
     * @param Wptm
     * @param $
     */
    affterRangeLabe : function (Wptm, $) {
        try {
            var rangeLabel = this.find('.cellRangeLabelAlternate').val();
            rangeLabel = rangeLabel.replace(/[ ]+/g, "").toUpperCase();
            var arrayRange = rangeLabel.split(":");
            if (arrayRange.length > 1) {
                var check_value = 0;
                if (arrayRange[0].replace(/[ |A-Za-z]+/g, "") === '') {
                    check_value = 1;//value A:B
                } else if (arrayRange[0].replace(/[ |1-9]+/g, "") === '') {
                    check_value = 2;//value 8:9
                }
                var selection = [];
                if (check_value === 0) {
                    selection.push(parseInt(arrayRange[0].split(/[ |A-Za-z]+/g)[1]) - 1);
                    selection.push(_functions__WEBPACK_IMPORTED_MODULE_0__["default"].convertStringToNumber(arrayRange[0].split(/[ |1-9]+/g)[0]) - 1);
                    selection.push(parseInt(arrayRange[1].split(/[ |A-Za-z]+/g)[1]) - 1);
                    selection.push(_functions__WEBPACK_IMPORTED_MODULE_0__["default"].convertStringToNumber(arrayRange[1].split(/[ |1-9]+/g)[0]) - 1);
                } else if (check_value === 1) {
                    selection.push(0);
                    selection.push(_functions__WEBPACK_IMPORTED_MODULE_0__["default"].convertStringToNumber(arrayRange[0].split(/[ |1-9]+/g)[0]) - 1);
                    selection.push(Wptm.max_row - 1);
                    selection.push(_functions__WEBPACK_IMPORTED_MODULE_0__["default"].convertStringToNumber(arrayRange[1].split(/[ |1-9]+/g)[0]) - 1);
                } else {
                    selection.push(parseInt(arrayRange[0].split(/[ |A-Za-z]+/g)[0]) - 1);
                    selection.push(0);
                    selection.push(parseInt(arrayRange[1].split(/[ |A-Za-z]+/g)[0]) - 1);
                    selection.push(Wptm.max_Col - 1);
                }

                if (Wptm.type === 'mysql') {
                    if (selection[2] + selection[0] === 0) {
                        this.find('.wptm_range_labe_show').removeClass('wptm_hiden');
                    } else {
                        this.find('.wptm_range_labe_show').addClass('wptm_hiden');
                    }
                }
                $(Wptm.container).handsontable("selectCell", selection[0], selection[1], selection[2], selection[3]);

                if (typeof this.find('.cellRangeLabelAlternate').data('text_change') !== 'undefined') {
                    if (this.find('.cellRangeLabelAlternate').hasClass('select_row')) {
                        if (selection[0] === selection[2]) {
                            $(this.find('.cellRangeLabelAlternate').data('text_change')).text(wptmContext.rows_height);
                        } else {
                            $(this.find('.cellRangeLabelAlternate').data('text_change')).text(wptmContext.rows_height_start + (selection[0] + 1) + '-' + (selection[2] + 1));
                        }
                    } else if (this.find('.cellRangeLabelAlternate').hasClass('select_column')) {
                        $(this.find('.cellRangeLabelAlternate').data('text_change')).text(wptmContext.columns_width_start
                            + arrayRange[0].split(/[ |1-9]+/g)[0] + '-' + arrayRange[1].split(/[ |1-9]+/g)[0]);
                    } else {
                        $(this.find('.cellRangeLabelAlternate').data('text_change')).text(rangeLabel);
                    }
                }
            }
        } catch (err) {}
    },
    /**
     * active alternating
     *
     * @param format
     */
    getActiveFormatColor: (format) => {
        $alternating_color.find('.formatting_style .pane-color-tile').each(function () {
            if (window.jquery(this).find('.pane-color-tile-1').data('value') === format.even) {
                if (window.jquery(this).find('.pane-color-tile-2').data('value') === format.old) {
                    var check = 0;
                    if (format.header !== '') {
                        check = format.header === window.jquery(this).find('.pane-color-tile-header').data('value') ? 1 : -1;
                    } else {
                        check = 1;
                    }

                    if (format.footer !== '') {
                        check = format.footer === window.jquery(this).find('.pane-color-tile-footer').data('value') ? check : -1;
                    }

                    switch (check) {
                        case 1:
                            window.jquery(this).addClass('active');
                            break;
                        case -1:
                            // No active
                            break;
                    }
                }
            }
        });
    },
    /**
     * handsontable render after set alternating
     */
    renderCell : () => { //render cells
        window.jquery(window.Wptm.container).handsontable('render');
    }
}

/* harmony default export */ __webpack_exports__["default"] = (alternating);


/***/ }),

/***/ "./app/admin/assets/js/_changeTheme.js":
/*!*********************************************!*\
  !*** ./app/admin/assets/js/_changeTheme.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _alternating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_alternating */ "./app/admin/assets/js/_alternating.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_functions */ "./app/admin/assets/js/_functions.js");
/* harmony import */ var _toolbarOptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_toolbarOptions */ "./app/admin/assets/js/_toolbarOptions.js");




//change default theme to table, get ajax
function change_theme(ret, id, cellsData) {
    var $ = window.jquery;
    var $jform_css = $('#jform_css');
    bootbox.confirm(wptmText.WARNING_CHANGE_THEME, wptmText.Cancel, wptmText.Ok, function (result) {
        if (result) {
            Wptm.container.handsontable("selectCell", 0,0,0,0);

            $.ajax({
                url: wptm_ajaxurl + "view=style&format=json&id=" + id +"&id-table=" + Wptm.id,
                type: 'POST',
                dataType: 'json',
                data: {}
            }).done(function (data) {
                if (typeof (data) === 'object') {
                    saveData=[];
                    Wptm.mergeCellsSetting = [];
                    window.Wptm.style.table = {};

                    //backup old style
                    var oldStyle = JSON.parse(JSON.stringify(window.Wptm.style));
                    delete window.Wptm.style;
                    //Apply cols and row style to cells
                    var style;
                    window.Wptm.style = $.parseJSON(data.style);
                    style = $.extend({}, {}, window.Wptm.style);
                    window.Wptm.datas = data.datas;

                    if($jform_css.next().hasClass('CodeMirror')) {
                        $jform_css.next().remove();
                    }

                    window.Wptm.css = data.css.replace(/\\n/g, "\n");
                    // window.Wptm.css = data.css;
                    $jform_css.val(window.Wptm.css);
                    $jform_css.change();

                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].mergeCollsRowsstyleToCells();

                    //re-apply responsive parameters
                    if (typeof oldStyle.table.responsive_type !== "undefined") {
                        window.Wptm.style.table.responsive_type = oldStyle.table.responsive_type;
                    }

                    // add default val to window.Wptm.style.table
                    window.Wptm.style.table = $.extend({}, default_value, window.Wptm.style.table);

                    var colIndex, col, row;
                    for (col in style.cols) {
                        colIndex = style.cols[col][0];
                        if (typeof oldStyle.cols[colIndex] !== "undefined" && typeof oldStyle.cols[colIndex][1]["res_priority"] !== "undefined") {
                            if (typeof window.Wptm.style.cols[colIndex] == "undefined") {
                                window.Wptm.style.cols[colIndex] = [colIndex, {}];
                            }
                        }
                    }

                    //If no content we can set our own cols and rows size
                    for (row in style.rows) {
                        if (typeof (style.rows[row]) !== 'undefined' && (typeof (style.rows[row][1].height) !== 'undefined')) {
                            if (typeof (window.Wptm.style.rows[style.rows[row][0]]) === 'undefined') {
                                window.Wptm.style.rows[style.rows[row][0]] = [row, {}];
                            }
                            window.Wptm.style.rows[style.rows[row][0]][1].height = style.rows[row][1].height;
                        }
                    }

                    for (col in style.cols) {
                        if (typeof (style.cols[col]) !== 'undefined' && (typeof (style.cols[col][1].width) !== 'undefined')) {
                            if (typeof (window.Wptm.style.cols[style.cols[col][0]]) === 'undefined') {
                                window.Wptm.style.cols[style.cols[col][0]] = [col, {}];
                            }
                            window.Wptm.style.cols[style.cols[col][0]][1].width = style.cols[col][1].width;
                        }
                    }

                    Wptm.updateSettings.mergeCells = $.extend([], Wptm.mergeCellsSetting);
                    Wptm.updateSettings.data = $.extend([], data.datas);
                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].pullDims(Wptm, $, false);

                    setTimeout(function () {
                        saveData = [];

                        Wptm.container.handsontable('updateSettings', Wptm.updateSettings);

                        if (typeof (window.Wptm.style.table.alternateColorValue) === 'undefined' || typeof window.Wptm.style.table.alternateColorValue[0] === 'undefined') {
                            _alternating__WEBPACK_IMPORTED_MODULE_0__["default"].setAlternateColor(Wptm.style.rows, window.Wptm, window.wptm_element);
                        }

                        window.table_function_data.oldAlternate = {};
                        if (_.size(window.table_function_data.oldAlternate) < 1) {
                            window.table_function_data.oldAlternate = $.extend({}, window.Wptm.style.table.alternateColorValue);
                        }
                        window.table_function_data.checkChangeAlternate = [];

                        if (typeof data.update_type_columns !== 'undefined') {
                            saveData.push({
                                action: 'set_columns_types',
                                value: data.update_type_columns
                            });
                            Wptm.style.table.col_types = data.update_type_columns;

                            Wptm.headerOption = 1;
                            Wptm.hyperlink = typeof Wptm.style.table.hyperlink !== 'undefined' ? Wptm.style.table.hyperlink : {};
                            Wptm.mergeCellsSetting = typeof Wptm.style.table.mergeCellsSetting !== 'undefined' ? Wptm.style.table.mergeCellsSetting : [];
                        }
                        table_function_data.changeTheme = true;
                        window.jquery(window.Wptm.container).handsontable('render');

                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].cleanHandsontable();
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                        setTimeout(function () {
                            Wptm.updateSettings = $.extend({}, {});
                        },500);
                    },300);
                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].parseCss($);

                    if (table_function_data.selectionSize > 0) { //when have select cell
                        _toolbarOptions__WEBPACK_IMPORTED_MODULE_2__["default"].loadSelection($, Wptm, table_function_data.selection);
                    }
                } else {
                    bootbox.alert(data, wptmText.Ok);
                }
                $('#wptm_popup').find('.colose_popup').trigger('click');
            });
        } else {
            $('#wptm_popup').find('.colose_popup').trigger('click');
        }
    });
}

/* harmony default export */ __webpack_exports__["default"] = (change_theme);


/***/ }),

/***/ "./app/admin/assets/js/_chart.js":
/*!***************************************!*\
  !*** ./app/admin/assets/js/_chart.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_functions */ "./app/admin/assets/js/_functions.js");
/* harmony import */ var _alternating__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_alternating */ "./app/admin/assets/js/_alternating.js");
/* harmony import */ var _customRenderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_customRenderer */ "./app/admin/assets/js/_customRenderer.js");




/* Chart functions */
var DropChart = {};
DropChart.default = {
    "dataUsing": "row",
    "switchDataUsing": true,
    "useFirstRowAsLabels": true,
    "useFirstRowAsGraph": true,
    "width": 500,
    "height": 375,
    "chart_align": "center",
    "scaleShowGridLines": false,
    "scaleBeginAtZero": false,
};
DropChart.default.colors = "#DCDCDC,#97BBCD,#4C839E";
DropChart.default.pieColors = "#F7464A,#46BFBD,#FDB45C,#949FB1,#4D5360";
DropChart.datas = {};

DropChart.currency_symbol = window.default_value.currency_symbol;
DropChart.thousand_symbol = window.default_value.thousand_symbol;
DropChart.decimal_symbol = window.default_value.decimal_symbol;

DropChart.functions = {};

//get list chart of table
DropChart.functions.loadCharts = function () {
    var $ = jquery;

    if (typeof idTable !== 'undefined' && idTable !== '') {
        var url = wptm_ajaxurl + "view=charts&format=json&id_table=" + idTable;
        $.ajax({
            url: url,
            type: "POST",
            data: {},
            dataType: "json",
        }).done(function (data) {
            var i = 0;
            for (i = 0; i < data.length; i++) {
                var cells = $.parseJSON(data[i].datas);
                if ($.isArray(cells) !== false || cells.length !== 0) {
                    DropChart.datas[data[i].id] = {
                        author: data[i].author,
                        config: $.parseJSON(data[i].config),
                        data: cells,
                        title: data[i].title,
                        type: data[i].type,
                    };
                    $('#list_chart').append('<li class="chart-menu" data-id="' + data[i].id + '"><a>' + data[i].title + '</a></li>');
                }
            }
            wptm_chart();
        });
    }
}

function wptm_chart(first_load) {
    var $ = jquery;
    var $wptm_top_chart = $('#wptm_chart').find('.wptm_left_content .wptm_top_chart');
    $('#list_chart').find('.chart-menu').unbind('click').on('click', function (e) {
        var chart_name = '';
        if (!$(this).data('id')) {
            $(this).closest('.chart-menu').siblings('.chart-menu').removeClass('active');
            var chart_id = $(this).closest('.chart-menu').data('id');
            $(this).closest('.chart-menu').addClass('active');
            chart_name = $(this).text();
        } else {
            $(this).siblings('.chart-menu').removeClass('active');
            var chart_id = $(this).data('id');
            $(this).addClass('active');
            chart_name = $(this).find('a').text();
        }
        $wptm_top_chart.find('.wptm_name_edit').text(chart_name);

        if ($('#inserttable').length > 0) {
            Wptm.chart_active = chart_id;
            if (!$('#inserttable').hasClass('not_change_type')) {
                jquery('#inserttable').data('type', 'chart').attr('data-type', 'chart').text(insert_chart);
            }
            $('#inserttable').removeClass("no_click");
        }

        if(first_load) {
            DropChart.functions.render(chart_id, false, first_load);
        } else {
            DropChart.functions.render(chart_id);
        }
        return false;
    });

    if (typeof Wptm.chart_active !== 'undefined' && parseInt(Wptm.chart_active) > 0) {
        if ($('.over_popup').length > 0) {
            $('.over_popup').hide();
        }
        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].showChartOrTable(true, $('#list_chart').find('.chart-menu[data-id="' + Wptm.chart_active + '"]'));
    }

    $wptm_top_chart.find('.edit').unbind('click').on('click', function (e) {
        $wptm_top_chart.find('.wptm_name_edit').addClass('rename');
        $wptm_top_chart.find('.wptm_name_edit').trigger('click');
    });

    $wptm_top_chart.find('.wptm_name_edit').click(function () {
        if (!$(this).hasClass('editable')) {
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].setText.call(
                $(this),
                $wptm_top_chart.find('.wptm_name_edit'),
                '#wptm_chart .wptm_name_edit',
                {
                    'url': wptm_ajaxurl + "task=chart.setTitle&id=" + DropChart.id_chart + '&title=',
                    'selected': true,
                    'action': function (obj) {
                        if (arguments[0] != '') {
                            $('#list_chart').find('.chart-menu.active a').text(arguments[0]);
                        }
                    }
                }
            );
        }
    });

    $wptm_top_chart.find('.trash').unbind('click').on('click', function (e) {
        var that = this;
        var list_chart = $('#list_chart');

        bootbox.confirm(wptmText.JS_WANT_DELETE + "\"" + $(this).siblings('.wptm_name_edit').text().trim() + '"?', wptmText.Cancel, wptmText.Ok, function (result) {
            if (result === true) {
                $.ajax({
                    url: wptm_ajaxurl + "task=chart.delete&id=" + DropChart.id_chart,
                    type: "POST",
                    data: {},
                    dataType: "json",
                    success: function (datas) {
                        if (datas.response === true) {
                            list_chart.find('li.chart-menu[data-id="' + DropChart.id_chart + '"]').remove();
                            wptm_element.wptmContentChart.find('canvas.wptm_chart_' + DropChart.id_chart).remove();
                            if (list_chart.find('li.chart-menu').length > 1) {
                                list_chart.find('.chart-menu').eq(0).trigger('click');
                            } else {
                                list_chart.find('.current_table').trigger('click');
                            }
                        } else {
                            bootbox.alert(datas.response, wptmText.Ok);
                        }
                    },
                    error: function (jqxhr, textStatus, error) {
                        bootbox.alert(textStatus, wptmText.Ok);
                    }
                });
                return false;
            }
        });
    });
    wptm_element.chartTabContent.find('.copy_shortcode').unbind('click').on('click', function (e) {
        wptm_element.chartTabContent.find('.controls[name="shortcode"] input').select();
        document.execCommand('copy');
    });
    Wptm.dataChart = $.extend([], DropChart.datas);
}

function updateOption(chartData) {
    var $ = jquery;
    //get cell range label to input selected range and add range to handsontable
    var selection = DropChart.helper.getCellRangeLabel(DropChart.cells);
    var cellRangeLabel = Handsontable.helper.spreadsheetColumnLabel(selection[1]) + '' + (selection[0] + 1);
    cellRangeLabel += ":" + Handsontable.helper.spreadsheetColumnLabel(selection[3]) + '' + (selection[2] + 1);
    wptm_element.chartTabContent.find('.cellRangeLabelAlternate').val(cellRangeLabel);
    Wptm.container.handsontable("selectCell", selection[0], selection[1], selection[2], selection[3]);

    if (typeof chartData.type !== 'undefined') {
        wptm_element.chartTabContent.find('.controls[name="type"]').find('img').each(function () {
            $(this).removeClass('active');
            if ($(this).attr('alt') === chartData.type) {
                $(this).addClass('active');
            }
        });

        var $dataset_select = wptm_element.chartTabContent.find('.controls[name="dataset_select"] select');
        var $dataset_color = wptm_element.chartTabContent.find('.controls[name="dataset_color"] input.minicolors');
        $dataset_select.html("");
        if (DropChart.type == "Line" || DropChart.type == "Bar" || DropChart.type == "Radar") {
            for (var i = 0; i < DropChart.datasets.length; i++) {
                $dataset_select.append('<option value="' + i + '">' + DropChart.datasets[i].label + '</option>');
            }
            $dataset_select.trigger('liszt:updated');
            $dataset_color.wpColorPicker('color', DropChart.config.colors.split(",")[0]);
        } else {
            var chartData = {};
            chartData.datasets = DropChart.datasets;
            chartData.labels = DropChart.labels;

            for (var i = 0; i < chartData.labels.length; i++) {
                $dataset_select.append('<option value="' + i + '">' + chartData.labels[i] + '</option>');
            }
            $dataset_select.trigger('liszt:updated');
            $dataset_color.wpColorPicker('color', DropChart.config.pieColors.split(",")[0]);
        }
    }

    if (typeof DropChart.id_chart !== 'undefined') {
        wptm_element.chartTabContent.find('.controls[name="shortcode"] input').val('[wptm id-chart=' + DropChart.id_chart + ']');
    }
    if (typeof DropChart.config.dataUsing !== 'undefined') {
        wptm_element.chartTabContent.find('.controls[name="dataUsing"] select').val(DropChart.config.dataUsing).change();
    }
    if (typeof DropChart.config.useFirstRowAsLabels !== 'undefined') {
        wptm_element.chartTabContent.find('.controls[name="useFirstRowAsLabels"] input')
            .val(DropChart.config.useFirstRowAsLabels === true ? 'yes' : 'no').prop("checked", DropChart.config.useFirstRowAsLabels);
    }
    if (typeof DropChart.config.useFirstRowAsGraph !== 'undefined') {
        wptm_element.chartTabContent.find('.controls[name="useFirstRowAsGraph"] input')
            .val(DropChart.config.useFirstRowAsGraph === true ? 'yes' : 'no').prop("checked", DropChart.config.useFirstRowAsGraph);
    }
    if (typeof DropChart.config.width !== 'undefined') {
        wptm_element.chartTabContent.find('.controls[name="width"] input').val(DropChart.config.width).change();
    }
    if (typeof DropChart.config.height !== 'undefined') {
        wptm_element.chartTabContent.find('.controls[name="height"] input').val(DropChart.config.height).change();
    }
    if (typeof DropChart.config.chart_align !== 'undefined') {
        wptm_element.chartTabContent.find('.controls[name="chart_align"] select').val(DropChart.config.chart_align).change();
        wptm_element.wptmContentChart.css('text-align', DropChart.config.chart_align);
    }
    DropChart.optionsChanged = true;
}

//action option changing
function initChartObserver() {
    if (!(Wptm.can.edit || (Wptm.can.editown && data.author === Wptm.author))) {
        return false;
    }
    var $ = jquery;

    $('#wptm_chart .option_chart').unbind('change').on('change', function (e) {
        if (DropChart.optionsChanged !== true) {
            return;
        }
        var dropChart = DropChart.datas[DropChart.id_chart];

        switch ($(this).parents('.controls').attr('name')) {
            case 'Shortcode':
                break;
            case 'dataUsing':
                dropChart.config.dataUsing = $(this).val();
                // var dataSets = DropChart.functions.getDataSets(DropChart.cells, dropChart.config.dataUsing);
                // DropChart.datasets = addChartStyles(dataSets[0], dropChart.config.colors);  // dataSets[0];
                // if (dropChart.config.useFirstRowAsLabels) {
                //     DropChart.labels = dataSets[1];
                // } else {
                //     DropChart.labels = DropChart.helper.getEmptyArray(dataSets[1].length);
                // }
                DropChart.functions.render(DropChart.id_chart, false, true);
                break;
            case 'useFirstRowAsLabels':
                if ($(this).is(":checked")) {
                    dropChart.config.useFirstRowAsLabels = true;
                } else {
                    dropChart.config.useFirstRowAsLabels = false;
                }
                DropChart.functions.render(DropChart.id_chart, false, true);
                break;
            case 'useFirstRowAsGraph':
                if ($(this).is(":checked")) {
                    dropChart.config.useFirstRowAsGraph = true;
                } else {
                    dropChart.config.useFirstRowAsGraph = false;
                }
                DropChart.functions.render(DropChart.id_chart, false, true);
                break;
            case 'width':
                dropChart.config.width = parseInt($(this).val());
                DropChart.functions.render(DropChart.id_chart, true, true);
                break;
            case 'height':
                dropChart.config.height = parseInt($(this).val());
                DropChart.functions.render(DropChart.id_chart, true, true);
                break;
            case 'chart_align':
                dropChart.config.chart_align = $(this).val();
                if (dropChart.config.chart_align !== 'none') {
                    wptm_element.wptmContentChart.css('text-align', dropChart.config.chart_align);
                } else {
                    wptm_element.wptmContentChart.css('text-align', 'left');
                }
                break;
            case 'dataset_select':
                var index = parseInt($(this).val());
                var $dataset_color = wptm_element.chartTabContent.find('.controls[name="dataset_color"] input.minicolors');
                dropChart.change_dataset_select = true;
                if (DropChart.type == "Line" || DropChart.type == "Bar" || DropChart.type == "Radar") {
                    if (dropChart.config.colors.split(",").length > index) {
                        $dataset_color.wpColorPicker('color', dropChart.config.colors.split(",")[index]);
                    } else {
                        $dataset_color.wpColorPicker('color', "");
                    }
                } else {
                    if (dropChart.config.pieColors.split(",").length > index) {
                        $dataset_color.wpColorPicker('color', dropChart.config.pieColors.split(",")[index]);
                    } else {
                        $dataset_color.wpColorPicker('color', "");
                    }
                }
                break;
            case 'dataset_color':
                var index = parseInt(wptm_element.chartTabContent.find('.controls[name="dataset_select"] select').val());
                if (DropChart.type == "Line" || DropChart.type == "Bar" || DropChart.type == "Radar") {
                    var colors = dropChart.config.colors.split(",");
                    colors[index] = $(this).val();
                    dropChart.config.colors = colors.join(",");
                    // var dataSets = DropChart.functions.getDataSets(DropChart.cells, dropChart.config.dataUsing);
                    // if (typeof DropChart.config.useFirstRowAsGraph !== 'undefined' && DropChart.config.useFirstRowAsGraph !== true) {//remove first row/column
                    //     dataSets[0].shift();
                    // }
                    // DropChart.datasets = addChartStyles(dataSets[0], dropChart.config.colors);
                } else {
                    var pieColors = dropChart.config.pieColors.split(",");
                    if (pieColors.length <= index) {
                        var maxLabels = DropChart.labels.length;
                        var maxPieColors = pieColors.length;
                        var i;
                        for (i = 0; i < maxLabels; i++) {
                            pieColors[i] = pieColors[i % maxPieColors];
                        }
                    }
                    pieColors[index] = $(this).val();
                    dropChart.config.pieColors = pieColors.join(",");
                }
                if (dropChart.change_dataset_select === true) {
                    dropChart.change_dataset_select = false;
                } else {
                    DropChart.functions.render(DropChart.id_chart, true, true);
                }
                break;
            default:
                break;
        }
    });

    $('#wptm_chart .option_chart').unbind('click').on('click', function (e) {
        if (DropChart.optionsChanged !== true) {
            return;
        }
        var dropChart = DropChart.datas[DropChart.id_chart];

        switch ($(this).parents('.controls').attr('name')) {
            case 'type':
                changeStyleChart($(this).data('id'));
                break;
            case 'changerChart':
                _alternating__WEBPACK_IMPORTED_MODULE_1__["default"].affterRangeLabe.call(wptm_element.chartTabContent, window.Wptm, window.jquery);
                changerRangeChart();
                break;
            default:
                break;
        }
    });
}

function changeStyleChart(charttype_id) {
    var $ = jquery;
    var id_chart = DropChart.id_chart;
    $.ajax({
        url: wptm_ajaxurl + "view=charttype&format=json&id=" + charttype_id,
        type: 'POST',
        data: {}
    }).done(function (data) {
        if (typeof (data) === 'object') {
            //local save
            if (data.config !== '') {
                $.extend(DropChart.datas[id_chart].config, $.parseJSON(data.config));
            }
            DropChart.datas[id_chart].type = data.name;

            DropChart.functions.render(id_chart, false, true);
        }
    });
}

function changerRangeChart() {
    var $ = jquery;
    var id_chart = DropChart.id_chart;
    var dataChart = DropChart.datas[id_chart];

    var dataCell = DropChart.functions.validateChartData();
    if (dataCell === false) {
        bootbox.alert(wptmText.CHART_INVALID_DATA, wptmText.GOT_IT);
    } else {
        dataChart.data = dataCell;
        DropChart.changer = true;
        DropChart.functions.render(id_chart, false, true);
    }
}

function convertForPie(dataSets, useFirstRowAsLabels, colors, dataUsing) {
    var result = {};
    result.datasets = [];

    if (typeof dataSets.data === 'undefined' || dataSets.data.length < 1) {
        return false;
    }

    var numberLine, countDatasets, dataSet, pieColors;

    numberLine = dataSets.data.length;
    countDatasets = dataSets.data[0].length;
    for (var i = 0; i < numberLine; i++) {
        dataSet = jquery.extend({}, {});
        dataSet.label = dataSets.graphLabel[i];
        dataSet.currency_symbol = dataSets.currency_symbol[i];
        if (typeof dataSets.data2 !== 'undefined' && typeof dataSets.data2[i] !== 'undefined') {
            dataSet.data_format = dataSets.data2[i];
        } else {
            dataSet.data_format = dataSets.data[i];
        }
        result.labels = jquery.extend([], []);
        pieColors = jquery.extend({}, {});

        if (dataUsing === 'pieColors') {
            dataSet.highlight = [];
            dataSet.backgroundColor = [];
            dataSet.borderColor = [];
            dataSet.pointBackgroundColor = [];
            dataSet.pointColor = [];
            dataSet.pointBorderColor = [];
            dataSet.pointHighlightFill = [];
        }

        for (var j = 0; j < countDatasets; j++) {
            if (!(typeof dataSets.deleteData !== 'undefined'
                && ((typeof dataSets.arrayShiftData !== 'undefined' && typeof dataSets.deleteData[j + 1] !== 'undefined' && dataSets.deleteData[j + 1] !== 0)
                    || (typeof dataSets.arrayShiftData !== 'undefined' && typeof dataSets.deleteData[j] !== 'undefined' && dataSets.deleteData[j] !== 0))
            )
            ) {//thoa man
                if (typeof dataSet.data === 'undefined') {
                    dataSet.data = [];
                }
                dataSet.data.push(dataSets.data[i][j]);//data da duoc remove tu truoc

                if (useFirstRowAsLabels) {
                    result.labels.push(dataSets.axisLabels[j]);
                } else {
                    result.labels.push('');
                }

                if (dataUsing === 'pieColors') {
                    pieColors = getStyleSet(j, colors);
                    dataSet.highlight.push(pieColors.highlight);
                    dataSet.backgroundColor.push(pieColors.backgroundColor);
                    dataSet.borderColor.push(pieColors.borderColor);
                    dataSet.pointBackgroundColor.push(pieColors.pointBackgroundColor);
                    dataSet.pointColor.push(pieColors.pointColor);
                    dataSet.pointBorderColor.push(pieColors.pointBorderColor);
                    dataSet.pointHighlightFill.push(pieColors.pointHighlightFill);
                }
            }
        }
        if (dataUsing !== 'pieColors') {
            pieColors = getStyleSet(i, colors);
            dataSet = jquery.extend({}, dataSet, pieColors);
        }
        result.datasets[i] = dataSet;
    }

    return result;
}

function getStyleSet(i, colors) {
    var styleSet = {};

    var color = getColor(i, colors);
    if (color != "") {
        styleSet.highlight = DropChart.helper.ColorLuminance(color, 0.3);
        styleSet.backgroundColor = DropChart.helper.convertHex(color, 20);
        styleSet.borderColor = DropChart.helper.convertHex(color, 50);
        styleSet.pointBackgroundColor = DropChart.helper.convertHex(color, 100);
        styleSet.pointColor = "#fff";
        styleSet.pointHighlightFill = "#fff";
        styleSet.pointBorderColor = DropChart.helper.convertHex(color, 100);
    }

    return styleSet;
}

function getColor(i, colors) {
    var result = "";
    var arrColors = colors.split(",");
    var len = arrColors.length;
    if (len > 0) {
        result = arrColors[i % len];
    }

    return result;
}

function addChartStyles(dataSets, colors) {
    var result = [];
    var dataset, styleSet;

    for (var i = 0; i < dataSets.length; i++) {
        dataset = dataSets[i];
        styleSet = getStyleSet(i, colors);
        jquery.extend(dataset, styleSet);
        result.push(dataset);
    }

    return result;
}

DropChart.functions.addChart = function () {
    if ((typeof idTable !== 'undefined' && idTable !== '') || table_function_data.selectionSize < 2) {
        var $ = jquery;
        var selection = DropChart.functions.validateChartData();

        if (selection === false) {
            bootbox.alert(wptmText.CHART_INVALID_DATA + '<img src="' + wptm_admin_asset + '/images/Create-chart.gif" style="width: 100%;margin-top: 20px"/>', wptmText.GOT_IT);
            return;
        }

        $.ajax({
            url: wptm_ajaxurl + "task=chart.add&id_table=" + idTable,
            type: "POST",
            dataType: "json",
            data: {datas: JSON.stringify(selection)},
            beforeSend: function () {
                wptm_element.settingTable.find('.ajax_loading').addClass('loadding').removeClass('wptm_hiden');
                wptm_element.primary_toolbars.find('.new_chart_menu').closest('li').addClass('menu_loading');
            },
            success: function (datas) {
                wptm_element.settingTable.find('.ajax_loading').removeClass('loadding').addClass('wptm_hiden');
                if (datas.response === true) {
                    var count = $('#list_chart').find('li.chart-menu').length;
                    var data_chart = datas.datas;
                    $('#list_chart').append('<li class="chart-menu" data-id="' + data_chart.id + '"><a>' + data_chart.title + '</a></li>');
                    DropChart.datas[data_chart.id] = {
                        config: DropChart.default,
                        data: $.parseJSON(data_chart.datas),
                        title: data_chart.title,
                        type: "Line",
                    };
                    wptm_chart(true);
                    _functions__WEBPACK_IMPORTED_MODULE_0__["default"].showChartOrTable(true, $('#list_chart').find('.chart-menu').eq(count));
                } else {
                    bootbox.alert(datas.response, wptmText.Ok);
                }
            },
            error: function (jqxhr, textStatus, error) {
                wptm_element.settingTable.find('.ajax_loading').removeClass('loadding').addClass('wptm_hiden');
                bootbox.alert(textStatus + " : " + error, wptmText.Ok);
            }
        });
    } else {
        bootbox.alert(wptmText.CHART_INVALID_DATA, wptmText.GOT_IT);
    }
}

DropChart.functions.render = function (chart_id, re_render, save_chart) {
    var $ = jquery;
    DropChart.id_chart = chart_id;
    var datas = DropChart.datas[chart_id];
    DropChart.cells = datas.data;
    DropChart.type = datas.type;

    try {
        DropChart.config = $.extend({}, DropChart.default, datas.config);
    } catch (e) {
        DropChart.config = $.extend({}, DropChart.default, $.parseJSON(datas.config));
    }

    if (datas.config === null) {
        datas.config = $.extend({}, DropChart.default);
    }

    //destroy old chart version
    if (DropChart.chart) {
        DropChart.chart.clear();
        DropChart.chart.destroy();
    }

    var chartData = {};

    var dataSets = DropChart.functions.getDataSets2(DropChart.cells, DropChart.config.dataUsing);

    var change_dataUsing = false;
    if (typeof dataSets.data === 'undefined' || dataSets.data.length < 1) {
        if (DropChart.config.dataUsing === 'column') {
            DropChart.config.dataUsing = 'row';
            datas.config.dataUsing = 'row';
        } else {
            DropChart.config.dataUsing = 'column';
            datas.config.dataUsing = 'column';
        }

        dataSets = DropChart.functions.getDataSets2(DropChart.cells, DropChart.config.dataUsing);

        // chartData.datasets = addChartStyles(dataSets[0], DropChart.config.colors);
        change_dataUsing = true;
    }

    var chartData;
    switch (DropChart.type) {
        case 'PolarArea':
        case 'Pie':
        case 'Doughnut':
            chartData = convertForPie(dataSets, DropChart.config.useFirstRowAsLabels, DropChart.config.pieColors, 'pieColors');
            break;
        case 'Bar':
        case 'Radar':
        case 'Line':
        default:
            chartData = convertForPie(dataSets, DropChart.config.useFirstRowAsLabels, DropChart.config.colors, 'colors');
            break;
    }
    if (change_dataUsing) {
        wptm_element.chartTabContent.find('.controls[name="dataUsing"] span.wptm_notice').show();
        setTimeout(function () {
            wptm_element.chartTabContent.find('.controls[name="dataUsing"] span.wptm_notice').hide();
        }, 2000);
    }

    //hiden all canvas except chart_id
    wptm_element.wptmContentChart.find('.canvas').addClass('wptm_hiden');
    var $canvas = wptm_element.wptmContentChart.find('canvas.wptm_chart_' + chart_id);
    if ($canvas.length < 1 || re_render) {
        $canvas.remove();
        $canvas = $('<canvas class="canvas wptm_chart_' + chart_id + '" width="' + DropChart.config.width + '" height="' + DropChart.config.height + '"   ><canvas>')
            .appendTo(wptm_element.wptmContentChart);
    } else {
        $canvas.width(DropChart.config.width);
        $canvas.height(DropChart.config.height);
    }
    $canvas.removeClass('wptm_hiden');
    var ctx = $canvas.get(0).getContext("2d");

    DropChart.labels = chartData.labels;
    DropChart.datasets = chartData.datasets;
    if (DropChart.datasets.length > 0) {
        DropChart.config.tooltips = {
            enabled: true, mode: 'single', callbacks: {
                label: function (tooltipItems, data) {
                    var label = '';

                    if (data.useFirstRowAsLabels) {
                        if (data.datasets.length > 1) {
                            label = data.datasets[tooltipItems.datasetIndex].label || '';
                        } else if (tooltipItems.label === '') {
                            label = data.labels[tooltipItems.index] || '';
                        }

                        if (label) {
                            label += ': ';
                        }
                    }

                    // var dataCell = data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index];
                    // if (data.datasets[tooltipItems.datasetIndex].currency_symbol === 1) {
                    //     label += tableFunction.formatSymbols(dataCell, Wptm.style.table.decimal_count, Wptm.style.table.thousand_symbol, Wptm.style.table.decimal_symbol, Wptm.style.table.symbol_position, Wptm.style.table.currency_symbol);
                    // } else {
                    //     label += tableFunction.formatSymbols(dataCell, Wptm.style.table.decimal_count, Wptm.style.table.thousand_symbol, Wptm.style.table.decimal_symbol, Wptm.style.table.symbol_position, '');
                    // }
                    if (typeof data.datasets[tooltipItems.datasetIndex].data_format[tooltipItems.index] !== 'undefined') {
                        label += data.datasets[tooltipItems.datasetIndex].data_format[tooltipItems.index];
                    } else {
                        label += data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index];
                    }
                    return label;
                }
            }
        };
    } else {
        bootbox.alert(wptmText.CHART_INVALID_DATA, wptmText.GOT_IT);
    }
    try {
        chartData.useFirstRowAsLabels = DropChart.config.useFirstRowAsLabels;
        DropChart.config.scaleBeginAtZero = false;//fix the original value of the shaft
        DropChart.config.responsive = false;//fix the original value of the shaft
        switch (DropChart.type) {
            case 'PolarArea':
                DropChart.chart = new wptmChart(ctx, {
                    type: 'polarArea',
                    data: chartData,
                    options: DropChart.config
                });
                break;

            case 'Pie':
                DropChart.chart = new wptmChart(ctx, {
                    type: 'pie',
                    data: chartData,
                    options: DropChart.config
                });
                break;

            case 'Doughnut':
                DropChart.chart = new wptmChart(ctx, {
                    type: 'doughnut',
                    data: chartData,
                    options: DropChart.config
                });
                break;

            case 'Bar':
                DropChart.chart = new wptmChart(ctx, {
                    type: 'bar',
                    data: chartData,
                    options: DropChart.config
                });
                break;

            case 'Radar':
                DropChart.chart = new wptmChart(ctx, {
                    type: 'radar',
                    data: chartData,
                    options: DropChart.config
                });
                break;

            case 'Line':
            default:
                DropChart.chart = new wptmChart(ctx, {
                    type: 'line',
                    data: chartData,
                    options: DropChart.config
                });
                break;
        }

        DropChart.optionsChanged = false;
        //update val of selector to chart option
        if (!re_render) {
            updateOption(datas);
        } else {
            DropChart.optionsChanged = true;
        }
        initChartObserver();
        if (save_chart) {
            DropChart.functions.save();
        }
    } catch (e) {}
}

DropChart.functions.save = function () {
    if (!(Wptm.can.edit || (Wptm.can.editown && data.author === Wptm.author))) {
        return;
    }

    var $ = jQuery;
    var jsonVar = {
        jform: {
            type: DropChart.type,
            config: JSON.stringify(DropChart.config)
        },
        id: DropChart.id_chart
    };

    if (DropChart.changer === true) {
        jsonVar.jform.datas = JSON.stringify(DropChart.cells);
        DropChart.changer = false;
    }
    var $saving = $('.wptm_top_chart .saving');
    $saving.html(wptmText.SAVING);
    $saving.animate({'opacity': '1'}, 200);
    $.ajax({
        url: wptm_ajaxurl + "task=chart.save",
        dataType: "json",
        type: "POST",
        data: jsonVar,
        success: function (datas) {
            if (datas.response === true) {
                $saving.html(wptmText.ALL_CHANGES_SAVED).delay(500).animate({'opacity': '0'}, 200);
            } else {
                $saving.animate({'opacity': '0'}, 200);
                bootbox.alert(datas.response, wptmText.Ok);
            }
        },
        error: function (jqxhr, textStatus, error) {
            $saving.animate({'opacity': '0'}, 200);
            bootbox.alert(textStatus + " : " + error, wptmText.Ok);
        }
    });
}

DropChart.functions.getDataSets = function (cells, dataUsing) {
    DropChart.currency_symbol = typeof Wptm.style.table.currency_symbol === 'undefined'
        ? default_value.currency_symbol
        : Wptm.style.table.currency_symbol;
    DropChart.thousand_symbol = typeof Wptm.style.table.thousand_symbol === 'undefined'
        ? default_value.thousand_symbol
        : Wptm.style.table.thousand_symbol;
    DropChart.decimal_symbol = typeof Wptm.style.table.decimal_symbol === 'undefined'
        ? default_value.decimal_symbol
        : Wptm.style.table.decimal_symbol;

    var result = {};
    var axisLabels = [];
    var deleteLine = [];

    if (!dataUsing) {
        dataUsing = "row";
    }
    var cellsData = DropChart.helper.getRangeData(cells);

    if (cellsData.length === 0) {
        return false;
    }
    if (dataUsing !== "row") {//default get cell data by row then need to change
        cellsData = DropChart.helper.transposeArr(cellsData);
    }

    result.deleteData = [];
    result.data = [];
    result.graphLabel = [];
    result.axisLabels = [];
    result.currency_symbol = [];

    var checkCellsHaveNaN, countCellInLine, cellsData1, deleteData1, currency_symbol, lineData, getStrangeCharacters, j;
    for (var i = 0; i < cellsData.length; i++) {
        checkCellsHaveNaN = 0;
        countCellInLine = cellsData[i].length;
        cellsData1 = jquery.extend([], []);
        deleteData1 = jquery.extend([], []);
        currency_symbol = 0;

        lineData = jquery.extend([], cellsData[i]);
        // lineData.shift();
        for (var ii = 0; ii < countCellInLine; ii++) {
            getStrangeCharacters = DropChart.helper.getStrangeCharacters(cellsData[i][ii]);
            checkCellsHaveNaN += getStrangeCharacters['NaN'];
            cellsData1[ii] = getStrangeCharacters['value'];

            if (getStrangeCharacters['delete'] === 1) {
                deleteData1[ii] = 1;
            }

            if (typeof getStrangeCharacters['currency_symbol'] !== 'undefined' && getStrangeCharacters['currency_symbol'] === 1) {
                currency_symbol++;
            }
        }

        if (checkCellsHaveNaN === countCellInLine || (countCellInLine > 2 && checkCellsHaveNaN + 2 > countCellInLine)) {//line Have NaN
            axisLabels.push(cellsData[i]);
            deleteLine.push(i);
        } else {//get this line, that have cell value
            for (j in deleteData1) {
                if (typeof result.deleteData[j] === 'undefined') {
                    result.deleteData[j] = 0;
                }
                result.deleteData[j] += 1;
            }
            result.data.push(cellsData1);//array key 1, 2, 3,...|| in $cellsData1, may contain non-validated cells
            result.graphLabel.push(cellsData[i][0]);//array key 1, 2, 3,...||$value[0] first value

            if (currency_symbol > 1) {
                result.currency_symbol.push(1);
            } else {
                result.currency_symbol.push(-1);
            }
        }
    }

    var numberLine = result.data.length;
    if (numberLine > 0) {
        var useFirstRowAsGraph = typeof DropChart.config.useFirstRowAsGraph !== 'undefined' ? DropChart.config.useFirstRowAsGraph : true;
        //if line number > 1 then not get cell is graphLabel else < 1 then get it
        if (numberLine > 1 && cellsData.length > 1 && !(cellsData.length === 2 && useFirstRowAsGraph !== true)) {//have > 1 line in chart
            for (var i2 = 0; i2 < numberLine; i2++) {
                result.data[i2].shift();
            }
            result.arrayShiftData = true;

            if (typeof result.deleteData[0] !== 'undefined' && result.deleteData[j] !== 0) {
                result.deleteData[0] = 0;
            }
        }

        if (axisLabels.length > 0) {//useFirstRowAsGraph become useless
            result.axisLabels = axisLabels[0];
        } else {
            if (numberLine > 0) {//axisLabels from $cellsData[0] || all line be passed validated
                result.axisLabels = cellsData[0];
                if (useFirstRowAsGraph !== true) {
                    result.data.shift();
                    result.currency_symbol.shift();
                    result.graphLabel.shift();
                }
            }
        }

        if (typeof result.arrayShiftData !== 'undefined') {
            result.axisLabels.shift();
        }

        for (var j2 in result.deleteData) {//not deleted yet cells not pass
            if (numberLine !== result.deleteData[j2]) {
                result.deleteData[j2] = 0;
            }
        }

        for (var i3 = 0; i3 < result.data.length; i3++) {
            result.data[i3] = DropChart.helper.convertToNumber(result.data[i3]);
        }
    }

    return result;
}

DropChart.functions.getDataSets2 = function (cells, dataUsing) {
    DropChart.currency_symbol = typeof Wptm.style.table.currency_symbol === 'undefined'
        ? default_value.currency_symbol
        : Wptm.style.table.currency_symbol;
    DropChart.thousand_symbol = typeof Wptm.style.table.thousand_symbol === 'undefined'
        ? default_value.thousand_symbol
        : Wptm.style.table.thousand_symbol;
    DropChart.decimal_symbol = typeof Wptm.style.table.decimal_symbol === 'undefined'
        ? default_value.decimal_symbol
        : Wptm.style.table.decimal_symbol;


    var result = {};
    var axisLabels = [];
    var deleteLine = [];

    if (!dataUsing) {
        dataUsing = "row";
    }

    result.deleteData = [];
    result.data = [];
    result.data2 = [];
    result.data_raw = [];
    result.data_raw1 = [];
    result.graphLabel = [];
    result.axisLabels = [];
    result.currency_symbol = [];

    if (dataUsing !== "row") {//default get cell data by row then need to change
        cells = DropChart.helper.transposeArr(cells);
    }

    var cell_value, j, checkCellsHaveNaN, countCellInLine, cellsData1, cellsData2, deleteData1, currency_symbol, lineData, getStrangeCharacters;
    for (var i = 0; i < cells.length; i++) {
        checkCellsHaveNaN = 0;
        countCellInLine = cells[i].length;
        cellsData2 = jquery.extend([], []);
        cellsData1 = jquery.extend([], []);
        result.data_raw[i] = jquery.extend([], []);
        result.data_raw1[i] = jquery.extend([], []);
        deleteData1 = jquery.extend([], []);
        currency_symbol = 0;
        lineData = jquery.extend([], cells[i]);

        for (var ii = 0; ii < countCellInLine; ii++) {
            j =  cells[i][ii];
            j = j.split(":");
            cell_value = typeof Wptm.datas[parseInt(j[0])][parseInt(j[1])] !== 'undefined' && Wptm.datas[parseInt(j[0])][parseInt(j[1])] !== null ? Wptm.datas[parseInt(j[0])][parseInt(j[1])] : '';
            cell_value = _customRenderer__WEBPACK_IMPORTED_MODULE_2__["default"].render(false, false, parseInt(j[0]), parseInt(j[1]), false, cell_value, 'cellProperties', true);
            result.data_raw[i].push(cell_value[0]);
            result.data_raw1[i].push(cell_value[1]);
            cell_value = DropChart.helper.getStrangeCharacters2(cell_value, typeof cell_value[1] !== 'undefined');
            //[0] value format, [1] float value, [2] Nan, [3] currency_symbol
            checkCellsHaveNaN += cell_value[2];
            cellsData2[ii] = cell_value[0];
            cellsData1[ii] = cell_value[1];

            if (cell_value[2] === 1) {
                deleteData1[ii] = 1;
            }

            if (typeof cell_value[3] !== 'undefined' && cell_value[3] === 1) {
                currency_symbol++;
            }
        }

        if (checkCellsHaveNaN === countCellInLine || (countCellInLine > 2 && checkCellsHaveNaN + 2 > countCellInLine)) {//line Have NaN
            axisLabels.push(cellsData2);
            deleteLine.push(i);
        } else {//get this line, that have cell value
            for (j in deleteData1) {
                if (typeof result.deleteData[j] === 'undefined') {
                    result.deleteData[j] = 0;
                }
                result.deleteData[j] += 1;
            }
            result.data.push(cellsData1);//array key 1, 2, 3,...|| in $cellsData1, may contain non-validated cells
            result.data2.push(cellsData2);//array key 1, 2, 3,...|| in $cellsData1, may contain non-validated cells
            result.graphLabel.push(cellsData2[0]);//array key 1, 2, 3,...||$value[0] first value

            if (currency_symbol > 1) {
                result.currency_symbol.push(1);
            } else {
                result.currency_symbol.push(-1);
            }
        }
    }

    var numberLine = result.data.length;
    if (numberLine > 0) {
        var useFirstRowAsGraph = typeof DropChart.config.useFirstRowAsGraph !== 'undefined' ? DropChart.config.useFirstRowAsGraph : true;
        //if line number > 1 then not get cell is graphLabel else < 1 then get it
        if (numberLine > 1 && result.data_raw.length > 1 && !(result.data_raw.length === 2 && useFirstRowAsGraph !== true)) {//have > 1 line in chart
            for (var i2 = 0; i2 < numberLine; i2++) {
                result.data[i2].shift();
                result.data2[i2].shift();
            }
            result.arrayShiftData = true;

            if (typeof result.deleteData[0] !== 'undefined' && result.deleteData[j] !== 0) {
                result.deleteData[0] = 0;
            }
        }

        if (axisLabels.length > 0) {//useFirstRowAsGraph become useless
            result.axisLabels = axisLabels[0];
        } else {
            if (numberLine > 0) {//axisLabels from $result.data_raw[0] || all line be passed validated
                result.axisLabels = result.data_raw[0];
                if (useFirstRowAsGraph !== true) {
                    result.data.shift();
                    result.data2.shift();
                    result.currency_symbol.shift();
                    result.graphLabel.shift();
                }
            }
        }

        if (typeof result.arrayShiftData !== 'undefined') {
            result.axisLabels.shift();
        }

        for (var j2 in result.deleteData) {//not deleted yet cells not pass
            if (numberLine !== result.deleteData[j2]) {
                result.deleteData[j2] = 0;
            }
        }
    }

    return result;
}

//get valid chart data area
// return: valid data , col indexes, row indexes
DropChart.functions.getValidChartData = function (cellsData) {
    var i, tempIndexes;
    var results = [];
    var resultIndexes = [];
    var rowIndexes = [];
    for (i = 0; i < cellsData[0].length; i++) {
        resultIndexes.push(i);
    }

    for (i = 0; i < cellsData.length; i++) {
        if (DropChart.helper.isValidRow(cellsData[i])) {
            results.push(cellsData[i]);
            rowIndexes.push(i);
            tempIndexes = DropChart.helper.getValidIndexes(cellsData[i]);
            resultIndexes = DropChart.helper.intersection(tempIndexes, resultIndexes);
        }
    }
    var tempArr = [];

    for (i = 0; i < results.length; i++) {
        tempArr = [];
        for (var j = 0; j < tempIndexes.length; j++) {
            tempArr.push(results[i][tempIndexes[j]]);
        }
        results[i] = tempArr;
    }
    return [results, resultIndexes, rowIndexes];
}

DropChart.functions.checkValidRowData = function (array) {
    return !array.some(function (value, index, array) {
        return value !== array[0];
    });
}

DropChart.functions.validateChartData = function () {
    var selection = table_function_data.selection[0], rValid, cValid, emptyRow;
    //no cell selected or only one cell
    if (selection.length == 0 || selection[0] == selection[2] || selection[1] == selection[3]) {
        return false;
    }

    var cellRange = new Array();
    var Cells = Wptm.container.handsontable('getData', selection[0], selection[1], selection[2], selection[3]);
    //Check row
    rValid = DropChart.helper.hasNumbericRow(Cells);
    var rCells;
    if (!rValid) {
        //check column
        rCells = DropChart.helper.transposeArr(Cells);
        cValid = DropChart.helper.hasNumbericRow(rCells);

        if (!cValid) { //ignore first row and column
            cValid = DropChart.helper.hasNumbericRowCol(rCells[0]);
            if (!cValid) {
                cValid = DropChart.helper.hasNumbericRowCol(rCells[1]);
            }
            var subCells = DropChart.helper.removeFirstRowColumn(rCells);
            if (subCells.length <= 0) return false;
        }
    }

    if (rValid || cValid) {
        //read data
        for (var r = 0; r < Cells.length; r++) {
            if (!DropChart.functions.checkValidRowData(Cells[r])) {
                cellRange[r] = new Array();
                for (var c = 0; c < Cells[r].length; c++) {
                    cellRange[r][c] = (selection[0] + r) + ":" + (selection[1] + c);
                }
            }
        }
        var newCellRange = cellRange.filter(function (el) {
            return el != null && el !== '';
        });
        return newCellRange;
    } else {
        return false;
    }
}

//check val of cells to chart of table
DropChart.functions.validateCharts = function (change) {
    var result = true;
    var $ = jQuery;
    var editCell = change[0] + ":" + change[1];

    $.each(DropChart.datas, function (chart_id, chart) {
        if (chart_id) {
            var cells = chart.data;
            if (DropChart.helper.inArrays(editCell, cells)) {
                var cellsData = [];
                for (var i = 0; i < cells.length; i++) {
                    var rowData = [];
                    for (var j = 0; j < cells[i].length; j++) {
                        if (cells[i][j] != editCell) {
                            rowData[j] = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getCellData(cells[i][j]);
                        } else {
                            rowData[j] = change[3];//new value
                        }
                    }
                    cellsData[i] = rowData;
                }

                if (!validateDataForChart(cellsData)) {
                    result = false;
                }
            }
        }
    });

    return result;
}

function validateDataForChart(Cells) {
    var rValid, rCells, cValid, subCells, rsubCells;
    //Check row
    rValid = DropChart.helper.hasNumbericRow(Cells);
    if (!rValid) {
        //check column
        rCells = DropChart.helper.transposeArr(Cells);
        cValid = DropChart.helper.hasNumbericRow(rCells);
        if (!cValid) { //ignore first row and column

            subCells = DropChart.helper.removeFirstRowColumn(rCells);
            if (subCells.length <= 0) return false;

            rValid = DropChart.helper.hasNumbericRow(subCells);
            if (!rValid) {
                rsubCells = DropChart.helper.transposeArr(subCells);
                cValid = DropChart.helper.hasNumbericRow(rsubCells);
            }
        }
    }

    return (rValid || cValid);
}

DropChart.helper = {}

DropChart.helper.getStrangeCharacters2 = function (value) {
    var value1, value0;
    value0 = typeof value[1] !== 'undefined' ? value[1].toString().replaceAll(' ', '') : value[0].replaceAll(' ', '');
    value1 = value0.replace(DropChart.currency_symbol, '');
    value1 = value1.replace(DropChart.thousand_symbol, '');
    value1 = value1.replace(DropChart.decimal_symbol, '.');
    value[1] = value1.replace(/[^0-9|\\.|-]/g, '');//value

    value[2] = 0;//nan
    value[3] = 0;//currency_symbol
    value1 = value1.replace(/[0-9|\\.|,|-| ]/g, '');

    if (value1 !== '' || value[0] === '') {//have strange characters or is null
        value[2] = 1;
    }
    if (value[0] !== '' && (value[0].includes(DropChart.currency_symbol) || arguments[1] === true)) {
        value[3] = 1;
    }

    return value;
}

DropChart.helper.getStrangeCharacters = function (value) {
    var data = [], value1;
    value1 = value.replace(DropChart.currency_symbol, '');
    value1 = value1.replace(DropChart.thousand_symbol, '.');
    value1 = value1.replace(DropChart.decimal_symbol, '');
    data['value'] = value1.replace(/[^0-9|\\.|-]/g, '');
    data['NaN'] = 0;
    data['delete'] = 0;
    value1 = value1.replace(/[0-9|\\.|,|-| ]/g, '');
    if (value1 !== '' || value === '') {//have strange characters or is null
        data['NaN'] = 1;
        data['delete'] = 1;
    }
    if (data['value'] !== '' && value !== '' && value.includes(DropChart.currency_symbol)) {
        data['currency_symbol'] = 1;
    }

    return data;
}

//get index of valid number in the array
DropChart.helper.getValidIndexes = function (arr) {
    var currency_symbol = typeof Wptm.style.table.currency_symbol === 'undefined'
        ? default_value.currency_symbol
        : Wptm.style.table.currency_symbol;
    var thousand_symbol = typeof Wptm.style.table.thousand_symbol === 'undefined'
        ? default_value.thousand_symbol
        : Wptm.style.table.thousand_symbol;

    // var thousand_re = new RegExp(thousand_symbol,"g");
    var thousand_re = new RegExp('[' + thousand_symbol + ']', "g");
    var i, v, x1;
    var result = [];

    for (i = 0; i < arr.length; i++) {

        v = arr[i] ? arr[i].toString() : "";
        x1 = v.replace(currency_symbol, '');
        x1 = x1.replace(thousand_re, '');
        x1 = x1.replace(/[\\.|+|,| ]/g, '');
        x1 = x1.replace(/-/g, '');
        x1 = x1.replace(/[0-9]/g, '');
        if (x1 === '') {
            result.push(i);
        }
    }
    return result;
}

//get intersection values of two array
DropChart.helper.intersection = function (a, b) {
    var rs = [];
    for (var i = 0; i < a.length; i++) {
        if (b.indexOf(a[i]) != -1) {
            rs.push(a[i]);
        }
    }
    return rs;
};


DropChart.helper.isNumbericArray = function (arr) {
    var valid = true;
    for (var c = 0; c < arr.length; c++) {
        if (isNaN(arr[c])) {
            valid = false;
        }
    }

    return valid;
};

DropChart.helper.convertToNumber = function (arr) {
    var result = [];
    for (var c = 0; c < arr.length; c++) {
        // if (!isNaN(arr[c])) {
        if (typeof arr[c] === 'string') {
            arr[c] = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].stringReplace(arr[c], false);
        }
        result.push(arr[c]);
        // }
    }
    return result;
};

DropChart.helper.transposeArr = function (arr) {
    if (typeof arr === "undefined" || arr.length === 0) {
        return [];
    }
    return Object.keys(arr[0]).map(function (c) {
        return arr.map(function (r) {
            return r[c];
        });
    });
}
DropChart.helper.inArrays = function (c, cells) {
    var result = false;
    for (var r = 0; r < cells.length; r++) {
        if (cells[r].indexOf(c) > -1) {
            result = true;
        }
    }

    return result;
}


// there is at least 2 number
DropChart.helper.isValidRow = function (arr) {
    var currency_symbol = typeof Wptm.style.table.currency_symbol === 'undefined'
        ? default_value.currency_symbol
        : Wptm.style.table.currency_symbol;
    var thousand_symbol = typeof Wptm.style.table.thousand_symbol === 'undefined'
        ? default_value.thousand_symbol
        : Wptm.style.table.thousand_symbol;

    var thousand_re = new RegExp('[' + thousand_symbol + ']', "g");
    var i, v, x1, count = 0;

    for (i = 0; i < arr.length; i++) {
        v = arr[i] ? arr[i].toString() : "";
        if (v !== '') {
            x1 = v.replace(currency_symbol, '');
            x1 = x1.replace(thousand_re, '');
            x1 = x1.replace(/[\\.|+|,| ]/g, '');
            x1 = x1.replace(/-/g, '');
            x1 = x1.replace(/[0-9]/g, '');
            if (x1 === '') {
                count++;
            }
        }
    }
    return (count > 1);
}

DropChart.helper.hasNumbericRow = function (Cells) {
    var rValid = false;
    if (typeof Cells === "undefined") {
        return false;
    }

    for (var r = 0; r < Cells.length; r++) {
        if (DropChart.helper.isValidRow(Cells[r])) {
            rValid = true;
            break;
        }
    }
    return rValid;
}

// check val int cel in row
DropChart.helper.hasNumbericRowCol = function (Cells) {
    var rValid = true;
    var rNaN = 0;
    if (typeof Cells === "undefined") {
        return false;
    }
    for (var r = 0; r < Cells.length; r++) {
        var valid = true;
        if (typeof (Cells[r]) === 'string' && isNaN(parseInt(_functions__WEBPACK_IMPORTED_MODULE_0__["default"].stringReplace(Cells[r], false)))) {
            valid = false;
        }

        if (!valid) {
            rNaN++;
        }
    }

    if (rNaN === Cells.length) {
        rValid = false;
    }
    return rValid;
}

DropChart.helper.getRowData = function (row) {
    var data = [];
    for (var j = 0; j < row.length; j++) {
        data[j] = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getCellData(row[j]);
    }

    return data;
}

DropChart.helper.getRangeData = function (cells) {
    var datas = [];
    for (var i = 0; i < cells.length; i++) {
        datas[i] = DropChart.helper.getRowData(cells[i]);
    }

    return datas;
}

DropChart.helper.getCellRangeLabel = function (cells) {
    var data = [];
    var firstCell = cells[0][0];
    var lastRow = cells[cells.length - 1];
    var lastCell = lastRow[lastRow.length - 1];

    var pos = firstCell.split(":");
    data[0] = parseInt(pos[0]);
    data[1] = parseInt(pos[1]);

    pos = lastCell.split(":");
    data[2] = parseInt(pos[0]);
    data[3] = parseInt(pos[1]);
    return data;
}

DropChart.helper.canSwitchRowCol = function (cellsData) {
    var result = -1;
    var rValid = false;
    var cValid = false;
    if (DropChart.helper.hasNumbericRow(cellsData)) {
        rValid = true;
    }
    var rCellsData = DropChart.helper.transposeArr(cellsData);
    if (DropChart.helper.hasNumbericRow(rCellsData)) {
        cValid = true;
    }

    if (rValid && cValid) {
        result = 3;
    } else if (rValid) {
        result = 2;
    } else if (cValid) {
        result = 1;
    } else {
        // invalid data
        result = -1;
    }

    return result;
}

DropChart.helper.removeFirstRowColumn = function (cells) {
    cells.shift();
    if (cells.length > 0) {
        cells = DropChart.helper.transposeArr(cells);
        cells.shift();
    }

    return cells;
}
DropChart.helper.getEmptyArray = function (len) {
    var result = [];
    for (var i = 0; i < len; i++) {
        result[i] = "    ";
    }
    return result;
}

DropChart.helper.convertHex = function (hex, opacity) {
    hex = hex.replace('#', '');
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);

    return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
}

DropChart.helper.ColorLuminance = function (hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }

    return rgb;
}

/* harmony default export */ __webpack_exports__["default"] = (DropChart);


/***/ }),

/***/ "./app/admin/assets/js/_customRenderer.js":
/*!************************************************!*\
  !*** ./app/admin/assets/js/_customRenderer.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_functions */ "./app/admin/assets/js/_functions.js");


/*month text and aug calculator cell*/
var F_name = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
var M_name = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", "oct", "nov", "dec"];
var l_name = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
var D_name = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
var regex2 = new RegExp('([a-zA-Z]+)([0-9]+)');
var regex3 = new RegExp('([a-zA-Z]+)([0-9]+)', 'g');
/* List of supported formulas */
var regex = new RegExp('^=(DATE|DAY|DAYS|DAYS360|AND|OR|XOR|SUM|MULTIPLY|DIVIDE|COUNT|MIN|MAX|AVG|CONCAT|date|day|days|days360|and|or|xor|sum|multiply|divide|count|min|max|avg|concat)\\((.*?)\\)$');
var not_replace = ['DATE','DAY','DAYS','DAYS360','CONCAT'];
var Not_range_function = ['DATE','DAY','DAYS','DAYS360'];

var merge_style_val_cell = function (style_cols, style_rows, Wptm, row, col) {
    var cellStyle = [];

    if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNestedNotEmpty(style_cols, col, 1)) {
        cellStyle[2] = jquery.extend([], style_cols[col][1]);
    }
    if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNestedNotEmpty(style_rows, row, 1)) {
        cellStyle[2] = jquery.extend([], cellStyle[2], style_rows[row][1]);
    }

    if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNested(Wptm.style,'cells', row + "!" + col, 2)) {
        if (Wptm.type === 'html' || row == 0) {
            cellStyle[2] = jquery.extend({}, cellStyle[2],  Wptm.style.cells[row + "!" + col][2]);
        }
    }
    return cellStyle;
}

/**
 * function render cell when handsontable render, call in handsontable.renderer
 *
 * @param instance
 * @param td             cell element
 * @param row            now number
 * @param col            col number
 * @param prop
 * @param value          cell value
 * @param cellProperties
 * @returns {*}
 */
var render = function (instance, td, row, col, prop, value, cellProperties) {
    var onl_value_cell = false;
    if (typeof Array.prototype.slice.call(arguments, 6)[1] !== "undefined") {
        // onl_value_cell = true;
        onl_value_cell = Array.prototype.slice.call(arguments, 6)[1];
    }

    var Wptm = window.Wptm;
    var function_data = window.table_function_data;
    var css = {};
    var celltype = '', tooltip_content = false;
    var first_cell_merged = false;

    if (typeof (Wptm.style.cells) !== 'undefined') {
        //Cells rendering
        var cellStyle = [];

        if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNestedNotEmpty( Wptm.style.cols, col, 1)) {
            cellStyle[2] = jquery.extend([], Wptm.style.cols[col][1]);
        }
        if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNestedNotEmpty( Wptm.style.rows, row, 1)) {
            cellStyle[2] = jquery.extend([], cellStyle[2], Wptm.style.rows[row][1]);
        }

        if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNested(Wptm.style,'cells', row + "!" + col, 2)) {
            if (Wptm.type === 'html' || row == 0) {
                cellStyle[2] = jquery.extend({}, cellStyle[2],  Wptm.style.cells[row + "!" + col][2]);
            }
        }

        if (!onl_value_cell) {
            if (typeof (cellStyle[2]) !== 'undefined') {
                if (typeof cellStyle[2].AlternateColor !== 'undefined' || typeof function_data.allAlternate.default !== 'undefined') {
                    var numberRow = 0;
                    css["background-color"] = '';
                    if (typeof function_data.allAlternate.default !== 'undefined') {
                        if (function_data.allAlternate.header === '') {
                            numberRow = -1;
                        }
                        switch (row) {
                            case 0:
                                if (function_data.allAlternate.header === '') {
                                    css["background-color"] = function_data.allAlternate.even;
                                } else {
                                    css["background-color"] = function_data.allAlternate.header;
                                }
                                break;
                            case _.size(Wptm.style.rows) - 1:
                                if (function_data.allAlternate.footer === '') {
                                    if ((row - parseInt(0 + numberRow)) % 2) {
                                        css["background-color"] = function_data.allAlternate.even;
                                    } else {
                                        css["background-color"] = function_data.allAlternate.old;
                                    }
                                } else {
                                    css["background-color"] = function_data.allAlternate.footer;
                                }
                                break;
                            default:
                                if ((row - parseInt(0 + numberRow)) % 2) {
                                    css["background-color"] = function_data.allAlternate.even;
                                } else {
                                    css["background-color"] = function_data.allAlternate.old;
                                }
                                break;
                        }
                    } else {
                        var value_cell_alternateColor = function_data.oldAlternate[cellStyle[2].AlternateColor];
                        if (typeof value_cell_alternateColor === 'undefined') {
                            if (typeof function_data.changeAlternate[cellStyle[2].AlternateColor] !== 'undefined' || function_data.changeAlternate.length < 1) {
                                cellStyle[2].AlternateColor = function_data.changeAlternate[cellStyle[2].AlternateColor];
                                value_cell_alternateColor = function_data.oldAlternate[cellStyle[2].AlternateColor];
                            }
                        }

                        if (typeof value_cell_alternateColor !== 'undefined' && value_cell_alternateColor !== false && typeof value_cell_alternateColor.selection !== 'undefined') {
                            if (value_cell_alternateColor.header === '') {
                                numberRow = -1;
                            }
                            switch (row) {
                                case parseInt(value_cell_alternateColor.selection[0]):
                                    if (value_cell_alternateColor.header === '') {
                                        css["background-color"] = value_cell_alternateColor.even;
                                    } else {
                                        css["background-color"] = value_cell_alternateColor.header;
                                    }
                                    break;
                                case parseInt(value_cell_alternateColor.selection[2]):
                                    if (value_cell_alternateColor.footer === '') {
                                        if ((row - parseInt(value_cell_alternateColor.selection[0] + numberRow)) % 2) {
                                            css["background-color"] = value_cell_alternateColor.even;
                                        } else {
                                            css["background-color"] = value_cell_alternateColor.old;
                                        }
                                    } else {
                                        css["background-color"] = value_cell_alternateColor.footer;
                                    }
                                    break;
                                default:
                                    if ((row - parseInt(value_cell_alternateColor.selection[0] + numberRow)) % 2) {
                                        css["background-color"] = value_cell_alternateColor.even;
                                    } else {
                                        css["background-color"] = value_cell_alternateColor.old;
                                    }
                                    break;
                            }
                        } else {
                            delete cellStyle[2].AlternateColor;
                            if (typeof Wptm.style.cells[row + "!" + col][2] !== 'undefined' && typeof Wptm.style.cells[row + "!" + col][2].AlternateColor !== 'undefined') {
                                delete Wptm.style.cells[row + "!" + col][2].AlternateColor;
                            }
                        }
                    }
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNestedNotEmpty(cellStyle,2,'cell_type')) {
                    celltype = cellStyle[2].cell_type;
                } else if (typeof cellStyle[2].cell_type !== 'undefined') {
                    delete cellStyle[2].cell_type;
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNestedNotEmpty(cellStyle,2,'cell_background_color')) {
                    css["background-color"] = cellStyle[2].cell_background_color;
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNestedNotEmpty(cellStyle,2,'cell_border_top')) {
                    css["border-top"] = cellStyle[2].cell_border_top;
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNestedNotEmpty(cellStyle,2,'cell_border_top_start')) {
                    if (0 == row) {
                        css["border-top"] = cellStyle[2].cell_border_top_start;
                    }
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNestedNotEmpty(cellStyle,2,'cell_border_right')) {
                    css["border-right"] = cellStyle[2].cell_border_right;
                }

                //check merge cell and border right
                if (typeof table_function_data.start_merge_cell_col !== 'undefined' && typeof table_function_data.start_merge_cell_col[col] !== 'undefined') {
                    window.jquery.each(table_function_data.start_merge_cell_col[col], function (index, value) {
                        if (typeof value !== 'undefined') {
                            var start_merge_cell_col = Wptm.mergeCellsSetting[value];
                            if (start_merge_cell_col.rowspan + start_merge_cell_col.row > row && row >= start_merge_cell_col.row) {
                                var end_style = merge_style_val_cell(Wptm.style.cols, Wptm.style.rows, Wptm, row, start_merge_cell_col.col + start_merge_cell_col.colspan - 1);
                                // console.log(start_merge_cell_col, col, row);
                                first_cell_merged = true;
                                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNestedNotEmpty(end_style, 2, 'cell_border_right')) {
                                    css["border-right"] = end_style[2].cell_border_right;
                                }
                            }
                        }
                    });
                }

                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNestedNotEmpty(cellStyle,2,'cell_border_bottom')) {
                    css["border-bottom"] = cellStyle[2].cell_border_bottom;
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNestedNotEmpty(cellStyle,2,'cell_border_bottom_end')) {
                    if (_.size(Wptm.style.rows) - 1 == row) {
                        css["border-bottom"] = cellStyle[2].cell_border_bottom_end;
                    }
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNestedNotEmpty(cellStyle,2,'cell_border_left')) {
                    css["border-left"] = cellStyle[2].cell_border_left;
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNested(cellStyle,2,'cell_font_bold') && cellStyle[2].cell_font_bold === true) {
                    css["font-weight"] = "bold";
                } else {
                    delete css["font-weight"];
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNested(cellStyle,2,'cell_font_italic') && cellStyle[2].cell_font_italic === true) {
                    css["font-style"] = "italic";
                } else {
                    delete css["font-style"];
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNested(cellStyle,2,'cell_font_underline') && cellStyle[2].cell_font_underline === true) {
                    css["text-decoration"] = "underline";
                } else {
                    delete css["text-decoration"];
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNested(cellStyle,2,'cell_text_align')) {
                    css["text-align"] = cellStyle[2].cell_text_align;
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNested(cellStyle,2,'cell_vertical_align')) {
                    css["vertical-align"] = cellStyle[2].cell_vertical_align;
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNested(cellStyle,2,'cell_font_family')) {
                    css["font-family"] = cellStyle[2].cell_font_family;
                    //get list custom fonts used
                    if (typeof wptm_listFont !== 'undefined' && wptm_listFont.length > 0
                        && wptm_listFont.includes(cellStyle[2].cell_font_family)
                        && !Wptm.style.table.fonts_used.includes(cellStyle[2].cell_font_family)) {
                        Wptm.style.table.fonts_used.push(cellStyle[2].cell_font_family);
                    }
                    if (typeof wptm_listsLocalFont !== 'undefined' && wptm_listsLocalFont.length > 0
                        && wptm_listsLocalFont.includes(cellStyle[2].cell_font_family)
                        && !Wptm.style.table.fonts_local_used.includes(cellStyle[2].cell_font_family)) {
                        Wptm.style.table.fonts_local_used.push(cellStyle[2].cell_font_family);
                    }
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNested(cellStyle,2,'cell_font_size')) {
                    css["font-size"] = cellStyle[2].cell_font_size + "px";
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNested(cellStyle,2,'cell_font_color')) {
                    css["color"] = cellStyle[2].cell_font_color;
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNested(cellStyle,2,'cell_padding_left')) {
                    css["padding-left"] = cellStyle[2].cell_padding_left + "px";
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNested(cellStyle,2,'cell_padding_top')) {
                    css["padding-top"] = cellStyle[2].cell_padding_top + "px";
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNested(cellStyle,2,'cell_padding_right')) {
                    css["padding-right"] = cellStyle[2].cell_padding_right + "px";
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNested(cellStyle,2,'cell_padding_bottom')) {
                    css["padding-bottom"] = cellStyle[2].cell_padding_bottom + "px";
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNested(cellStyle,2,'cell_background_radius_left_top')) {
                    css["border-top-left-radius"] = cellStyle[2].cell_background_radius_left_top + "px";
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNested(cellStyle,2,'cell_background_radius_right_top')) {
                    css["border-top-right-radius"] = cellStyle[2].cell_background_radius_right_top + "px";
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNested(cellStyle,2,'cell_background_radius_right_bottom')) {
                    css["border-bottom-right-radius"] = cellStyle[2].cell_background_radius_right_bottom + "px";
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNested(cellStyle,2,'cell_background_radius_left_bottom')) {
                    css["border-bottom-left-radius"] = cellStyle[2].cell_background_radius_left_bottom + "px";
                }
                if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNestedNotEmpty(cellStyle,2,'tooltip_content')) {
                    tooltip_content = cellStyle[2].tooltip_content !== '' ? true : false;
                }
            }

            //render style for table
            window.jquery(td).css(css);
            if (Object.keys(css).length > 0) {
                function_data.styleToRender += '.dtr' + row + '.dtc' + col + '{';
                window.jquery.each(css, function (index, value) {
                    function_data.styleToRender += index + ':' + value + ';';
                });
                function_data.styleToRender += '}';
            }
        }
    }

    if (!onl_value_cell) {
        switch (celltype) {
            case 'html':
                var escaped = Handsontable.helper.stringify(value);
                //escaped = strip_tags(escaped, '<div><span><img><em><b><a>'); //be sure you only allow certain HTML tags to avoid XSS threats (you should also remove unwanted HTML attributes)
                td.innerHTML = escaped;
                window.jquery(td).addClass('isHtmlCell');
                break;
            default:
                window.jquery(td).removeClass('isHtmlCell');
                Handsontable.renderers.TextRenderer.apply(this, arguments);
                break;
        }

        if (tooltip_content) {
            window.jquery(td).addClass('isTooltipContent');
        } else {
            window.jquery(td).removeClass('isTooltipContent');
        }
    }

    /* Calculs rendering */
    if (typeof Wptm.style.table.date_formats === 'undefined') {
        Wptm.style.table.date_formats = window.default_value.date_formats;
    }
    var accounting_for_cells = {};
    var createRegExpFormatForCell = {};
    var currency_symbol = '';
    var setFormat_for_cells = {};
    var cell_has_format = 0;

    //not has time format
    [accounting_for_cells, createRegExpFormatForCell, currency_symbol, setFormat_for_cells, cell_has_format] = get_format_for_cell(cellStyle[2], Wptm.style.table, function_data.string_currency_symbols, cell_has_format);

    accounting_for_cells.date_formats = typeof cellStyle[2].date_formats !== 'undefined' && cellStyle[2].date_formats !== false ? cellStyle[2].date_formats : Wptm.style.table.date_formats;

    if (typeof cellStyle[2].date_formats !== 'undefined' && cellStyle[2].date_formats !== '' && cellStyle[2].date_formats !== false) {
        if (typeof cellStyle[2].date_formats_momentjs !== 'undefined' && cellStyle[2].date_formats_momentjs !== '' && cellStyle[2].date_formats_momentjs !== false) {
            accounting_for_cells.date_formats_momentjs = cellStyle[2].date_formats_momentjs;
        } else {
            accounting_for_cells.date_formats_momentjs = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].momentjsFormat(accounting_for_cells.date_formats);
        }
    } else if (typeof accounting_for_cells.date_formats !== 'undefined') {
        if (typeof function_data.date_formats_momentjs !== 'undefined' && function_data.date_formats_momentjs !== '') {
            accounting_for_cells.date_formats_momentjs = function_data.date_formats_momentjs;
        } else {
            accounting_for_cells.date_formats_momentjs = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].momentjsFormat(Wptm.style.table.date_formats);
        }
    } else {
        accounting_for_cells.date_formats_momentjs = '';
    }

    //accounting_for_cells.date_formats_momentjs from cell/table
    if (typeof cellStyle[2].date_formats !== 'undefined' && cellStyle[2].date_formats !== false) {
        createRegExpFormatForCell = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].createRegExpFormatForCell(false, accounting_for_cells.date_formats, createRegExpFormatForCell);
    }

    if (typeof (value) === 'string') {
        var value_cell = value;
        var valueNotFormat;
        if (value[0] === '=') {
            // console.log(row, col, accounting_for_cells);
            value_cell = evaluateFormulas2(td, row, col, value, function_data, accounting_for_cells, createRegExpFormatForCell, setFormat_for_cells, cell_has_format, onl_value_cell);
        } else {
            if (currency_symbol !== '' && value.replace(currency_symbol, "") === '') {
                value = value.replaceAll(accounting_for_cells.number.thousand, '');
                value = value.replaceAll(accounting_for_cells.number.decimal, ',');
                valueNotFormat = value;

                if (cell_has_format === 1) {
                    value_cell = accounting.formatNumber(value, accounting_for_cells.number);
                }
                if (cell_has_format > 1) {
                    value_cell = accounting.formatMoney(value, accounting_for_cells.currency);
                }

                if (onl_value_cell) {
                    valueNotFormat = accounting.formatMoney(value, "", accounting_for_cells.number.precision, typeof Wptm.style.table.thousand_symbol === 'undefined'
                        ? default_value.thousand_symbol
                        : Wptm.style.table.thousand_symbol, typeof Wptm.style.table.decimal_symbol === 'undefined'
                        ? default_value.decimal_symbol
                        : Wptm.style.table.decimal_symbol);
                }

                if (!onl_value_cell) {
                    window.jquery(td).text(value_cell);
                }
            }

            if (typeof createRegExpFormatForCell.date_format !== 'undefined'
                && !isNaN(new Date(value).getDate()) && accounting_for_cells.date_formats !== '') {
                value_cell = moment(value).format(cellStyle[2].date_formats_momentjs);
                valueNotFormat = value;
                if (!onl_value_cell) {
                    window.jquery(td).text(value_cell);
                }
            }
        }

        if (celltype == 'html' && (cell_has_format >= 1 || typeof createRegExpFormatForCell.date_format !== 'undefined')) {
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getFillArray([[row, col, row, col]], Wptm, {
                date_formats: false,
                date_formats_momentjs: false,
                currency_symbol: false,
                symbol_position: false,
                decimal_symbol: false,
                decimal_count: false,
                thousand_symbol: false
            }, 'style');
            var text = window.jquery(td).text();
            saveData.push({action: 'edit_cell', row: row, col: col, content: text});
        }
        if (onl_value_cell) {
            return typeof value_cell === 'string' ? [value_cell, valueNotFormat] : value_cell;
        }
    }

    if (!onl_value_cell) {
        //add class for lock column of db table
        if (typeof Wptm.style.table.lock_columns !== 'undefined' && Wptm.style.table.lock_columns[col] != 0) {
            window.jquery(td).addClass('wptm_lock_column');
        }

        if (!wptm_administrator) {
            var lock_cell_id = [], not_lock_cell = false;
            if (typeof table_function_data.protect_columns !== 'undefined'
                && typeof table_function_data.protect_columns[col] !== 'undefined') {
                //protect columns
                lock_cell_id.push(table_function_data.protect_columns[col]);
            }
            if (typeof table_function_data.protect_rows !== 'undefined'
                && typeof table_function_data.protect_rows[row] !== 'undefined') {
                //protect rows
                lock_cell_id.push(table_function_data.protect_rows[row]);
            }
            if (typeof Wptm.style.cells[row + "!" + col][2].lock_cell !== 'undefined') {
                lock_cell_id.push(Wptm.style.cells[row + "!" + col][2].lock_cell);
            }
            if (lock_cell_id.length > 0 && typeof lock_cell_id[0] !== 'undefined'
                && typeof table_function_data.lock_ranger_cells_user !== 'undefined') {
                for (var ij in lock_cell_id) {
                    if (table_function_data.lock_ranger_cells_user[lock_cell_id[ij]]) {//allow edit
                        not_lock_cell = true;
                        break;
                    }
                }
                if (!not_lock_cell) {
                    window.jquery(td).addClass('wptm_lock_cells');
                }
            }
        }

        window.jquery(td).addClass('dtr' + row + ' dtc' + col);
    }

    return td;
};

function get_format_for_cell(cellStyle, cellStyle2, string_currency_symbols, cell_has_format) {
    var accounting_for_cells = {};
    var setFormat_for_cells = {};
    var createRegExpFormatForCell = {};
    var currency_symbol = '';

    if ((typeof cellStyle.decimal_count !== 'undefined' && cellStyle.decimal_count !== false)
        || (typeof cellStyle.decimal_symbol !== 'undefined' && cellStyle.decimal_symbol !== false)
        || (typeof cellStyle.currency_symbol !== 'undefined' && cellStyle.currency_symbol !== false)) {
        setFormat_for_cells.thousand_symbol = typeof cellStyle.thousand_symbol !== 'undefined' && cellStyle.thousand_symbol !== false && cell_has_format !== 1 ? cellStyle.thousand_symbol : cellStyle2.thousand_symbol;
        setFormat_for_cells.decimal_count = typeof cellStyle.decimal_count !== 'undefined' && cellStyle.decimal_count !== false && cell_has_format !== 1 ? cellStyle.decimal_count : cellStyle2.decimal_count;
        setFormat_for_cells.decimal_symbol = typeof cellStyle.decimal_symbol !== 'undefined' && cellStyle.decimal_symbol !== false && cell_has_format !== 1 ? cellStyle.decimal_symbol : cellStyle2.decimal_symbol;

        setFormat_for_cells.currency_symbol = typeof cellStyle.currency_symbol !== 'undefined' && cellStyle.currency_symbol !== false && cell_has_format < 2 ? cellStyle.currency_symbol : cellStyle2.currency_symbol;
        setFormat_for_cells.symbol_position = typeof cellStyle.symbol_position !== 'undefined' && cellStyle.symbol_position !== false && cell_has_format < 2 ? cellStyle.symbol_position : cellStyle2.symbol_position;

        accounting_for_cells = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].setFormat_accounting_for_cells(setFormat_for_cells);
        if (typeof setFormat_for_cells.currency_symbol === "undefined") {
            setFormat_for_cells.currency_symbol = false;
        }
        createRegExpFormatForCell = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].createRegExpFormatForCell(setFormat_for_cells.currency_symbol, false, {});

        if (typeof cellStyle.currency_symbol !== 'undefined' && cellStyle.currency_symbol !== '' && cellStyle.symbol_position !== false) {
            cell_has_format += 2;
        }
        if (cell_has_format !== 1 && ((typeof cellStyle.decimal_count !== 'undefined' && cellStyle.decimal_count !== false) || (typeof cellStyle.decimal_symbol !== 'undefined' && cellStyle.decimal_symbol !== false))) {
            cell_has_format += 1;
        }

        currency_symbol = new RegExp('[0-9| |\.|\,|\\-|' + (typeof createRegExpFormatForCell.string_currency_symbols !== 'undefined' ? createRegExpFormatForCell.string_currency_symbols : string_currency_symbols) + ']', "g");
    }
    return [accounting_for_cells, createRegExpFormatForCell, currency_symbol, setFormat_for_cells, cell_has_format];
}

// Evaluate formula in cell then set value to td
function evaluateFormulas2 (td, row, col, value, function_data, accounting_for_cells, createRegExpFormatForCell, setFormat_for_cells, cell_has_format, onl_value_cell) {
    var error = false;
    var result = regex.exec(value);
    var valueReturn = 'NaN';
    var valueNotFormat = 'NaN';
    var cellStyle;
    var changeFormatCell = 0;
    var save_change_format = false;

    if (result !== null) {
        var style_cell = window.Wptm.style.cells[row + '!' + col];
        var calculation;
        calculation = result[1];
        var check_value_data = true;
        var update_format_second = cell_has_format;
        var update_date_formats_momentjs = accounting_for_cells.date_formats_momentjs;

        var check_has_currency_symbol = false;
        var cell_decimal_symbol = typeof accounting_for_cells.decimal !== 'undefined' ? accounting_for_cells.currency.decimal : window.Wptm.style.table.decimal_symbol;
        var date_format = typeof createRegExpFormatForCell.date_format !== 'undefined' ? createRegExpFormatForCell.date_format : function_data.date_format;

        var currency_symbol = new RegExp('[0-9| |\.|\,|\\-|' + (typeof createRegExpFormatForCell.string_currency_symbols !== 'undefined' ? createRegExpFormatForCell.string_currency_symbols : function_data.string_currency_symbols) + ']', "g");
        var cells = result[2].split(";");
        var values = [];
        //(A1:A2)(A1:A2;A3)(A1;A3)(A1;123)(A1;A2;A3:A4)(A1:A2;123)(123 > A1; A2) MIN|MAX|AVG|CONCAT
        var ij = 0, i = 0;
        // console.log(row, col, cell_has_format);
        for (ij = 0; ij < cells.length; ij++) {
            var rCells = [];
            var datas = '';
            var data = '';
            var vals = cells[ij].split(":");
            if (vals.length === 1 ) {//single cell
                values[ij] = '';

                var checkVal = vals[0].match(regex3);
                if (checkVal !== null) {
                    i = 0;
                    for (i = 0; i < checkVal.length; i++) {
                        //ex: B1 -> B, 1, B1
                        rCells = regex2.exec(checkVal[i]);
                        if (rCells !== null) {
                            cellStyle = window.Wptm.style.cells[(rCells[2] - 1) + '!' + (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].convertAlpha(rCells[1].toUpperCase()) - 1)];
                            // console.log(cellStyle);
                            // console.log(row, col, update_format_second, cell_has_format, cellStyle, setFormat_for_cells);

                            if (changeFormatCell < 1 && cell_has_format < 3
                                && ((typeof cellStyle[2].decimal_count !== 'undefined' && cellStyle[2].decimal_count !== false)
                                    || (typeof cellStyle[2].decimal_symbol !== 'undefined' && cellStyle[2].decimal_symbol !== false)
                                    || (typeof cellStyle[2].currency_symbol !== 'undefined' && cellStyle[2].currency_symbol !== false))
                            ) {
                                changeFormatCell = 1;
                                [accounting_for_cells, createRegExpFormatForCell, currency_symbol, setFormat_for_cells, cell_has_format] = get_format_for_cell(cellStyle[2], setFormat_for_cells, function_data.string_currency_symbols, cell_has_format);
                                if (typeof style_cell !== "undefined") {
                                    if (update_format_second !== 1) {
                                        if (style_cell[2].thousand_symbol_second !== (typeof setFormat_for_cells.thousand_symbol !== 'undefined' ? setFormat_for_cells.thousand_symbol : false)) {
                                            style_cell[2].thousand_symbol_second = typeof setFormat_for_cells.thousand_symbol !== 'undefined' ? setFormat_for_cells.thousand_symbol : false;
                                            save_change_format = true;
                                        }
                                        if (style_cell[2].decimal_count_second !== (typeof setFormat_for_cells.decimal_count !== 'undefined' ? setFormat_for_cells.decimal_count : false)) {
                                            style_cell[2].decimal_count_second = typeof setFormat_for_cells.decimal_count !== 'undefined' ? setFormat_for_cells.decimal_count : false;
                                            save_change_format = true;
                                        }
                                        if (style_cell[2].decimal_symbol_second !== (typeof setFormat_for_cells.decimal_symbol !== 'undefined' ? setFormat_for_cells.decimal_symbol : false)) {
                                            style_cell[2].decimal_symbol_second = typeof setFormat_for_cells.decimal_symbol !== 'undefined' ? setFormat_for_cells.decimal_symbol : false;
                                            save_change_format = true;
                                        }
                                    }
                                    if (update_format_second !== 2) {
                                        if (style_cell[2].currency_symbol_second !== (typeof setFormat_for_cells.currency_symbol !== 'undefined' ? setFormat_for_cells.currency_symbol : false)) {
                                            style_cell[2].currency_symbol_second = typeof setFormat_for_cells.currency_symbol !== 'undefined' ? setFormat_for_cells.currency_symbol : false;
                                            save_change_format = true;
                                        }
                                        if (style_cell[2].symbol_position_second !== (typeof setFormat_for_cells.symbol_position !== 'undefined' ? setFormat_for_cells.symbol_position : false)) {
                                            style_cell[2].symbol_position_second = typeof setFormat_for_cells.symbol_position !== 'undefined' ? setFormat_for_cells.symbol_position : false;
                                            save_change_format = true;
                                        }
                                    }
                                }
                                cell_decimal_symbol = typeof accounting_for_cells.decimal !== 'undefined' ? accounting_for_cells.currency.decimal : setFormat_for_cells.decimal_symbol;
                            }

                            data = window.Wptm.container.handsontable('getDataAtCell', rCells[2] - 1, _functions__WEBPACK_IMPORTED_MODULE_0__["default"].convertAlpha(rCells[1].toUpperCase()) - 1);

                            if (data !== null && typeof data !== 'undefined') {
                                check_has_currency_symbol = (data.indexOf(function_data.string_currency_symbols) > -1 || check_has_currency_symbol) ? true : false;
                                if (!not_replace.includes(calculation.toUpperCase())) {//replace in some calculation
                                    if (data.replace(currency_symbol, "") === '') {
                                        data = accounting.unformat(data, window.Wptm.style.table.decimal_symbol);
                                    } else {
                                        data = '';
                                    }
                                }
                                if (i === 0) {
                                    datas = vals[0].replace(checkVal[i], data);
                                } else {
                                    datas = datas.replace(checkVal[i], data);
                                }
                            } else {
                                datas = data = '';
                            }
                        } else {
                            check_value_data = false;
                        }
                    }
                } else {
                    data = datas = vals[0];
                }
                if (datas !== null) {
                    values[ij] = datas;
                }
            } else {
                if (Not_range_function.includes(calculation.toUpperCase())) {//not set range in some calculation
                    check_value_data = false;
                }
                rCells[0] = regex2.exec(vals[0]);
                rCells[1] = regex2.exec(vals[1]);
                if (rCells[0] !== null && rCells[1] !== null) {
                    cellStyle = window.Wptm.style.cells[(rCells[0][2] - 1) + '!' + (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].convertAlpha(rCells[0][1]) - 1)];
                    if (changeFormatCell < 1 && cell_has_format < 3 && typeof cellStyle !== 'undefined'
                        && ((typeof cellStyle[2].decimal_count !== 'undefined' && cellStyle[2].decimal_count !== false)
                            || (typeof cellStyle[2].decimal_symbol !== 'undefined' && cellStyle[2].decimal_symbol !== false)
                            || (typeof cellStyle[2].currency_symbol !== 'undefined' && cellStyle[2].currency_symbol !== false))
                    ) {
                        changeFormatCell = 1;
                        [accounting_for_cells, createRegExpFormatForCell, currency_symbol, setFormat_for_cells, cell_has_format] = get_format_for_cell(cellStyle[2], setFormat_for_cells, function_data.string_currency_symbols, cell_has_format);
                        if (typeof style_cell !== "undefined") {
                            if (update_format_second !== 1) {
                                if (style_cell[2].thousand_symbol_second !== (typeof setFormat_for_cells.thousand_symbol !== 'undefined' ? setFormat_for_cells.thousand_symbol : false)) {
                                    style_cell[2].thousand_symbol_second = typeof setFormat_for_cells.thousand_symbol !== 'undefined' ? setFormat_for_cells.thousand_symbol : false;
                                    save_change_format = true;
                                }
                                if (style_cell[2].decimal_count_second !== (typeof setFormat_for_cells.decimal_count !== 'undefined' ? setFormat_for_cells.decimal_count : false)) {
                                    style_cell[2].decimal_count_second = typeof setFormat_for_cells.decimal_count !== 'undefined' ? setFormat_for_cells.decimal_count : false;
                                    save_change_format = true;
                                }
                                if (style_cell[2].decimal_symbol_second !== (typeof setFormat_for_cells.decimal_symbol !== 'undefined' ? setFormat_for_cells.decimal_symbol : false)) {
                                    style_cell[2].decimal_symbol_second = typeof setFormat_for_cells.decimal_symbol !== 'undefined' ? setFormat_for_cells.decimal_symbol : false;
                                    save_change_format = true;
                                }
                            }
                            if (update_format_second !== 2) {
                                if (style_cell[2].currency_symbol_second !== (typeof setFormat_for_cells.currency_symbol !== 'undefined' ? setFormat_for_cells.currency_symbol : false)) {
                                    style_cell[2].currency_symbol_second = typeof setFormat_for_cells.currency_symbol !== 'undefined' ? setFormat_for_cells.currency_symbol : false;
                                    save_change_format = true;
                                }
                                if (style_cell[2].symbol_position_second !== (typeof setFormat_for_cells.symbol_position !== 'undefined' ? setFormat_for_cells.symbol_position : false)) {
                                    style_cell[2].symbol_position_second = typeof setFormat_for_cells.symbol_position !== 'undefined' ? setFormat_for_cells.symbol_position : false;
                                    save_change_format = true;
                                }
                            }
                        }
                        cell_decimal_symbol = typeof accounting_for_cells.decimal !== 'undefined' ? accounting_for_cells.currency.decimal : window.Wptm.style.table.decimal_symbol;
                    }

                    values[ij] = [];
                    rCells = window.Wptm.container.handsontable('getData', rCells[0][2] - 1, _functions__WEBPACK_IMPORTED_MODULE_0__["default"].convertAlpha(rCells[0][1]) - 1, rCells[1][2] - 1, _functions__WEBPACK_IMPORTED_MODULE_0__["default"].convertAlpha(rCells[1][1]) - 1);
                    i = 0;
                    for (i = 0; i < rCells.length; i++) {
                        if (!not_replace.includes(calculation.toUpperCase())) {//replace in some calculation
                            datas = [];
                            for (var j = 0; j < rCells[i].length; j++) {
                                check_has_currency_symbol = ((rCells[i][j] !== null && rCells[i][j].indexOf(window.Wptm.style.table.currency_symbol) > -1) || check_has_currency_symbol) ? true : false;
                                if (rCells[i][j] === null) {
                                    rCells[i][j] = '';
                                }
                                if (rCells[i][j].replace(currency_symbol, "") === '') {
                                    datas[j] = accounting.unformat(rCells[i][j], window.Wptm.style.table.decimal_symbol);
                                } else {
                                    datas[j] = '';
                                }
                                // datas[j] = accounting.unformat(rCells[i][j], window.Wptm.style.table.decimal_symbol);
                            }
                        } else {
                            datas = rCells[i];
                        }
                        if (datas === null) {
                            values[ij][i] = '';
                        } else {
                            values[ij][i] = datas;
                        }
                    }
                } else {
                    if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].convertDate(function_data.date_format, cells[ij].match(/[a-zA-Z0-9|+|-|\\]+/g), true) !== false) {
                        values[ij] = cells[ij];
                    } else {
                        check_value_data = false;
                    }
                }
            }
        }

        //remove format..._second
        if (changeFormatCell < 1 && cell_has_format < 3 && typeof style_cell !== "undefined") {
            if (typeof style_cell[2].thousand_symbol_second !== 'undefined' && style_cell[2].thousand_symbol_second !== false) {
                style_cell[2].thousand_symbol_second = false;
                save_change_format = true;
            }
            if (typeof style_cell[2].decimal_count_second !== 'undefined' && style_cell[2].decimal_count_second !== false) {
                style_cell[2].decimal_count_second = false;
                save_change_format = true;
            }
            if (typeof style_cell[2].decimal_symbol_second !== 'undefined' && style_cell[2].decimal_symbol_second !== false) {
                style_cell[2].decimal_symbol_second = false;
                save_change_format = true;
            }
            if (typeof style_cell[2].currency_symbol_second !== 'undefined' && style_cell[2].currency_symbol_second !== false) {
                style_cell[2].currency_symbol_second = false;
                save_change_format = true;
            }
            if (typeof style_cell[2].symbol_position_second !== 'undefined' && style_cell[2].symbol_position_second !== false) {
                style_cell[2].symbol_position_second = false;
                save_change_format = true;
            }
        }
        if (save_change_format) {
            saveData.push({action: 'style', selection: [[row, col, row, col]], style: style_cell[2]});
        }
        if (check_value_data === true) {
            switch (calculation.toUpperCase()) {
                case 'SUM':
                    valueNotFormat = formulajs.SUM(values);
                    if (check_has_currency_symbol || cell_has_format > 1) {
                        valueReturn = accounting.formatMoney(valueNotFormat, accounting_for_cells.currency);
                    } else {
                        valueReturn = accounting.formatNumber(valueNotFormat, accounting_for_cells.number);
                    }
                    break;
                case 'MULTIPLY':
                    valueNotFormat = 1;
                    values = merge_value_from_cells(values);
                    values.map(function (foo) {
                        if (foo !== false) {
                            var number = Number(foo);
                            if (!isNaN(number)) {
                                valueNotFormat = valueNotFormat * number;
                            } else {
                                check_value_data = false;
                            }
                        }
                    });
                    if (!check_value_data) {
                        valueReturn = 'NaN';
                        valueNotFormat = 'NaN';
                    } else {
                        if (check_has_currency_symbol || cell_has_format > 1) {
                            valueReturn = accounting.formatMoney(valueNotFormat, accounting_for_cells.currency);
                        } else {
                            valueReturn = accounting.formatNumber(valueNotFormat, accounting_for_cells.number);
                        }
                    }
                    break;
                case 'DIVIDE':
                    valueNotFormat = '';
                    values = merge_value_from_cells(values);

                    if (values.length !== 2) {
                        valueReturn = 'NaN';
                        valueNotFormat = 'NaN';
                        check_value_data = false;
                        break;
                    }

                    values[1] = Number(values[1]);

                    if (isNaN(values[1]) || values[1] == 0 ||  values[1] == '') {
                        valueReturn = 'NaN';
                        valueNotFormat = 'NaN';
                        check_value_data = false;
                        break;
                    }

                    values[0] = Number(values[0]);

                    if (isNaN(values[0])) {
                        valueReturn = 'NaN';
                        valueNotFormat = 'NaN';
                        check_value_data = false;
                        break;
                    }

                    valueNotFormat = values[0] / values[1];

                    if (!check_value_data) {
                        valueReturn = 'NaN';
                        valueNotFormat = 'NaN';
                    } else {
                        if (check_has_currency_symbol || cell_has_format > 1) {
                            valueReturn = accounting.formatMoney(valueNotFormat, accounting_for_cells.currency);
                        } else {
                            valueReturn = accounting.formatNumber(valueNotFormat, accounting_for_cells.number);
                        }
                    }
                    break;
                case 'AND':
                    valueReturn = 'true';
                    values = merge_value_from_cells(values);
                    values.map(function (foo) {
                        valueReturn = valueReturn && parse_boolean_calculation(foo, cell_decimal_symbol);
                    });
                    valueNotFormat = valueReturn;
                    break;
                case 'OR':
                    valueReturn = 'true';
                    values = merge_value_from_cells(values);
                    values.map(function (foo) {
                        valueReturn = valueReturn || parse_boolean_calculation(foo, cell_decimal_symbol);
                    });
                    valueNotFormat = valueReturn;
                    break;
                case 'XOR':
                    valueReturn = 0;
                    values = merge_value_from_cells(values);
                    values.map(function (foo) {
                        valueReturn += Number(parse_boolean_calculation(foo, cell_decimal_symbol));
                    });
                    valueReturn = ((valueReturn % 2) === 1) ? 'true' : 'false';
                    valueNotFormat = valueReturn;
                    break;
                case 'COUNT':
                    valueReturn = 0;
                    var currency_symbol = new RegExp('[ |\.|\,|\\-|' + window.Wptm.style.table.currency_symbol + ']', "g");
                    values = merge_value_from_cells(values);
                    values.map(function (foo) {
                        if (foo !== false) {
                            if (!isNaN(Number(foo)) && foo !== '') {
                                valueReturn = valueReturn + 1;
                            }
                        }
                    });
                    valueNotFormat = valueReturn;
                    break;
                case 'DATE':
                    var data_value = '';
                    if (values.length > 1) {
                        data_value = values.join('/');
                    } else {
                        data_value = values[0];
                    }

                    if (typeof data_value !== 'undefined') {
                        valueReturn = moment(data_value).formatWithJDF(accounting_for_cells.date_formats_momentjs);
                    } else {
                        valueReturn = 'NaN';
                        check_value_data = false;
                    }
                    valueNotFormat = valueReturn;
                    // if (values.length === 1) {
                    //     values = values[0].match(/[a-zA-Z0-9|+|-|\\]+/g);
                    // }
                    // //convert values --> (string) date pursuant date_format not have timezone
                    // var date_string = tableFunction.convertDate(function_data.date_format, values, false);
                    // date_string = date_string !== false ? new Date(date_string) : check_value_data = false;
                    //
                    // //convert values --> (string) date pursuant date_format have timezone
                    // var date_string_timezone = tableFunction.convertDate(function_data.date_format, values, true);
                    // date_string_timezone = date_string_timezone !== false ? new Date(date_string_timezone) : check_value_data = false;
                    // if (date_string_timezone && date_string_timezone.getDate() > 0 && check_value_data !== false) {
                    //     var format_resultCalc = window.Wptm.style.table.date_formats.split(/[a-zA-Z|\\]+/g);
                    //     var date = [];
                    //
                    //     date['month'] = date_string.getMonth();
                    //     date['date'] = date_string.getDate();
                    //     date['day'] = date_string.getDay();
                    //     date['year'] = date_string.getUTCFullYear();
                    //
                    //     date['D'] = D_name[date['day']];
                    //     date['l'] = l_name[date['day']];
                    //     date['j'] = date['date'];
                    //     date['d'] = (Number(date['date']) < 10) ? '0' + date['date'] : date['date'];
                    //     date['F'] = F_name[date['month']];
                    //     date['M'] = M_name[date['month']];
                    //     date['n'] = Number(date['month']) + 1;
                    //     date['m'] = (Number(date['month']) < 10) ? '0' + (Number(date['month']) + 1) : Number(date['month']) + 1;
                    //     date['Y'] = date['year'];
                    //     date['y'] = Number(date['year']) % 100;
                    //
                    //     valueReturn = format_resultCalc[0];
                    //     window.jquery.each(function_data.date_format, function (i, v) {
                    //         if (v.indexOf("\\") !== -1 || window.jquery.inArray(v, ["a", "A", "g", "G", "h", "H", "i", "s", "T"]) !== -1) {
                    //             date[v] = values[i];
                    //         }
                    //         valueReturn += date[v] + format_resultCalc[i + 1];
                    //     });
                    // } else {
                    //     valueReturn = 'NaN';
                    //     check_value_data = false;
                    // }
                    break;
                case 'DAY':
                    if (typeof values[0] !== 'undefined') {
                        valueNotFormat = values[0];
                        valueReturn = formulajs.DAY(values[0]);
                    }
                    break;
                case 'DAYS':
                    if (typeof values[0] !== 'undefined' && typeof values[1] !== 'undefined') {
                        valueReturn = formulajs.DAYS(values[0], values[1]);
                    }
                    valueNotFormat = valueReturn;
                    break;
                case 'DAYS360':
                    valueReturn = 0;
                    if (check_value_data !== false) {
                        var month = [];
                        var year = [];
                        var days = [];
                        var date1 = 0;
                        values.map(function (foo) {
                            if (foo !== false) {
                                valueReturn++;
                                var number = foo.match(/[a-zA-Z0-9|+|-|\\]+/g);
                                var string_day = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].convertDate(function_data.date_format, number, true);
                                if (string_day !== false) {
                                    date1 = new Date(string_day);
                                    if (!isNaN(date1.getTime())) {
                                        days[valueReturn] = date1.getDate();
                                        month[valueReturn] = date1.getMonth();
                                        year[valueReturn] = date1.getFullYear();
                                    }
                                }
                            }
                        });
                        if (year.length > 1) {
                            if (year[2] < year[1]) {
                                year[2] = year[1] + year[2];
                                year[1] = year[2] - year[1];
                                year[2] = year[2] - year[1];
                                month[2] = month[1] + month[2];
                                month[1] = month[2] - month[1];
                                month[2] = month[2] - month[1];
                                days[2] = days[1] + days[2];
                                days[1] = days[2] - days[1];
                                days[2] = days[2] - days[1];
                                year[4] = -1;
                            } else {
                                year[4] = 1;
                            }
                            year[3] = 0;

                            for (i = year[1]; i < year[2]; i++) {
                                year[3] += 1;
                            }
                            days[1] = (days[1] === 31) ? 30 : days[1];
                            days[2] = (days[2] === 31) ? 30 : days[2];
                            valueReturn = year[4] * (((year[3] - 1) * 360) + ((13 - month[1]) * 30 - days[1]) + ((month[2] - 1) * 30 + days[2]));
                            check_value_data = !isNaN(valueReturn);
                        } else {
                            valueReturn = 'NaN';
                            check_value_data = false;
                        }
                    } else {
                        valueReturn = 'NaN';
                    }
                    valueNotFormat = valueReturn;
                    break;
                case 'MIN':
                    valueNotFormat = formulajs.MIN(values);
                    if (check_has_currency_symbol || cell_has_format > 1) {
                        valueReturn = accounting.formatMoney(valueNotFormat, accounting_for_cells.currency);
                    } else {
                        valueReturn = accounting.formatNumber(valueNotFormat, accounting_for_cells.number);
                    }
                    break;
                case 'MAX':
                    valueNotFormat = formulajs.MAX(values);
                    if (check_has_currency_symbol || cell_has_format > 1) {
                        valueReturn = accounting.formatMoney(valueNotFormat, accounting_for_cells.currency);
                    } else {
                        valueReturn = accounting.formatNumber(valueNotFormat, accounting_for_cells.number);
                    }
                    break;
                case 'AVG':
                    values = merge_value_from_cells(values);
                    valueNotFormat = formulajs.SUM(values) / values.length;
                    if (check_has_currency_symbol || cell_has_format > 1) {
                        valueReturn = accounting.formatMoney(valueNotFormat, accounting_for_cells.currency);
                    } else {
                        valueReturn = accounting.formatNumber(valueNotFormat, accounting_for_cells.number);
                    }
                    break;
                case 'CONCAT':
                    valueReturn = '';
                    values = merge_value_from_cells(values);
                    values.map(function (foo) {
                        valueReturn = valueReturn + '' + foo;
                    });
                    valueNotFormat = valueReturn;
                    break;
            }
        }
    }

    if (check_value_data === true) {
        if (!onl_value_cell) {
            window.jquery(td).text(valueReturn);
        }
    } else {
        function_data.check_value_data = check_value_data;
    }
    return [valueReturn, valueNotFormat];
}

function merge_value_from_cells(values) {
    var value = [];

    values.map(function (foo) {
        if (foo === null) {
            foo = '';
        }
        if (foo !== false) {
            if (typeof foo === 'object') {
                value = value.concat(merge_value_from_cells(foo));
            } else {
                value = value.concat([foo]);
            }
        }
    });

    return value;
}

function parse_boolean_calculation(values, decimal_symbol) {
    var math = values.match(/<=|>=|!=|>|<|=/g);
    var value = true, value1, value2;
    if (math !== null) {
        value1 = values.split(math[0])[0];
        value2 = values.split(math[0])[1];
        value1 = accounting.unformat(value1, decimal_symbol);
        value2 = accounting.unformat(value2, decimal_symbol);
        switch (math[0]) {
            case '<=':
                value = Number(value1) <= Number(value2);
                break;
            case '>=':
                value = Number(value1) >= Number(value2);
                break;
            case '=':
                value = Number(value1) === Number(value2);
                break;
            case '!=':
                value = Number(value1) !== Number(value2);
                break;
            case '<':
                value = Number(value1) < Number(value2);
                break;
            case '>':
                value = Number(value1) > Number(value2);
                break;
        }
    } else {
        value = values === 'true' ? true : false;
    }
    return value;
}

/* harmony default export */ __webpack_exports__["default"] = ({
    render,
    evaluateFormulas2,
});


/***/ }),

/***/ "./app/admin/assets/js/_functions.js":
/*!*******************************************!*\
  !*** ./app/admin/assets/js/_functions.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _alternating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_alternating */ "./app/admin/assets/js/_alternating.js");
/* harmony import */ var _wptm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_wptm */ "./app/admin/assets/js/_wptm.js");
/* harmony import */ var _initHandsontable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_initHandsontable */ "./app/admin/assets/js/_initHandsontable.js");




var F_name = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
var M_name = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", "oct", "nov", "dec"];
var l_name = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
var D_name = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
var regex = new RegExp('^=(DATE|DAY|DAYS|DAYS360|AND|OR|XOR|SUM|MULTIPLY|DIVIDE|COUNT|MIN|MAX|AVG|CONCAT|date|day|days|days360|and|or|xor|sum|multiply|divide|count|min|max|avg|concat)\\((.*?)\\)$');

// set value for an html switch-button element from Style object
function updateSwitchButtonFromStyleObject(styleObj, prop, that, defaultValue, callback) {
    if (checkObjPropertyNested(styleObj, prop)) {
        defaultValue = styleObj[prop];
    }
    that.val(defaultValue == 1 ? 'yes' : 'no').prop("checked", defaultValue == 1);

    if (typeof callback !== 'undefined') {
        callback.call(that);
    }
}

// set value for an html input element from cellStyle object
function updateParamFromStyleObject(styleObj, prop, that, defaultValue, callback) {
    if (checkObjPropertyNested(styleObj, prop)) {
        that.val(styleObj[prop]);
    } else {
        that.val(defaultValue);
    }
    if (typeof callback !== 'undefined') {
        callback.call(that);
    }
}

// set value for an html input element from cellStyle object
function updateParamFromStyleObjectSelectBox(styleObj, prop, that, defaultValue, callback, multiple_select) {
    if (styleObj !== '') {
        if (checkObjPropertyNested(styleObj, prop)) {
            defaultValue = styleObj[prop];
        }
    }
    that.data('value', defaultValue);

    var text = '';
    if (multiple_select) {
        jquery.each(defaultValue.split('|'), function (i, v) {
            if (text !== '') {
                text += ',' + that.find('li[data-value="' + v + '"]').text();
            } else {
                text += that.find('li[data-value="' + v + '"]').text();
            }
        })
    } else if (that.find('li[data-value="' + defaultValue + '"]').length > 0) {
        text += that.find('li[data-value="' + defaultValue + '"]').text();
    }
    that.prev('.wptm_select_box_before').text(text === '' ? defaultValue : text).data('value', defaultValue);

    if (typeof callback !== 'undefined' && callback !== null) {
        callback.call(that);
    }
}

function combineChangedCellIntoRow(extendData) {
    if(changedData.length < 1) {
        changedData = [{row: extendData.row, cell: [{col: extendData.col, content: extendData.content}]}];
    } else {
        var newRow = true;
        for(var i = 0; i < changedData.length; i++) {
            var rowData = changedData[i];
            if(rowData.row === extendData.row) {
                var newCell = true;
                for(var j = 0; j < rowData.cell.length; j++) {
                    var cellData = rowData.cell[j];
                    if(cellData.col === extendData.col) {
                        cellData.content = extendData.content;
                        newCell = false;
                        break;
                    }
                }
                if(newCell) {
                    rowData.cell.push({col: extendData.col, content: extendData.content});
                }
                newRow = false;
                break;
            }
        }
        if(newRow) {
            changedData.push({row: extendData.row, cell: [{col: extendData.col, content: extendData.content}]});
        }
    }
}

// check for existence of nested object key
// example: var test = {level1:{level2:{level3:'level3'}} };
// checkObjPropertyNested(test, 'level1', 'level2', 'level3'); // true
function checkObjPropertyNested(obj /*, level1, level2, ... levelN*/) {
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < args.length; i++) {
        if (!obj || !obj.hasOwnProperty(args[i])) {
            return false;
        }
        obj = obj[args[i]];
    }
    return true;
}

// check for existence of nested object key and check value not empty
// example: var test = {level1:{level2:{level3:'level3'}} };
// checkObjPropertyNestedNotEmpty(test, 'level1', 'level2', 'level3'); // true
function checkObjPropertyNestedNotEmpty(obj /*, level1, level2, ... levelN*/) {
    var args = Array.prototype.slice.call(arguments, 1);

    for (var i = 0; i < args.length; i++) {
        if (!obj || !obj.hasOwnProperty(args[i]) || !obj[args[i]]) {
            return false;
        }
        obj = obj[args[i]];
    }
    return true;
}

/**
 * calculater height for table when change height row
 *
 * @param topElement
 * @returns {number}
 */
function calculateTableHeight(topElement) {
    var top = topElement.outerHeight() + 33, paddingBottom;
    if (canInsert == 1) {
        paddingBottom = 30; //px
    } else {
        paddingBottom = 10; //px
    }

    var windownHeight = jquery(window).height();
    var height = windownHeight - top - paddingBottom;
    return height;
}
//convert aphabel to number when get col number
function convertStringToNumber (val) {
    var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', i, j, result = 0;

    for (i = 0, j = val.length - 1; i < val.length; i += 1, j -= 1) {
        result += Math.pow(base.length, j) * (base.indexOf(val[i]) + 1);
    }

    return result;
}

/*print getSelect cell to element*/
function getSelectedVal(dataSelect, selectRange) {
    var valueRange = '';

    if (dataSelect[1] > 25) {
        valueRange += String.fromCharCode(97) + String.fromCharCode(97 + dataSelect[1] - 26);
    } else {
        if (dataSelect[1] !== false) {
            valueRange += String.fromCharCode(97 + dataSelect[1]);
        }
    }
    if (dataSelect[0] !== false) {
        valueRange += dataSelect[0] + 1;
    }

    valueRange += ':';


    if (dataSelect[3] > 25) {
        valueRange += String.fromCharCode(97) + String.fromCharCode(97 + dataSelect[3] - 26);
    } else {
        if (dataSelect[3] !== false) {
            valueRange += String.fromCharCode(97 + dataSelect[3]);
        }
    }
    if (dataSelect[2] !== false) {
        valueRange += dataSelect[2] + 1;
    }
    if (typeof selectRange !== 'undefined') {
        selectRange.val(valueRange);
    } else {
        return valueRange;
    }
}

function warning_edit_db_table (field, value) {
    var edit = wptmText.warning_edit_db_table.replace('FIELD_JOOMUNITED', field).replace('FIELD_JOOMUNITED_VALUE', value);
    bootbox.confirm(edit, wptmText.Cancel, wptmText.Ok, function(result){
        if (result) {
            saveData = saveData.concat(Wptm.saveDataDbTable);
            wptm_element.mainTabContent.addClass('loading_ajax');
            saveChanges(true);
        } else {
            Wptm.saveDataDbTable = [];
        }
    });
}

/*time out auto save*/
var autosaveNotification;
var getSaveAjax;

function cleanHandsontable () {
    wptm_element.primary_toolbars.find('#undo_cell').removeClass('active').addClass('no_active');
    wptm_element.primary_toolbars.find('#redo_cell').removeClass('active').addClass('no_active');
    setTimeout(function () {
        jquery(Wptm.container).handsontable('getInstance').undoRedo.clear();
    }, 500);
}

/*saving table*/
function saveChanges(autosave, ajaxCallback) {
    var $ = window.jquery;
    Wptm.saveDataDbTable = [];
    if (!(window.Wptm.can.edit || (window.Wptm.can.editown && data.author === window.Wptm.author))) {
        return;
    }
    //check save calculate date
    if (window.table_function_data.check_value_data === false) {
        setTimeout(function () {
            $('#saveErrorTable').animate({'top': '+=75px', 'opacity': '1'}, 500).delay(2000).animate({
                'top': '-=75px',
                'opacity': '0'
            }, 1000);
        }, 1000);
        window.table_function_data.check_value_data = true;
        return;
    }

    if ((typeof autosave == 'undefined' && !enable_autosave) || autosave === false) {
        checkTimeOut = false;
        return;
    }
    if (!checkTimeOut) {
        clearTimeout(getSaveAjax);
    }

    checkTimeOut = false;

    var delay_time = enable_autosave ? 5000 : 0;

    if (autosave === true) {
        delay_time = 100;
    }

    getSaveAjax = setTimeout(function () {
        /*check have the change Alternate*/
        if (_.size(window.table_function_data.checkChangeAlternate) > 0) {
            window.Wptm.style.cells = $.extend({}, _alternating__WEBPACK_IMPORTED_MODULE_0__["default"].reAlternateColor());
        }

        var save_data;

        if (window.Wptm.mergeCellsSetting.length > 0) {//update header option by merger cells
            var i;
            var maxHeader = window.Wptm.headerOption;
            for (i = 0; i < window.Wptm.mergeCellsSetting.length; i++) {
                var mergeSetting = window.Wptm.mergeCellsSetting[i];
                maxHeader = (mergeSetting.row < maxHeader && mergeSetting.row + mergeSetting.rowspan > maxHeader) ? mergeSetting.row + mergeSetting.rowspan : maxHeader;
            }

            if (maxHeader > window.Wptm.headerOption) {
                saveData.push({
                    action: 'set_header_option',
                    value: maxHeader
                });
                window.Wptm.headerOption = maxHeader;

                if (Wptm.style.table.freeze_row > 0) {
                    $(Wptm.container).handsontable('updateSettings', {fixedRowsTop: maxHeader});
                }
            }
        }
        if (typeof table_function_data.colsSetType !== 'undefined') {
            saveData.push({
                action: 'set_columns_types',
                value: table_function_data.colsSetType
            });
            delete table_function_data.colsSetType;
        }

        if (table_function_data.save_table_params.length > 0) {
            save_data = JSON.stringify(table_function_data.save_table_params);
        } else {
            save_data = JSON.stringify(saveData);
        }
        var Wptm_hyperlink = {};
        if (typeof Wptm.hyperlink !== 'undefined') {
            Wptm_hyperlink = $.extend({}, {}, Wptm.hyperlink);
            $.each(Wptm.hyperlink, function (i, v) {
                Wptm_hyperlink[i] = {};
                Wptm_hyperlink[i].hyperlink = v.hyperlink;
                Wptm_hyperlink[i].text = typeof v.text !== 'undefined' ? v.text : '';
                if (typeof v.text !== 'undefined' && v.text.indexOf('\"') > -1) {
                    Wptm_hyperlink[i].text = v.text.replaceAll('\"', '\\"');
                }
            })
        } else {
            Wptm_hyperlink = {};
        }

        var jsonVar = {
            jform: {
                datas: save_data,
                style: JSON.stringify({'table': window.Wptm.style.table, 'cols': window.Wptm.style.cols, 'rows': window.Wptm.style.rows}),
                css: window.Wptm.css,
                params: (window.Wptm.type !== 'html') ? {"mergeSetting": JSON.stringify(window.Wptm.mergeCellsSetting), "headerOption": 1} : {
                    "mergeSetting": JSON.stringify(window.Wptm.mergeCellsSetting),
                    "hyperlink": JSON.stringify(Wptm_hyperlink),
                    "headerOption": window.Wptm.headerOption
                },
                count: {'countRows': $(window.Wptm.container).handsontable('countRows'), 'countCols': $(window.Wptm.container).handsontable('countCols')}
            },
            id: window.Wptm.id
        };

        if (typeof window.Wptm.syn_hash !== 'undefined' && window.Wptm.syn_hash !== '') {
            jsonVar.jform.syn_hash = window.Wptm.syn_hash;
        }

        window.Wptm.style = cleanStyle(window.Wptm.style, $(window.Wptm.container).handsontable('countRows'), $(window.Wptm.container).handsontable('countCols'));
        window.table_function_data.old_slection = window.table_function_data.selection;
        // return;
        $.ajax({
            url: wptm_ajaxurl + "task=table.save",
            dataType: "json",
            type: "POST",
            data: jsonVar,
            beforeSend: function () {
                wptm_element.settingTable.find('.wptm_save_error').addClass('wptm_hiden');
                wptm_element.settingTable.find('.wptm_saving').html('<span>' + wptmText.SAVING + '</span>');
                wptm_element.settingTable.find('.wptm_saving').removeClass('wptm_hiden');
                window.table_function_data.firstRender = false;
            },
            success: function (datas) {
                if (datas.response === true) {
                    wptm_element.settingTable.find('.wptm_save_error').addClass('wptm_hiden');
                    wptm_element.settingTable.find('.wptm_saving').html('<span>' + wptmText.ALL_CHANGES_SAVED + '</span>');

                    //empty data in saveData
                    if (table_function_data.save_table_params.length > 0) {
                        table_function_data.save_table_params = [];
                    } else {
                        saveData = [];
                    }

                    update_after_save(datas.datas);
                    if (typeof ajaxCallback !== 'undefined' && ajaxCallback === 'render') {
                        setTimeout(function () {
                            window.jquery(wptm_element.tableContainer).handsontable('render');
                        }, 500);
                    }

                    setTimeout(function () {
                        wptm_element.settingTable.find('.wptm_saving').addClass('wptm_hiden');
                    }, 1500);
                } else {
                    bootbox.alert(datas.response, wptmText.Ok);
                }
                if (typeof ajaxCallback == 'function') {
                    ajaxCallback(window.Wptm.id)
                }
                window.table_function_data.firstRender = true;
            },
            error: function (jqxhr, textStatus, error) {
                bootbox.alert(textStatus + " : " + error, wptmText.Ok);
            }
        });
        checkTimeOut = true;
    }, delay_time);
}

/**
 * convert cell data by column type
 *
 * @param position cell position
 * @param value    New value
 * @returns {string|boolean}
 */
function cell_type_to_column (position, value) {
    if ((Wptm.type !== 'mysql' && typeof Wptm.style.table.col_types[position[1]] !== 'undefined')
        || (typeof Wptm.query_option !== 'undefined' && typeof Wptm.query_option.column_options !== 'undefined' && typeof Wptm.query_option.column_options[position[1]] !== 'undefined')) {
        if (value === null) {
            value = '';
        }
        var type_column;
        if (Wptm.type === 'mysql' && typeof Wptm.query_option.column_options !== 'undefined' && typeof Wptm.query_option.column_options[position[1]] !== 'undefined') {
            type_column = Wptm.query_option.column_options[position[1]].Type;
        } else {
            type_column = Wptm.style.table.col_types[position[1]];
        }
        var data = validate_type_cell(type_column, value);
        return data;
    }
    return true;
}

function deleteRowDbTable (table, field, id_row) {
    var url = wptm_ajaxurl + "task=table.deleteRowDbTable";
    wptm_element.mainTabContent.addClass('loading_ajax');

    jquery.ajax({
        url: url,
        data: {
            id_table: Wptm.id,
            value: id_row,
            field: field,
            table: table
        },
        type: 'POST',
        success: function (datas) {
            updateDataAndParamsTable();
        },
        error: function (jqxhr, textStatus, error) {
            bootbox.alert(textStatus + " : " + error, wptmText.Ok);
        }
    })
}

function createRowDbTable (dbtable, list_value) {
    var url = wptm_ajaxurl + "task=table.createRowDbTable";
    wptm_element.mainTabContent.addClass('loading_ajax');
    jquery.ajax({
        url: url,
        data: {
            id: Wptm.id,
            data: list_value,
            dbtable: dbtable
        },
        type: 'POST',
        success: function (datas) {
            updateDataAndParamsTable();
        },
        error: function (jqxhr, textStatus, error) {
            bootbox.alert(textStatus + " : " + error, wptmText.Ok);
        }
    })
}

function validate_type_cell (type_column, value) {
    var date_string;
    var length = value.length;

    var result = regex.exec(value);

    switch (type_column.toUpperCase()) {
        case 'INT':
            if (value === '') {
                value = '0';
            }

            if (result === null) {
                if (value.replace(/[ |0-9]+/g, '') !== '') {
                    return false;
                }
                if (parseInt(value) < -2147483648 && parseInt(value) > 2147483647) {
                    return false;
                }
            }
            break;
        case 'SMALLINT':
            if (value === '') {
                value = '0';
            }

            if (result === null) {
                if (value.replace(/[ |0-9]+/g, '') !== '') {
                    return false;
                }
                if (parseInt(value) < -32768 && parseInt(value) > 32767) {
                    return false;
                }
            }
            break;
        case 'TINYINT':
            if (value === '') {
                value = '0';
            }

            if (result === null) {
                if (value.replace(/[ |0-9]+/g, '') !== '') {
                    return false;
                }
                if (parseInt(value) < -128 && parseInt(value) > 127) {
                    return false;
                }
            }
            break;
        case 'MEDIUMINT':
            if (value === '') {
                value = '0';
            }
            if (result === null) {
                if (value.replace(/[ |0-9]+/g, '') !== '') {
                    return false;
                }
                if (parseInt(value) < -8368608 && parseInt(value) > 8368607) {
                    return false;
                }
            }
            break;
        case 'bigint unsigned':
            if (value === '') {
                value = '0';
            }
            if (value.replace(/[ |0-9]+/g, '') !== '') {
                return false;
            }
            break;
        case 'DECIMAL(16,4)':
            if (value === '') {
                value = '0';
            }
            if (value.replace(/[ |0-9|.]+/g, '') !== '') {
                return false;
            }
            break;

        case 'DATE':
            if (value !== '') {
                date_string = convertDate(["Y", "m", "d"], value.match(/[a-zA-Z0-9|+|-|\\]+/g), true);
                if (date_string === false) {
                    return false;
                }
                if (date_string === '00-00-0000') {
                    return '0000-00-00';
                }
                date_string = new Date(date_string);
                if (isNaN(date_string.getTime())) {
                    return false;
                }
                return date_string.getUTCFullYear() + '-' + ((date_string.getMonth() < 10) ? '0' + (date_string.getMonth() + 1) : date_string.getMonth() + 1) + '-' + date_string.getDate();
            } else {
                return '0000-00-00';
            }
            break;
        case 'DATETIME':
            if (value !== '') {
                date_string = convertDate(["Y", "m", "d", "h", "i", "s"], value.match(/[a-zA-Z0-9|+|-|\\]+/g), true);
                if (date_string === false) {
                    return false;
                }
                if (date_string === '00/00/0000 0:00:00 ') {
                    return '0000-00-00 00:00:00';
                }
                date_string = new Date(date_string);
                if (isNaN(date_string.getTime())) {
                    return false;
                }
                return date_string.getUTCFullYear() + '-' + ((date_string.getMonth() < 10) ? '0' + (date_string.getMonth() + 1) : date_string.getMonth() + 1) + '-' + date_string.getDate() + ' ' + date_string.getHours() + ':' + date_string.getMinutes() + ':' + date_string.getSeconds();
            } else {
                return '0000-00-00 00:00:00';
            }
            break;
        case 'TIME':
            if (value !== '') {
                date_string = convertDate(["H", "m", "S"], value.match(/[a-zA-Z0-9|+|-|\\]+/g), true);
                if (date_string === false) {
                    return false;
                }
                if (date_string === '00-00-00 ') {
                    return '00:00:00';
                }
                date_string = new Date(date_string);
                if (isNaN(date_string.getTime())) {
                    return false;
                }
                return date_string.getHours() + ':' + date_string.getMinutes() + ':' + date_string.getSeconds();
            } else {
                return '00:00:00';
            }
            break;
        case 'TIMESTAMP':
            if (value !== '') {
                if (isNaN(value) || parseInt(value) < 0) {
                    return false;
                }
                date_string = (new Date(value)).getTime() > 0;

                if (date_string === false) {
                    return false;
                }

                return value;
            }
            break;

        case 'VARCHAR':
            if (length > 255) {
                return false;
            }
            break;
        case 'TEXT':
            if (length > 65500) {
                return false;
            }
            break;
        case 'LONGTEXT':
            if (length > 4294967294) {
                return false;
            }
            break;
        case 'MEDIUMTEXT':
            if (length > 16777214) {
                return false;
            }
            break;
        case 'CHAR':
            if (length > 255) {
                return false;
            }
            break;
        case 'FLOAT':
            if (value === '') {
                value = '0';
            }
            if (result === null) {
                if (isNaN(parseFloat(value))) {
                    return false;
                }
            }
            break;
        default:
            return value;
            break;
    }
    return value;
}

function updateDataAndParamsTable() {
    var url = wptm_ajaxurl + "view=table&format=json&id=" + Wptm.id;
    var $ = jquery;
    $.ajax({
        url: url,
        type: "POST",
        data: {},
        dataType: "json",
    }).done(function (data) {
        if (data.datas === '' || data.datas === false) {
            delete Wptm.datas;
            Wptm.datas = [
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""]
            ];
        } else {
            data.datas = JSON.stringify(data.datas);
            try {
                Wptm.datas = JSON.parse(data.datas);
            } catch (err) {
                Wptm.datas = [
                    ["", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", ""]
                ];
            }
        }

        Wptm.style = $.parseJSON(data.style);
        if (data.params === "" || data.params === null || data.params.length == 0) {
            Wptm.mergeCellsSetting = [];
            Wptm.headerOption = 1;
        } else {
            if (typeof (data.params) == 'string') {
                data.params = $.parseJSON(data.params);
            }

            if (typeof data.params.headerOption !== 'undefined') {
                Wptm.headerOption = parseInt(data.params.headerOption);
            } else {
                Wptm.headerOption = 1;
            }
            if (Wptm.headerOption > 0 && (typeof Wptm.style.table.header_data === 'undefined' || Wptm.style.table.header_data.length < Wptm.headerOption)) {
                Wptm.style.table.header_data = [];
                for (var j = 0; j < Wptm.headerOption; j++) {
                    Wptm.style.table.header_data[j] = Wptm.datas[j];
                }
            }
            window.jquery(window.Wptm.container).data('handsontable').loadData(Wptm.datas);
        }
        wptm_element.mainTabContent.removeClass('loading_ajax');
    })
    return false;
}

/**
 * Update some value in Wptm after saving ajax
 * @param datas
 */
function update_after_save(datas) {
    if (typeof datas.type !== 'undefined') {
        jquery.each(datas.type, function (i, v) {
            switch (i) {
                case "reload_table":
                    updateDataAndParamsTable();
                    break;
                case "set_columns_types":
                    var selected = [];

                    jquery.each(window.table_function_data.old_slection, function (i, v) {
                        if (typeof Wptm.headerOption !== 'undefined') {
                            if (v[0] < parseInt(Wptm.headerOption)) {
                                v[0] = parseInt(Wptm.headerOption);
                            }
                        }
                        selected[i] = v;
                    });

                    change_value_cells(selected, v, 'col%key');
                    break;
                case "update_params":
                    var params = jquery.parseJSON(v);
                    if (typeof params.headerOption !== 'undefined') {
                        Wptm.headerOption = parseInt(params.headerOption);
                    } else {
                        Wptm.headerOption = 1;
                    }
                    try {
                        Wptm.mergeCellsSetting = jquery.parseJSON(params.mergeSetting);
                        if (Wptm.mergeCellsSetting == null) {
                            Wptm.mergeCellsSetting = [];
                        }
                    } catch (e) {
                        Wptm.mergeCellsSetting = [];
                    }

                    //not update header_data, it was updated
                    if (typeof params.header_data !== 'undefined') {
                        var old_header_data = Wptm.style.table.header_data;
                        delete params.header_data;
                    }
                    params.hyperlink = params.hyperlink.replaceAll('\\\\\\"', '\\"');
                    Wptm.hyperlink = jquery.parseJSON(params.hyperlink);
                    window.Wptm.style.table = jquery.extend({}, params);
                    window.Wptm.style.table.header_data = old_header_data;
                    break;
            }
        });

        if (typeof table_function_data.fetch_data !== 'undefined') {
            _wptm__WEBPACK_IMPORTED_MODULE_1__["default"].fetchSpreadsheet(table_function_data.fetch_data);
        }
    }
}

/**
 * change cells value when add function in toolbar
 *
 * @param selection
 * @param values
 * @param keyColum
 */
function change_value_cells(selection, values, keyColum) {
    table_function_data.data_argument = [];
    var i, j, jj, value;
    if (selection === null) {
        selection = table_function_data.selection;
    }

    var cellProperties;

    for (jj = 0; jj < table_function_data.selectionSize; jj++) {
        for (i = selection[jj][0]; i <= selection[jj][2]; i++) {
            for (j = selection[jj][1]; j <= selection[jj][3]; j++) {
                cellProperties = check_cell_readOnly(i, j, true);
                if (typeof cellProperties.readOnly == "undefined" || cellProperties.readOnly !== true) {
                    if (Array.isArray(values)) {
                        value = values[i][keyColum.replace('%key', j)];
                        table_function_data.data_argument.push([i, j, value, 'wptm_change_value_after_set_columns_types']);
                    } else {
                        value = values;
                        table_function_data.data_argument.push([i, j, value]);
                    }
                    Wptm.datas[i][j] = value;
                }
            }
        }
    }

    if (table_function_data.changeTheme) {
        _wptm__WEBPACK_IMPORTED_MODULE_1__["default"].updatepreview(Wptm.id);
    }
    if (table_function_data.data_argument.length < 5) {//if cells number < 5 then setDataAtCell() is more performance
        window.jquery(window.Wptm.container).data('handsontable').setDataAtCell(table_function_data.data_argument, 'setDataAtCell');
    } else {
        window.jquery(window.Wptm.container).data('handsontable').loadData(Wptm.datas);
    }
}

//function in table DB
function loadTableContructor() {
    var $ = window.jquery;
    var id_table = $('li.wptmtable.active').data('id-table');
    var table_type = $('li.wptmtable.active').data('table-type');
    var $mainTable = $("#mainTable");
    $mainTable.find(".tabDataSource").hide();
    $mainTable.find(".groupTable" + id_table).show();
    if (table_type == 'mysql') {
        if ($("#tabDataSource_" + id_table).length == 0) {
            var firstTab = $mainTable.find('li').get(0);
            $(firstTab).after('<li><a data-toggle="tab" id="tabDataSource_' + id_table + '" class="tabDataSource groupTable' + id_table + '" href="#dataSource_' + id_table + '">Data Source</a></li>');
            $('#mainTabContent.tab-content').append('<div class="db_table tab-pane" id="dataSource_' + id_table + '">' +
                '<div class="dataSourceContainer" style="padding-top:10px" ></div></div>');

            $.ajax({
                url: wptm_ajaxurl + "view=dbtable&id_table=" + id_table,
                type: "GET"
            }).done(function (data) {
                $("#dataSource_" + id_table).html(data);
            });
        }
    }
    //do nothing
}

// Build column selection for default sort parameter
function default_sortable(tableData) {
    var $ = window.jquery;
    if (tableData && typeof tableData[0] !== 'undefined') {
        var $jform_default_sortable = $('#content_popup_hide').find('.select_columns');
        var $jform_reponsive_table = $('#content_popup_hide').find('#responsive_table table tbody');
        var $jform_column_type_table = $('#content_popup_hide').find('#column_type_table table tbody');
        $jform_default_sortable.contents('li').remove();
        $jform_reponsive_table.html('');
        $jform_column_type_table.html('');
        var html = '';
        var html2 = '';
        var column_type_html = '';
        var ii = 0;

        var responsive_priority = '';
        for (var number = 0; number < (window.Wptm.max_Col > 12 ? window.Wptm.max_Col : 12); number++) {
            responsive_priority += '<li data-value="' + number + '">' + number + '</li>\n';
        }

        $.each(tableData[0], function (i, e) {
            var table_headers = jQuery(Wptm.container).handsontable('getColHeader');
            var header = table_headers[i];
            html += '<li data-value="' + ii + '">' + header + '</li>';

            html2 += '<tr data-col="' + ii + '">';
            html2 += '<td><label>' + header + '</label></td>';
            html2 += '<td><span class="responsive_priority popup_select mb-0 wptm_select_box_before"></span><ul class="wptm_select_box">\n'
                + responsive_priority +
                '</ul></td>';
            html2 += '</tr>';

            column_type_html += '<tr data-col="' + ii + '">';
            column_type_html += '<td><label>' + header + '</label></td>';
            column_type_html += '<td><span class="column_type popup_select mb-0 wptm_select_box_before"></span><ul class="wptm_select_box">\n' +
                '                        <li data-value="varchar">'+wptmContext.column_type_varchar+'</li>\n' +
                '                        <li data-value="int">'+wptmContext.column_type_int+'</li>\n' +
                '                        <li data-value="float">'+wptmContext.column_type_float+'</li>\n' +
                '                        <li data-value="date">'+wptmContext.column_type_date+'</li>\n' +
                '                        <li data-value="datetime">'+wptmContext.column_type_datetime+'</li>\n' +
                '                        <li data-value="text">'+wptmContext.column_type_text+'</li>\n' +
                '                    </ul></td>';
            column_type_html += '</tr>';
            ii++;
        });
        $(html).appendTo($jform_default_sortable);
        $jform_default_sortable.trigger("liszt:updated");
        $(html2).appendTo($jform_reponsive_table);
        $jform_reponsive_table.trigger("liszt:updated");
        $(column_type_html).appendTo($jform_column_type_table);
        $jform_column_type_table.trigger("liszt:updated");
    }
}

/*render data table, cells, rows, cols*/
function cleanStyle(style, nbRows, nbCols) {
    for (var col in style.cols) {
        if (!style.cols[col] || style.cols[col][0] >= nbCols) {
            delete style.cols[col];
        }
    }
    for (var row in style.rows) {
        if (!style.rows[row] || style.rows[row][0] >= nbRows) {
            delete style.rows[row];
        }
    }
    for (var cell in style.cells) {
        if (style.cells[cell][0] >= nbRows || style.cells[cell][1] >= nbCols) {
            delete style.cells[cell];
        }
    }
    var propertiesPos, cells;
    for (var obj in style) {
        if (obj == 'table') {
            continue;
        }
        for (cells in style[obj]) {
            propertiesPos = style[obj][cells].length - 1;
            for (var property in style[obj][cells][propertiesPos]) {
                if (style[obj][cells][propertiesPos][property] === null) {
                    delete style[obj][cells][propertiesPos][property];
                }
            }
        }
    }
    return style;
}

/*change text table name, chart name*/
function setText($name_edit, press_enter_selector, obj) {
    unbindall();
    /*select rename table*/
    var oldTitle = $name_edit.text();
    var wptm_name_edit = document.querySelector('.rename.wptm_name_edit');
    $name_edit.attr('contentEditable', true).focus();

    $name_edit.not('.editable').bind('click.mm', hstop);  //let's click on the editable object
    jquery(press_enter_selector).bind('keydown.mm', enterKey); //let's press enter to validate new title'
    jquery('*').not('.wptm_name_edit').bind('click.mm', houtside);

    // $name_edit.addClass('editable');
    if (obj.selected) {
        $name_edit.trigger('click.mm');
    }

    function unbindall(reselectCell) {
        $name_edit.not('.editable').unbind('click.mm', hstop);  //let's click on the editable object
        jquery(press_enter_selector).unbind('keydown.mm', enterKey); //let's press enter to validate new title'
        jquery('*').not('.wptm_name_edit').unbind('click.mm', houtside);
        $name_edit.attr('contentEditable', false);

        if (reselectCell && typeof table_function_data.selection[0][1] !== 'undefined') {//reselect cell after enter/esc name table
            var selection = window.jquery(window.Wptm.container).handsontable('getSelected');
            window.jquery(Wptm.container).handsontable("selectCell", selection[0][0], selection[0][1], selection[0][0], selection[0][1]);
        }
    }

    //Validation
    function hstop(e) {
        event.stopPropagation();
        $name_edit.addClass('editable');
        if (wptm_name_edit !== null) {
            wptm_name_edit.focus();
        }
        return false;
    }

    function enterKey(e) {
        e.stopImmediatePropagation();
        if (e.which == 13) {
            e.preventDefault();
            $name_edit.removeClass('editable');
            updateTitle($name_edit.text(), jquery);
            unbindall(true);
        }
        if (e.which == 27) {
            e.preventDefault();
            $name_edit.text(oldTitle);
            $name_edit.removeClass('editable');
            unbindall(true);
        }
        $name_edit.removeClass('rename');
    }

    function houtside(e) {
        if ($name_edit.hasClass('editable') && !$name_edit.hasClass('rename')) {
            $name_edit.removeClass('editable');
            updateTitle($name_edit.text(), jquery);
            unbindall(true);
            $name_edit.removeClass('rename');
        }
        return false;
    }

    function updateTitle(title, $) {
        if (!(Wptm.can.edit || (Wptm.can.editown && data.author === Wptm.author))) {
            return false;
        }

        if (oldTitle === title) {
            return false;
        }

        if (title.trim() !== '' && typeof obj.url !== 'undefined') {
            obj.url += title;
            $.ajax({
                url: obj.url,
                type: "POST",
                data: {},
                dataType: "json",
                beforeSend: function () {
                    wptm_element.settingTable.find('.wptm_saving div').removeClass('wptm_hiden');
                },
                success: function (datas) {
                    if (datas.response === true) {
                        $name_edit.text(title);
                        if ($('#pwrapper').hasClass('wptm_hiden')) {
                            $('#list_chart').find('.chart-menu.active a').text(title);
                        } else {
                            $('#list_chart').find('.current_table a').text(title);
                        }
                        if (typeof obj.action !== 'undefined') {
                            obj.action(title);
                        }
                        wptm_element.settingTable.find('.wptm_saving').removeClass('wptm_hiden');
                        setTimeout(function () {
                            wptm_element.settingTable.find('.wptm_saving').addClass('wptm_hiden');

                            localStorage.setItem('wptm_change_table_name', JSON.stringify({'id': Wptm.id,'title': title, 'modified_time': datas.datas.modified_time}));
                        }, 1500);
                    } else {
                        $name_edit.text(oldTitle);
                        bootbox.alert(datas.response, wptmText.Ok);
                    }
                },
                error: function (jqxhr, textStatus, error) {
                    $name_edit.text(oldTitle);
                    bootbox.alert(textStatus, wptmText.Ok);
                }
            });
        } else {
            $name_edit.text(oldTitle);
            return false;
        }
        $name_edit.css('white-space', 'normal');
        setTimeout(function () {
            $name_edit.css('white-space', '');
        }, 200);
    }
};

//https://gist.github.com/ncr/399624
jQuery.fn.single_double_click = function (single_click_callback, double_click_callback, timeout) {
    return this.each(function () {
        var clicks = 0, self = this;
        jQuery(this).click(function (event) {
            clicks++;
            if (clicks == 1) {
                setTimeout(function () {
                    if (clicks == 1) {
                        single_click_callback.call(self, event);
                    } else {
                        double_click_callback.call(self, event);
                    }
                    clicks = 0;
                }, timeout || 300);
            }
        });
    });
}
//add, change style for column, rows, cells
function getFillArray(selection, Wptm, value) {
    var i, ij, ik;
    if (table_function_data.option_selected_mysql !== '' && typeof table_function_data.option_selected_mysql !== 'undefined') {
        for (i = 0; i < table_function_data.selectionSize; i++) {
            for (ik = selection[i][1]; ik <= selection[i][3]; ik++) {
                Wptm.style.cols = fillArray(Wptm.style.cols, value, ik);
            }
        }
    } else {
        for (i = 0; i < table_function_data.selectionSize; i++) {
            for (ij = selection[i][0]; ij <= selection[i][2]; ij++) {
                for (ik = selection[i][1]; ik <= selection[i][3]; ik++) {
                    Wptm.style.cells = fillArray(Wptm.style.cells, value, ij, ik);
                }
            }
        }
    }

    var action = Array.prototype.slice.call(arguments, 3);

    var save_data = false;
    if (action.length === 0) {
        action = 'style';
    } else {
        if (action.length > 1) {
            save_data = action[1];
        }
        if (action.length > 2) {
            action[2].call();
        }
        action = action[0];
    }

    if (saveData.length > 0) {
        var old_saveData = saveData[saveData.length - 1];
        var checkRangeStyleExists = false;
        if (action === old_saveData.action) {
            for (i = 0; i < table_function_data.selectionSize; i++) {
                if (old_saveData.selection[i][0] == selection[i][0] &&
                    old_saveData.selection[i][1] == selection[i][1] &&
                    old_saveData.selection[i][2] == selection[i][2] &&
                    old_saveData.selection[i][3] == selection[i][3]) {
                    checkRangeStyleExists = true;
                }
            }
        }

        if (checkRangeStyleExists) {
            old_saveData.style = window.jquery.extend(old_saveData.style, value);
        } else {
            if (droptablesCheckSize(value) > 0) {
                saveData.push({action: action, selection: selection, style: value});
                if (save_data) {
                    saveChanges(true);
                }
            }
        }
    } else {
        if (droptablesCheckSize(value) > 0) {
            saveData.push({action: action, selection: selection, style: value});
            if (save_data) {
                saveChanges(true);
            }
        }
    }
}

function droptablesCheckSize (obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function removeValueInArray(array, parameters, val1, val2) {
    if (typeof (val2) === 'undefined') {
        if (typeof (val1) !== 'undefined') {
            if (typeof (array[val1]) !== 'undefined') {
                if (typeof array[val1][1][parameters] !== 'undefined') {
                    delete array[val1][1][parameters];
                }
            } else {
                array[val1] = [val1, {}];
            }
        } else {
            delete array[parameters];
        }
    } else {
        if (typeof (array[val1 + "!" + val2]) !== 'undefined') {
            if (typeof array[val1 + "!" + val2][2][parameters] !== 'undefined') {
                delete array[val1 + "!" + val2][2][parameters];
            }
        } else {
            array[val1 + "!" + val2] = [val1, val2, {}];
        }
    }
    return array;
}

//update new value for array
function fillArray(array, val, val1, val2) {
    if (typeof (val2) === 'undefined') {
        if (typeof (val1) !== 'undefined') {
            if (typeof (array[val1]) !== 'undefined') {
                array[val1][1] = window.jquery.extend(array[val1][1], val);
            } else {
                array[val1] = [val1, {}];
                array[val1][1] = val;
            }
        } else {
            array = window.jquery.extend(array, val);
        }
    } else {
        if (typeof (array[val1 + "!" + val2]) !== 'undefined') {
            array[val1 + "!" + val2][2] = window.jquery.extend(array[val1 + "!" + val2][2], val);
        } else {
            array[val1 + "!" + val2] = [val1, val2, {}];
            array[val1 + "!" + val2][2] = val;
        }
    }
    return array;
}

function toggleArray(array, val, val1, val2) {
    if (typeof (val2) === 'undefined') {
        if (typeof (array[val1]) !== 'undefined') {
            if (typeof (val) === 'object') {
                for (var key in val) {
                    if (typeof (array[val1][1][key] !== 'undefined')) {
                        array[val1][1][key] = !array[val1][1][key];
                    } else {
                        array[val1][1][key] = val[key];
                    }
                }
            } else {
                array[val1][1] = jQuery.extend(array[val1][1], val);
            }
        } else {
            array[val1] = [val1, {}];
            array[val1][1] = val;
        }
    } else {
        if (typeof (array[val1 + "!" + val2]) !== 'undefined') {
            if (typeof (val) === 'object') {
                for (var key in val) {
                    if (typeof (array[val1 + "!" + val2][2][key] !== 'undefined')) {
                        array[val1 + "!" + val2][2][key] = !array[val1 + "!" + val2][2][key];
                    } else {
                        array[val1 + "!" + val2][2][key] = val[key];
                    }
                }
            } else {
                array[val1 + "!" + val2][2] = jQuery.extend(array[val1 + "!" + val2][2], val);
            }
        } else {
            array[val1 + "!" + val2] = [val1, val2, {}];
            array[val1 + "!" + val2][2] = val;
        }
    }

    return array;
}

//Code from http://stackoverflow.com/questions/9905533/convert-excel-column-alphabet-e-g-aa-to-number-e-g-25
var convertAlpha = function (val) {
    var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', i, j, result = 0;

    for (i = 0, j = val.length - 1; i < val.length; i += 1, j -= 1) {
        result += Math.pow(base.length, j) * (base.indexOf(val[i]) + 1);
    }

    return result;
};

function wptm_clone(v) {
    return JSON.parse(JSON.stringify(v));
}

//convert value of calculation by format selected
function formatSymbols(resultCalc, decimal_count, thousand_symbols, decimal_symbols, symbol_position, value_unit) {
    decimal_count = parseInt(decimal_count);
    if (typeof resultCalc === 'undefined') {
        return;
    }
    var negative = resultCalc < 0 ? "-" : "",
        i = parseInt(resultCalc = Math.abs(+resultCalc || 0).toFixed(decimal_count), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;

    resultCalc = (j ? i.substr(0, j) + thousand_symbols : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand_symbols) + (decimal_count ? decimal_symbols + Math.abs(resultCalc - i).toFixed(decimal_count).slice(2) : "");

    resultCalc = Number(symbol_position) === 0
        ? ((negative === "-") ? negative + value_unit : value_unit) + resultCalc
        : negative + resultCalc + ' ' + value_unit;

    return resultCalc;
};

// Convert date in date_format to the format: m/d/Y /a/t g:i A
// example: number -> array(2016,03,26)
function convertDate(date_format, number, timezone) {
    var date_array = [];
    number = (!!number) ? number : [];
    if (date_format.length !== number.length) {
        return false;
    }
    if (typeof timezone === 'undefined') {
        timezone = true;
    }
    for (var n = 0; n < date_format.length; n++) {
        number[n] = (!!number[n]) ? number[n] : '';
        if (date_format[n] === 'd' || date_format[n] === 'j') {
            date_array[2] = (number[n] !== '') ? number[n] : '';
        } else if (date_format[n] === 'S' || date_format[n] === 'jS' || date_format[n] === 'dS') {
            date_array[2] = number[n].match(/[0-9]+/g);
        } else if (date_format[n] === 'm' || date_format[n] === 'n') {
            date_array[1] = number[n];
        } else if (date_format[n] === 'F') {
            date_array[1] = F_name.indexOf(number[n].toLowerCase()) + 1;
        } else if (date_format[n] === 'M') {
            date_array[1] = M_name.indexOf(number[n].toLowerCase()) + 1;
        } else if (date_format[n].toLowerCase() === 'y') {
            date_array[3] = number[n];
        } else if (date_format[n].toLowerCase() === 'g' || date_format[n].toLowerCase() === 'h') {
            date_array[4] = Number(number[n]);
        } else if (date_format[n].toLowerCase() === 'ga' || date_format[n].toLowerCase() === 'ha') {
            date_array[4] = number[n].match(/[0-9]+/g);
            date_array[4] = (number[n].toLowerCase().match(/[a-z]+/g) === 'am') ? date_array[4] : date_array[4] + 12;
        } else if (date_format[n].toLowerCase() === 'a') {
            date_array[7] = number[n];
        } else if (date_format[n].toLowerCase() === 'i' || date_format[n].toLowerCase() === 'ia') {
            date_array[5] = number[n].match(/[0-9]+/g);
        } else if (date_format[n].toLowerCase() === 's' || date_format[n].toLowerCase() === 'sa') {
            date_array[6] = number[n].match(/[0-9]+/g);
        } else if (date_format[n] === 'T') {
            date_array[8] = number[n];
        } else if (date_format[n] === 'r') {
            if (M_name.indexOf(number[2].toLowerCase()) + 1 > 0) {
                date_array[1] = M_name.indexOf(number[2].toLowerCase()) + 1;
            } else {
                date_array[1] = F_name.indexOf(number[2].toLowerCase()) + 1;
            }
            return date_array[1] + '/' + number[1] + '/' + number[3] + ' ' + number[4] + ':' + number[5] + ':' + number[6] + ' ' + number[7];
        }
    }
    date_array[4] = (!!date_array[4]) ? date_array[4] : 0;
    date_array[5] = (!!date_array[5]) ? date_array[5] : '00';
    date_array[6] = (!!date_array[6]) ? date_array[6] : '00';
    date_array[7] = (!!date_array[7]) ? ' ' + date_array[7] : '';
    date_array[8] = (!!date_array[8]) ? ' ' + date_array[8] : '';
    date_array[8] = (timezone === true) ? ' ' + date_array[8] : '';

    if (date_array[7] !== 'undefined' && date_array[7] !== '' && date_array[4] > 12) {
        date_array[4] = date_array[4] - 12;
    }
    if (date_array[1] === 0 || date_array[2] > 31 || date_array[1] > 12) {
        return false;
    }
    return date_array[1] + '/' + date_array[2] + '/' + date_array[3] + ' ' + date_array[4] + ':' + date_array[5] + ':' + date_array[6] + date_array[7] + date_array[8];
}
//create string_currency_symbols, replace_unit, text_replace_unit, date_format RegExp string
function createRegExpFormat(table_function_data, currency_symbol, date_formats) {
    if (currency_symbol !== false) {
        table_function_data.string_currency_symbols = currency_symbol.replace(/ /g, "");
        // create string reg currency symbols
        table_function_data.replace_unit = new RegExp('[' + table_function_data.string_currency_symbols.replace(/,/g, "|") + ']', "g");

        // create string reg have not currency symbols
        table_function_data.text_replace_unit = '[^a-zA-Z|' + table_function_data.string_currency_symbols.replace(/,/g, "|^") + ']';
        table_function_data.text_replace_unit = new RegExp(table_function_data.text_replace_unit, "g");
        table_function_data.text_replace_unit_function = new RegExp('[^ |' + table_function_data.string_currency_symbols.replace(/,/g, "|^") + ']', "g");
    }
    if (date_formats !== false) {
        table_function_data.date_format = date_formats.match(/[a-zA-Z|\\]+/g);
    }
    return table_function_data;
}

// check column is int
function replaceCell($, cellsData, currency_symbol) {
    var data1 = [];
    var i = 0;
    var data2 = -1;
    var v1 = '';
    currency_symbol = new RegExp('[0-9|\.|\,|\\-|' + currency_symbol + ']', "g");

    $.each(cellsData, function (k, v) {
        v = v.toString();
        v1 = v.replace(currency_symbol, '');
        if (v1 === '') {
            data1[i] = k;
            i++;
        } else if (v !== '') {
            data2 = k;
        }
    });
    var data = [];
    data[1] = '';
    data[0] = data1;
    if (data2 !== -1) {
        data[1] = data2;
    }
    return data;
}
//get size of cell selected when open change height, row popup
function getSizeCells($, Wptm, cells) {
    if (Wptm.type === 'mysql') {
        updateParamFromStyleObject(Wptm.style.rows[0][1], 'height', $('#cell_row_height'), '30');
    } else {
        if (checkObjPropertyNested(Wptm.style.rows, cells[0], 1, 'height')) {
            $('#cell_row_height').val(Wptm.style.rows[cells[0]][1].height);
        }
    }

    if (checkObjPropertyNested(Wptm.style.cols, cells[1], 1, 'width')) {
        $('#cell_col_width').val(Wptm.style.cols[cells[1]][1].width);
    }
    if (checkObjPropertyNested(Wptm.style.table, 'allRowHeight')) {
        $('#all_cell_row_height').val(Wptm.style.table.allRowHeight);
    }
}

function pullDims(Wptm, $) {
    var args = Array.prototype.slice.call(arguments, 1);
    var cols = [];
    var rows = [];
    var row, lengthRows, lengthCols, col;

    // get count of Wptm.style.rows
    if (typeof Wptm.style.rows.length !== 'undefined') {
        lengthRows = Wptm.style.rows.length;
    } else {
        lengthRows = Object.keys(Wptm.style.rows).length;
    }

    for (row = 0; row < lengthRows; row++) {
        if (checkObjPropertyNested(Wptm.style.rows[row], 1, 'height')) {
            rows[row] = Wptm.style.rows[row][1].height;
        } else if (Wptm.type === 'mysql' && typeof Wptm.style.table.allRowHeight !== 'undefined' && Wptm.style.table.allRowHeight !== '') {
            rows[row] = Wptm.style.table.allRowHeight;
        } else {
            rows[row] = null;
        }
    }
    // get count of Wptm.style.cols

    if (typeof Wptm.style.cols.length !== 'undefined') {
        lengthCols = Wptm.style.cols.length;
    } else {
        lengthCols = Object.keys(Wptm.style.cols).length;
    }

    for (col = 0; col < lengthCols; col++) {
        if (checkObjPropertyNested(Wptm.style.cols[col], 1, 'width')) {
            cols[col] = Wptm.style.cols[col][1].width;
        } else {
            cols[col] = null;
        }
    }
    Wptm.updateSettings.manualColumnResize = $.extend([], cols);
    Wptm.updateSettings.rowHeights = $.extend([], rows);

    if (typeof args[1] === 'undefined' || args[1] === true) {
        delete Wptm.updateSettings.manualColumnResize;
        delete Wptm.updateSettings.manualRowResize;

        Wptm.container.handsontable('updateSettings', {'manualColumnResize': cols});
        Wptm.container.handsontable('updateSettings', {'manualRowResize': rows});
    }
}
//add row height, col width for Wptm.style
function pushDims($, Wptm) {
    //get value height rows
    var rows = $(Wptm.container).handsontable('countRows');
    var i = 0;
    var value = 0;
    for (i = 0; i < rows; i++) {
        value = $(Wptm.container).handsontable('getRowHeight', i);
        if (Wptm.type === 'html') {
            if (!value || value === 0) {
                if (typeof (Wptm.style.rows[i]) !== 'undefined' && typeof (Wptm.style.rows[i][1].height) !== 'undefined') {
                    value = parseInt(Wptm.style.rows[i][1].height);
                }
                if (value === null) {
                    value = 22;
                }
            }
        } else { //type mysql
            if (checkObjPropertyNestedNotEmpty(Wptm.style.rows[i], 1, 'height')) { //Row height is set
                value = parseInt(Wptm.style.rows[i][1].height);
            } else {
                value = null; //if aviation height is set then height === null
            }
        }

        Wptm.style.rows = fillArray(Wptm.style.rows, {height: parseInt(value)}, i);
        value = 0;
    }
    //get value width columns
    var cols = $(Wptm.container).handsontable('countCols');
    Wptm.max_Col = cols;
    Wptm.max_row = rows;

    Wptm.style.table.width = 0;
    var valueCols = 0;
    for (i = 0; i < cols; i++) {
        valueCols = $('#tableContainer').handsontable('getColWidth', i);
        if (!valueCols || valueCols === 0) {
            if (typeof (Wptm.style.cols[i]) !== 'undefined' && Wptm.style.cols[i] !== null && (typeof (Wptm.style.cols[i][1].width) !== 'undefined')) {
                valueCols = parseInt(Wptm.style.cols[i][1].width);
            } else {
                valueCols = null;
            }
        }
        if (!valueCols || valueCols === 0) {
            valueCols = 100;
        }

        Wptm.style.cols = fillArray(Wptm.style.cols, {width: parseInt(valueCols)}, i);

        Wptm.style.table.width += parseInt(valueCols);
        valueCols = 0;
    }
}
//add res priority of columns to set resposive priority popup
function responsive_col(Wptm) {
    var col = this.val();
    if (typeof (Wptm.style.cols) !== 'undefined' && typeof (Wptm.style.cols[col]) !== 'undefined' && typeof (Wptm.style.cols[col][1]) !== 'undefined' && typeof (Wptm.style.cols[col][1].res_priority) !== 'undefined') {
        var res_priority = Wptm.style.cols[col][1].res_priority;

        this.siblings('#responsive_priority').val(res_priority);
    } else {

        this.siblings('#responsive_priority').val(0);
    }
    this.siblings('#responsive_priority').trigger('liszt:updated');
}

function loading(e) {
    e.addClass('dploadingcontainer');
    e.append('<div class="dploading"></div>');
}

function rloading(e) {
    e.removeClass('dploadingcontainer');
    e.find('div.dploading').remove();
}
//add custom css for element
function parseCss($) {
    var parser = new (less.Parser);
    var content = '#mainTabContent .handsontable .ht_master .wtHider .wtSpreader .htCore tbody {' + $('#jform_css').val() + '}';
    content += '.reset {background-color: rgb(238, 238, 238);border-bottom-color: rgb(204, 204, 204);border-bottom-style: solid;border-bottom-width: 1px;border-collapse: collapse;border-left-color: rgb(204, 204, 204);border-left-style: solid;border-left-width: 1px;border-right-color: rgb(204, 204, 204);border-right-style: solid;border-right-width: 1px;border-top-color: rgb(204, 204, 204);border-top-style: solid;border-top-width: 1px;box-sizing: content-box;color: rgb(34, 34, 34);display: table-cell;empty-cells: show;font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size: 13px;font-weight: normal;line-height: 21px;outline-width: 0px;overflow-x: hidden;overflow-y: hidden;padding-bottom: 0px;padding-left: 4px;padding-right: 4px;padding-top: 0px;text-align: center;vertical-align: top;white-space: nowrap;position: relative;}';
    content += '#mainTabContent .handsontable .ht_master .wtHider .wtSpreader .htCore tbody tr th {.reset() !important;}'
    parser.parse(content, function (err, tree) {
        if (err) {
            //Here we can throw the erro to the user
            return false;
        } else {
            Wptm.css = $('#jform_css').val();
            if ($('#headCss').length === 0) {
                $('head').append('<style id="headCss"></style>');
            }
            $('#headCss').text(tree.toCSS());
            return true;
        }
    });
}

function getCellData(cellPos) {
    var pos = cellPos.split(":");
    var value = Wptm.container.handsontable('getDataAtCell', parseInt(pos[0]), parseInt(pos[1]));

    return value;
}
//replace string by decimal_symbol value and thousand_symbol value in calculation cell
function stringReplace(arr, unit) {
    var thousand_symbol = (!Wptm.style.table.thousand_symbol) ? default_value.thousand_symbol : Wptm.style.table.thousand_symbol;
    var decimal_symbol = (!Wptm.style.table.decimal_symbol) ? default_value.decimal_symbol : Wptm.style.table.decimal_symbol;
    if (typeof arr === 'number') {
        return arr;
    }
    var thousand_re = new RegExp('[' + thousand_symbol + ']', "g");
    // var thousand_re = new RegExp(thousand_symbol,"g");
    if (typeof arr !== 'undefined' && arr !== '' && arr !== null) {
        if (unit === true) {
            if (typeof arr !== 'string') {
                arr = arr.toString();
            }
            arr = arr.replace(table_function_data.text_replace_unit, "");
        } else {
            arr = arr.replace(table_function_data.replace_unit, "");
            arr = arr.replace(thousand_re, "");
            // arr = (thousand_symbol === ',') ? arr.replace(/,/g, "") : (thousand_symbol === '.' ? arr.replace(/\./g, "") : arr);
            arr = (decimal_symbol === ',') ? arr.replace(/,/g, ".") : arr;
        }
    } else {
        arr = '';
    }
    return arr;
}
//Toggle between the charts and the table
function showChartOrTable(showChart, $chart) {
    if (showChart) {//show chart
        jquery('#wptm_chart').removeClass('wptm_hiden');
        jquery('#pwrapper').addClass('wptm_hiden');
        $chart.trigger('click');
        jquery('#list_chart').find('.current_table').unbind('click').on('click', showChartOrTable.bind(this, false));
    } else {//show table
        if (jquery('#inserttable').length > 0) {
            Wptm.chart_active = 0;
            if (!jquery('#inserttable').hasClass('not_change_type')) {
                jquery('#inserttable').data('type', 'table').attr('data-type', 'table').text(insert_table);
            }
            jquery('#inserttable').removeClass("no_click");
        }
        jquery('#wptm_chart').addClass('wptm_hiden');
        jquery('#pwrapper').removeClass('wptm_hiden');
        Wptm.container.handsontable('render');
    }
    jquery('#over_loadding_open_chart').hide();
    wptm_element.primary_toolbars.find('.menu_loading').closest('li').removeClass('menu_loading');
    wptm_element.settingTable.find('.ajax_loading').removeClass('loadding').addClass('wptm_hiden');
}

function ripple_button(that) {
    that.find(".wptm_ripple").click(function (e) {
        // Remove any old one
        jquery(".ripple").remove();

        // Setup
        var posX = jquery(this).offset().left,
            posY = jquery(this).offset().top,
            buttonWidth = jquery(this).width(),
            buttonHeight = jquery(this).height();

        // Add the element
        jquery(this).prepend("<span class='ripple'></span>");

        // Make it round!
        if (buttonWidth >= buttonHeight) {
            buttonHeight = buttonWidth;
        } else {
            buttonWidth = buttonHeight;
        }

        // Get the center of the element
        var x = e.pageX - posX - buttonWidth / 2;
        var y = e.pageY - posY - buttonHeight / 2;

        // Add the ripples CSS and start the animation
        jquery(".ripple").css({
            width: buttonWidth,
            height: buttonHeight,
            top: y + 'px',
            left: x + 'px'
        }).addClass("rippleEffect");
    });
}

function isSameArray(array1, array2) {
    return array1.length === array2.length && array1.every(function (element, index) {
        return element === array2[index];
    });
}
//mer rows, columns style to cells style
function mergeCollsRowsstyleToCells() {
    var style = jquery.extend({}, window.Wptm.style);
    jquery.each(style.cols, function (col, cValue) {
        jquery.each(style.rows, function (row, rValue) {
            var styleCell = {};
            if (typeof (window.Wptm.style.cells[row + '!' + col]) === 'undefined') {
                window.Wptm.style.cells[row + '!' + col] = [row, col, {}];
            }
            if (typeof (style.rows[row]) !== 'undefined' && style.rows[row] !== null && Object.keys(style.rows[row][1]).length !== 0) {
                styleCell =  jquery.extend({}, styleCell, rValue[1]);
            }
            if (typeof (style.cols[col]) !== 'undefined' && style.cols[col] !== null && Object.keys(style.cols[col][1]).length !== 0) {
                styleCell =  jquery.extend({}, styleCell, cValue[1]);
            }
            window.Wptm.style.cells[row + '!' + col][2] = jquery.extend({}, styleCell, window.Wptm.style.cells[row + '!' + col][2]);
        });
    });
}

function setFormat_accounting() {
    var data = {};
    data.thousand_symbol = Wptm.style.table.thousand_symbol;
    data.symbol_position = Wptm.style.table.symbol_position;
    data.decimal_symbol = Wptm.style.table.decimal_symbol;
    data.decimal_count = Wptm.style.table.decimal_count;
    data.currency_symbol = Wptm.style.table.currency_symbol;

    accounting.settings = {
        currency: {
            symbol : data.currency_symbol,   // default currency symbol is '$'
            format: data.symbol_position == 1 ? "%v %s" : "%s %v", // controls output: %s = symbol, %v = value/number (can be object: see below)
            decimal : data.decimal_symbol,  // decimal point separator
            thousand: data.thousand_symbol,  // thousands separator
            precision : data.decimal_count   // decimal places
        },
        number: {
            decimal : data.decimal_symbol,  // decimal point separator
            thousand: data.thousand_symbol,  // thousands separator
            precision : data.decimal_count   // decimal places
        }
    };
}

function updateStyleAutofill (start_rangess, new_range, direction) {
    var respectively = [], data_respectively;
    var maxRange = [start_rangess[2] - start_rangess[0] + 1, start_rangess[3] - start_rangess[1] + 1];

    for (var i = new_range[0]; i <= new_range[2]; i++) {//rows
        for (var j = new_range[1]; j <= new_range[3]; j++) {//cols
            respectively[0] = i - new_range[0] > maxRange[0]
                ? ((i - new_range[0]) % maxRange[0]) + start_rangess[0]
                : i - new_range[0] + start_rangess[0];
            respectively[1] = j - new_range[1] > maxRange[1]
                ? ((j - new_range[1]) % maxRange[1]) + start_rangess[1]
                : j - new_range[1] + start_rangess[1];
            //update cell hyperlink
            if (typeof Wptm.hyperlink[i + '!' + j] !== 'undefined') {
                delete Wptm.hyperlink[i + '!' + j];
            }
            if (typeof Wptm.hyperlink[respectively[0] + '!' + respectively[1]] !== 'undefined') {
                data_respectively = Wptm.hyperlink[respectively[0] + '!' + respectively[1]];
                Wptm.hyperlink[i + '!' + j] = {};
                Wptm.hyperlink[i + '!' + j].hyperlink = data_respectively.hyperlink;
                Wptm.hyperlink[i + '!' + j].text = data_respectively.text;
            }

            //update cell type and col type
            var selection = {'0': [i,j,i,j]};
            if (typeof Wptm.style.cells[i + '!' + j] !== 'undefined'
                && Wptm.style.cells[i + '!' + j][2].cell_type === 'html') {
                Wptm.style.cells[i + '!' + j][2].cell_type = null;
                saveData.push({action: 'set_cells_type', selection: selection, style: {cell_type: null}});
            } else if (typeof Wptm.style.cells[i + '!' + j] === 'undefined' || typeof Wptm.style.cells[i + '!' + j][2] === 'undefined') {
                Wptm.style.cells[i + '!' + j] = [i, j, {}];
            }

            if (typeof Wptm.style.cells[respectively[0] + '!' + respectively[1]] !== 'undefined'
                && Wptm.style.cells[respectively[0] + '!' + respectively[1]][2].cell_type === 'html') {
                Wptm.style.cells[i + '!' + j][2].cell_type = 'html';
                saveData.push({action: 'set_cells_type', selection: selection, style: {cell_type: 'html'}});

                if (typeof Wptm.style.table.col_types !== 'undefined'
                    && Wptm.style.table.col_types[j] !== 'text') {
                    Wptm.style.table.col_types[j] = 'text';
                    if (typeof table_function_data.colsSetType === 'undefined') {
                        table_function_data.colsSetType = {};
                    }
                    table_function_data.colsSetType[j] = 'text';
                }
            }
        }
    }
}

function setPositionForHtmlCellEditor () {
    var tdOffset = jquery(window.Wptm.container).find('.isHtmlCell.dtr' + table_function_data.selection[0][0] + '.dtc' + table_function_data.selection[0][1]).offset();
    var offsetTable = wptm_element.tableContainer.offset();
    var heightTable = wptm_element.tableContainer.outerHeight() + offsetTable.top;
    var widthTable = wptm_element.tableContainer.outerWidth() + offsetTable.left;

    var wptm_edit_html_cell_width =  wptm_element.wptm_edit_html_cell.outerWidth();
    var wptm_edit_html_cell_height =  wptm_element.wptm_edit_html_cell.outerHeight();

    if (wptm_edit_html_cell_width + tdOffset.left > widthTable) {
        tdOffset.left = widthTable - wptm_edit_html_cell_width - 30;
    }
    if (350 + tdOffset.top > heightTable) {
        tdOffset.top = heightTable - 350;
    }

    return tdOffset;
}

function hashFnv32a () {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
}

function copy_text (that, default_value) {
    var copyText = jquery(that).parent().find('.wptm_copy_text_content');
    var textArea = document.createElement("textarea");
    if (copyText.text() === '') {
        textArea.value = default_value;
    } else {
        textArea.value = copyText.text();
    }
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
}

function getLinkSync (link, type, warningDisplay) {
    var data = {};
    switch (type) {
        case 'excel':
            if (link.indexOf("docs.google.com/spreadsheet") !== -1 && warningDisplay) {
                bootbox.alert(wptmText.error_link_import_sync, wptmText.GOT_IT);
                Wptm.style.table.excel_url = '';
                return false;
            }
            data.auto_sync = Wptm.style.table.excel_auto_sync != '1' ? 0 : 1;
            data.spreadsheet_style = Wptm.style.table.excel_spreadsheet_style != '1' ? 0 : 1;
            data.url = encodeURI(link);

            break;
        case 'onedrive':
            if (link.indexOf("sharepoint") === -1 && link.indexOf("onedrive.live.com") === -1 && warningDisplay) {
                bootbox.alert(wptmText.error_link_import_sync, wptmText.GOT_IT);
                Wptm.style.table.onedrive_url = '';
                return false;
            }
            data.auto_sync = Wptm.style.table.auto_sync_onedrive != '1' ? 0 : 1;
            data.spreadsheet_style = Wptm.style.table.onedrive_style != '1' ? 0 : 1;

            if (link.indexOf("onedrive.live.com") !== -1 && link.indexOf("download?") === -1) {
                if (link.indexOf("<iframe") !== -1) {
                    link = link.match(/src="(.*?)"/)[1];
                }
                link = link.replace("embed?", "download?");
            } else if (link.indexOf("sharepoint") !== -1 && link.indexOf("download=") === -1) {
                link += '&download=1';
            }
            data.url = link;

            break;
        case 'spreadsheet':
            var end_link = link.split('?');
            var end_link0 = end_link[0].slice(-7);
            if (link.indexOf("docs.google.com/spreadsheet") === -1 && end_link0.match(/html|csv|pdf|xlsx/gi) === null && (typeof end_link[1] !== "undefined" && end_link[1].match(/sharing|html|csv|pdf|xlsx/gi) === null) && warningDisplay) {
                bootbox.alert(wptmText.error_link_google_sync, wptmText.GOT_IT);
                Wptm.style.table.spreadsheet_url = '';
                return false;
            }
            data.auto_sync = Wptm.style.table.auto_sync != '1' ? 0 : 1;
            data.spreadsheet_style = Wptm.style.table.spreadsheet_style != '1' ? 0 : 1;
            data.url = encodeURI(link);
            break;
    }

    return data;
}

//convert droptables's dateformat to momentjs's dateformat
function momentjsFormat(value) {
    value = value.replaceAll("M", "MMM");
    value = value.replaceAll("F", "MMMM");
    value = value.replaceAll("m", "MM");
    value = value.replaceAll("n", "M");

    value = value.replaceAll("D", "ddd");
    value = value.replaceAll("j", "D");
    value = value.replaceAll("d", "DD");
    value = value.replaceAll("S", "Do");
    value = value.replaceAll("l", "dddd");

    value = value.replaceAll("y", "YY");

    value = value.replaceAll("h", "hh");
    value = value.replaceAll("g", "h");
    value = value.replaceAll("H", "HH");
    value = value.replaceAll("G", "H");

    value = value.replaceAll("i", "mm");
    value = value.replaceAll("s", "ss");
    value = value.replaceAll("T", "z");
    return value;
}

function checkCellsOptionsValidate(selection, parametor, value) {
    var i, j;
    if (typeof arguments[3] !== 'undefined') {
        j = arguments[3];
        for (i = 0; i < j.length; i++) {
            if (typeof j[i][parametor] !== 'undefined' && j[i][parametor] == value) {
                return true;
            }
        }
    } else if (selection.length > 0) {
        for (i = selection[0][0]; i <= selection[0][2]; i++) {
            for (j = selection[0][1]; j <= selection[0][3]; j++) {
                if (typeof Wptm.style.cells[i + '!' + j] !== 'undefined' && typeof Wptm.style.cells[i + '!' + j][2] !== 'undefined'){
                    if (typeof Wptm.style.cells[i + '!' + j][2][parametor] !== 'undefined' && Wptm.style.cells[i + '!' + j][2][parametor] == value) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function setFormat_accounting_for_cells(setFormat_accounting_for_cells_raw) {
    return {
        currency: {
            symbol : setFormat_accounting_for_cells_raw.currency_symbol,   // default currency symbol is '$'
            format: setFormat_accounting_for_cells_raw.symbol_position == 1 ? "%v%s" : "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
            decimal : setFormat_accounting_for_cells_raw.decimal_symbol,  // decimal point separator
            thousand: setFormat_accounting_for_cells_raw.thousand_symbol,  // thousands separator
            precision : typeof setFormat_accounting_for_cells_raw.decimal_count !== 'undefined' ? setFormat_accounting_for_cells_raw.decimal_count : 0   // decimal places
        },
        number: {
            decimal : setFormat_accounting_for_cells_raw.decimal_symbol,  // decimal point separator
            thousand: setFormat_accounting_for_cells_raw.thousand_symbol,  // thousands separator
            precision : typeof setFormat_accounting_for_cells_raw.decimal_count !== 'undefined' ? setFormat_accounting_for_cells_raw.decimal_count : 0   // decimal places
        }
    };
}

//create string_currency_symbols, replace_unit, text_replace_unit, date_format RegExp string
function createRegExpFormatForCell(currency_symbol, date_formats, cell_function_data) {
    if (currency_symbol !== false) {
        cell_function_data.string_currency_symbols = currency_symbol.replace(/ /g, "");
        // create string reg currency symbols
        cell_function_data.replace_unit = new RegExp('[' + cell_function_data.string_currency_symbols.replace(/,/g, "|") + ']', "g");

        // create string reg have not currency symbols
        cell_function_data.text_replace_unit = '[^a-zA-Z|' + cell_function_data.string_currency_symbols.replace(/,/g, "|^") + ']';
        cell_function_data.text_replace_unit = new RegExp(cell_function_data.text_replace_unit, "g");
        cell_function_data.text_replace_unit_function = new RegExp('[^ |' + cell_function_data.string_currency_symbols.replace(/,/g, "|^") + ']', "g");
    }
    if (date_formats !== false) {
        cell_function_data.date_format = date_formats.match(/[a-zA-Z|\\]+/g);
    }
    return cell_function_data;
}

function status_notic (status, text) {
    var $ = window.jquery;
    var status_e = $('#savedInfoTable');
    if (status === 1) {
        status_e = $('#savedInfoTable');
    } else {
        status_e = $('#saveErrorTable');
    }

    var args = Array.prototype.slice.call(arguments, 1);
    if (typeof args[1] !== "undefined") {
        status_e = args[1];
    }

    status_e.html(text);
    var position = window.jquery('#setting-cells').offset();
    setTimeout(function () {
        status_e.animate({'opacity': '0.8', 'top': position.top - 35}, 500).delay(2000).animate({'opacity': '0', 'top': '-45px'}, 1000);
    }, 1000);
}

function check_cell_readOnly_mysql(row, col, cellProperties) {
    if (row < 1) {
        cellProperties.readOnly = false;
        if (typeof Wptm.style.table.lock_columns !== 'undefined' && Wptm.style.table.lock_columns[col] != 0) {
            cellProperties.readOnly = true;
        }
    }
    if (Wptm.table_editing != '1' && row >= 1) {
        cellProperties.readOnly = true;
    }
    return cellProperties;
}

function check_cell_readOnly(row, col, prop) {
    var cellProperties = {};

    if (window.Wptm.type === 'mysql') {
        cellProperties = check_cell_readOnly_mysql(row, col, cellProperties);
    }

    if (!wptm_administrator) {
        var lock_cell_id = [], not_lock_cell = false;
        if (typeof table_function_data.protect_columns !== 'undefined'
            && typeof table_function_data.protect_columns[col] !== 'undefined') {
            //protect columns
            lock_cell_id.push(table_function_data.protect_columns[col]);
        }
        if (typeof table_function_data.protect_rows !== 'undefined'
            && typeof table_function_data.protect_rows[col] !== 'undefined') {
            //protect rows
            lock_cell_id.push(table_function_data.protect_rows[row]);
        }
        if (typeof Wptm.style.cells[row + "!" + col][2].lock_cell !== 'undefined') {
            lock_cell_id.push(Wptm.style.cells[row + "!" + col][2].lock_cell);
        }
        if (lock_cell_id.length > 0 && typeof lock_cell_id[0] !== 'undefined'
            && typeof table_function_data.lock_ranger_cells_user !== 'undefined') {
            for (var ij in lock_cell_id) {
                if (table_function_data.lock_ranger_cells_user[lock_cell_id[ij]]) {//allow edit
                    not_lock_cell = true;
                    break;
                }
            }
            if (!not_lock_cell) {
                cellProperties.readOnly = true;
            }
        }
    }

    return cellProperties;
}

function create_ranger_cells_lock (Wptm, table_function_data, update_rangers) {
    var lock_ranger_cells_user;
    // table_function_data.ranger_cells_lock_top = '';
    // table_function_data.ranger_cells_lock_left = '';
    // table_function_data.ranger_cells_lock_right = '';
    // table_function_data.ranger_cells_lock_bottom = '';
    table_function_data.lock_ranger_cells_user = [];
    table_function_data.protect_columns = [];
    table_function_data.protect_rows = [];
    // table_function_data.render_first_cell_protect_has_icon = [];

    if (typeof Wptm.style.table.lock_ranger_cells_user == 'undefined') {
        Wptm.style.table.lock_ranger_cells_user = [];
    }

    var ij, enable_lock, value;
    if (typeof Wptm.style.table.lock_ranger_cells === 'undefined' || Wptm.style.table.lock_ranger_cells.length < 1) {
        return false;
    }

    if (update_rangers !== null) {
        var current_rangers = [];
        var current_ranger_cells_user = [];
    }

    var i;

    for (i = 0; i < Wptm.style.table.lock_ranger_cells.length; i++) {
        // table_function_data.render_first_cell_protect_has_icon[i] = true;
        enable_lock = false;
        table_function_data.lock_ranger_cells_user[i] = false;
        if (typeof Wptm.style.table.lock_ranger_cells_user[i] !== 'undefined') {
            lock_ranger_cells_user = Wptm.style.table.lock_ranger_cells_user[i].split('|');
            if (lock_ranger_cells_user.indexOf(wptm_userRoles) !== -1) {//ok edit
                table_function_data.lock_ranger_cells_user[i] = true;
            } else if (!wptm_administrator) {
                enable_lock = true;
            }
        }

        value = Wptm.style.table.lock_ranger_cells[i].replace(/[ ]+/g, "").toUpperCase();
        var arrayRange = value.split(":");

        var check_value = 0;
        if (arrayRange[0].replace(/[ |A-Za-z]+/g, "") === '') {
            check_value = 1;//value A:B
        } else if (arrayRange[0].replace(/[ |1-9]+/g, "") === '') {
            check_value = 2;//value 8:9
        }

        var selection = [];
        if (check_value === 0) {
            if (typeof arrayRange[1] == 'undefined') {
                arrayRange[1] = arrayRange[0];
            }
            selection.push(parseInt(arrayRange[0].split(/[ |A-Za-z]+/g)[1]) - 1);
            selection.push(convertStringToNumber(arrayRange[0].split(/[ |1-9]+/g)[0]) - 1);
            selection.push(parseInt(arrayRange[1].split(/[ |A-Za-z]+/g)[1]) - 1);
            selection.push(convertStringToNumber(arrayRange[1].split(/[ |1-9]+/g)[0]) - 1);

            if (update_rangers !== null) {
                if (update_rangers.type === 'create_row') {
                    if (selection[0] >= update_rangers.index) {//rows >= index
                        if (selection[2] >= update_rangers.amount + update_rangers.index) {//index + amount <= after_col
                            selection[2] = selection[2] + update_rangers.amount;
                            selection[0] = update_rangers.amount + update_rangers.index >= selection[0] ? selection[0] : (selection[0] + update_rangers.amount);
                        } else {//index + amount > after_col
                            selection[2] = selection[2] + update_rangers.amount;
                        }
                    } else if (selection[0] < update_rangers.index && selection[2] >= update_rangers.index) {//row < index < after_row
                        selection[2] = selection[2] + update_rangers.amount;
                    }
                }
                if (update_rangers.type === 'delete_row') {
                    if (selection[0] >= update_rangers.index) {//rows >= index
                        if (update_rangers.amount + update_rangers.index >= selection[2]) {//remove all index + amount >= after_rows
                            continue;
                        }
                        if ((update_rangers.amount + update_rangers.index) >= selection[0]
                            && (update_rangers.amount + update_rangers.index) < selection[2]) {//index <= rows <= index + amount < after_rows
                            selection[0] = update_rangers.index;
                            selection[2] = selection[2] - update_rangers.amount;
                        } else {//index + amount < rows
                            selection[0] = selection[0] - update_rangers.amount;
                            selection[2] = selection[2] - update_rangers.amount;
                        }
                    } else if (selection[0] < update_rangers.index && selection[2] >= update_rangers.index) {//rows < index < after_rows
                        selection[2] = update_rangers.amount + update_rangers.index >= selection[2] ? (update_rangers.index - 1) : (selection[2] - update_rangers.amount);
                    }
                }
                if (update_rangers.type === 'add_col') {
                    if (selection[1] > update_rangers.index) {//col >= index
                        if (selection[3] >= update_rangers.amount + update_rangers.index) {//index + amount <= after_col
                            selection[3] = selection[3] + update_rangers.amount;
                            selection[1] = update_rangers.amount + update_rangers.index >= selection[1] ? selection[1] : (selection[1] + update_rangers.amount);
                        } else {//index + amount > after_col
                            selection[3] = selection[3] + update_rangers.amount;
                        }
                    } else if (selection[1] < update_rangers.index && selection[3] >= update_rangers.index) {//row < index < after_row
                        selection[3] = selection[3] + update_rangers.amount;
                    }
                }
                if (update_rangers.type === 'delete_col') {
                    if (selection[1] >= update_rangers.index) {//col >= index
                        if (update_rangers.amount + update_rangers.index >= selection[3]) {//remove all index + amount >= after_col
                            continue;
                        }
                        if ((update_rangers.amount + update_rangers.index) >= selection[1]
                            && (update_rangers.amount + update_rangers.index) < selection[3]) {//index <= col <= index + amount < after_col
                            selection[1] = update_rangers.index;
                            selection[3] = selection[3] - update_rangers.amount;
                        } else {//index + amount < col
                            selection[1] = selection[1] - update_rangers.amount;
                            selection[3] = selection[3] - update_rangers.amount;
                        }
                    } else if (selection[1] < update_rangers.index && selection[3] >= update_rangers.index) {//col < index < after_col
                        selection[3] = update_rangers.amount + update_rangers.index >= selection[3] ? (update_rangers.index - 1) : (selection[3] - update_rangers.amount);
                    }
                }

                current_rangers.push(getSelectedVal(selection));
                if (typeof Wptm.style.table.lock_ranger_cells_user[i] !== 'undefined') {
                    current_ranger_cells_user.push(Wptm.style.table.lock_ranger_cells_user[i]);
                }
            }

            for (ij = selection[0]; ij <= selection[2]; ij++) {//row
                for (var ij2 = selection[1]; ij2 <= selection[3]; ij2++) {
                    if (typeof Wptm.style.cells[ij + '!' + ij2] !== 'undefined') {
                        Wptm.style.cells[ij + '!' + ij2][2] = window.jquery.extend(Wptm.style.cells[ij + '!' + ij2][2], {lock_cell: i});
                    }
                }
            }
        } else if (check_value === 1) {//columns
            selection.push(convertStringToNumber(arrayRange[0].split(/[ |1-9]+/g)[0]) - 1);
            selection.push(convertStringToNumber(arrayRange[1].split(/[ |1-9]+/g)[0]) - 1);

            if (update_rangers !== null) {
                if (update_rangers.type === 'add_col') {
                    if (selection[0] >= update_rangers.index) {//col >= index
                        selection[1] = selection[1] + update_rangers.amount;
                        selection[0] = update_rangers.amount + update_rangers.index >= selection[0] ? selection[0] : (selection[0] + update_rangers.amount);
                    }
                    if (selection[0] < update_rangers.index && selection[1] >= update_rangers.index) {//row < index < after_row
                        selection[1] = selection[1] + update_rangers.amount;
                    }
                }
                if (update_rangers.type === 'delete_col') {
                    if (selection[0] >= update_rangers.index) {//col >= index
                        if (update_rangers.amount + update_rangers.index >= selection[1]) {//remove all
                            continue;
                        }
                        if (update_rangers.amount + update_rangers.index < selection[0]) {
                            selection[0] = selection[0] - update_rangers.amount;
                            selection[1] = selection[1] - update_rangers.amount;
                        } else {
                            selection[0] = update_rangers.index;
                            selection[1] = selection[1] - update_rangers.amount - update_rangers.index;
                        }
                    }
                    if (selection[0] < update_rangers.index && selection[1] >= update_rangers.index) {//col < index < after_col
                        selection[1] = update_rangers.amount + update_rangers.index >= selection[1] ? (update_rangers.index - 1) : (selection[1] - update_rangers.amount);
                    }
                }

                current_rangers.push(getSelectedVal([false, selection[0], false, selection[1]]));
                if (typeof Wptm.style.table.lock_ranger_cells_user[i] !== 'undefined') {
                    current_ranger_cells_user.push(Wptm.style.table.lock_ranger_cells_user[i]);
                }
            }

            for (ij = selection[0]; ij <= selection[1]; ij++) {
                table_function_data.protect_columns[ij] = i;
            }
        } else {//rows
            selection.push(parseInt(arrayRange[0].split(/[ |A-Za-z]+/g)[0]) - 1);
            selection.push(parseInt(arrayRange[1].split(/[ |A-Za-z]+/g)[0]) - 1);

            if (update_rangers !== null) {
                if (update_rangers.type === 'create_row') {
                    if (selection[0] >= update_rangers.index) {//col >= index
                        selection[1] = selection[1] + update_rangers.amount;
                        selection[0] = update_rangers.amount + update_rangers.index >= selection[0] ? selection[0] : (selection[0] + update_rangers.amount);
                    }
                    if (selection[0] < update_rangers.index && selection[1] >= update_rangers.index) {//row < index < after_row
                        selection[1] = selection[1] + update_rangers.amount;
                    }
                }
                if (update_rangers.type === 'delete_row') {
                    if (selection[0] >= update_rangers.index) {//col >= index
                        if (update_rangers.amount + update_rangers.index >= selection[1]) {//remove all
                            continue;
                        }
                        if (update_rangers.amount + update_rangers.index < selection[0]) {
                            selection[0] = selection[0] - update_rangers.amount;
                            selection[1] = selection[1] - update_rangers.amount;
                        } else {
                            selection[0] = update_rangers.index;
                            selection[1] = selection[1] - update_rangers.amount - update_rangers.index;
                        }
                    }
                    if (selection[0] < update_rangers.index && selection[1] >= update_rangers.index) {//col < index < after_col
                        selection[1] = update_rangers.amount + update_rangers.index >= selection[1] ? (update_rangers.index - 1) : (selection[1] - update_rangers.amount);
                    }
                }

                current_rangers.push(getSelectedVal([selection[0], false, selection[1], false]));
                if (typeof Wptm.style.table.lock_ranger_cells_user[i] !== 'undefined') {
                    current_ranger_cells_user.push(Wptm.style.table.lock_ranger_cells_user[i]);
                }
            }

            for (ij = selection[0]; ij <= selection[1]; ij++) {
                table_function_data.protect_rows[ij] = i;
            }
        }
    };

    if (update_rangers !== null) {
        Wptm.style.table.lock_ranger_cells = jquery.extend([], current_rangers);
        Wptm.style.table.lock_ranger_cells_user = jquery.extend([], current_ranger_cells_user);
        // render_css_lock(Wptm, table_function_data);
    }
}

function render_css_lock(Wptm, table_function_data) {
    var column_i;
    var css_lock_columns = '';
    var $wptm_add_css_lock_columns = document.getElementById('wptm_add_css_lock_columns');

    // if (typeof table_function_data.ranger_cells_lock_top !== 'undefined' && table_function_data.ranger_cells_lock_top !== '') {
    //     css_lock_columns += table_function_data.ranger_cells_lock_top + '{border-top: 1px solid #4b89ff !important;}'
    // }
    // if (typeof table_function_data.ranger_cells_lock_bottom !== 'undefined' && table_function_data.ranger_cells_lock_bottom !== '') {
    //     css_lock_columns += table_function_data.ranger_cells_lock_bottom + '{border-bottom: 1px solid #4b89ff !important;}'
    // }
    // if (typeof table_function_data.ranger_cells_lock_left !== 'undefined' && table_function_data.ranger_cells_lock_left !== '') {
    //     css_lock_columns += table_function_data.ranger_cells_lock_left + '{border-left: 1px solid #4b89ff !important;}'
    // }
    // if (typeof table_function_data.ranger_cells_lock_right !== 'undefined' && table_function_data.ranger_cells_lock_right !== '') {
    //     css_lock_columns += table_function_data.ranger_cells_lock_right + '{border-right: 1px solid #4b89ff !important;}'
    // }

    if (typeof Wptm.style.table.lock_columns !== 'undefined') {
        for (column_i in Wptm.style.table.lock_columns) {
            if (Wptm.style.table.lock_columns[column_i] != 0) {
                column_i = parseInt(column_i);
                css_lock_columns += ' .handsontable table thead th:nth-child(' + (column_i + 2) + ') {position: relative;} ';
                css_lock_columns += ' .handsontable table thead th:nth-child(' + (column_i + 2) + '):after {content: "lock";} ';
            }
        }
    }


    setTimeout(function () {
        if (css_lock_columns !== '') {
            $wptm_add_css_lock_columns.innerHTML = css_lock_columns;
            $wptm_add_css_lock_columns.cssText = css_lock_columns;
        }
    }, 100);
}

function check_collide_two_range(selection1, selection2) {
    if ((Math.abs(selection1[0] - selection2[0]) < Math.abs(selection1[2] - selection1[0] + selection2[2] - selection2[0]) / 2)
        && (Math.abs(selection1[1] - selection2[1]) < Math.abs(selection1[3] - selection1[1] + selection2[3] - selection2[1]) / 2)
    ) {
        return true;
    }
    return false;
}

/* harmony default export */ __webpack_exports__["default"] = ({
    setText,
    updateSwitchButtonFromStyleObject,
    updateParamFromStyleObject,
    updateParamFromStyleObjectSelectBox,
    checkObjPropertyNested,
    calculateTableHeight,
    convertStringToNumber,
    getSelectedVal,
    checkObjPropertyNestedNotEmpty,
    autosaveNotification,
    cleanHandsontable,
    warning_edit_db_table,
    saveChanges,
    cell_type_to_column,
    deleteRowDbTable,
    createRowDbTable,
    validate_type_cell,
    change_value_cells,
    default_sortable,
    convertAlpha,
    convertDate,
    formatSymbols,
    getSizeCells,
    pullDims,
    pushDims,
    getFillArray,
    fillArray,
    removeValueInArray,
    responsive_col,
    createRegExpFormat,
    replaceCell,
    loading,
    rloading,
    wptm_clone,
    parseCss,
    getCellData,
    stringReplace,
    showChartOrTable,
    ripple_button,
    combineChangedCellIntoRow,
    isSameArray,
    mergeCollsRowsstyleToCells,
    setFormat_accounting,
    updateStyleAutofill,
    setPositionForHtmlCellEditor,
    hashFnv32a,
    copy_text,
    getLinkSync,
    momentjsFormat,
    setFormat_accounting_for_cells,
    createRegExpFormatForCell,
    checkCellsOptionsValidate,
    status_notic,
    check_cell_readOnly,
    create_ranger_cells_lock,
    check_collide_two_range,
    render_css_lock
});

/***/ }),

/***/ "./app/admin/assets/js/_initHandsontable.js":
/*!**************************************************!*\
  !*** ./app/admin/assets/js/_initHandsontable.js ***!
  \**************************************************/
/*! exports provided: initHandsontable, getMergeCells, calHeightTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initHandsontable", function() { return initHandsontable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMergeCells", function() { return getMergeCells; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calHeightTable", function() { return calHeightTable; });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_functions */ "./app/admin/assets/js/_functions.js");
/* harmony import */ var _toolbarOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_toolbarOptions */ "./app/admin/assets/js/_toolbarOptions.js");
/* harmony import */ var _customRenderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_customRenderer */ "./app/admin/assets/js/_customRenderer.js");
/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_chart */ "./app/admin/assets/js/_chart.js");
//setTimeout change height table by rows height





/**
 * Call handsontable lib
 *
 * @param datas Wptm.datas
 */
function initHandsontable(datas) {
    var checkScroll = false;
    var autoScroll;
    window.Wptm.container = window.wptm_element.tableContainer;
    var modifyRow = null;
    var totalRows = datas.length;

    window.Wptm.container.handsontable({
        data: datas,
        startRows: 5,
        startCols: 5,
        editor: window.CustomEditor,
        search: true,
        renderAllRows: false,
        fillHandle: ((window.Wptm.can.edit || (window.Wptm.can.editown && data.author === window.Wptm.author)) && window.Wptm.type === 'html') ? {
            autoInsertRow:false,
        } : false,
        modifyAutofillRange: function (startArea, entireArea) {//entireArea is start ranger
            var directionFill = -1;//-1 is not fill, 0 is top, 1 is bottom, 2 is left, 3 is right
            var new_range = [startArea[0], startArea[1], startArea[2], startArea[3]];

            if (startArea[0] !== entireArea[0]) {
                directionFill = 0;
                new_range[2] = entireArea[0] - 1;
            } else if (startArea[2] !== entireArea[2]) {
                directionFill = 1;
                new_range[0] = entireArea[2] + 1;
            } else if (startArea[1] !== entireArea[1]) {
                directionFill = 2;
                new_range[3] = entireArea[1] - 1;
            } else if (startArea[3] !== entireArea[3]) {
                directionFill = 3;
                new_range[1] = entireArea[3] + 1;
            }

            if (directionFill > -1) {
                //update cell type, hyperlink
                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].updateStyleAutofill(entireArea, new_range, directionFill);
            }
        },
        copyPaste: true,
        beforePaste: (data, coords) => {
        },
        beforeCopy: (data, coords) => {
        },
        afterCopy: function (data, coords) {
        },
        afterPaste: function (data, coords) {
        },
        colHeaders: true,
        rowHeaders: true,
        autoRowSize: false,
        autoColSize: false,
        renderer: _customRenderer__WEBPACK_IMPORTED_MODULE_2__["default"].render,
        height: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].calculateTableHeight(window.jquery('#wptm-toolbars')),
        afterInit: function () {
            _chart__WEBPACK_IMPORTED_MODULE_3__["default"].functions.loadCharts();
            Wptm.container.handsontable("selectCell", 0, 0, 0, 0);
            window.table_function_data.firstRender = true;

            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].render_css_lock(Wptm, table_function_data);
        },
        beforeRender: function (isForced) {
            Wptm.style.table.fonts_used = window.jquery.extend([], []);
            Wptm.style.table.fonts_local_used = window.jquery.extend([], []);
            window.table_function_data.styleToRender = '';
        },
        beforeChange: function (changes, source) {
            if (source === 'auto_convert_data') {
                return;
            }

            for (var i = changes.length - 1; i >= 0; i--) {
                if (jquery('#list_chart').find('.chart-menu').length > 0) {//check chart exist
                    if (!_chart__WEBPACK_IMPORTED_MODULE_3__["default"].functions.validateCharts(changes[i])) {
                        bootbox.alert(wptmText.CHANGE_INVALID_CHART_DATA, wptmText.Ok);
                        return false;
                    }
                }
            }
        },
        afterRender: function (isForced) {
            var parser = new (less.Parser);
            var Wptm = window.Wptm;
            var $ = window.jquery;

            window.table_function_data.content = '#mainTabContent .handsontable .ht_master .htCore {' + window.table_function_data.styleToRender + '}';
            if (Wptm.style.table.responsive_type == 'scroll' && Wptm.style.table.freeze_row) {
                window.table_function_data.content += ' #mainTabContent .handsontable .ht_clone_top .htCore {' + window.table_function_data.styleToRender + '}';
            }
            if (Wptm.style.table.responsive_type == 'scroll' && Wptm.style.table.freeze_col) {
                window.table_function_data.content += ' #mainTabContent .handsontable .ht_clone_left .htCore {' + window.table_function_data.styleToRender + '}';
            }
            if (Wptm.style.table.responsive_type == 'scroll' && Wptm.style.table.freeze_row && Wptm.style.table.freeze_col) {
                window.table_function_data.content += ' #mainTabContent .handsontable .ht_clone_corner .htCore {' + window.table_function_data.styleToRender + '}';
            }

            parser.parse(window.table_function_data.content, function (err, tree) {
                if (err) {
                    //Here we can throw the erro to the user
                    return false;
                } else {
                    Wptm.css = $('#jform_css').val();
                    if ($('#headMainCss').length === 0) {
                        $('head').append('<style id="headMainCss"></style>');
                    }
                    $('#headMainCss').text(tree.toCSS());
                    return true;
                }
            });
            if ($('#content_popup_hide').find('select.select_columns option').length < 1) {
                // Build column selection for default sort parameter
                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].default_sortable(window.Wptm.datas);
            }
            //set Wptm.style.rows , Wptm.style.cols value
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].pushDims($, Wptm);

            if (table_function_data.needSaveAfterRender === true) {
                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].saveChanges();
                table_function_data.needSaveAfterRender = false;
            }
        },
        afterChange: function (change, source) {//play when change content cell
            if (typeof table_function_data.data_argument !== 'undefined' && source === 'loadData') {
                source = 'edit';
                change = jquery.extend([], table_function_data.data_argument);
            }
            //fix handsontable merge cells remove data of cells
            if ((source === 'MergeCells' || source === 'populateFromArray')&& typeof change.length !== 'undefined') {
                for (i = 0; i < change.length; i++) {
                    if (change[i][2] !== null && change[i][3] === null) {
                        Wptm.datas[change[i][0]][change[i][1]] = change[i][2];
                    }
                }
            }

            if (source === 'populateFromArray' && change.length > 0 && change[0][2] === change[0][3]) {
                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].cleanHandsontable();
            }

            if (source === 'loadData' || source === 'populateFromArray' || !(window.Wptm.can.edit || (window.Wptm.can.editown && data.author === window.Wptm.author))) {
                return; //don't save this change
            }
            var action = ['CopyPaste.paste', 'edit', 'UndoRedo.undo', 'UndoRedo.redo', 'Autofill.fill', 'setDataAtCell'];

            //validate data cells when mergeCells
            if (change) {
                // console.log(change, source, Wptm.datas[change[i][0]][change[i][1]]);
                var i;
                var notSaveData;
                var editHeader = false;
                var mysql_column_edit, mysql_column_key;
                for (i = 0; i < change.length; i++) {
                    if (action.includes(source)) {
                        notSaveData = true;
                        if (typeof change[i][3] === 'undefined' || change[i][3] === 'wptm_change_value_after_set_columns_types') {
                            change[i][3] = change[i][2];//loadData when edit cells > 5ommit
                            notSaveData = false;
                        }
                        if (change[i][3] === change[i][4]) {
                            notSaveData = false;
                        }

                        if (typeof Wptm.headerOption == 'undefined' || change[i][0] >= Wptm.headerOption) {//check cell in table header
                            if (typeof change[i][3] !== 'undefined' && change[i][3] !== null) {
                                var value = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].cell_type_to_column(change[i], change[i][3]);
                                var value_change;
                                if (value === false) {
                                    wptm_element.mainTabContent.find('td.dtr' + change[i][0] + '.dtc' + change[i][1]).addClass('invalid_data');
                                    bootbox.alert(wptmText.CHANGE_INVALID_CELL_DATA, wptmText.Ok);
                                    return;
                                } else {
                                    wptm_element.mainTabContent.find('td.dtr' + change[i][0] + '.dtc' + change[i][1]).removeClass('invalid_data');
                                    if (value !== true) {
                                        if (notSaveData) {
                                            if (Wptm.type !== 'mysql') {
                                                saveData.push({action: 'edit_cell', row: change[i][0], col: change[i][1], content: value});
                                            } else if ( Wptm.query_option.column_options !== null && typeof Wptm.query_option.column_options[change[i][1]] !== "undefined") {
                                                if (change[i][2] !== value) {
                                                    mysql_column_edit = Wptm.query_option.column_options[change[i][1]].table + '.' + Wptm.query_option.column_options[change[i][1]].Field;
                                                    mysql_column_key = Wptm.query_option.column_options[table_function_data.keyPosition].table + '.' + Wptm.query_option.column_options[table_function_data.keyPosition].Field;
                                                    value_change = Wptm.datas[change[i][0]][table_function_data.keyPosition];
                                                    Wptm.saveDataDbTable.push({
                                                        action: 'edit_cell_mysql',
                                                        row: change[i][0],
                                                        col: change[i][1],
                                                        content: value,
                                                        id: Wptm.datas[change[i][0]][table_function_data.keyPosition],
                                                        column: mysql_column_edit,
                                                        column_key: mysql_column_key
                                                    });
                                                }
                                            }
                                            if (Wptm.headerOption > 0 && change[i][0] < Wptm.headerOption) {
                                                Wptm.style.table.header_data[change[i][0]][change[i][1]] = value;
                                            }
                                        }
                                        if (value !== change[i][3]) {//has convert cell value
                                            window.Wptm.container.handsontable('setDataAtCell', change[i][0], change[i][1], value, 'auto_convert_data');
                                        }
                                    } else {
                                        if (notSaveData) {
                                            if (Wptm.type !== 'mysql') {
                                                saveData.push({action: 'edit_cell', row: change[i][0], col: change[i][1], content: change[i][3]});
                                            } else if ( Wptm.query_option.column_options !== null && typeof Wptm.query_option.column_options[change[i][1]] !== "undefined")  {
                                                if (change[i][2] !== change[i][3]) {
                                                    mysql_column_edit = Wptm.query_option.column_options[change[i][1]].table + '.' + Wptm.query_option.column_options[change[i][1]].Field;
                                                    mysql_column_key = Wptm.query_option.column_options[table_function_data.keyPosition].table + '.' + Wptm.query_option.column_options[table_function_data.keyPosition].Field;
                                                    value_change = Wptm.datas[change[i][0]][table_function_data.keyPosition];
                                                    Wptm.saveDataDbTable.push({
                                                        action: 'edit_cell_mysql',
                                                        row: change[i][0],
                                                        col: change[i][1],
                                                        content: change[i][3],
                                                        id: Wptm.datas[change[i][0]][table_function_data.keyPosition],
                                                        column: mysql_column_edit,
                                                        column_key: mysql_column_key
                                                    });
                                                }
                                            }
                                            if (Wptm.headerOption > 0 && change[i][0] < Wptm.headerOption) {
                                                Wptm.style.table.header_data[change[i][0]][change[i][1]] = change[i][3];
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            editHeader = true;
                            if (notSaveData) {
                                if (Wptm.type === 'mysql' && Wptm.query_option.column_options !== null && typeof Wptm.query_option.column_options[change[i][1]] !== "undefined") {
                                    if (change[i][2] !== change[i][3]) {
                                        mysql_column_edit = Wptm.query_option.column_options[change[i][1]].table + '.' + Wptm.query_option.column_options[change[i][1]].Field;
                                        mysql_column_key = Wptm.query_option.column_options[table_function_data.keyPosition].table + '.' + Wptm.query_option.column_options[table_function_data.keyPosition].Field;
                                        value_change = Wptm.datas[change[i][0]][table_function_data.keyPosition];
                                        Wptm.saveDataDbTable.push({
                                            action: 'edit_cell_mysql',
                                            row: change[i][0],
                                            col: change[i][1],
                                            content: change[i][3],
                                            id: Wptm.datas[change[i][0]][table_function_data.keyPosition],
                                            column: mysql_column_edit,
                                            column_key: mysql_column_key
                                        });
                                    }
                                } else {
                                    saveData.push({action: 'edit_cell', row: change[i][0], col: change[i][1], content: change[i][3]});
                                }
                                if (Wptm.headerOption > 0 && change[i][0] < Wptm.headerOption) {
                                    Wptm.style.table.header_data[change[i][0]][change[i][1]] = change[i][3];
                                }
                            }
                        }
                    }
                }
            }

            // clearTimeout(tableFunction.autosaveNotification);

            //change[0][2] & change[0][3] === undefined when edit html cell
            if (action.includes(source) && typeof change[0] !== 'undefined' && !(typeof change[0][2] === 'undefined' && typeof change[0][3] === 'undefined')) {
                table_function_data.needSaveAfterRender = (change[0][2] !== change[0][3] || source ==='setDataAtCell') ? true : false;
            }

            if (change && Wptm.type === 'mysql' && notSaveData && Wptm.saveDataDbTable.length > 0) {//mysql table edited
                if (typeof value !== 'undefined' || editHeader) {
                    saveData = saveData.concat(Wptm.saveDataDbTable);
                    wptm_element.mainTabContent.addClass('loading_ajax');
                    Wptm.saveDataDbTable = [];
                    _functions__WEBPACK_IMPORTED_MODULE_0__["default"].saveChanges(true);
                }
                table_function_data.needSaveAfterRender = false;
            }

            //update merge cells when autofill
            if ('Autofill.fill' === source) {
                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].cleanHandsontable();
                updateMergeCells(true);
            } else {
                setTimeout(function () {
                    if (jquery(Wptm.container).handsontable('getInstance').undoRedo.isUndoAvailable()) {
                        wptm_element.primary_toolbars.find('#undo_cell').addClass('active').removeClass('no_active');
                    } else {
                        wptm_element.primary_toolbars.find('#undo_cell').removeClass('active').addClass('no_active');
                    }
                    if (jquery(Wptm.container).handsontable('getInstance').undoRedo.isRedoAvailable()) {
                        wptm_element.primary_toolbars.find('#redo_cell').addClass('active').removeClass('no_active');
                    } else {
                        wptm_element.primary_toolbars.find('#redo_cell').removeClass('active').addClass('no_active');
                    }
                }, 100);
            }

            if (table_function_data.needSaveAfterRender === true) {
                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].saveChanges();
                table_function_data.needSaveAfterRender = false;
            }
        },
        afterCreateRow: function (index, amount) {
            var selector = table_function_data.selection[table_function_data.selectionSize - 1];
            var $ = jquery;
            var Wptm = window.Wptm;
            var above = selector[0] === index ? true : false;//check above/below

            if (typeof (Wptm.style.cells) !== 'undefined') {
                var newCells = {};
                var cell, i, cells;

                for (cell in Wptm.style.cells) {
                    cells = Wptm.style.cells[cell];
                    if (cells[0] >= index) {//rows >= index
                        newCells[parseInt(cells[0] + amount) + '!' + cells[1]]
                            = [cells[0] + amount, cells[1], $.extend({}, cells[2])];
                    }
                    if (cells[0] < index) {//rows < index
                        newCells[cell]
                            = [cells[0], cells[1], $.extend({}, cells[2])];
                    }
                    if (cells[0] <= selector[2] && selector[0] <= cells[0]) {//new rows copy style of selector
                        newCells[parseInt(cells[0] - selector[0] + index) + '!' + cells[1]]
                            = [parseInt(cells[0] - selector[0] + index), cells[1], $.extend({}, cells[2])];
                    }
                }
                Wptm.style.cells = $.extend({}, newCells);

                if (typeof Wptm.style.table.alternateColorValue !== 'undefined') {//update Wptm.style.table.alternateColorValue by index, amount
                    var alternateColorValue = Wptm.style.table.alternateColorValue;
                    for (i in alternateColorValue) {
                        if (above) {//above
                            if (alternateColorValue[i].selection[0] >= index + amount) { // alternateColorValue > new rows
                                alternateColorValue[i].selection[0] = alternateColorValue[i].selection[0] + amount;
                                alternateColorValue[i].selection[2] = alternateColorValue[i].selection[2] + amount;
                            }
                            if (alternateColorValue[i].selection[0] < index + amount && alternateColorValue[i].selection[2] >= index) {
                                alternateColorValue[i].selection[2] = alternateColorValue[i].selection[2] + amount;
                            }
                        } else {//below
                            if (alternateColorValue[i].selection[0] >= index) { // alternateColorValue > new rows
                                alternateColorValue[i].selection[0] = alternateColorValue[i].selection[0] + amount;
                                alternateColorValue[i].selection[2] = alternateColorValue[i].selection[2] + amount;
                            }
                            if (alternateColorValue[i].selection[0] < index && alternateColorValue[i].selection[2] >= selector[0]) {
                                alternateColorValue[i].selection[2] = alternateColorValue[i].selection[2] + amount;
                            }
                        }
                    }
                }
            }

            if (typeof (Wptm.style.rows) !== 'undefined') {
                // index, amount
                var new_data = $.extend({}, Wptm.style.rows);
                var jj;
                if (selector[0] === index) {//left
                    for (jj = index; jj < _.size(Wptm.style.rows); jj++) {
                        new_data[jj + amount] = [jj + amount, {}];
                        new_data[jj + amount][1] = $.extend({}, Wptm.style.rows[jj][1]);
                    }
                } else {
                    for (jj = index; jj < _.size(Wptm.style.rows) + amount; jj++) {
                        new_data[jj] = [jj, {}];
                        new_data[jj][1] = $.extend({}, Wptm.style.rows[jj - amount][1]);
                    }
                }

                Wptm.style.rows = $.extend({}, new_data);
            }

            if (parseInt(Wptm.headerOption) > 0) {
                delete Wptm.style.table.header_data;
                Wptm.style.table.header_data = [];
                for (var j = 0; j < Wptm.headerOption; j++) {
                    Wptm.style.table.header_data[j] = Wptm.datas[j];
                }
            }
            saveData.push({action: 'create_row', index: index, amount: amount, above: above});

            // update merged row index and get tableFunction.saveChanges();
            updateMergeCells(window.table_function_data.firstRender);
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].create_ranger_cells_lock(Wptm, table_function_data, {type: 'create_row', index: index, amount: amount});

            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].cleanHandsontable();
        },
        afterRemoveRow: function (index, amount) {
            var selector = table_function_data.selection[table_function_data.selectionSize - 1];
            var $ = jquery;
            var Wptm = window.Wptm;
            if (typeof (Wptm.style.cells) !== 'undefined') {
                var newCells = {};
                var cell, i, cells;

                for (cell in Wptm.style.cells) {
                    cells = Wptm.style.cells[cell];
                    if (cells[0] > index + amount - 1) {
                        newCells[parseInt(cells[0] - amount) + '!' + cells[1]]
                            = [cells[0] - amount, cells[1], $.extend({}, cells[2])];
                    }
                    if (cells[0] < index) {
                        newCells[cell]
                            = [cells[0], cells[1], $.extend({}, cells[2])];
                    }
                }
                Wptm.style.cells = $.extend({}, newCells);

                if (typeof Wptm.style.table.alternateColorValue !== 'undefined') {//update Wptm.style.table.alternateColorValue by index, amount
                    var alternateColorValue = Wptm.style.table.alternateColorValue;
                    for (i in alternateColorValue) {
                        if (alternateColorValue[i].selection[2] >= index && alternateColorValue[i].selection[2] <= (index + amount - 1)) {
                            alternateColorValue[i].selection[2] = index - 1;//selection[2] in selector
                        }
                        if (alternateColorValue[i].selection[2] >= index + amount) {
                            alternateColorValue[i].selection[2] = alternateColorValue[i].selection[2] - amount;//selection[2] > selector
                        }
                        if (alternateColorValue[i].selection[0] >= index && alternateColorValue[i].selection[0] < (index + amount)) {
                            alternateColorValue[i].selection[0] = index;//selection[0] in selector
                        }
                        if (alternateColorValue[i].selection[0] >= index + amount) {
                            alternateColorValue[i].selection[0] = alternateColorValue[i].selection[0] - amount;//selection[0] > selector
                        }
                        if (alternateColorValue[i].selection[0] > alternateColorValue[i].selection[2]) {//alternateColor in selector
                            delete alternateColorValue[i];
                        }
                    }
                }
            }

            if (typeof (Wptm.style.rows) !== 'undefined') {
                // index, amount
                var new_data = $.extend({}, Wptm.style.rows);
                var jj;
                for (jj = index; jj < _.size(Wptm.style.rows); jj++) {
                    if (typeof (Wptm.style.rows[jj + amount]) !== 'undefined') {
                        new_data[jj] = [jj, {}];
                        new_data[jj][1] = $.extend({}, Wptm.style.rows[jj][1]);
                    } else {
                        delete new_data[jj];
                    }
                }
                Wptm.style.rows = $.extend({}, new_data);
            }

            //remove col in header table
            if (parseInt(Wptm.headerOption) > 0) {
                delete Wptm.style.table.header_data;
                Wptm.style.table.header_data = [];
                for (var j = 0; j < Wptm.headerOption; j++) {
                    Wptm.style.table.header_data[j] = Wptm.datas[j];
                }
            }

            saveData.push({action: 'del_row', index: index, amount: amount, old_rows: $(window.Wptm.container).handsontable('countRows') + amount});
            // update merged row index and get tableFunction.saveChanges();
            updateMergeCells(window.table_function_data.firstRender);
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].create_ranger_cells_lock(Wptm, table_function_data, {type: 'delete_row', index: index, amount: amount});

            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].cleanHandsontable();
        },
        afterCreateCol: function (index, amount) {
            var selector = table_function_data.selection[table_function_data.selectionSize - 1];
            var $ = jquery;
            var Wptm = window.Wptm;
            var left = selector[1] === index ? true : false;//check insert left/right

            if (typeof (Wptm.style.cells) !== 'undefined') {
                var newCells = {};
                var cell, i, cells;

                for (cell in Wptm.style.cells) {
                    cells = Wptm.style.cells[cell];
                    if (cells[1] >= index) {//cols >= index
                        newCells[cells[0] + '!' + parseInt(cells[1] + amount)]
                            = [cells[0], cells[1] + amount, $.extend({}, cells[2])];
                    }
                    if (cells[1] < index) {//cols < index
                        newCells[cell]
                            = [cells[0], cells[1], $.extend({}, cells[2])];
                    }
                    if (cells[1] <= selector[3] && selector[1] <= cells[1]) {//new cols copy style of selector
                        newCells[cells[0] + '!' + parseInt(cells[1] - selector[1] + index)]
                            = [cells[0], parseInt(cells[1] - selector[1] + index), $.extend({}, cells[2])];
                    }
                }
                Wptm.style.cells = $.extend({}, newCells);

                if (typeof Wptm.style.table.alternateColorValue !== 'undefined') {//update Wptm.style.table.alternateColorValue by index, amount
                    var alternateColorValue = Wptm.style.table.alternateColorValue;
                    for (i in alternateColorValue) {
                        if (left) {//insert left
                            if (alternateColorValue[i].selection[1] >= index) { // alternateColorValue > new rows
                                alternateColorValue[i].selection[1] = alternateColorValue[i].selection[1] + amount;
                                alternateColorValue[i].selection[3] = alternateColorValue[i].selection[3] + amount;
                            }
                            if (alternateColorValue[i].selection[1] < index && alternateColorValue[i].selection[3] >= index) {
                                alternateColorValue[i].selection[3] = alternateColorValue[i].selection[3] + amount;
                            }
                        } else {//insert right
                            if (alternateColorValue[i].selection[1] >= index) { // alternateColorValue > new rows
                                alternateColorValue[i].selection[1] = alternateColorValue[i].selection[1] + amount;
                                alternateColorValue[i].selection[3] = alternateColorValue[i].selection[3] + amount;
                            }
                            if (alternateColorValue[i].selection[1] < index && alternateColorValue[i].selection[3] >= index) {
                                alternateColorValue[i].selection[3] = alternateColorValue[i].selection[3] + amount;
                            }
                        }
                    }
                }
            }

            if (typeof (Wptm.style.cols) !== 'undefined') {
                // index, amount
                var new_data = $.extend({}, Wptm.style.cols);
                var jj;
                if (selector[1] === index) {//left
                    for (jj = index; jj < _.size(Wptm.style.cols); jj++) {
                        new_data[jj + amount] = [jj + amount, {}];
                        new_data[jj + amount][1] = $.extend({}, Wptm.style.cols[jj][1]);
                    }
                } else {
                    for (jj = index; jj < _.size(Wptm.style.cols) + amount; jj++) {
                        new_data[jj] = [jj, {}];
                        new_data[jj][1] = $.extend({}, Wptm.style.cols[jj - amount][1]);
                    }
                }

                Wptm.style.cols = $.extend({}, new_data);
            }

            for (var i = index; i <= (index + amount - 1) ; i++) {
                Wptm.style.table.col_types.splice(i, 0, 'varchar');
            }

            if (parseInt(Wptm.headerOption) > 0) {
                delete Wptm.style.table.header_data;
                Wptm.style.table.header_data = [];
                for (var j = 0; j < Wptm.headerOption; j++) {
                    Wptm.style.table.header_data[j] = Wptm.datas[j];
                }
            }

            // Build column selection for default sort parameter
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].default_sortable(window.Wptm.datas);

            window.jquery(window.Wptm.container).handsontable('render');
            saveData.push({action: 'create_col', index: index, amount: amount, left: left});

            // update merged row index and get tableFunction.saveChanges();
            updateMergeCells(window.table_function_data.firstRender);
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].create_ranger_cells_lock(Wptm, table_function_data, {type: 'add_col', index: index, amount: amount});

            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].cleanHandsontable();
        },
        afterRemoveCol: function (index, amount) {
            var selector = table_function_data.selection[table_function_data.selectionSize - 1];
            var $ = jquery;
            var Wptm = window.Wptm;
            if (typeof (Wptm.style.cells) !== 'undefined') {
                var newCells = {};
                var cell, i, cells;

                for (cell in Wptm.style.cells) {
                    cells = Wptm.style.cells[cell];
                    if (cells[1] > index + amount - 1) {
                        newCells[cells[0] + '!' + parseInt(cells[1] - amount)]
                            = [cells[0], cells[1] - amount, $.extend({}, cells[2])];
                    }
                    if (cells[1] < index) {
                        newCells[cell]
                            = [cells[0], cells[1], $.extend({}, cells[2])];
                    }
                }
                Wptm.style.cells = $.extend({}, newCells);

                if (typeof Wptm.style.table.alternateColorValue !== 'undefined') {//update Wptm.style.table.alternateColorValue by index, amount
                    var alternateColorValue = Wptm.style.table.alternateColorValue;
                    for (i in alternateColorValue) {
                        if (alternateColorValue[i].selection[3] >= index && alternateColorValue[i].selection[3] <= (index + amount - 1)) {
                            alternateColorValue[i].selection[3] = index - 1;//selection[3] in selector
                        }
                        if (alternateColorValue[i].selection[3] >= index + amount) {
                            alternateColorValue[i].selection[3] = alternateColorValue[i].selection[3] - amount;//selection[3] > selector
                        }
                        if (alternateColorValue[i].selection[1] >= index && alternateColorValue[i].selection[1] < (index + amount)) {
                            alternateColorValue[i].selection[1] = index;//selection[0] in selector
                        }
                        if (alternateColorValue[i].selection[1] >= index + amount) {
                            alternateColorValue[i].selection[1] = alternateColorValue[i].selection[1] - amount;//selection[0] > selector
                        }
                        if (alternateColorValue[i].selection[1] > alternateColorValue[i].selection[3]) {//alternateColor in selector
                            delete alternateColorValue[i];
                        }
                    }
                }
            }

            if (typeof (Wptm.style.cols) !== 'undefined') {
                // index, amount
                var new_data = $.extend({}, Wptm.style.cols);
                var jj;
                for (jj = index; jj < _.size(Wptm.style.cols); jj++) {
                    if (typeof (Wptm.style.cols[jj + amount]) !== 'undefined' && Wptm.style.cols[jj + amount] !== null) {
                        new_data[jj] = [jj, {}];
                        new_data[jj][1] = $.extend({}, Wptm.style.cols[jj][1]);
                    } else {
                        delete new_data[jj];
                    }
                }
                Wptm.style.cols = $.extend({}, new_data);
            }

            for (var i = (index + amount - 1); i >= index ; i--) {
                Wptm.style.table.col_types.splice(i, 1);
            }

            //remove col in header table
            if (parseInt(Wptm.headerOption) > 0) {
                delete Wptm.style.table.header_data;
                Wptm.style.table.header_data = [];
                for (var j = 0; j < Wptm.headerOption; j++) {
                    Wptm.style.table.header_data[j] = Wptm.datas[j];
                }
            }

            // Build column selection for default sort parameter
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].default_sortable(window.Wptm.datas);
            jquery(Wptm.container).data('handsontable').render();
            saveData.push({action: 'del_col', index: index, amount: amount, old_columns: $(window.Wptm.container).handsontable('countCols') + amount});

            updateMergeCells(window.table_function_data.firstRender);
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].create_ranger_cells_lock(Wptm, table_function_data, {type: 'delete_col', index: index, amount: amount});

            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].cleanHandsontable();
        },
        afterColumnResize: function (col, width) {
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].saveChanges();
        },
        beforeRowResize: function (currentRow, newSize, isDoubleClick) {
            if (modifyRow !== null) {//currentRow is current size row
                Wptm.style.rows[modifyRow][1].height = newSize;
            }
        },
        modifyRow: function (row) {
            modifyRow = row;
        },
        afterRowResize: function (row1, height) {
            Wptm.style.rows[row1][1].height = height;

            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].saveChanges();
        },
        afterSelection: function (r, c, r2, c2, preventScrolling, selectionLayerLevel) {
            if (table_function_data.checkCellValueChange !== false && typeof table_function_data.cellValueChange !== 'undefined') {
                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].change_value_cells(table_function_data.checkCellValueChange, wptm_element.cellValue.val());
            }
            _toolbarOptions__WEBPACK_IMPORTED_MODULE_1__["default"].loadSelection(window.jquery, window.Wptm, [r, c, r2, c2]);
            Wptm.max_Col = Wptm.datas[0].length;
            Wptm.max_row = Wptm.datas.length;
            if (typeof Wptm.datas[Wptm.max_row - 1] !== 'undefined') {
                var max_col_2 = Wptm.datas[Wptm.max_row - 1].length;
                Wptm.max_Col = Wptm.max_Col < max_col_2 ? max_col_2 : Wptm.max_Col;
            }
            if (r * r2 == 0 && (r2 + r) == (Wptm.max_row - 1)) {
                Wptm.newSelect = 'col';
            } else if (c * c2 == 0 && (c2 + c) == Wptm.max_Col - 1) {
                Wptm.newSelect = 'row';
            } else {
                delete Wptm.newSelect;
            }
        },
        afterScrollHorizontally: function () {
            //change position of Editors when ScrollHorizontally
            checkScroll = true;
            clearTimeout(autoScroll);
            autoScroll = setTimeout(function () {
                checkScroll = afterScrollEditors(checkScroll);
            }, 200);
        },
        afterScrollVertically: function () {
            //change position of Editors when ScrollHorizontally
            checkScroll = true;
            clearTimeout(autoScroll);
            autoScroll = setTimeout(function () {
                checkScroll = afterScrollEditors(checkScroll);
            }, 200);
        },
        afterMergeCells: function (cellRange, mergeParent, auto) {
            updateMergeCells(window.table_function_data.firstRender);
            // if (window.table_function_data.firstRender) {
            //     tableFunction.create_ranger_cells_lock(Wptm, table_function_data, {type: 'mergeCells'});
            // }
        },
        afterUnmergeCells: function (cellRange, auto) {
            updateMergeCells(window.table_function_data.firstRender);
            // if (window.table_function_data.firstRender) {
            //     tableFunction.create_ranger_cells_lock(Wptm, table_function_data, {type: 'mergeCells'});
            // }
        },
        colWidths: function (index) {
            if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNested(window.Wptm.style, 'cols', index, 1, 'width')) {
                return window.Wptm.style.cols[index][1].width;
            } else if (typeof window.Wptm.style.cols === 'object' && (typeof window.Wptm.style.cols[index] === 'undefined' || typeof window.Wptm.style.cols[index][1].width === 'undefined')) {
                return 100;
            }
        },
        rowHeights: function (index) {
            if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkObjPropertyNestedNotEmpty(window.Wptm.style, 'rows', index, 1, 'height')) {
                return window.Wptm.style.rows[index][1].height;
            } else {
                // Table rows is large than 1000, set default row height to 30
                if (totalRows >= 1000) {
                    return 30;
                }
                var h;
                if (typeof Wptm.style.table.allRowHeight !== 'undefined' && Wptm.style.table.allRowHeight !== '') {
                    h = Wptm.style.table.allRowHeight;
                } else {
                    h = window.Wptm.container.find('.ht_master .htCore tbody tr').eq(index).height();
                }
                return h;
            }
        },
        fixedRowsTop: (window.Wptm.style.table.responsive_type == 'scroll' && parseInt(window.Wptm.style.table.freeze_row) > 0) ? window.Wptm.headerOption : 0,
        fixedColumnsLeft: (window.Wptm.style.table.responsive_type == 'scroll') ? parseInt(window.Wptm.style.table.freeze_col) : 0,
        manualColumnResize: (window.Wptm.can.edit || (window.Wptm.can.editown && data.author === window.Wptm.author)),
        manualRowResize: (window.Wptm.can.edit || (window.Wptm.can.editown && data.author === window.Wptm.author)),
        outsideClickDeselects: false,
        columnSorting: false,
        undo: true,
        mergeCells: window.Wptm.mergeCellsSetting,
        readOnly: ((window.Wptm.can.edit || (window.Wptm.can.editown && data.author === window.Wptm.author)) && window.Wptm.type === 'html') ? false : (Wptm.table_editing != "1" ? true : false),
        // readOnly: false,
        selectionMode: table_function_data.mysqlEdit ? 'single' : 'range',
        columns: typeof table_function_data.columns !== 'undefined' ? table_function_data.columns : undefined,
        // columns: undefined,
        beforeKeyDown: function (e) {
            var evtobj = window.event? event : e;

            if (evtobj.keyCode == 90 && (evtobj.ctrlKey || evtobj.metaKey)) {//undo
                if (!evtobj.shiftKey) {
                    if (!window.jquery(Wptm.container).handsontable('getInstance').undoRedo.isUndoAvailable()) {
                        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].status_notic(1, wptmText.some_action_cant_be_done + '!', $('#undoNotic'));
                    }
                }
                if (evtobj.shiftKey) {
                    if (!window.jquery(Wptm.container).handsontable('getInstance').undoRedo.isRedoAvailable()) {
                        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].status_notic(1, wptmText.some_action_cant_be_done + '!', $('#undoNotic'));
                    }
                }
            }
        },
        // readOnlyCellClassName: 'wptm_lock_column', //ncc error conflict header, conflict html cell
        cells: function(row, col, prop) {
            return _functions__WEBPACK_IMPORTED_MODULE_0__["default"].check_cell_readOnly(row, col, prop);
        },
        contextMenu: (((window.Wptm.can.edit || (window.Wptm.can.editown && data.author === window.Wptm.author)) && window.Wptm.type === 'html')
            ? {
                items: {
                    "cut": {
                        name: wptmContext.cut,
                        hidden: function () {
                            if (Wptm.max_Col * Wptm.max_row > 0) {
                                return false;
                            }
                            return true;
                        }
                    },
                    "copy": {
                        name: wptmContext.copy,
                        hidden: function () {
                            if (Wptm.max_Col * Wptm.max_row > 0) {
                                return false;
                            }
                            return true;
                        },
                    },
                    // "paste": {
                    //     key: 'paste',
                    //     name: 'Paste',
                    //     disabled: function() {
                    //         return clipboardCache.length === 0;
                    //     },
                    //     callback: function() {
                    //         var plugin = this.getPlugin('copyPaste');
                    //
                    //         this.listen();
                    //         plugin.paste(clipboardCache);
                    //     }
                    // },
                    "remove": {
                        name: wptmContext.remove,
                        key: 'remove',
                        submenu: {
                            items: [
                                {
                                    key: "remove:remove_row",
                                    name: wptmContext.remove_rows,
                                    callback: function (key, selection, clickEvent) {
                                        var selection = table_function_data.selection;
                                        var i;
                                        for (i = 0; i < table_function_data.selectionSize; i++) {
                                            if (selection[i][2] != null || selection[i][0] != selection[i][2]) {
                                                window.Wptm.container.handsontable('alter', 'remove_row', selection[i][0], selection[i][2] - selection[i][0] + 1);
                                            } else {
                                                window.Wptm.container.handsontable('alter', 'remove_row', selection[i][0]);
                                            }
                                        }
                                    },
                                },
                                {
                                    key: "remove:remove_col",
                                    name: wptmContext.remove_cols,
                                    callback: function (key, options) {
                                        var selection = table_function_data.selection;
                                        var i;
                                        for (i = 0; i < table_function_data.selectionSize; i++) {
                                            if (selection[i][3] != null || selection[i][1] != selection[i][3]) {
                                                window.Wptm.container.handsontable('alter', 'remove_col', selection[i][1], selection[i][3] - selection[i][1] + 1);
                                            } else {
                                                window.Wptm.container.handsontable('alter', 'remove_col', selection[i][1]);
                                            }
                                        }
                                    },
                                },
                                {
                                    key: "remove:remove_cell_format",
                                    name: wptmContext.remove_cell_format,
                                    callback: function (key, selection, clickEvent) {
                                        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getFillArray(table_function_data.selection, Wptm, {
                                            date_formats: false,
                                            date_formats_momentjs: false,
                                            currency_symbol: false,
                                            symbol_position: false,
                                            decimal_symbol: false,
                                            decimal_count: false,
                                            thousand_symbol: false
                                        }, 'style', true, function () {
                                            window.jquery(wptm_element.tableContainer).handsontable('render');
                                        });
                                    },
                                    hidden: function () {//hiden when has html cell
                                        if (table_function_data.selectionSize > 0) {
                                            if (!_functions__WEBPACK_IMPORTED_MODULE_0__["default"].checkCellsOptionsValidate(table_function_data.selection, 'cell_type', 'html')) {
                                                return false;
                                            }
                                        }
                                        return true;
                                    }
                                },
                                {
                                    key: "remove:remove_alternating_color",
                                    // name: function () {
                                    //     return (table_function_data.selectionSize > 2
                                    //         || (table_function_data.selectionSize < 2 && (table_function_data.selection[0][2] > table_function_data.selection[0][0] + 1) || (table_function_data.selection[0][3] > table_function_data.selection[0][1] + 1)))
                                    //         ? wptmContext.remove_alternating_color_cells
                                    //         : wptmContext.remove_alternating_color;
                                    // },
                                    name: wptmContext.remove_alternating_color,
                                    callback: function (key, selection, clickEvent) {
                                        var i, ij, ik, alternateColorCell, selection_cell = null;
                                        for (i = 0; i < table_function_data.selectionSize; i++) {
                                            if (selection_cell !== null) {
                                                break;
                                            }
                                            for (ij = table_function_data.selection[i][0]; ij <= table_function_data.selection[i][2]; ij++) {
                                                if (selection_cell !== null) {
                                                    break;
                                                }
                                                for (ik = table_function_data.selection[i][1]; ik <= table_function_data.selection[i][3]; ik++) {
                                                    if (typeof Wptm.style.cells[ij + "!" + ik] !== 'undefined' && typeof Wptm.style.cells[ij + "!" + ik][2].AlternateColor !== 'undefined') {
                                                        alternateColorCell = parseInt(Wptm.style.cells[ij + "!" + ik][2].AlternateColor);
                                                        if (typeof Wptm.style.table.alternateColorValue[alternateColorCell] !== 'undefined' && typeof Wptm.style.table.alternateColorValue[alternateColorCell].selection !== 'undefined') {
                                                            selection_cell = Wptm.style.table.alternateColorValue[alternateColorCell].selection;
                                                            Wptm.container.handsontable("selectCell", selection_cell[0], selection_cell[1], selection_cell[2], selection_cell[3]);
                                                            break;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (selection_cell !== null) {
                                            bootbox.confirm(wptmText.warning_remove_alternating_color, wptmText.Cancel, wptmText.Ok, function (result) {
                                                if (result) {
                                                    table_function_data.oldAlternate[alternateColorCell] = false;
                                                    Wptm.style.table.alternateColorValue[alternateColorCell] = false;
                                                    setTimeout(function () {
                                                        saveData.push({action: 'deleteStyle', selection: table_function_data.selection, style: 'AlternateColor'});
                                                        window.jquery('#wptm_popup').find('.colose_popup').trigger('click');
                                                        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].saveChanges(true, 'render');
                                                    }, 100);
                                                } else {
                                                    window.jquery('#wptm_popup').find('.colose_popup').trigger('click');
                                                }
                                                ;
                                            });
                                        }
                                    },
                                    hidden: function () {//hiden when has html cell
                                        if (table_function_data.selectionSize > 0) {
                                            return false;
                                        }
                                        return true;
                                    }
                                }],
                        },
                        hidden: function () {
                            if (Wptm.max_Col * Wptm.max_row > 0) {
                                return false;
                            }
                            return true;
                        }
                    },
                    "---------": {},
                    "rows_size": {
                        name: function () {
                            if (typeof Wptm.newSelect !== 'undefined') {
                                var selectSize = table_function_data.selection[table_function_data.selectionSize - 1];
                                if (Wptm.newSelect === 'row') {
                                    if (selectSize[0] !== selectSize[2]) {
                                        return '<span>' + wptmContext.define + 's ' + (selectSize[0] + 1) + '-' + (selectSize[2] + 1) + '</span>';
                                    }
                                    return '<span>' + wptmContext.define + '</span>';
                                } else {
                                    if (selectSize[1] !== selectSize[3]) {
                                        return '<span>' + wptmContext.define + 's ' + String.fromCharCode(65 + selectSize[1]) + '-' + String.fromCharCode(65 + selectSize[3]) + '</span>';
                                    }
                                    return '<span>' + wptmContext.defineColumn + '</span>';
                                }
                            }
                        },
                        callback: function (key, selection, clickEvent) {
                            if (Wptm.newSelect === 'row') {
                                wptm_element.primary_toolbars.find('.table_option[name="resize_row"]').trigger('click');
                            } else {
                                wptm_element.primary_toolbars.find('.table_option[name="resize_column"]').trigger('click');
                            }
                            return true;
                        },
                        hidden: function () {
                            if (typeof Wptm.newSelect !== 'undefined' && Wptm.max_Col * Wptm.max_row > 0) {
                                return false;
                            }
                            return true;
                        }
                    },
                    "insert": {
                        name: wptmContext.insert,
                        key: 'insert',
                        submenu: {
                            items: [
                                {
                                    key: "insert:row_above",
                                    name: wptmContext.insert_above,
                                    callback: function (key, options) {
                                        var selection = table_function_data.selection[table_function_data.selectionSize - 1];
                                        if (selection[2] != null || selection[0] != selection[2]) {
                                            window.Wptm.container.handsontable('alter', 'insert_row', selection[0], selection[2] - selection[0] + 1);
                                        } else {
                                            window.Wptm.container.handsontable('alter', 'insert_row', selection[0]);
                                        }
                                    },
                                    hidden: function () {
                                        if (Wptm.max_Col > 0) {
                                            return false;
                                        }
                                        return true;
                                    }
                                },
                                {
                                    key: "insert:row_below",
                                    name: wptmContext.insert_below,
                                    callback: function (key, options) {
                                        var selection = table_function_data.selection[table_function_data.selectionSize - 1];
                                        if (selection[2] != null || selection[0] != selection[2]) {
                                            window.Wptm.container.handsontable('alter', 'insert_row', selection[2] + 1, selection[2] - selection[0] + 1);
                                        } else {
                                            window.Wptm.container.handsontable('alter', 'insert_row', selection[2] + 1);
                                        }
                                    },
                                    hidden: function () {
                                        if (Wptm.max_Col > 0) {
                                            return false;
                                        }
                                        return true;
                                    }
                                },
                                {
                                    key: "insert:col_left",
                                    name: wptmContext.insert_left,
                                    callback: function (key, options) {
                                        var selection = table_function_data.selection[table_function_data.selectionSize - 1];
                                        if (selection[3] != null || selection[1] != selection[3]) {
                                            window.Wptm.container.handsontable('alter', 'insert_col', selection[1], selection[3] - selection[1] + 1);
                                        } else {
                                            window.Wptm.container.handsontable('alter', 'insert_col', selection[1]);
                                        }
                                    },
                                    hidden: function () {
                                        if (Wptm.max_row > 0) {
                                            return false;
                                        }
                                        return true;
                                    }
                                },
                                {
                                    key: "insert:col_right",
                                    name: wptmContext.insert_right,
                                    callback: function (key, options) {
                                        var selection = table_function_data.selection[table_function_data.selectionSize - 1];
                                        if (selection[3] != null || selection[1] != selection[3]) {
                                            window.Wptm.container.handsontable('alter', 'insert_col', selection[3] + 1, selection[3] - selection[1] + 1);
                                        } else {
                                            window.Wptm.container.handsontable('alter', 'insert_col', selection[3] + 1);
                                        }
                                    },
                                    hidden: function () {
                                        if (Wptm.max_row > 0) {
                                            return false;
                                        }
                                        return true;
                                    }
                                }],
                        }
                    },
                    "undo": {
                        name: wptmContext.undo,
                        hidden: function () {
                            if (Wptm.max_Col * Wptm.max_row > 0) {
                                return false;
                            }
                            return true;
                        }
                    },
                    "redo": {
                        name: wptmContext.redo,
                        hidden: function () {
                            if (Wptm.max_Col * Wptm.max_row > 0) {
                                return false;
                            }
                            return true;
                        }
                    },
                    "protect_range": {
                        name: function () {
                            // if (typeof Wptm.newSelect !== 'undefined' && Wptm.newSelect === 'col') {
                            //     var selection = table_function_data.selection[table_function_data.selectionSize - 1];
                            //     var ij;
                            //     table_function_data.protect_columns_check = false;
                            //     if (typeof Wptm.style.table.protect_columns !== 'undefined') {
                            //         for (ij = selection[1]; ij <= selection[3]; ij++) {
                            //             if (Wptm.style.table.protect_columns[ij] != 1) {
                            //                 table_function_data.protect_columns_check = false;
                            //                 return '<span>' + wptmContext.protect_columns + '</span>';
                            //             }
                            //         }
                            //         table_function_data.protect_columns_check = true;
                            //         return '<span class="selected">' + wptmContext.protect_columns + '</span>';
                            //     } else {
                            //         Wptm.style.table.protect_columns = [];
                            //         for (ij = 0; ij < Wptm.max_Col; ij++) {
                            //             Wptm.style.table.protect_columns[ij] = '0';
                            //         }
                            //         return '<span>' + wptmContext.protect_columns + '</span>';
                            //     }
                            // }
                            return '<span>' + wptmContext.protect_range + '</span>';
                        },
                        callback: function (key, selections, clickEvent) {
                            // if (typeof Wptm.newSelect !== 'undefined' && Wptm.newSelect === 'col') {
                            //     var ij;
                            //     if (typeof Wptm.style.table.protect_columns == 'undefined') {
                            //         Wptm.style.table.protect_columns = [];
                            //         for (ij = 0; ij < Wptm.max_Col; ij++) {
                            //             Wptm.style.table.protect_columns[ij] = '0';
                            //         }
                            //     }
                            //
                            //     var selection = table_function_data.selection[table_function_data.selectionSize - 1];
                            //     for (ij = selection[1]; ij <= selection[3]; ij++) {
                            //         if (typeof table_function_data.protect_columns_check !== 'undefined'
                            //             && table_function_data.protect_columns_check) {
                            //             Wptm.style.table.protect_columns[ij] = '0';
                            //         } else {
                            //             Wptm.style.table.protect_columns[ij] = '1';
                            //         }
                            //     }
                            // } else {
                                wptm_element.primary_toolbars.find('.table_option[name="lock_ranger_cells"]').trigger('click');
                            // }
                            return true;
                        },
                        hidden: function () {
                            if (wptm_administrator == 1) {
                                return false;
                            }
                            return true;
                        }
                    },
                    "mergeCells": {
                        // name: wptmContext.merge,
                    },
                    "Add tooltip": {
                        name: wptmContext.tooltip,
                        callback: function (key, selection, clickEvent) {
                            wptm_element.editToolTip.trigger('click');
                        },
                        hidden: function () {
                            if (Wptm.max_Col * Wptm.max_row < 1) {
                                return true;
                            }
                            if (table_function_data.selectionSize > 1
                                || (table_function_data.selection[0][2] - table_function_data.selection[0][0] > 0
                                    || table_function_data.selection[0][3] - table_function_data.selection[0][1] > 0)) {
                                return true;
                            }
                            return false;
                        }
                    },
                    "Column type": {
                        name: wptmContext.column_type,
                        key: 'column_type',
                        submenu: {
                            items: [
                                {
                                    key: "column_type:varchar",
                                    name: function () {
                                        if (typeof table_function_data.type_column_selected !== 'undefined' && (table_function_data.type_column_selected === 'varchar' || table_function_data.type_column_selected.toLowerCase() === 'varchar(255)')) {
                                            return '<span class="selected">' + wptmContext.column_type_varchar + '</span>';
                                        } else {
                                            return '<span>' + wptmContext.column_type_varchar + '</span>';
                                        }
                                    },
                                    callback: function (key, options) {
                                        bootbox.confirm(wptmText.ALERT_CHANGE_COLUMN_TYPE, wptmText.Cancel, wptmText.Ok, function (result) {
                                            if (result === true) {
                                                var cols_selected = [];
                                                var i, jj;
                                                for (jj = 0; jj < table_function_data.selectionSize; jj++) {
                                                    for (i = table_function_data.selection[jj][1]; i <= table_function_data.selection[jj][3]; i++) {
                                                        cols_selected[i] = 'varchar';
                                                        Wptm.style.table.col_types[i] = 'varchar';
                                                    }
                                                }

                                                // saveData.push({action: 'set_column_type', cols: unique_cols_selected, type: 'varchar'});
                                                saveData.push({
                                                    action: 'set_columns_types',
                                                    value: cols_selected
                                                });
                                                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].cleanHandsontable();
                                                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].saveChanges(true);
                                            }
                                        });
                                    },
                                },
                                {
                                    key: "column_type:int",
                                    name: function () {
                                        if (typeof table_function_data.type_column_selected !== 'undefined' && table_function_data.type_column_selected === 'int') {
                                            return '<span class="selected">' + wptmContext.column_type_int + '</span>';
                                        } else {
                                            return '<span>' + wptmContext.column_type_int + '</span>';
                                        }
                                    },
                                    callback: function (key, options) {
                                        bootbox.confirm(wptmText.ALERT_CHANGE_COLUMN_TYPE, wptmText.Cancel, wptmText.Ok, function (result) {
                                            if (result === true) {
                                                var cols_selected = [];
                                                var i, jj;
                                                for (jj = 0; jj < table_function_data.selectionSize; jj++) {
                                                    for (i = table_function_data.selection[jj][1]; i <= table_function_data.selection[jj][3]; i++) {
                                                        cols_selected[i] = 'int';
                                                        Wptm.style.table.col_types[i] = 'int';
                                                    }
                                                }

                                                // saveData.push({action: 'set_column_type', cols: unique_cols_selected, type: 'varchar'});
                                                saveData.push({
                                                    action: 'set_columns_types',
                                                    value: cols_selected
                                                });
                                                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].cleanHandsontable();
                                                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].saveChanges(true);
                                            }
                                        });
                                    },
                                },
                                {
                                    key: "column_type:float",
                                    name: function () {
                                        if (typeof table_function_data.type_column_selected !== 'undefined' && table_function_data.type_column_selected === 'float') {
                                            return '<span class="selected">' + wptmContext.column_type_float + '</span>';
                                        } else {
                                            return '<span>' + wptmContext.column_type_float + '</span>';
                                        }
                                    },
                                    callback: function (key, options) {
                                        bootbox.confirm(wptmText.ALERT_CHANGE_COLUMN_TYPE, wptmText.Cancel, wptmText.Ok, function (result) {
                                            if (result === true) {
                                                var cols_selected = [];
                                                var i, jj;
                                                for (jj = 0; jj < table_function_data.selectionSize; jj++) {
                                                    for (i = table_function_data.selection[jj][1]; i <= table_function_data.selection[jj][3]; i++) {
                                                        cols_selected[i] = 'float';
                                                        Wptm.style.table.col_types[i] = 'float';
                                                    }
                                                }

                                                // saveData.push({action: 'set_column_type', cols: unique_cols_selected, type: 'varchar'});
                                                saveData.push({
                                                    action: 'set_columns_types',
                                                    value: cols_selected
                                                });
                                                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].cleanHandsontable();
                                                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].saveChanges(true);
                                            }
                                        });

                                    },
                                },
                                {
                                    key: "column_type:date",
                                    name: function () {
                                        if (typeof table_function_data.type_column_selected !== 'undefined' && table_function_data.type_column_selected === 'date') {
                                            return '<span class="selected">' + wptmContext.column_type_date + '</span>';
                                        } else {
                                            return '<span>' + wptmContext.column_type_date + '</span>';
                                        }
                                    },
                                    callback: function (key, options) {
                                        bootbox.confirm(wptmText.ALERT_CHANGE_COLUMN_TYPE, wptmText.Cancel, wptmText.Ok, function (result) {
                                            if (result === true) {
                                                var cols_selected = [];
                                                var i, jj;
                                                for (jj = 0; jj < table_function_data.selectionSize; jj++) {
                                                    for (i = table_function_data.selection[jj][1]; i <= table_function_data.selection[jj][3]; i++) {
                                                        cols_selected[i] = 'date';
                                                        Wptm.style.table.col_types[i] = 'date';
                                                    }
                                                }

                                                // saveData.push({action: 'set_column_type', cols: unique_cols_selected, type: 'varchar'});
                                                saveData.push({
                                                    action: 'set_columns_types',
                                                    value: cols_selected
                                                });
                                                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].cleanHandsontable();
                                                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].saveChanges(true);
                                            }
                                        });

                                    },
                                },
                                {
                                    key: "column_type:datetime",
                                    name: function () {
                                        if (typeof table_function_data.type_column_selected !== 'undefined' && table_function_data.type_column_selected === 'datetime') {
                                            return '<span class="selected">' + wptmContext.column_type_datetime + '</span>';
                                        } else {
                                            return '<span>' + wptmContext.column_type_datetime + '</span>';
                                        }
                                    },
                                    callback: function (key, options) {
                                        bootbox.confirm(wptmText.ALERT_CHANGE_COLUMN_TYPE, wptmText.Cancel, wptmText.Ok, function (result) {
                                            if (result === true) {
                                                var cols_selected = [];
                                                var i, jj;
                                                for (jj = 0; jj < table_function_data.selectionSize; jj++) {
                                                    for (i = table_function_data.selection[jj][1]; i <= table_function_data.selection[jj][3]; i++) {
                                                        cols_selected[i] = 'datetime';
                                                        Wptm.style.table.col_types[i] = 'datetime';
                                                    }
                                                }

                                                // saveData.push({action: 'set_column_type', cols: unique_cols_selected, type: 'varchar'});
                                                saveData.push({
                                                    action: 'set_columns_types',
                                                    value: cols_selected
                                                });
                                                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].cleanHandsontable();
                                                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].saveChanges(true);
                                            }
                                        });

                                    },
                                },
                                {
                                    key: "column_type:text",
                                    name: function () {
                                        if (typeof table_function_data.type_column_selected !== 'undefined' && table_function_data.type_column_selected === 'text') {
                                            return '<span class="selected">' + wptmContext.column_type_text + '</span>';
                                        } else {
                                            return '<span>' + wptmContext.column_type_text + '</span>';
                                        }
                                    },
                                    callback: function (key, options) {
                                        bootbox.confirm(wptmText.ALERT_CHANGE_COLUMN_TYPE, wptmText.Cancel, wptmText.Ok, function (result) {
                                            if (result === true) {
                                                var cols_selected = [];
                                                var i, jj;
                                                for (jj = 0; jj < table_function_data.selectionSize; jj++) {
                                                    for (i = table_function_data.selection[jj][1]; i <= table_function_data.selection[jj][3]; i++) {
                                                        cols_selected[i] = 'text';
                                                        Wptm.style.table.col_types[i] = 'text';
                                                    }
                                                }

                                                // saveData.push({action: 'set_column_type', cols: unique_cols_selected, type: 'varchar'});
                                                saveData.push({
                                                    action: 'set_columns_types',
                                                    value: cols_selected
                                                });
                                                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].cleanHandsontable();
                                                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].saveChanges(true);
                                            }
                                        });

                                    },
                                },
                            ]
                        },
                        hidden: function () {
                            if (Wptm.max_Col * Wptm.max_row < 1) {
                                return true;
                            }
                            if (table_function_data.selectionSize > 1 || table_function_data.selection[0][3] - table_function_data.selection[0][1] > 0) {
                                return true;
                            }
                            return false;
                        }
                    },
                    "hide_column": {
                        name: function () {
                            if (typeof Wptm.newSelect !== 'undefined' && Wptm.newSelect === 'col') {
                                var selection = table_function_data.selection;
                                if (typeof Wptm.style.cols[selection[0][1]] !== 'undefined'
                                    && Wptm.style.cols[selection[0][1]] !== null
                                    && typeof Wptm.style.cols[selection[0][1]][1].hide_column !== 'undefined'
                                    && Wptm.style.cols[selection[0][1]][1].hide_column == 1) {
                                    return '<span class="selected">' + wptmContext.hide_column + '</span>';
                                } else {
                                    return '<span>' + wptmContext.hide_column + '</span>';
                                }
                            }
                        },
                        callback: function (key, selection, clickEvent) {
                            if (Wptm.newSelect === 'col') {
                                var selection = table_function_data.selection;
                                if (typeof Wptm.style.cols[selection[0][1]] !== 'undefined' && Wptm.style.cols[selection[0][1]] !== null) {
                                    if (typeof Wptm.style.cols[selection[0][1]][1].hide_column !== 'undefined' && Wptm.style.cols[selection[0][1]][1].hide_column == 1) {
                                        Wptm.style.cols = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].fillArray(Wptm.style.cols, {hide_column: 0}, selection[0][1]);
                                    } else {
                                        Wptm.style.cols = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].fillArray(Wptm.style.cols, {hide_column: 1}, selection[0][1]);
                                    }
                                }
                                return true;
                            }
                            return true;
                        },
                        hidden: function () {
                            var selection = table_function_data.selection;
                            if (typeof Wptm.newSelect === 'undefined' || Wptm.newSelect !== "col" || selection[0][3] - selection[0][1] >= 1) {
                                return true;
                            }
                            if (Wptm.max_Col * Wptm.max_row > 0) {
                                return false;
                            }
                            return true;
                        }
                    }
                }
            }
            : {
                items: {
                    "hide_column": {
                        name: function () {
                            if (typeof Wptm.newSelect !== 'undefined' && Wptm.newSelect === 'col') {
                                var selection = table_function_data.selection;
                                if (typeof Wptm.style.cols[selection[0][1]] !== 'undefined'
                                    && Wptm.style.cols[selection[0][1]] !== null
                                    && typeof Wptm.style.cols[selection[0][1]][1].hide_column !== 'undefined'
                                    && Wptm.style.cols[selection[0][1]][1].hide_column == 1) {
                                    return '<span class="selected">' + wptmContext.hide_column + '</span>';
                                } else {
                                    return '<span>' + wptmContext.hide_column + '</span>';
                                }
                            }
                        },
                        callback: function (key, selection, clickEvent) {
                            if (Wptm.newSelect === 'col') {
                                var selection = table_function_data.selection;
                                if (typeof Wptm.style.cols[selection[0][1]] !== 'undefined' && Wptm.style.cols[selection[0][1]] !== null) {
                                    if (typeof Wptm.style.cols[selection[0][1]][1].hide_column !== 'undefined' && Wptm.style.cols[selection[0][1]][1].hide_column == 1) {
                                        Wptm.style.cols = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].fillArray(Wptm.style.cols, {hide_column: 0}, selection[0][1]);
                                    } else {
                                        Wptm.style.cols = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].fillArray(Wptm.style.cols, {hide_column: 1}, selection[0][1]);
                                    }
                                }
                                return true;
                            }
                            return true;
                        },
                        hidden: function () {
                            var selection = table_function_data.selection;
                            if (typeof Wptm.newSelect === 'undefined' || Wptm.newSelect !== "col" || selection[0][3] - selection[0][1] >= 1) {
                                return true;
                            }
                            if (Wptm.max_Col * Wptm.max_row > 0) {
                                return false;
                            }
                            return true;
                        }
                    },
                    "remove_alternating_color": {
                        name: wptmContext.remove_alternating_color,
                        callback: function (key, selection, clickEvent) {
                            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].fillArray(table_function_data, {allAlternate: {}});
                            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].fillArray(Wptm.style.table, {allAlternate: {}});
                            window.jquery(wptm_element.tableContainer).handsontable('render');
                            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].saveChanges(true);
                        },
                        hidden: function () {
                            if (typeof table_function_data.allAlternate !== 'undefined' && typeof table_function_data.allAlternate.even !== 'undefined') {
                                return false;
                            }
                            return true;
                        }
                    },
                    "delete_row_dbtable": {
                        name: function () {
                            if (typeof Wptm.newSelect !== 'undefined') {
                                if (Wptm.newSelect === 'row') {
                                    return '<span>' + wptmContext.delete_row_db_table + '</span>';
                                }
                            }
                        },
                        callback: function (key, selection, clickEvent) {
                            if (Wptm.newSelect === 'row') {
                                if (typeof Wptm.query_option.columns_list !== "undefined") {
                                    var not_create = false;
                                    var warning_craete = '';

                                    if (Wptm.query_option.tables_list.length > 1) {
                                        not_create = true;
                                        warning_craete = wptmText.warning_delete_row_multiple_db_table;
                                    }

                                    var selection = table_function_data.selection;
                                    if (not_create || typeof Wptm.query_option.column_options[table_function_data.keyPosition] === 'undefined') {
                                        bootbox.alert(warning_craete, wptmText.Ok);
                                        return true;
                                    } else if (typeof selection[0] !== 'undefined') {
                                        var id_row = Wptm.datas[selection[0][0]][table_function_data.keyPosition];
                                        var field = Wptm.query_option.column_options[table_function_data.keyPosition].Field;
                                        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].deleteRowDbTable(Wptm.query_option.tables_list[0], field, id_row);
                                    }
                                }
                                return true;
                            }
                            return true;
                        },
                        hidden: function () {
                            var selection = table_function_data.selection;
                            if (typeof Wptm.newSelect === 'undefined' || Wptm.newSelect !== "row" || selection[0][2] - selection[0][0] >= 1 || !table_function_data.mysqlEdit) {
                                return true;
                            }
                            if (Wptm.max_Col * Wptm.max_row > 0) {
                                return false;
                            }
                            return true;
                        }
                    },
                    "create_row_dbtable": {
                        name: function () {
                            if (typeof Wptm.newSelect !== 'undefined') {
                                if (Wptm.newSelect === 'row') {
                                    return '<span>' + wptmContext.create_row_db_table + '</span>';
                                }
                            }
                        },
                        callback: function (key, selection, clickEvent) {
                            if (Wptm.newSelect === 'row') {
                                var popup = {
                                    'html': wptm_element.content_popup_hide.find('#create_row_dbtable'),
                                    'showAction': function () {
                                        return true;
                                    },
                                    'submitAction': function () {
                                        if (typeof Wptm.query_option.columns_list !== "undefined") {
                                            var list_value = {};
                                            var dbtable = '';
                                            var not_create = false;
                                            var warning_craete = '';
                                            window.jquery.each(Wptm.query_option.columns_list, function (i, v) {
                                                if (v.canEdit == 1) {
                                                    var value = wptm_element.wptm_popup.find('input.table_column[data-column-name="' + v.table + '.' + v.Field + '"]').val();
                                                    var validate = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].validate_type_cell(
                                                        v.Type,
                                                        value
                                                    );
                                                    // if (!(typeof list_value[v.table] !== 'undefined')) {
                                                    //     list_value[v.table] = {};
                                                    // }
                                                    // list_value[v.table][v.Field] = value;
                                                    list_value[v.Field] = value;
                                                    dbtable = v.table;
                                                    if (Wptm.query_option.tables_list.length > 1) {
                                                        not_create = true;
                                                        warning_craete = wptmText.warning_craete_row_multiple_db_table;
                                                    } else {
                                                        if (!validate && v.Null !== 'YES') {
                                                            not_create = true;
                                                            warning_craete = wptmText.warning_craete_row_db_table;
                                                        }
                                                    }
                                                }

                                                if (Wptm.query_option.columns_list.length == i + 1) {
                                                    if (not_create) {
                                                        bootbox.alert(warning_craete, wptmText.Ok);
                                                        return true;
                                                    } else {
                                                        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].createRowDbTable(dbtable, list_value);
                                                        wptm_element.wptm_popup.find('.colose_popup').trigger('click');
                                                        return true;
                                                    }
                                                }
                                            });
                                        }
                                        return true;
                                    },
                                    'cancelAction': function () {
                                        return true;
                                    }
                                };
                                _toolbarOptions__WEBPACK_IMPORTED_MODULE_1__["default"].wptm_popup(wptm_element.wptm_popup, popup, true, false, true);
                            }
                            return true;
                        },
                        hidden: function () {
                            if (typeof Wptm.newSelect === 'undefined' || Wptm.newSelect !== "row" || !table_function_data.mysqlEdit) {
                                return true;
                            }
                            if (Wptm.max_Col * Wptm.max_row > 0) {
                                return false;
                            }
                            return true;
                        }
                    },
                    "rows_size": {
                        name: function () {
                            if (typeof Wptm.newSelect !== 'undefined') {
                                var selectSize = table_function_data.selection[table_function_data.selectionSize - 1];
                                if (Wptm.newSelect === 'row') {
                                    if (selectSize[0] !== selectSize[2]) {
                                        return '<span>' + wptmContext.define + 's ' + (selectSize[0] + 1) + '-' + (selectSize[2] + 1) + '</span>';
                                    }
                                    return '<span>' + wptmContext.define + '</span>';
                                } else {
                                    if (selectSize[1] !== selectSize[3]) {
                                        return '<span>' + wptmContext.define + 's ' + String.fromCharCode(65 + selectSize[1]) + '-' + String.fromCharCode(65 + selectSize[3]) + '</span>';
                                    }
                                    return '<span>' + wptmContext.defineColumn + '</span>';
                                }
                            }
                        },
                        callback: function (key, selection, clickEvent) {
                            if (Wptm.newSelect === 'row') {
                                wptm_element.primary_toolbars.find('.table_option[name="resize_row"]').trigger('click');
                            } else {
                                wptm_element.primary_toolbars.find('.table_option[name="resize_column"]').trigger('click');
                            }
                            return true;
                        },
                        hidden: function () {
                            if (typeof Wptm.newSelect === 'undefined' || (Wptm.newSelect !== "row" && Wptm.newSelect !== "col")) {
                                return true;
                            }
                            if (Wptm.max_Col * Wptm.max_row > 0) {
                                return false;
                            }
                            return true;
                        }
                    },
                    "protect_range": {
                        name: function () {
                            return '<span>' + wptmContext.protect_range + '</span>';
                        },
                        callback: function (key, selections, clickEvent) {
                            wptm_element.primary_toolbars.find('.table_option[name="lock_ranger_cells"]').trigger('click');
                            return true;
                        },
                        hidden: function () {
                            if (wptm_administrator == 1) {
                                return false;
                            }
                            return true;
                        }
                    },
                    "Add tooltip": {
                        name: wptmContext.tooltip,
                        callback: function (key, selection, clickEvent) {
                            wptm_element.editToolTip.trigger('click');
                        },
                        hidden: function () {
                            if (Wptm.max_Col * Wptm.max_row < 1) {
                                return true;
                            }
                            if (table_function_data.selectionSize > 1
                                || (table_function_data.selection[0][2] - table_function_data.selection[0][0] > 0
                                    || table_function_data.selection[0][3] - table_function_data.selection[0][1] > 0)) {
                                return true;
                            }
                            return false;
                        }
                    }
                }
            })
    });

    wptm_element.tableContainer.find('.ht_clone_top_left_corner').unbind('click').on('click', function () {
        var max_col = parseInt(Wptm.max_Col) > 0 ? Wptm.max_Col : Wptm.datas[0].length;
        var max_row = parseInt(Wptm.max_row) > 0 ? Wptm.max_row : Wptm.datas.length;
        jquery(wptm_element.tableContainer).handsontable("selectCells", [[0, 0, max_row - 1, max_col - 1]]);
    });

    // search key
    wptm_element.primary_toolbars.find('.search-menu').find('#dp-form-search').on('keyup', function (event) {
        if (event.keyCode === 13) {
            wptm_element.primary_toolbars.find('.search-menu').find('.search_table').trigger('click');
        } else if (jquery(this).val() === '') {
            wptm_element.primary_toolbars.find('.search-menu').find('.search_table').trigger('click');
        }
    });

    wptm_element.primary_toolbars.find('.search-menu').find('.search_table').click(function () {
        var textSearch = wptm_element.primary_toolbars.find('.search-menu').find('#dp-form-search');
        var queryResult = jquery(Wptm.container).data('handsontable').getPlugin('search').query(textSearch.val());
        jquery(Wptm.container).data('handsontable').render();
    });

    wptm_element.primary_toolbars.find('.search-menu').find('.reload_search').click(function () {
        wptm_element.primary_toolbars.find('.search-menu').find('#dp-form-search').val('');
        wptm_element.primary_toolbars.find('.search-menu').find('.search_table').trigger('click');
    });

    /*select menu option function*/
    _toolbarOptions__WEBPACK_IMPORTED_MODULE_1__["default"].selectOption();

    /*more function Eg: rename table*/
    window.wptm_element.primary_toolbars.find('.wptm_name_edit').text(window.Wptm.title);
}

/*
* function change Wptm.mergeCellsSetting when mergecell/unMergeCell action
*/
function getMergeCells(argument, checkUnmerge) {
    if (typeof window.table_function_data.mergeCells === 'undefined') {
        window.table_function_data.mergeCells = [];
        if (window.Wptm.mergeCellsSetting.length > 0) {
            var i;
            for (i = 0; i < window.Wptm.mergeCellsSetting.length; i++) {
                window.table_function_data.mergeCells['d' + window.Wptm.mergeCellsSetting[i].row + window.Wptm.mergeCellsSetting[i].col] = window.Wptm.mergeCellsSetting[i];
            }
        }
    }
    if (checkUnmerge) {
        for (i in table_function_data.mergeCells) {
            if (argument[0].from.row <= table_function_data.mergeCells[i].row
                && table_function_data.mergeCells[i].row <= argument[0].to.row
                && argument[0].from.col <= table_function_data.mergeCells[i].col
                && table_function_data.mergeCells[i].col <= argument[0].to.col) {
                delete table_function_data.mergeCells[i];
            }
        }
    } else {
        var key = 'd' + argument[0].from.row + argument[0].from.col;
        table_function_data.mergeCells[key] = argument[1];
    }
}

/*
* Function update mergecells when change rows and cols
* */
function updateMergeCells(firstRender) {
    window.Wptm.mergeCellsSetting = [];
    var ht = jquery(Wptm.container).handsontable('getInstance');
    var mergeSetting = ht.getPlugin('mergeCells').mergedCellsCollection;
    var i = 0, ij = 0, ij2 = 0;

    if (mergeSetting.mergedCells.length < 1) {//save
        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].saveChanges();
    }

    table_function_data.start_merge_cell_col = {};

    for (i = 0; i < mergeSetting.mergedCells.length; i++) {
        window.Wptm.mergeCellsSetting[i] = {
            col: mergeSetting.mergedCells[i].col,
            colspan: mergeSetting.mergedCells[i].colspan,
            row: mergeSetting.mergedCells[i].row,
            rowspan: mergeSetting.mergedCells[i].rowspan
        };
        if (typeof table_function_data.start_merge_cell_col[mergeSetting.mergedCells[i].col] == 'undefined') {
            table_function_data.start_merge_cell_col[mergeSetting.mergedCells[i].col] = [];
        }
        table_function_data.start_merge_cell_col[mergeSetting.mergedCells[i].col][mergeSetting.mergedCells[i].row] = i;
    }

    if (firstRender) {
        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].saveChanges(firstRender);
    }
}

/*
* calculator height table container
* style: style of table,
* getRowsHeight: true(get getRowHeight), false(not get getRowHeight),
* top: true(get height of ht_clone_top), false(not get height of ht_clone_top)
* */
function calHeightTable(style, getRowsHeight, top, rowRender) {
    var rows = style.rows.length;
    if (rows === undefined) {
        rows = Object.keys(style.rows).length;
    }

    var height = 0;
    var htCloneTop = window.wptm_element.tableContainer.find('.ht_clone_top');

    if (getRowsHeight) {
        for (var i = 0; i < rows; i++) {
            window.Wptm.rowsHeight[i] = window.Wptm.container.handsontable('getRowHeight', i);
            height += window.Wptm.rowsHeight[i];
        }
    } else {
        //remove setTimeout when resize rows
        // clearTimeout(window.setHeightTable);

        height = window.Wptm.table_height;
        var newHeight = window.Wptm.container.handsontable('getRowHeight', rowRender);
        if (typeof window.Wptm.rowsHeight[rowRender] === 'undefined') {
            window.Wptm.rowsHeight[rowRender] = 0;
        }
        height += newHeight - window.Wptm.rowsHeight[rowRender];
        window.Wptm.rowsHeight[rowRender] = newHeight;
    }

    if (top) {
        height += htCloneTop.outerHeight();
    }
    return height;
}

/**
 * Set position for html cell editer popup
 *
 * @param checkScroll Check whether to perform
 * @returns {boolean}
 */
function afterScrollEditors (checkScroll) {
    var handsontableInputHolder = wptm_element.tableContainer.find('.handsontableInputHolder');
    if (checkScroll === true && (handsontableInputHolder.hasClass('wptm_set_top') || handsontableInputHolder.hasClass('wptm_set_left'))) {
        var position = handsontableInputHolder.position();

        var $table = wptm_element.tableContainer.find('.wtHider');

        if (handsontableInputHolder.hasClass('wptm_set_top')) {
            var tdOffsetTop = handsontableInputHolder.data('tdOffsetTop');
            var outerHeight = handsontableInputHolder.outerHeight();
            var heightTable = wptm_element.tableContainer.outerHeight() > $table.outerHeight() ? wptm_element.tableContainer.outerHeight() : $table.outerHeight();
            var new_top = tdOffsetTop + outerHeight - heightTable + 10;

            if (new_top > 0) {
                handsontableInputHolder.css({top: position.top - new_top});
            }
        }
        if (handsontableInputHolder.hasClass('wptm_set_left')) {
            var tdOffsetLeft = handsontableInputHolder.data('tdOffsetLeft');
            var outerWidth = handsontableInputHolder.outerWidth();
            var widthTable = wptm_element.tableContainer.outerWidth() > $table.outerWidth() ? wptm_element.tableContainer.outerWidth() : $table.outerWidth();
            var new_left = tdOffsetLeft + outerWidth - widthTable + 10;

            if (new_left > 0) {
                handsontableInputHolder.css({left: position.left - new_left});
            }
        }
    }
    return false;
}



/***/ }),

/***/ "./app/admin/assets/js/_toolbarOptions.js":
/*!************************************************!*\
  !*** ./app/admin/assets/js/_toolbarOptions.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wptm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_wptm */ "./app/admin/assets/js/_wptm.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_functions */ "./app/admin/assets/js/_functions.js");
/* harmony import */ var _changeTheme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_changeTheme */ "./app/admin/assets/js/_changeTheme.js");
/* harmony import */ var _alternating__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_alternating */ "./app/admin/assets/js/_alternating.js");
/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_chart */ "./app/admin/assets/js/_chart.js");






//Control functions when select table items
const selectOption = function () {
    var wptm_element = window.wptm_element;
    var popupOption = {};
    var render = false;
    var autoRender;
    var check_saving;
    var new_col_types = [];
    var changed_cols = [];

    if (!(window.Wptm.can.edit || (window.Wptm.can.editown && data.author === window.Wptm.author))) {
        return false;
    }

    if (Wptm.max_Col * Wptm.max_row < 1) {
        return false;
    }

    custom_select_box.call(window.jquery('#setting-cells .wptm_select_box_before'), window.jquery);

    // jquery(Wptm.container).data('handsontable').getPlugin('hiddenColumns').query(textSearch.val());

    wptm_element.primary_toolbars.find('.table_option:not(.menu_loading)').unbind('change click').on('change click', function (e) {
        var function_data = window.table_function_data;
        var Wptm = window.Wptm;
        var $ = window.jquery;

        if ($(this).parent('li.no_active').length > 0) {
            return false;
        }

        var popup = $.extend({}, {});
        var html = '';
        //for undo
        // var oldStyle = JSON.parse(JSON.stringify(Wptm.style));
        //for mergecells
        // var ht = Wptm.container.handsontable('getInstance');

        var selection = {};
        selection = table_function_data.selection;

        /*click cell*/
        switch ($(this).attr('name')) {
            case 'rename_menu':
                // Wptm.container.handsontable('updateSettings', {
                //     hiddenColumns: {
                //         columns: [2, 3],
                //         indicators: true
                //     }
                // });
                // var ht = jquery(Wptm.container).handsontable('getInstance');
                // var hiddenColumnsPlugin = ht.getPlugin('hiddenColumns');
                // hiddenColumnsPlugin.hideColumn(1, 4);
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].setText.call(
                    $(this),
                    wptm_element.primary_toolbars.find('.wptm_name_edit'),
                    '#primary_toolbars .wptm_name_edit',
                    {'url': wptm_ajaxurl + "task=table.setTitle&id=" + Wptm.id + '&title=', 'selected': true}
                );
                break;
            case 'save_menu':
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                break;
            case 'export_menu':
                // if (Wptm.type == 'mysql') {
                //     return false;
                // }
                html = '';
                html += '<div>';
                html += '<div  class="popup_top border_top">';
                html += '<span>' + wptmText.import_export_style + ' :</span>';
                html += '</div>';
                html += '<span class="popup_select style_export wptm_select_box_before" data-value="1">' + wptmText.import_export_data_styles + '</span>';
                html += '<ul class="wptm_select_box">';
                html += '<li data-value="1">' + wptmText.import_export_data_styles + '</li>';
                html += '<li data-value="0">' + wptmText.import_export_data_only + '</li>';
                html += '</ul>';
                html += '<div><input type="button" class="wptm_button wptm_done" value="Export excel" id="export_excel"></div>';
                html += '</div>';
                popup = {
                    'html': $(html),
                    'selector': {'export_excel': '.style_export'},
                    'showAction': function () {
                        custom_select_box.call(this.find('.style_export'), $);
                    },
                    'option': {'export_excel': 1},
                };
                wptm_popup(wptm_element.wptm_popup, popup, false);

                //Export-excel
                $('#export_excel').bind('click', function (e) {
                    var format = default_value.export_excel_format;
                    var url = wptm_ajaxurl + 'task=excel.export&id=' + idTable + '&format_excel=' + format;

                    url = url + '&onlydata=' + popup.option['export_excel'];

                    $.fileDownload(url, {
                        failCallback: function (html, url) {
                            bootbox.alert(html, wptmText.Ok);
                        }
                    });
                });
                break;
            case 'source_menu':
                var curr_page = window.location.href;
                var cells = curr_page.split("?");
                var new_url;
                if (canInsert) {
                    new_url = cells[0] + '?page=wptm&type=dbtable&id_table=' + idTable + '&noheader=1&caninsert=1';
                } else {
                    new_url = cells[0] + '?page=wptm&type=dbtable&id_table=' + idTable;
                }
                window.location = new_url;
                break;
            case 'access_menu':
                popup = {
                    'html': wptm_element.content_popup_hide.find('#access_menu'),
                    'inputEnter': true,
                    'showAction': function () {
                        this.find('.wptm_done').addClass('wptm_blu');
                        this.find('.wptm_cancel').addClass('wptm_grey');

                        if (typeof Wptm.author !== 'undefined' && parseInt(Wptm.author) > 0) {
                            this.find('#jform_role_table').val(parseInt(Wptm.author)).change();
                        }

                        return true;
                    },
                    'submitAction': function () {
                        var author = this.find('#jform_role_table').val();
                        if (parseInt(author) > 0 && parseInt(author) !== parseInt(Wptm.author)) {//change own category
                            var jsonVar = {
                                data: JSON.stringify({0: author}),
                                id: Wptm.id,
                                type: 1
                            };
                            $.ajax({
                                url: wptm_ajaxurl + "task=user.save",
                                dataType: "json",
                                type: "POST",
                                data: jsonVar,
                                beforeSend: function () {
                                    wptm_element.settingTable.find('.wptm_saving').removeClass('wptm_hiden');
                                },
                                success: function (datas) {
                                    if (datas.response === true) {
                                        Wptm.author = author;
                                    } else {
                                        bootbox.alert(datas.response, wptmText.Ok);
                                    }
                                    wptm_element.settingTable.find('.wptm_saving').addClass('wptm_hiden');
                                },
                                error: function (jqxhr, textStatus, error) {
                                    bootbox.alert(textStatus + " : " + error, wptmText.Ok);
                                }
                            });
                        }
                        this.siblings('.colose_popup').trigger('click');
                        return true;
                    }
                };
                wptm_popup(wptm_element.wptm_popup, popup, true, false, true);
                break;
            case 'select_theme_menu':
                if (Wptm.type == 'mysql') {
                    return false;
                }
                popup = {
                    'html': wptm_element.content_popup_hide.find('#table_styles')
                };

                wptm_popup(wptm_element.wptm_popup, popup, true);

                wptm_element.wptm_popup.find('#table_styles a').click(function () {
                    e.preventDefault();
                    var cellsData = Wptm.container.handsontable('getData');
                    var ret = true;
                    var nbCols = 0;
                    var id = $(this).data('id');

                    //check table data exist
                    $.each(cellsData, function (index, value) {
                        nbCols = value.length;
                        $.each(value, function (i, v) {
                            if (v && v.toString().trim() !== '') {
                                ret = false;
                                return false;
                            }
                        });
                    });

                    Object(_changeTheme__WEBPACK_IMPORTED_MODULE_2__["default"])(ret, id, cellsData);
                })
                break;
            case 'alternate_menu':
                popup = {
                    'html': wptm_element.content_popup_hide.find('#alternating_color'),
                    'showAction': function () {
                        var selection, reSelection, valueRange;
                        valueRange = ''
                        if (Wptm.type === 'mysql') {
                            Wptm.container.handsontable("selectAll");
                            selection = $.extend([], function_data.selection[0]);
                        } else {
                            if (typeof function_data.selection === 'undefined' || function_data.selection === undefined || function_data.selection === false) { //if unselected cells
                                var i;
                                if (_.size(function_data.oldAlternate) < 1 || typeof Wptm.style.table.alternateColorValue === 'undefined') {
                                    selection = [0, 0, _.size(Wptm.style.cols) - 1, _.size(Wptm.style.rows) - 1];
                                    valueRange = 'a1:';
                                    //remove undefined cols in array
                                    var cols = [];
                                    for (i = 0; i < _.size(Wptm.style.cols); i++) {
                                        if (typeof Wptm.style.cols[i] !== 'undefined' && Wptm.style.cols[i] !== undefined && Wptm.style.cols[i] !== null) {
                                            cols[i] = Wptm.style.cols[i];
                                        }
                                    }
                                    Wptm.style.cols = cols;

                                    valueRange += String.fromCharCode(97 + _.size(Wptm.style.cols) - 1);
                                    valueRange += _.size(Wptm.style.rows);
                                }
                            } else {
                                selection = $.extend([], function_data.selection[0]);
                                // check if selecting more than 3 rows then process
                                var selection_rows = selection[2] - selection[0];
                                if (selection_rows >= 2) {
                                    if (_.size(function_data.oldAlternate) >= 1 || typeof Wptm.style.table.alternateColorValue !== 'undefined') {
                                        for (var i = 0; i < _.size(function_data.oldAlternate); i++) {
                                            var oldAlternateData = function_data.oldAlternate[i];
                                            if (oldAlternateData !== false && typeof oldAlternateData.selection !== 'undefined') {
                                                var isSameSelection = _functions__WEBPACK_IMPORTED_MODULE_1__["default"].isSameArray(selection, oldAlternateData.selection);
                                                if (isSameSelection) {
                                                    var colorData = oldAlternateData.default.split('|');
                                                    var dftAlternateHeader = colorData[0];
                                                    var dftAlternateTile1 = colorData[1];
                                                    var dftAlternateTile2 = colorData[2];
                                                    var dftAlternateFooter = colorData[3];
                                                    var currTile = this.find('.pane-color-tile[data-tile-header="' + dftAlternateHeader + '"][data-tile-1="' + dftAlternateTile1 + '"][data-tile-2="' + dftAlternateTile2 + '"][data-tile-footer="' + dftAlternateFooter + '"]');
                                                    currTile.addClass('active');
                                                    if (oldAlternateData.header !== '') {
                                                        this.find('.banding-header-checkbox').trigger('click');
                                                    }
                                                    if (oldAlternateData.footer !== '') {
                                                        this.find('.banding-footer-checkbox').trigger('click');
                                                    }
                                                }
                                            }

                                        }
                                    }
                                }
                            }
                        }

                        if (function_data.selectionSize > 0) {
                            selection = $.extend([], function_data.selection[0]);
                            for (i = 0; i < function_data.selectionSize; i++) {
                                if (function_data.selection[i][0] < selection[0]) {
                                    selection[0] = function_data.selection[i][0];
                                }
                                if (function_data.selection[i][1] < selection[1]) {
                                    selection[1] = function_data.selection[i][1];
                                }
                                if (function_data.selection[i][2] > selection[2]) {
                                    selection[2] = function_data.selection[i][2];
                                }
                                if (function_data.selection[i][3] > selection[3]) {
                                    selection[3] = function_data.selection[i][3];
                                }
                            }
                            valueRange += String.fromCharCode(97 + selection[1]) + (selection[0] + 1)
                                + ':' + String.fromCharCode(97 + selection[3]) + (selection[2] + 1);
                        }

                        if (valueRange !== '') {
                            this.find('.cellRangeLabelAlternate').val(valueRange);
                            this.find('#get_select_cells').trigger('click');
                        }

                        this.find('.formatting_style .pane-color-tile').on('click', (e) => {
                            var that = $(e.currentTarget);
                            //check exist selector and
                            selection = $.extend([], function_data.selection[0]);

                            if (typeof selection[1] !== 'undefined' && Math.abs(selection[0] - selection[2]) > 1) {
                                if (Wptm.type === 'mysql') { //alternate for all cell
                                    function_data.allAlternate = {};
                                    function_data.allAlternate.even = that.data('tile-1');
                                    function_data.allAlternate.old = that.data('tile-2');
                                    function_data.allAlternate.header = that.data('tile-header');
                                    function_data.allAlternate.footer = that.data('tile-footer');
                                    function_data.allAlternate.default = '' + function_data.allAlternate.header + '|' + function_data.allAlternate.even + '|' + function_data.allAlternate.old + '|' + function_data.allAlternate.footer;

                                    if (this.find('.banding-header-checkbox:checked').length < 1) {
                                        function_data.allAlternate.header = '';
                                    }

                                    if (this.find('.banding-footer-checkbox:checked').length < 1) {
                                        function_data.allAlternate.footer = '';
                                    }
                                    _alternating__WEBPACK_IMPORTED_MODULE_3__["default"].renderCell();
                                } else {
                                    var count = _alternating__WEBPACK_IMPORTED_MODULE_3__["default"].setNumberAlternate(selection, function_data.oldAlternate);

                                    /*create/reset oldAlternate[count]*/
                                    function_data.oldAlternate[count] = {};
                                    function_data.oldAlternate[count].selection = selection;
                                    function_data.oldAlternate[count].even = that.data('tile-1');
                                    function_data.oldAlternate[count].old = that.data('tile-2');
                                    function_data.oldAlternate[count].header = that.data('tile-header');
                                    function_data.oldAlternate[count].footer = that.data('tile-footer');

                                    function_data.oldAlternate[count].default = '' + function_data.oldAlternate[count].header + '|' + function_data.oldAlternate[count].even + '|' + function_data.oldAlternate[count].old + '|' + function_data.oldAlternate[count].footer;

                                    if (this.find('.banding-header-checkbox:checked').length < 1) {
                                        function_data.oldAlternate[count].header = '';
                                    }

                                    if (this.find('.banding-footer-checkbox:checked').length < 1) {
                                        function_data.oldAlternate[count].footer = '';
                                    }
                                    _alternating__WEBPACK_IMPORTED_MODULE_3__["default"].selectAlternatingColor(function_data.oldAlternate, selection, count),
                                        _alternating__WEBPACK_IMPORTED_MODULE_3__["default"].renderCell();
                                }

                                this.find('.pane-color-tile.active').removeClass('active');
                                that.addClass('active');
                            }
                            return false;
                        });

                        this.find('.banding-header-footer-checkbox-wrapper input').on('click', (e) => {
                            selection = $.extend([], function_data.selection[0]);
                            if (typeof selection[1] !== 'undefined' && Math.abs(selection[0] - selection[2]) > 1) {
                                if (Wptm.type === 'mysql') { //alternate for all cell
                                    if (typeof function_data.allAlternate.default !== 'undefined') {
                                        var defaultStyle = function_data.allAlternate.default.split("|");

                                        if (this.find('.banding-header-checkbox:checked').length > 0) {
                                            function_data.allAlternate.header = defaultStyle[0];
                                        } else {
                                            function_data.allAlternate.header = '';
                                        }

                                        if (this.find('.banding-footer-checkbox:checked').length > 0) {
                                            function_data.allAlternate.footer = defaultStyle[3];
                                        } else {
                                            function_data.allAlternate.footer = '';
                                        }
                                        _alternating__WEBPACK_IMPORTED_MODULE_3__["default"].renderCell();
                                    }
                                } else {
                                    var oldCount = _.size(function_data.oldAlternate);
                                    var count = _alternating__WEBPACK_IMPORTED_MODULE_3__["default"].setNumberAlternate(selection, function_data.oldAlternate);
                                    if (oldCount !== count) {
                                        var defaultStyle = [];
                                        if (typeof function_data.oldAlternate[count].default !== 'undefined') {
                                            defaultStyle = function_data.oldAlternate[count].default.split("|");
                                        } else {
                                            if (this.find('.pane-color-tile.active').length > 0) {
                                                defaultStyle[0] = this.find('.pane-color-tile.active').find('.pane-color-tile-header').data('value');
                                                defaultStyle[3] = this.find('.pane-color-tile.active').find('.pane-color-tile-footer').data('value');
                                            } else {
                                                defaultStyle[0] = function_data.oldAlternate[count].header;
                                                defaultStyle[3] = function_data.oldAlternate[count].footer;
                                            }
                                        }
                                        if (this.find('.banding-header-checkbox:checked').length > 0) {
                                            function_data.oldAlternate[count].header = defaultStyle[0];
                                        } else {
                                            function_data.oldAlternate[count].header = '';
                                        }

                                        if (this.find('.banding-footer-checkbox:checked').length > 0) {
                                            function_data.oldAlternate[count].footer = defaultStyle[3];
                                        } else {
                                            function_data.oldAlternate[count].footer = '';
                                        }

                                        function_data.oldAlternate[count].default = '' + defaultStyle[0] + '|' + function_data.oldAlternate[count].even + '|' + function_data.oldAlternate[count].old + '|' + defaultStyle[3];

                                        _alternating__WEBPACK_IMPORTED_MODULE_3__["default"].selectAlternatingColor(function_data.oldAlternate, selection, count),
                                            _alternating__WEBPACK_IMPORTED_MODULE_3__["default"].renderCell();
                                    }
                                }
                            }
                            return true;
                        });

                        this.find('#alternate_color_done').click((e) => {
                            e.preventDefault();
                            _alternating__WEBPACK_IMPORTED_MODULE_3__["default"].applyAlternate.call(this);
                        });
                        return true;
                    },
                    'cancelAction': function () {
                        if (_.size(function_data.checkChangeAlternate) > 0) {
                            if (Wptm.type === 'mysql') { //alternate for all cell
                                function_data.allAlternate = {};
                            } else {
                                Wptm.style.cells = $.extend({}, _alternating__WEBPACK_IMPORTED_MODULE_3__["default"].reAlternateColor());
                                function_data.oldAlternate = $.extend({}, Wptm.style.table.alternateColorValue);
                            }

                            _alternating__WEBPACK_IMPORTED_MODULE_3__["default"].renderCell();
                        }
                        return true;
                    }
                };
                if (Wptm.type === 'mysql') {
                    wptm_popup(wptm_element.wptm_popup, popup, true, false);
                } else {
                    wptm_popup(wptm_element.wptm_popup, popup, true, true);
                }
                break;
            case 'resize_column':
                popup = {
                    'html': wptm_element.content_popup_hide.find('#column_size_menu'),
                    'inputEnter': true,
                    'showAction': function () {
                        var selection = function_data.selection;
                        var change_selected = false;
                        for (var i = 0; i < selection.length; i++) {
                            if (Wptm.newSelect === 'col') {
                                if (selection[i][0] !== 0 || selection[i][2] !== Wptm.max_row - 1) {
                                    function_data.selection.splice(i, 1);
                                    change_selected = true;
                                }
                            }
                        }

                        this.find('#jform_row_height-lbl').closest('.control-group').addClass('wptm_hiden');
                        this.find('.popup_top span').text(wptmContext.columns_width_start);
                        if (function_data.selectionSize > 1) {
                            this.find('#jform_col_width-lbl').text(wptmContext.columns_width_start);
                        }

                        if (function_data.selectionSize < 2) {
                            if (selection[0][1] !== selection[0][3]) {//columns
                                var text = [];
                                if (selection[0][1] > 25) {
                                    text[0] = String.fromCharCode(65) + String.fromCharCode(65 + selection[0][1] - 26);
                                } else {
                                    text[0] = String.fromCharCode(65 + selection[0][1]);
                                }
                                if (selection[0][3] > 25) {
                                    text[1] = String.fromCharCode(65) + String.fromCharCode(65 + selection[0][3] - 26);
                                } else {
                                    text[1] = String.fromCharCode(65 + selection[0][3]);
                                }
                                this.find('#jform_col_width-lbl')
                                    .text(wptmContext.columns_width_start + text[0] + '-' + text[1]);
                            }
                        }

                        this.find('.cellRangeLabelAlternate').addClass('select_column').data('text_change', '#jform_col_width-lbl');
                        if (change_selected) {
                            $(Wptm.container).handsontable("selectCells", function_data.selection);
                            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getSelectedVal(function_data.selection[selection.length - 1], this.find('.cellRangeLabelAlternate'));
                        }
                        return true;
                    },
                    'submitAction': function () {
                        var col_width_val = this.find('#cell_col_width').val();
                        selection = function_data.selection;
                        var i = -1;
                        var ii = 0;
                        if (typeof selection !== 'undefined' && selection !== undefined && function_data.selectionSize > 0) {
                            for (ii = 0; ii < function_data.selectionSize; ii++) {
                                for (i = selection[ii][1]; i <= selection[ii][3]; i++) {
                                    if (typeof Wptm.style.cols[i] === 'undefined' ||  Wptm.style.cols[i] === null) {
                                        Wptm.style.cols[i] = [i, {width: parseInt(col_width_val)}];
                                    }
                                    Wptm.style.cols[i][1].width = parseInt(col_width_val);
                                }
                            }
                            i++;
                        }
                        if (i !== -1) { //have changing
                            table_function_data.needSaveAfterRender = true;
                            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].pullDims(Wptm, $);
                        }

                        this.siblings('.colose_popup').trigger('click');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                        return true;
                    },
                    'cancelAction': function () {
                        wptm_element.wptm_popup.find('.content').contents().remove();
                        return true;
                    }
                };
                if (Wptm.type === 'mysql') {
                    wptm_popup(wptm_element.wptm_popup, popup, true, false);
                } else {
                    wptm_popup(wptm_element.wptm_popup, popup, true, true);
                }
                break;
            case 'resize_row':
                popup = {
                    'html': wptm_element.content_popup_hide.find('#column_size_menu'),
                    'inputEnter': true,
                    'showAction': function () {
                        var selection = function_data.selection;
                        var change_selected = false;
                        for (var i = 0; i < selection.length; i++) {
                            if (Wptm.newSelect === 'row') {
                                if (selection[i][1] !== 0 || selection[i][3] !== Wptm.max_Col - 1) {
                                    function_data.selection.splice(i, 1);
                                    change_selected = true;
                                }
                            }
                        }

                        this.find('#jform_col_width-lbl').closest('.control-group').addClass('wptm_hiden');
                        this.find('.popup_top span').text(wptmContext.rows_height_start);
                        if (Wptm.type === 'mysql') {
                            this.find('#all_cell_row_height').closest('.control-group').removeClass('wptm_hiden');
                            this.find('#jform_row_height-lbl').text(wptmContext.row_height + ' (header):');
                            this.find('#all_cell_row_height').val(Wptm.style.table.allRowHeight);
                        } else {
                            if (function_data.selectionSize > 1) {
                                this.find('#jform_row_height-lbl').text(wptmContext.rows_height);
                            } else {
                                if (selection[0][0] !== selection[0][2]) {//rows
                                    this.find('#jform_row_height-lbl')
                                        .text(wptmContext.rows_height_start + (selection[0][0] + 1) + '-' + (selection[0][2] + 1));
                                }
                            }
                        }

                        this.find('.cellRangeLabelAlternate').addClass('select_row').data('text_change', '#jform_row_height-lbl')
                        if (change_selected) {
                            $(Wptm.container).handsontable("selectCells", function_data.selection);
                            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getSelectedVal(function_data.selection[selection.length - 1], this.find('.cellRangeLabelAlternate'));
                        }
                        return true;
                    },
                    'submitAction': function () {
                        var row_height_val = this.find('#cell_row_height').val();
                        var all_row_height_val = this.find('#all_cell_row_height').val();
                        selection = function_data.selection;
                        var i = -1;
                        var ii = 0;
                        if (typeof selection !== 'undefined' && selection !== undefined && function_data.selectionSize > 0) {
                            for (ii = 0; ii < function_data.selectionSize; ii++) {
                                for (i = selection[ii][0]; i <= selection[ii][2]; i++) {
                                    if (Wptm.type !== 'mysql') {
                                        if (typeof Wptm.style.rows[i] === 'undefined') {
                                            Wptm.style.rows[i] = [i, {height: parseInt(row_height_val)}];
                                        }
                                        Wptm.style.rows[i][1].height = parseInt(row_height_val);
                                    }
                                }
                            }
                            if (Wptm.type == 'mysql') {
                                Wptm.style.rows[0][1].height = row_height_val;
                                var all_heigt = parseFloat(all_row_height_val);
                                for (i = 1; i < Wptm.max_row; i++) {
                                    if (typeof Wptm.style.rows[i] === 'undefined') {
                                        Wptm.style.rows[i] = [i, {height: all_heigt}];
                                    }
                                    Wptm.style.rows[i][1].height = all_heigt;
                                }
                                Wptm.style.table = _functions__WEBPACK_IMPORTED_MODULE_1__["default"].fillArray(Wptm.style.table, {allRowHeight: all_heigt});
                            }
                            i++;
                        }
                        if (i !== -1) { //have changing
                            table_function_data.needSaveAfterRender = true;
                            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].pullDims(Wptm, $);
                        }

                        this.siblings('.colose_popup').trigger('click');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                        return true;
                    },
                    'cancelAction': function () {
                        wptm_element.wptm_popup.find('.content').contents().remove();
                        return true;
                    }
                };
                if (Wptm.type === 'mysql') {
                    wptm_popup(wptm_element.wptm_popup, popup, true, false);
                } else {
                    wptm_popup(wptm_element.wptm_popup, popup, true, true);
                }
                break;
            case 'header_option_menu':
                popup = {
                    'html': wptm_element.content_popup_hide.find('#header_option'),
                    'showAction': function() {
                        var length = -1;
                        for (var i = 4; i > 0; i--) {
                            if (typeof Wptm.datas[i] !== 'undefined') {
                                for (var ii = 0; ii < Wptm.datas[i].length; ii++) {
                                    if (Wptm.datas[i][ii] !== '') {
                                        length = i;
                                        break;
                                    }
                                }
                            }
                            if (length > -1) {
                                break;
                            }
                        }
                        this.find('#number_first_rows').next().find('li[data-value=' + (length + 1) + ']').nextAll().hide();
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObjectSelectBox(Wptm, 'headerOption', this.find('#number_first_rows').next('.wptm_select_box'), length + 1 > 0 ? 1 : 0);
                        if (Wptm.type == 'mysql') {
                            this.find('#number_first_rows').addClass('no_active');
                        } else {
                            custom_select_box.call(this.find('#number_first_rows'), $);
                        }
                        //freeze_row
                        var freeze_row = parseInt(Wptm.style.table.freeze_row) > 0 ? 1 : 0;
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateSwitchButtonFromStyleObject({'freeze_row': freeze_row}, 'freeze_row', this.find('#freeze_row'), '0');
                    },
                    'submitAction': function () {
                        if (Wptm.type !== 'mysql') {
                            if (this.find('#number_first_rows').data('value') !== '') {
                                if (this.find('#number_first_rows').data('value') != Wptm.headerOption) {
                                    saveData.push({
                                        action: 'set_header_option',
                                        value: this.find('#number_first_rows').data('value')
                                    });
                                }
                                Wptm.headerOption = parseInt(this.find('#number_first_rows').data('value'));
                            }
                        }

                        Wptm.style.table.freeze_row = this.find("#freeze_row").is(":checked") ? 1 : 0;
                        if (Wptm.style.table.freeze_row > 0) {
                            $(Wptm.container).handsontable('updateSettings', {fixedRowsTop: Wptm.headerOption});
                        } else {
                            $(Wptm.container).handsontable('updateSettings', {fixedRowsTop: 0});
                        }

                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                        this.siblings('.colose_popup').trigger('click');

                        return true;
                    },
                    'cancelAction': function () {
                        return true;
                    }
                };
                wptm_popup(wptm_element.wptm_popup, popup, true, false, true);
                break;
            case 'sort_menu':
                popup = {
                    'html': wptm_element.content_popup_hide.find('#sortable_table'),
                    'showAction': function () {
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateSwitchButtonFromStyleObject(Wptm.style.table, 'use_sortable', this.find('#use_sortable'), '0');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObjectSelectBox(Wptm.style.table, 'default_order_sortable', this.find('#default_order_sortable').next('.wptm_select_box'), '');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObjectSelectBox(Wptm.style.table, 'default_sortable', this.find('#default_sortable').next('.wptm_select_box'), '');
                        custom_select_box.call(this.find('#default_order_sortable'), $);
                        custom_select_box.call(this.find('#default_sortable'), $);

                        return true;
                    },
                    'submitAction': function () {
                        Wptm.style.table.use_sortable = this.find("#use_sortable").is(":checked") ? 1 : 0;
                        if (Wptm.style.table.use_sortable == 1) {
                            wptm_element.primary_toolbars.find('.sort_menu').parent().addClass('selected');
                        } else {
                            wptm_element.primary_toolbars.find('.sort_menu').parent().removeClass('selected');
                        }

                        if (this.find('#default_order_sortable').data('value') !== '') {
                            Wptm.style.table.default_order_sortable = this.find('#default_order_sortable').data('value');
                        }
                        Wptm.style.table.default_sortable = this.find('#default_sortable').data('value');
                        this.siblings('.colose_popup').trigger('click');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                        return true;
                    }
                };
                wptm_popup(wptm_element.wptm_popup, popup, true, false, true);
                break;
            case 'download_button_menu':
                if ($(this).parent().hasClass('selected')) {
                    Wptm.style.table.download_button = 0;
                    $(this).parent().removeClass('selected');
                } else {
                    Wptm.style.table.download_button = 1;
                    $(this).parent().addClass('selected');
                }
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                break;
            case 'filters_menu':
                if ($(this).parent().hasClass('selected')) {
                    Wptm.style.table.enable_filters = 0;
                    $(this).parent().removeClass('selected');
                } else {
                    Wptm.style.table.enable_filters = 1;
                    $(this).parent().addClass('selected');
                }
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                break;
            case 'column_type_menu':
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].default_sortable(window.Wptm.datas);
                popup = {
                    'html': wptm_element.content_popup_hide.find('#column_type_table'),
                    'showAction': function () {
                        var col_types = Wptm.style.table.col_types;

                        this.find('tbody tr').each(function () {
                            var i = $(this).data('col');
                            col_types[i] = typeof col_types[i] !== 'undefined' ? col_types[i].toLowerCase() === 'varchar(255)' ? 'varchar' : col_types[i].toLowerCase() : 'varchar';
                            if (Wptm.type === 'mysql') {
                                $(this).find('.wptm_select_box_before').addClass('no_active').text(col_types[i]);
                            } else {
                                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObjectSelectBox(col_types, i, $(this).find('.wptm_select_box'), 'varchar');
                                custom_select_box.call($(this).find('.column_type'), $);
                            }
                        });
                    },
                    'submitAction': function () {
                        var cols_selected = [];
                        if (Wptm.type !== 'mysql') {
                            this.find('tbody tr').each(function () {
                                var i = $(this).data('col');
                                var that = $(this).find('.wptm_select_box_before');
                                if (that.data('value') !== '') {
                                    if (that.data('value') != Wptm.style.table.col_types[i]) {
                                        cols_selected[i] = that.data('value');
                                    }
                                    Wptm.style.table.col_types[i] = that.data('value');
                                }
                            });

                            if (cols_selected.length > 0) {
                                saveData.push({
                                    action: 'set_columns_types',
                                    value: cols_selected
                                });
                            }
                            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].cleanHandsontable();
                            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                        }
                        this.siblings('.colose_popup').trigger('click');

                        return true;
                    },
                    'cancelAction': function () {
                        return true;
                    }
                };
                wptm_popup(wptm_element.wptm_popup, popup, true, false, true);
                break;
            case 'responsive_menu':
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].default_sortable(window.Wptm.datas);
                popup = {
                    'html': wptm_element.content_popup_hide.find('#responsive_table'),
                    'selector': {
                        'responsive_type': '#responsive_type',
                        'table_breakpoint': '.table_breakpoint',
                        'table_height': '.table_height',
                        'freeze_col': '#freeze_col',
                        'responsive_col': '#responsive_col',
                        'style_repeated': '#style_repeated',
                        'responsive_priority': '#responsive_priority'
                    },
                    'option': {
                        'responsive_type': Wptm.style.table.responsive_type,
                        'freeze_col': Wptm.style.table.freeze_col,
                        'table_height': Wptm.style.table.table_height,
                        'style_repeated': Wptm.style.table.style_repeated,
                        'table_breakpoint': Wptm.style.table.table_breakpoint,
                    },
                    'showAction': function () {
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObjectSelectBox(popup.option, 'responsive_type', this.find('#responsive_type').next('.wptm_select_box'), 'scroll');
                        custom_select_box.call(this.find('#responsive_type'), $);

                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObjectSelectBox(popup.option, 'freeze_col', this.find('#freeze_col').next('.wptm_select_box'), '0');
                        custom_select_box.call(this.find('#freeze_col'), $);

                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObjectSelectBox(popup.option, 'style_repeated', this.find('#style_repeated').next('.wptm_select_box'), '0');
                        custom_select_box.call(this.find('#style_repeated'), $);

                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(popup.option, 'table_height', this.find('.table_height'), '0');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(popup.option, 'table_breakpoint', this.find('.table_breakpoint'), '980');

                        this.find('table tr .responsive_priority').each(function () {
                            custom_select_box.call($(this), $);
                        });

                        popup.inputAction.call(this, 'responsive_type');
                        check_saving = false;
                    },
                    'submitAction': function () {
                        Wptm.style.table.responsive_type = this.find('#responsive_type').data('value');
                        Wptm.style.table.freeze_col = this.find("#freeze_col").data('value');
                        Wptm.style.table.style_repeated = this.find("#style_repeated").data('value');
                        Wptm.style.table.table_height = popup.option.table_height;
                        Wptm.style.table.table_breakpoint = popup.option.table_breakpoint;
                        this.siblings('.colose_popup').trigger('click');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                        return true;
                    },
                    'inputAction': function (selector) {
                        if (selector === 'responsive_type') {
                            if (popup.option.responsive_type === 'scroll') {
                                this.find('.hiding').hide();
                                this.find('.repeatedHeader').hide();
                                this.find('.scrolling').show();
                            }

                            if (popup.option.responsive_type === 'repeatedHeader') {
                                this.find('.hiding').hide();
                                this.find('.scrolling').hide();
                                this.find('.repeatedHeader').show();
                                $(Wptm.container).handsontable('updateSettings', {
                                    manualColumnFreeze: false,
                                    fixedColumnsLeft: 0
                                });
                            }

                            if (popup.option.responsive_type === 'hideCols') {
                                this.find('.hiding').show();
                                this.find('.scrolling').hide();
                                this.find('.repeatedHeader').hide();

                                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].responsive_col.call(this.find('#responsive_col'), Wptm);
                            }
                        }

                        //scrolling
                        if (selector === 'freeze_col') {
                            if (parseInt(popup.option.freeze_col) === 0) {
                                $(Wptm.container).handsontable('updateSettings', {
                                    manualColumnFreeze: false,
                                    fixedColumnsLeft: 0
                                });
                            } else {
                                $(Wptm.container).handsontable('updateSettings', {
                                    manualColumnFreeze: true,
                                    fixedColumnsLeft: popup.option.freeze_col
                                });
                            }
                        }

                        for (var i = 0; i < _.size(Wptm.style.cols); i++) {
                            if(typeof Wptm.style.cols[i] !== 'undefined' && Wptm.style.cols[i] !== null) {
                                var col_priority = typeof Wptm.style.cols[i][1].res_priority !== 'undefined' ? Wptm.style.cols[i][1].res_priority: 0;
                                if (typeof col_priority !== 'undefined') {
                                    var curr_col = wptm_element.wptm_popup.find('table tbody tr').eq(i);
                                    curr_col.find('.responsive_priority').text(col_priority).data('value', col_priority);
                                }
                            }
                        }
                        $('.responsive_priority').unbind('change').on('change', (e) => {
                            var col = $(e.target).closest('tr').data('col');

                            if (typeof Wptm.style.cols[col] !== 'undefined' && Wptm.style.cols[col] !== null && $(e.target).val() !== Wptm.style.cols[col].res_priority) {
                                check_saving = true;
                            }
                            Wptm.style.cols = _functions__WEBPACK_IMPORTED_MODULE_1__["default"].fillArray(Wptm.style.cols, {res_priority: $(e.target).data('value')}, col);
                        });
                    },
                    'cancelAction': function () {
                        for (var key in popup.option) {
                            if (popup.option[key] !== Wptm.style.table[key]) {
                                check_saving = false;
                                break;
                            }
                        }
                        if (check_saving) {
                            Wptm.style.table = $.extend({}, Wptm.style.table, popup.option), _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges();
                        }
                        return true;
                    }
                };
                wptm_popup(wptm_element.wptm_popup, popup, true, false, true);
                break;
            case 'pagination_menu':
                popup = {
                    'html': wptm_element.content_popup_hide.find('#pagination_table'),
                    'showAction': function () {
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateSwitchButtonFromStyleObject(Wptm.style.table, 'enable_pagination', this.find('#enable_pagination'), '0');

                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObjectSelectBox(Wptm.style.table, 'limit_rows', this.find('#limit_rows').next('.wptm_select_box'), 0);
                        custom_select_box.call(this.find('#limit_rows'), $);

                        return true;
                    },
                    'submitAction': function () {
                        Wptm.style.table.limit_rows = this.find('#limit_rows').data('value');
                        Wptm.style.table.enable_pagination = this.find("#enable_pagination").is(":checked") ? 1 : 0;
                        if (Wptm.style.table.enable_pagination == 1) {
                            wptm_element.primary_toolbars.find('.pagination_menu').parent().addClass('selected');
                        } else {
                            wptm_element.primary_toolbars.find('.pagination_menu').parent().removeClass('selected');
                        }
                        this.siblings('.colose_popup').trigger('click');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                        return true;
                    }
                };
                wptm_popup(wptm_element.wptm_popup, popup, true, false, true);
                break;
            case 'date_menu':
                popup = {
                    'html': wptm_element.content_popup_hide.find('#date_menu'),
                    'inputEnter': true,
                    'render': true,
                    'showAction': function () {
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(Wptm.style.table, 'date_formats', this.find('#date_format'), '');

                        this.find('.select_date_format li').unbind('click').on('click', (e) => {
                            $(e.currentTarget).siblings('.active').removeClass('active');
                            var date_format = $(e.currentTarget).addClass('active').data('value');
                            if (typeof date_format !== 'undefined' && date_format !== '') {
                                this.find('#date_format').val(date_format);
                            }
                        });
                        return true;
                    },
                    'submitAction': function () {
                        if (this.find('#date_format').val() !== '') {
                            Wptm.style.table.date_formats = this.find('#date_format').val();
                            function_data.date_formats_momentjs = _functions__WEBPACK_IMPORTED_MODULE_1__["default"].momentjsFormat(Wptm.style.table.date_formats);
                        }

                        function_data = _functions__WEBPACK_IMPORTED_MODULE_1__["default"].createRegExpFormat(function_data, false, Wptm.style.table.date_formats);
                        table_function_data.needSaveAfterRender = true;
                        this.siblings('.colose_popup').trigger('click');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                        return true;
                    }
                };
                wptm_popup(wptm_element.wptm_popup, popup, true, false, true);
                break;
            case 'date_menu_cell':
                popup = {
                    'html': wptm_element.content_popup_hide.find('#date_menu_cell'),
                    'inputEnter': true,
                    'render': true,
                    'showAction': function () {
                        this.find('#popup_done').val('Apply');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(Wptm.style.table, 'date_formats', this.find('#date_format'), '');

                        this.find('.select_date_format li').unbind('click').on('click', (e) => {
                            $(e.currentTarget).siblings('.active').removeClass('active');
                            var date_format = $(e.currentTarget).addClass('active').data('value');
                            if (typeof date_format !== 'undefined' && date_format !== '') {
                                this.find('.date_formats').val(date_format);
                            }
                        });
                        return true;
                    },
                    'submitAction': function () {
                        if (typeof this.find('.date_formats').val() !== 'undefined') {
                            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {
                                date_formats: this.find('.date_formats').val(),
                                date_formats_momentjs: _functions__WEBPACK_IMPORTED_MODULE_1__["default"].momentjsFormat(this.find('.date_formats').val())});
                        }

                        this.siblings('.colose_popup').trigger('click');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                        return true;
                    }
                };
                wptm_popup(wptm_element.wptm_popup, popup, true, false, true);
                break;
            case 'lock_ranger_cells':
                if (wptm_administrator !== 1) {
                    break;
                }
                popup = {
                    'html': wptm_element.content_popup_hide.find('#lock_ranger_cells'),
                    'inputEnter': true,
                    'render': true,
                    'current_rangers': null,
                    'current_rangers_user': null,
                    'showAction': function () {
                        var current_rangers_user_defalt = this.find('.wptm_select_box').find('li:first').data('value');
                        custom_select_box.call(this.find('#jform_role_can_edit_lock'), $, null, true);
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObjectSelectBox('', 0, this.find('#jform_role_can_edit_lock').next('.wptm_select_box'),  current_rangers_user_defalt, null, true);

                        // wptm_element.wptm_popup.find('.content .control-group:first').after(window.wptm_element.content_popup_hide.find('#select_cells').clone());
                        var function_data = window.table_function_data;
                        if (typeof function_data.selection !== 'undefined' && function_data.selection[0] !== undefined && _.size(function_data.selection[0]) > 0) {
                            var selection = function_data.selection[0];
                            if (selection[0] == 0 && selection[2] == Wptm.max_row - 1) {
                                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getSelectedVal([false, selection[1], false, selection[3]], this.find('.cellRangeLabelAlternate'));
                            } else {
                                if (selection[1] == 0 && selection[3] == Wptm.max_Col - 1) {
                                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getSelectedVal([selection[0], false, selection[2], false], this.find('.cellRangeLabelAlternate'));
                                } else {
                                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getSelectedVal(selection, this.find('.cellRangeLabelAlternate'));
                                }
                            }
                        }

                        this.find('#get_select_cells').val(wptmText.Save_range);

                        var current_ranger = null;
                        if (typeof Wptm.style.table.lock_ranger_cells !== 'undefined') {
                            $.each(Wptm.style.table.lock_ranger_cells, (i, v) => {
                                if (v !== '') {
                                    var $lock_ranger_cell = this.find('.select_lock_ranger_cells').find('.wptm_hiden').clone();
                                    $lock_ranger_cell.removeClass('wptm_hiden');
                                    $lock_ranger_cell.attr('data-value', v).find('.label_text').text(v);
                                    this.find('.select_lock_ranger_cells').append($lock_ranger_cell);
                                }
                            });
                        } else {
                            Wptm.style.table.lock_ranger_cells = [];
                        }
                        if (typeof Wptm.style.table.lock_ranger_cells_user == 'undefined') {
                            Wptm.style.table.lock_ranger_cells_user = [];
                        }
                        popup.current_rangers = jquery.extend([], Wptm.style.table.lock_ranger_cells);
                        popup.current_rangers_user = jquery.extend([], Wptm.style.table.lock_ranger_cells_user);

                        this.find('.cellRangeLabelAlternate').unbind('keyup').on('click', function (e) {
                            e.preventDefault();
                            return false;
                        });
                        var select_ranger = () => {
                            //select
                            this.find('.select_lock_ranger_cells').find('.nfd-format-pill:not(.wptm_hiden)').unbind('click').on('click', (e) => {
                                if (!$(e.target).hasClass('delete_range')) {
                                    $(e.currentTarget).siblings('.nfd-format-pill.active').removeClass('active');
                                    current_ranger = popup.current_rangers.indexOf($(e.currentTarget).find('.label_text').text());
                                    this.find('.cellRangeLabelAlternate').val(popup.current_rangers[current_ranger]);
                                    _alternating__WEBPACK_IMPORTED_MODULE_3__["default"].affterRangeLabe.call(this, window.Wptm, window.jquery);
                                    $(e.currentTarget).addClass('active');
                                    // jform_role_can_edit_lock
                                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObjectSelectBox(popup.current_rangers_user, current_ranger, this.find('#jform_role_can_edit_lock').next('.wptm_select_box'), current_rangers_user_defalt, null, true);

                                    // this.find('#popup_done').addClass('not_active');
                                }
                            });

                            //delete
                            this.find('.select_lock_ranger_cells').find('.nfd-format-pill:not(.wptm_hiden) .delete_range').unbind('click').on('click', (e) => {
                                e.preventDefault();
                                current_ranger = popup.current_rangers.indexOf(this.find('.cellRangeLabelAlternate').val());
                                var $li = $(e.currentTarget).parents('.nfd-format-pill');

                                if ($li.hasClass('active')) {
                                    $li.removeClass('active');
                                    this.find('.cellRangeLabelAlternate').val('');
                                }
                                popup.current_rangers.splice(current_ranger, 1);
                                popup.current_rangers_user.splice(current_ranger, 1);
                                $li.remove();
                                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObjectSelectBox('', current_ranger, this.find('#jform_role_can_edit_lock').next('.wptm_select_box'),  current_rangers_user_defalt, null, true);

                                // this.find('#popup_done').removeClass('not_active');
                            });
                        }

                        //apply
                        this.find('#get_select_cells').unbind('click').on('click', () => {
                            _alternating__WEBPACK_IMPORTED_MODULE_3__["default"].affterRangeLabe.call(this, window.Wptm, window.jquery);
                            var ranger = this.find('.cellRangeLabelAlternate').val();

                            if (ranger !== '') {
                                var value = ranger.replace(/[ ]+/g, "").toUpperCase();
                                var arrayRange = value.split(":");
                                if (arrayRange.length < 2) {
                                    ranger += ':' + ranger;
                                } else if (arrayRange.length > 2) {
                                    return false;
                                }
                                var data_role_can_edit_lock = this.find('#jform_role_can_edit_lock').data('value');
                                if (current_ranger == null) {//new
                                    this.find('.nfd-format-pill.active').removeClass('active');
                                    var $lock_ranger_cell1 = this.find('.select_lock_ranger_cells').find('.wptm_hiden').clone();
                                    $lock_ranger_cell1.removeClass('wptm_hiden').addClass('active');
                                    $lock_ranger_cell1.attr('data-value', ranger).find('.label_text').text(ranger);
                                    this.find('.select_lock_ranger_cells').append($lock_ranger_cell1);
                                    popup.current_rangers.push(ranger);
                                    popup.current_rangers_user.push(data_role_can_edit_lock === '' ? 'ADMINISTRATOR' : data_role_can_edit_lock);
                                } else {
                                    this.find('.select_lock_ranger_cells').find('.nfd-format-pill.active').attr('data-value', ranger).find('.label_text').text(ranger);
                                    popup.current_rangers[current_ranger] = ranger;
                                    popup.current_rangers_user[current_ranger] = data_role_can_edit_lock === '' ? 'ADMINISTRATOR' : data_role_can_edit_lock;
                                }
                            }
                            // this.find('#popup_done').removeClass('not_active');

                            this.find('.cellRangeLabelAlternate').val('');
                            this.find('.nfd-format-pill.active').removeClass('active');
                            current_ranger = null;
                            select_ranger();
                        });

                        select_ranger();

                        return true;
                    },
                    'submitAction': function () {
                        this.find('#get_select_cells').trigger('click');
                        setTimeout( () => {
                            Wptm.style.table.lock_ranger_cells = jquery.extend([], popup.current_rangers);
                            Wptm.style.table.lock_ranger_cells_user = jquery.extend([], popup.current_rangers_user);
                            this.siblings('.colose_popup').trigger('click');
                            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                        }, 200);
                        return true;
                    },
                    'cancelAction': function () {
                        Wptm.style.table.lock_ranger_cells = jquery.extend([], popup.current_rangers);
                        Wptm.style.table.lock_ranger_cells_user = jquery.extend([], popup.current_rangers_user);
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                        return true;
                    }
                };
                wptm_popup(wptm_element.wptm_popup, popup, true, false, false);
                break;
            case 'curency_menu':
                popup = {
                    'html': wptm_element.content_popup_hide.find('#curency_menu'),
                    'render': true,
                    'inputEnter': true,
                    'selector': {
                        'symbol_position': '#symbol_position'
                    },
                    'option': {
                        'symbol_position': Wptm.style.table.symbol_position
                    },
                    'showAction': function () {
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(Wptm.style.table, 'currency_symbol', this.find('#currency_symbol'), '');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObjectSelectBox(Wptm.style.table, 'symbol_position', this.find('#symbol_position').next('.wptm_select_box'), '');
                        custom_select_box.call(this.find('#symbol_position'), $);

                        this.find('.select_curency_menu li').unbind('click').on('click', (e) => {
                            $(e.currentTarget).siblings('.active').removeClass('active');
                            var currency_symbol = $(e.currentTarget).addClass('active').data('currency_sym');
                            if (typeof currency_symbol !== 'undefined' && currency_symbol !== '') {
                                this.find('#currency_symbol').val(currency_symbol);
                            }

                            var symbol_position = $(e.currentTarget).data('symbol_position');
                            if (typeof symbol_position !== 'undefined' && symbol_position !== '') {
                                this.find('#symbol_position').data('value', symbol_position).text(symbol_position == 1 ? 'After': 'Before').change();
                            }
                        });
                        return true;
                    },
                    'submitAction': function () {
                        if (this.find('#currency_symbol').val() !== '') {
                            Wptm.style.table.currency_symbol = this.find('#currency_symbol').val();
                        }
                        function_data = _functions__WEBPACK_IMPORTED_MODULE_1__["default"].createRegExpFormat(function_data, Wptm.style.table.currency_symbol, false);

                        Wptm.style.table = $.extend({}, Wptm.style.table, popup.option);
                        table_function_data.needSaveAfterRender = true;
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].setFormat_accounting();

                        this.siblings('.colose_popup').trigger('click');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);

                        return true;
                    }
                };
                wptm_popup(wptm_element.wptm_popup, popup, true, false, true);
                break;
            case 'curency_menu_cell':
                popup = {
                    'html': wptm_element.content_popup_hide.find('#curency_menu_cell'),
                    'render': true,
                    'inputEnter': true,
                    'showAction': function () {
                        this.find('#popup_done').val('Apply');
                        custom_select_box.call(this.find('.symbol_position'), $);

                        this.find('.select_curency_menu li').unbind('click').on('click', (e) => {
                            $(e.currentTarget).siblings('.active').removeClass('active');
                            var currency_symbol = $(e.currentTarget).addClass('active').data('currency_sym');
                            if (typeof currency_symbol !== 'undefined' && currency_symbol !== '' && currency_symbol !== false) {
                                this.find('.currency_symbol').val(currency_symbol);
                            }

                            var symbol_position = $(e.currentTarget).data('symbol_position');
                            if (typeof symbol_position !== 'undefined' && symbol_position !== '' && symbol_position !== false) {
                                this.find('.symbol_position').data('value', symbol_position).text(symbol_position == 1 ? 'After': 'Before').change();
                            }
                        });
                        return true;
                    },
                    'submitAction': function () {
                        if (typeof this.find('.currency_symbol').val() !== 'undefined') {
                            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {currency_symbol: this.find('.currency_symbol').val(), currency_symbol_second: null});
                        }

                        if (typeof this.find('.symbol_position').data('value') !== 'undefined' && this.find('.symbol_position').data('value') !== '') {
                            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {symbol_position: this.find('.symbol_position').data('value'), symbol_position_second: null});
                        }

                        this.siblings('.colose_popup').trigger('click');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);

                        return true;
                    }
                };
                wptm_popup(wptm_element.wptm_popup, popup, true, false, true);
                break;
            case 'decimal_menu':
                popup = {
                    'html': wptm_element.content_popup_hide.find('#decimal_menu'),
                    'render': true,
                    'inputEnter': true,
                    'showAction': function () {
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(Wptm.style.table, 'thousand_symbol', this.find('#thousand_symbol'), '');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(Wptm.style.table, 'decimal_symbol', this.find('#decimal_symbol'), '');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(Wptm.style.table, 'decimal_count', this.find('#decimal_count'), '');
                        this.find('.select_decimal_menu li').unbind('click').on('click', (e) => {
                            $(e.currentTarget).siblings('.active').removeClass('active');
                            var thousand_symbol = $(e.currentTarget).addClass('active').data('thousand_symbol');
                            if (typeof thousand_symbol !== 'undefined') {
                                this.find('#thousand_symbol').val(thousand_symbol).change();
                            }

                            var decimal_symbol = $(e.currentTarget).data('decimal_symbol');
                            if (typeof decimal_symbol !== 'undefined') {
                                this.find('#decimal_symbol').val(decimal_symbol).change();
                            }

                            var decimal_count = $(e.currentTarget).data('decimal_count');
                            if (typeof decimal_count !== 'undefined' && decimal_count !== '') {
                                this.find('#decimal_count').val(decimal_count).change();
                            } else {
                                this.find('#decimal_count').val(0).change();
                            }
                        });
                        return true;
                    },
                    'submitAction': function () {
                        if (typeof this.find('#decimal_symbol').val() !== 'undefined') {
                            Wptm.style.table.decimal_symbol = this.find('#decimal_symbol').val();
                        }
                        if (typeof this.find('#decimal_count').val() !== 'undefined') {
                            Wptm.style.table.decimal_count = this.find('#decimal_count').val() == '' ? 0: this.find('#decimal_count').val();
                        }
                        if (typeof this.find('#thousand_symbol').val() !== 'undefined') {
                            Wptm.style.table.thousand_symbol = this.find('#thousand_symbol').val();
                        }
                        table_function_data.needSaveAfterRender = true;
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].setFormat_accounting();

                        this.siblings('.colose_popup').trigger('click');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);

                        return true;
                    }
                };
                wptm_popup(wptm_element.wptm_popup, popup, true, false, true);
                break;
            case 'decimal_menu_cell':
                if (Wptm.type === 'mysql') {
                    return true;
                }
                popup = {
                    'html': wptm_element.content_popup_hide.find('#decimal_menu_cell'),
                    'render': true,
                    'inputEnter': true,
                    'showAction': function () {
                        this.find('#popup_done').val('Apply');
                        this.find('.select_decimal_menu li').unbind('click').on('click', (e) => {
                            $(e.currentTarget).siblings('.active').removeClass('active');
                            var thousand_symbol = $(e.currentTarget).addClass('active').data('thousand_symbol');
                            if (typeof thousand_symbol !== 'undefined' && thousand_symbol !== false) {
                                this.find('.thousand_symbol').val(thousand_symbol).change();
                            }

                            var decimal_symbol = $(e.currentTarget).data('decimal_symbol');
                            if (typeof decimal_symbol !== 'undefined' && decimal_symbol !== false) {
                                this.find('.decimal_symbol').val(decimal_symbol).change();
                            }

                            var decimal_count = $(e.currentTarget).data('decimal_count');
                            if (typeof decimal_count !== 'undefined' && decimal_count !== '' && decimal_count !== false) {
                                this.find('.decimal_count').val(decimal_count).change();
                            } else {
                                this.find('.decimal_count').val(0).change();
                            }
                        });
                        return true;
                    },
                    'submitAction': function () {
                        if (typeof this.find('.decimal_symbol').val() !== 'undefined') {
                            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {decimal_symbol: this.find('.decimal_symbol').val(), decimal_symbol_second: null});
                        }
                        if (typeof this.find('.decimal_count').val() !== 'undefined') {
                            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {decimal_count: this.find('.decimal_count').val() == '' ? 0: this.find('.decimal_count').val(), decimal_count_second: null});
                        }
                        if (typeof this.find('.thousand_symbol').val() !== 'undefined') {
                            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {thousand_symbol: this.find('.thousand_symbol').val(), thousand_symbol_second: null});
                        }

                        this.siblings('.colose_popup').trigger('click');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);

                        return true;
                    }
                };
                wptm_popup(wptm_element.wptm_popup, popup, true, false, true);
                break;
            case 'google_sheets_menu':
                if (Wptm.type == 'mysql') {
                    return false;
                }
                popup = {
                    'html': wptm_element.content_popup_hide.find('#google_sheets_menu'),
                    'show_google_url': function (text_url, $done) {
                        if (text_url !== '') {
                            $done.show();

                            if (this.find('#auto_push').is(":checked")) {
                                this.find('#google_url').parent().show();
                            } else {
                                this.find('#google_url').parent().hide();
                            }
                        } else {
                            $done.hide();
                        }

                        if (typeof Wptm.syn_hash !== 'undefined' && Wptm.syn_hash !== '') {
                            this.find('#google_url').val(Wptm.syn_hash);
                        } else {
                            this.find('#google_url').val('' + Wptm.id + _functions__WEBPACK_IMPORTED_MODULE_1__["default"].hashFnv32a());
                        }

                        var text = 'function send' + Wptm.id + 'sheetspush() {\n var response = UrlFetchApp.fetch("'
                            + wptm_ajaxurl_site + 'task=sitecontrol.scriptGoogle&id_table=' + Wptm.id + '&wptmhash=' + this.find('#google_url').val() + '");\n}';
                        this.find('.wptm_copy_text_content').text(text);

                        this.find('#google_url').siblings('.copy_text').unbind('click').on('click', (e) => {
                            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].copy_text($(e.target), this.find('.wptm_copy_text_content').val());
                            this.find('.wptm_copied').show().animate({opacity: '1'}, "slow").delay(1000).animate({'opacity': '0'}, 10);
                        });
                    },
                    'showAction': function () {
                        this.find('#fetch_browse').hide();
                        this.find('#jform_excel_url-lbl').hide();
                        this.find('#import_style').parent().hide();
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateSwitchButtonFromStyleObject(Wptm.style.table, 'auto_sync', this.find('#auto_sync'), '0');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateSwitchButtonFromStyleObject(Wptm.style.table, 'spreadsheet_style', this.find('#spreadsheet_style'), '0');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateSwitchButtonFromStyleObject(Wptm.style.table, 'auto_push', this.find('#auto_push'), '0');

                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(Wptm.style.table, 'spreadsheet_url', this.find('#spreadsheet_url'), '');
                        check_saving = 0;

                        popup.show_google_url.call(this, Wptm.style.table.spreadsheet_url, this.find('#google_url').closest('.control-group'));
                        this.find('#spreadsheet_url').on('keyup', (e) => {
                            popup.show_google_url.call(this, $(e.currentTarget).val(), this.find('#google_url').closest('.control-group'));
                        });

                        this.find('#auto_push').on('change', (e) => {
                            popup.show_google_url.call(this, this.find('#spreadsheet_url').val(), this.find('#google_url').parent());
                        });

                        this.find('#fetch_google').unbind('click').on('click', (e) => {
                            Wptm.style.table.spreadsheet_url = this.find("#spreadsheet_url").val();
                            if (Wptm.style.table.spreadsheet_url === '' || Wptm.style.table.spreadsheet_url === undefined) {
                                return false;
                            }

                            Wptm.style.table.spreadsheet_style = this.find("#spreadsheet_style").is(":checked") ? 1 : 0;
                            Wptm.style.table.auto_sync = this.find("#auto_sync").is(":checked") ? 1 : 0;
                            if (Wptm.style.table.auto_sync === 1) {
                                Wptm.style.table.excel_auto_sync = 0;
                            }

                            Wptm.style.table.auto_push = this.find("#auto_push").is(":checked") ? 1 : 0;

                            var data = {'type': 'spreadsheet'};
                            table_function_data.fetch_data = data;

                            if (this.find('#google_url').val() !== '') {
                                Wptm.syn_hash = this.find('#google_url').val();
                            } else {
                                Wptm.syn_hash = '' + Wptm.id + _functions__WEBPACK_IMPORTED_MODULE_1__["default"].hashFnv32a();
                            }

                            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                            return true;
                        });
                        return true;
                    },
                    'submitAction': function () {
                        Wptm.style.table.spreadsheet_url = this.find("#spreadsheet_url").val();

                        Wptm.style.table.spreadsheet_style = this.find("#spreadsheet_style").is(":checked") ? 1 : 0;

                        Wptm.style.table.auto_sync = this.find("#auto_sync").is(":checked") ? 1 : 0;
                        if (Wptm.style.table.auto_sync === 1) {
                            Wptm.style.table.excel_auto_sync = 0;
                        }

                        Wptm.style.table.auto_push = this.find("#auto_push").is(":checked") ? 1 : 0;

                        check_saving = 1;

                        if (this.find('#google_url').val() !== '') {
                            Wptm.syn_hash = this.find('#google_url').val();
                        }

                        this.siblings('.colose_popup').trigger('click');
                        return true;
                    },
                    'cancelAction': function () {
                        if (check_saving === 1) {
                            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                        }
                        return true;
                    },
                };
                wptm_popup(wptm_element.wptm_popup, popup, true, false, true);
                break;
            case 'onedrive_menu':
                if (Wptm.type == 'mysql') {
                    return false;
                }
                popup = {
                    'html': wptm_element.content_popup_hide.find('#onedrive_menu'),
                    'showAction': function () {
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateSwitchButtonFromStyleObject(Wptm.style.table, 'onedrive_style', this.find('#onedrive_style'), '0');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateSwitchButtonFromStyleObject(Wptm.style.table, 'auto_sync_onedrive', this.find('#auto_sync_onedrive'), '0');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(Wptm.style.table, 'onedrive_url', this.find('#onedrive_url'), '');
                        check_saving = 0;

                        this.find('#fetch_google').unbind('click').on('click', (e) => {
                            Wptm.style.table.onedrive_url = this.find("#onedrive_url").val();
                            var dataSync = _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getLinkSync(Wptm.style.table.onedrive_url, 'onedrive', true);
                            Wptm.style.table.onedrive_url = dataSync.url;

                            if (!dataSync) {
                                return false;
                            }

                            Wptm.style.table.onedrive_style = this.find("#onedrive_style").is(":checked") ? 1 : 0;
                            Wptm.style.table.auto_sync_onedrive = this.find("#auto_sync_onedrive").is(":checked") ? 1 : 0;

                            var data = {'type': 'onedrive'};
                            table_function_data.fetch_data = data;

                            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                            return true;
                        });
                        return true;
                    },
                    'submitAction': function () {
                        Wptm.style.table.onedrive_url = this.find("#onedrive_url").val();
                        Wptm.style.table.onedrive_style = this.find("#onedrive_style").is(":checked") ? 1 : 0;
                        Wptm.style.table.auto_sync_onedrive = this.find("#auto_sync_onedrive").is(":checked") ? 1 : 0;

                        check_saving = 1;

                        this.siblings('.colose_popup').trigger('click');
                        return true;
                    },
                    'cancelAction': function () {
                        if (check_saving === 1) {
                            var dataSync = _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getLinkSync(Wptm.style.table.onedrive_url, 'onedrive', false);
                            Wptm.style.table.onedrive_url = dataSync.url;

                            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                        }
                        return true;
                    },
                };
                wptm_popup(wptm_element.wptm_popup, popup, true, false, true);
                break;
            case 'synchronization_menu':
                if (Wptm.type == 'mysql') {
                    return false;
                }
                popup = {
                    'html': wptm_element.content_popup_hide.find('#google_sheets_menu'),
                    'inputEnter': true,
                    'showAction': function () {
                        this.find('#google_url').parent().hide();
                        this.find('#jform_spreadsheet_url-lbl').hide();
                        this.find("#auto_push").closest('.push-notification-group').hide();
                        if (typeof default_value.enable_import_excel !== 'undefined'
                            && default_value.enable_import_excel == '1') {
                            this.find('#google_sheets_menu .control-group').eq(0).before(wptm_element.content_popup_hide.find('#import_excel'));
                            this.find('#google_sheets_menu').addClass('excel_syn');
                        }
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateSwitchButtonFromStyleObject(Wptm.style.table, 'excel_auto_sync', this.find('#auto_sync'), '0');
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateSwitchButtonFromStyleObject(Wptm.style.table, 'excel_spreadsheet_style', this.find('#spreadsheet_style'), '0');

                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(Wptm.style.table, 'excel_url', this.find('#spreadsheet_url'), '');
                        check_saving = 0;

                        this.find('#fetch_google').unbind('click').on('click', (e) => {
                            Wptm.style.table.excel_url = this.find("#spreadsheet_url").val();
                            if (Wptm.style.table.excel_url === '' || Wptm.style.table.excel_url === undefined) {
                                return false;
                            }

                            Wptm.style.table.excel_spreadsheet_style = this.find("#spreadsheet_style").is(":checked") ? 1 : 0;
                            Wptm.style.table.excel_auto_sync = this.find("#auto_sync").is(":checked") ? 1 : 0;
                            if (Wptm.style.table.excel_auto_sync === 1) {
                                Wptm.style.table.auto_sync = 0;
                            }

                            var data = {'type': 'excel'};
                            table_function_data.fetch_data = data;

                            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                            return true;
                        });

                        custom_select_box.call(this.find('#import_style'), $);
                        return true;
                    },
                    'submitAction': function () {
                        Wptm.style.table.excel_auto_sync = this.find("#auto_sync").is(":checked") ? 1 : 0;
                        if (Wptm.style.table.excel_auto_sync === 1) {
                            Wptm.style.table.auto_sync = 0;
                        }
                        Wptm.style.table.excel_spreadsheet_style = this.find("#spreadsheet_style").is(":checked") ? 1 : 0;

                        Wptm.style.table.excel_url = this.find("#spreadsheet_url").val();

                        check_saving = 1;
                        this.siblings('.colose_popup').trigger('click');
                        return true;
                    },
                    'cancelAction': function () {
                        this.find('#import_excel').appendTo(wptm_element.content_popup_hide);
                        if (check_saving === 1) {
                            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                        }
                        return true;
                    }
                };
                wptm_popup(wptm_element.wptm_popup, popup, true, false, true);
                break;
            case 'new_chart_menu':
                _chart__WEBPACK_IMPORTED_MODULE_4__["default"].functions.addChart();
                break;
            case 'view_chart_menu':
                if (Wptm.dataChart.length > 0) {
                    wptm_element.settingTable.find('.ajax_loading').addClass('loadding').removeClass('wptm_hiden');
                    $(this).closest('li').addClass('menu_loading');
                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].showChartOrTable(true, jquery('#list_chart').find('.chart-menu').eq(0));
                } else {
                    bootbox.alert(wptmText.CHART_NOT_EXIST, wptmText.GOT_IT);
                }
                break;
            case 'editToolTip':
                var content = $('#tooltip_content').val();

                if (content !== '') {
                    wptm_element.tableContainer.find('tbody td.current').addClass('isTooltipContent');
                } else {
                    wptm_element.tableContainer.find('tbody td.current').removeClass('isTooltipContent');
                }

                if (typeof content !== 'undefined') {
                    var i, j;
                    var selection = table_function_data.selection[0];
                    var width = $('#tooltip_width').val();
                    for (i = selection[0]; i <= selection[2]; i++) {
                        for (j = selection[1]; j <= selection[3]; j++) {
                            if (width !== '') {
                                Wptm.style.cells = _functions__WEBPACK_IMPORTED_MODULE_1__["default"].fillArray(Wptm.style.cells, {
                                    tooltip_content: content,
                                    tooltip_width: width
                                }, i, j);
                            } else {
                                Wptm.style.cells = _functions__WEBPACK_IMPORTED_MODULE_1__["default"].fillArray(Wptm.style.cells, {tooltip_content: content}, i, j);
                            }
                            if (i == selection[2] && j == selection[3]) {
                                saveData.push({action: 'style', selection: table_function_data.selection, style: {
                                        tooltip_content: content,
                                        tooltip_width: width
                                    }});
                                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges();
                            }
                        }
                    }
                }
                break;
        }
        return false;
    });

    //select option in sub-menu(first top menu)
    wptm_element.primary_toolbars.find('.has_sub_menu ul li').on('change click', function () {
        if (!(window.Wptm.can.edit || (window.Wptm.can.editown && data.author === window.Wptm.author))) {
            return false;
        }

        var function_data = window.table_function_data;
        var Wptm = window.Wptm;
        var $ = window.jquery;
        var option_name = $(this).parents('.sub-menu').siblings('.table_option');
        switch (option_name.attr('name')) {
            case 'align_menu':
                Wptm.style.table.table_align = $(this).attr('name').toString();
                $(this).siblings('.selected').removeClass('selected');
                $(this).addClass('selected');
                break;
        }
        return true;
    });

    wptm_element.primary_toolbars.find('a.cell_option').unbind('click').on('click', function (e) {
        e.preventDefault();

        render = second_menu.call(this, render);
        clearTimeout(autoRender);

        autoRender = setTimeout(function () {
            if (render === true) {
                table_function_data.needSaveAfterRender = true;
                window.jquery(window.Wptm.container).data('handsontable').render();
            }
            render = false;
        }, 200);
    });

    wptm_element.primary_toolbars.find('.cell_option').unbind('change').on('change', function (e) {
        e.preventDefault();

        render = second_menu.call(this, render);
        clearTimeout(autoRender);

        autoRender = setTimeout(function () {
            if (render === true) {
                table_function_data.needSaveAfterRender = true;
                window.jquery(window.Wptm.container).data('handsontable').render();
            }
            render = false;
        }, 200);
    });

    //select calculator function
    wptm_element.primary_toolbars.find('.calculater_function').unbind('click').on('click', function (e) {
        e.preventDefault();
        if (Wptm.type !== 'html') {
            return;
        }
        var $ = window.jquery;

        var selection = $.extend({}, table_function_data.selection);
        var calculater = $(this).data('calculater');

        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].change_value_cells(selection, '=' + calculater + '()');
        var CellValue = document.getElementById('CellValue');

        wptm_element.cellValue.focus().val('=' + calculater + '()');

        if (CellValue) {
            if (typeof CellValue.setSelectionRange === 'function') {
                var x = calculater.length + 2;
                CellValue.setSelectionRange(x, x);
            }
            wptm_element.cellValue.click();
        }
    });

    //change value cells by #CellValue
    wptm_element.cellValue.on('keyup', function (e) {
        if (wptm_element.cellValue.val() !== table_function_data.cellValueChange) {
            table_function_data.checkCellValueChange = table_function_data.selection;
        } else {
            table_function_data.checkCellValueChange = false;
        }
        if (e.keyCode === 13 && Wptm.type == 'html') {
            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].change_value_cells(table_function_data.selection, wptm_element.cellValue.val());
            var $ = window.jquery;
            var selection = table_function_data.selection;
            table_function_data.checkCellValueChange = false;
            if (typeof selection[1] === 'undefined'
                && typeof selection[0][2] !== 'undefined'
                && selection[0][0] === selection[0][2]
                && selection[0][1] === selection[0][3]) {
                if (typeof Wptm.datas[selection[0][0] + 1] === 'undefined') {
                    $(Wptm.container).handsontable("selectCell", 0, selection[0][1] + 1, 0, selection[0][3] + 1);
                } else {
                    $(Wptm.container).handsontable("selectCell", selection[0][0] + 1, selection[0][1], selection[0][2] + 1, selection[0][3]);
                }
            }
        }
        return true;
    });
};

//event change value option in cell_menu
function second_menu(render) {
    if (!(window.Wptm.can.edit || (window.Wptm.can.editown && data.author === window.Wptm.author))) {
        return false;
    }

    if (table_function_data.selectOption) {
        return false;
    }

    var re_active = typeof arguments[1] !== 'undefined' && arguments[1] === 're_active' ? true : false;

    var Wptm = window.Wptm;
    var $ = window.jquery;
    var value;
    var parentLi = $(this).parents('.cells_option');
    var i;
    table_function_data.option_selected_mysql = '';

    var selection = $.extend({}, table_function_data.selection);

    if (Wptm.type === 'mysql') {
        for (i = 0; i < table_function_data.selectionSize; i++) {
            if (selection[i][0] + selection[i][2] !== 0) {//not cell in header
                selection[i][0] = selection[i][0] > 0 ? 1 : selection[i][0];
                selection[i][2] = _.size(Wptm.style.rows) - 1;
                table_function_data.option_selected_mysql = jquery(this).attr('name');
            }
        }
    }

    if (typeof selection[0][1] === 'undefined') {
        return;
    }

    switch ($(this).attr('name')) {
        case 'undo_cell':
            if ($(this).hasClass('active')) {
                $(Wptm.container).handsontable('getInstance').undoRedo.undo()
                render = true;
            } else {
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].status_notic(1, wptmText.some_action_cant_be_done + '!', $('#undoNotic'));
            }
            break;
        case 'redo_cell':
            if ($(this).hasClass('active')) {
                $(Wptm.container).handsontable('getInstance').undoRedo.redo()
                render = true;
            } else {
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].status_notic(1, wptmText.some_action_cant_be_done + '!', $('#undoNotic'));
            }
            break;
        case 'cell_font_family':
            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_font_family: $(this).data('value')});
            render = true;
            break;
        case 'cell_font_size':
            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_font_size: $(this).val()});
            render = true;
            break;
        case 'cell_format_bold':
            if (parentLi.find('.active').length < 1) {
                value = true;
                parentLi.find('.cell_option').addClass('active');
            } else {
                value = false;
                parentLi.find('.active').removeClass('active');
            }

            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_font_bold: value});
            render = true;
            break;
        case 'cell_font_underline':
            if (parentLi.find('.active').length < 1) {
                value = true;
                parentLi.find('.cell_option').addClass('active');
            } else {
                value = false;
                parentLi.find('.active').removeClass('active');
            }
            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_font_underline: value});
            render = true;
            break;
        case 'cell_font_italic':
            if (parentLi.find('.active').length < 1) {
                value = true;
                parentLi.find('.cell_option').addClass('active');
            } else {
                value = false;
                parentLi.find('.active').removeClass('active');
            }
            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_font_italic: value});
            render = true;
            break;
        case 'cell_background_color':
            value = $(this).val();
            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_background_color: value});
            $(this).parents('.wp-picker-container').find('.wp-color-result').css('color', value);
            render = true;
            break;
        case 'cell_font_color':
            value = $(this).val();
            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_font_color: value});
            $(this).parents('.wp-picker-container').find('.wp-color-result').css('color', value);
            render = true;
            break;
        case 'format_align_left':
            wptm_element.primary_toolbars.find('a[name="format_align_left"]').addClass('active');
            wptm_element.primary_toolbars.find('a[name="format_align_center"]').removeClass('active');
            wptm_element.primary_toolbars.find('a[name="format_align_right"]').removeClass('active');
            wptm_element.primary_toolbars.find('a[name="format_align_justify"]').removeClass('active');
            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_text_align: 'left'});
            render = true;
            break;
        case 'format_align_center':
            wptm_element.primary_toolbars.find('a[name="format_align_left"]').removeClass('active');
            wptm_element.primary_toolbars.find('a[name="format_align_center"]').addClass('active');
            wptm_element.primary_toolbars.find('a[name="format_align_right"]').removeClass('active');
            wptm_element.primary_toolbars.find('a[name="format_align_justify"]').removeClass('active');
            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_text_align: 'center'});
            render = true;
            break;
        case 'format_align_right':
            wptm_element.primary_toolbars.find('a[name="format_align_left"]').removeClass('active');
            wptm_element.primary_toolbars.find('a[name="format_align_center"]').removeClass('active');
            wptm_element.primary_toolbars.find('a[name="format_align_right"]').addClass('active');
            wptm_element.primary_toolbars.find('a[name="format_align_justify"]').removeClass('active');
            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_text_align: 'right'});
            render = true;
            break;
        case 'format_align_justify':
            wptm_element.primary_toolbars.find('a[name="format_align_left"]').removeClass('active');
            wptm_element.primary_toolbars.find('a[name="format_align_center"]').removeClass('active');
            wptm_element.primary_toolbars.find('a[name="format_align_right"]').removeClass('active');
            wptm_element.primary_toolbars.find('a[name="format_align_justify"]').addClass('active');
            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_text_align: 'justify'});
            render = true;
            break;
        case 'vertical_align_bottom':
            wptm_element.primary_toolbars.find('a[name="vertical_align_bottom"]').addClass('active');
            wptm_element.primary_toolbars.find('a[name="vertical_align_middle"]').removeClass('active');
            wptm_element.primary_toolbars.find('a[name="vertical_align_top"]').removeClass('active');
            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_vertical_align: 'bottom'});
            render = true;
            break;
        case 'vertical_align_middle':
            wptm_element.primary_toolbars.find('a[name="vertical_align_bottom"]').removeClass('active');
            wptm_element.primary_toolbars.find('a[name="vertical_align_middle"]').addClass('active');
            wptm_element.primary_toolbars.find('a[name="vertical_align_top"]').removeClass('active');
            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_vertical_align: 'middle'});
            render = true;
            break;
        case 'vertical_align_top':
            wptm_element.primary_toolbars.find('a[name="vertical_align_bottom"]').removeClass('active');
            wptm_element.primary_toolbars.find('a[name="vertical_align_middle"]').removeClass('active');
            wptm_element.primary_toolbars.find('a[name="vertical_align_top"]').addClass('active');
            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_vertical_align: 'top'});
            render = true;
            break;
        case 'padding_border':
            var popup;
            popup = {
                'html': wptm_element.content_popup_hide.find('#padding_border'),
                'showAction': function () {
                    var size_selection = table_function_data.selectionSize - 1;
                    var cellStyle = window.Wptm.style.cells[selection[size_selection][0] + '!' + selection[size_selection][1]][2];

                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cellStyle, 'cell_padding_left', this.find('#jform_cell_padding_left'), 0);
                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cellStyle, 'cell_padding_top', this.find('#jform_cell_padding_top'), 0);
                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cellStyle, 'cell_padding_right', this.find('#jform_cell_padding_right'), 0);
                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cellStyle, 'cell_padding_bottom', this.find('#jform_cell_padding_bottom'), 0);

                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cellStyle, 'cell_background_radius_left_top', this.find('#jform_cell_background_radius_left_top'), 0);
                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cellStyle, 'cell_background_radius_right_top', this.find('#jform_cell_background_radius_right_top'), 0);
                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cellStyle, 'cell_background_radius_right_bottom', this.find('#jform_cell_background_radius_right_bottom'), 0);
                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cellStyle, 'cell_background_radius_left_bottom', this.find('#jform_cell_background_radius_left_bottom'), 0);

                    this.find('.observeChanges').unbind('change').on('change', (e) => {
                        var name = $(e.currentTarget).attr('name');
                        var value = $(e.currentTarget).val();
                        switch (name) {
                            case 'jform[jform_cell_padding_left]':
                                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_padding_left: value});
                                break;
                            case 'jform[jform_cell_padding_top]':
                                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_padding_top: value});
                                break;
                            case 'jform[jform_cell_padding_right]':
                                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_padding_right: value});
                                break;
                            case 'jform[jform_cell_padding_bottom]':
                                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_padding_bottom: value});
                                break;
                            case 'jform[jform_cell_background_radius_left_top]':
                                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_background_radius_left_top: value});
                                break;
                            case 'jform[jform_cell_background_radius_right_top]':
                                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_background_radius_right_top: value});
                                break;
                            case 'jform[jform_cell_background_radius_right_bottom]':
                                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_background_radius_right_bottom: value});
                                break;
                            case 'jform[jform_cell_background_radius_left_bottom]':
                                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_background_radius_left_bottom: value});
                                break;
                        }
                    });
                    return true;
                },
                'submitAction': function () {
                    this.siblings('.colose_popup').trigger('click');
                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges();
                    return true;
                },
                'cancelAction': function () {
                    window.jquery(window.Wptm.container).data('handsontable').render();
                    return true;
                }
            };
            wptm_popup(wptm_element.wptm_popup, popup, true, false, true);
            break;
        case 'cell_type':
            if (Wptm.type !== 'mysql') {
                if (parentLi.find('.active').length < 1) {
                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_type: 'html'}, "set_cells_type");
                    parentLi.find('.cell_option').addClass('active');

                    // add cell type == text for column selected
                    var i, jj;
                    var cols_selected = [];

                    for (jj = 0; jj < table_function_data.selectionSize; jj++) {
                        for (i = table_function_data.selection[jj][1]; i <= table_function_data.selection[jj][3]; i++) {
                            cols_selected[i] = 'text';
                            Wptm.style.table.col_types[i] = 'text';
                        }
                    }
                    saveData.push({
                        action: 'set_columns_types',
                        value: cols_selected
                    });
                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].saveChanges(true);
                } else {
                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_type: null}, "set_cells_type");
                    parentLi.find('.active').removeClass('active');
                }
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].cleanHandsontable();
                render = true;
            }
            break;
        case 'border_color':
            value = $(this).val();
            $(this).parents('.wp-picker-container').find('.wp-color-result').css('color', value);
            border_cell(selection, Wptm, 'color', render);
            render = true;
            break;
        case 'border_all':
            if ($(this).hasClass('active') && !re_active) {
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_border_left: ''});
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_border_top: ''});
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_border_right: ''});
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_border_bottom: ''});
                $(this).removeClass('active');
            } else {
                border_cell(selection, Wptm, 'position', 'cell_border_left', 'cell_border_top', 'cell_border_right', 'cell_border_bottom');
                $(this).addClass('active');
            }
            render = true;
            break;
        case 'border_top':
            var border_selection = {};
            for (i = 0; i < table_function_data.selectionSize; i++) {
                border_selection[i] = [selection[i][0], selection[i][1], selection[i][0], selection[i][3]];
            }
            var parameter;
            if (table_function_data.option_selected_mysql !== '' && typeof table_function_data.option_selected_mysql !== 'undefined') {
                parameter = 'cell_border_top_start';
            } else {
                parameter = 'cell_border_top';
            }
            if ($(this).hasClass('active') && !re_active) {
                var x = {};
                x[parameter] = '';
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(border_selection, Wptm, x);
                $(this).removeClass('active');
            } else {
                border_cell(border_selection, Wptm, 'position', parameter);
                $(this).addClass('active');
            }
            render = true;
            break;
        case 'border_bottom':
            var border_selection = {};
            for (i = 0; i < table_function_data.selectionSize; i++) {
                border_selection[i] = [selection[i][2], selection[i][1], selection[i][2], selection[i][3]];
            }
            var parameter;
            if (table_function_data.option_selected_mysql !== '' && typeof table_function_data.option_selected_mysql !== 'undefined') {
                parameter = 'cell_border_bottom_end';
            } else {
                parameter = 'cell_border_bottom';
            }
            if ($(this).hasClass('active') && !re_active) {
                var x = {};
                x[parameter] = '';
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(border_selection, Wptm, x);
                $(this).removeClass('active');
            } else {
                border_cell(border_selection, Wptm, 'position', parameter);
                $(this).addClass('active');
            }
            render = true;
            break;
        case 'border_left':
            var border_selection = {};
            for (i = 0; i < table_function_data.selectionSize; i++) {
                border_selection[i] = [selection[i][0], selection[i][1], selection[i][2], selection[i][1]];
            }
            if ($(this).hasClass('active') && !re_active) {
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(border_selection, Wptm, {cell_border_left: ''});
                $(this).removeClass('active');
            } else {
                border_cell(border_selection, Wptm, 'position', 'cell_border_left');
                $(this).addClass('active');
            }
            render = true;
            break;
        case 'border_right':
            var border_selection = {};
            for (i = 0; i < table_function_data.selectionSize; i++) {
                border_selection[i] = [selection[i][0], selection[i][3], selection[i][2], selection[i][3]];
            }
            if ($(this).hasClass('active') && !re_active) {
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(border_selection, Wptm, {cell_border_right: ''});
                $(this).removeClass('active');
            } else {
                border_cell(border_selection, Wptm, 'position', 'cell_border_right');
                $(this).addClass('active');
            }
            render = true;
            break;
        case 'border_horizontal':
            var border_selection = {};

            for (i = 0; i < table_function_data.selectionSize; i++) {
                if (selection[i][0] === selection[i][2]) {
                    return false;
                } else {
                    border_selection[i] = [selection[i][0], selection[i][1], selection[i][2] - 1, selection[i][3]];
                }
            }

            if ($(this).hasClass('active') && !re_active) {
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(border_selection, Wptm, {cell_border_bottom: ''});
                $(this).removeClass('active');
            } else {
                border_cell(border_selection, Wptm, 'position', 'cell_border_bottom');
                $(this).addClass('active');
            }
            render = true;
            break;
        case 'border_clear':
            wptm_element.primary_toolbars.find('#cell_border > div > a.cell_option.active').each(function () {
                jquery(this).removeClass('active');
            });
            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_border_left: ''});
            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_border_top: ''});
            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_border_right: ''});
            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_border_bottom: ''});
            if (table_function_data.option_selected_mysql !== '' && typeof table_function_data.option_selected_mysql !== 'undefined') {
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_border_top_start: ''});
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {cell_border_bottom_end: ''});
            }

            // Get cells range above selection
            var topCellsSelections = {};
            Object.keys(selection).map(function(key, index) {
                var x = selection[key][0] - 1 > 0 ? selection[key][0] - 1 : 0;
                topCellsSelections[key] = [x, selection[key][1], x, selection[key][3]];
            });
            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(topCellsSelections, Wptm, {cell_border_bottom: ''});

            var leftCellsSelections = {};
            var fillLeftCells = true;
            Object.keys(selection).map(function(key, index) {
                var y = selection[key][1] - 1 > 0 ? selection[key][1] - 1 : 0;
                leftCellsSelections[key] = [selection[key][0], y, selection[key][2], y];
                if (parseInt(selection[key][1]) === 0) {
                    fillLeftCells = false;
                }
            });
            if (fillLeftCells) {
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(leftCellsSelections, Wptm, {cell_border_right: ''});
            }

            render = true;
            break;
        case 'border_vertical':
            var border_selection = {};
            for (i = 0; i < table_function_data.selectionSize; i++) {
                if (selection[i][1] === selection[i][3]) {
                    return false;
                } else {
                    border_selection[i] = [selection[i][0], selection[i][1], selection[i][2], selection[i][3] - 1];
                }
            }

            if ($(this).hasClass('active') && !re_active) {
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(border_selection, Wptm, {cell_border_right: ''});
                $(this).removeClass('active');
            } else {
                border_cell(border_selection, Wptm, 'position', 'cell_border_right');
                $(this).addClass('active');
            }
            render = true;
            break;
        case 'border_inner':
            var new_selection = [];
            new_selection['bottom'] = [];
            new_selection['right'] = [];
            for (i = 0; i < table_function_data.selectionSize; i++) {
                new_selection['bottom'][i] = $.extend([], selection[i]);
                new_selection['right'][i] = $.extend([], selection[i]);
                if (selection[i][1] === selection[i][3]) {
                    return false;
                } else {
                    new_selection['right'][i][3] = selection[i][3] - 1;
                }
                if (selection[i][0] === selection[i][2]) {
                    return false;
                } else {
                    new_selection['bottom'][i][2] = selection[i][2] - 1;
                }
            }
            if ($(this).hasClass('active') && !re_active) {
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(new_selection['right'], Wptm, {cell_border_right: ''});
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(new_selection['bottom'], Wptm, {cell_border_bottom: ''});
                $(this).removeClass('active');
            } else {
                border_cell(new_selection['bottom'], Wptm, 'position', 'cell_border_bottom');
                border_cell(new_selection['right'], Wptm, 'position', 'cell_border_right');
                $(this).addClass('active');
            }
            render = true;
            break;
        case 'border_outer':
            var val, ij, ik;
            if ($(this).hasClass('active') && !re_active) {
                $(this).removeClass('active');
                val = 'no_active';
            } else {
                $(this).addClass('active');
                val = 'active';
            }

            $.map(selection, function (v) {
                if (val === 'no_active') {
                    for (ij = v[0]; ij <= v[2]; ij++) {
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].fillArray(Wptm.style.cells, {cell_border_right: ''}, ij, v[1] - 1);//before cell
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].fillArray(Wptm.style.cells, {cell_border_right: ''}, ij, v[3]);
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].fillArray(Wptm.style.cells, {cell_border_left: ''}, ij, v[3] + 1);//after cell
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].fillArray(Wptm.style.cells, {cell_border_left: ''}, ij, v[1]);
                    }
                    for (ik = v[0]; ik <= v[2]; ik++) {
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].fillArray(Wptm.style.cells, {cell_border_top: ''}, v[2] + 1, ik);
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].fillArray(Wptm.style.cells, {cell_border_top: ''}, v[0], ik);
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].fillArray(Wptm.style.cells, {cell_border_bottom: ''}, v[0] - 1, ik);
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].fillArray(Wptm.style.cells, {cell_border_bottom: ''}, v[2], ik);
                    }
                } else {
                    border_cell([[v[0], v[3], v[2], v[3]]], Wptm, 'position', 'cell_border_right');
                    border_cell([[v[0], v[1], v[2], v[1]]], Wptm, 'position', 'cell_border_left');
                    border_cell([[v[2], v[1], v[2], v[3]]], Wptm, 'position', 'cell_border_bottom');
                    border_cell([[v[0], v[1], v[0], v[3]]], Wptm, 'position', 'cell_border_top');
                }
            });

            render = true;
            break;
        case 'border_width':
            border_cell(selection, Wptm, 'border_width', render);
            render = true;
            break;
        case 'border_solid':
            $(this).siblings('.border_style.active').removeClass('active');
            $(this).addClass('active');
            border_cell(selection, Wptm, 'border_style', render);

            render = true;
            break;
        case 'border_dashed':
            $(this).siblings('.border_style.active').removeClass('active');
            $(this).addClass('active');
            border_cell(selection, Wptm, 'border_style', render);

            render = true;
            break;
        case 'border_dotted':
            $(this).siblings('.border_style.active').removeClass('active');
            $(this).addClass('active');
            border_cell(selection, Wptm, 'border_style', render);

            render = true;
            break;
        case 'merge_cell':
            if (Wptm.type !== 'mysql') {
                if ((selection[0][3] - selection[0][1] + selection[0][2] - selection[0][0]) < 1) {
                    return false;
                }
                if (table_function_data.selectionSize > 1) {//if selection > 1 when not merge and select selection[0]
                    $(Wptm.container).handsontable("selectCell", selection[0][0], selection[0][1], selection[0][2], selection[0][3]);
                    return false;
                }
                if ($(this).hasClass('active')) {
                    $(Wptm.container).handsontable('getInstance').getPlugin('mergeCells').unmergeSelection();
                    $(this).removeClass('active');
                } else {
                    $(Wptm.container).handsontable('getInstance').getPlugin('mergeCells').mergeSelection();
                    $(this).addClass('active');
                }
            }
            break;
    }
    return render;
}

/**
 * Convert border value for cell
 *
 * @param selection Selected cells
 * @param Wptm
 */
function border_cell(selection, Wptm) {
    var border_color = wptm_element.primary_toolbars.find('#border_color').val();
    if (typeof border_color === 'undefined' || border_color === '') {
        border_color = 'rgba(0, 0, 0, 0)';
    }
    var cell_border_style = 'solid';
    switch (wptm_element.primary_toolbars.find('#cell_border_style a.border_style.active').attr('name')) {
        case 'border_solid':
            cell_border_style = 'solid';
            break;
        case 'border_dashed':
            cell_border_style = 'dashed';
            break;
        case 'border_dotted':
            cell_border_style = 'dotted';
            break;
    }

    var width = '1';
    var cell_border_width = wptm_element.primary_toolbars.find('#cell_border_width').val();
    width = cell_border_width !== '' ? cell_border_width : '1';

    var position = [];
    if (arguments[2] !== 'position') {
        position = wptm_element.primary_toolbars.find('#cell_border > div > a.cell_option.active').each(function () {
            second_menu.call(jquery(this), arguments[3], 're_active');
        });
        return false;
    } else {
        position = Array.prototype.slice.call(arguments, 3);
    }
    position.map(function (foo) {
        var value = {};
        value[foo] = '' + width + 'px ' + cell_border_style + ' ' + border_color;
        switch (foo) {
            case 'cell_border_top':
                // Get cells range above selection
                var topCellsSelections = {};
                var topCellsSelections2;
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, value);
                Object.keys(selection).map(function(key, index) {
                    if (selection[key][0] > 0) {
                        var x = selection[key][0] - 1;
                        topCellsSelections[key] = [x, selection[key][1], x, selection[key][3]];
                    }
                    if (selection[key][0] <= Wptm.headerOption && selection[key][2] >= Wptm.headerOption) {
                        topCellsSelections2 = {};
                        topCellsSelections2[key] = [Wptm.headerOption, selection[key][1], Wptm.headerOption, selection[key][3]];
                        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(topCellsSelections2, Wptm, {'cell_border_top': ''});
                    }
                });
                if (typeof topCellsSelections[0] !== 'undefined') {
                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(topCellsSelections, Wptm, {cell_border_bottom: '' + width + 'px ' + cell_border_style + ' ' + border_color});
                }
                break;
            case 'cell_border_left':
                // Get cells range left selection
                var leftCellsSelections = {};
                var fillLeftCells = true;
                Object.keys(selection).map(function(key, index) {
                    var y = selection[key][1] - 1 > 0 ? selection[key][1] - 1 : 0;
                    if (parseInt(selection[key][1]) === 0) {
                        fillLeftCells = false;
                    }
                    leftCellsSelections[key] = [selection[key][0], y, selection[key][2], y];
                });
                if (fillLeftCells) {
                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(leftCellsSelections, Wptm, {cell_border_right: '' + width + 'px ' + cell_border_style + ' ' + border_color});
                }
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, value);
                break;
            default:
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, value);
                break;
        }
    });

}

/*
popup and action for this
wptm_popup     #wptm_popup
popup          object data popup
clone          check clone content in popup
selector_cells get selector cells to popup window
submit_button  get submit button to popup window
*/
function wptm_popup(wptm_popup, popup, clone, selector_cells, submit_button, update_option_cell) {
    if (update_option_cell === true) {
        var selection = getSelector();
        updateOptionValCell(jquery, Wptm, selection);
    }

    wptm_popup.find('.content').contents().remove();
    var over_popup = wptm_popup.siblings('#over_popup');
    if (!clone) {
        var that = wptm_popup.find('.content').append(popup.html);
    } else {
        var that = wptm_popup.find('.content').append(popup.html.clone());
        // window.jquery(html).appendTo(window.jquerywptm_popup.find('.content'));
    }

    if (selector_cells === true) {
        wptm_popup.find('.content .popup_top').after(window.wptm_element.content_popup_hide.find('#select_cells').clone());
        var function_data = window.table_function_data;
        if (typeof function_data.selection !== 'undefined' && function_data.selection[0] !== undefined && _.size(function_data.selection[0]) > 0) {
            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getSelectedVal(function_data.selection[0], that.find('.cellRangeLabelAlternate'));
        }
    }

    if (submit_button === true) {
        that.find('>div').append(window.wptm_element.content_popup_hide.find('#submit_button').clone());
    }
    wptm_popup.animate({'opacity': '1'}, 10);

    wptm_popup.show();
    over_popup.show();

    that.find('.tooltipster').tooltipster({
        theme: 'tooltipster-borderless',
        delay: 100,
        maxWidth: 300,
    });

    //selection cells
    that.find('#get_select_cells').unbind('click').on('click', function () {
        _alternating__WEBPACK_IMPORTED_MODULE_3__["default"].affterRangeLabe.call(that, window.Wptm, window.jquery);
        that.find('.cellRangeLabelAlternate').val();
    });
    that.find('.cellRangeLabelAlternate').on('keyup', function (e) {
        if (e.which == 13) {
            _alternating__WEBPACK_IMPORTED_MODULE_3__["default"].affterRangeLabe.call(that, window.Wptm, window.jquery);
        }
    });

    /*action when show popup*/
    if (typeof popup.showAction !== 'undefined') {
        popup.showAction.call(that);
    }

    /*action selector*/
    if (typeof popup.selector !== 'undefined') {
        var select = select_input_popup.bind(popup, that);
        select();
    }

    // select_tab
    // that.find('.select_tab').find('.link-tab').on('click', function (e) {
    //     e.preventDefault();
    //     topTab.find('li.tab a[href="'+ tabHref +'"]').click();
    //     currentSubMenu.find('li.tab div.link-tab').removeClass('active');
    //     $(this).addClass('active');
    // });

    /*action enter input*/
    if (popup.inputEnter) {
        that.find('input').on('keyup', function (e, i) {
            if (e.keyCode === 13) {
                if (typeof popup.submitAction !== 'undefined') {
                    popup.submitAction.call(that);
                } else {
                    jquery(this).trigger('change');
                }
                wptm_popup.find('.colose_popup').trigger('click');
            }
            return true;
        });
    }

    /*click done button*/
    that.find('#popup_done').unbind('click').on('click', function (e) {
        e.preventDefault();
        if (typeof popup.submitAction !== 'undefined' && !jquery(this).hasClass('not_active')) {
            popup.submitAction.call(that);
        }
        return false;
    });

    /*click cancel button*/
    that.find('#popup_cancel').unbind('click').on('click', function (e) {
        e.preventDefault();
        if (typeof popup.cancelAction !== 'undefined') {
            wptm_popup.animate({'opacity': '0'}, 10);
            popup.cancelAction.call(that);
        }
        setTimeout(function () {
            wptm_popup.hide();
            over_popup.hide();
        }, 200);
        return false;
    });

    //action colose
    wptm_popup.find('.colose_popup').unbind('click').on('click', function (e) {
        e.preventDefault();
        if (typeof popup.cancelAction !== 'undefined') {
            wptm_popup.animate({'opacity': '0'}, 10);
            popup.cancelAction.call(that);
        }

        if (typeof popup.render !== 'undefined' && popup.render === true) {
            window.jquery(window.Wptm.container).data('handsontable').render();
        }

        setTimeout(function () {
            wptm_popup.hide();
            over_popup.hide();
        }, 200);
        return false;
    });
    over_popup.unbind('click').on('click', function (e) {
        e.preventDefault();
        wptm_popup.find('.colose_popup').trigger('click');
        return false;
    });

    //set top for popup
    //wptm_popup.css('top', (over_popup.outerHeight() - wptm_popup.outerHeight()) / 2);

    return false;
}

/**
 * Selector Control function in popup
 *
 * @param that Wptm_popup.find('.content')
 */
var select_input_popup = function (that) {
    if (typeof this.selector !== 'undefined') {
        window.jquery.each(this.selector, (i, e) => {
            that.find(e).change((e) => {
                if (typeof this.option[i] !== 'undefined') {
                    this.option[i] = window.jquery(e.currentTarget).val();
                }
                if (typeof this.inputAction !== 'undefined') {
                    this.inputAction.call(that, i);
                }
            });
        });
    }
}

/**
 * add value for table_function_data.selection and table_function_data.selectionSize
 *
 * @returns {*}
 */
var getSelector = function () {
    var selection = [];
    // if (typeof selection === 'undefined' || selection === undefined || !selection) {
    selection = window.jquery(window.Wptm.container).handsontable('getSelected');//get all cells selected ex:[[0,0,1,9],[3,0,3,9]]
    // }
    if (selection !== false && typeof selection !== 'undefined' && selection.length > 0) {
        //check when handsontable('getSelected') return array[0] = array;
        window.table_function_data.selectionSize = _.size(selection);
        for (var i = 0; i < table_function_data.selectionSize; i++) {
            if (selection[i][0] > selection[i][2]) {
                selection[i] = [selection[i][2], selection[i][3], selection[i][0], selection[i][1]];
            }
            if (selection[i][1] > selection[i][3]) {
                selection[i] = [selection[i][0], selection[i][3], selection[i][2], selection[i][1]];
            }
        }
        window.table_function_data.selection = selection;
    } else {
        window.table_function_data.selection = false;
        window.table_function_data.selectionSize = 0;
    }
    return selection;
}

/**
 * Update status item in cell_menu and table_menu by cell selected
 *
 * @param $
 * @param Wptm
 * @param selection Cell selected
 *
 * @returns {boolean}
 */
var loadSelection = function ($, Wptm, selection) {
    selection = getSelector();
    if (!selection) {
        return true;
    }
    //show value cell to #CellValue when selector a cell
    var size_selection = table_function_data.selectionSize - 1;
    if (selection[size_selection][0] === selection[size_selection][2] && selection[size_selection][1] === selection[size_selection][3]) {
        wptm_element.cellValue.val(Wptm.datas[selection[size_selection][0]][selection[size_selection][1]]);
        table_function_data.cellValueChange = Wptm.datas[selection[size_selection][0]][selection[size_selection][1]];
    } else {
        wptm_element.cellValue.val('');
        table_function_data.cellValueChange = '';
    }
    table_function_data.checkCellValueChange = false;

    //set value option by selection
    updateOptionValTable($, Wptm, selection);

    updateOptionValCell($, Wptm, selection);
    //Todo: populate jform_responsive_col

    return true;
}

/**
 * Update status item in table_menu by cell seletoed
 *
 * @param $
 * @param Wptm
 * @param selection
 */
function updateOptionValTable($, Wptm, selection) {
    if (_functions__WEBPACK_IMPORTED_MODULE_1__["default"].checkObjPropertyNested(Wptm.style, 'table')) {
        var styleTable = Wptm.style.table;
        var wptm_element = window.wptm_element;
        var selector;
        $.each(styleTable, function (index, value) {
            switch (index) {
                case 'enable_filters':
                    selector = wptm_element.settingTable.find('.filters_menu');
                    if (value === 1 || value === '1') {
                        selector.parent().addClass('selected');
                    } else {
                        selector.parent().removeClass('selected');
                    }
                    break;
                case 'download_button':
                    selector = wptm_element.settingTable.find('.download_button_menu');
                    if (value === 1 || value === '1') {
                        selector.parent().addClass('selected');
                    } else {
                        selector.parent().removeClass('selected');
                    }
                    break;
                case 'enable_pagination':
                    selector = wptm_element.settingTable.find('.pagination_menu');
                    if (value === 1 || value === '1') {
                        selector.parent().addClass('selected');
                    } else {
                        selector.parent().removeClass('selected');
                    }
                    break;
                case 'use_sortable':
                    selector = wptm_element.settingTable.find('.sort_menu');
                    if (value === 1 || value === '1') {
                        selector.parent().addClass('selected');
                    } else {
                        selector.parent().removeClass('selected');
                    }
                    break;
                case 'table_align':
                    if (value !== '') {
                        selector = wptm_element.settingTable.find('.align_menu').siblings('.sub-menu').find('li[name="' + value + '"]');
                        selector.siblings('li.selected').removeClass('selected');
                        selector.addClass('selected');
                    }
                    break;
                case 'col_types':
                    if (typeof table_function_data.selection[0] !== 'undefined') {
                        var first_column_selected = table_function_data.selection[0][1];
                        if (typeof value[first_column_selected] !== 'undefined') {
                            table_function_data.type_column_selected = value[first_column_selected];
                        }
                    }
                    break;
                default:
                    break;
            }
        });
    } else {

    }
}

/**
 * Update status item in cell_menu by cell seletoed
 *
 * @param $
 * @param Wptm
 * @param selection
 */
function updateOptionValCell($, Wptm, selection) {
    var colsStyle = Wptm.style.cols;
    var cellsStyle = Wptm.style.cells;
    var rowsStyle = Wptm.style.rows;
    var size_selection = table_function_data.selectionSize - 1;
    if (size_selection < 0) {//not cell selected
        return;
    }
    var endCell = [selection[size_selection][2], selection[size_selection][3]];
    var end_cell = selection[size_selection][2] + '!' + selection[size_selection][3];

    if (!_functions__WEBPACK_IMPORTED_MODULE_1__["default"].checkObjPropertyNested(Wptm.style, 'cells')) {//fix when Wptm.style.cells not exist
        Wptm.style.cells = {};
    }

    window.table_function_data.selectOption = true;//if == true then not click function
    var cell_style = {};

    if (typeof colsStyle[selection[size_selection][3]] !== 'undefined') {
        cell_style = $.extend({}, colsStyle[selection[size_selection][3]][1]);
    }
    if (typeof rowsStyle[selection[size_selection][2]] !== 'undefined') {
        cell_style = $.extend({}, cell_style, rowsStyle[selection[size_selection][2]][1]);
    }

    if (_functions__WEBPACK_IMPORTED_MODULE_1__["default"].checkObjPropertyNested(Wptm.style, 'cells', end_cell, 2)) {
        if ((Wptm.type === 'html' || selection[size_selection][2] === 0) && typeof cellsStyle[end_cell] !== 'undefined') {
            cell_style = $.extend({}, cell_style, cellsStyle[end_cell][2]);
        }
    } else {//fix when Wptm.style.cells[endCell] not exist
        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getFillArray(selection, Wptm, {});
    }

    //tooltip
    var $tooltip_content = $('#tooltip_content');
    if ($tooltip_content.length > 0) {
        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cell_style, 'tooltip_width', $('#tooltip_width'), 0);

        tinyMCE.EditorManager.execCommand('mceRemoveEditor', true, 'tooltip_content');
        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cell_style, 'tooltip_content', $('#tooltip_content'), "");
        var contenNeedToset = $('#tooltip_content').val();

        var initTT = tinymce.extend({}, tinyMCEPreInit.mceInit['tooltip_content']);
        try {
            tinymce.init(initTT);
        } catch (e) {
        }

        //add tinymce to this
        tinyMCE.EditorManager.execCommand('mceAddEditor', true, 'tooltip_content');
        if (tinyMCE.EditorManager.get('tooltip_content') != null) {
            var ttEditor = tinyMCE.EditorManager.get('tooltip_content');
            if (ttEditor && ttEditor.getContainer()) {
                ttEditor.setContent(contenNeedToset);
            }
        }
    }

    if (_functions__WEBPACK_IMPORTED_MODULE_1__["default"].checkCellsOptionsValidate(table_function_data.selection, 'cell_type', 'html')) {//hide cell formats
        wptm_element.settingTable.find('a.date_menu_cell').parent('li').addClass('no_active');
        wptm_element.settingTable.find('a.curency_menu_cell').parent('li').addClass('no_active');
        wptm_element.settingTable.find('a.decimal_menu_cell').parent('li').addClass('no_active');
    } else {
        wptm_element.settingTable.find('a.date_menu_cell').parent('li').removeClass('no_active');
        wptm_element.settingTable.find('a.curency_menu_cell').parent('li').removeClass('no_active');
        wptm_element.settingTable.find('a.decimal_menu_cell').parent('li').removeClass('no_active');
    }

    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cell_style, 'thousand_symbol', wptm_element.content_popup_hide.find('#decimal_menu_cell').find('.thousand_symbol'), '');
    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cell_style, 'decimal_symbol', wptm_element.content_popup_hide.find('#decimal_menu_cell').find('.decimal_symbol'), '');
    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cell_style, 'decimal_count', wptm_element.content_popup_hide.find('#decimal_menu_cell').find('.decimal_count'), '');

    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cell_style, 'currency_symbol', wptm_element.content_popup_hide.find('#curency_menu_cell').find('.currency_symbol'), '');
    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObjectSelectBox(cell_style, 'symbol_position', wptm_element.content_popup_hide.find('#curency_menu_cell').find('.symbol_position').next('.wptm_select_box'), '');

    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cell_style, 'date_formats', wptm_element.content_popup_hide.find('#date_menu_cell').find('.date_formats'), Wptm.style.table.date_formats);


    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObjectSelectBox(cell_style, 'cell_font_family', wptm_element.primary_toolbars.find('#cell_font_family'), 'inherit');
    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cell_style, 'cell_font_size', wptm_element.primary_toolbars.find('#cell_font_size'), 13);
    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cell_style, 'cell_font_bold', wptm_element.primary_toolbars.find('#cell_format_bold'), false, function () {
        active_table_option(this);
    });

    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cell_style, 'cell_font_underline', wptm_element.primary_toolbars.find('#cell_format_underlined'), false,
        function () {
            active_table_option(this);
        }
    );
    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cell_style, 'cell_font_italic', wptm_element.primary_toolbars.find('#cell_format_italic'), false,
        function () {
            active_table_option(this);
        }
    );
    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cell_style, 'cell_background_color', wptm_element.primary_toolbars.find('#cell_background_color'), '',
        function () {
            var color = cell_style.cell_background_color;
            this.wpColorPicker('color', color);
            this.parents('.wp-picker-container').find('.wp-color-result').css('color', color);
        }
    );
    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cell_style, 'cell_font_color', wptm_element.primary_toolbars.find('#cell_font_color'), '',
        function () {
            var color = cell_style.cell_font_color;
            this.wpColorPicker('color', color);
            this.parents('.wp-picker-container').find('.wp-color-result').css('color', color);
        }
    );
    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cell_style, 'cell_text_align', wptm_element.primary_toolbars.find('#cell_text_align'), 'left', function () {
        var value = typeof cell_style.cell_text_align === 'undefined' ? '' : cell_style.cell_text_align;

        wptm_element.primary_toolbars.find('a[name="format_align_left"]').removeClass('active');
        wptm_element.primary_toolbars.find('a[name="format_align_center"]').removeClass('active');
        wptm_element.primary_toolbars.find('a[name="format_align_right"]').removeClass('active');
        wptm_element.primary_toolbars.find('a[name="format_align_justify"]').removeClass('active');
        wptm_element.primary_toolbars.find('a[name="format_align_' + value + '"]').addClass('active');
    });
    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cell_style, 'cell_vertical_align', wptm_element.primary_toolbars.find('#cell_vertical_align'), 'middle', function () {
        var value = typeof cell_style.cell_vertical_align === 'undefined' ? cell_style.cell_vertical_align = 'top' : cell_style.cell_vertical_align;

        wptm_element.primary_toolbars.find('a[name="vertical_align_bottom"]').removeClass('active');
        wptm_element.primary_toolbars.find('a[name="vertical_align_middle"]').removeClass('active');
        wptm_element.primary_toolbars.find('a[name="vertical_align_top"]').removeClass('active');
        wptm_element.primary_toolbars.find('a[name="vertical_align_' + value + '"]').addClass('active');
    });
    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].updateParamFromStyleObject(cell_style, 'cell_type', wptm_element.primary_toolbars.find('#cell_type'), '', function () {
        var value = cell_style.cell_type;
        if (typeof value === 'undefined' || value === '' || value === null) {
            wptm_element.primary_toolbars.find('#cell_type').removeClass('active');
        } else {
            wptm_element.primary_toolbars.find('#cell_type').addClass('active');
        }
    });
    wptm_element.primary_toolbars.find('#cell_border').find('a').each(function () {
        $(this).removeClass('active');
    });

    var mergeCellRanger = {
        'col': selection[size_selection][1],
        'colspan': selection[size_selection][3] - selection[size_selection][1] + 1,
        'row': selection[size_selection][0],
        'rowspan': selection[size_selection][2] - selection[size_selection][0] + 1
    };
    if (Wptm.mergeCellsSetting.some(function (mergeCellsSetting) {
        return mergeCellsSetting.col === mergeCellRanger.col && mergeCellsSetting.row === mergeCellRanger.row;
    })) {
        wptm_element.primary_toolbars.find('#merge_cell').addClass('active');
    } else {
        wptm_element.primary_toolbars.find('#merge_cell').removeClass('active');
    }

    window.table_function_data.selectOption = false;
    //get size(height, width) end cells
    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].getSizeCells($, Wptm, endCell);
}


function active_table_option(that) {
    if (that.val() === true) {
        that.addClass('active');
    } else {
        that.removeClass('active');
    }
}

/**
 * Create custom select box
 *
 * @param $
 * @param select_function cell function when click select
 */
function custom_select_box ($, select_function, multiple) {
    $(this).on('click', function (e) {
        var $that = $(this);
        var old_value;

        $('#mybootstrap').find('.wptm_select_box').each(function () {
            $(this).hide();
            $(this).siblings('.show').removeClass('show');
        });
        var position = $(this).position();

        if ($(this).hasClass('show')) {
            $(this).next().hide();
            $(this).removeClass('show');
            $(document).unbind('click.wptm_select_box');
            return;
        }
        $that.addClass('show');
        var $select = $(this).next().css({top: position.top + 40, left: position.left, 'min-width': $that.outerWidth()}).show();

        if (multiple) {
            $select.find('li input').prop("checked", false);
            old_value = $that.data('value').split('|');
            $.each(old_value, function (i, v) {
                $select.find('li[data-value="' + v + '"]').find('input').prop("checked", true);
            })
        } else {
            old_value = $that.data('value');
        }

        $select.find('li').unbind('click').on('click', function (e) {
            var text = '', data = '';
            var li_tag = $(this);
            if (multiple) {
                if ($(e.target).is('input')) {
                    li_tag = $(e.target).parent();
                } else {
                    li_tag.find('input').prop("checked", !li_tag.find('input').is(":checked"));
                }
            }

            console.log(li_tag);
            if (!multiple || li_tag.hasClass('data-none')) {
                text = li_tag.text();
                data = li_tag.data('value');
            } else {
                $select.find('li:not(.data-none)').each(function (i, e) {
                    if ($(e).find('input').is(":checked")) {
                        if (data !== '') {
                            text += ',' + $(e).text();
                            data += '|' + $(e).data('value');
                        } else {
                            text += $(e).text();
                            data += $(e).data('value');
                        }
                    }
                });
            }
            $select.data('value', data).change();
            console.log(data);
            $that.val(data).text(text).data('value', data).change();

            if (typeof select_function !== 'undefined' && select_function !== null) {
                select_function.bind(li_tag.data('value'));
            }
            if (!multiple || li_tag.hasClass('data-none')) {
                $('#mybootstrap').find('.wptm_select_box').hide();
            }
        });

        $(document).bind('click.wptm_select_box', (e) => {
            if (!$(e.target).is($(this)) && !(!!multiple && $(e.target).parents('.wptm_select_box').length > 0)) {
                $select.hide();
                $that.removeClass('show');
                $(document).unbind('click.wptm_select_box');
            }
        });
    });
}

/* harmony default export */ __webpack_exports__["default"] = ({selectOption, loadSelection, updateOptionValTable, wptm_popup});


/***/ }),

/***/ "./app/admin/assets/js/_wptm.js":
/*!**************************************!*\
  !*** ./app/admin/assets/js/_wptm.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_functions */ "./app/admin/assets/js/_functions.js");
/* harmony import */ var _initHandsontable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_initHandsontable */ "./app/admin/assets/js/_initHandsontable.js");
/* harmony import */ var _alternating__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_alternating */ "./app/admin/assets/js/_alternating.js");
/* harmony import */ var _toolbarOptions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_toolbarOptions */ "./app/admin/assets/js/_toolbarOptions.js");
/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_chart */ "./app/admin/assets/js/_chart.js");
/* harmony import */ var _customRenderer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_customRenderer */ "./app/admin/assets/js/_customRenderer.js");
/**
 * Wptm
 *
 * We developed this code with our hearts and passion.
 * We hope you found it useful, easy to understand and to customize.
 * Otherwise, please feel free to contact us at contact@joomunited.com *
 * @package Wptm
 * @copyright Copyright (C) 2014 JoomUnited (http://www.joomunited.com). All rights reserved.
 * @copyright Copyright (C) 2014 Damien Barrère (http://www.crac-design.com). All rights reserved.
 * @license GNU General Public License version 2 or later; http://www.gnu.org/licenses/gpl-2.0.html
 */







jQuery('title').text(wptmText.EDIT_TABLE_TITLE_TAG);

jQuery(window).bind('beforeunload', function(){
    if(!checkTimeOut)
        return true;
});

jQuery(document).ready(function ($) {
    window.jquery = $;

    var popup = $("#wptm_popup").draggable({
        containment: "#pwrapper",
        drag: function( event, ui ) {
            $(this).css('transform', 'none');
        },
    });

    var popup_edit_html_cell = $("#wptm_edit_html_cell").draggable({
        containment: "#pwrapper",
        drag: function( event, ui ) {
            $(this).css('transform', 'none');
        },
    });

    $('.tip').tooltipster({
        theme: 'tooltipster-borderless',
        delay: 100,
        distance: 5,
    });
    $(document).on('click', '.search-open-btn', function (e) {
        var btn = $(this);
        var search_menu = btn.closest('.search-menu');
        if (!search_menu.hasClass("open")) {
            search_menu.addClass("open");
        }
    });
    $(document).on('mouseup', function (e) {
        var container = $(".search-menu");
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0 && container.hasClass("open")) {
            container.removeClass("open");
        }
    });
    $('.wp-color-result-text').each(function () {
        var tip = $(this).closest('.cells_option').attr('title');
        $(this).attr('title', tip).tooltipster({
            theme: 'tooltipster-borderless',
            delay: 0,
            distance: 5,
        });
    });
    if (typeof (Wptm) == 'undefined') {
        Wptm = {};
        Wptm.can = {};
        Wptm.can.create = true;
        Wptm.can.edit = true;
        Wptm.can.delete = true;
        Wptm.selection = {};
        Wptm.value_unit_chart = [];
        Wptm.hyperlink = {};
    } else {
        Wptm.value_unit_chart = [];
    }
    Wptm.updateSettings = {};
    Wptm.saveDataDbTable = [];

    if (typeof (Wptm.can) == 'undefined') {
        Wptm.can = {};
        Wptm.can.create = true;
        Wptm.can.edit = true;
        Wptm.can.delete = true;
        Wptm.hyperlink = {};
    }

    if (typeof (wptm_isAdmin) == 'undefined') {
        wptm_isAdmin = false;
    }
    Wptm.clearHandsontable = true;
    if (typeof chart_active !== 'undefined' && parseInt(chart_active) > 0) {
        Wptm.chart_active = chart_active;
    } else {
        $('#over_loadding_open_chart').hide();
    }

    if (typeof window.parent.wptm_insert !== 'undefined' && typeof window.parent.wptm_insert.opend_table !== 'undefined') {
        delete window.parent.wptm_insert.opend_table;
    }

    window.wptm_element = {
        wpreview: $('#wptm-toolbars'),
        primary_toolbars: $('#primary_toolbars'),
        mainTabContent: $('#mainTabContent'),
        tableContainer: $('#tableContainer'),
        wptm_popup: $('#wptm_popup'),
        content_popup_hide: $('#content_popup_hide'),
        cellValue: $('#CellValue'),
        settingCells: $('#setting-cells'),
        settingTable: $('#table-setting'),
        nameTable: $('#name-table'),
        alternating_color: $('#alternating_color'),
        editToolTip: $('#editToolTip'),
        edit_html_cell: $('#edit_html_cell'),
        wptm_edit_html_cell: $('#wptm_edit_html_cell'),
        saveToolTipbtn: $('#saveToolTipbtn'),
        chartTabContent: $('#chartTabContent'),
        wptmContentChart: $('#wptm_chart .wptm_content_chart')
    };

    //saving all function data
    window.table_function_data = {
        replace_unit: {},
        text_replace_unit: '',
        text_replace_unit_function: '',
        date_format: [],
        check_value_data: true,
        string_currency_symbols: '',
        selectFetch: {},
        allAlternate: {},
        oldAlternate: {},
        changeAlternate: [],
        checkChangeAlternate: [],
        selection: [],
        styleToRender: '',
        content: '',
        needSaveAfterRender: false,
        alternateIndex: '',
        alternateSelection: [],
        save_table_params: [],
        firstRender: false,
        accountingNumber : {}
    };

    // is writing
    if (typeof idUser !== 'undefined' && idUser !== null) {
        var listUserEdit = {};
    }

    /* init menu actions */

    window.default_value = $.extend({}, {
        'use_sortable': '0',
        'fonts_used': [],
        'fonts_local_used': [],
        'default_sortable': '0',
        'default_order_sortable': '1',
        'table_align': 'center',
        'responsive_type': 'scroll',
        'table_breakpoint': '980',
        'freeze_col': 0,
        'table_height': 500,
        'style_repeated': 0,
        'freeze_row': 0,
        'enable_filters': 0,
        'enable_pagination': 0,
        'allRowHeight': '',
        'spreadsheet_url': '',
        'spreadsheet_style': 0,
        'auto_sync': 0,
        'auto_push': 0,
        'download_button': 0,
        'col_types': ["varchar","varchar","varchar","varchar","varchar","varchar","varchar","varchar","varchar","varchar"]
    }, default_value);

    if (typeof idTable !== 'undefined' && idTable !== '') {
        updatepreview(idTable);

        if ($('.wptm-page').length > 0 && $('#adminmenuwrap').length > 0) {
            Scrollbar.init(document.querySelector('#adminmenuwrap'), {
                damping: 0.5,
                thumbMinSize: 10,
                alwaysShowTracks: false
            });
        }
    }

    //create new table
    wptm_element.primary_toolbars.find('.new_table_menu').on('click', function (e) {
        e.preventDefault();

        if (!(Wptm.can.create)) {
            return;
        }

        if (!wptm_permissions.can_create_tables) {
            bootbox.alert(wptm_permissions.translate.wptm_create_tables, wptmText.Ok);
            return false;
        }

        var id_category = Wptm.category;
        var curr_page = window.location.href;
        var cells = curr_page.split("?");

        $.ajax({
            url: wptm_ajaxurl + "task=table.add&id_category=" + id_category,
            type: "POST",
            data: {},
            dataType: "json",
            success: function (datas) {
                if (datas.response === true) {
                    var new_url = cells[0] + '?page=wptm&id_table=' + datas.datas.id;
                    window.open(new_url);
                } else {
                    bootbox.alert(datas.response, wptmText.Ok);
                }
            },
            error: function (jqxhr, textStatus, error) {
                bootbox.alert(textStatus + " : " + error, wptmText.Ok);
            }
        });
        return false;
    });

    //Import Excel
    //Init call back when file is uploaded successful
    $("#procExcel").dropzone({
        url: "admin-ajax.php?action=Wptm&task=excel.import",
        maxFiles: 1,
        init: function () {
            //Update form action
            this.on("addedfile", function (file) {
                var dotPos = file.name.lastIndexOf('.') + 1;
                var ext = file.name.substr(dotPos, file.name.length - dotPos);

                if (ext !== 'xls' && ext !== 'xlsx') {
                    bootbox.alert(wptmText.CHOOSE_EXCEL_FIE_TYPE, wptmText.Ok);
                    this.options.autoProcessQueue = false;
                    this.removeFile(file);
                } else {
                    if (this.options.autoProcessQueue === false) {
                        this.options.autoProcessQueue = true;
                    }
                }
            });

            this.on("sending", function (file, xhr, formData) {
                file.previewElement.innerHTML = "";//remove Layout dropzone
                //Add table id to formData
                $("#jform_id_table").val(idTable);
                formData.append('id_table', idTable);
                formData.append('onlydata', wptm_element.wptm_popup.find("#import_style").val());

                // Show the total progress bar when upload starts
                wptm_element.wptm_popup.find(".progress").show();
                wptm_element.wptm_popup.find(".progress-bar-success").css('width', 30 + '%');
                wptm_element.wptm_popup.find(".progress-bar-success").css('opacity', 1);
                // And disable the start button
            });

            this.on("success", function (file, responseText) {
                wptm_element.wptm_popup.find(".progress").fadeOut(1000);
                var responseObj = JSON.parse(responseText);
                file.previewElement.innerHTML = "";//remove Layout dropzone

                wptm_element.wptm_popup.find('.colose_popup').trigger('click');
                if (responseObj.response === true) {
                    if (typeof responseObj.datas.too_large !== 'undefined') {
                        bootbox.confirm(responseObj.datas.msg, wptmText.Cancel, wptmText.Ok, function (result) {
                            if (result === true) {
                                var jsonVar = {
                                    id_table: responseObj.datas.id,
                                    onlydata: responseObj.datas.onlydata,
                                    file: encodeURI(responseObj.datas.file),
                                    ignoreCheck: 1
                                };
                                $.ajax({
                                    url: wptm_ajaxurl + "task=excel.import",
                                    type: 'POST',
                                    data: jsonVar,
                                    success: function (datas) {
                                        location.reload();
                                    }
                                })
                            } else {
                                //do nothing
                            }
                        });

                    } else {
                        location.reload();
                    }
                } else {
                    bootbox.alert(typeof responseObj.response.text !== 'undefined' ? responseObj.response.text : responseObj.response, wptmText.Ok);
                }
            });

            this.on('complete', function (file) {
                this.removeFile(file);
                setTimeout(function () {
                    wptm_element.wptm_popup.find(".progress-bar-success").css('width', 0);
                }, 6000);
            });
            // Update the total progress bar
            this.on("uploadprogress", function (file, progress) {
                wptm_element.wptm_popup.find(".progress-bar-success").css('width', progress + "%");
            });
        }
    });

    if (typeof Wptm.wptm_error_message_read_file !== 'undefined') {
        bootbox.alert(
            wptmText.import_is_finished + '<br/>' +
            wptmText.error_message_read_file_cells_concerned +
            Wptm.wptm_error_message_read_file, wptmText.Ok);
    }
});

//Call ajax to get all data of table, add value to Wptm, table_function_data
function updatepreview(id, ajaxCallBack) {
    /*remove after change theme*/
    delete table_function_data.changeTheme;
    var url = wptm_ajaxurl + "view=table&format=json&id=" + id;
    var $ = jquery;

    $.ajax({
        url: url,
        type: "POST",
        data: {},
        dataType: "json",
    }).done(function (data) {
        //TODO: check user role table
        Wptm.id = id;
        Wptm.title = data.title;
        /*not change data cell(in db table)*/
        Wptm.type = 'html';
        Wptm.category = data.id_category;

        /*set height rows variable*/
        Wptm.rowsHeight = {};
        Wptm.table_height = 0;

        Wptm.hyperlink = {};
        if (typeof data.type !== 'undefined') {
            Wptm.type = data.type;
        } else {
            Wptm.type = (typeof data.params.table_type !== 'undefined') ? data.params.table_type : Wptm.type;
        }

        if (data.datas === '' || data.datas === false) {
            delete Wptm.datas;
            Wptm.datas = [
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""]
            ];
        } else {
            data.datas = JSON.stringify(data.datas);
            try {
                Wptm.datas = JSON.parse(data.datas);
            } catch (err) {
                Wptm.datas = [
                    ["", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", "", "", ""]
                ];
            }
        }

        Wptm.style = $.parseJSON(data.style);

        Wptm.css = data.css.replace(/\\n/g, "\n");

        if (data.params === "" || data.params === null || data.params.length == 0) {
            Wptm.mergeCellsSetting = [];
            Wptm.headerOption = 1;
        } else {
            if (typeof (data.params) == 'string') {
                data.params = $.parseJSON(data.params);
            }

            if (typeof data.params.headerOption !== 'undefined') {
                Wptm.headerOption = parseInt(data.params.headerOption);
            } else {
                Wptm.headerOption = 1;
            }

            if (typeof data.params.hyperlink !== 'undefined') {
                if (typeof data.params.hyperlink === 'string') {
                    data.params.hyperlink = data.params.hyperlink.replaceAll('\\\\"', '\\"');
                    data.params.hyperlink = $.parseJSON(data.params.hyperlink);
                }
                $.each(data.params.hyperlink, function (index, value) {
                    var rowCol = index.split("!");
                    if(typeof Wptm.datas[rowCol[0]] !== 'undefined') {
                        if (typeof value.text == 'undefined') {
                            value.text =  Wptm.datas[rowCol[0]][rowCol[1]];
                        }
                        Wptm.datas[rowCol[0]][rowCol[1]] = '<a target="_blank" href="' + value.hyperlink + '">' + value.text + '</a>';
                    }
                });
                Wptm.hyperlink = data.params.hyperlink;
            }

            try {
                if (typeof data.params.mergeSetting === 'string') {
                    Wptm.mergeCellsSetting = $.parseJSON(data.params.mergeSetting);
                } else if (typeof data.params.mergeSetting === 'object') {
                    Wptm.mergeCellsSetting = data.params.mergeSetting;
                }
                if (Wptm.mergeCellsSetting == null) {
                    Wptm.mergeCellsSetting = [];
                }
            } catch (e) {
                Wptm.mergeCellsSetting = [];
            }
        }

        /*set default table data*/
        if (typeof (Wptm.style) === 'undefined' || Wptm.style === null) {
            $.extend(Wptm, {
                style: {
                    table: {},
                    rows: {},
                    cols: {},
                    cells: {}
                },
                css: ''
            });
        }

        if (typeof (Wptm.style.rows) === 'undefined' || Wptm.style.rows === null) {
            Wptm.style.rows = {};
        }
        if (typeof (Wptm.style.cols) === 'undefined' || Wptm.style.cols === null) {
            Wptm.style.cols = {};
            for (var number_col in Wptm.datas[0]) {
                Wptm.style.cols[number_col] = [parseInt(number_col), {res_priority: parseInt(number_col)}];
            }
        } else {
            for (var number_col in Wptm.datas[0]) {
                if (typeof window.Wptm.style.cols[number_col] === 'undefined' || window.Wptm.style.cols[number_col] === null) {
                    Wptm.style.cols[number_col] = [parseInt(number_col), {res_priority: parseInt(number_col)}];
                } else  if (typeof window.Wptm.style.cols[number_col][1].res_priority === 'undefined') {
                    Wptm.style.cols[number_col][1].res_priority =  parseInt(number_col);
                }
            }
        }
        if (typeof (Wptm.style.cells) === 'undefined' || Wptm.style.cells === null) {
            Wptm.style.cells = {};
        }

        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].mergeCollsRowsstyleToCells();

        Wptm.style.table = $.extend({}, window.default_value, Wptm.style.table);

        if (typeof table_function_data.auto_sync !== 'undefined') {
            Wptm.style.table.auto_sync = table_function_data.auto_sync;
            Wptm.style.table.spreadsheet_style = table_function_data.spreadsheet_style;
            Wptm.style.table.spreadsheet_url = table_function_data.spreadsheet_url;
            delete table_function_data.auto_sync;
        }

        if (Wptm.style.table.spreadsheet_url !== '' && Wptm.style.table.spreadsheet_url.indexOf("docs.google.com/spreadsheet") === -1) {//when first auto syn after update 2.7.0
            if (table_function_data.auto_sync == 1) {
                Wptm.style.table.excel_auto_sync = 1;
                Wptm.style.table.auto_sync = 0;
                Wptm.style.table.excel_spreadsheet_style = Wptm.style.table.spreadsheet_style;
            }
            Wptm.style.table.excel_url = table_function_data.spreadsheet_url;
            table_function_data.spreadsheet_url = '';
            Wptm.style.table.spreadsheet_url = '';
        }

        if (Wptm.headerOption > 0 && (typeof Wptm.style.table.header_data === 'undefined' || Wptm.style.table.header_data.length < Wptm.headerOption)) {
            Wptm.style.table.header_data = [];
            for (var j = 0; j < Wptm.headerOption; j++) {
                Wptm.style.table.header_data[j] = Wptm.datas[j];
            }
        }


        window.table_function_data = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].createRegExpFormat(table_function_data, Wptm.style.table.currency_symbol, Wptm.style.table.date_formats);

        if (Wptm.style.table.date_formats !== '') {
            window.table_function_data.date_formats_momentjs = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].momentjsFormat(Wptm.style.table.date_formats);
        }

        window.Wptm = $.extend({}, window.Wptm, Wptm);

        $('#jform_css').val(Wptm.css);
        $('#jform_css').change();
        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].parseCss($);

        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].setFormat_accounting();

        var handRisize, clearHandRisize;
        window.onresize = function () {
            if (!clearHandRisize) {
                clearTimeout(handRisize);
            }

            clearHandRisize = false;
            handRisize = setTimeout(function () {
                var height = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].calculateTableHeight(window.jquery('#wptm-toolbars'));
                jquery(Wptm.container).handsontable('updateSettings', {height: height});
                clearHandRisize = true;
            }, 500);
        };

        if (typeof (Wptm.style.table.alternateColorValue) === 'undefined' || typeof Wptm.style.table.alternateColorValue[0] === 'undefined') {
            var styleRows = null;
            _alternating__WEBPACK_IMPORTED_MODULE_2__["default"].setAlternateColor(styleRows, window.Wptm, window.wptm_element);
        }

        if (_.size(window.table_function_data.oldAlternate) < 1) {
            window.table_function_data.oldAlternate = $.extend({}, Wptm.style.table.alternateColorValue);
        }

        if (_.size(window.table_function_data.allAlternate) < 1) {
            window.table_function_data.allAlternate = $.extend({}, Wptm.style.table.allAlternate);
        }

        //update option table
        _toolbarOptions__WEBPACK_IMPORTED_MODULE_3__["default"].updateOptionValTable($, window.Wptm, [0, 0, 0, 0]);

        codemirror_tooltip($);

        $('#list_chart').find('.current_table a').text(Wptm.title);
        if (Wptm.type !== 'html') {
            // wptm_element.primary_toolbars.find('.wptm_name_edit').after('<div class="wptm_warning"><p>' + wptmText.notice_msg_table_database + '</p></div>');
            if (wptm_element.settingTable.find('.table-menu a.source_menu').length > 0) {
                wptm_element.settingTable.find('.table-menu a.source_menu').parent().show();
            }
            if (Wptm.style.table.allRowHeight < 10 || isNaN(Wptm.style.table.allRowHeight)) {
                Wptm.style.table.allRowHeight = 30;
            }
        } else {
            wptm_element.settingTable.find('.table-menu a.source_menu').parent().hide();
        }

        // window.Wptm.type = 'html';

        //check edit columns, get column key
        if (window.Wptm.type === 'mysql') {
            Wptm.query_option = data.query_option;
            if (Wptm.query_option.column_options !== null && Wptm.query_option.column_options.length > 0) {
                table_function_data.columns = [];
                for (var i in Wptm.query_option.column_options) {
                    if (parseInt(Wptm.query_option.column_options[i].canEdit) !== 1 || (Wptm.query_option.column_options[i].table + '.' + Wptm.query_option.column_options[i].Field === Wptm.style.table.priKey)) {
                        table_function_data.columns[i] = {readOnly: true};
                    } else {
                        table_function_data.columns[i] = {readOnly: false}
                    }
                    if (typeof Wptm.style.table.lock_columns !== 'undefined'
                        && Wptm.style.table.lock_columns[i] != 0) {
                        table_function_data.columns[i] = {readOnly: true};
                    }
                    if (Wptm.style.table.priKey === Wptm.query_option.column_options[i].table + '.' + Wptm.query_option.column_options[i].Field) {
                        table_function_data.keyPosition = i;
                    }
                }
            }
        // } else {
        //     if (wptm_administrator !== 1 && typeof Wptm.style.table.protect_columns !== 'undefined') {
        //         table_function_data.columns = [];
        //         for (var ij2 in Wptm.style.table.protect_columns) {
        //             if (Wptm.style.table.protect_columns[ij2] != 0) {
        //                 table_function_data.columns[ij2] = {readOnly: true};
        //             } else {
        //                 table_function_data.columns[ij2] = {readOnly: false}
        //             }
        //         }
        //     }
        }

        if (typeof Wptm.style.table.lock_ranger_cells !== 'undefined' && Wptm.style.table.lock_ranger_cells.length > 0) {
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].create_ranger_cells_lock(Wptm, table_function_data, null);
        }

        table_function_data.mysqlEdit = window.Wptm.type === 'mysql' && parseInt(Wptm.table_editing) === 1;

        /*render table */
        Object(_initHandsontable__WEBPACK_IMPORTED_MODULE_1__["initHandsontable"])(Wptm.datas);
        wptm_element.primary_toolbars.find('.wptm_name_edit').click(function () {
            if (!$(this).hasClass('editable')) {
                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].setText.call(
                    $(this),
                    wptm_element.primary_toolbars.find('.wptm_name_edit'),
                    '#primary_toolbars .wptm_name_edit',
                    {'url': wptm_ajaxurl + "task=table.setTitle&id=" + Wptm.id + '&title=', 'selected': true}
                );
            }
        });

        $(window).bind('keydown', function(event) {//CTRL + S
            if (!(event.which == 83 && (event.ctrlKey || event.metaKey)) && !(event.which == 19)) return true;
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].saveChanges(true);
            event.preventDefault();
            return false;
        });
    });
}

function checkLightOrDark(color) {
    var r, g, b, hsp;

    if (color.match(/^rgb/)) {
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {
        color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    if (hsp>127.5) {
        return 1;
    }
    else {
        return 0;
    }
}

//custom cell editor
function codemirror_tooltip($) {
    window.CustomEditor = Handsontable.editors.TextEditor.prototype.extend();

    window.CustomEditor.prototype.open = function () {
        $(this.TEXTAREA).attr('id', 'editor1');
        var lightOrDark = checkLightOrDark($(this.TEXTAREA).css( "backgroundColor" ));
        if (lightOrDark === 0) {
            $(this.TEXTAREA).css({'color':'#ffffff'});
        } else {
            $(this.TEXTAREA).css({'color':'#000000'});
        }
        var cell_html = false;

        if (typeof (Wptm.style.cells[this.row + '!' + this.col]) !== 'undefined' && typeof (Wptm.style.cells[this.row + '!' + this.col][2].cell_type) !== 'undefined' && Wptm.style.cells[this.row + '!' + this.col][2].cell_type === 'html') {
            cell_html = true;
            Handsontable.editors.TextEditor.prototype.close.apply(this, arguments);
            tinyMCE.EditorManager.execCommand('mceRemoveEditor', true, 'html_cell_content');

            var initTT = tinymce.extend({}, tinyMCEPreInit.mceInit['html_cell_content']);
            try {
                tinymce.init(initTT);
            } catch (e) {
            }

            //add tinymce to this
            var content = '';
            if (typeof Wptm.datas[table_function_data.selection[0][0]][table_function_data.selection[0][1]] !== 'undefined'
            && Wptm.datas[table_function_data.selection[0][0]][table_function_data.selection[0][1]] !== null) {
                content = Wptm.datas[table_function_data.selection[0][0]][table_function_data.selection[0][1]];
            }
            tinyMCE.EditorManager.execCommand('mceAddEditor', true, 'html_cell_content');
            if (tinyMCE.EditorManager.get('html_cell_content') != null) {
                var ttEditor = tinyMCE.EditorManager.get('html_cell_content');
                if (ttEditor && ttEditor.getContainer()) {
                    ttEditor.setContent(content);
                }
            }

            wptm_element.edit_html_cell.trigger('click');
        } else {
            tinyMCE.EditorManager.execCommand('mceRemoveEditor', true, 'html_cell_content');
            Handsontable.editors.TextEditor.prototype.open.apply(this, arguments);
        }

        // change width of popup when click html cell
        if (!cell_html) {
            wptm_element.tableContainer.find('.handsontableInputHolder').css('position', 'absolute').css('visibility', 'visible');
        }
    };

    window.CustomEditor.prototype.getValue = function () {
        if (typeof (tinyMCE) === 'undefined' || !tinyMCE.EditorManager.get('html_cell_content')) {
            return Handsontable.editors.TextEditor.prototype.getValue.apply(this, arguments);
        }
    };

    window.CustomEditor.prototype.setValue = function (newValue) {
        if (typeof (tinyMCE) === 'undefined' || !tinyMCE.EditorManager.get('html_cell_content')) {
            return Handsontable.editors.TextEditor.prototype.setValue.apply(this, arguments);
        }
    };

    wptm_element.edit_html_cell.wptm_leanModal({
        top: 100, background: '#ffffff', closeButton: '#cancel_html_cell_btn',
        beforeInit: function () {
            var position = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].setPositionForHtmlCellEditor();
            this.top = position.top;
            this.left = position.left + 'px';
            this.marginLeft = '0px';
        },
        before_colose_modal: function () {
            var content = tinyMCE.EditorManager.get('html_cell_content').getContent();
            window.jquery(window.Wptm.container).data('handsontable').setDataAtCell(table_function_data.selection[0][0], table_function_data.selection[0][1], content);
        }
    });

    //codemirror
    var myTextArea = document.getElementById("jform_css");
    var myCssEditor = CodeMirror.fromTextArea(myTextArea, {mode: "css", lineNumbers: true});
    var ww = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    if (window.parent) {
        ww = window.parent.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        wh = window.parent.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }

    myCssEditor.setSize(ww * 50 / 100, wh - 500);

    wptm_element.primary_toolbars.find('.custom-menu').wptm_leanModal({
        top: 200,
        background: '#ffffff',
        closeButton: '#cancelCssbtn',
        beforeShow: function () {
            var selection = table_function_data.selection;
            var ht = jQuery(Wptm.container).handsontable('getInstance');
            ht.updateSettings({
                cells: function (row, col, prop) {
                    if (selection[0][0] === row && selection[0][1] === col) {
                        var cellProperties = {};

                        cellProperties.readOnly = true;
                        return cellProperties;
                    }
                }
            });
            window.jquery(Wptm.container).handsontable("selectCell", selection[0][0], selection[0][1], selection[0][0], selection[0][1]);
        },
        before_colose_modal: function () {
            var selection = table_function_data.selection;

            var ht = jQuery(Wptm.container).handsontable('getInstance');
            ht.updateSettings({
                cells: function (row, col, prop) {
                    if (selection[0][0] === row && selection[0][1] === col) {
                        var cellProperties = {};

                        cellProperties.readOnly = false;
                        return cellProperties;
                    }
                }
            });
            window.jquery(Wptm.container).handsontable("selectCell", selection[0][0], selection[0][1], selection[0][0], selection[0][1]);
        },
        modalShow: function () {
            myCssEditor.refresh();
            myCssEditor.focus();
        }
    });

    $(myTextArea).on('change', function () {
        myCssEditor.setValue($(myTextArea).val().replace(/\\n/g, "\n"));
    });

    // myCssEditor.on("blur", function() {
    $("#saveCssbtn").click(function () {
        myCssEditor.save();
        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].parseCss($);
        $(myTextArea).trigger("propertychange");
        //close leanModal
        $("#lean_overlay").fadeOut(200);
        $("#wptm_customCSS").css({"display": "none"})
    });

    wptm_element.editToolTip.wptm_leanModal({
        top: 100, background: '#ffffff', closeButton: '#cancelToolTipbtn', modalShow: function () {
        }
    });

    wptm_element.saveToolTipbtn.click(function () {
        var ttEditor = tinyMCE.EditorManager.get('tooltip_content');
        ttEditor.save();
        $("#tooltip_content").trigger("change");
        //close leanModal
        $("#lean_overlay").fadeOut(200);

        $("#wptm_editToolTip").css({"display": "none"});
        $('#edit_toolTip').trigger('change');
    })

    tinyMCEPreInit.mceInit['html_cell_content'] = tinyMCEPreInit.mceInit['wptmditor'];
    tinyMCEPreInit.mceInit['tooltip_content'] = tinyMCEPreInit.mceInit['wptm_tooltip'];
    tinyMCE.EditorManager.execCommand('mceRemoveEditor', true, 'wptmditor');
    $('#wp-wptmditor-wrap').hide();
}

//fetch google sheet, import file excel
function fetchSpreadsheet(obj) {
    _functions__WEBPACK_IMPORTED_MODULE_0__["default"].loading(wptm_element.wpreview);

    var auto_sync, spreadsheet_style, url;
    var $close_popup = wptm_element.wptm_popup.find('.colose_popup');
    var loader = wptm_element.wptm_popup.find('.lds-ring');
    var popup_notification = wptm_element.wptm_popup.find('.popup_notification');
    var data;

    if (obj.type === 'spreadsheet') {
        data = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getLinkSync(Wptm.style.table.spreadsheet_url, 'spreadsheet', true);
        if (!data) {
            return false;
        }
        // url = encodeURI(Wptm.style.table.spreadsheet_url);
        // auto_sync = Wptm.style.table.auto_sync != '1' ? 0 : 1;
        // spreadsheet_style = Wptm.style.table.spreadsheet_style != '1' ? 0 : 1;
        // if (url.indexOf("docs.google.com/spreadsheet") === -1) {
        //     bootbox.alert(wptmText.error_link_google_sync, wptmText.GOT_IT);
        //     Wptm.style.table.spreadsheet_url = '';
        //     return;
        // }
        //
        // //check publish link
        // var end_link = url.split('?');
        // var end_link0 = end_link[0].slice(-7);
        // if (end_link0.match(/html|csv|pdf|xlsx/gi) === null && (typeof end_link[1] !== "undefined" && end_link[1].match(/sharing|html|csv|pdf|xlsx/gi) === null)) {
        //     bootbox.alert(wptmText.error_link_google_sync, wptmText.GOT_IT);
        //     Wptm.style.table.spreadsheet_url = '';
        //     return;
        // }
    } else if (obj.type === 'excel') {
        data = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getLinkSync(Wptm.style.table.excel_url, 'excel', true);
        if (!data) {
            return false;
        }
        // url = encodeURI(Wptm.style.table.excel_url);
        // auto_sync = Wptm.style.table.excel_auto_sync != '1' ? 0 : 1;
        // spreadsheet_style = Wptm.style.table.excel_spreadsheet_style != '1' ? 0 : 1;
        // if (url.indexOf("docs.google.com/spreadsheet") !== -1) {
        //     bootbox.alert(wptmText.error_link_import_sync, wptmText.GOT_IT);
        //     Wptm.style.table.excel_url = '';
        //     return;
        // }
    } else if (obj.type === 'onedrive') {
        data = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getLinkSync(Wptm.style.table.onedrive_url, 'onedrive', true);
        if (!data) {
            return false;
        }
    }

    var jsonVar = {
        spreadsheet_url: data.url,
        id: Wptm.id,
        sync: data.auto_sync,
        syncType: obj.type,
        style: data.spreadsheet_style
    };
    delete table_function_data.fetch_data;

    jquery.ajax({
        url: wptm_ajaxurl + "task=excel.fetchSpreadsheet&id=" + Wptm.id,
        type: "POST",
        data: jsonVar,
        beforeSend: function() {
            loader.removeClass('wptm_hiden');
            popup_notification.addClass('wptm_hiden');
        },
        success: function (datas) {
            loader.addClass('wptm_hiden');
            var result = jQuery.parseJSON(datas);
            if (result.response === true) {
                if (obj.type === 'spreadsheet') {
                    // table_function_data.auto_sync = result.datas.sync;
                    table_function_data.spreadsheet_style = result.datas.style;
                    table_function_data.spreadsheet_url = Wptm.style.table.spreadsheet_url;
                } else if(obj.type === 'excel') {
                    // table_function_data.excel_auto_sync = result.datas.sync;
                    table_function_data.excel_spreadsheet_style = result.datas.style;
                    table_function_data.excel_url = Wptm.style.table.excel_url;
                } else if(obj.type === 'onedrive') {
                    // table_function_data.excel_auto_sync = result.datas.sync;
                    table_function_data.onedrive_style = result.datas.style;
                    table_function_data.onedrive_url = Wptm.style.table.onedrive_url;
                }
                updatepreview(Wptm.id);
                popup_notification.html('<span class="noti_success">'+wptmText.DATA_HAS_BEEN_FETCHED+'</span>');
                if (typeof result.datas.error !== 'undefined' && result.datas.error !== '') {
                    popup_notification.html('<span class="noti_false">'+result.datas.error+'</span>');
                    popup_notification.removeClass('wptm_hiden');
                } else {
                    if (typeof result.datas.error_read_file !== 'undefined' && result.datas.error_read_file !== '') {
                        setTimeout(function () {
                            bootbox.alert(
                                wptmText.import_is_finished + '<br/>' +
                                wptmText.error_message_read_file_cells_concerned +
                                result.datas.error_read_file, wptmText.Ok);
                        }, 500);
                    }
                    popup_notification.removeClass('wptm_hiden');
                    $close_popup.trigger('click');
                }
            } else {
                popup_notification.html('<span class="noti_false">'+result.response+'</span>');
                popup_notification.removeClass('wptm_hiden');
            }
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].rloading(wptm_element.wpreview);
        },
        error: function (jqxhr, textStatus, error) {
            popup_notification.html('<span class="noti_false">'+wptmText.have_error+'</span>');
            popup_notification.removeClass('wptm_hiden');
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].rloading(wptm_element.wpreview);
        }
    });
}

function updateDimession() {
    var rows = [];
    var i = 0;
    for (var row in Wptm.style.rows) {
        var h = jQuery('#tableContainer .ht_master .htCore tr').eq(i + 1).height();
        rows[row] = h;
        i++;
    }

    jQuery(Wptm.container).handsontable('updateSettings', {rowHeights: rows});

    var ht = jQuery(Wptm.container).handsontable('getInstance');
    ht.runHooks('afterRowResize');
}

/* harmony default export */ __webpack_exports__["default"] = ({
    updatepreview,
    fetchSpreadsheet
});


/***/ }),

/***/ 0:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./app/admin/assets/js/_alternating.js ./app/admin/assets/js/_changeTheme.js ./app/admin/assets/js/_chart.js ./app/admin/assets/js/_customRenderer.js ./app/admin/assets/js/_functions.js ./app/admin/assets/js/_initHandsontable.js ./app/admin/assets/js/_toolbarOptions.js ./app/admin/assets/js/_wptm.js ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./app/admin/assets/js/_alternating.js */"./app/admin/assets/js/_alternating.js");
__webpack_require__(/*! ./app/admin/assets/js/_changeTheme.js */"./app/admin/assets/js/_changeTheme.js");
__webpack_require__(/*! ./app/admin/assets/js/_chart.js */"./app/admin/assets/js/_chart.js");
__webpack_require__(/*! ./app/admin/assets/js/_customRenderer.js */"./app/admin/assets/js/_customRenderer.js");
__webpack_require__(/*! ./app/admin/assets/js/_functions.js */"./app/admin/assets/js/_functions.js");
__webpack_require__(/*! ./app/admin/assets/js/_initHandsontable.js */"./app/admin/assets/js/_initHandsontable.js");
__webpack_require__(/*! ./app/admin/assets/js/_toolbarOptions.js */"./app/admin/assets/js/_toolbarOptions.js");
module.exports = __webpack_require__(/*! ./app/admin/assets/js/_wptm.js */"./app/admin/assets/js/_wptm.js");


/***/ })

/******/ });
//# sourceMappingURL=wptm.js.map