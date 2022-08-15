<?php
/**
 * WP Table Manager
 *
 * @package WP Table Manager
 * @author  Joomunited
 * @version 1.0
 */

use Joomunited\WPFramework\v1_0_5\Model;
use Joomunited\WPFramework\v1_0_5\Factory;

defined('ABSPATH') || die();

/**
 * Class WptmModelConfig
 */
class WptmModelConfig extends Model
{
    /**
     * Get config wptm
     *
     * @return array
     */
    public function getConfig()
    {
        $defaultConfig = array(
            'enable_import_excel' => 1,
            'export_excel_format' => 'xlsx',
            'enable_autosave'     => 1,
            'open_table'          => 1,
            'sync_periodicity'    => 0,
            'wptm_sync_method'    => 'ajax',
            'enable_frontend'     => 0
        );
        $config        = (array) get_option('_wptm_global_config', $defaultConfig);

        $config        = array_merge($defaultConfig, $config);
        return $config;
    }

    /**
     * Function save config wptm
     *
     * @param array $datas Data config
     *
     * @return boolean
     */
    public function save($datas)
    {
        $config = get_option('_wptm_global_config');

        foreach ($datas as $key => $value) {
            $config[$key] = $value;
        }

        update_option('_wptm_global_config', $config, false);

        return true;
    }

    /**
     * Save local font
     *
     * @param string $action Data config
     * @param array  $option Data config
     *
     * @return boolean
     */
    public function setLocalFont($action, $option)
    {
        global $wpdb;
        $table = $wpdb->prefix . 'wptm_table_options';
        if ($action === 'delete') {
            $result = $wpdb->query(
                $wpdb->prepare(
                    'DELETE FROM ' . $table . ' WHERE option_name = %s AND id = %d',
                    'local_font',
                    (int)$option['fontid']
                )
            );
            if ($result === false) {
                $this->exitStatus(__('error while changing table', 'wptm'));
            } else {
                $this->exitStatus(true);
            }
        } elseif ($action === 'update' && $option['fontid'] !== null) {
            $result = $wpdb->update(
                $table,
                array(
                    'option_name' => 'local_font',
                    'option_value' => json_encode($option)
                ),
                array(
                    'id' => $option['fontid']
                )
            );
            if ($result === false) {
                $this->exitStatus(__('error while changing table', 'wptm'));
            } else {
                $this->exitStatus(true);
            }
        } else {
            $result = $wpdb->insert(
                $table,
                array(
                    'option_name' =>  'local_font',
                    'option_value' => json_encode($option)
                )
            );
        }
        if ($result === false) {
            $this->exitStatus(__('error while changing table', 'wptm'));
        }
        $this_insert = $wpdb->insert_id;
        return $this_insert;
    }

    /**
     * Exit a request serving a json result
     *
     * @param string $status Exit status
     * @param array  $datas  Echoed datas
     *
     * @since 1.0.3
     *
     * @return void
     */
    protected function exitStatus($status = '', $datas = array())
    {
        $response = array('response' => $status, 'datas' => $datas);
        echo json_encode($response);
        die();
    }
}
