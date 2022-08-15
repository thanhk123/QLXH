<?php
namespace Jet_Engine_Dynamic_Charts;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Main file
 */
class Plugin {

	/**
	 * Instance.
	 *
	 * Holds the plugin instance.
	 *
	 * @since 1.0.0
	 * @access public
	 * @static
	 *
	 * @var Plugin
	 */
	public static $instance = null;

	/**
	 * Plugin components
	 */
	public $data;

	/**
	 * Instance.
	 *
	 * Ensures only one instance of the plugin class is loaded or can be loaded.
	 *
	 * @since 1.0.0
	 * @access public
	 * @static
	 *
	 * @return Plugin An instance of the class.
	 */
	public static function instance() {

		if ( is_null( self::$instance ) ) {

			self::$instance = new self();

		}

		return self::$instance;

	}

	/**
	 * Register autoloader.
	 */
	private function register_autoloader() {
		require JET_ENGINE_DYNAMIC_CHARTS_PATH . 'includes/autoloader.php';
		Autoloader::run();
	}

	/**
	 * Initialize plugin parts
	 *
	 * @return void
	 */
	public function on_init() {

		$dashboard = Admin\Dashboard::instance();
		$this->data = new Data( $dashboard );

		new Render\Preview();
		new Blocks\Manager();

		if ( defined( 'ELEMENTOR_VERSION' ) ) {
			new Elementor\Manager();
		}

	}

	public function get_locale() {

		$locale = get_locale();
		$locale = str_replace( '_', '-', $locale );

		return apply_filters( 'jet-engine/charts/locale', $locale );
	}

	/**
	 * Register table renderer class
	 *
	 * @param  [type] $manager [description]
	 * @return [type]          [description]
	 */
	public function register_chart_renderer( $manager ) {
		$manager->register_render_class(
			'dynamic-chart',
			array(
				'class_name' => '\Jet_Engine_Dynamic_Charts\Render\Chart_Renderer',
				'path'       => JET_ENGINE_DYNAMIC_CHARTS_PATH . 'includes/render/table-chart.php',
			)
		);
	}

	public function on_load() {

		add_action( 'jet-engine/listings/renderers/registered', array( $this, 'register_chart_renderer' ) );

		if ( class_exists( '\Jet_Smart_Filters' ) ) {
			new Filters\Manager();
		}
	}

	/**
	 * Plugin constructor.
	 */
	private function __construct() {

		if ( ! function_exists( 'jet_engine' ) ) {
			return;
		}

		if ( ! version_compare( jet_engine()->get_version(), '2.8.99', '>=' ) ) {
			return;
		}

		$this->register_autoloader();

		add_action( 'init', array( $this, 'on_init' ), 12 );

		$this->on_load();

	}

}

Plugin::instance();
