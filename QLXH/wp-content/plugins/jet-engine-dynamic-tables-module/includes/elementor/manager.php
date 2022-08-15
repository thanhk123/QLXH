<?php
namespace Jet_Engine_Dynamic_Tables\Elementor;

class Manager {

	public function __construct() {
		add_action( 'elementor/widgets/widgets_registered', array( $this, 'register_widgets' ), 10 );
	}

	public function register_widgets( $widgets_manager ) {
		$widgets_manager->register_widget_type( new Table_Widget() );
	}

}
