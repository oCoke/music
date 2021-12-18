var path = require("path");
var fs = require("fs");
const { dir } = require("console");
 
var pathName = "./lib/music";
fs.readdir(pathName, function(err, files){
    var dirs = [];
    (function iterator(i){
      if(i == files.length) {
        fs.writeFileSync("list.json", JSON.stringify(dirs));
        return;
      }
      fs.stat(path.join(pathName, files[i]), function(err, data){     
        if(data.isFile()){    
            try {
                fs.accessSync(("lib/lrc/"+files[i]).split(".")[0]+".lrc", fs.constants.R_OK | fs.constants.W_OK);
                var lrc = "lib/lrc/"+files[i].split(".")[0]+".lrc";
            } catch (e) {
                var lrc = undefined;
            }
            dirs.push({
                name: (files[i].split(" - ")[1]).split(".")[0],
                artist: files[i].split(" - ")[0],
                url: "lib/music/"+files[i],
                lrc: lrc,
            });
        }
        iterator(i+1);
       });
    })(0);
});