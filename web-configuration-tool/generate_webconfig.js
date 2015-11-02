//var express = require('express');
var dataParser = require('data-file-parser');
var fs = require('fs');
dataParser.parse({
    in: 'lentil_config.yml',    //input file 
    out: 'lentil_config.json',    //output file 
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
   for (var i=0; i < arr.length; i++){
      content += "     \""+arr[i].key +"\": {\n";
      content += "       \"title\": "+ arr[i].key +"\",\n";
      content += "       \"type\": \"string\",\n";
      content += "     },\n";
   }
fs.writeFileSync('test.js', content, "utf8");
})


