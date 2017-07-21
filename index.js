var server = require("./server/server");
var router	= require("./server/router");
var requestHandlers = require("./server/requestHandlers");

var handle = {};
handle["page"] = requestHandlers.page;
handle["/menu"] = requestHandlers.menu;
handle["/list"] = requestHandlers.list;
handle["/get_VersionInfo"] = requestHandlers.get_VersionInfo;
handle["/get_LangInfo"] = requestHandlers.get_LangInfo;
handle["/get_SystemInfo"] = requestHandlers.get_SystemInfo;
handle["/set_Language"] = requestHandlers.set_Language;
handle["/newscount"] = requestHandlers.newscount;

server.start(router.route,handle);

