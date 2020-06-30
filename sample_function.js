var check_and_read = (filename) =>{
  try{
    fs.statSync(filename);
    return fs.readFileSync(filename);
  }catch(err){
    throw(err);
  }
}
var error404 = "./not_found.html";
var ="";
try{
  error = check_and_read(error404);
}catch(err){
  error = "<html><body><h1>404 Not Found</h1><body><hrtl>";
}

var smart_read = (filename =>{
  try{
    let text = check_and_read(filename);
    return {code:200, text:text}
  }catch(err){
    return {code:404, text:error}
  }
}

http
  .createServer(function(req, res) {
    let url = "." + req["url"]; 
    if (url.match(/\/$/)) url += "index.html";
    console.log("URL = " + url);
    let result = smart_read(url);
    res.writeHead(result.code,{"Content-Type": "text/html"});
    res.write(result.text);
    res.end(); //end the response
  })
  .listen(8080);
