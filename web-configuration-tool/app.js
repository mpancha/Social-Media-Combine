var express    = require('express');
var bodyparser = require('body-parser');
var exec       = require('child_process').exec;
var fs         = require('fs');
var YAML       = require('yamljs');
var app        = express();
var gen        = require("./generate_webconfig.js");

// find configuraiton files from the project directory

var config_file = []
var separator = []
config_file.push('lentil.yml');
separator.push(":");
separator.push("=");

// generate schema forms
for(var cfg in config_file){
     console.log(config_file[cfg]);
     gen.generate_config(config_file[cfg], "js/"+config_file[cfg]+".js", separator[cfg]);
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

app.use('/',express.static(__dirname));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.post('/Submit',function(request,response){
  var jsonString = JSON.stringify(request.body);
  var jsonObj    = JSON.parse(jsonString);

  for(var i in config_file)
  {
     var cfg = config_file[i];
     fs.unlinkSync(cfg);

     fs.appendFileSync(cfg, "defaults: &defaults\n\n");

     for (var myKey in jsonObj) {
        if (myKey.search("SFM") != -1) {
          fs.appendFileSync(cfg, myKey + "=" + jsonObj[myKey] + "\n");
        } else {
          fs.appendFileSync(cfg, "   " + myKey + ": \"" + jsonObj[myKey] + "\"\n\n");
        }
     }

     fs.appendFileSync(cfg, "development:\n  <<: *defaults\n\n");
     fs.appendFileSync(cfg, "test:\n  <<: *defaults\n\n");
     fs.appendFileSync(cfg, "staging:\n  <<: *defaults\n\n");
     fs.appendFileSync(cfg, "production:\n  <<: *defaults\n\n");
     }
     response.writeHead(200, {
       'Content-Type': 'text/plain'
     });

     response.end('Hello, World!');
});

app.get('/configData', function (req, res){
   //var committed = YAML.load('/src/web-configuration-tool/committed/values.txt');
   res.sendStatus(200);
});

var server=app.listen(8080,function(){
  //exec('sh commit.sh');
  console.log("We have started our server on port 8080");
});
