window.epcTool = {
	getContextPath: function() {
		$.ajax(epc.root + '/extension/contextpath.action', {
			async: false,
			headers: {
				'Authorization': localStorage.getItem('accessToken')
			},
			success: function(con) {
				var c = con.replace("var contextjs = ", "").replace(";", "");
				var d = eval("(" + c + ")");

				window.epc.basepath = d.basepath;
				window.epc.jsessionid = d.jsessionId;
			}
		});
	},
	//缓存数据
	userProject: function() { //缓存用户所属项目
		if (plus.storage.getItem("userProject") == null) {
			var project_json = [];
			mui.ajax(epc.root + '/extension/extensionAction.action', {
				data: {
					extensionid: 'com.epc.epcfoundation.extensions.ui.treeinnerchildren',
					componentid: 'com.epc.epcemp.workHours.workTree',
					_projectid: -1,
					parentid: 0,
				},
				headers: {
					'Authorization': localStorage.getItem('accessToken')
				},
				type: 'get', //HTTP请求类型
				dataType: 'html',
				async: false,
				timeout: 6000, //超时时间设置为10秒
				success: function(treeData) {
					try {
						treeData = eval("(" + treeData + ")"); //JSON.parse($.trim(json));//获取json数据
					} catch (e) {
						dialog.toast('解析项目树json异常', 'error', 2000);
						return false;
					}
					//构造自定义格式json
					var data = treeData[0].children;
					for (var i in data) {
						var project_obj = {};
						project_obj.value = data[i].attributes.id;
						project_obj.text = data[i].data;
						mui.ajax(epc.root + '/extension/extensionAction.action', {
							data: {
								extensionid: 'com.epc.epcfoundation.extensions.ui.treeinnerchildren',
								componentid: 'com.epc.epcemp.workHours.workTree',
								parentid: data[i].attributes.id,
								typeid: 0
							},
							headers: {
								'Authorization': localStorage.getItem('accessToken')
							},
							async: false,
							type: 'get', //HTTP请求类型
							dataType: 'html',
							timeout: 6000, //超时时间设置为10秒
							success: function(children) {
								try {
									children = eval("(" + children + ")"); //JSON.parse($.trim(json));//获取json数据
								} catch (e) {
									dialog.toast('解析项目树节点json异常', 'error', 2000);
									return false;
								}
								//构造自定义格式json
								var obj = [];
								for (var i = 0; i < children.length; i++) {
									obj.push({
										value: children[i].attributes.id,
										text: children[i].data,
									});
								}
								project_obj.children = obj;
							},
							error: function(xhr, type, errorThrown) {
								dialog.loading.close();
								dialog.toast('网络异常', 'error', 1000);
							}
						});
						project_json.push(project_obj);
					}
					plus.storage.setItem("userProject", JSON.stringify(project_json)); //所属项目缓存
				},
				error: function(xhr, type, errorThrown) {
					dialog.loading.close();
					dialog.toast('网络异常！', 'error', 1000);
				}
			});
		}
		return plus.storage.getItem("userProject");
	},
	epcUsers: function(current, ingredient, functiongroupidNode, functionpointidNode, objs, benidNode, formbeanNode,
		projectId) { //缓存公司的所有办理人列表
		var epcUsers_json = [];
		var _decision = jQuery('input[type="radio"]:checked').attr('value');
		var obj1 = {
			_decision: _decision
		};
		var formbean = $('#formbean_cmBpoList_picker').attr('idd');
		var formbeanStrval = $('select[name="formbean_strval09"]').find('option:selected').val();
		var data = {
			extensionid: 'extension.multiselect.griddata',
			_loginName: '',
			_userNameCn: '',
			page: 1,
			rows: 10000,
			sidx: '',
			sord: 'desc',
			codocid: '',
			beanid: benidNode,
			functionpointid: functionpointidNode,
			functiongroupid: functiongroupidNode,
			_projectid: projectId,
			eventtype: 'transfer',
			componentid: ingredient,
			current_dom: current,
		};
		$.extend(objs, obj1);
		$.extend(data, objs);
		data.formbean_cmBpoList = formbean;
		data.formbean_strval09 = formbeanStrval;
		mui.ajax({
			url: epc.root + '/extension/extensionAction.action',
			data: data,
			type: 'get', //HTTP请求类型
			async: false,
			headers: {
				'Authorization': localStorage.getItem('accessToken')
			},
			timeout: 2000, //超时时间设置为10秒
			success: function(userJson) {
				var messages = JSON.parse(userJson).rows;
				for (var i = 0; i < messages.length; i++) {
					epcUsers_json.push({
						value: messages[i].id,
						text: current == "formbean_cmBpoList" ? messages[i].cell[4] : messages[i].cell[2]
					})
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				dialog.loading.close();
				dialog.toast('读取办理人列表数据异常！', 'error', 1000);
			}
		});
		return epcUsers_json;
	},
	epcProject: function() { //缓存项目
		if (plus.storage.getItem("epcProjects") == null) {
			var epcProjects_json = [];
			mui.ajax(epc.root + '/extension/extensionAction.action', {
				data: {
					extensionid: 'extension.multiselect.griddata',
					componentid: 'custom.selMyProject',
					rows: 999,
					sidx: 'id',
					sord: 'desc',
				},
				headers: {
					'Authorization': localStorage.getItem('accessToken')
				},
				type: 'get', //HTTP请求类型
				dataType: 'html',
				timeout: 10000, //超时时间设置为10秒
				success: function(projectJson) {
					//开始解析dom数据
					try {
						projectJson = eval("(" + projectJson + ")"); //JSON.parse($.trim(json));//获取json数据
					} catch (e) {
						dialog.toast('缓存项目列表json解析异常', 'error', 2000);
						return false;
					}
					var rows = projectJson.rows;
					for (var row in rows) {
						epcProjects_json.push({
							value: rows[row].id,
							text: rows[row].cell[2]
						})
					}
					plus.storage.setItem("epcProjects", JSON.stringify(epcProjects_json)); //缓存
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					dialog.loading.close();
					dialog.toast('读取办理人列表数据异常！', 'error', 1000);
				}
			});
		}
		return plus.storage.getItem("epcProjects");
	},

	//工具方法
	loadBtn: function(currTypeTemp, selrowid) {
		var objArr = [];
		mui.ajax(epc.root + '/extension/extensionAction.action', {
			data: {
				extensionid: 'com.epc.epcfoundation.extensions.ui.buttons',
				functionpointid: epc[currTypeTemp].list.functionpointid,
				functiongroupid: epc[currTypeTemp].list.functiongroupid,
				selrowid: selrowid,
				// _projectid: '4028809f6057e79901605820b505002b',//中安
				
				//流花
				// functionpointid:'com.epc.epcfoundation.base.proj_tasklist',
				// functiongroupid:'4028b881547a965d01547aaa7d27000c',
				_projectid: '4028b881547a965d01547a99bff90001'
			},
			headers: {
				'Authorization': localStorage.getItem('accessToken')
			},
			type: 'post', //HTTP请求类 型
			dataType: 'html',
			async: false,
			timeout: 100000, //超时时间设置为10秒；
			success: function(data) {
				dialog.loading.close();
				var content = $(data).find('#template');
				var $list = $(content).find("*[componentid]");
				if (content != null) {
					$(content).find('div').each(function() {
						objArr.push({
							btnTitle: $.trim($(this).text()),
							formname: $(this).attr("p:formname"),
							componentid: $(this).attr("p:componentid"),
							actionextension: $(this).attr("p:actionextension"),
							functiongroupid: $(this).attr("functiongroupid"),
							buttonid: $(this).attr("p:buttonid"),
							selrowid: selrowid
						});
					});
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				dialog.loading.close();
				dialog.toast('按钮异常！', 'error', 1000);
			}
		});
		return objArr;

	},
	showActionSheet: function(bts, values) { //显示底部脚本
		plus.nativeUI.actionSheet({
			cancel: "取消",
			buttons: bts
		}, function(e) {

			if (bts[e.index - 1].title && (bts[e.index - 1].title == '修改')) {
				editForm(values[e.index - 2]);
			} else if (bts[e.index - 1].title == '删除') {
				delForm(values[e.index - 2]);
			}
		});
	},
	//=====================================================多选点击事件====================================================
	clicked: function(webviewUrl, webviewId, title, typeObj, autoBack, dataObj) { //App跳转方法
		if (autoBack == undefined) {
			autoBack = false;
		}
		localStorage.setItem('webView', JSON.stringify(typeObj)); //存储跳转参数
		localStorage.setItem("dataView", JSON.stringify(dataObj));
		var buttons = [];
		if (typeObj && typeObj.type && typeof typeObj.formbtn == 'undefined') {
			buttons = epc[typeObj.type].buttons;
		}
		mui.openWindow({
			url: webviewUrl,
			id: webviewId,
			styles: { // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
				titleNView: { // 窗口的标题栏控件
					titleText: title, // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
					titleColor: "#fff", // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
					titleSize: "17px", // 字体大小,默认17px
					backgroundColor: epc.theme.color, // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
					progress: { // 标题栏控件的进度条样式
						color: "#5FB878", // 进度条颜色,默认值为"#00FF00"  
						height: "2px" // 进度条高度,默认值为"2px"         
					},
					autoBackButton: autoBack,
					splitLine: { // 标题栏控件的底部分割线，类似borderBottom
						color: "#CCCCCC", // 分割线颜色,默认值为"#CCCCCC"  
						height: "0px" // 分割线高度,默认值为"2px"
					}
				}
			},
			extras:{
				accessToken:localStorage.getItem("accessToken"),
				usernameCn:localStorage.getItem("userNameCn"),
				authority:localStorage.getItem("authority"),
				ip:localStorage.getItem("ipName"),
				refresh:localStorage.getItem("refreshToken"),
				expires:localStorage.getItem("expiresIn"),
				webView:localStorage.getItem("webView"),
				themeColor:localStorage.getItem('themeColor'),
			}
		});
		if (title == false) {
			styles = {};
		}
	},
	pySegSort: function(arr, empty) {
		console.log(arr);
		if (!String.prototype.localeCompare) return null;
		var letters = "*ABCDEFGHJKLMNOPQRSTWXYZ".split('');
		var segs = [];
		var curr;
		$.each(letters, function(i, n) {
			curr = {
				letter: this.toString(),
				data: []
			};
			$.each(arr, function(k, v) {
				if ($.tool.py(v.text).substr(0, 1) == letters[i]) {
					curr.data.push(this);
				}
			});
			if (empty || curr.data.length) {
				segs.push(curr);
				curr.data.sort(function(a, b) {
					return a.text.localeCompare(b.text);
				});
			}
		});
		return segs;
	},

	random: function(flag) {
		return flag == false ? '999999' : Math.random();
	},
	init: function() {
		// 		window.epcTool.userProject();
		// 		window.epcTool.epcUsers();
		// 		window.epcTool.epcProject();
	}
}
