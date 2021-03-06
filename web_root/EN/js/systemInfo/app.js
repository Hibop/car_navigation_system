define(['jquery','underscore','config',
	"text!../../temp/list.html",
	"text!../../temp/gpsModule.html",
	"text!../../temp/gnetModule.html",
	"text!../../temp/wifiModule.html",
	"text!../../temp/cmsModule.html",
	"text!../../temp/diskModule.html",
	"text!../../temp/ioModule.html"

	], function( $, _, CONFIG, listTemp, gpsModuleTemp, gnetModuleTemp, wifiModuleTemp, cmsModuleTemp, diskModuleTemp, ioModuleTemp){
    return {
		init : function  () {
			var self = this;
			
			//var num = location.search.split("page=")[1];
			var setter = CONFIG.systemList[0];
			
			if(!setter)return;

			self.initList(setter);
			// this.systemData = null;
			// var  systemData = {
			// 	gps:{
			// 		ucFD_GpsExist:"存在",
			// 		strFD_GpsPos:"E:008.10.0542 N:39.01.1817 180KPH"
			// 	},
			// 	gnet:{
			// 		ucFD_GNetExist:"存在",
			// 		ucFD_SimExist:"存在",
			// 		uiFD_GNetSignal:199,
			// 		ucFD_GNetDail:"成功"
			// 	},
			// 	wifi:{
			// 		ucFD_WifiExist:"存在",
			// 		ucFD_WifiMode:"wifi",
			// 		uiFD_WifiSignal:199,
			// 		ucFD_WifiDail:"成功"
			// 	},
			// 	cms:{
			// 		ucFD_CmsStatus:"成功"
			// 	},
			// 	disk:{
			// 		uiFD_Disk1Exist:"存在",
			// 		strFD_Disk1Size:"64GB",
			// 		uiFD_Disk2Exist:"存在",
			// 		strFD_Disk2Size:"128GB",
			// 		uiFD_Disk3Exist:"存在",
			// 		strFD_Disk3Size:"16GB",
			// 	},
			// 	io:{
			// 		strFD_IOStatus:"0  1  0  1  0  0"
			// 	}
			//	result: 1
			// }
			self.getSystemInfo();//后台获取数据
			

			self.bind();
			
		},
		initList:function(setter){
			var self = this;
			var html = _.template(listTemp)(setter);
			$("#setList").append(html);
		},
		bind : function  () {
			var self = this;
			// 后退按钮
			$(".nav>.back").bind("click",function  (evt) {
				history.back();
			});
			// 开关菜单
			$(".setLine").bind("click",function  (evt) {
				var $icon = $(this).find(".icon");
				$(".setBox").slideUp();
				if($icon.hasClass("active")){
					$icon.removeClass("active");
				}else{
					$(".setLine>.icon.active").removeClass("active");
					$(this).parent().find(".setBox").slideDown("fast");
					$icon.addClass("active");
				}
			});
			$(".setsCell-btn").bind("click",function(evt){
				var self = this;
				$(self).addClass("active");
				var thisId = $(this)[0].id
				setTimeout(function () {
					$(self).removeClass("active");
					// alert(thisId);
				},100);
				// 获取值
			});
		},
		initGpsModule:function(gps){
			// console.log(gps);
			var self = this;
			var html = _.template(gpsModuleTemp)(gps);
			$("#gpsModuleBox").html(html);
		},
		initWifiModule:function(wifi){
			var self = this;
			var html = _.template(wifiModuleTemp)(wifi);
			$("#wifiModuleBox").html(html);
		},
		initGnetModule:function(gnet){
			var self = this;
			var html = _.template(gnetModuleTemp)(gnet);
			$("#gnetModuleBox").html(html);
		},
		initCmsModule:function(cms){
			var self = this;
			var html = _.template(cmsModuleTemp)(cms);
			$("#cmsModuleBox").html(html);
		},
		initDiskModule:function(disk){
			var self = this;
			var html = _.template(diskModuleTemp)(disk);
			$("#diskModuleBox").html(html);
		},
		initIoModule:function(io){
			var self = this;
			var html = _.template(ioModuleTemp)(io);
			$("#ioModuleBox").html(html);
		},
		getSystemInfo:function(){
			var self = this;
			var systemData = null;

			$.ajax({
				url : "/get_SystemInfo"+"?timeStamp="+this.timeStamp(),
				dataType:"",
				success:function(obj){
					//console.log(typeof obj);
					systemData = JSON.parse(obj);
					//console.log(systemData);

				if(!systemData) 
				{
					return;
				}


				systemData.gps.ucFD_GpsExist=self.exchangeStr(systemData.gps.ucFD_GpsExist, "ext");
				systemData.gnet.ucFD_GNetExist=self.exchangeStr(systemData.gnet.ucFD_GNetExist, "ext");
				systemData.gnet.ucFD_SimExist=self.exchangeStr(systemData.gnet.ucFD_SimExist, "ext");
				systemData.gnet.ucFD_GNetDail=self.exchangeStr(systemData.gnet.ucFD_GNetDail, "sus");

				systemData.wifi.ucFD_WifiExist=self.exchangeStr(systemData.wifi.ucFD_WifiExist, "ext");
				systemData.wifi.ucFD_WifiDail=self.exchangeStr(systemData.wifi.ucFD_WifiDail, "sus");

				systemData.cms.ucFD_CmsStatus=self.exchangeStr(systemData.cms.ucFD_CmsStatus, "sus");
				for (var i = 0, l = systemData.disk.list.length; i < l; i++) {
					systemData.disk.list[i].ucFD_DiskExist = self.exchangeStr(systemData.disk.list[i].ucFD_DiskExist, "ext");
				};

				self.initGpsModule(systemData.gps);
				self.initGnetModule(systemData.gnet);

				self.initWifiModule(systemData.wifi);
				self.initCmsModule(systemData.cms);
				self.initDiskModule(systemData.disk);
				self.initIoModule(systemData.io);
					

				},
				error:function(e){
				console.log(e);
				}
			})
			
		},

		timeStamp:function(){
			return new Date().getTime();
		},

		exchangeStr:function (numstr, extOrsus) {
			// 将后台数据1或者0 转成需要字符串
			var num = +numstr;

			if(num && extOrsus=="ext"){
				return "Exist";
			}
			
			if(!num && extOrsus=="ext"){
				return "Not Exist";
			}

			if(num && extOrsus=="sus"){
				return "Success";
			}

			if(!num && extOrsus=="sus"){
				return "Not Linked";
			}

		}
    };
});