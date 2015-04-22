/*jslint node: true */
'use strict';
var fs = require('fs'),
	exec = require('./exec'),
	path = require('path'),
	tiapp = require('tiapp'),
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
	
		
		tiapp.find(projectDir, function(err, obj) {
	        var appName = obj.obj['ti:app'].name ;	
			//		FULL_PRODUCT_NAME
			var iosBinaryBuildPath=  path.join(iosBuildPath, 'build/Debug-iphonesimulator/'+appName+'.app');
			var XcodeProject = appName + '.xcodeproj';
			var XcodeTargetScheme = appName + '-cal';

	console.info('iphone:  ' + iosBuildPath);

	//FIXME: respect the tags, they SHALL pass.
	//FIXME: when build/iphone doesn't exist we have to do something.

	//detect -cal first . if not found run this

	// I am not a huge fan of nested callbacks
	if (fs.existsSync(iosBuildPath)) {
		exec('calabash-ios', ['setup'], { cwd: iosBuildPath }, function() {
			console.info('Calabash has been added to your project.');
			exec('cp', ['-r', 'features', iosBuildPath], null, function() {
				console.info('Features Directory created on iOS build target.');
				exec('xcodebuild', ['-project', XcodeProject, '-configuration','Debug', '-target', XcodeTargetScheme, '-sdk','iphonesimulator'], { cwd: iosBuildPath }, function() {
					console.info('building the -cal scheme');
					process.env['APP_BUNDLE_PATH'] = iosBinaryBuildPath;					
					exec('cucumber',['-r', 'features/support', '-r', 'features/ios/support', '-r', 'features/ios/helpers', '-r', 'features/step_definitions', '-r', 'features/ios/pages'],  { cwd: 'build/iphone' }, function() {
                        finished();
					});
				});
			});

		});

	}
		});
};
