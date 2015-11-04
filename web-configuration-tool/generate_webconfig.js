exports.generate_config = function(){

var dataParser = require('data-file-parser');
var fs = require('fs');
dataParser.parse({
    in: '/src/lentil_config.yml',    //input file 
    out: '/src/lentil_config.json',    //output file 
    var: 'configs',        //variable name 
    // g for global  
    // i for ignore case 
    // m fot ^ to be start of every line not whole string 
    regex: /([a-z\-\_]+): ([a-z\_\\:\/.]+)/gim,
    as:'key|value' //object keys 
}).then(function(arr){
    console.log(arr.length+" configs");
    console.log(arr);
var content = "var app = angular.module(\"myModule\", [\"schemaForm\"]);\n\
app.controller(\"FormController\", function($scope, $http, $templateCache) {\n\
   $scope.schema = {\n\
      \"type\": \"object\",\n\
      \"title\": \"Comment\",\n\
      \"properties\": {\n";
   var i=0;
   for (i=0; i < arr.length-1; i++){
      content += "     \""+arr[i].key +"\": {\n";
      content += "       \"title\": "+ arr[i].key +"\",\n";
      content += "       \"description\": \"API client id retrieved from Instagram.\",\n";
      content += "       \"type\": \"string\",\n";
      content += "       \"maxLength\": 100,\n";
      content += "       \"minLength\": 2,\n";
      content += "       \"validationMessage\": \"Entered value should be greater than 2 and less than 100 characters.\"\n";
      content += "     },\n";
   }
   content += "     \""+arr[i].key +"\": {\n";
   content += "       \"title\": "+ arr[i].key +"\",\n";
   content += "       \"description\": \"API client id retrieved from Instagram.\",\n";
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
      content += "    \"placeholder\": \"Enter"+arr[i].key +"Value\",\n";
      content += "    \"htmlClass\": \"content\",\n";
      content += "    \"labelHtmlClass\": \"ici_label\",\n";
      content += "    \"fieldHtmlClass\": \"ici_field\"\n   },";
   }
   content += fs.readFileSync('remaining.js', 'utf8');
   console.log(content);
   fs.writeFileSync('js/controllers.js', content, "utf8");
})

};


