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
 * Provides the local_staffdirectory/directory module
 *
 * @package   local_staffdirectory
 * @category  output
 * @copyright 2020 Michael Vangelovski <michael.vangelovski@hotmail.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module local_staffdirectory/directory
 */
define(['jquery', 'core/log', 'core/ajax'], 
    function($, Log, Ajax) {    
    'use strict';

    /**
     * Initializes the directory component.
     */
    function init() {
        Log.debug('local_staffdirectory/directory: initializing');

        var rootel = $('#local_staffdirectory-root');

        if (!rootel.length) {
            Log.error('local_staffdirectory/directory: \'#local_staffdirectory-root\' not found!');
            return;
        }

        var directory = new Directory(rootel);
        directory.main();
    }

    /**
     * The constructor
     *
     * @constructor
     * @param {jQuery} rootel
     */
    function Directory(rootel) {
        var self = this;
        self.rootel = rootel;

    }

    /**
     * Run the directory js.
     *
     */
    Directory.prototype.main = function () {
        var self = this;

        var options = {
            valueNames: [ 
                'attr_staffcode', 
                'attr_displayname',
                'attr_department', 
                'attr_jobposition'
            ],
            listClass: "directory-list",
            searchClass: "directory-search",
        };

        var directory = new List('local_staffdirectory-root', options);
    };

    return {
        init: init
    };
});