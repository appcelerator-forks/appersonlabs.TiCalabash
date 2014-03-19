/*jslint node: true */
'use strict';

var exec = require('./exec');

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


		/**
		#do a clean first then build and run calabash-ios setup
		cd build/iphone && calabash-ios setup

		rm -fR features #relative to build/iphone
		ln -s ../../features features

		xcodebuild -project alloy_fugitive.xcodeproj -configuration Debug -target alloy_fugitive-cal  -sdk iphonesimulator
		****/
	}



    // pass through the command args to Ti `build` commands
   /** exec('ti', passthroughCommands, null, function(output) {

        console.info(output);
    });

**/





};