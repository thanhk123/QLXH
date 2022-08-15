<?php
/**
 * WP Table Manager
 *
 * @package WP Table Manager
 * @author  Joomunited
 * @version 1.0
 */

use Joomunited\WP_Table_Manager\Admin\Helpers\WptmTablesHelper;
use Joomunited\WPFramework\v1_0_5\Filter;
use Joomunited\WPFramework\v1_0_5\Model;
use Joomunited\WPFramework\v1_0_5\Factory;
use Joomunited\WPFramework\v1_0_5\Application;

defined('ABSPATH') || die();

/**
 * Class wptmFilter
 */
class WptmFilter extends Filter
{
    /**
     * Var style highlight cell
     *
     * @var string
     */
    private $hightLightCss = '';
    /**
     * Var admin/site
     *
     * @var string
     */
    private $getType = '';

    /**
     * Var check use first row/column as graph
     *
     * @var string
     */
    private $useFirstRowAsGraph = '';

    /**
     * Function load shortcode
     *
     * @return void
     */
    public function load()
    {
        add_filter('the_content', array($this, 'wptmReplaceContent'), 9);
        add_filter('themify_builder_module_content', array($this, 'themifyModuleContent'));

        // acf_pro filter for every value load
        add_filter('acf/load_value', array($this, 'wptmAcfLoadValue'), 10, 3);
        // Register our shortcode
        add_shortcode('wptm', array($this, 'applyShortcode'));
    }

    /**
     * Return content of our shortcode
     *
     * @param array $args Data of chart/table
     *
     * @return string
     */
    public function applyShortcode($args = array())
    {
        $html = '';
        if (isset($args['id']) && !empty($args['id'])) {
            $id_table = $args['id'];
            $html = $this->replaceTable($id_table);
        } elseif (isset($args['id-chart']) && !empty($args['id-chart'])) {
            $id_chart = $args['id-chart'];
            $html = $this->replaceChart($id_chart);
        }

        return $html;
    }

    /**
     * Function acf filter to replace table holder-place
     *
     * @param mixed   $value   Content of table
     * @param integer $post_id Id of post
     * @param string  $field   Field
     *
     * @return mixed
     */
    public function wptmAcfLoadValue($value, $post_id, $field)
    {
        if (is_string($value)) {
            $value = $this->wptmReplaceContent($value);
        }
        return $value;
    }

    /**
     * Get function wptmReplaceContent
     *
     * @param string $content Strings to search and replace
     *
     * @return mixed
     */
    public function themifyModuleContent($content)
    {
        $content = $this->wptmReplaceContent($content);
        return $content;
    }

    /**
     * Function replace
     *
     * @param string $content Strings to search and replace
     *
     * @return mixed
     */
    public function wptmReplaceContent($content)
    {
        $content = preg_replace_callback('@<img[^>]*?data\-wptmtable="([0-9]+)".*?/?>@', array(
            $this,
            'replace'
        ), $content);

        return $content;
    }

    /**
     * Get table Html Content
     *
     * @param object  $table      Table object
     * @param boolean $getData    Get table datas
     * @param array   $data_style Style value
     *
     * @return string|boolean
     */
    public function getTableContent($table, $getData, $data_style)
    {
        $params = $table->params;

        require_once dirname(WPTM_PLUGIN_FILE) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'site' . DIRECTORY_SEPARATOR . 'helpers' . DIRECTORY_SEPARATOR . 'wptmHelper.php';
        $wptmHelper = new WptmHelper();

        Application::getInstance('Wptm');
        /* @var WptmModelConfigsite $configModel */
        $configModel = $this->getModel('configsite');
        $configParms = $configModel->getConfig();

        if (!empty($data_style['data'])) {
            $valueTable = $wptmHelper->htmlRender($table, $configParms, $data_style['data'], $table->hash, $getData);
        } else {
            $valueTable = $wptmHelper->htmlRender($table, $configParms, array(), $table->hash, $getData);
        }

        if ((isset($params->table_type) && $params->table_type === 'html') || $table->type === 'html') {
            $folder = wp_upload_dir();
            $folder = $folder['basedir'] . DIRECTORY_SEPARATOR . 'wptm' . DIRECTORY_SEPARATOR;
            $file = $folder . $table->id . '_' . $table->hash . '.html';

            return file_get_contents($file);
        } elseif (is_string($valueTable) && $valueTable !== '') {
            return $valueTable;
        } else {
            return __('table is empty', 'wptm');
        }

        return false;
    }

    /**
     * Get function replaceChart/replaceTable
     *
     * @param array $match Data table
     *
     * @return string
     */
    private function replace($match)
    {
        $id_table = $match[1];
        $exp = '@<img.*data\-wptm\-chart="([0-9]+)".*?>@';
        preg_match($exp, $match[0], $matches);
        if (count($matches) > 0) { //is a chart
            $id_chart = $matches[1];
            $content = $this->replaceChart($id_chart);
        } else {  //is a table
            $content = $this->replaceTable($id_table);
        }

        return $content;
    }

