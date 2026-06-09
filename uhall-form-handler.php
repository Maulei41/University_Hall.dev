<?php
/**
 * Plugin Name: UHall Form Handler
 * Description: Stores interview form submissions from the React SPA and provides an admin page to view, delete, and download them as CSV.
 * Version: 1.2.0
 * Author: UHall Dev Team
 *
 * Place this file at: wp-content/plugins/uwall-form-handler/uwall-form-handler.php
 * Then activate from WordPress Admin → Plugins.
 */

if (!defined('ABSPATH')) {
    exit;
}

define('UHALL_FORM_VERSION', '1.2.0');

// ─────────────────────────────────────────────────────────────────────────────
//  1.  Database Setup (on plugin activation)
// ─────────────────────────────────────────────────────────────────────────────

register_activation_hook(__FILE__, 'uhall_form_activate');
register_deactivation_hook(__FILE__, 'uhall_form_deactivate');

function uhall_form_activate(): void {
    global $wpdb;
    $table = $wpdb->prefix . 'uhall_submissions';
    $charset = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS {$table} (
        id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        full_name   VARCHAR(255)    NOT NULL,
        email       VARCHAR(255)    NOT NULL,
        phone       VARCHAR(100)    NOT NULL DEFAULT '',
        uid         VARCHAR(100)    NOT NULL DEFAULT '',
        nationality VARCHAR(255)    NOT NULL DEFAULT '',
        program     VARCHAR(255)    NOT NULL DEFAULT '',
        year_of_study VARCHAR(50)  NOT NULL DEFAULT '',
        motivation  TEXT            NOT NULL,
        hear_about  VARCHAR(255)    NOT NULL DEFAULT '',
        comments    TEXT            NOT NULL,
        created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) {$charset};";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta($sql);
}

function uhall_form_deactivate(): void {
    // Nothing to clean up — keeping data is intentional.
}

// ─────────────────────────────────────────────────────────────────────────────
//  2.  REST API Endpoint (receives form submissions from React SPA)
// ─────────────────────────────────────────────────────────────────────────────

add_action('rest_api_init', function () {
    register_rest_route('uhall/v1', '/submissions', [
        'methods'             => 'POST',
        'callback'            => 'uhall_form_handle_submission',
        'permission_callback' => '__return_true',
    ]);
});

function uhall_form_handle_submission(WP_REST_Request $request): WP_REST_Response {
    $data = $request->get_json_params();

    $required = ['fullName', 'email', 'motivation'];
    $errors = [];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            $errors[$field] = 'This field is required';
        }
    }

    if (!empty($data['email']) && !is_email($data['email'])) {
        $errors['email'] = 'Invalid email address';
    }

    if (!empty($errors)) {
        return new WP_REST_Response([
            'success' => false,
            'errors'  => $errors,
        ], 400);
    }

    global $wpdb;
    $table = $wpdb->prefix . 'uhall_submissions';

    $wpdb->insert($table, [
        'full_name'     => sanitize_text_field($data['fullName'] ?? ''),
        'email'         => sanitize_email($data['email'] ?? ''),
        'phone'         => sanitize_text_field($data['phone'] ?? ''),
        'uid'           => sanitize_text_field($data['uid'] ?? ''),
        'nationality'   => sanitize_text_field($data['nationality'] ?? ''),
        'program'       => sanitize_text_field($data['program'] ?? ''),
        'year_of_study' => sanitize_text_field($data['yearOfStudy'] ?? ''),
        'motivation'    => sanitize_textarea_field($data['motivation'] ?? ''),
        'hear_about'    => sanitize_text_field($data['hearAbout'] ?? ''),
        'comments'      => sanitize_textarea_field($data['comments'] ?? ''),
    ]);

    // Send notification email
    $to = 'uhall@connect.hku.hk';
    $subject = 'Non-local Student Interview Info - University Hall Application';
    $headers = [
        'Content-Type: text/html; charset=UTF-8',
        'From: UHall Website <noreply@uhall.hku.hk>',
    ];

    $message = '<h2>Non-local Student Interview Information</h2>';
    $message .= '<table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;">';
    $rows_email = [
        'Full Name'         => $data['fullName'] ?? '',
        'Email'             => $data['email'] ?? '',
        'Phone'             => $data['phone'] ?? '',
        'University ID'     => $data['uid'] ?? '',
        'Nationality'       => $data['nationality'] ?? '',
        'Program of Study'  => $data['program'] ?? '',
        'Year of Study'     => $data['yearOfStudy'] ?? '',
        'Why University Hall' => $data['motivation'] ?? '',
        'How did you hear'  => $data['hearAbout'] ?? '',
        'Additional Comments' => $data['comments'] ?? '',
    ];
    foreach ($rows_email as $label => $value) {
        $message .= '<tr>';
        $message .= '<td style="border-bottom:1px solid #eee;padding:8px;font-weight:bold;color:#333;">' . esc_html($label) . '</td>';
        $message .= '<td style="border-bottom:1px solid #eee;padding:8px;color:#555;">' . esc_html($value) . '</td>';
        $message .= '</tr>';
    }
    $message .= '</table>';
    $message .= '<p style="color:#999;font-size:12px;margin-top:20px;">Submitted via UHall website form.</p>';

    wp_mail($to, $subject, $message, $headers);

    if ($wpdb->last_error) {
        return new WP_REST_Response([
            'success' => false,
            'message' => 'Database error.',
        ], 500);
    }

    return new WP_REST_Response([
        'success' => true,
        'message' => 'Submission saved.',
        'id'      => $wpdb->insert_id,
    ], 201);
}

