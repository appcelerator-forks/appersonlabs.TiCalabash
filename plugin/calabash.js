/*jslint node: true */
'use strict';

var exec = require('../lib/exec')
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
    var platform = (cli.argv.platform || cli.argv.p);

    /* if they are not using ios or android, this command should gracefully bow out*/
    if( ['android', 'ios', 'iphone'].indexOf( platform ) === -1 ) {
        throw 'Calabash does not support your kind. \n If you are doing mobile web, this statement is a lie and Andrew is just being lazy atm.';
    }

    // require and run the correct platform...
    require('../lib/run_' + (platform === 'iphone' ? 'ios' : platform ))(logger, config, cli, finished);

};