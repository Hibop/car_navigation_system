define(['jquery','config'], function($,CONFIG){
    return {
        init : function  () {
			this.start();
			this.bind();
		},
		start:function(){
			var _this=this;
			var list = CONFIG.homePage.list;
			$("#sysTitle").html(CONFIG.homePage.title);
			if(list.length < 5 && $(window).width() < 450){
				$("#indexBanner").show();
			}
			for (var i = 0; i < list.length; i++) {
				var html = '<div class="menu" data-num="'+i+'"><img src="../images/menu'+(i+1)+'.jpg">'+list[i]+'</div>'
				$("#menuList").append(html);
			};
			$(".menu").bind("click",function  (evt) {
				var num = $(this).data("num");
				location.href = "setList.html?page="+ num;
			})

			// $("#version").bind("click",function  () {
			// 	_this.getVersionInfo();
			// })
			//此处调用获取
			this.getVersionInfo();
		},

		getVersionInfo:function(){
			$.ajax({
				url : "/get_VersionInfo",
				dataType:"JSON",
				success:function(obj){
					//console.log(obj);
					//var obj1 = JSON.parse(obj);
					$("#version").html(obj.strFD_AppVersion);
				}
			})
		},
		bind:function () {
			var _this = this;

			//点击语言图标定向到语言页面
			$(".lang-js").bind("click",function (evt) {

				evt.stopPropagation();
				var $lang = $(this).data("lang");
				//console.log($lang);
				//console.log(window.location.host +'/'+ $lang +'/index.html');
				window.location.href ='../' + $lang +'/index.html';//最好是写在post success中
				var langdata = {
					strLanguage : $lang
				};
				$.ajax({
					type: "post",
					url : "/set_LangInfo",
					data: langdata,
					dataType:"JSON",
					success:function(obj){
						alert("Set language success!");
						//console.log(obj);
					}
				})
			})

			//点击右侧出现弹窗
			$("#navRight").bind("click",function () {
				$("#mask").css("display","block")
			})
			
			//点击左侧图标到系统信息页面
			$("#navLeft").bind("click",function () {
				// body...
				location.href = "systemInfo.html";
			})

			$(".langSet").bind("click",function () {
				// body...
				$("#mask").css("display","none");
			})


		}



    };
});