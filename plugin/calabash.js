/*jslint node: true */
'use strict';

var exec = require('../lib/exec'),
    fs = require('fs'),
    path = require('path'),
	appDir = path.dirname(require.main.filename);;
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
    var platform = (cli.argv.platform || cli.argv.p),
        projectDir = process.env.SOURCE_ROOT ? path.join(process.env.SOURCE_ROOT, '..', '..') : '.';

    /* if they are not using ios or android, this command should gracefully bow out*/
    if (['android', 'ios', 'iphone'].indexOf(platform) === -1) {
        throw 'Calabash does not support your kind. \n If you are doing mobile web, this statement is a lie and Andrew is just being lazy atm.';
    }

    fs.exists(path.join(projectDir, 'tiapp.xml'), function(project_exists) {
        if (project_exists) {
			if (!fs.existsSync('features')) {
				var featuresFolder = path.join(appDir, '../../', 'ticalabash/assets/features');

				exec('cp', ['-r', featuresFolder, 'features'], null, function() {
					console.info('Features Directory created.');

				});

			};
			
            fs.exists(path.join(projectDir, 'app'), function(is_alloy) {
                if (is_alloy) {
                    // do alloy crap here...
                }

                // require and run the correct platform...
                require('../lib/run_' + (platform === 'iphone' ? 'ios' : platform))(logger, config, cli, finished);
            });
        } else {
            throw "Invalid Titanium project location";
        }
    });
};