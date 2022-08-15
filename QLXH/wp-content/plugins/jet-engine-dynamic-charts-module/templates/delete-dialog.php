<cx-vui-popup
	v-model="isVisible"
	:ok-label="'<?php _e( 'Delete chart', 'jet-engine' ) ?>'"
	:cancel-label="'<?php _e( 'Cancel', 'jet-engine' ) ?>'"
	@on-cancel="handleCancel"
	@on-ok="handleOk"
>
	<div class="cx-vui-subtitle" slot="title"><?php
		_e( 'Please confirm chart deletion', 'jet-engine' );
	?></div>
	<p slot="content">
		<?php _e( 'Are you sure you want to delete this chart? Please ensure you removed it from all pages where it was used.', 'jet-engine' ); ?><br>
	</p>
</cx-vui-popup>
