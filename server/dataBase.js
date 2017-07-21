var data = {
	strFD_AppVersion:"V 2.0.0.2",
	strLanguage:"CN"
};
var  systemData = {
				"gps":{
					"ucFD_GpsExist":"1",
					"strFD_GpsPos":"E:008.10.0542 N:39.01.1817 180KPH"
				},
				"gnet":{
					"ucFD_GNetExist":"1",
					"ucFD_SimExist":"1",
					"uiFD_GNetSignal":"199",
					"ucFD_GNetDail":"1",
					"strFD_GNetIMEI":"01 147200 197569 5"
				},
				"wifi":{
					"ucFD_WifiExist":"1",
					"ucFD_WifiMode":"wifi",
					"uiFD_WifiSignal":"199",
					"ucFD_WifiDail":"1"
				},
				"cms":{
					"ucFD_CmsStatus":"1"
				},
				"disk":{
					"list":[{
						"ucFD_DiskExist":"1",
						"strFD_DiskSize":"64GB"
					},{
						"ucFD_DiskExist":"1",
						"strFD_DiskSize":"128GB"
					},{
						"ucFD_DiskExist":"0",
						"strFD_DiskSize":"16GB"
					}]
				},
				"io":{
					"strFD_IOStatus":"0  1  0  1  0  0"
				}
			}


exports.data = data;
exports.systemData = systemData;


