(function( $, JetEngineChartsListConfig ) {

	'use strict';

	window.JetEngineChartsList = new Vue( {
		el: '#jet_charts_list',
		template: '#jet-charts-list',
		data: {
			itemsList: [],
			errorNotices: [],
			editLink: JetEngineChartsListConfig.edit_link,
			queries: JetEngineChartsListConfig.queries,
			showDeleteDialog: false,
			deletedItem: {},
		},
		mounted() {

			var params = new URLSearchParams();

			params.append( 'instance', JetEngineChartsListConfig.instance );

			wp.apiFetch( {
				method: 'get',
				path: JetEngineChartsListConfig.api_path + '?' + params.toString(),
			} ).then( ( response ) => {

				if ( response.success && response.data ) {
					for ( var itemID in response.data ) {
						var item = response.data[ itemID ];
						this.itemsList.push( item );
					}
				} else {
					this.$CXNotice.add( {
						message: response.message,
						type: 'error',
						duration: 15000,
					} );
				}
			} ).catch( ( e ) => {
				this.$CXNotice.add( {
					message: e.message,
					type: 'error',
					duration: 15000,
				} );
			} );
		},
		methods: {
			queryLabel( id ) {
				var qLabel = this.queries[ id ] || id;
				return qLabel;
			},
			deleteItem( item ) {
				this.deletedItem      = item;
				this.showDeleteDialog = true;
			},
			getEditLink( id ) {
				return this.editLink.replace( /%id%/, id );
			},
		}
	} );

})( jQuery, window.JetEngineChartsListConfig );
