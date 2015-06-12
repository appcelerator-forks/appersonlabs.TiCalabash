var fs = require('fs'),
    path = require('path'),
    xml2js = require('xml2js'),
    _ = require('underscore');

var TEMPLATE_EXT = /\.i18n$/;
var I18N_TAG = /\s+L\('(\w+)'\)\s?/g;

function warn (msg) {
    console.warn('\033[0;33m[WARN] ' + msg + '\033[0m');
};

/**
 * Transform the output from xml2js into an object where 
 * keys correspond to accessible i18n keys in the app.
 */
function rebindKeys (keys) {
    return _.object(_.map(keys, function (value) {
        return [value.$.name, value._];
    }));
}

/**
 * Retrieve the list of all .template files in the feature directory of the project 
 */
function listTemplates (rootPath) {
  var templates = [], 
      files = fs.readdirSync(rootPath);
    
  _.each(files, function (filename) {
    var fullPath = path.join(rootPath, filename);

    if (fs.lstatSync(fullPath).isDirectory()) {
      /* If it's a dir, go recursive. Catch'em all like pokemons */
      templates = _.union(templates, listTemplates(fullPath));
    } else if (filename.match(TEMPLATE_EXT)) {
      /* Assume that if isn't directory, it's a file */
      templates.push(fullPath);
    }
  });
  return templates;
}

/**
 * Replace each template file by the related value found in the strings.xml
 */
function replaceKeys (templates, i18nKeys, callback) {
   /* Create .feature from .template */
  /* Wait for all files to have been processed */
  var file_processed = _.after(templates.length, callback);
  
  _.each(templates, function (template) {
    fs.readFile(template, function (err, data) {
      if (err) throw err;
      /* Prepare to store the new content */
      var newContent = data.toString(), matches;

      /* It may be more than one tag per file, so ... */
      while ((matches = I18N_TAG.exec(newContent)) !== null) {
          var key = matches[1], toReplace = matches[0];
          if (_.has(i18nKeys, key)) { 
            newContent = newContent.replace(toReplace, ' "' + i18nKeys[key] +  '" ');
          } else {
            /* In case of unknown key, don't abort the whole process, but warn the user */
            warn('i18n key "' + key + '" not found. Line ignored in file : ' + path.basename(template));
          }
      }

      fs.writeFile(template.replace(TEMPLATE_EXT, '.feature'), newContent, function (err) {
        if (err) throw err;
        /* This file is done, notify the big boss */
        file_processed();
      });
    });
  });
}

module.exports = {
    generate_steps: function (language, projectDir, callback) {
      var i18nKeys, templates;

      var parser = new xml2js.Parser();
      fs.readFile(path.join(projectDir, 'i18n', language, 'strings.xml'), function (err, data) {
          parser.parseString(data, function (err, result) {
            /* Retrieve all accessible keys */
            i18nKeys = rebindKeys(result.resources.string); 
            
            /* Be sure that we have processed the templates */
            while (templates == undefined) {}

            /* Then, generate all .feature files */
            replaceKeys(templates, i18nKeys, function () { if (callback) callback(); });
          });
      });

      /* Retrieve all templates features */
      templates = listTemplates(path.join(projectDir, 'features'));
    },

    clean: function (projectDir) {
        _.each(listTemplates(projectDir), function (file) {
            fs.unlinkSync(file.replace(TEMPLATE_EXT, '.feature'));
        });
    }
};


