<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.
/**
 * Defines the global settings of the plugin.
 *
 * @package   local_staffdirectory
 * @copyright 2020 Michael Vangelovski <michael.vangelovski@hotmail.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die;

if ($hassiteconfig) {

    $settings = new admin_settingpage('local_staffdirectory', get_string('pluginname', 'local_staffdirectory'));
    $ADMIN->add('localplugins', $settings);

    // DB type.
    $name = 'local_staffdirectory/dbtype';
    $title = get_string('config:dbtype', 'local_staffdirectory');
    $description = get_string('config:dbtype_desc', 'local_staffdirectory');
    $default = '';
    $options = array('', "mysqli", "oci", "pdo", "pgsql", "sqlite3", "sqlsrv");
    $options = array_combine($options, $options);
    $setting = new admin_setting_configselect($name, $title, $description, $default, $options);
    $settings->add($setting);

    // DB host.
    $name = 'local_staffdirectory/dbhost';
    $title = get_string('config:dbhost', 'local_staffdirectory');
    $description = get_string('config:dbhost_desc', 'local_staffdirectory');
    $default = 'localhost';
    $setting = new admin_setting_configtext($name, $title, $description, $default);
    $settings->add($setting);

    // DB user.
    $name = 'local_staffdirectory/dbuser';
    $title = get_string('config:dbuser', 'local_staffdirectory');
    $description = '';
    $default = '';
    $setting = new admin_setting_configtext($name, $title, $description, $default);
    $settings->add($setting);

    // DB pass.
    $name = 'local_staffdirectory/dbpass';
    $title = get_string('config:dbpass', 'local_staffdirectory');
    $description = '';
    $default = '';
    $setting = new admin_setting_configpasswordunmask($name, $title, $description, $default);
    $settings->add($setting);

    // DB name.
    $name = 'local_staffdirectory/dbname';
    $title = get_string('config:dbname', 'local_staffdirectory');
    $description = '';
    $default = '';
    $setting = new admin_setting_configtext($name, $title, $description, $default);
    $settings->add($setting);

    // SQL directory.
    $name = 'local_staffdirectory/sqldirectory';
    $title = get_string('config:sqldirectory', 'local_staffdirectory');
    $default = '';
    $description = get_string('config:sqldirectory_desc', 'local_staffdirectory');
    $setting = new admin_setting_configtextarea($name, $title, $description, $default);
    $settings->add($setting);

    // SQL directory.
    $name = 'local_staffdirectory/staffblurb';
    $title = get_string('config:staffblurb', 'local_staffdirectory');
    $default = '';
    $description = get_string('config:staffblurb_desc', 'local_staffdirectory');
    $setting = new admin_setting_configtextarea($name, $title, $description, $default);
    $settings->add($setting);

}