    /**
     * Create table(front_end)
     *
     * @param integer $id_table               Id of table
     * @param boolean $checkElementor_preview Check elementor preview
     *
     * @return string|boolean|array
     */
    public function replaceTable($id_table, $checkElementor_preview = false)
    {
        Application::getInstance('Wptm');
        if ($checkElementor_preview) {
            $this->getType = 'site';
        }

        /* @var WptmModelConfigsite $modelConfig */
        $modelConfig = $this->getModel('configSite');

        $configParams = $modelConfig->getConfig();
        /* @var WptmModelTable $model */
        $model = $this->getModel('table');

        $getData = true;

        $usingAjaxLoading = $model->needAjaxLoad($id_table);
        if ($usingAjaxLoading) {
            $getData = false;
        }

        $table = $model->getItem($id_table, $getData, true, null, $usingAjaxLoading);

        if (!$table) {
            return '';
        }

        $style = $table->style;


        $hightLight = !isset($configParams['enable_hightlight']) ? 0 : (int)$configParams['enable_hightlight'];
        $table->hightlight_color = !isset($configParams['tree_hightlight_color']) ? '#ffffaa' : $configParams['tree_hightlight_color'];
        $table->hightlight_font_color = !isset($configParams['tree_hightlight_font_color']) ? '#ffffff' : $configParams['tree_hightlight_font_color'];
        $table->hightlight_opacity = !isset($configParams['hightlight_opacity']) ? '0.9' : $configParams['hightlight_opacity'];
        $default_order_sortable = isset($style->table->default_order_sortable) ? (int)$style->table->default_order_sortable : 0;
        $default_sort = isset($style->table->default_sortable) ? (int)$style->table->default_sortable : 0;
        $enable_pagination = isset($style->table->enable_pagination) ? (int)$style->table->enable_pagination : 0;

        if (!isset($style->table) || count((array)$style->table) < 1) {
            $style->table = new stdClass();
        }

        if (!isset($style->table->freeze_col)) {
            $style->table->freeze_col = 0;
        }
        if (!isset($style->table->freeze_row)) {
            $style->table->freeze_row = 0;
        }
        if (!isset($style->table->enable_filters)) {
            $style->table->enable_filters = 0;
        }

//        $style->table->listsFont = array();
//        if (!empty($configParams['fonts_google']) && $configParams['fonts_google']) {
//            $arrayValues = explode('|', $configParams['fonts_google']);
//            foreach ($arrayValues as $arrayValue) {
//                if ($arrayValue !== '') {
//                    $style->table->listsFont[] = $arrayValue;
//                }
//            }
//        }
        if (isset($style->table->fonts_used) && count($style->table->fonts_used) > 0) {
            $urlGoogle = '';
            foreach ($style->table->fonts_used as $fontsUsed) {
                if ($fontsUsed !== '') {
                    $urlGoogle .= $urlGoogle !== '' ? '|' . $fontsUsed : $fontsUsed;
                }
            }
            $urlGoogle = 'https://fonts.googleapis.com/css?family=' . $urlGoogle;
            wp_enqueue_style('wptm-google-fonts-fe', $urlGoogle);
        }

        if (isset($style->table->fonts_local_used) && count($style->table->fonts_local_used) > 0) {
            //local font
            require_once plugin_dir_path(WPTM_PLUGIN_FILE) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'admin' . DIRECTORY_SEPARATOR . 'helpers' . DIRECTORY_SEPARATOR . 'tables.php';
            $localFonts = WptmTablesHelper::getlocalfont();
            $localFontString = '';
            if (isset($localFonts) && count($localFonts) > 0) {
                foreach ($localFonts as $key => $localFont) {
                    if (isset($localFont->urc) && in_array($localFont->data[0]->name_font, $style->table->fonts_local_used)) {
                        $localFontString .= $localFont->urc;
                    }
                }
            }
        }

        $sortable = false;
        if (isset($style->table->use_sortable) && (int)$style->table->use_sortable === 1) {
            $sortable = true;
        }

        $responsive_type = 'scroll';
        if (isset($style->table->responsive_type) && (string)$style->table->responsive_type === 'hideCols') {
            $responsive_type = 'hideCols';
        }
        if (!isset($style->table->enable_filters)) {
            $style->table->enable_filters = false;
        }

        $content = '';
        /*add style for table*/
        $table->sortable = $sortable;
        $table->enable_filters = $style->table->enable_filters;
        $data_style = $this->styleRender($table, $this->getType);

        if (isset($table->datas) && $table->datas !== null && !empty($table->datas) || $enable_pagination) {
            $min = '.min';
            if (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) {
                $min = '';
            }

//            $count_Col = 0;
//            $colWidths = array();
//            if (isset($style->cols)) {
//                foreach ($style->cols as $col) {
//                    if (is_object($col) && isset($col->{1}->width)) {
//                        $colWidths[$col->{0}] = $col->{1}->width;
//                        $count_Col++;
//                    } elseif (is_array($col) && isset($col[1]->width)) {
//                        $colWidths[$col[0]] = $col[1]->width;
//                        $count_Col++;
//                    }
//                }
//            }
//            $encodeColWidths = htmlspecialchars(json_encode($colWidths));

            wp_enqueue_script('jquery');

            // hightlight
            if ($hightLight !== 1) {
                $table->hightlight_color = 'not hightlight';
            }

            if ($this->getType === '') {
                wp_enqueue_script('jquery-wptm-moment', plugins_url('assets/js/moment.js', __FILE__), array(), WPTM_VERSION, true);
                wp_enqueue_script('jquery-wptm-jdateformatparser', plugins_url('assets/js/moment-jdateformatparser.js', __FILE__), array(), WPTM_VERSION, true);

                wp_enqueue_script('wptm_datatables_js', plugins_url('assets/DataTables/datatables' . $min . '.js', __FILE__), array(), WPTM_VERSION, true);

                wp_enqueue_script('jquery-fileDownload', plugins_url('assets/js/jquery.fileDownload.js', __FILE__), array(), WPTM_VERSION);

                /* add tipso lib when tooltip cell exists*/
                wp_enqueue_script('wptm_tipso', plugins_url('assets/tipso/tipso' . $min . '.js', __FILE__), array(), WPTM_VERSION, true);

                wp_enqueue_script('wptm_table', plugins_url('assets/js/wptm_front.js', __FILE__), array(), WPTM_VERSION, true);
            }
            //$check_sortable = $sortable ? 'use_sortable' : '';
            $check_sortable = '';
            $content .= '<div class="wptm_table tablesorter-bootstrap ' . $check_sortable . '" data-id="' . (int)$table->id . '" data-hightlight="' . $hightLight . '">';

            /*button download table*/
            if (isset($style->table->download_button) && $style->table->download_button) {
                $app = Application::getInstance('Wptm');
                $content .= '<input type="button" data-href="' . $app->getAjaxUrl() . '" href="javascript:void(0);" class="download_wptm" value="' . esc_attr__('Download Table', 'wptm') . '"/>';
            }
            $limit = isset($style->table->limit_rows) ? (int)$style->table->limit_rows : 0;

            $tableContent = $this->getTableContent($table, $getData, $data_style);

            if ($tableContent) {
                $content .= $tableContent;
            }
            //phpcs:ignore PHPCompatibility.Constants.NewConstants.ent_html401Found -- no support php5.3
            $content = html_entity_decode($content, ENT_COMPAT | ENT_HTML401, 'UTF-8');

            $content .= '<script>wptm_ajaxurl = \'' . esc_url_raw(Factory::getApplication('wptm')->getAjaxUrl()) . '\';</script>';

            if (isset($localFontString)) {
                $content .= '</div><style>' . $this->hightLightCss . ' ' . stripslashes_deep($localFontString) . '</style>';
            } else {
                $content .= '</div><style>' . $this->hightLightCss . '</style>';
            }
        }

        if ($this->getType === 'site') {
            $upload_url = wp_upload_dir();
            if (is_ssl()) {
                $upload_url['baseurl'] = str_replace('http://', 'https://', $upload_url['baseurl']);
            }
            $upload_url = $upload_url['baseurl'] . '/wptm/';
            // phpcs:ignore WordPress.WP.EnqueuedResources.NonEnqueuedStylesheet -- add style in elementor review
            $content .= '<link rel="stylesheet" id="wptm-table-' . $table->id . '" href="' . $upload_url . $table->id . '_' . $table->hash . '.css" media="all">';
        }

        $content = do_shortcode($content);

        if ($checkElementor_preview) {
            return array('content' => $content, 'name' => $table->title);
        }

        return $content;
    }

