<?php
namespace Jet_Engine_Dynamic_Charts\Elementor;

use Jet_Engine_Dynamic_Charts\Chart;

class Manager {

	public function __construct() {
		$this->init_components();
	}

	public function init_components() {
		add_action( 'elementor/widgets/widgets_registered', array( $this, 'register_widgets' ), 10 );
		add_action( 'elementor/preview/enqueue_scripts', array( $this, 'enqueue_preview_script' ) );
	}

	public function enqueue_preview_script() {
		Chart::enqueue_charts_js();
	}

	public function register_widgets( $widgets_manager ) {
		$widgets_manager->register_widget_type( new Chart_Widget() );
	}

}
