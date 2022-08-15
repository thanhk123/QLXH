<?php
/**
 * WP Table Manager
 *
 * @package WP Table Manager
 * @author  Joomunited
 * @version 1.0
 */

use Joomunited\WPFramework\v1_0_5\Model;

defined('ABSPATH') || die();

/**
 * Class WptmModelTables
 */
class WptmModelTables extends Model
{
    /**
     * Get items
     *
     * @param integer|string $id_category ID category
     * @param null|object    $type        Table type
     *
     * @return boolean|mixed
     */
    public function getItems($id_category = 0, $type = null)
    {
        global $wpdb;
        if ($id_category === 0) {
            $query = 'SELECT c.* FROM ' . $wpdb->prefix . 'wptm_tables as c ORDER BY c.id_category ASC, c.position ASC ';
        } elseif ($id_category !== 'all') {
            $query = 'SELECT c.id, c.position, c.hash, c.title, c.author, c.modified_time, c.type FROM ' . $wpdb->prefix . 'wptm_tables as c WHERE id_category = ' . $id_category;

            if ($type !== null) {
                foreach ($type as $key => $data) {
                    if ($key === 'type') {
                        $query .= ' AND type = ';
                        $query .= '"' . (string) $data . '"';
                    }
                }
            }
            $query .= ' ORDER BY position ASC';
        } elseif ($id_category === 'all') {
            $query = 'SELECT c.id, c.position, c.hash, c.title, c.author, c.modified_time, c.type FROM ' . $wpdb->prefix . 'wptm_tables as c ORDER BY c.id_category ASC, c.position ASC ';
        }

        //phpcs:ignore WordPress.WP.PreparedSQL.NotPrepared -- No variable from user in the query
        $result = $wpdb->query($query);
        if ($result === false) {
            return false;
        }
        //phpcs:ignore WordPress.WP.PreparedSQL.NotPrepared -- No variable from user in the query
        return stripslashes_deep($wpdb->get_results($query, OBJECT));
    }
    
    /**
     * Get list db_tables
     *
     * @return boolean|mixed
     */
    public function getDbItems()
    {
        global $wpdb;
        $query = 'SELECT c.* FROM ' . $wpdb->prefix . 'wptm_tables as c WHERE c.type = "mysql" ORDER BY c.id_category ASC, c.position ASC ';
        $result = $wpdb->query($query);
        if ($result === false) {
            return false;
        }
        //phpcs:ignore WordPress.WP.PreparedSQL.NotPrepared -- No variable from user in the query
        return stripslashes_deep($wpdb->get_results($query, OBJECT));
    }

    /**
     * Get list of all tables
     *
     * @return boolean|mixed
     */
    public function getTables()
    {
        global $wpdb;
        $query  = 'SELECT id, title, id_category, type FROM ' . $wpdb->prefix . 'wptm_tables ORDER BY id_category ASC, position ASC ';
        //phpcs:ignore WordPress.WP.PreparedSQL.NotPrepared -- No variable from user in the query
        $result = $wpdb->query($query);
        if ($result === false) {
            return false;
        }
        //phpcs:ignore WordPress.WP.PreparedSQL.NotPrepared -- No variable from user in the query
        return stripslashes_deep($wpdb->get_results($query, OBJECT));
    }

    /**
     * Get list of tables
     *
     * @param array/integer $ids ID array
     *
     * @return boolean|mixed
     */
    public function getTablesbyIds($ids)
    {
        global $wpdb;
        $query  = 'SELECT id, title, id_category  FROM ' . $wpdb->prefix . 'wptm_tables WHERE id IN ('. implode(',', $ids).') ORDER BY id_category ASC, position ASC ';
        //phpcs:ignore WordPress.WP.PreparedSQL.NotPrepared -- No variable from user in the query
        $result = $wpdb->query($query);
        if ($result === false) {
            return false;
        }
        //phpcs:ignore WordPress.WP.PreparedSQL.NotPrepared -- No variable from user in the query
        return stripslashes_deep($wpdb->get_results($query, OBJECT));
    }

