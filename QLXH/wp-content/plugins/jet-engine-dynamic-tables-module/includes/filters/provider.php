<?php
/**
 * Class: Jet_Smart_Filters_Provider_Jet_Engine
 * Name: JetEngine
 */
namespace Jet_Engine_Dynamic_Tables\Filters;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Define filters provider class
 */
class Provider extends \Jet_Smart_Filters_Provider_Base {

	/**
	 * Watch for default query
	 */
	public function __construct() {

		if ( ! jet_smart_filters()->query->is_ajax_filter() ) {
			add_action( 'jet-engine/data-tables/before-render', array( $this, 'store_default_query' ) );
		}

	}

	/**
	 * Store default query args
	 *
	 * @param  [type] $args [description]
	 * @return [type]       [description]
	 */
	public function store_default_query( $renderer ) {

		$settings = $renderer->get_settings();

		if ( empty( $settings['_element_id'] ) ) {
			$query_id = false;
		} else {
			$query_id = $settings['_element_id'];
		}

		$provider_settings = $renderer->get_required_settings();
		$query             = $renderer->get_table_object()->get_query();

		jet_smart_filters()->providers->store_provider_settings(
			$this->get_id(),
			$provider_settings,
			$query_id
		);

		jet_smart_filters()->query->set_props(
			$this->get_id(),
			array(
				'found_posts'   => $query->get_items_total_count(),
				'max_num_pages' => $query->get_items_pages_count(),
				'page'          => $query->get_current_items_page(),
			),
			$query_id
		);

	}

	/**
	 * Get provider name
	 *
	 * @return string
	 */
	public function get_name() {
		return __( 'JetEngine Dynamic Table', 'jet-engine' );
	}

	/**
	 * Get provider ID
	 *
	 * @return string
	 */
	public function get_id() {
		return 'jet-data-table';
	}

	/**
	 * Get filtered provider content
	 *
	 * @return string
	 */
	public function ajax_get_content() {

		$settings = isset( $_REQUEST['settings'] ) ? $_REQUEST['settings'] : array();
		$render   = jet_engine()->listings->get_render_instance( 'dynamic-table', $settings );

		if ( empty( $settings['table_id'] ) ) {
			return;
		}

		$render->setup_table( absint( $settings['table_id'] ) );
		$render->table_body();

	}

	/**
	 * Get provider wrapper selector
	 *
	 * @return string
	 */
	public function get_wrapper_selector() {
		return '.jet-dynamic-table__body';
	}

	/**
	 * Action for wrapper selector - 'insert' into it or 'replace'
	 *
	 * @return string
	 */
	public function get_wrapper_action() {
		return 'replace';
	}

	/**
	 * If added unique ID this paramter will determine - search selector inside this ID, or is the same element
	 *
	 * @return bool
	 */
	public function in_depth() {
		return true;
	}

	public function apply_filters_in_request() {}

}
