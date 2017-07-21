var url = require("url");
var fs = require("fs");
var querystring = require('querystring');
var util = require('util');
var dataBase = require("./dataBase");

function page (response,pathName){
	// ./html/index.html
	fs.readFile("./web_root"+pathName,"binary",function(err, file){
		if(err){
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write("<h1>404, can'find "+pathName+ " page</h1>");
			response.end();
		}else{
			response.writeHead(200, {"Content-Type": ""});
			response.write(file,"binary");
			response.end();
		}
	})
	
}
function score(response,request){
	var post = '';     //定义了一个post变量，用于暂存请求体的信息
    request.on('data', function(chunk){    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        post += chunk;
    });
    request.on('end', function(){    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
        post = querystring.parse(post);
        response.end(util.inspect(post));
    });
}
function menu(response,request){
	response.writeHead(200, {"Content-Type": ""});
	// 在数据库获取数据进行返回 ，此处为模拟数据
	var str=JSON.stringify(dataBase.home);
	response.write(str);
	response.end();
}

function get_VersionInfo(response,request){
	response.writeHead(200, {"Content-Type": ""});
	// 在数据库获取数据进行返回 ，此处为模拟数据
	//var str=JSON.stringify(demoData.home);
	//var obj={
	//	versionInfo:"V 2.0.0.2"
	//}
	var str=JSON.stringify(dataBase.data);
	response.write(str);
	response.end();
}
function get_LangInfo(response,request){
	response.writeHead(200, {"Content-Type": ""});
	// 在数据库获取数据进行返回 ，此处为模拟数据
	//var str=JSON.stringify(demoData.home);
	//var obj={
	//	versionInfo:"V 2.0.0.2"
	//}
	var str=JSON.stringify(dataBase.data);
	response.write(str);
	response.end();
}
function get_SystemInfo(response,request){
	response.writeHead(200, {"Content-Type": ""});
	// 在数据库获取数据进行返回 ，此处为模拟数据
	//var str=JSON.stringify(demoData.home);
	//var obj={
	//	versionInfo:"V 2.0.0.2"
	//}
	var str=JSON.stringify(dataBase.systemData);
	response.write(str);
	response.end();
}
function set_Language(response,request){
	var post = '';
	request.on('data', function(chunk){    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        post += chunk;
    });
	request.on('end', function(){    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
        post = querystring.parse(post);
		console.log(post);
	})
}

function list(response,request){
	// 根据 post 数据 拿到列表 类型
	response.writeHead(200, {"Content-Type": ""});
	var post = '';     //定义了一个post变量，用于暂存请求体的信息
    request.on('data', function(chunk){    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        post += chunk;
    });
    request.on('end', function(){    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
        post = querystring.parse(post);
        // post ==>{pageNum : 'news1'}
        var listNum = post.listNum;
        console.log(listNum);
		// 在数据库获取数据进行返回 ，此处为模拟数据
        var str=JSON.stringify({newsList:demoData.home["newsList"+listNum]});
		response.write(str);
		response.end();
    });
}
function newscount(response,request){
	// 获取 post 数据
	response.writeHead(200, {"Content-Type": ""});
	var post = '';     //定义了一个post变量，用于暂存请求体的信息
    request.on('data', function(chunk){    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        post += chunk;
    });
    request.on('end', function(){    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
        post = querystring.parse(post);
        // post ==>{pageNum : 'news1'}
        var pageNum = post.pageNum;
		// 在数据库获取数据进行返回 ，此处为模拟数据
        var str=JSON.stringify(demoData.news[pageNum]);
		response.write(str);
		response.end();
    });
	
	
}

exports.page = page;
exports.menu = menu;
exports.list = list;
exports.get_VersionInfo = get_VersionInfo;
exports.get_LangInfo = get_LangInfo;
exports.set_Language = set_Language;
exports.get_SystemInfo = get_SystemInfo;
exports.newscount = newscount;