window.imobile = {
	root:localStorage.getItem("ipName")
}
var accesstoken = localStorage.getItem("accessToken");
var refresh = localStorage.getItem("refreshToken");
var expires = localStorage.getItem("expiresIn");
setInterval(function(){
	expires--;
	if(expires == 0){
		var xhrToken = new plus.net.XMLHttpRequest();
		xhrToken.onreadystatechange = function(){
			switch(xhrToken.readyState){
				case 4:
				if(xhrToken.status == 200){
					var newaccessToken = JSON.parse(xhrToken.responseText).access_token;
					var newrefreshToken = JSON.parse(xhrToken.responseText).refresh_token;
					var newexpiresIn = JSON.parse(xhrToken.responseText).expires_in;
					var newValue = "Bearer "+newaccessToken;
					localStorage.accessToken = newValue;
					localStorage.refreshToken = newrefreshToken;
					localStorage.expiresIn = newexpiresIn;
				}
			}
		}
		xhr.open("POST",localStorage.getItem("ipName")+"/sso/oauth/token",false);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.setRequestHeader("Authorization","Basic aW1vYmlsZTppbW9iaWxlc2VjcmV0");
		var datas = 'grant_type=refresh_token&refresh_token='+refresh;
		xhr.send(datas);
	}
},1000);
xhr = function(method,urlNode,data){
	mui.plusReady(function(){});
	var xhr = new plus.net.XMLHttpRequest();
	xhr.onreadystatechange = function(){
		switch(xhr.readyState){
			case 4:
			if(xhr.status == 200){
				var resData = JSON.parse(xhr.responseText);
				return resData;
			}else{
				alert(xhr.status);
			}
		}
	}
	xhr.open(method,urlNode,false);
	xhr.setRequestHeader("Authorization",accesstoken);
	xhr.send(JSON.stringify(data));
}