    /**
     * Create chart(front_end)
     *
     * @param integer $id_chart               Id of chart
     * @param boolean $checkElementor_preview Check elementor preview
     *
     * @return string|array
     */
    public function replaceChart($id_chart, $checkElementor_preview = false)
    {
        Application::getInstance('Wptm');
        if ($checkElementor_preview) {
            $this->getType = 'site';
        }

        /* @var WptmModelChartsite $modelChart */
        $modelChart = $this->getModel('chartSite');
        $chart = $modelChart->getChart($id_chart);

        $content = '';

        if ($chart) {
            $chartConfig = json_decode($chart->config);
            if (isset($chartConfig->useFirstRowAsGraph)) {
                $this->useFirstRowAsGraph = $chartConfig->useFirstRowAsGraph;
            }
            $modelConfig = $this->getModel('configSite');
            $configParams = $modelConfig->getConfig();

            $modelTable = $this->getModel('table');
            $tableData = $modelTable->getItem($chart->id_table, true, true, null, false);

//            $chartData = $this->getChartData($chart->datas, $tableData);
            $chartData = $this->readDataChartBySpreadsheet($chart->datas, $tableData);

            $symbol_position = (!empty($configParams['symbol_position'])) ? $configParams['symbol_position'] : 0;
            $symbol_position = (!empty($tableData->style->table->symbol_position)) ? $tableData->style->table->symbol_position : $symbol_position;
            $currency_symbol = (!empty($configParams['currency_sym'])) ? $configParams['currency_sym'] : '$';
            $currency_symbol = (!empty($tableData->style->table->currency_symbol)) ? $tableData->style->table->currency_symbol : $currency_symbol;
            $decimal_symbol = (!empty($configParams['decimal_sym'])) ? $configParams['decimal_sym'] : '.';
            $decimal_symbol = (!empty($tableData->style->table->decimal_symbol)) ? $tableData->style->table->decimal_symbol : $decimal_symbol;
            $decimal_count = (!empty($configParams['decimal_count'])) ? $configParams['decimal_count'] : 0;
            $decimal_count = (!empty($tableData->style->table->decimal_count)) ? $tableData->style->table->decimal_count : $decimal_count;
            $thousand_symbol = (!empty($configParams['thousand_sym'])) ? $configParams['thousand_sym'] : ',';
            $thousand_symbol = (!empty($tableData->style->table->thousand_symbol)) ? $tableData->style->table->thousand_symbol : $thousand_symbol;

            $jsChartData = $this->buildJsChartData(
                $chartData,
                $chart->type,
                $chartConfig,
                $currency_symbol,
                $decimal_symbol,
                $thousand_symbol
            );

            if (!$chartConfig) {
                $chartConfig = new stdClass();
            }

            $chartConfig->width = isset($chartConfig->width) ? $chartConfig->width : 500;
            $chartConfig->height = isset($chartConfig->height) ? $chartConfig->height : 375;
            $chartConfig->chart_align = isset($chartConfig->chart_align) ? $chartConfig->chart_align : 'center';
            $symbol = '';

            $js = 'var DropChart = {};' . "\n";
            $reactVar = new stdClass();
            $js .= 'DropChart.id = "' . $id_chart . '" ; ' . "\n";
            $reactVar->id = $id_chart;
            $js .= 'DropChart.type = "' . $chart->type . '" ; ' . "\n";
            $reactVar->type = $chart->type;
            $js .= 'DropChart.data = ' . $jsChartData . '; ' . "\n";
            $reactVar->data = $jsChartData;
            $js .= 'DropChart.currency_symbols = "' . $symbol . '"; ' . "\n";
            $reactVar->currency_symbols = $symbol;
            $js .= 'DropChart.places = ' . $decimal_count . '; ' . "\n";
            $reactVar->places = $decimal_count;
            $js .= 'DropChart.unit_symbols = ' . $symbol_position . '; ' . "\n";
            $reactVar->unit_symbols = $symbol_position;
            $js .= 'DropChart.decimal_symbols = "' . $decimal_symbol . '"; ' . "\n";
            $reactVar->decimal_symbols = $decimal_symbol;
            $js .= 'DropChart.thousand_symbols = "' . $thousand_symbol . '"; ' . "\n";
            $reactVar->thousand_symbols = $thousand_symbol;

            if (isset($chartConfig->useFirstRowAsGraph)) {
                $reactVar->useFirstRowAsGraph = $chartConfig->useFirstRowAsGraph;
                $js .= 'DropChart.useFirstRowAsGraph = "' . $reactVar->useFirstRowAsGraph . '"; ' . "\n";
            }

            if ($chart->config) {
                $js .= 'DropChart.config = ' . $chart->config . '; ' . "\n";
                $reactVar->config = $chart->config;
            } else {
                $js .= 'DropChart.config = {} ; ' . "\n";
                $reactVar->config = new stdClass();
            }
            $js .= ' if(typeof DropCharts === "undefined") { var DropCharts = []; } ; ' . "\n";

            $js .= ' DropCharts.push(DropChart) ; ' . "\n";

            if ($this->getType === '') {
                wp_enqueue_script('jquery');
                wp_enqueue_script('wptm_chart', plugins_url('app/admin/assets/js/Chart.js', WPTM_PLUGIN_FILE), array(), WPTM_VERSION);
                wp_enqueue_script('wptm_dropchart', plugins_url('app/site/assets/js/dropchart.js', WPTM_PLUGIN_FILE), array(), time());
            }
            $content = '<div class="chartContainer wptm" id="chartContainer' . $id_chart . '" data-id-chart="' . $id_chart . '">';

            $align = '';
            switch ($chartConfig->chart_align) {
                case 'left':
                    $align = ' margin : 0 auto 0 0; ';
                    break;
                case 'right':
                    $align = ' margin : 0 0 0 auto ';
                    break;
                case 'none':
                    break;
                case 'center':
                default:
                    $align = ' margin : 0 auto 0 auto ';
                    break;
            }

            $content .= '<div class="canvasWraper" style="max-height:' . $chartConfig->height
                . 'px; max-width:' . $chartConfig->width . 'px;' . $align . '" >';
            $content .= '<canvas class="canvas"  height="' . $chartConfig->height . '" width="' . $chartConfig->width . '"></canvas>';
            $content .= '</div></div>';
            $content .= '<script>' . $js . '</script>';
        }

        if ($checkElementor_preview) {
            return array('content'=> $content, 'name' => $chart->title, 'js' => $reactVar);
        }

        return $content;
    }

