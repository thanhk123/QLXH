<?php
/**
 * WP Table Manager
 *
 * @package WP Table Manager
 * @author  Joomunited
 * @version 1.0
 */

use http\Encoding\Stream\Inflate;
use Joomunited\WPFramework\v1_0_5\Controller;
use Joomunited\WPFramework\v1_0_5\Utilities;
use Joomunited\WPFramework\v1_0_5\Model;
use Joomunited\WPFramework\v1_0_5\Application;

defined('ABSPATH') || die();

/**
 * Class WptmControllerExcel
 */
class WptmControllerTable extends Controller
{
    /**
     * Get table html raw
     *
     * @return void
     */
    public function loadContent()
    {
        global $wpdb;
        $id = Utilities::getInt('id', 'GET');
        $content = '';
        $return = array();

        if ((int)$id > 0) {
            Application::getInstance('Wptm');
            require_once plugin_dir_path(WPTM_PLUGIN_FILE) . 'app/site/filters.php';
            $WptmFilter = new \WptmFilter();

            $content = $WptmFilter->replaceTable($id, true);

            $return = array(
                'content' => $content['content'],
                'title' => $content['name'],
            );
        }

        wp_send_json_success($return);
        die;
    }
    /**
     * Get chart html raw
     *
     * @return void
     */
    public function loadContentChart()
    {
        global $wpdb;
        $id = Utilities::getInt('id', 'GET');
        $content = '';
        $return = array();

        if ((int)$id > 0) {
            Application::getInstance('Wptm');
            require_once plugin_dir_path(WPTM_PLUGIN_FILE) . 'app/site/filters.php';
            $WptmFilter = new \WptmFilter();

            $content = $WptmFilter->replaceChart($id, true);

            $return = array(
                'content' => $content['content'],
                'title' => $content['name'],
                'contentJs' => $content['js'],
            );
        }

        wp_send_json_success($return);
        die;
    }

