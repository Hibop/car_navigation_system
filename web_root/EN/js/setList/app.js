define(['jquery','underscore','config',
	"text!../../temp/list.html",
	"text!../../temp/baseInfo.html",
	"text!../../temp/mirrorInfo.html",
	"text!../../temp/VCmsInfo.html",
	"text!../../temp/WifiInfo.html",
	"text!../../temp/GNetInfo.html"

	], function( $, _, CONFIG, listTemp, baseInfoTemp, mirrorInfoTemp,VCmsInfoTemp,WifiInfoTemp,GNetInfoTemp){
    return {
		init : function  () {
			
			var self = this;
			
			var num = location.search.split("page=")[1];
			var setter = CONFIG.setList[num];
			
			if(!setter)return;
			// 设置页面标题
			$("#pageTitle").html(setter.title);

			self.initList(setter);
			
			self.initBaseInfo();
			self.initMirrorInfo();

			self.initVCmsInfo();
			self.initWifiInfo();
			self.initGNetInfo();
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
		initBaseInfo:function(){
			var self = this;
			var html = _.template(baseInfoTemp)();
			$("#baseInfoBox").html(html);
			$("#baseInfo-ok").bind("click",function(e){
				// 设置--保存
				$.ajax({
					type:"post",
					url : "/set_BaseInfo",
					data:{
						strFD_DeviceNo 	: $("#strFD_DeviceNo").val(),
						ucFD_TimeZone 	: $("#ucFD_TimeZone").val(),
						ucFD_GpsSTFlag 	: $("#ucFD_GpsSTFlag").hasClass("active") ? "1" : "0",
						strFD_CurTime 	: $("#strFD_CurTime1").val()+" "+ $("#strFD_CurTime2").val()
					},
					dataType:"JSON",
					success:function(obj){
						alert("设置保存成功！");
						console.log(obj);
					}
				})
			})
			$("#baseInfoGet").bind("click",function(){
				if(!$(this).find(".icon").hasClass("active")){
					self.getBaseInfo();
				}
			})
			$("#baseInfo-cancel").bind("click",function(){
				self.getBaseInfo();
			})
		},
		getBaseInfo:function(){
			$.ajax({
				url : "/get_BaseInfo"+"?timeStamp="+this.timeStamp(),
				dataType:"JSON",
				success:function(obj){
					$("#strFD_DeviceNo").val(obj.strFD_DeviceNo);
					$("#ucFD_TimeZone").val(obj.ucFD_TimeZone);
					var flag = "";
					if(obj.ucFD_GpsSTFlag=="1"){
						$("#ucFD_GpsSTFlag").addClass("active");
					}else{
						$("#ucFD_GpsSTFlag").removeClass("active");
					}
					$("#strFD_CurTime1").val(obj.strFD_CurTime.split(" ")[0]);
					$("#strFD_CurTime2").val(obj.strFD_CurTime.split(" ")[1]);
				}
			})
		},
		initMirrorInfo:function(){
			var self = this;
			var html = _.template(mirrorInfoTemp)();
			$("#mirrorInfoBox").html(html);
			$("#mirrorInfo-ok").bind("click",function(e){
				// 设置--保存
				var strFD_UpDown = "";
				for(var i = 0 ; i <4 ; i++){
					strFD_UpDown += $($(".strFD_UpDown")[i]).hasClass("active") ? "1" : "0";
					strFD_UpDown+= (i <3 ? "-" : "");
				}
				var strFD_LeftRight = "";
				for(var i = 0 ; i <4 ; i++){
					strFD_LeftRight += $($(".strFD_LeftRight")[i]).hasClass("active") ? "1" : "0";
					strFD_LeftRight += (i <3 ? "-" : "");
				}
				var data = {
					strFD_UpDown 	: strFD_UpDown,
					strFD_LeftRight	: strFD_LeftRight
				}
				$.ajax({
					type: "post",
					url : "/set_MirrorInfo",
					data: data,
					dataType:"JSON",
					success:function(obj){
						alert("设置保存成功！");
						console.log(obj);
					}
				})
			})
			$("#mirrorInfoGet").bind("click",function(){
				if(!$(this).find(".icon").hasClass("active")){
					self.getMirrorInfo();
				}
			})
			$("#mirrorInfo-cancel").bind("click",function(){
				self.getMirrorInfo();
			})
		},
		getMirrorInfo : function(){
			
			$.ajax({
				url : "/get_MirrorInfo"+"?timeStamp="+this.timeStamp(),
				dataType:"JSON",
				success:function(obj){
					console.log(obj);
					for (var i=0; i < 4; i++){
						if(obj.strFD_UpDown.split("-")[i] =="1"){
							$($(".strFD_UpDown")[i]).addClass("active");
						}else{
							$($(".strFD_UpDown")[i]).removeClass("active");
						}
						if(obj.strFD_LeftRight.split("-")[i] =="1"){
							$($(".strFD_LeftRight")[i]).addClass("active");
						}else{
							$($(".strFD_LeftRight")[i]).removeClass("active");
						}
					}
				}
			})
			
		},
		initVCmsInfo:function(){
			var self = this;
			var html = _.template(VCmsInfoTemp)();
			$("#VCmsInfoBox").html(html);

			$("#ucFD_AddressType").change(function(){
				if($(this).val()=="0"){
					$("#VCmsInfoIpBox").show();
					$("#VCmsInfoIptBox").hide();
				}else{
					$("#VCmsInfoIpBox").hide();
					$("#VCmsInfoIptBox").show();
				}
			})
			
			$("#VCmsInfo-ok").bind("click",function(e){
				// 设置--保存
				var strFD_Address = "";
				if(+$("#ucFD_AddressType").val()){
					strFD_Address = $("#strFD_Address").val();
				}else{
					for (var i = 0; i < 4; i++) {
						var val = $($(".strFD_Address")[i]).val();
						if (+val >255 || +val < 0) {
							alert("ip地址为0~254之间数值");
							$($(".strFD_Address")[i]).val("");
							return;
						};
						strFD_Address += val;
						if(i < 3){
						strFD_Address += ".";
						}
					};
				}
				var usFD_Port = $("#usFD_Port").val();
				if(+usFD_Port > 65536 || +usFD_Port < 1024){
					alert("端口号为1024~65535之间");
					return;
				}
				var data = {
					ucFD_AddressType : $("#ucFD_AddressType").val(),
					strFD_Address : strFD_Address,
					usFD_Port : usFD_Port
				};
				$.ajax({
					type: "post",
					url : "/set_VCmsInfo",
					data: data,	
					dataType:"JSON",
					success:function(obj){
						alert("设置保存成功！");
						console.log(obj);
					}
				})
			})
			$("#VCmsInfoGet").bind("click",function(){
				if(!$(this).find(".icon").hasClass("active")){
					self.getVCmsInfo();
				}
			})
			$("#VCmsInfo-cancel").bind("click",function(){
				self.getVCmsInfo();
			})
		},
		getVCmsInfo:function(){
			$.ajax({
				url : "/get_VCmsInfo"+"?timeStamp="+this.timeStamp(),
				dataType:"JSON",
				success:function(obj){
					console.log(obj);
					$("#ucFD_AddressType").val(obj.ucFD_AddressType);
					if(obj.ucFD_AddressType == "1"){
						$("#VCmsInfoIptBox").show();
						$("#VCmsInfoIpBox").hide();
						$("#strFD_Address").val(obj.strFD_Address);
					}else{
						$("#VCmsInfoIpBox").show();
						$("#VCmsInfoIptBox").hide();
						for (var i = 0; i < $(".strFD_Address").length; i++) {
							 $($(".strFD_Address")[i]).val( obj.strFD_Address.split(".")[i]);
						};
					}
					$("#usFD_Port").val(obj.usFD_Port);
				}
			})
		},
		initWifiInfo:function(){
			var self = this;
			var html = _.template(WifiInfoTemp)();
			$("#WifiInfoBox").html(html);
			self.initWifiSet();
			$("#WifiInfo-ok").bind("click",function(e){
				// 设置--保存
				var data = {
					ucFD_WorkMode : $("#ucFD_WorkMode").val(),
					strFD_SSID : $("#strFD_SSID").val(),
					strFD_Passwd : $("#strFD_Passwd").val(),
					ucFD_AuthMode : $("#ucFD_AuthMode").val(),
					ucFD_CryptType : $("#ucFD_CryptType").val(),
					ucFD_DhcpEnableFlag : $("#ucFD_DhcpEnableFlag").hasClass("active") ? "1" : "0"
				};
				$.ajax({
					type: "post",
					url : "/set_WifiInfo",
					data: data,
					dataType:"JSON",
					success:function(obj){
						alert("设置保存成功！");
						console.log(obj);
					}
				})
			})
			$("#WifiInfoGet").bind("click",function(){
				if(!$(this).find(".icon").hasClass("active")){
					self.getWifiInfo();
				}
			})
			$("#WifiInfo-cancel").bind("click",function(){
				self.getWifiInfo();
			})
		},
		getWifiInfo:function(){
			var self = this;
			$.ajax({
				url : "/get_WifiInfo"+"?timeStamp="+this.timeStamp(),
				dataType:"JSON",
				success:function(obj){
					console.log(obj);
					$("#ucFD_WorkMode").val(obj.ucFD_WorkMode);
					$("#strFD_SSID").val(obj.strFD_SSID);
					$("#strFD_Passwd").val(obj.strFD_Passwd);
					$("#ucFD_AuthMode").val(obj.ucFD_AuthMode);
					self.wifiChange();
					$("#ucFD_CryptType").val(obj.ucFD_CryptType);
					if(obj.ucFD_DhcpEnableFlag == "1"){
						$("#ucFD_DhcpEnableFlag").addClass("active");
					}else{
						$("#ucFD_DhcpEnableFlag").removeClass("active");
					}
				}
			})
		},
		initWifiSet:function(){
			var self = this;
			$("#ucFD_AuthMode").bind("change",function(){
				self.wifiChange();
			})
		},
		wifiChange:function(){
			var val = $("#ucFD_AuthMode").val();
				console.log(val);
				$("#wifiSetPsw").show();
				$("#wifiSetPswType").show();
				switch (+val){
					case 100:
						$("#wifiSetPsw").hide();
						$("#wifiSetPswType").hide();
						break;
					case 0:
						$("#ucFD_CryptType").html('<option value="0">ASCII</option><option value="1">HEX</option>');
						break;
					case 1:
						$("#ucFD_CryptType").html('<option value="0">TKIP</option><option value="1">AES</option>');
						break;
					case 2:
						$("#ucFD_CryptType").html('<option value="0">TKIP</option><option value="1">AES</option>');
						break;
					default:
						break;
				}
		},
		initGNetInfo:function(){
			var self = this;
			var html = _.template(GNetInfoTemp)();
			$("#GNetInfoBox").html(html);
			self.initGprsSet();
			$("#GNetInfo-ok").bind("click",function(e){
				// 设置--保存
				var data = {
					ucFD_NetType : $("#ucFD_NetType").val(),
					strFD_Apn : $("#strFD_Apn").val(),
					strFD_PhoneNo : $("#strFD_PhoneNo").val(),
					strFD_UserName : $("#strFD_UserName").val(),
					strFD_UserPasswd : $("#strFD_UserPasswd").val()
				};
				console.log(data)
				$.ajax({
					type: "post",
					url : "/set_GNetInfo",
					data: data,
					dataType:"JSON",
					success:function(obj){
						alert("设置保存成功！");
						console.log(obj);
					}
				})
			})
			$("#GNetInfoGet").bind("click",function(){
				if(!$(this).find(".icon").hasClass("active")){
					self.getGNetInfo();
				}
			})
			$("#GNetInfo-cancel").bind("click",function(){
				self.getGNetInfo();
			})
		},
		getGNetInfo:function(){
			$.ajax({
				url : "/get_GNetInfo"+"?timeStamp="+this.timeStamp(),
				dataType:"JSON",
				success:function(obj){
					console.log(obj);
					$("#ucFD_NetType").val(obj.ucFD_NetType);
					$("#strFD_Apn").val(obj.strFD_Apn);
					$("#strFD_PhoneNo").val(obj.strFD_PhoneNo);
					$("#strFD_UserName").val(obj.strFD_UserName);
					$("#strFD_UserPasswd").val(obj.strFD_UserPasswd);
				}
			})
		},
		initGprsSet:function(){
			$("#ucFD_NetType").bind("change",function(){
				var val = $(this).val();
				setIpt(val);		
			})
			setIpt(0);
			function setIpt(val){
				var option ={list:[{
					strFD_Apn 	: "3gnet",
					strFD_PhoneNo	: "*99#",
					strFD_UserName	: "card",
					strFD_UserPasswd		: "card"
				},{
					strFD_Apn 	: "Ctnet", 
					strFD_PhoneNo	: "#777",
					strFD_UserName	: "card",
					strFD_UserPasswd		: "card"
				},{
					strFD_Apn 	: "cmnet", 
					strFD_PhoneNo	: "*99***1#",
					strFD_UserName	: "card",
					strFD_UserPasswd		: "card"
				},{
					strFD_Apn 	: "ctlte", 
					strFD_PhoneNo	: "*99#",
					strFD_UserName	: "card",
					strFD_UserPasswd		: "card"
				}]
				}
				for (var key in option.list[+val]) {
					$("#" + key).val(option.list[+val][key]);
				};	
			}
		},
		timeStamp:function(){
			return new Date().getTime();
		}
	
    };
});