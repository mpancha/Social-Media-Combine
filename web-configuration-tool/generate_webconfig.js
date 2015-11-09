exports.generate_config = function(config_file, out_file, separator){
   var path = require('path');
   var dataParser = require('data-file-parser');
   var fs = require('fs');
   if( separator == "=" ) 
      var reg = /([a-z\-\_\ ]+)=([a-z\_\ \\:\/.]+)/gim;
   else
      var reg = /([a-z\-\_]+): ([a-z\_\\:\/.]+)/gim;

   dataParser.parse({
     in: config_file,    //input file 
     out: config_file+'.json',    //output file 
     var: 'configs',        //variable name 
     regex: reg,
     as:'key|value' //object keys 
   }).then(function(arr){

     console.log(arr.length+" configs");

     var content = "var app = angular.module(\"myModule\", [\"schemaForm\"]);\n\
     app.controller(\"FormController\", function($scope, $http, $templateCache) {\n\
     $scope.schema = {\n\
      \"type\": \"object\",\n\
      \"title\": \"Comment\",\n\
      \"properties\": {\n";

     var i=0;
     for (i=0; i < arr.length-1; i++){
       content += "     \"" + arr[i].key + "\": {\n";
       content += "       \"title\": " + "\"" + arr[i].key +"\",\n";
       content += "       \"type\": \"string\",\n";
       content += "       \"description\": \""+ arr[i].key.replace(/_/g," ")+"\",\n";
       content += "       \"maxLength\": 100,\n";
       content += "       \"minLength\": 2,\n";
       content += "       \"validationMessage\": \"Entered value should be greater than 2 and less than 100 characters.\"\n";
       content += "     },\n";
     }

     // last key
     content += "     \""+arr[i].key +"\": {\n";
     content += "       \"title\": "+"\"" + arr[i].key +"\",\n";
     content += "       \"description\": \"" + arr[i].key.replace("_"," ") +"\",\n";
     content += "       \"type\": \"string\",\n";
     content += "       \"maxLength\": 100,\n";
     content += "       \"minLength\": 2,\n";
     content += "       \"validationMessage\": \"Entered value should be greater than 2 and less than 100 characters.\"\n";
     content += "     }\n    },\n   \"required\":[\n";

     for ( i=0; i < arr.length-1; i++){
       content += "     \""+arr[i].key +"\",\n";
     }
     content += "     \""+arr[i].key +"\"]\n   };\n";
     content += "     $scope.form = [";
     for (i = 0; i < arr.length; i++) {
       content += "    {\n    \"key\": \""+ arr[i].key+"\",\n";
       content += "    \"placeholder\": \"Enter " + arr[i].key +" Value\",\n";
       content += "    \"htmlClass\": \"content\",\n";
       content += "    \"labelHtmlClass\": \"ici_label\",\n";
       content += "    \"fieldHtmlClass\": \"ici_field\"\n   },";
    }
    content += fs.readFileSync('remaining.js', 'utf8');
    content = content.replace("'Submit'","'Submit/"+path.basename(config_file)+"'")
    //console.log(content);
    fs.writeFileSync(out_file, content, "utf8");
  })
};

exports.write_page = function(out_file){
   var fs = require('fs');
   var content = fs.readFileSync('frame.html', 'utf8');
   var newJs = "js/" + out_file;
   console.log(newJs)
   content = content.replace(/js\/controllers\.js/, "js/"+out_file);
   console.log(content);
   fs.writeFileSync(out_file+".html", content, "utf8"); 
}
