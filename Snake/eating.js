var http = require('http');

http.createServer(function (req, res) {
    res.write('Hello Sayo');
    res.end();

}).listen(8080); 
