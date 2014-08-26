var NwBuilder = require('node-webkit-builder');
var exec = require('child_process').exec;


var nw1= new NwBuilder({
  files: './testapp1/**/**', // use the glob format
  platforms: ['win','osx'],
  version: "0.10.2",
  buildDir: "./build/TestApp-1"
});
var nw2 = new NwBuilder({
  files: './testapp2/**/**', // use the glob format
  platforms: ['win','osx'],
  version: "0.10.2",
  buildDir: "./build/TestApp-2"
});

nw1.on('log',  console.log);
nw2.on('log',  console.log);


nw1.build(function(err, data) {
  if(!err) { 
    console.log("nw1 TestApp-1 completed");
    nw2.build(function(err, data) {
      if(!err) { 
        console.log("nw2 TestApp-2 completed");
        exec("open build/TestApp-1/TestApp1/osx/TestApp1.app");
        //exec("open build/TestApp-1/TestApp1/osx/TestApp1.app/Contents/Resources/app.nw/");

      } else {
        console.log("nw2 error: ", err); 
      };
    });
  } else {
    console.log("nw1 error: ", err); 
  }
});