    /**
     * Render style
     *
     * @param object $table                  Data table
     * @param string $checkElementor_preview Check elementor preview
     *
     * @return void|array|boolean
     */
    private function styleRender($table, $checkElementor_preview = 'admin')
    {
        $hightlight_color = $table->hightlight_color;
        $hightlight_font_color = $table->hightlight_font_color;
        $hightlight_opacity = $table->hightlight_opacity;
        if ($hightlight_color !== 'not hightlight') {
            require_once dirname(WPTM_PLUGIN_FILE) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'site' . DIRECTORY_SEPARATOR . 'chartStyleSet.php';
            $chartStyleObj = new ChartStyleSet($hightlight_color);
            $highlighting_rgbcolor = $chartStyleObj->hex2rgba($hightlight_color, $hightlight_opacity);
            $table->hightlight_css = '.droptables-highlight-horizontal, .droptables-highlight-vertical  {  color: ' . $hightlight_font_color . ' !important; background: ' . $highlighting_rgbcolor . ' !important; }';
        } else {
            $table->hightlight_css = '';
        }

        $this->hightLightCss = $table->hightlight_css;
        require_once dirname(WPTM_PLUGIN_FILE) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'site' . DIRECTORY_SEPARATOR . 'helpers' . DIRECTORY_SEPARATOR . 'wptmHelper.php';
        $wptmHelper = new WptmHelper();
        $data_style = $wptmHelper->styleRender($table);

        $upload_url = wp_upload_dir();
        if (is_ssl()) {
            $upload_url['baseurl'] = str_replace('http://', 'https://', $upload_url['baseurl']);
        }
        $upload_url = $upload_url['baseurl'] . '/wptm/';
        if ($checkElementor_preview !== 'site') {
            wp_enqueue_style('wptm-table-' . $table->id, $upload_url . $table->id . '_' . $table->hash . '.css', array(), WPTM_VERSION);
            wp_enqueue_style('wptm-front', plugins_url('assets/css/front.css', __FILE__), array(), WPTM_VERSION);
            $min = '.min';
            if (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) {
                $min = '';
            }
            wp_enqueue_style('wptm_datatables', plugins_url('assets/DataTables/datatables' . $min . '.css', __FILE__), array(), WPTM_VERSION);
            wp_enqueue_style('wptm_tipso', plugins_url('assets/tipso/tipso' . $min . '.css', __FILE__), array(), WPTM_VERSION);
        }

        return $data_style;
    }

    /**
     * Build js chart
     *
     * @param array  $data            Data cell in chart
     * @param string $type            Type chart
     * @param object $config          Data config chart
     * @param string $currency_symbol Currency symbol
     * @param string $decimal_symbol  Decimal symbol
     * @param string $thousand_symbol Thousand symbol
     *
     * @return mixed|string|void
     */
    private function buildJsChartData($data, $type, $config, $currency_symbol, $decimal_symbol, $thousand_symbol)
    {
        $result = '';

        if (!$config || !is_object($config)) {
            $config = new stdClass();
            $config->pieColors = '';
            $config->colors = '';
        }
        $config->dataUsing = isset($config->dataUsing) ? $config->dataUsing : 'row';
        $config->useFirstRowAsLabels = isset($config->useFirstRowAsLabels) ? $config->useFirstRowAsLabels : false;
        $dataSets = $this->getDataSets(
            $data,
            $config->dataUsing,
            $currency_symbol,
            $decimal_symbol,
            $thousand_symbol
        );

        if (!isset($dataSets->data) || (count($dataSets->data) === 0)) {
            return $result;
        }

        switch ($type) {
            case 'PolarArea':
            case 'Pie':
            case 'Doughnut':
//                $chartData = $this->convertForPie($dataSets->data[0], $dataSets->axisLabels, $config->pieColors);
                $chartData = $this->convertForLine($dataSets, $config, $config->pieColors, 'pieColors');
                break;

            case 'Bar':
            case 'Radar':
            case 'Line':
            default:
                $chartData = $this->convertForLine($dataSets, $config, $config->colors, 'colors');
                break;
        }
        $result = json_encode($chartData);
        return $result;
    }

    /**
     * Check column is int
     *
     * @param array  $cellsData       Data cell
     * @param string $currency_symbol Currrency symbol
     *
     * @return array data[0] is list satisfied cell, if data[1] exist then have cells isn't number + currency_symbol
     */
    private function replaceCell($cellsData, $currency_symbol)
    {
        $data1 = array();
        $i = 0;
        $data2 = -1;
        foreach ($cellsData as $k => $v) {
            $v1 = preg_replace('/[0-9\.\,\-| ]/', '', $v);
            $v1 = str_replace($currency_symbol, '', $v1);
            if ($v1 === '') {
                $data1[$i] = $k;
                $i++;
            } elseif ($v1 !== '') {
                $data2 = $k;
            }
        }

        $data = array();
        $data[0] = $data1;
        if ($data2 !== -1) {
            $data[1] = $data2;
        }
        return $data;
    }

