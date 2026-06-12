<?php
/**
 * Plugin Name: University Hall React App
 * Description: Serves the UHall React SPA from /wp-content/uhall-react-app/
 * Version: 3.0.0
 * Author: UHall Dev Team
 *
 * How it works:
 *   1. On every front-end request, check if the URL matches a real file in
 *      /wp-content/uhall-react-app/ → serve it directly with correct MIME type.
 *   2. If it's NOT a real file and NOT a WordPress path (/wp-*), serve
 *      index.html with HTTP 200 so React Router can handle the route.
 *   3. Everything else (admin, API, uploads) → pass through to WordPress.
 *
 * Critical: status_header(200) must be called before serving index.html,
 * otherwise WordPress's 404 status leaks through even with correct content.
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Get the React build directory path.
 */
function uhall_build_dir(): string {
    return WP_CONTENT_DIR . '/uhall-react-app';
}

/**
 * MIME type map for static files.
 */
function uhall_mime_types(): array {
    return [
        'js'    => 'application/javascript',
        'css'   => 'text/css',
        'json'  => 'application/json',
        'html'  => 'text/html',
        'svg'   => 'image/svg+xml',
        'png'   => 'image/png',
        'jpg'   => 'image/jpeg',
        'jpeg'  => 'image/jpeg',
        'JPG'   => 'image/jpeg',
        'JPEG'  => 'image/jpeg',
        'gif'   => 'image/gif',
        'webp'  => 'image/webp',
        'ico'   => 'image/x-icon',
        'woff'  => 'font/woff',
        'woff2' => 'font/woff2',
        'mp4'   => 'video/mp4',
        'webm'  => 'video/webm',
        'pdf'   => 'application/pdf',
    ];
}

/**
 * Intercept front-end requests to serve the React SPA.
 *
 * Uses the `init` hook because it fires early enough to serve files
 * but late enough that is_admin() and other WP functions are available.
 */
add_action('init', function () {
    // ── Never intercept WordPress internals ──
    if (is_admin() || wp_doing_ajax() || defined('WP_CLI') || defined('REST_REQUEST')) {
        return;
    }

    $request_uri = $_SERVER['REQUEST_URI'] ?? '/';
    $path = parse_url($request_uri, PHP_URL_PATH);

    // Blocklist: never intercept WP core paths
    if (
        strpos($path, '/wp-admin') === 0 ||
        strpos($path, '/wp-json') === 0 ||
        strpos($path, '/wp-cron') === 0 ||
        strpos($path, '/wp-includes') === 0 ||
        strpos($path, '/wp-login') === 0 ||
        strpos($path, '/xmlrpc') === 0
    ) {
        return;
    }

    $build_dir = uhall_build_dir();
    $file_path = $build_dir . $path;

    // ── Try to serve a real file first ──
    $real_file = realpath($file_path);
    $real_base = realpath($build_dir);

    if ($real_file !== false && $real_base !== false) {
        // Prevent directory traversal
        if (strpos($real_file, $real_base) === 0 && is_file($real_file) && is_readable($real_file)) {
            $ext = pathinfo($real_file, PATHINFO_EXTENSION);
            $mimes = uhall_mime_types();

            if (isset($mimes[$ext])) {
                header('Content-Type: ' . $mimes[$ext]);
                header('Content-Length: ' . filesize($real_file));
                header('Cache-Control: public, max-age=31536000, immutable');
                header('X-Robots-Tag: noindex');
                readfile($real_file);
                exit;
            }
        }
    }

    // ── Otherwise: SPA route — serve index.html with HTTP 200 ──
    // IMPORTANT: We don't check is_404() here because WordPress's URL routing
    // might have already set other statuses or redirects. We just check the path
    // is not a WordPress core path and isn't a real file in the build directory.

    $index_path = $build_dir . '/index.html';

    if (!file_exists($index_path) || !is_readable($index_path)) {
        return; // Build not uploaded yet — let WordPress 404 normally
    }

    status_header(200);
    header('Content-Type: text/html; charset=UTF-8');
    header('X-Robots-Tag: noindex, follow');
    readfile($index_path);
    exit;
});