// ─────────────────────────────────────────────────────────────────────────────
//  3.  CSV Download (intercepted early via admin_init, before any admin HTML)
// ─────────────────────────────────────────────────────────────────────────────

add_action('admin_init', function () {
    // Only act on our admin page
    $page = $_GET['page'] ?? '';
    if ($page !== 'uhall-submissions') {
        return;
    }

    $download = $_GET['download_csv'] ?? '';
    if ($download !== '1') {
        return;
    }

    // Must have manage_options capability
    if (!current_user_can('manage_options')) {
        wp_die('Unauthorized.');
    }

    uhall_form_download_csv();
});

function uhall_form_download_csv(): void {
    global $wpdb;
    $table = $wpdb->prefix . 'uhall_submissions';
    $rows  = $wpdb->get_results("SELECT * FROM {$table} ORDER BY created_at DESC", ARRAY_A);

    if (empty($rows)) {
        wp_die('No submissions to export.');
    }

    header('Content-Type: text/csv; charset=UTF-8');
    header('Content-Disposition: attachment; filename="interview-submissions-' . date('Y-m-d') . '.csv"');
    header('Pragma: no-cache');
    header('Expires: 0');

    $output = fopen('php://output', 'w');
    fwrite($output, "\xEF\xBB\xBF");

    fputcsv($output, [
        'ID', 'Date', 'Full Name', 'Email', 'Phone', 'University ID',
        'Nationality', 'Program of Study', 'Year of Study',
        'Motivation / Why UHall', 'How Did You Hear', 'Additional Comments',
    ]);

    foreach ($rows as $r) {
        fputcsv($output, [
            $r['id'], $r['created_at'], $r['full_name'], $r['email'],
            $r['phone'], $r['uid'], $r['nationality'], $r['program'],
            $r['year_of_study'], $r['motivation'], $r['hear_about'], $r['comments'],
        ]);
    }

    fclose($output);
    exit;
}

// ─────────────────────────────────────────────────────────────────────────────
//  4.  Admin Page
// ─────────────────────────────────────────────────────────────────────────────

add_action('admin_menu', function () {
    add_menu_page(
        'Interview Submissions',
        'Interview Submissions',
        'manage_options',
        'uhall-submissions',
        'uhall_form_admin_page',
        'dashicons-feedback',
        30
    );
});