    /**
     * Convert to number
     *
     * @param array|string $arr Data cell
     *
     * @return array|mixed
     */
    public function convertToNumber($arr)
    {
        $dataReturn = array();
        if (is_array($arr)) {
            $countArr = count($arr);
            for ($i = 0; $i < $countArr; $i++) {
                if (is_array($arr[$i])) {
                    $count = count($arr[$i]);
                    $dataReturn[$i] = array();
                    for ($j = 0; $j < $count; $j++) {
                        $dataReturn[$i][] = str_replace(',', '', $arr[$i][$j]);
                    }
                } else {
                    $dataReturn[$i] = str_replace(',', '', $arr[$i]);
                }
            }
        } else {
            return str_replace(',', '', $arr);
        }
        return $dataReturn;
    }
    /**
     * Get data cell to chart
     *
     * @param string $cell_value      Data cells
     * @param string $cell_value_raw  Data Switch
     * @param string $currency_symbol Currency symbol
     * @param string $decimal_symbol  Decimal symbol
     * @param string $thousand_symbol Thousand symbol
     *
     * @return array
     */
    public function getStrangeCharacters2($cell_value, $cell_value_raw, $currency_symbol, $decimal_symbol, $thousand_symbol)
    {
        $value = array();
        $value[0] = $cell_value;
        $value0 = $cell_value_raw === null ?  str_replace(' ', '', $cell_value) : str_replace(' ', '', $cell_value_raw);
        $value1 = str_replace($currency_symbol, '', $value0);
        if ($cell_value_raw === null) {
            $value1 = str_replace($thousand_symbol, '', $value1);
            $value1 = str_replace($decimal_symbol, '.', $value1);
        }
        $value[1] = preg_replace('/[^0-9|\.|-]/', '', $value1);

        $value[2] = 0;
        $value[3] = 0;//currency_symbol

        $value1 = preg_replace('/[0-9\.\,\-| ]/', '', $value1);
        if ($value1 !== '' || $cell_value === '' || $cell_value === null) {//have strange characters or is null
            $value[2] = 1;
        }
        if ($cell_value !== '' && (strrpos($cell_value, $currency_symbol) !== false && $cell_value_raw !== null)) {
            $value[3] = 1;
        }
        return $value;
    }

    /**
     * Get data cell to chart
     *
     * @param array  $cellsData       Data cells
     * @param string $dataUsing       Data Switch
     * @param string $currency_symbol Currency symbol
     * @param string $decimal_symbol  Decimal symbol
     * @param string $thousand_symbol Thousand symbol
     *
     * @return stdClass
     */
    private function getDataSets($cellsData, $dataUsing, $currency_symbol, $decimal_symbol, $thousand_symbol)
    {
        $result = new stdClass();
        $result->data = array();
        $result->data1 = array();
        $result->data_raw = array();
        $result->data_raw1 = array();
        $result->graphLabel = array();//text in line
        $result->axisLabels = array();//text in x-axis
        $result->currency_symbol = array();//text in x-axis
        $axisLabels = array();
        $deleteLine = array();

        if ($dataUsing !== 'row') {//convert to column type
            $cellsData[0] = $this->transposeArr($cellsData[0]);
            $cellsData[1] = $this->transposeArr($cellsData[1]);
        }

        $result->deleteData = array();

        foreach ($cellsData[0] as $k => $value) {
            $checkCellsHaveNaN = 0;
            $countCellInLine = count($value);
            $deleteData1 = array();
            $check_currency_symbol = 0;
            $data = array();
            $data1 = array();
            $result->data_raw[$k] = array();
            $result->data_raw1[$k] = array();

            for ($i = 0; $i < $countCellInLine; $i++) {
                $result->data_raw[$k][] = $value[$i];
                $result->data_raw1[$k][] = $cellsData[1][$k][$i];

                $cell_value = $this->getStrangeCharacters2($value[$i], $cellsData[1][$k][$i], $currency_symbol, $decimal_symbol, $thousand_symbol);
                $checkCellsHaveNaN += $cell_value[2];
                $data[] = $cell_value[0];
                $data1[] = $cell_value[1];

                if ($cell_value[2] === 1) {//have strange characters or is null
                    $deleteData1[$i] = 1;
                }
                if ($cell_value[3] === 1) {
                    $check_currency_symbol++;
                }
            }

            if ($checkCellsHaveNaN === $countCellInLine || $checkCellsHaveNaN + 2 > $countCellInLine) {//line Have NaN
                $axisLabels[] = $data;
                $deleteLine[] = $k;
            } else {//get this line, that have cell value
                foreach ($deleteData1 as $ii => $deleteData) {
                    if (!isset($result->deleteData[$ii])) {
                        $result->deleteData[$ii] = 0;
                    }
                    $result->deleteData[$ii] += 1;
                }

                $result->graphLabel[] = $data[0];//array key 1, 2, 3,...||$value first value
                $result->data[] = $data;
                $result->data1[] = $data1;

                if ($check_currency_symbol > 1) {
                    $result->currency_symbol[] = 1;
                } else {
                    $result->currency_symbol[] = -1;
                }
            }
        }

        $numberLine = count($result->data);
        $useFirstRowAsGraph = isset($this->useFirstRowAsGraph) ? $this->useFirstRowAsGraph : true;
        //if line number > 1 then not get cell is graphLabel else < 1 then get it
        if ($numberLine > 1 && count($result->data_raw) > 1 && !(count($result->data_raw) === 2 && $useFirstRowAsGraph !== true)) {//have > 1 line in chart
            for ($i = 0; $i < $numberLine; $i++) {
                array_shift($result->data[$i]);
                array_shift($result->data1[$i]);
            }
            $result->arrayShiftData = true;

            if (isset($result->deleteData[0])) {
                unset($result->deleteData[0]);
            }
        }

        if (count($axisLabels) > 0) {//useFirstRowAsGraph become useless
            $result->axisLabels = $axisLabels[0];
        } elseif ($numberLine > 0) {//axisLabels from $cellsData[0] || all line be passed validated
            $result->axisLabels = $result->data_raw[0];
            if ($useFirstRowAsGraph !== true) {
                array_shift($result->data);
                array_shift($result->data1);
                array_shift($result->currency_symbol);
                array_shift($result->graphLabel);
            }
        }

        if (!empty($result->arrayShiftData)) {
            array_shift($result->axisLabels);
        }

        foreach ($result->deleteData as $ii => $deleteData) {//not deleted yet cells not pass
            if ($numberLine !== $deleteData) {
                unset($result->deleteData[$ii]);
            }
        }
        $result->data1 = $this->convertToNumber($result->data1);
        return $result;
    }

