Skip to content
 
This repository
Explore
Gist
Blog
Help
Andrew McElroy Sophrinix
 
2  Unwatch
Star 0 Fork 0PUBLIC appersonlabs / TiCalabash
 branch: android  TiCalabash / plugin / calabash.js 
Matt Apperson mattapperson an hour ago more android keystone progress
2 contributors  Matt Apperson  Andrew McElroy
 executable file  73 lines (67 sloc)  2.539 kb  Open EditRawBlameHistory Delete
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
/*jslint node: true */
'use strict';

var exec = require('../lib/exec'),
    fs = require('fs'),
    path = require('path');
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
        projectDir = process.env.SOURCE_ROOT ? path.join(process.env.SOURCE_ROOT, '..', '..') : '.';

    /* if they are not using ios or android, this command should gracefully bow out*/
    if (['android', 'ios', 'iphone'].indexOf(platform) === -1) {
        throw 'Calabash does not support your kind. \n If you are doing mobile web, this statement is a lie and Andrew is just being lazy atm.';
    }

    fs.exists(path.join(projectDir, 'tiapp.xml'), function(project_exists) {
        //if (project_exists) {
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
            require('../lib/run_' + (platform === 'iphone' ? 'ios' : platform))(logger, config, cli, projectDir, finished);
        });
        // } else {
        //     throw "Invalid Titanium project location";
        // }
    });
};
Status API Training Shop Blog About © 2014 GitHub, Inc. Terms Privacy Security Contact