'use static';
var map = new AMap.Map("mapContainer", {
	view: new AMap.View2D({
		center: [104.065735, 30.659462], //北京

		//center: [121.459919,31.230298],//上海
		//center: [120.153576,30.287459],//杭州
		zoom: 12,
		rotation: 0
	}),
	lang: "zh_cn" //设置语言类型，中文简体
});

map.plugin(["AMap.ToolBar"], function () {
	toolBar = new AMap.ToolBar();
	map.addControl(toolBar);
});

var currentHour; //当前显示的时间
AMap.event.addDomListener(document.getElementById('pre'), 'click', function (e) {
	updateHeatmapLayer(currentHour.getHours() - 1)
}, false);
AMap.event.addDomListener(document.getElementById('next'), 'click', function (e) {
	var now = new Date();
	if (currentHour.getTime() + 7200 * 1000 > now.getTime()) {
		return;
	}
	updateHeatmapLayer(currentHour.getHours() + 1);
}, false);

var heatmapLayer = null,
	tileUrl = 'http://heatmap.amap.com/api/showmap/pvheatmap?x=[x]&y=[y]&z=[z]&showmap=equal',

	//tileUrl='http://heatmap.amap.com/api/showmap/pvheatmap?x=[x]&y=[y]&z=[z]&showmap=equal',
	//http://140.205.177.12/api/showmap/pvheatmap?htime=2015121509&x=[x]&y=[y]&z=[z]&showmap=equal
	paused = false;

function addHeatmapLayer() {
	var now = new Date(); //现在时刻
	now.setHours(now.getHours() - 1); //为确保有数据，第一次加载回退一小时
	currentHour = now;
	document.getElementById("currentTime").innerHTML = '当前：' + formate(currentHour, 'yyyy-MM-dd HH点');
	heatmapLayer = new AMap.TileLayer({
		//tileUrl:tileUrl+ '&tb1_'+formate(now,'yyyyMMddHH'))
		//tileUrl:tileUrl+'&htime=2015121509'
		tileUrl: tileUrl + '&htime=' + formate(now, 'yyyyMMddHH')
	});
	heatmapLayer.setMap(map);
	map.on('zoomchange', function () {
		updateHeatmapLayer(currentHour.getHours());
	});

	var nextPoint = new Date();
	nextPoint.setHours(now.getHours() + 2);
	nextPoint.setMinutes(0);
	nextPoint.setSeconds(0);
	setTimeout(beginInterval, nextPoint - new Date()); //下一个整点时开启循环执行
}

addHeatmapLayer();

function updateHeatmapLayer(hour) {

	var now = new Date(); //现在时刻
	if (typeof (hour) == 'number') {
		now = currentHour;
		now.setHours(hour);
	}
	currentHour = now;
	document.getElementById("currentTime").innerHTML = '当前：' + formate(currentHour, 'yyyy-MM-dd HH点');
	//heatmapLayer.setTileUrl(tileUrl+ '&tb1_'+formate(now,'yyyyMMddHH'));
	//heatmapLayer.setTileUrl(tileUrl+ '&htime=2015120215');
	heatmapLayer.setTileUrl(tileUrl + '&htime=' + formate(now, 'yyyyMMddHH'));
	heatmapLayer.reload();
}

function beginInterval() { //在整点时执行，每一小时执行一次
	updateHeatmapLayer();
	setInterval(updateHeatmapLayer, 60 * 60 * 1000);
}

function formate(dateObj, regex) { //用法示例：DateUtil.pattern(new Date(),"yyyy-MM-dd hh:mm:ss")
	var o = { //得到日期的 月，日，年。
		"M+": dateObj.getMonth() + 1, //月份
		"d+": dateObj.getDate(), //日
		"h+": dateObj.getHours() % 12 == 0 ? 12 : dateObj.getHours() % 12, //小时
		"H+": dateObj.getHours(), //小时
		"m+": dateObj.getMinutes(), //分
		"s+": dateObj.getSeconds(), //秒
		"q+": Math.floor((dateObj.getMonth() + 3) / 3), //季度
		"S": dateObj.getMilliseconds() //毫秒
	};
	var week = { //输出一，二，三。。。
		"0": "\u65e5",
		"1": "\u4e00",
		"2": "\u4e8c",
		"3": "\u4e09",
		"4": "\u56db",
		"5": "\u4e94",
		"6": "\u516d"
	};
	if (/(y+)/.test(regex)) {
		regex = regex.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(regex)) {
		regex = regex.replace(RegExp.$1,
			((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[dateObj.getDay() + ""]);
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(regex)) {
			regex = regex.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return regex;
}

function addCloudLayer() { //加载云图层插件
	map.plugin('AMap.CloudDataLayer', function () {
		var layerOptions = {
			//query: {keywords: '旅社'},
			clickable: true
		};
		var cloudDataLayer = new AMap.CloudDataLayer('555db07ee4b06a1632c79c10', layerOptions); //实例化云图层类
		cloudDataLayer.setMap(map); //叠加云图层到地图
		AMap.event.addListener(cloudDataLayer, 'click', function (result) {
			var clouddata = result.data;
			var photo = [];
			if (clouddata._image[0]) { //如果有上传的图片
				photo = ['<img width=240 height=100 src="' + clouddata._image[0]._preurl + '"><br>'];
			}
			var infoWindow = new AMap.InfoWindow({
				content: "<font class='title'>" + clouddata._name + "</font><hr/>" + photo.join("") + "地址：" + clouddata._address + "<br />" + "创建时间：" + clouddata._createtime + "<br />" + "更新时间：" + clouddata._updatetime,
				size: new AMap.Size(0, 0),
				autoMove: true,
				offset: new AMap.Pixel(0, -25)
			});
			infoWindow.open(map, clouddata._location);
		});
	});
}