    /**
     * Convert for line table
     *
     * @param object  $dataSets       Data chart after change
     * @param boolean $config         Use First Row As Labels
     * @param string  $colors         Color lines in chart
     * @param string  $checkTyleColor Color input in chart
     *
     * @return stdClass
     */
    private function convertForLine($dataSets, $config, $colors, $checkTyleColor)
    {
        $result = new stdClass();
        $result->datasets = array();
        if (!is_array($dataSets->data1) || (count($dataSets->data1) === 0)) {
            return $result;
        }

        $useFirstRowAsLabels = $config->useFirstRowAsLabels;

        $numberLine = count($dataSets->data1);
        $countDatasets = count($dataSets->data1[0]);
        $result->data_format = array();
        for ($i = 0; $i < $numberLine; $i++) {
            $dataSet = new stdClass();
            $dataSet->label = $dataSets->graphLabel[$i];
            $dataSet->currency_symbol = $dataSets->currency_symbol[$i];
            $result->labels = array();
            if (isset($dataSets->data) && $dataSets->data[$i] !== null) {
                $result->data_format[] = $dataSets->data[$i];
            } else {
                $result->data_format[] = $dataSets->data1[$i];
            }

            if ($checkTyleColor === 'pieColors') {
                $dataSet->highlight = array();
                $dataSet->backgroundColor = array();
                $dataSet->borderColor = array();
                $dataSet->pointBackgroundColor = array();
                $dataSet->pointColor = array();
                $dataSet->pointBorderColor = array();
                $dataSet->pointHighlightFill = array();
            }

            for ($j = 0; $j < $countDatasets; $j++) {
                if (!(isset($dataSets->deleteData)
                    && ((!empty($dataSets->arrayShiftData) && isset($dataSets->deleteData[$j + 1]))
                        || (empty($dataSets->arrayShiftData) && isset($dataSets->deleteData[$j]))
                    )
                )) {//thoa man
                    if (!isset($dataSet->data)) {
                        $dataSet->data = array();
                    }
                    $dataSet->data[] = $dataSets->data1[$i][$j];//data da duoc remove tu truoc

                    if ($useFirstRowAsLabels) {
                        $result->labels[] = $dataSets->axisLabels[$j];
                    } else {
                        $result->labels[] = '';
                    }

                    if ($checkTyleColor === 'pieColors') {
                        $pieColors = $this->getStyleSet($j, $colors);
                        $dataSet->highlight[] = $pieColors->highlight;
                        $dataSet->backgroundColor[] = $pieColors->backgroundColor;
                        $dataSet->borderColor[] = $pieColors->borderColor;
                        $dataSet->pointBackgroundColor[] = $pieColors->pointBackgroundColor;
                        $dataSet->pointColor[] = $pieColors->pointColor;
                        $dataSet->pointBorderColor[] = $pieColors->pointBorderColor;
                        $dataSet->pointHighlightFill[] = $pieColors->pointHighlightFill;
                    }
                }
            }
            if ($checkTyleColor !== 'pieColors') {
                $styleSet = $this->getStyleSet($i, $colors);
                $dataSet = (object)array_merge((array)$dataSet, (array)$styleSet);
            }
            $result->datasets[$i] = $dataSet;
        }

        return $result;
    }

    /**
     * Convert from datas chart var(pie)
     *
     * @param array  $data       Data cells of pie chart
     * @param array  $axisLabels Data axis Labels
     * @param string $pieColors  Color pie
     *
     * @return array
     */
    private function convertForPie($data, $axisLabels, $pieColors)
    {
        $datas = array();
        $defaultColors = array('#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360');
        $highlights = array('#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774');

        if (!$pieColors) {
            $colors = $defaultColors;
        } else {
            $colors = explode(',', $pieColors);
        }
        $countData = count($data);
        for ($i = 0; $i < $countData; $i++) {
            $dataSet = new stdClass();
            $dataSet->value = (float)$data[$i];
            $dataSet->label = (string)$axisLabels[$i];
            if (isset($colors[$i])) {
                $dataSet->color = $colors[$i];
                $dataSet->highlight = $this->alterBrightness($colors[$i], 0.3);
            } else {
                $dataSet->color = $defaultColors[$i % 5];
                $dataSet->highlight = $highlights[$i % 5];
            }

            $datas[$i] = $dataSet;
        }

        return $datas;
    }

    /**
     * Convert string color
     *
     * @param string  $colourstr Color str
     * @param integer $steps     Steps
     *
     * @return string
     */
    public function alterBrightness($colourstr, $steps)
    {
        $colourstr = str_replace('#', '', $colourstr);
        $rhex = substr($colourstr, 0, 2);
        $ghex = substr($colourstr, 2, 2);
        $bhex = substr($colourstr, 4, 2);

        $r = hexdec($rhex);
        $g = hexdec($ghex);
        $b = hexdec($bhex);

        $r = max(0, min(255, $r + $r * $steps));
        $g = max(0, min(255, $g + $g * $steps));
        $b = max(0, min(255, $b + $b * $steps));

        return '#' . dechex($r) . dechex($g) . dechex($b);
    }

