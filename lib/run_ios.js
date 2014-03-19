/*jslint node: true */
'use strict';
var fs = require('fs');
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

	//FIXME: respect the tags, they SHALL pass.

	//FIXME: build/iphone doesn't exist we have to do something.
	if (fs.existsSync('tiapp.xml')) {
		//console.info('yes we are in a valid titanium app');
		//detect -cal first . if not found run this
		if (fs.existsSync('build/iphone')) {
			exec('calabash-ios', ['setup'], {
				cwd: 'build/iphone'
			}, function() {
				console.info('Titanium CLI command installed.');

			});
		}

		

		if (!fs.existsSync('features')){
			console.info('dude you need some features, man');
		//exec('ln', ['-s', '../../features', 'features'], null, function() {
		//		console.info('features directory setup');
		//	});
		};

		/**
		 #do a clean first then build and run calabash-ios setup
		 cd build/iphone && calabash-ios setup
		 rm -fR features #relative to build/iphone
		 ln -s ../../features features
		 xcodebuild -project alloy_fugitive.xcodeproj -configuration Debug -target alloy_fugitive-cal  -sdk iphonesimulator
		 ****/
	};

};
