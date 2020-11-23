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
        self.dir = self.rootel.find('.directory-list').first();

    }

    /**
     * Run the directory js.
     *
     */
    Directory.prototype.main = function () {
        var self = this;

        /*var options = {
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
        directory.on('searchComplete', function(e) {
            self.rootel.removeClass('noitems');
            if (!directory.visibleItems.length) {
                self.rootel.addClass('noitems');
            }
        });*/


        // Handle search.
        var keytimer;
        self.rootel.on('keyup', '.directory-search', function(e) {
            clearTimeout(keytimer);
            var autocomplete = $(this);
            if (e.which == 13) {
                self.search(autocomplete);
            } else {
                keytimer = setTimeout(function () {
                    self.search(autocomplete);
                }, 500);
            }
        });


    };


    /**
     * Search.
     *
     * @method
     */
    Directory.prototype.search = function (searchel) {
        var self = this;
        self.hasresults = false;

        if (searchel.val() == '') {
            self.dir.find('.dir-row').show();
            return;
        }

        var query = searchel.val();

        // Hide values initially
        self.rootel.addClass('searching');
        self.rootel.removeClass('noitems');
        self.dir.find('.dir-row').hide();

        // Search staff code.
        var code = self.dir.find('.attr_staffcode').filter(function() { 
            var reg = new RegExp(query, "i");
            return reg.test($(this).text());
        }).parent();

        // Search name.
        var name = self.dir.find('.attr_displayname').filter(function() { 
            var reg = new RegExp(query, "i");
            return reg.test($(this).text());
        }).parent();

        // Search campus.
        var campus = self.dir.find('.attr_campus').filter(function() { 
            var reg = new RegExp(query, "i");
            return reg.test($(this).text());
        }).parent();

        // Search departments.
        var dept = self.dir.find('.attr_department').filter(function() { 
            var reg = new RegExp(query, "i");
            return reg.test($(this).text());
        }).parent();

        // Search job positions.
        var job = self.dir.find('.attr_jobposition').filter(function() { 
            var reg = new RegExp(query, "i");
            return reg.test($(this).text());
        }).closest('.dir-row');

        // Display the rows found.
        code.show();
        name.show();
        campus.show();
        dept.show();
        job.show();

        self.rootel.removeClass('searching');

        if (!(code.length + name.length + campus.length + dept.length + job.length)) {
            self.rootel.addClass('noitems');
        }

    };

    return {
        init: init
    };
});