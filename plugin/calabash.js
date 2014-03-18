/*jslint node: true */
'use strict';

var exec = require('../lib/exec');

/** command description. */
exports.cliVersion = '>=3.2.1';
exports.title = 'Build w/Calabash';
exports.desc = 'Builds a project and injects the Calabash framework';
/**
 * Returns the configuration for the  command.
 * @param {Object} logger - The logger instance
 * @param {Object} config - The CLI config object
 * @param {CLI} cli - The CLI instance
 * @returns {Object} Status command configuration
 */
exports.config = function() {
    return {
        skipBanner: true
    };
};

/**
 * Runs the build command
 * @param {Object} logger - The logger instance
 * @param {Object} config - The CLI config object
 * @param {CLI} cli - The CLI instance
 * @param {Function} finished - Callback when the command finishes
 */
exports.run = function(logger, config, cli, finished) {
    var platform = cli.argv.platform || cli.argv.p || 'ios';
    var passthroughCommands = ['build'].concat(cli.argv['$_'].slice(3));

    if(platform !== 'ios') {

    }

    // pass through the command args to Ti `buid` commands
    exec('ti', passthroughCommands, null, function(output) {
        console.info(output);
    });
};