    /**
     * Get style
     *
     * @param integer $i      Order line
     * @param string  $colors Color line
     *
     * @return ChartStyleSet|null
     */
    private function getStyleSet($i, $colors)
    {
        $result = null;
        $defaultColors = array('#DCDCDC', '#97BBCD', '#4C839E');

        if (!$colors) {
            $arrColors = $defaultColors;
        } else {
            $arrColors = explode(',', $colors);
        }

        if (count($arrColors) && isset($arrColors[$i])) {
            $color = $arrColors[$i];
        } else {
            $color = $defaultColors[$i % 3];
        }

        require_once dirname(WPTM_PLUGIN_FILE) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'site' . DIRECTORY_SEPARATOR . 'chartStyleSet.php';
        $result = new ChartStyleSet($color);

        return $result;
    }

    /**
     * Check exist number in array
     *
     * @param array   $arr             Array needs to check
     * @param string  $currency_symbol Currency symbol
     * @param boolean $arg             Check numberic for value array
     *
     * @return boolean|array
     */
    private function isNumbericArray($arr, $currency_symbol, $arg = false)
    {
        $countArr = count($arr);
        $valid = $countArr;
        $check = array();

        for ($c = 0; $c < $countArr; $c++) {
            if ($arr[$c] !== '') {
                $arr[$c] = str_replace($currency_symbol, '', (string)$arr[$c]);
                $arr[$c] = preg_replace('/[\.\,\-]/', '', $arr[$c]);
                if (!is_numeric($arr[$c])) {
                    $valid--;
                    $check[$c] = 1;
                }
            }
        }

        if ($arg) {
            return $check;
        } else {
            return $valid > 0 ? true : false;
        }
    }

    /**
     * Check number in row
     *
     * @param array  $cells           Data cells
     * @param string $currency_symbol Currency symbol
     *
     * @return boolean if has a row/column includes all numbers then return true else return false
     */
    private function hasNumbericRow($cells, $currency_symbol)
    {
        $rValid = true;
        $rNaN = 0;
        $countCells = count($cells);

        for ($r = 0; $r < $countCells; $r++) {
            $valid = true;
            $count = count($cells[$r]);
            for ($c = 0; $c < $count; $c++) {
                $cells[$r][$c] = str_replace($currency_symbol, '', (string)$cells[$r][$c]);
                if (!is_numeric(preg_replace('/[\.\,\-]/', '', $cells[$r][$c]))) {
                    $valid = false;
                }
            }

            if (!$valid) {//has cell is not number
                $rNaN++;
            }
        }

        if ($rNaN === count($cells)) {
            $rValid = false;
        }

        return $rValid;
    }

    /**
     * Check second dimension
     *
     * @param array $array Data cells
     *
     * @return array
     */
    private function transposeArr($array)
    {
        $transposed_array = array();
        if ($array) {
            foreach ($array as $row_key => $row) {
                if (is_array($row) && !empty($row)) { //check to see if there is a second dimension
                    foreach ($row as $column_key => $element) {
                        $transposed_array[$column_key][$row_key] = $element;
                    }
                } else {
                    $transposed_array[0][$row_key] = $row;
                }
            }
            return $transposed_array;
        }
    }

