/*jslint node: true */
'use strict';

var exec = require('./exec'),
    path = require('path'),
    tiapp = require('tiapp'),
    fs = require('fs'),
    defaultKeystore = {
        keystore_location: '',
        keystore_password: 'tirocks',
        keystore_alias: 'tidev'
    },
    customKeystore;

/**
 * Runs the build command
 * @param {Object} logger - The logger instance
 * @param {Object} config - The CLI config object
 * @param {CLI} cli - The CLI instance
 * @param {Function} finished - Callback when the command finishes
 */
module.exports = function(logger, config, cli, projectDir, finished) {
    if (!process.env.ANDROID_HOME) {
        throw 'Calabash requires that the env variable ANDROID_HOME be set to the path of your android SDK. We cant find ANDROID_HOME in your enviorment...';
    }

    var passthroughCommands = ['build', '-b'].concat(cli.argv['$_'].slice(3)),
        apkPath = path.join(projectDir, 'build', 'android', 'bin'),
        keystoreLocation = (cli.argv.keystore_location || cli.argv.K),
        keystorePass = (cli.argv.password || cli.argv.P),
        keystoreAlias = (cli.argv.alias || cli.argv.A)

    // Set the path of the Titanium debug keystore
    defaultKeystore.keystore_location = path.join(cli.sdk.path, 'android', 'dev_keystore');

    if (keystoreLocation) {
        customKeystore = {
            keystore_location: keystoreLocation,
            keystore_password: keystorePass,
            keystore_alias: keystoreAlias
        };
    }
    tiapp.find(projectDir, function(err, obj) {
        var apkName = obj.obj['ti:app'].name + '.apk';

        fs.writeFileSync('.calabash_settings', JSON.stringify(customKeystore || defaultKeystore));

        // pass through the command args to Ti `build` commands
        exec('ti', passthroughCommands, null, function() {
            exec('calabash-android', ['run', path.join(apkPath, apkName)], null, function(output) {

                console.info("yes. we built android");
                fs.unlinkSync('.calabash_settings');
            });
        });
    });
};