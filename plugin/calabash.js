/*jslint node: true */
'use strict';

var exec = require('../lib/exec'),
    i18n = require('../lib/i18n'),
    fs = require('fs'),
    path = require('path'),
    appDir = path.dirname(require.main.filename);
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
        skipBanner: true,
        keystore_location: {
            abbr: 'K',
            desc: 'the location of the keystore used to sign this application',
            hint: 'keystore location',
            skipValueCheck: true
        },
        password: {
            abbr: 'P',
            desc: 'the password of the keystore used to sign this application',
            hint: 'keystore password',
            skipValueCheck: true
        },
        alias: {
            abbr: 'A',
            desc: 'the alias of the keystore used to sign this application',
            hint: 'keystore alias',
            skipValueCheck: true
        },
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
        language = (cli.argv.language || cli.argv.l),
        projectDir = path.resolve(process.env.SOURCE_ROOT ? path.join(process.env.SOURCE_ROOT, '..', '..') : '.');

    /* if they are not using ios or android, this command should gracefully bow out*/
    if (['android', 'ios', 'iphone'].indexOf(platform) === -1) {
        throw 'Calabash does not support your build target. \n Mobile Web support is planned, but not supported at this time.';
    }

    if (fs.existsSync(path.join(projectDir, 'tiapp.xml'))) {
        if (!fs.existsSync(path.join(projectDir, 'features'))) {
            var featuresFolder = path.resolve(path.join(appDir, '..', '..', 'ticalabash', 'assets', 'features'));
            var cucumberYML = path.resolve(path.join(appDir, '..', '..', 'ticalabash', 'assets', 'cucumber.yml'));
            exec('cp', ['-r', featuresFolder, path.join(projectDir, 'features')], null, function() {		
                fs.createReadStream(cucumberYML).pipe(fs.createWriteStream(projectDir+"/cucumber.yml"));
                console.log('cucumberYML is coming from'+ cucumberYML);
                console.info('Features Directory created and cucumber.yml is set.');
            });
        }

        if (fs.existsSync(path.join(projectDir, 'app'))) {
            // do alloy crap here...
        }

        //require and run the correct platform...
        var run = function () {
            /* Override the finished function if the option --language is set */
            if (language) {
                var _finished = finished;
                finished = function () {
                    i18n.clean(projectDir);
                    _finished(arguments);
                };
            }
            require('../lib/run_' + (platform === 'iphone' ? 'ios' : platform))(logger, config, cli, projectDir, finished);
        };

        /* if a language is supplied, let's interpret all features templates as features steps */
        if (language) {
            if(!fs.existsSync(path.join(projectDir, 'i18n', language, 'strings.xml'))) {
                throw 'The language : "' + language + '" isn\'t supported with your app. Check your i18n folder.';
            }

            i18n.generate_steps(language, projectDir, run);
        } else {
            run();
        }       
    } else {
        throw "Invalid Titanium project location";
    }
};
