var express    = require('express');
var bodyparser = require('body-parser');
var exec       = require('child_process').exec;
var fs         = require('fs');
var YAML       = require('yamljs');
var lentil_cfg = '/src/lentil/lentil_config.yml';
var sfm_cfg    = '/src/sfm/sfm_config.txt';
var app        = express();

var config_file = []
var config_dir = []
var separator = []
config_dir.push('/src/lentil/');
config_file.push('lentil_config.yml');
config_dir.push('/src/sfm/');
config_file.push('sfm_config.txt');
separator.push(":");
separator.push("=");

app.use('/',express.static(__dirname));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.post('/Submit/:file',function(request,response){
       var jsonString = JSON.stringify(request.body);
       var jsonObj    = JSON.parse(jsonString);
       var cfg = request.url.substring(8);
       var type = request.url.indexOf('sfm');
       if (type < 0){
           cfg = "/src/lentil/lentil_config.yml"
       }else{
           cfg = "/src/sfm/sfm_config.txt"
       }
       console.log(cfg);
       
       fs.unlinkSync(cfg);

       fs.appendFileSync(cfg, "defaults: &defaults\n\n");

       for (var myKey in jsonObj) {
          if (type > -1) {
             fs.appendFileSync(cfg, myKey + "=" + jsonObj[myKey] + "\n");
          } else {
             fs.appendFileSync(cfg, "   " + myKey + ": \"" + jsonObj[myKey] + "\"\n\n");
          }
       }
       if(type == -1)
       {
          fs.appendFileSync(cfg, "development:\n  <<: *defaults\n\n");
          fs.appendFileSync(cfg, "test:\n  <<: *defaults\n\n");
          fs.appendFileSync(cfg, "staging:\n  <<: *defaults\n\n");
          fs.appendFileSync(cfg, "production:\n  <<: *defaults\n\n");
       }
       exec('sh commit.sh');
       exec('sh reconfig.sh');
       response.writeHead(200, {
         'Content-Type': 'text/plain'
       });

       response.end('Hello, World!');
});

app.get('/configData', function (req, res){
  var committed = YAML.load('/src/web-configuration-tool/committed/values.txt');
  res.send(committed);
});

var server=app.listen(8080,function(){
  exec('sh commit.sh');
  console.log("We have started our server on port 8080");
});
