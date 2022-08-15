<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'qlxh' );

/** Database username */
define( 'DB_USER', 'qlxh' );

/** Database password */
define( 'DB_PASSWORD', '123456' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'p8YVH<f.Zs9 S0`iBc@tJY|+fL&#G]nlU%P^Fbs>@Vk(XF_3^ I24VP|^abQ:H*]' );
define( 'SECURE_AUTH_KEY',  ' qrBGjLL8Z+wxLMc.?I9[3NV{nhyQy{}[o|t8mevS]);D%=*APX5cO6@f^2%%&!K' );
define( 'LOGGED_IN_KEY',    '$HM5F$TRyCm&$9%QWI8F8CP=jb?3ZdD6v/qh9($F$ioAJ#{! oRXt:E@IxYy Dea' );
define( 'NONCE_KEY',        'dDz^w1Qj;471C%(FZKVY,9uGEDV6j$hz}Gu--s$FU-@?]k%?pzuDT:6rs]EX2&&8' );
define( 'AUTH_SALT',        'C-x=OUh}?QS<Y%z+CFbd.8]DY2G2`HXZkd|~Ge*Ou7j[@4<HAFZ@_AmKVm%L{l<|' );
define( 'SECURE_AUTH_SALT', 'hT6NecJYnWgE`+s+BDtVW]uEz9_cw]m6X9-q-={A]IFjiY6`Rb}CsSbG`br(7Wrm' );
define( 'LOGGED_IN_SALT',   'Hhi)+1>w}p[)L/6L^l7$F=c|q4-$[S,ZO.U,H:$#?&~8_by$5cS.HKPmwh>BGfYI' );
define( 'NONCE_SALT',       'pJ0Vr8GaOE7i0@lc$@v)8$OGVCQ=|1R_(g&OZM-PJcsS=Q0LOl!=h$[7r K!RxGW' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
