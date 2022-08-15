import Edit from './edit';

const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const {
	Path,
	SVG
} = wp.components;

const Icon = <SVG width="24" height="24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
	<Path fillRule="evenodd" clipRule="evenodd" d="M12 18H52C53.1046 18 54 18.8954 54 20V45C54 46.1046 53.1046 47 52 47H12C10.8954 47 10 46.1046 10 45V20C10 18.8954 10.8954 18 12 18ZM8 20C8 17.7909 9.79086 16 12 16H52C54.2091 16 56 17.7909 56 20V45C56 47.2091 54.2091 49 52 49H12C9.79086 49 8 47.2091 8 45V20ZM14 28C13.4477 28 13 28.4477 13 29C13 29.5523 13.4477 30 14 30H50C50.5523 30 51 29.5523 51 29C51 28.4477 50.5523 28 50 28H14ZM13 33C13 32.4477 13.4477 32 14 32H50C50.5523 32 51 32.4477 51 33C51 33.5523 50.5523 34 50 34H14C13.4477 34 13 33.5523 13 33ZM14 36C13.4477 36 13 36.4477 13 37C13 37.5523 13.4477 38 14 38H50C50.5523 38 51 37.5523 51 37C51 36.4477 50.5523 36 50 36H14ZM13 41C13 40.4477 13.4477 40 14 40H32C32.5523 40 33 40.4477 33 41C33 41.5523 32.5523 42 32 42H14C13.4477 42 13 41.5523 13 41ZM14 22C13.4477 22 13 22.4477 13 23C13 23.5523 13.4477 24 14 24C14.5523 24 15 23.5523 15 23C15 22.4477 14.5523 22 14 22ZM17 23C17 22.4477 17.4477 22 18 22C18.5523 22 19 22.4477 19 23C19 23.5523 18.5523 24 18 24C17.4477 24 17 23.5523 17 23ZM22 22C21.4477 22 21 22.4477 21 23C21 23.5523 21.4477 24 22 24C22.5523 24 23 23.5523 23 23C23 22.4477 22.5523 22 22 22Z" fill="#162B40"></Path>
</SVG>;

registerBlockType( 'jet-engine/profile-menu', {
	icon: Icon,
	title: __( 'Profile Menu' ),
	category: 'layout',
	attributes: {
		menu_context: {
			type: 'string',
			default: 'account_page',
		},
		account_roles: {
			default: [],
		},
		user_roles: {
			default: [],
		},
		add_main_slug: {
			type: 'boolean',
			default: false,
		},
		menu_layout: {
			type: 'string',
			default: 'horizontal',
		},
		menu_layout_tablet: {
			type: 'string',
			default: 'horizontal',
		},
		menu_layout_mobile: {
			type: 'string',
			default: 'horizontal',
		},
	},
	className: 'jet-profile',
	edit: Edit,
	save: ( props ) => {
		return null;
	},
} );
