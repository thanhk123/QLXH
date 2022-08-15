(function ($) {
    var getScrollbarWidth = function (selector) {
        var scrollWidth;
        if (typeof selector.get(0) === 'undefined') {
            scrollWidth = 0;
        } else {
            scrollWidth = selector.get(0).offsetWidth - selector.get(0).clientWidth + 5;//fix when width .5px
            if (scrollWidth === 0) {
                scrollWidth = 20;
            }
        }
        return scrollWidth;
    };
    var addMarginTopToFixedColumn = function (currentTable, numberRows) {
        var scrollWrapper = currentTable.closest(".DTFC_ScrollWrapper");
        if (scrollWrapper.length < 1) {
            scrollWrapper = currentTable.closest(".dataTables_wrapper");
        }

        var totalRowHeight = scrollWrapper
            .find(".DTFC_TopBodyWrapper")
            .outerHeight();

        var leftScroll = scrollWrapper.find(".DTFC_LeftBodyLiner table");
        leftScroll.css({
            marginTop: totalRowHeight + "px",
        });
    };
    var filterDelay = null;
    var filterDelayInterval = 250;


    var cloneFixedTopWrapper = function (currentTable, numberRows, numCols) {
        var scrollWrapper = currentTable.closest(".DTFC_ScrollWrapper");
        if (scrollWrapper.length < 1) {
            scrollWrapper = currentTable.closest(".dataTables_wrapper");
        }

        var scrollBody = scrollWrapper
            .find(".dataTables_scroll")
            .find(".dataTables_scrollBody");
        var topWrapper = scrollWrapper.find(".dataTables_scroll").clone();
        var tableScrollHeaderHeight = scrollWrapper
            .find(".dataTables_scrollHead")
            .outerHeight();

        topWrapper.removeClass("dataTables_scroll").addClass("DTFC_TopWrapper");
        topWrapper.css({
            position: "absolute",
            top: tableScrollHeaderHeight + "px",
            left: "0px",
            width: "100%",
            paddingRight: getScrollbarWidth(scrollBody) + "px",
            height: "1px",
        });
        //change scroll head class
        topWrapper
            .find(".dataTables_scrollHead")
            .addClass("DTFC_TopHeadWrapper")
            .removeClass("dataTables_scrollHead")
            .attr("style", "")
            .css({
                position: "relative",
                top: "0",
                left: "0",
                height: "0",
                overflow: "hidden",
            });
        topWrapper
            .find(".DTFC_TopHeadWrapper table")
            .addClass("DTFC_Cloned")
            .unwrap()
            .wrap('<div class="DTFC_TopHeadLiner"></div>');
        topWrapper.find(".DTFC_TopHeadWrapper table thead tr").css({
            height: 0,
        });

        var totalRowHeight = 0;

        var datatableScroll = scrollWrapper.find(".dataTables_scroll");
        var datatableScrollBody = datatableScroll.find(".dataTables_scrollBody");
        var datatableScrollBodyTable = datatableScrollBody.find("table");

        for (var i = 0; i < numberRows; i++) {
            var dataScrollRow = scrollWrapper
                .find(".dataTables_scrollBody table tbody tr")
                .eq(i);
            totalRowHeight += dataScrollRow.outerHeight();
            datatableScrollBodyTable.find("tbody tr").eq(i).addClass("hidden_row");
        }

        topWrapper
            .find(".dataTables_scrollBody")
            .addClass("DTFC_TopBodyWrapper")
            .removeClass("dataTables_scrollBody")
            .attr("style", "")
            .css({
                position: "relative",
                top: "0",
                left: "0",
                height: totalRowHeight + "px",
                overflow: "hidden",
            });
        topWrapper
            .find(".DTFC_TopBodyWrapper table")
            .removeAttr("id")
            .addClass("DTFC_Cloned")
            .wrap('<div class="DTFC_TopBodyLiner"></div>');
        topWrapper.find(".DTFC_TopBodyLiner").css({
            overflowX: "scroll",
        });
        topWrapper.find(".DTFC_TopBodyLiner table thead tr").addClass('hidden_row');
        topWrapper.find(".DTFC_TopBodyLiner table tbody tr.droptable_none").remove();

        topWrapper.appendTo(scrollWrapper);

        //set margin top for original table
        datatableScrollBodyTable.css({
            marginTop: totalRowHeight + "px",
        });

        if (numCols > 0) {
            var topLeftWrapper = scrollWrapper.find(".DTFC_TopWrapper").clone();
            topLeftWrapper
                .addClass("DTFC_TopLeftWrapper")
                .removeClass("DTFC_TopWrapper");

            topLeftWrapper.css({
                padding: 0,
                width: scrollWrapper.find(".DTFC_LeftWrapper").width() + "px",
            });
            topLeftWrapper
                .find(".DTFC_TopBodyLiner")
                .addClass("DTFC_TopLeftBodyLiner")
                .removeClass("DTFC_TopBodyLiner");

            topLeftWrapper.appendTo(scrollWrapper);
        }

        var mainScroll = scrollWrapper.find(".dataTables_scrollBody");
        var topBodyScroll = scrollWrapper.find(".DTFC_TopBodyLiner");
        mainScroll.scroll(function () {
            topBodyScroll.scrollLeft($(this).scrollLeft());
        });
        // initFilterRow(tableDom);
    };

    var calculateHeaderColspanResponsive = function (table, tableDom, colWidths) {
        var header = tableDom.find('thead .row0').eq(0);
        var colspans = [];
        table.columns().every(function (index) {
            var currFirstColWidth = 0;
            var thCol = header.find('th[data-dtc="' + index + '"]');
            var nextColIndexes = [];
            if (thCol.attr('colspan') > 1) {
                var currColIndex = thCol.data('dtc');
                var numberColspan = thCol.attr('colspan');
                colspans.push([currColIndex]);
                nextColIndexes.push(currColIndex);
                for (var i = 0; i < numberColspan; i++) {
                    i++;
                    var nextColIndex = currColIndex + i;
                    nextColIndexes.push(nextColIndex);
                }
            }
        });
    };

    var hideFilterOnResponsive = function (table, tableDom) {
        var filterRow = tableDom.find(".wptm-filter-row");
        table.columns().every(function (index) {
            var thCol = filterRow.find('th[data-dtc="' + index + '"]');
            if (thCol.length < 1) {
                thCol = filterRow.find('th.dtc' + index);
            }
            if (this.responsiveHidden()) {
                thCol.css({display: ""});
            } else {
                thCol.css({display: "none"});
            }
        });
    };

    // UMD
    (function( factory ) {
        "use strict";

        if ( typeof define === 'function' && define.amd ) {
            // AMD
            define( ['jquery'], function ( $ ) {
                return factory( $, window, document );
            } );
        }
        else if ( typeof exports === 'object' ) {
            // CommonJS
            module.exports = function (root, $) {
                if ( ! root ) {
                    root = window;
                }

                if ( ! $ ) {
                    $ = typeof window !== 'undefined' ?
                        require('jquery') :
                        require('jquery')( root );
                }

                return factory( $, root, root.document );
            };
        }
        else {
            // Browser
            factory( jQuery, window, document );
        }
    }
    (function( $, window, document ) {
        $.fn.dataTable.render.moment = function ( from, to, locale ) {
            // Argument shifting
            if ( arguments.length === 1 ) {
                locale = 'en';
                to = from;
                from = 'YYYY-MM-DD';
            }
            else if ( arguments.length === 2 ) {
                locale = 'en';
            }

            return function ( d, type, row ) {
                if (! d) {
                    return type === 'sort' || type === 'type' ? 0 : d;
                }

                var m = window.moment( d, from, locale, true );

                // Order and type get a number value from Moment, everything else
                // sees the rendered value
                return m.format( type === 'sort' || type === 'type' ? 'x' : to );
            };
        };
    }));

    window.wptm_render_tables = function (id_table) {
        var $parent_table = this;
        $(window).resize(function () {
            $(".wptmtable").each(function (index, obj) {
                var wptmtable = $(obj);
                var table_id = wptmtable.data("tableid");

                //check in elementor editor
                if (typeof id_table !== 'undefined' && parseInt(id_table) > 0 && table_id !== 'wptmTbl' + id_table) {
                    return false;
                }

                var currTable = $("#" + table_id);
                var tableWrapper = currTable.closest(".dataTables_wrapper");
                var wptmtable = tableWrapper.parent();

                var colWidths = currTable.data('colwidths');
                var totalWidth = 0;

                if (typeof colWidths !== "undefined") {
                    for (var i = 0; i < colWidths.length; i++) {
                        totalWidth += colWidths[i];
                    }
                }

                if (currTable.data("responsive")) {
                    if (totalWidth > 0) {
                        if (wptmtable.width() >= totalWidth) {
                            tableWrapper.css('width', currTable.data('tablewidth'));
                        } else {
                            tableWrapper.css("width", "100%");
                            currTable.css("width", "100%");
                        }
                    }
                } else {
                    var parent_tableWrapper_width = tableWrapper.parent().width();

                    var scrollBarWidth = 1;
                    if (parent_tableWrapper_width > 0) {
                        if (tableWrapper.width() >= parent_tableWrapper_width) {
                            tableWrapper.css("width", "100%");
                            if (tableWrapper.width() >= currTable.width()) {
                                tableWrapper.css("width", currTable.width());
                            }
                        } else {
                            scrollBarWidth = getScrollbarWidth(
                                // currTable.closest(".dataTables_scroll").find(".dataTables_scrollBody")
                                typeof currTable.data('freezerow') !== 'undefined' ? currTable.closest(".dataTables_scrollBody") : currTable.closest(".dataTables_scroll")
                            );
                            tableWrapper.css("width", currTable.outerWidth() + scrollBarWidth);
                        }
                    } else {//when hidden table container when first load(fix for slide in BEAVER BUILDER)
                        scrollBarWidth = getScrollbarWidth(
                            // currTable.closest(".dataTables_scroll").find(".dataTables_scrollBody")
                            typeof currTable.data('freezerow') !== 'undefined' ? currTable.closest(".dataTables_scrollBody") : currTable.closest(".dataTables_scroll")
                        );

                        tableWrapper.css('width', currTable.data('tablewidth') + scrollBarWidth);
                    }

                    if (tableWrapper.find('.repeatedHeader').length > 0) {
                        var table_breakpoint = tableWrapper.find('.repeatedHeader').data('table-breakpoint');

                        table_breakpoint = parseInt(table_breakpoint) > 0 ? table_breakpoint : 980;

                        if (window.innerWidth <= table_breakpoint) {
                            tableWrapper.find('.repeatedHeader').addClass('repeatedHeaderTrue');
                        } else {
                            tableWrapper.find('.repeatedHeader').removeClass('repeatedHeaderTrue');
                        }
                    }
                }
            });
        });
        var keyupDelay = function (callback, ms) {
            var timer = 0;
            return function() {
                var context = this, args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    callback.apply(context, args);
                }, ms || 0);
            };
        };
        $(document).ready(function () {
            function wptm_render_table(index, obj) {
                var wptmtable = $(obj);
                var table_id = wptmtable.data("tableid");

                //check in elementor editor
                if (typeof id_table !== 'undefined' && parseInt(id_table) > 0 && table_id !== 'wptmTbl' + id_table) {
                    return false;
                }

                if (wptmtable.find('.dataTable').length > 0) {
                    return false;
                }

                var tableOptions = {};
                var tableDom = wptmtable.find("#" + table_id);

                if (!tableDom.length) {
                    return;
                }

                if (typeof tableDom.DataTable === 'undefined') {
                    return false;
                }

                var table_id_num = tableDom.data('id');
                var colWidths = tableDom.data('colwidths');
                tableOptions.totalWidth = 0;
                if (typeof colWidths !== "undefined") {
                    for (var i = 0; i < colWidths.length; i++) {
                        tableOptions.totalWidth += colWidths[i];
                    }
                }

                //tableWrapper, tableDom, tableOptions.totalWidth
                function change_width (tableWrapper, tableDom, totalWidth) {
                    if (!tableDom.data("change_width")) {
                        var parent_tableWrapper_width = tableWrapper.parent().width();

                        if (tableDom.data("responsive")) {
                            if (totalWidth > 0) {
                                if (parent_tableWrapper_width >= totalWidth) {
                                    tableWrapper.css('width', totalWidth + 'px');
                                    tableDom.css('width', '100%');
                                } else {
                                    tableWrapper.css("width", "100%");
                                    tableDom.css("width", "100%");
                                }
                            }
                        } else {
                            var scrollBarWidth = getScrollbarWidth(
                                typeof tableDom.data('freezerow') !== 'undefined' ? tableDom.closest(".dataTables_scrollBody") : tableDom.closest(".dataTables_scroll")
                            );
                            var width_content = 0;
                            if (totalWidth > tableDom.outerWidth()) {
                                width_content = totalWidth;
                            } else {
                                width_content = tableDom.outerWidth();
                            }

                            if (tableWrapper.width() >= parent_tableWrapper_width) {
                                tableWrapper.css("width", "100%");
                                if (tableWrapper.width() >= width_content) {
                                    width_content = width_content + scrollBarWidth;
                                } else {
                                    width_content = tableWrapper.width() + 10;
                                }
                                tableWrapper.css("width", width_content);
                            } else {
                                tableWrapper.css("width", width_content + scrollBarWidth);
                            }

                            //repeated header responsive
                            if (tableWrapper.find('.repeatedHeader').length > 0) {
                                var table_breakpoint = tableWrapper.find('.repeatedHeader').data('table-breakpoint');
                                table_breakpoint = parseInt(table_breakpoint) > 0 ? table_breakpoint : 980;
                                if (window.innerWidth <= table_breakpoint) {
                                    tableWrapper.find('.repeatedHeader').addClass('repeatedHeaderTrue');
                                }
                            }
                        }
                        tableDom.data("change_width", true);
                    }
                }

                tableDom.attr("data-tablewidth", tableDom.width());

                tableOptions.orderCellsTop = false;
                tableOptions.dom = '<"top">rt<"bottom"pl><"clear">';
                var tableLanguage = {};
                if (tableDom.data("hidecols")) {
                    tableOptions.dom = '<"top">Bfrt<"bottom"pl><"clear">';
                    tableOptions.buttons = ["colvis"];
                    tableLanguage.buttons = {colvis: tableDom.data("hidecolslanguage")};
                }
                tableLanguage.lengthMenu =
                    '<select><option value="10">10</option><option value="20">20</option><option value="40">40</option><option value="-1">All</option></select>';

                var pagination_merge_cells = [];

                if (tableDom.data("paging")) {
                    tableOptions.pagingType = "full_numbers";
                    tableOptions.juHideColumn = tableDom.data('hidecolumn');
                    //if (tableDom.data("type") === 'html') {
                    tableOptions.processing = true;
                    tableOptions.serverSide = true;
                    tableOptions.juHideColumnClass = [];
                    tableOptions.juHideColumns = [];
                    if (typeof tableOptions.juHideColumn !== 'undefined' && tableOptions.juHideColumn.length > 0) {
                        var i = 0;
                        for (var j in tableOptions.juHideColumn) {
                            if (tableOptions.juHideColumn[j] > 0) {//hide
                                i++;
                            } else {
                                tableOptions.juHideColumnClass.push(i);
                                tableOptions.juHideColumns[i] = i - tableOptions.juHideColumnClass.length + 1;
                                i++;
                            }
                        }
                    }

                    if (typeof wptm_ajaxurl === "undefined") {
                        wptm_ajaxurl = wptm_data.wptm_ajaxurl;
                    }

                    tableOptions.ajax = {
                        'url': wptm_ajaxurl + 'task=table.loadPage&id=' + table_id_num,
                        'type': 'POST',
                        'dataFilter': function(json){
                            var json = jQuery.parseJSON(json);
                            var data = {};

                            data.recordsTotal = json.data.total;
                            data.recordsFiltered = json.data.filteredTotal;
                            data.data = json.data.rows;
                            data.page = json.data.page;
                            data.draw = json.data.draw;

                            return JSON.stringify(data); // return JSON string
                        }
                    };

                    tableOptions.lengthMenu = [
                        [10, 20, 40, -1],
                        [10, 20, 40, "All"],
                    ];
                    tableLanguage.paginate = {
                        first:
                            "<i class='icon-step-backward glyphicon glyphicon-step-backward'></i>",
                        previous:
                            "<i class='icon-arrow-left glyphicon glyphicon-backward'></i>",
                        next: "<i class='icon-arrow-right glyphicon glyphicon-forward'></i>",
                        last:
                            "<i class='icon-step-forward glyphicon glyphicon-step-forward'></i>",
                    };
                }

                tableOptions.date_format = tableDom.data("format");
                tableLanguage.first_load = true;
                tableLanguage.left_header = -1;

                wptmtable.find('thead tr').each(function (key, value) {
                    $(value).addClass('row_index' + (key - 1)).data('row-index', (key - 1));
                    tableLanguage.left_header++;
                });

                tableOptions.fnDrawCallback = function( oSettings ) {
                    wptm_tooltip();
                    setTimeout(function() {
                        $('.dataTables_wrapper .dataTables_scrollBody thead').hide();
                        $('.DTFC_LeftBodyWrapper thead').hide();
                        if (!tableDom.data("paging")) {
                            oSettings.aiDisplay.forEach(function (value, key) {
                                var data;
                                if (tableLanguage.first_load) {
                                    wptmtable.find("tbody .row" + (value + tableLanguage.left_header))
                                        .addClass('row_index' + (value + tableLanguage.left_header)).data('row-index', (value + tableLanguage.left_header));
                                } else {
                                    data = wptmtable.find("tbody .row" + (value + tableLanguage.left_header)).data('row-index');
                                    wptmtable.find("tbody .row" + (value + tableLanguage.left_header))
                                        .removeClass('row_index' + data).addClass('row_index' + (key + tableLanguage.left_header)).data('row-index', (key + tableLanguage.left_header));
                                }
                                if (oSettings.aiDisplay.length === key + 1) {
                                    tableLanguage.first_load = false;
                                }
                            });
                        }
                    }, 500);
                    if (tableDom.data("paging")) {
                        change_width(tableWrapper, tableDom, tableOptions.totalWidth);
                    }
                };

                tableOptions.createdRow = function( row, data, dataIndex ) {
                    var keys = Object.keys(data);
                    var $cRow;
                    $(row).addClass('row' + data.DT_RowId + ' row_index' + ( dataIndex + tableLanguage.left_header)).data('row-index', ( dataIndex + tableLanguage.left_header));

                    if (typeof data.merges !== 'undefined') {
                        $.each(data.merges, function (key, value) {
                            if (typeof tableOptions.juHideColumns !== 'undefined'
                                && typeof tableOptions.juHideColumns[value[2]] !== 'undefined'
                                && tableOptions.juHideColumns[value[2]] > 0) {
                                value[2] = parseInt(value[2]) - tableOptions.juHideColumns[value[2]];
                            } else {
                            }
                            $(row).find('td:nth-child(' + (1 + parseInt(value[2])) + ')').attr('colspan', value[3]).attr('rowspan', value[1]);
                            //merger rows
                            if (typeof pagination_merge_cells[value[0]] == 'undefined') {
                                pagination_merge_cells[value[0]] = [];
                            }
                            pagination_merge_cells[value[0]][value[2]] = value;
                            var rowspanI = 0;
                            for (rowspanI = 0; rowspanI < parseInt(value[1]); rowspanI++) {
                                if (typeof pagination_merge_cells[parseInt(value[0]) + rowspanI] == 'undefined') {
                                    pagination_merge_cells[parseInt(value[0]) + rowspanI] = [];
                                }
                                pagination_merge_cells[parseInt(value[0]) + rowspanI][value[2]] = value;
                            }
                        });
                    }

                    var ii = 0;
                    keys.forEach(function (key, index) {
                        if (key !== 'merges' && key !== 'DT_RowId' && key !== 'format_date_cell') {
                            $cRow = $(row).find('td:nth-child(' + (parseInt(key) + 1).toString() + ')');
                            if (typeof tableOptions.juHideColumn !== 'undefined') {
                                if (key !== 'DT_RowId') {
                                    if ($cRow.length) {
                                        $cRow.addClass('dtr' + data.DT_RowId).addClass('dtc' + tableOptions.juHideColumnClass[key]);
                                    }
                                }
                            } else {
                                if (key !== 'DT_RowId') {
                                    if ($cRow.length) {
                                        $cRow.addClass('dtr' + data.DT_RowId).addClass('dtc' + key);
                                    }
                                }
                            }

                            if (key !== 'DT_RowId' && typeof data.DT_RowId !== 'undefined' && typeof pagination_merge_cells[data.DT_RowId] !== 'undefined') {//has merger
                                pagination_merge_cells[data.DT_RowId].forEach(function (value, key) {
                                    var colspanI = 0;
                                    for (colspanI = 0; colspanI < parseInt(value[3]); colspanI++) {
                                        if (!(parseInt(value[0]) == data.DT_RowId && colspanI === 0)) {
                                            $(row).find('td:nth-child(' + (1 + parseInt(value[2]) + colspanI) + ')').css('display', 'none');
                                        }
                                    }
                                });
                            }

                            if (typeof $cRow.data('format') !== 'undefined') {
                                if ($cRow.data('format') == '1') {
                                    $cRow.text(moment($cRow.text()).format(tableOptions.date_format));
                                } else if ($cRow.data('format') !== '0') {
                                    $cRow.text(moment($cRow.text()).format($cRow.data('format')));
                                }
                            }

                            if (typeof data.format_date_cell !== 'undefined' && typeof data.format_date_cell[key] !== 'undefined') {
                                if (data.format_date_cell[key] === '1') {
                                    $cRow.text(moment($cRow.text()).format(tableOptions.date_format));
                                } else if (data.format_date_cell[key] !== '0') {
                                    $cRow.text(moment($cRow.text()).format(data.format_date_cell[key]));
                                }
                            }
                        }
                        ii++;
                    });
                };

                tableOptions.fnInitComplete = function( settings, json ) {
                    setTimeout(function() {
                        $('.dataTables_wrapper .dataTables_scrollBody thead').hide();
                        $('.DTFC_LeftBodyWrapper thead').hide();
                    }, 500);
                };
                tableOptions.language = tableLanguage;

                var initFilterRow = function(tableDom) {
                    // Apply the search
                    if (tableDom.hasClass("filterable")) {
                        addFilterRowToTable(tableDom);
                    }
                };
                var addFilterRowToTable = function(tbl) {
                    // Add an input to latest th in header
                    tbl.find("thead tr:not(.wptm-header-cells-index):last-child th").each(function(i) {
                        var thContent = $(this).html();
                        var inputHtml = '<br><input onClick="var event = arguments[0] || window.event;event.stopPropagation();" type="text" name="wtmp_col_filter" class="wptm-d-block wptm-filter-input stop-propagation" data-index="' + i + '" value="" />';
                        $(this).html(thContent + inputHtml);
                    });
                };

                if (tableDom.data("ordering")) {
                    tableOptions.ordering = true;
                    var dataOrder = [];
                    dataOrder.push(tableDom.data("ordertarget"));
                    dataOrder.push(tableDom.data("ordervalue"));
                    tableOptions.order = dataOrder;
                }

                initFilterRow($(tableDom));

                var table = tableDom.DataTable(tableOptions);

                // tableDom.scroller.toPosition( 40 );

                $(table.table().container()).on('keyup change', 'input.wptm-filter-input', function (e)
                {
                    e.stopPropagation();
                    columnFilter(table, $(this).data('index'), $(this).val());
                });

                if (typeof tableDom.data("freezecol") !== "undefined") {
                    new $.fn.dataTable.FixedColumns(table, {
                        leftColumns: tableDom.data("freezecol"),
                    });
                }

                var columnFilter = function (table, columnIndex, val) {
                    if (table.column(columnIndex).search() !== val) {
                        window.clearTimeout(filterDelay);
                        filterDelay = window.setTimeout(function() {
                            table.column(columnIndex).search(val).draw();
                        }, filterDelayInterval);
                    }
                };

                if (tableDom.data("responsive") === true) {
                    if ($(".wptm-filter-row").length > 0) {
                        hideFilterOnResponsive(table, tableDom);
                    }
                    //calculateHeaderColspanResponsive(table, tableDom, colWidths);
                    table.on("responsive-resize", function () {
                        if ($(".wptm-filter-row").length > 0) {
                            hideFilterOnResponsive(table, tableDom);
                        }
                    });
                }

                // Change div table wrapper width
                var tableWrapper = tableDom.closest(".dataTables_wrapper");
                var tableAlign = tableDom.data("align");
                var margin = "0 0 0 auto";
                if (tableAlign === "center") {
                    margin = "0 auto";
                } else if (tableAlign === "left") {
                    margin = "0 auto 0 0";
                }
                tableWrapper.css("margin", margin);

                if (!tableDom.data("paging")) {
                    change_width (tableWrapper, tableDom, tableOptions.totalWidth);
                }

                //fix height for before td in repeatedHeader
                if (tableWrapper.find('.repeatedHeader').length > 0) {

                }

                // if (typeof tableDom.data("freezerow") !== "undefined") {
                //     var numRow = tableDom.data("freezerow") - 1;
                //     var numCol =
                //         typeof tableDom.data("freezecol") !== "undefined"
                //             ? tableDom.data("freezecol")
                //             : 0;
                //     if (numRow > 0) {
                //         cloneFixedTopWrapper(tableDom, numRow, numCol);
                //     }
                // }

                table.rows(".hidden_row").remove().draw();

                // if (numCol > 0) {
                //     addMarginTopToFixedColumn(tableDom, numRow);
                // }

                // table.on("draw.dt", function () {
                //     addMarginTopToFixedColumn(tableDom, numRow);
                // });

                if (!tableDom.data("paging")) {
                    tableDom
                        .closest(".wptmtable")
                        .find(".dataTables_info")
                        .css("display", "none");
                }

                var hightLight = tableDom.closest(".wptm_table").data("hightlight");
                if (typeof hightLight === "undefined") {
                    hightLight = tableDom.closest(".wptm_dbtable").data("highlight");
                }
                var classHightLight = "droptables-highlight-vertical";
                if (hightLight === 1) {
                    table.on("mouseenter", "td", function () {
                        if (typeof table.cell(this).index() !== "undefined") {
                            var colIdx = table.cell(this).index().column;
                            var rowIdx = table.cell(this).index().row;
                            var affectedRow = 0;
                            var affectedCol = table.cell(this).index().column;

                            $(table.cells().nodes()).removeClass(
                                "droptables-highlight-vertical"
                            );
                            $(table.column(colIdx).nodes()).addClass(
                                "droptables-highlight-vertical"
                            );

                            table.row(rowIdx).every(function () {
                                var row = $(this.node());
                                row.find("td").addClass("droptables-highlight-vertical");
                                affectedRow = row.find("td").data("dtr");
                            });
                            var leftWrapperTable = tableDom
                                .closest(".dataTables_wrapper")
                                .find(".DTFC_LeftBodyLiner table");
                            var topWrapperTable = tableDom
                                .closest(".dataTables_wrapper")
                                .find(".DTFC_TopBodyLiner table");
                            if (leftWrapperTable.length > 0) {
                                leftWrapperTable.find("td").removeClass(classHightLight);
                                leftWrapperTable
                                    .find(".dtr" + affectedRow)
                                    .addClass(classHightLight);
                            }
                            if (topWrapperTable.length > 0) {
                                topWrapperTable.find("td").removeClass(classHightLight);
                                topWrapperTable
                                    .find(".dtc" + affectedCol)
                                    .addClass(classHightLight);
                            }
                        }
                    });
                    table.on("mouseleave", "td", function () {
                        if (typeof table.cell(this).index() !== "undefined") {
                            $(table.cells().nodes()).removeClass(
                                "droptables-highlight-vertical"
                            );

                            var leftWrapperTable = tableDom
                                .closest(".dataTables_wrapper")
                                .find(".DTFC_LeftBodyLiner table");
                            var topWrapperTable = tableDom
                                .closest(".dataTables_wrapper")
                                .find(".DTFC_TopBodyLiner table");
                            if (leftWrapperTable.length > 0) {
                                leftWrapperTable.find("td").removeClass(classHightLight);
                            }
                            if (topWrapperTable.length > 0) {
                                topWrapperTable.find("td").removeClass(classHightLight);
                            }
                        }
                    });
                }

                /*if table not  content*/
                if (tableDom.find('td.dataTables_empty').length > 0) {
                    tableDom.css({width: '95%'});
                }
            }
            if (typeof id_table !== 'undefined') {
                wptm_render_table(1, $parent_table.find("#wptmtable" + id_table + ".wptmtable"));
            } else {
                $(".wptmtable").each(function (index, obj) {
                    wptm_render_table(index, obj);
                });
            }

            setTimeout(function () {
                wptm_tooltip();
            }, 100);

            function wptm_tooltip() {
                $(".wptm_tooltip ").each(function () {
                    var that = $(this);
                    $(that).tipso({
                        useTitle: false,
                        tooltipHover: true,
                        background: "#000000",
                        color: "#ffffff",
                        offsetY: 0,
                        width: $(that).find(".wptm_tooltipcontent").data("width"),
                        content: $(that).find(".wptm_tooltipcontent").html(),
                        onShow: function (ele, tipso, obj) {
                            //calculate top tipso_bubble when set width
                            var size = realHeight(obj.tooltip());
                            $(obj.tipso_bubble[0]).css(
                                "top",
                                obj.tipso_bubble[0].offsetTop +
                                (size.height - obj.tipso_bubble.outerHeight())
                            );
                        },
                    });
                });

                function realHeight(obj) {
                    var clone = obj.clone();
                    clone.css("visibility", "hidden");
                    $("body").append(clone);
                    var height = clone.outerHeight();
                    var width = clone.outerWidth();
                    clone.remove();
                    return {
                        width: width,
                        height: height,
                    };
                }
            }

            $(".wptm_table .download_wptm")
                .unbind("click")
                .click(function () {
                    var id_table = $(this).parents(".wptm_table").data("id");
                    var url =
                        $(this).data("href") +
                        "task=sitecontrol.export&id=" +
                        id_table +
                        "&format_excel=xlsx&onlydata=0";
                    $.fileDownload(url, {
                        failCallback: function (html, url) {
                        },
                    });
                });
        });
    }
    window.wptm_render_tables.call();
})(jQuery);