    /**
     * Get list table order by id table
     *
     * @return boolean|array
     */
    public function getListTableById()
    {
        global $wpdb;

        $query = 'SELECT c.* FROM ' . $wpdb->prefix . 'wptm_tables as c ORDER BY c.id ASC';

        //phpcs:ignore WordPress.WP.PreparedSQL.NotPrepared -- No variable from user in the query
        $result = $wpdb->query($query);

        if ($result === false) {
            return false;
        }
        //phpcs:ignore WordPress.WP.PreparedSQL.NotPrepared -- No variable from user in the query
        return stripslashes_deep($wpdb->get_results($query, OBJECT));
    }

    /**
     * Remove data column in wptm_tables
     *
     * @return mixed
     */
    public function removeDataColumn()
    {
        global $wpdb;

        $columns_obj = $wpdb->get_results('SHOW COLUMNS FROM ' . $wpdb->prefix . 'wptm_tables LIKE "datas"');

        if (!empty($columns_obj)) {
            $query = 'ALTER TABLE ' . $wpdb->prefix . 'wptm_tables DROP COLUMN datas';

            //phpcs:ignore WordPress.WP.PreparedSQL.NotPrepared -- No variable from user in the query
            $result = $wpdb->query($query);

            if ($result === false) {
                return false;
            }
        }
        return true;
    }

    /**
     * Get list table has auto syn
     *
     * @return array|boolean
     */
    public function getListTableHasSyn()
    {
        global $wpdb;
        $query  = 'SELECT t.id, t.params, t.mysql_table_name FROM ' . $wpdb->prefix . 'wptm_tables as t WHERE t.type = "html"';
        //phpcs:ignore WordPress.WP.PreparedSQL.NotPrepared -- No variable from user in the query
        $result = $wpdb->query($query);
        if ($result === false) {
            return false;
        }

        $dataList = stripslashes_deep($wpdb->get_results($query, OBJECT));
        $dataReturn = array();
        foreach ($dataList as $table) {
            if ($table->params !== 'null' && is_string($table->params)) {
                $table->params = json_decode($table->params);
            }
            if (isset($table->params->auto_sync) && (int)$table->params->auto_sync === 1 && isset($table->params->spreadsheet_url) && $table->params->spreadsheet_url) {
                $spreadsheet_url = $table->params->spreadsheet_url;
                $spreadsheet_style = isset($table->params->spreadsheet_style) ? (int)$table->params->spreadsheet_style : 0;
                if (strpos($spreadsheet_url, 'docs.google.com/spreadsheet') !== false) {
                    $dataReturn[] = array('id' => $table->id, 'spreadsheet_url' => $spreadsheet_url, 'type' => 'spreadsheet', 'spreadsheet_style' => $spreadsheet_style);
                }
            } elseif (isset($table->params->excel_auto_sync) && (int)$table->params->excel_auto_sync === 1 && isset($table->params->excel_url) && $table->params->excel_url) {
                $spreadsheet_url = $table->params->excel_url;
                $spreadsheet_style = isset($table->params->excel_spreadsheet_style) ? (int)$table->params->excel_spreadsheet_style : 0;
                $dataReturn[] = array('id' => $table->id, 'spreadsheet_url' => $spreadsheet_url, 'type' => 'excel', 'spreadsheet_style' => $spreadsheet_style);
            } elseif (isset($table->params->auto_sync_onedrive) && (int)$table->params->auto_sync_onedrive === 1 && isset($table->params->onedrive_url) && $table->params->onedrive_url) {
                $spreadsheet_url = $table->params->onedrive_url;
                $spreadsheet_style = isset($table->params->onedrive_style) ? (int)$table->params->onedrive_style : 0;
                $dataReturn[] = array('id' => $table->id, 'spreadsheet_url' => $spreadsheet_url, 'type' => 'onedrive', 'spreadsheet_style' => $spreadsheet_style);
            }
        }
        return $dataReturn;
    }
}
