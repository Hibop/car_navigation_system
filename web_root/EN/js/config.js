define(function(){
    return  {
	loginPage:{
		title:"Login",
		other:["Account","Password","Login","Clear"]
	},
	homePage : {
		title:"System Setup",
		list : ["Base Setup","Net Setup"]//,"编码设置","录像设置","报警设置","日志查询"]
	},
	setList : [{
			id : "0",
			name : "baseInfo",
			title : "Base Setup",
			list : [{
				name:"baseInfo",
				title : "Base Info",
				url : "BaseInfo"	// postURL
			},{
				name : "mirrorInfo",
				title : "Mirror Setup",
				url : "MirrorInfo"	// postURL
			}]
		},{	
			id : "1",
			name : "netSet",
			title : "Net Setup",
			list : [{
				name : "VCmsInfo",
				title:"CMS Setup",
				url : ""
			},{
				name : "WifiInfo",
				title:"WIFI Setup",
				url : ""
			},{
				name : "GNetInfo",
				title:"3G/4G Setup",
				url : ""
			}]
		}],
		systemList : [{
			id : "0",
			name : "systemInfo",
			title : "System Infomation",
			list : [{
				name:"gpsModule",
				title : "GPS Module",
				url : ""	// postURL
			},{
				name : "gnetModule",
				title : "3/4G Module",
				url : ""	// postURL
			},{
				name : "wifiModule",
				title : "WIFI Module",
				url : ""	// postURL
			},{
				name : "cmsModule",
				title : "CMS Status",
				url : ""	// postURL
			},{
				name : "diskModule",
				title : "DISK Module",
				url : ""	// postURL
			},{
				name : "ioModule",
				title : "IO Module",
				url : ""	// postURL
			}]
		}]
	}
});