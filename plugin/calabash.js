/*jslint node: true */
'use strict';
var fs = require('fs');


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
    var platform = cli.argv.platform || cli.argv.p ;
    var passthroughCommands = ['build'].concat(cli.argv['$_'].slice(3));






    if(platform == 'android') {

    }

	if(platform == 'iphone' || platform == 'ios'){
		console.info("yes. it is iphone alright");
		
		if (fs.existsSync('tiapp.xml')) {
		    //console.info('yes we are in a valid titanium app');
		//detect -cal first . if not found run this
			exec('calabash-ios', ['setup'], {cwd:'build/iphone'}, function() {
	 				console.info('Titanium CLI command installed.');

			});
			
		// otherwise 
		//detect if features folder exist'
		if (!fs.existsSync('features')){
		exec('ln', ['-s', '../../features', 'features'], null, function() {
 				console.info('features directory setup');
			});
		};
		
		});
		
		/****
		#do a clean first then build and run calabash-ios setup
		cd build/iphone && calabash-ios setup
		
		rm -fR features #relative to build/iphone
		ln -s ../../features features
		
		xcodebuild -project alloy_fugitive.xcodeproj -configuration Debug -target alloy_fugitive-cal  -sdk iphonesimulator
		****/
	}

	/* if they are not using ios or android, this command should gracefully bow out*/
	if( ['android', 'ios', 'iphone'].indexOf( platform ) === -1 ) {
		console.info(' We only support android and iOS at this time.');
    }

    // pass through the command args to Ti `build` commands
   /** exec('ti', passthroughCommands, null, function(output) {

        console.info(output);
    });

**/





};