    /**
     * Get data for pagination ajax
     *
     * @param null|integer $id Table id
     *
     * @return void
     */
    public function loadPage($id = null)
    {
        global $wpdb;
        $method = 'POST'; // You can change to post for more beautiful ajax url
        if (is_null($id)) {
            $id = Utilities::getInt('id', 'GET');
        }
        $start = Utilities::getInt('start', $method);
        $limit = Utilities::getInt('length', $method);
        $columns = Utilities::getInput('columns', $method, 'none');
        $orders = Utilities::getInput('order', $method, 'none');
        $draw = Utilities::getInt('draw', $method);
        if ($start === 0) {
            $page = 1;
        } else {
            $page = ($start / $limit) + 1;
        }

        if ($page <= 0) {
            $page = 1;
        }
        Application::getInstance('Wptm');
        /* @var WptmModelTable $tableModel */
        $tableModel = $this->getModel('table');
        /* @var WptmModelDbtable $dbTableModel */
        $dbTableModel = $this->getModel('dbtable');
//        $table_name = $wpdb->prefix . 'wptm_tables';

//        $item = $wpdb->get_row($wpdb->prepare('SELECT c.* FROM ' . $table_name . ' as c WHERE c.id = %d', (int)$id), OBJECT);
//        $params = json_decode($item->params);

        $table = $tableModel->getItem($id, false, true, null, true);
        $params = $table->style->table;
        $cellsStyle = $table->style->cells;
        $columnsStyle = $table->style->cols;
        $has_hide_column = false;
        $filters = array();

        if (isset($columnsStyle)) {
            $hide_columns = array();
            $filters['hide_columns'] = array();
            foreach ($columnsStyle as $key => $item) {
                if (!empty($item)) {
                    $firstCol = is_object($item) ? $item->{1} : $item[1];
                    if (!empty($firstCol->hide_column) && (int)$firstCol->hide_column === 1) {
                        $hide_columns[] = (int)$key;
                        $filters['hide_columns'][] = 1;
                        $has_hide_column = true;
                    } else {
                        $filters['hide_columns'][] = 0;
                    }
                }
            }
        }

        $headerOffset = isset($params->headerOption) ? intval($params->headerOption) : 0;
        $header_data = isset($params->header_data) ? $params->header_data : null;

        $filters['page'] = $page;
        $filters['limit'] = $limit;
        $filters['headerOffset'] = $headerOffset;
        $filters['getLine'] = true;
        $filters['where'] = $columns;
        $filters['order'] = $orders;

        if ($table->type === 'mysql') {
            require_once plugin_dir_path(WPTM_PLUGIN_FILE) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'admin' . DIRECTORY_SEPARATOR . 'models' . DIRECTORY_SEPARATOR . 'dbtable.php';
            $modelDbTable = new WptmModelDbtable();

            $query_option = $modelDbTable->getQueryOption($id);
            $query_option = json_decode($query_option->params);//object

            if (is_object($params) && is_string($table->params)) {
                $params = json_decode($table->params, true);
            } elseif (!is_array($params)) {
                $params = json_decode(json_encode($table->params), true);
            }
            // Prepare $filters for filter and sorting in database table
            $query = $table->mysql_query;

            $queries = $this->regenerateQueryForAjax($query, $filters, $query_option);
            $datas = $dbTableModel->getTableData($queries[0]);

            $datas = array_map('array_values', $datas);
            $totalRows = intval($wpdb->get_var($queries[1]));
            $totalFilteredRows = $totalRows;
        } else {
            $totalRows = $tableModel->countRows($id, $table);
            $totalFilteredRows = $totalRows;
            // Where
            $where = array();
            $whereStr = '';
            if (is_array($columns) && count($columns)) {
                foreach ($columns as $index => $column) {
                    /*
                     * columns[$index][data]: 0
                     * columns[$index][name]:
                     * columns[$index][searchable]: true
                     * columns[$index][orderable]: false
                     * columns[$index][search][value]:
                     * columns[$index][search][regex]: false
                     */
                    if (isset($column['searchable']) && $column['searchable'] && isset($column['search']['value']) && $column['search']['value'] !== '') {
                        for ($i = 0; $i < $column['data'] + 1; $i++) {
                            if (isset($filters['hide_columns'][$i]) && $filters['hide_columns'][$i] === 1) {
                                $column['data']++;
                            }
                        }
                        $where[] = ' col' . esc_html($column['data'] + 1) . ' LIKE \'%' . esc_html($column['search']['value']) . '%\'';
                    }
                }
                if (count($where) > 0) {
                    $whereStr .= implode(' AND', $where);
                    $totalFilteredRows = $tableModel->countFilterRows($id, $whereStr);
                }
            }

            // Order
            $order = array();
            $orderStr = '';
            if (is_array($orders) && count($orders)) {
                foreach ($orders as $index => $ord) {
                    /*
                     * order[0][column]: 0
                     * order[0][dir]: desc
                     * order[1][column]: 1
                     * order[1][dir]: asc
                     * order[$index][column]: 2
                     * order[$index][dir]: asc
                     */
                    $column_position = intval($ord['column']) + 1;
                    for ($i = 0; $i < $column_position; $i++) {
                        if (isset($filters['hide_columns'][$i]) && $filters['hide_columns'][$i] === 1) {
                            $column_position++;
                        }
                    }
                    $order[] = ' col' . esc_html($column_position) . ' ' . strtoupper($ord['dir']);
                }
                if (count($order) > 0) {
                    $orderStr .= implode(' ,', $order);
                }
            }
            $filters['where'] = $whereStr;
            $filters['order'] = $orderStr;
            $isFilter = $whereStr === '' ? false : true;
            $datas = $tableModel->getTableData($table->mysql_table_name, $filters);
        }

        $newDatas = array();
        $startId = ($page - 1) * $limit;
        if ($page === 1) {
            $startId += $headerOffset;
        }

        if (is_array($datas) && count($datas) > 0) {
            //merge cells
            if (isset($params->mergeSetting)) {
                $mergeSetting = is_string($params->mergeSetting) ? json_decode($params->mergeSetting, true) : $params->mergeSetting;
                $keyMergeSetting = array();
                $count = count($mergeSetting);
                for ($i = 0; $i < $count; $i ++) {
                    $keyMergeSetting[$mergeSetting[$i]['row'] . '!' . $mergeSetting[$i]['col']] = array($mergeSetting[$i]['row'], $mergeSetting[$i]['rowspan'], $mergeSetting[$i]['col'], $mergeSetting[$i]['colspan']);
                }
            }
            require_once dirname(WPTM_PLUGIN_FILE) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'site' . DIRECTORY_SEPARATOR . 'helpers' . DIRECTORY_SEPARATOR . 'wptmHelper.php';
            $wptmHelper = new WptmHelper();
            // Setup some params for wptm helper
            $wptmHelper->setup($params);

            $reGetDataCells = array();
            $reGetDataCells['col'] = array();
            $reGetDataCells['row'] = array();

            $cellReGetDatas = array();

            if ($header_data === null) {
                $numberCol = count($datas[0]);
                if ($numberCol <= 0) {
                    $num = 1;
                } else {
                    $num = $numberCol - 1;
                }
                $valueRow = array_fill(0, $num, '');
                if ($headerOffset <= 0) {
                    $num = 1;
                } else {
                    $num = $headerOffset - 1;
                }
                $header_data = array_fill(0, $num, $valueRow);
            }

            $count = count($datas) + $headerOffset;//number item in pagination + header

            $fullData = array();
            for ($i = 0; $i < $count; $i++) {
                if ($i < $headerOffset) {
                    $fullData[$i] = $header_data[$i];
                } else {
                    $key = isset($datas[$i - $headerOffset]['DT_RowId']) ? $datas[$i - $headerOffset]['DT_RowId'] : $startId + $i;
                    $fullData[$key] = $datas[$i - $headerOffset];
                }
            }
            require_once dirname(WPTM_PLUGIN_FILE) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'admin' . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'phpspreadsheet' . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';

            $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
            $activeSheet = $spreadsheet->createSheet(1);
            $maxRows = count($datas);
            $activeSheet->fromArray($wptmHelper->renderValueCalculateCell($datas, $maxRows), null, 'A1');

            //hyperlink cells
            //hyperlink cells
            if (isset($params->hyperlink) && is_string($params->hyperlink)) {
                $tableHyperlink = json_decode($params->hyperlink);
            } elseif (!isset($params->hyperlink)) {
                $tableHyperlink = new stdClass();
            } else {
                $tableHyperlink = $params->hyperlink;
            }

            foreach ($datas as $key => $row) {
                $newRow = array();
                $newRow['DT_RowId'] = isset($row['DT_RowId']) ? $row['DT_RowId'] : $startId + intval($key);
                // Remove header value
                if (intval($newRow['DT_RowId']) === 0 && !$isFilter) {
                    continue;
                }
                if ($newRow['DT_RowId'] >= $headerOffset) {
                    foreach ($row as $k => $v) {
                        $dataGetFormatCell =  $this->getFormatCell($wptmHelper, $cellsStyle, $newRow['DT_RowId'], $k);
                        $wptmHelper = $dataGetFormatCell[0];
                        $tblStyle = $dataGetFormatCell[1];
                        $has_format_cell = $dataGetFormatCell[2];
                        $newRow['format_date_cell'][$k] = $dataGetFormatCell[3];

                        // Caculate functions
                        if (isset($v[0]) && $v[0] === '=') {
                            $position = array();
                            $position[] = $wptmHelper->getNameFromNumber($k);
                            $position[] = $key + 1;
                            if (preg_match('@^=(DATE|DAY|DAYS|DAYS360|AND|OR|XOR|SUM|MULTIPLY|DIVIDE|COUNT|MIN|MAX|AVG|CONCAT|date|day|days|days360|and|or|xor|sum|multiply|divide|count|min|max|avg|concat)\\((.*?)\\)$@', $v, $matches)) {
                                $calculaterCell = $wptmHelper->calculaterCell2($fullData, $matches, $activeSheet, $position);
                            } else {
                                $calculaterCell = $v;
                            }

                            if (is_array($calculaterCell) && $calculaterCell[0] === 'date') {
                                if ($newRow['format_date_cell'][$k] === '0') {
                                    $newRow['format_date_cell'][$k] = '1';
                                }
                                $calculaterCell = $calculaterCell[1];
                            }
                            if (is_array($calculaterCell)) {
                                $cellReGetDatas[] = array(count($newDatas), $k, $newRow['DT_RowId']);
                                $count = count($calculaterCell['col']);
                                for ($i = 0; $i < $count; $i++) {
                                    if (!in_array($calculaterCell['col'][$i], $reGetDataCells['col'])) {
                                        $reGetDataCells['col'][] = $calculaterCell['col'][$i];
                                    }
                                }
                                $count = count($calculaterCell['row']);
                                for ($i = 0; $i < $count; $i++) {
                                    if (!in_array($calculaterCell['row'][$i], $reGetDataCells['row'])) {
                                        $reGetDataCells['row'][] = $calculaterCell['row'][$i];
                                    }
                                }
                            } else {
                                $newRow[$k] = $calculaterCell;
                            }
                        } else {
                            if (isset($newRow['format_date_cell'][$k]) && $newRow['format_date_cell'][$k] === '0' && $has_format_cell) {
                                $col1 = preg_replace('/[-|0-9|,|\.|' . $wptmHelper::$currency_symbol_cell . '| ]/', '', $v);
                                if ($col1 === '') {
                                    $v = preg_replace('/[' . $wptmHelper::$currency_symbol_cell . '| ]/', '', $v);
                                    $v = number_format(floatval($v), $wptmHelper::$decimal_count_cell, $wptmHelper::$decimal_symbol_cell, $wptmHelper::$thousand_symbol_cell);
                                }
                                if (isset($tblStyle['currency_symbol']) && $tblStyle['currency_symbol'] !== '' && $col1 === '') {
                                    $v = ((int) $wptmHelper::$symbol_position_cell === 0) ? $wptmHelper::$currency_symbol_cell . ' ' . $v : $v . ' ' . $wptmHelper::$currency_symbol_cell;
                                }
                            }
                        }

                        $v = do_shortcode($v);
                        if (!empty($tblStyle['tooltip_content'])) {
                            if (!empty($tblStyle['tooltip_width']) && (int)$tblStyle['tooltip_width'] > 0) {
                                $newRow[$k] = '<span class="wptm_tooltip ">' . (!empty($newRow[$k]) ? $newRow[$k] : $v) . '<span class="wptm_tooltipcontent" data-width="' . $tblStyle['tooltip_width'] . '">' . $tblStyle['tooltip_content'] . '</span></span>';
                            } else {
                                $newRow[$k] = '<span class="wptm_tooltip ">' . (!empty($newRow[$k]) ? $newRow[$k] : $v) . '<span class="wptm_tooltipcontent">' . $tblStyle['tooltip_content'] . '</span></span>';
                            }
                        } else {
                            $newRow[$k] = isset($newRow[$k]) ? $newRow[$k] : $v;
                        }

//                        if (!empty($cellsStyle[$newRow['DT_RowId'] . '!' . $k]) && !empty($cellsStyle[$newRow['DT_RowId'] . '!' . $k][2]['tooltip_content'])) {
//                            if (!empty($cellsStyle[$newRow['DT_RowId'] . '!' . $k][2]['tooltip_width']) && (int)$cellsStyle[$newRow['DT_RowId'] . '!' . $k][2]['tooltip_width'] > 0) {
//                                $newRow[$k] = '<span class="wptm_tooltip ">' . $v . '<span class="wptm_tooltipcontent" data-width="' . $cellsStyle[$newRow['DT_RowId'] . '!' . $k][2]['tooltip_width'] . '">' . $cellsStyle[$newRow['DT_RowId'] . '!' . $k][2]['tooltip_content'] . '</span></span>';
//                            } else {
//                                $newRow[$k] = '<span class="wptm_tooltip ">' . $v . '<span class="wptm_tooltipcontent">' . $cellsStyle[$newRow['DT_RowId'] . '!' . $k][2]['tooltip_content'] . '</span></span>';
//                            }
//                        } else {
//                            $newRow[$k] = $v;
//                        }

                        //merge cells
                        if (isset($keyMergeSetting) && isset($keyMergeSetting[$newRow['DT_RowId'] . '!' . $k])) {
                            if (empty($newRow['merges'])) {
                                $newRow['merges'] = array();
                            }
                            $newRow['merges'][$k] = $keyMergeSetting[$newRow['DT_RowId'] . '!' . $k];
                        }

                        if (isset($tableHyperlink->{$newRow['DT_RowId'] . '!' . $k})) {
                            $newRow[$k] = '<a target="_blank" href="' . $tableHyperlink->{$newRow['DT_RowId'] . '!' . $k}->hyperlink . '">' . $newRow[$k] . '</a>';
                        }
                    }

                    $newDatas[] = $newRow;
                }
            }

            if (count($cellReGetDatas) > 0) {
                if ($table->type === 'html') {
                    $filters = array(
                        'where' => 'line IN (' . implode(',', $reGetDataCells['row']) . ')',
                        'limit' => -1,
                        'headerOffset' => 0,
                        'cols' => $reGetDataCells['col'],
                    );

                    $DataCells = $tableModel->getTableData($table->mysql_table_name, $filters);

                    foreach ($DataCells as $DataCell) {
                        if (!isset($fullData[$DataCell[0]])) {//line data not exist
                            $fullData[$DataCell[0]] = array();
                        }
                        foreach ($DataCell as $keyCol => $Data) {
                            if ($keyCol > 0) {
                                $Data = do_shortcode($Data);
                                $fullData[$DataCell[0]][$reGetDataCells['col'][$keyCol - 1]] = $Data;
                            }
                        }
                    }

                    foreach ($cellReGetDatas as $cellReGetData) {
                        $dataGetFormatCell =  $this->getFormatCell($wptmHelper, $cellsStyle, $cellReGetData[2], $cellReGetData[1]);
                        $wptmHelper = $dataGetFormatCell[0];
                        $tblStyle = $dataGetFormatCell[1];
                        $has_format_cell = $dataGetFormatCell[2];
                        $newRow['format_date_cell'][$cellReGetData[1]] = $dataGetFormatCell[3];

                        if (preg_match('@^=(DATE|DAY|DAYS|DAYS360|AND|OR|XOR|SUM|MULTIPLY|DIVIDE|COUNT|MIN|MAX|AVG|CONCAT|date|day|days|days360|and|or|xor|sum|multiply|divide|count|min|max|avg|concat)\\((.*?)\\)$@', $newDatas[$cellReGetData[0]][$cellReGetData[1]], $matches)) {
                            $position = array();
                            $position[] = $wptmHelper->getNameFromNumber($cellReGetData[1]);
                            $position[] = $cellReGetData[0] + 1;
                            $newDatas[$cellReGetData[0]][$cellReGetData[1]] = $wptmHelper->calculaterCell2($fullData, $matches, $activeSheet, $position);
                        } elseif ($has_format_cell) {
                            $cell_value = $newDatas[$cellReGetData[0]][$cellReGetData[1]];
                            $col1 = preg_replace('/[-|0-9|,|\.|' . $wptmHelper::$currency_symbol_cell . '| ]/', '', $cell_value);

                            $cell_value = preg_replace('/[' . $wptmHelper::$thousand_symbol_cell . '| ]/', '', $cell_value);
                            $cell_value = preg_replace('/[' . $wptmHelper::$decimal_symbol_cell . '| ]/', '.', $cell_value);
                            if ($col1 === '') {
                                $cell_value = preg_replace('/[' . $wptmHelper::$currency_symbol_cell . '| ]/', '', $cell_value);
                                $cell_value = number_format(floatval($cell_value), $wptmHelper::$decimal_count_cell, $wptmHelper::$decimal_symbol_cell, $wptmHelper::$thousand_symbol_cell);
                            }

                            if (isset($tblStyle['currency_symbol']) && $tblStyle['currency_symbol'] !== '' && $col1 === '') {
                                $cell_value = ((int) $wptmHelper::$symbol_position_cell === 0) ? $wptmHelper::$currency_symbol_cell . ' ' . $cell_value : $cell_value . ' ' . $wptmHelper::$currency_symbol_cell;
                            }
                            $newDatas[$cellReGetData[0]][$cellReGetData[1]] = $cell_value;
                        }
                    }
                }
            }
        }

        //hide columns
        if ($has_hide_column) {
            $count = count($newDatas);
            for ($i = 0; $i < $count; $i++) {
                $val_row = $newDatas[$i];
                if (isset($newDatas[$i]['format_date_cell'])) {
                    unset($newDatas[$i]['format_date_cell']);
                }
                if (isset($newDatas[$i]['DT_RowId'])) {
                    unset($newDatas[$i]['DT_RowId']);
                }
                if (isset($newDatas[$i]['merges'])) {
                    unset($newDatas[$i]['merges']);
                }
                $j = 0;

                foreach ($hide_columns as $hide_column) {
                    array_splice($newDatas[$i], $hide_column - $j, 1);
                    $j++;
                }

                if (isset($val_row['format_date_cell'])) {
                    $newDatas[$i]['format_date_cell'] = $val_row['format_date_cell'];
                }
                if (isset($val_row['DT_RowId'])) {
                    $newDatas[$i]['DT_RowId'] = $val_row['DT_RowId'];
                }
                if (isset($val_row['merges'])) {
                    $newDatas[$i]['merges'] = $val_row['merges'];
                }
            }
        }

        $return = array(
            'draw' => $draw,
            'rows' => $newDatas,
            'page' => $page,
            'total' => intval($totalRows),
            'filteredTotal' => intval($totalFilteredRows),
        );
        wp_send_json_success($return);
        die;
    }