    /**
     * Get chart data
     *
     * @param string $cellRange Cells range
     * @param array  $datas     Data table(data cell, format and style)
     *
     * @return array [1] is value has currency..., [2] is raw
     */
    public function readDataChartBySpreadsheet($cellRange, $datas)
    {
        $data0 = array();
        $data1 = array();
        $tblStyles = $datas->style;
        if (!isset($tblStyles->table)) {
            $tblStyles->table = new stdClass();
        }

        $data_value = $datas->datas;

        $folder_admin = dirname(WPTM_PLUGIN_FILE) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'admin';//to calculation
        require_once $folder_admin . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'phpspreadsheet' . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';
        $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
        $activeSheet = $spreadsheet->createSheet(1);
        $maxRows = count($data_value);
        require_once dirname(WPTM_PLUGIN_FILE) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'site' . DIRECTORY_SEPARATOR . 'helpers' . DIRECTORY_SEPARATOR . 'wptmHelper.php';
        $wptmHelper = new WptmHelper();
        $activeSheet->fromArray($wptmHelper->renderValueCalculateCell($data_value, $maxRows), null, 'A1');

        $arr_cellRanges = json_decode($cellRange);
        $countCellRanges = count($arr_cellRanges);
        for ($i = 0; $i < $countCellRanges; $i++) {
            $row = $arr_cellRanges[$i];
            $countRow = count($row);
            $data0[$i] = array();
            $data1[$i] = array();
            for ($j = 0; $j < $countRow; $j++) {
                list($r, $c) = explode(':', $row[$j]);
                if (isset($tblStyles->cells[$r . '!' . $c])) {
                    $tblStyle = $tblStyles->cells[$r . '!' . $c][2];
                } else {
                    $tblStyle = array();
                }

                if (isset($tblStyle['decimal_count']) && $tblStyle['decimal_count'] !== false
                    || isset($tblStyle['decimal_symbol']) && $tblStyle['decimal_symbol'] !== false
                    || isset($tblStyle['currency_symbol']) && $tblStyle['currency_symbol'] !== false) {
                    $wptmHelper::$thousand_symbol_cell = (isset($tblStyle['thousand_symbol']) && $tblStyle['thousand_symbol'] !== false)
                        ? $tblStyle['thousand_symbol'] : ((isset($tblStyle['thousand_symbol_second']) && $tblStyle['thousand_symbol_second'] !== false) ? $tblStyle['thousand_symbol_second'] : $wptmHelper->thousand_symbol);
                    $wptmHelper::$decimal_count_cell = (isset($tblStyle['decimal_count']) && $tblStyle['decimal_count'] !== false)
                        ? $tblStyle['decimal_count'] : ((isset($tblStyle['decimal_count_second']) && $tblStyle['decimal_count_second'] !== false) ? $tblStyle['decimal_count_second'] : $wptmHelper->decimal_count);
                    $wptmHelper::$decimal_symbol_cell = (isset($tblStyle['decimal_symbol']) && $tblStyle['decimal_symbol'] !== false)
                        ? $tblStyle['decimal_symbol'] : ((isset($tblStyle['decimal_symbol_second']) && $tblStyle['decimal_symbol_second'] !== false) ? $tblStyle['decimal_symbol_second'] : $wptmHelper->decimal_symbol);
                    $wptmHelper::$currency_symbol_cell = (isset($tblStyle['currency_symbol']) && $tblStyle['currency_symbol'] !== false)
                        ? $tblStyle['currency_symbol'] : ((isset($tblStyle['currency_symbol_second']) && $tblStyle['currency_symbol_second'] !== false) ? $tblStyle['currency_symbol_second'] : $wptmHelper->currency_symbol);
                    $wptmHelper::$symbol_position_cell = (isset($tblStyle['symbol_position']) && $tblStyle['symbol_position'] !== false)
                        ? $tblStyle['symbol_position'] : ((isset($tblStyle['symbol_position_second']) && $tblStyle['symbol_position_second'] !== false) ? $tblStyle['symbol_position_second'] : $wptmHelper->symbol_position);
                    $has_format_cell = true;
                } else {
                    $wptmHelper::$thousand_symbol_cell = null;
                    $wptmHelper::$decimal_count_cell = null;
                    $wptmHelper::$decimal_symbol_cell = null;
                    $wptmHelper::$currency_symbol_cell = null;
                    $wptmHelper::$symbol_position_cell = null;
                    $has_format_cell = false;
                }

                $cell_value = $data_value[$r][$c];
                $position = array();
                $position[] = $wptmHelper->getNameFromNumber($c);
                $position[] = $r + 1;
                if (preg_match('@^=(DATE|DAY|DAYS|DAYS360|AND|OR|XOR|SUM|MULTIPLY|DIVIDE|COUNT|MIN|MAX|AVG|CONCAT|date|day|days|days360|and|or|xor|sum|multiply|divide|count|min|max|avg|concat)\\((.*?)\\)$@', $cell_value, $matches)) {
                    $formula = strtoupper($matches[1]);
                    //check formula function to replace input value
                    if (in_array($formula, $wptmHelper->math_formula)) {
                        $wptmHelper::$decimal_count_cell = (isset($tblStyle['decimal_count_second']) && $tblStyle['decimal_count_second'] !== false) ? $tblStyle['decimal_count_second'] : $wptmHelper::$decimal_count_cell;
                        $wptmHelper::$decimal_symbol_cell = (isset($tblStyle['decimal_symbol_second']) && $tblStyle['decimal_symbol_second'] !== false) ? $tblStyle['decimal_symbol_second'] : $wptmHelper::$decimal_symbol_cell;
                        $wptmHelper::$thousand_symbol_cell = (isset($tblStyle['thousand_symbol_second']) && $tblStyle['thousand_symbol_second'] !== false) ? $tblStyle['thousand_symbol_second'] : $wptmHelper::$thousand_symbol_cell;
                        $wptmHelper::$currency_symbol_cell = (isset($tblStyle['currency_symbol_second']) && $tblStyle['currency_symbol_second'] !== false) ? $tblStyle['currency_symbol_second'] : $wptmHelper::$currency_symbol_cell;
                        $wptmHelper::$symbol_position_cell = (isset($tblStyle['symbol_position_second']) && $tblStyle['symbol_position_second'] !== false) ? $tblStyle['symbol_position_second'] : $wptmHelper::$symbol_position_cell;
                    }
                    $calculaterCell2 = $wptmHelper->calculaterCell2($data_value, $matches, $activeSheet, $position, true);
                    if (!is_array($calculaterCell2)) {
                        $data1[$i][$j] = null;
                        $data0[$i][$j] = $calculaterCell2;
                    } else {
                        $data1[$i][$j] = $calculaterCell2[1];
                        $data0[$i][$j] = $calculaterCell2[0];
                    }
                } elseif ($has_format_cell) {
                    $col1 = preg_replace('/[-|0-9|,|\.|' . $wptmHelper::$currency_symbol_cell . '| ]/', '', $cell_value);

                    $cell_value = preg_replace('/[' . $wptmHelper::$thousand_symbol_cell . '| ]/', '', $cell_value);
                    $cell_value = preg_replace('/[' . $wptmHelper::$decimal_symbol_cell . '| ]/', '.', $cell_value);
                    $data1[$i][$j] = preg_replace('/[' . $wptmHelper::$currency_symbol_cell . '| ]/', '', $cell_value);
                    if ($col1 === '') {
                        $cell_value = preg_replace('/[' . $wptmHelper::$currency_symbol_cell . '| ]/', '', $cell_value);
                        $cell_value = number_format(floatval($cell_value), $wptmHelper::$decimal_count_cell, $wptmHelper::$decimal_symbol_cell, $wptmHelper::$thousand_symbol_cell);
                    }

                    if (isset($tblStyle['currency_symbol']) && $tblStyle['currency_symbol'] !== '' && $col1 === '') {
                        $cell_value = ((int) $wptmHelper::$symbol_position_cell === 0) ? $wptmHelper::$currency_symbol_cell . ' ' . $cell_value : $cell_value . ' ' . $wptmHelper::$currency_symbol_cell;
                    }
                    $data0[$i][$j] = $cell_value;
                } else {
                    $data0[$i][$j] = $cell_value;
                    $data1[$i][$j] = null;
                }
            }
        }
        return array($data0, $data1);
    }

    /**
     * Get Cell Data
     *
     * @param string $cellPos   Cell Pos
     * @param array  $tableData Table Data
     *
     * @return string
     */
    private function getCellData($cellPos, $tableData)
    {
        $result = '';
        list($r, $c) = explode(':', $cellPos);
        $result = $tableData[$r][$c];
        return $result;
    }

    /**
     * Get a model
     *
     * @param string $modelname Model name
     *
     * @return boolean|object
     */
    public function getModel($modelname)
    {
        $modelname = preg_replace('/[^A-Z0-9_-]/i', '', $modelname);
        $filepath = Factory::getApplication()->getPath() . DIRECTORY_SEPARATOR . 'site' . DIRECTORY_SEPARATOR . 'models' . DIRECTORY_SEPARATOR . strtolower($modelname) . '.php';
        if (!file_exists($filepath)) {
            return false;
        }
        include_once $filepath;
        $class = Factory::getApplication()->getName() . 'Model' . $modelname;
        $model = new $class();
        return $model;
    }
}
