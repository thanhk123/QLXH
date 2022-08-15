<?php
namespace Jet_Engine_Dynamic_Tables\Render;

use Jet_Engine_Dynamic_Tables\Table;

class Table_Renderer extends \Jet_Engine_Render_Base {

	private $table = null;

	public function get_name() {
		return 'jet-dynamic-table';
	}

	public function default_settings() {
		return array(
			'table_id'   => null,
			'thead'      => true,
			'tfoot'      => false,
			'inline_css' => false,
			'scrollable' => false,
		);
	}

	public function setup_table( $table_id = null, $columns = array(), $settings = array() ) {

		if ( null !== $this->table ) {
			return;
		}

		if ( $table_id ) {
			$this->table = new Table( $table_id );
		} else {
			$this->table = new Table();
			$this->table->setup_table( $columns, $settings );
		}

	}

	public function render() {

		$table_id = $this->get( 'table_id' );

		if ( ! $table_id ) {
			return;
		}

		$this->setup_table( $table_id );

		do_action( 'jet-engine/data-tables/before-render', $this );

		$this->table_header();
		$this->table_body();
		$this->table_footer();

		jet_engine()->frontend->reset_data();

	}

	public function css_class( $suffix = '' ) {
		if ( ! is_array( $suffix ) ) {
			return $this->get_name() . $suffix;
		} else {
			$res = array();

			foreach ( $suffix as $suffix_item ) {
				$res[] = $this->get_name() . $suffix_item;
			}

			return implode( ' ', $res );
		}
	}

	public function get_table_object() {
		return $this->table;
	}

	/**
	 * [table_header description]
	 * @return [type] [description]
	 */
	public function table_header() {

		$header = $this->get( 'thead' );
		$inline_css = $this->get( 'inline_css' );
		$scrollable = $this->get( 'scrollable' );
		$scrollable = filter_var( $scrollable, FILTER_VALIDATE_BOOLEAN );

		if ( $inline_css ) {
			$inline_css = str_replace( '{{WRAPPER}}', '.' . $this->css_class() . '[data-table-id="' . $this->table->get_id() . '"]', $inline_css );
		}

		$scrollable_css = '';

		if ( $scrollable ) {
			$scrollable_css = ' style="max-width: 100%; overflow: auto;"';
		}

		echo '<style>' . $inline_css . '</style>';
		echo '<div class="' . $this->css_class( '-wrapper' ) . '"' . $scrollable_css . '>';
		echo '<table class="' . $this->css_class() . '" data-table-id="' . $this->table->get_id() . '">';

		if ( $header ) {
			echo '<thead class="' . $this->css_class( '__header' ) . '">';
			$this->render_row( $this->table->get_columns_headers(), 'th', 'header' );
			echo '</thead>';
		}
	}

	public function render_row( $columns = array(), $html_tag = 'td', $class = 'regular', $data_attr = '' ) {
		echo '<tr class="' . $this->css_class( array( '__row', '__row--header' ) ) . '" ' . $data_attr . '>';
			foreach ( $columns as $column ) {

				$column_css = '';
				$css = $this->table->get_column_css( $column['id'], $html_tag );

				if ( $css ) {
					$column_css = 'style="' . $css . '"';
				}

				printf(
					'<%1$s class="%2$s" %4$s>%3$s</%1$s>',
					$html_tag,
					$this->css_class( array( '__col', '__col--' . $column['css_class'] ) ),
					$column['content'],
					$column_css
				);
			}
		echo '</tr>';
	}

	public function table_body() {

		echo '<tbody class="' . $this->css_class( '__body' ) . '">';
		$headers = $this->table->get_columns_headers();

		foreach ( $this->table->get_rows() as $row_object ) {

			$columns = $this->table->get_row_contents( $row_object );
			// must be called after table->get_row_contents()
			$data_attr = 'data-item-object="' . jet_engine()->listings->data->get_current_object_id() . '"';

			$this->render_row( $columns, 'td', 'regular', $data_attr );

		}

		echo '</tbody>';
	}

	/**
	 * [table_header description]
	 * @return [type] [description]
	 */
	public function table_footer() {

		$footer = $this->get( 'tfoot' );

		if ( $footer ) {
			echo '<tfoot class="' . $this->css_class( '__header' ) . '">';
			$this->render_row( $this->table->get_columns_headers(), 'th', 'footer' );
			echo '</tfoot>';
		}

		echo '</table>';
		echo '</div>';
	}

}