    /**
     * Get cell format
     *
     * @param object $wptmHelper Class wptmHelper
     * @param array  $cellsStyle Cell style
     * @param string $row        Row index
     * @param string $col        ACol index
     *
     * @return array
     */
    public function getFormatCell($wptmHelper, $cellsStyle, $row, $col)
    {
        $format_date_cell = '0';
        $tblStyle = !empty($cellsStyle[$row . '!' . $col]) ? $cellsStyle[$row . '!' . $col][2] : array();
        if ((isset($tblStyle['decimal_count']) && $tblStyle['decimal_count'] !== false) || (isset($tblStyle['decimal_count_second']) && $tblStyle['decimal_count_second'] !== false)
            || (isset($tblStyle['decimal_symbol']) && $tblStyle['decimal_symbol'] !== false) || (isset($tblStyle['decimal_symbol_second']) && $tblStyle['decimal_symbol_second'] !== false)
            || (isset($tblStyle['currency_symbol']) && $tblStyle['currency_symbol'] !== false) || (isset($tblStyle['currency_symbol_second']) && $tblStyle['currency_symbol_second'] !== false)
        ) {
            $wptmHelper::$thousand_symbol_cell = (isset($tblStyle['thousand_symbol']) && $tblStyle['thousand_symbol'] !== false) ? $tblStyle['thousand_symbol'] : ((isset($tblStyle['thousand_symbol_second']) && $tblStyle['thousand_symbol_second'] !== false) ? $tblStyle['thousand_symbol_second'] : $wptmHelper->thousand_symbol);
            $wptmHelper::$decimal_count_cell = (isset($tblStyle['decimal_count']) && $tblStyle['decimal_count'] !== false) ? $tblStyle['decimal_count'] : ((isset($tblStyle['decimal_count_second']) && $tblStyle['decimal_count_second'] !== false) ? $tblStyle['decimal_count_second'] : $wptmHelper->decimal_count);
            $wptmHelper::$decimal_symbol_cell = (isset($tblStyle['decimal_symbol']) && $tblStyle['decimal_symbol'] !== false) ? $tblStyle['decimal_symbol'] : ((isset($tblStyle['decimal_symbol_second']) && $tblStyle['decimal_symbol_second'] !== false) ? $tblStyle['decimal_symbol_second'] : $wptmHelper->decimal_symbol);
            $wptmHelper::$currency_symbol_cell = (isset($tblStyle['currency_symbol']) && $tblStyle['currency_symbol'] !== false) ? $tblStyle['currency_symbol'] : ((isset($tblStyle['currency_symbol_second']) && $tblStyle['currency_symbol_second'] !== false) ? $tblStyle['currency_symbol_second'] : $wptmHelper->currency_symbol);
            $wptmHelper::$symbol_position_cell = (isset($tblStyle['symbol_position']) && $tblStyle['symbol_position'] !== false) ? $tblStyle['symbol_position'] : ((isset($tblStyle['symbol_position_second']) && $tblStyle['symbol_position_second'] !== false) ? $tblStyle['symbol_position_second'] : $wptmHelper->symbol_position);
            $has_format_cell = true;
        } else {
            $wptmHelper::$thousand_symbol_cell = null;
            $wptmHelper::$decimal_count_cell = null;
            $wptmHelper::$decimal_symbol_cell = null;
            $wptmHelper::$currency_symbol_cell = null;
            $wptmHelper::$symbol_position_cell = null;
            $has_format_cell = false;
        }
        if ($col !== 'DT_RowId') {
            if (isset($tblStyle['date_formats_momentjs']) && $tblStyle['date_formats_momentjs'] !== '' && $tblStyle['date_formats_momentjs'] !== false) {
                $format_date_cell = '' . $tblStyle['date_formats_momentjs'];
            } else {
                $format_date_cell = '0';
            }
        }
        return array($wptmHelper, $tblStyle, $has_format_cell, $format_date_cell);
    }

