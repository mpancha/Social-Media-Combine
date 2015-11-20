var express    = require('express');
var bodyparser = require('body-parser');
var exec       = require('child_process').exec;
var fs         = require('fs');
var YAML       = require('yamljs');
var gen        = require("./generate_webconfig.js");

// find configuraiton files from the project directory

var config_file = []
var config_dir = []
var separator = []
config_dir.push('../lentil/');
config_file.push('lentil_config.yml');
config_dir.push('../sfm/');
config_file.push('sfm_config.txt');
separator.push(":");
separator.push("=");


var dynamic = {
  setup: function(cb){
   // generate schema forms
   for(var cfg in config_file){
       console.log(config_file[cfg]);
       gen.generate_config(config_dir[cfg]+config_file[cfg], "js/"+config_file[cfg]+".js", separator[cfg]);
       gen.write_page(config_file[cfg]+".js");
   }

   // write index page

   var fs = require('fs');
   var content = fs.readFileSync("tabs.html", 'utf8');
   content += "<div id=\"tabs\">\n <ul>";
   for(var i in config_file){
     content += "<li><a href=\"#tabs-"+i+"\">" + config_file[i] + "</a></li>\n";
   }
   content += "</ul>\n";
   for(var i in config_file){
      content += "<div id=\"tabs-"+i+"\">\n<iframe src=\""+config_file[i]+".js.html\" width=\"1000\" height=\"1400\"></iframe>\n</div>\n";
   }
   content += "</div>\n<\body>\n<\html>\n";
   fs.writeFileSync("index.html", content, "utf8");
   }
}

dynamic.setup()
