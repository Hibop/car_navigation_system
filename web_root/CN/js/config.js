define(function(){
    return  {
	loginPage:{
		title:"登陆",
		other:["账号","密码","登陆","清除"]
	},
	homePage : {
		title:"系统设置",
		list : ["基本设置","网络设置"]//,"编码设置","录像设置","报警设置","日志查询"]
	},
	setList : [{
			id : "0",
			name : "baseInfo",
			title : "基本设置",
			list : [{
				name:"baseInfo",
				title : "基本信息",
				url : "BaseInfo"	// postURL
			},{
				name : "mirrorInfo",
				title : "镜像设置",
				url : "MirrorInfo"	// postURL
			}]
		},{	
			id : "1",
			name : "netSet",
			title : "网络设置",
			list : [{
				name : "VCmsInfo",
				title:"平台设置",
				url : ""
			},{
				name : "WifiInfo",
				title:"WIFI设置",
				url : ""
			},{
				name : "GNetInfo",
				title:"3G4G设置",
				url : ""
		}]
	}],
	systemList : [{
			id : "0",
			name : "systemInfo",
			title : "系统信息",
			list : [{
				name:"gpsModule",
				title : "GPS模块",
				url : ""	// postURL
			},{
				name : "gnetModule",
				title : "3/4G模块",
				url : ""	// postURL
			},{
				name : "wifiModule",
				title : "WIFI模块",
				url : ""	// postURL
			},{
				name : "cmsModule",
				title : "CMS模块",
				url : ""	// postURL
			},{
				name : "diskModule",
				title : "DISK模块",
				url : ""	// postURL
			},{
				name : "ioModule",
				title : "IO模块",
				url : ""	// postURL
			}]
		}]
		
	}
});