    /**
     * Regenerate query for ajax
     *
     * @param array  $queryDatas   Get data query
     * @param array  $filters      Filter
     * @param object $query_option Query option
     *
     * @return string|array
     */
    public function regenerateQueryForAjax($queryDatas, $filters, $query_option)
    {
        $folder_admin = dirname(WPTM_PLUGIN_FILE) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'admin';
        require_once $folder_admin . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'php-sql-parser' . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';
        $parser = new \PHPSQLParser\PHPSQLParser(false, true);
        $creator = new \PHPSQLParser\PHPSQLCreator();

        $queryDatas = str_replace(array("\n\r", "\r\n", "\n", "\r", '&#10;'), ' ', $queryDatas);
        $queryDatas = str_replace('\\', '', $queryDatas);
        $parserMysql = $parser->parse($queryDatas, true);

        $columnsCount = isset($parserMysql['SELECT'])
            ? count($parserMysql['SELECT'])
            : (isset($parserMysql['select'])
                ? count($parserMysql['select'])
                : (isset($filters['hide_columns']) && count($filters['hide_columns']) > 0
                    ? count($filters['hide_columns'])
                    : count($filters['where'])
                )
            );

        //page and limit
        $offset = 0;
        $limit = isset($filters['limit']) ? $filters['limit'] : -1;
        $page = isset($filters['page']) ? $filters['page'] : 1;
        $headerOffset = isset($filters['headerOffset']) ? $filters['headerOffset'] : 1;

        $table_alias = isset($query_option->table_alias) ? $query_option->table_alias : array();

        //where
        // Build Where query part
        if (is_array($filters['where']) && count($filters['where']) > 0) {
            for ($i = 0; $i < $columnsCount; $i++) {//all columns in table
                if (!(isset($filters['hide_columns'][$i]) && (int)$filters['hide_columns'][$i] === 1)
                    && !(isset($query_option->column_options) && !isset($query_option->column_options[$i]))) {
                    if (isset($filters['hide_columns'])) {
                        $j2 = $i;
                        for ($ii = 0; $ii < $i; $ii++) {
                            if (isset($filters['hide_columns'][$ii]) && $filters['hide_columns'][$ii] === 1) {
                                $j2--;
                            }
                        }
                    }

                    if (isset($filters['where'][$j2]['search']['value']) && $filters['where'][$j2]['search']['value'] !== '') {
                        if (empty($parserMysql['WHERE'])) {
                            $parserMysql['WHERE'] = array();
                        }
                        if (!empty($parserMysql['WHERE']) && count($parserMysql['WHERE']) > 0) {
                            array_push(
                                $parserMysql['WHERE'],
                                array(
                                    'expr_type' => 'operator',
                                    'base_expr' => 'AND',
                                    'sub_tree' => false
                                )
                            );
                        }

                        if (isset($query_option->column_options[$i])) {
                            $column_option = $query_option->column_options[$i];
                            $table_column_name = (isset($table_alias[$column_option->table]) ? $table_alias[$column_option->table] : $column_option->table) . '.' . $column_option->Field;
                        } elseif (isset($parserMysql['SELECT'][$i])) {
                            $column_option = new stdClass();
                            $name_column = explode('.', $parserMysql['SELECT'][$i]['base_expr']);
                            $column_option->table =  $name_column[0];
                            $column_option->Field = $name_column[1];
                            $table_column_name = $parserMysql['SELECT'][$i]['base_expr'];
                        }

                        array_push(
                            $parserMysql['WHERE'],
                            array(
                                'expr_type' => 'colref',
                                'base_expr' => $table_column_name,
                                'no_quotes' => array(
                                    'delim' => '.',
                                    'parts' => array(
                                        $column_option->table,
                                        $column_option->Field
                                    )
                                ),
                                'sub_tree' => false
                            ),
                            array(
                                'expr_type' => 'operator',
                                'base_expr' => 'LIKE',
                                'sub_tree' => false
                            ),
                            array(
                                'expr_type' => 'const',
                                'base_expr' => '"%' . $filters['where'][$j2]['search']['value'] . '%"',
                                'sub_tree' => false
                            )
                        );
                    }
                }
            }
        }

        if ($limit > 0 && wp_doing_ajax()) {
//            if (isset($parserMysql['limit']) || isset($parserMysql['LIMIT'])) {//query has limit
            if (!empty($parserMysql['LIMIT'])) {
                $offset = is_object($parserMysql['LIMIT']) ? $parserMysql['LIMIT']->offset : $parserMysql['LIMIT']['offset'];
                unset($parserMysql['LIMIT']);
            } elseif (!empty($parserMysql['limit'])) {
                $offset = is_object($parserMysql['limit']) ? $parserMysql['limit']->offset : $parserMysql['limit']['offset'];
                unset($parserMysql['limit']);
            }
//            }

            $offset += ($page - 1) * $limit + ($headerOffset - 1);
            if ($headerOffset > 0 && $page === 1) {
                $limit -= $headerOffset;
            }
            $parserMysql['LIMIT'] = array(
                'offset' => $offset,
                'rowcount' => $limit
            );
        }

        unset($parserMysql['ORDER']);
        unset($parserMysql['order']);
        if (is_array($filters['order']) && count($filters['order'])) {
            $parserMysql['ORDER'] = array();
            foreach ($filters['order'] as $index => $ord) {
                $columnIndex = intval($ord['column']);
                for ($i = 0; $i <= $columnIndex; $i++) {
                    if (isset($filters['hide_columns'][$i]) && $filters['hide_columns'][$i] === 1) {
                        $columnIndex++;
                    }
                }

                if (isset($query_option->column_options[$columnIndex])) {
                    $column_option = $query_option->column_options[$columnIndex];
                    $table_column_name = (isset($table_alias[$column_option->table]) ? $table_alias[$column_option->table] : $column_option->table) . '.' . $column_option->Field;
                } elseif (isset($parserMysql['SELECT'][$columnIndex])) {
                    $column_option = new stdClass();
                    $name_column = explode('.', $parserMysql['SELECT'][$columnIndex]['base_expr']);
                    $column_option->table =  $name_column[0];
                    $column_option->Field = $name_column[1];
                    $table_column_name = $parserMysql['SELECT'][$columnIndex]['base_expr'];
                }

                $parserMysql['ORDER'][$index] = array(
                    'expr_type' => 'colref',
                    'base_expr' => $table_column_name,
                    'no_quotes' => array(
                        'delim' => '.',
                        'parts' => array(
                            $column_option->table,
                            $column_option->Field
                        )
                    ),
                    'sub_tree' => false,
                    'direction' => strtoupper($ord['dir'])
                );
            }
        }

        $parserMysql = $creator->create($parserMysql);

        $countTotal = 'SELECT SUM(1) AS number_row FROM (' . $queryDatas . ') AS tmp';

        return array($parserMysql, $countTotal);
    }

    /**
     * Create where wildcard
     *
     * @param string $column Column name
     * @param string $value  Value column
     *
     * @return array
     */
    private function createWhereWildcard($column, $value)
    {
        return $this->createWhere($column, 'plikep', $value);
    }

    /**
     * Create where in query
     *
     * @param string $column   Column name
     * @param string $operator Operator
     * @param string $value    Value column
     *
     * @return array
     */
    private function createWhere($column, $operator, $value)
    {
        $where = array();
        $where['column'] = $column;
        $where['operator'] = $operator;
        $where['value'] = $value;

        return $where;
    }
}
