function takePhoto() {
			mui('#popover').popover('toggle');
			// 获取设备默认的摄像头对象 
			var cmr = plus.camera.getCamera();
			var res = cmr.supportedImageResolutions[0]; //支持像素
			var fmt = cmr.supportedImageFormats[0]; //支持的图片格式
			//进行拍照
			cmr.captureImage(function(path) {
				//拍照成功回调函数
				//读取拍照文件
				plus.io.resolveLocalFileSystemURL(path, function(entry) {
					mui.openWindow({
						id: 'publish',
						url: 'html/publish.html',
//						extras: {
//							entry: entry,
//						}
					});
					//显示
					document.getElementById("img").src = entry.toLocalURL();
				}, function(e) {
					//读取拍照文件错误
					outLine("读取拍照文件错误：" + e.message);
				});
			}, function(err) {
				//拍照出现error
				alert(err.message); //错误信息
				alert(err.code); //错误编码
			}, {
				resolution: res,
				format: fmt
			});
		}

// 从相册添加文件
function appendByGallery(){
	mui('#popover').popover('toggle');
	plus.gallery.pick(function(p){
        mui.openWindow({
			id: 'publish',
			url: 'html/publish.html'
		});
    });
}
