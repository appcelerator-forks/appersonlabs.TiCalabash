/*jslint node: true */
'use strict';
var fs = require('fs'),
	exec = require('./exec'),
	path = require('path'),
	appDir = path.dirname(require.main.filename);

/**
 * Runs the build command
 * @param {Object} logger - The logger instance
 * @param {Object} config - The CLI config object
 * @param {CLI} cli - The CLI instance
 * @param {Function} finished - Callback when the command finishes
 */

module.exports = function(logger, config, cli, projectDir, finished) {
	var passthroughCommands = ['build'].concat(cli.argv['$_'].slice(3)),
        iosBuildPath = path.join(projectDir, 'build/iphone');

	console.info('yes. it is iphone alright ' + iosBuildPath);

	//FIXME: respect the tags, they SHALL pass.
	//FIXME: when build/iphone doesn't exist we have to do something.

	//detect -cal first . if not found run this

	// I am not a huge fan of nested callbacks
	if (fs.existsSync(iosBuildPath)) {
		exec('calabash-ios', ['setup'], { cwd: iosBuildPath }, function() {
			console.info('Titanium CLI command installed.');
			exec('cp', ['-r', 'features', iosBuildPath], null, function() {
				console.info('Features Directory created on iOS build target.');

			});

		});



		/**

		exec('cucumber',null,  { cwd: 'build/iphone' }, function() {

		FIXME: define APP_BUNDLE_PATH
		FIXME: explicitly choose -cal scheme

		});
		 ****/

	}
};
