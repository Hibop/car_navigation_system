function route (response, handle, pathName,request) {
	if(typeof handle[pathName] === "function"){
		handle[pathName](response,request);
	}else{
		// 可能是获取 文件 index.html\index.js、abc.png
		handle["page"](response,pathName);
	}
}
exports.route = route;