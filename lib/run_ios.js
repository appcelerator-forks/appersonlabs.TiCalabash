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
module.exports = function(logger, config, cli, finished) {
	var passthroughCommands = ['build'].concat(cli.argv['$_'].slice(3));

	console.info("yes. it is iphone alright");

	//FIXME: respect the tags, they SHALL pass.
	//FIXME: build/iphone doesn't exist we have to do something.
	//console.info('yes we are in a valid titanium app');
	//detect -cal first . if not found run this
	if (fs.existsSync('build/iphone')) {
		exec('calabash-ios', ['setup'], { cwd: 'build/iphone' }, function() {
			console.info('Titanium CLI command installed.');

		});



		/**
		 #do a clean first then build and run calabash-ios setup
		 cd build/iphone && calabash-ios setup
		 rm -fR features #relative to build/iphone
		 ln -s ../../features features
		 xcodebuild -project alloy_fugitive.xcodeproj -configuration Debug -target alloy_fugitive-cal  -sdk iphonesimulator
		 ****/

	};
};
