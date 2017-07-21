var http 	= require("http");
var url 	= require("url");

function start(route,handle){
	http.createServer(function(request, response){
		//console.log(request.url);
	if(request.url == "/") request.url = "/index.html";
	// 使用url模块 获取路径
	var pathname = url.parse(request.url).pathname;
	route(response, handle, pathname,request);
	}).listen(8088);

	console.log("server is start listen8088!----news--server!");
}
exports.start = start;