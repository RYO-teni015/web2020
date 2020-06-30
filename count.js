var http = require("http");
var fs = require("fs");

var error404 = "not_found.html";
var error = "";
try {
  fs.statSync("./" + error404);
  error = fs.readFileSync("./" + error404);
} catch {
  error = "<html><body><h1>404 Not Found</h1><body><hrtl>";
}
var count = 0;

http
  .createSever(function(req, res) {
    let url = req["url"];
    switch (true) {
      case /counter$/.test(url):
        count++;
        res.write(
          "<html><body>あなたは" + count + "番目の来場者です<body><hrtl>"
        );
        break;
      case /\$/.test(url):
        url += "index.html";
        console.log("URL = " + url);
        break;
      default:
        try {
          fs.statSync("." + url);
          let text = fs.readFileSync("." + url);
          res.write(text);
        } catch (err) {
          console.log("File is not found");
          res.writeHead(404, { "Content-Type": "text/html" });
          res.write(error);
        }
    }
    res.end();
  })
  .listen(8080);