function uhall_form_admin_page(): void {
    global $wpdb;
    $table = $wpdb->prefix . 'uhall_submissions';
    $message = '';

    // ── Handle batch delete (POST) ──
    if (isset($_POST['action']) && $_POST['action'] === 'batch_delete') {
        if (!isset($_POST['_wpnonce_batch']) || !wp_verify_nonce($_POST['_wpnonce_batch'], 'batch_delete_submissions')) {
            wp_die('Security check failed.');
        }

        if (!empty($_POST['submission_ids']) && is_array($_POST['submission_ids'])) {
            $ids = array_map('intval', $_POST['submission_ids']);
            $ids = array_filter($ids);
            $placeholders = implode(',', array_fill(0, count($ids), '%d'));
            $wpdb->query($wpdb->prepare("DELETE FROM {$table} WHERE id IN ({$placeholders})", $ids));

            if ($wpdb->last_error) {
                $message = '<div class="notice notice-error"><p>Failed to delete selected submissions.</p></div>';
            } else {
                $count = count($ids);
                $message = sprintf(
                    '<div class="notice notice-success"><p>%d submission(s) deleted.</p></div>',
                    $count
                );
            }
        } else {
            $message = '<div class="notice notice-warning"><p>No submissions selected.</p></div>';
        }
    }

    // ── Handle single delete (GET) ──
    if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['id'])) {
        if (!isset($_GET['_wpnonce']) || !wp_verify_nonce($_GET['_wpnonce'], 'delete_submission_' . $_GET['id'])) {
            wp_die('Security check failed.');
        }

        $id = intval($_GET['id']);
        $wpdb->delete($table, ['id' => $id], ['%d']);

        if ($wpdb->last_error) {
            $message = '<div class="notice notice-error"><p>Failed to delete submission.</p></div>';
        } else {
            $message = '<div class="notice notice-success"><p>Submission deleted.</p></div>';
        }
    }

    // Pagination
    $per_page = 20;
    $page     = isset($_GET['paged']) ? max(1, intval($_GET['paged'])) : 1;
    $offset   = ($page - 1) * $per_page;
    $total    = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$table}");
    $rows     = $wpdb->get_results(
        $wpdb->prepare("SELECT * FROM {$table} ORDER BY created_at DESC LIMIT %d OFFSET %d", $per_page, $offset),
        ARRAY_A
    );

    ?>
    <div class="wrap">
        <h1>Interview Submissions</h1>
        <p>Form submissions from the Non-local Student Interview form on the React SPA.</p>

        <?php echo $message; ?>

        <div style="margin-bottom: 16px; display: flex; gap: 8px; align-items: center;">
            <a href="<?php echo admin_url('admin.php?page=uhall-submissions&download_csv=1'); ?>" class="button button-primary">
                Download CSV
            </a>
        </div>

        <form method="post" id="submissions-form">
            <?php wp_nonce_field('batch_delete_submissions', '_wpnonce_batch'); ?>
            <input type="hidden" name="action" value="batch_delete" />

            <div style="margin-bottom: 10px;">
                <button type="submit" class="button button-link-delete" id="delete-selected-btn"
                        onclick="return confirm('Delete the selected submission(s)?')">
                    Delete Selected
                </button>
                <span class="description" style="margin-left: 8px;">
                    <label><input type="checkbox" id="select-all" /> Select all</label>
                </span>
            </div>

            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th style="width:30px;"><input type="checkbox" id="select-all-header" /></th>
                        <th style="width:50px;">ID</th>
                        <th style="width:140px;">Date</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>UID</th>
                        <th>Nationality</th>
                        <th>Program</th>
                        <th>Year</th>
                        <th>Motivation</th>
                        <th>Hear About</th>
                        <th>Comments</th>
                        <th style="width:60px;">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($rows)): ?>
                        <tr><td colspan="14">No submissions yet.</td></tr>
                    <?php else: ?>
                        <?php foreach ($rows as $r): ?>
                            <tr>
                                <td><input type="checkbox" name="submission_ids[]" value="<?php echo esc_attr($r['id']); ?>" /></td>
                                <td><?php echo esc_html($r['id']); ?></td>
                                <td><?php echo esc_html($r['created_at']); ?></td>
                                <td><?php echo esc_html($r['full_name']); ?></td>
                                <td><a href="mailto:<?php echo esc_attr($r['email']); ?>"><?php echo esc_html($r['email']); ?></a></td>
                                <td><?php echo esc_html($r['phone']); ?></td>
                                <td><?php echo esc_html($r['uid']); ?></td>
                                <td><?php echo esc_html($r['nationality']); ?></td>
                                <td><?php echo esc_html($r['program']); ?></td>
                                <td><?php echo esc_html($r['year_of_study']); ?></td>
                                <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="<?php echo esc_attr($r['motivation']); ?>">
                                    <?php echo esc_html($r['motivation']); ?>
                                </td>
                                <td><?php echo esc_html($r['hear_about']); ?></td>
                                <td style="max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="<?php echo esc_attr($r['comments']); ?>">
                                    <?php echo esc_html($r['comments']); ?>
                                </td>
                                <td>
                                    <a href="<?php echo wp_nonce_url(
                                        admin_url('admin.php?page=uhall-submissions&action=delete&id=' . $r['id']),
                                        'delete_submission_' . $r['id']
                                    ); ?>"
                                       class="button button-small button-link-delete"
                                       onclick="return confirm('Delete this submission?')">
                                       Delete
                                    </a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </form>

        <script>
        (function() {
            var selectAllHeader = document.getElementById('select-all-header');
            var selectAll = document.getElementById('select-all');
            var checkboxes = document.querySelectorAll('input[name="submission_ids[]"]');

            function toggleAll(checked) {
                checkboxes.forEach(function(cb) { cb.checked = checked; });
                if (selectAllHeader) selectAllHeader.checked = checked;
                if (selectAll) selectAll.checked = checked;
            }

            if (selectAllHeader) {
                selectAllHeader.addEventListener('change', function() {
                    toggleAll(this.checked);
                });
            }
            if (selectAll) {
                selectAll.addEventListener('change', function() {
                    toggleAll(this.checked);
                });
            }
        })();
        </script>

        <?php if ($total > $per_page): ?>
            <div class="tablenav bottom" style="margin-top:16px;">
                <div class="tablenav-pages">
                    <?php
                    $total_pages = ceil($total / $per_page);
                    for ($i = 1; $i <= $total_pages; $i++):
                        $active = $i === $page ? 'button-primary' : '';
                        ?>
                        <a class="button <?php echo $active; ?>" href="?page=uhall-submissions&paged=<?php echo $i; ?>"><?php echo $i; ?></a>
                    <?php endfor; ?>
                </div>
            </div>
        <?php endif; ?>
    </div>
    <?php
}
