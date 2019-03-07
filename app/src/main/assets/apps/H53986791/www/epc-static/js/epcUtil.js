window.epcUtil = {
	data4 : '',
	//加载data-list
	renderDataList: function(dialog, point, page, rows) {
		/**
		 * 待实现
		 */
	},
	//初始化加载数据
	renderStartFlow: function(formtemp, tabList) {
		//formtemp任务操作 btnTitle: "执行任务"
		var startflow = {};
		var jsonData = {};
		var data = {};
		var selrowidNode = "";
		var projectId = "";
		tabList.forEach(function(value) {
			if(value.active == true) {
				data = {
					extensionid: 'com.epc.epcfoundation.extensions.ui.standardflow',
					functionpointid: value.action.functionpointid,
					componentid: formtemp.componentid,
					formname: formtemp.formname,
					functiongroupid: formtemp.functiongroupid,
					actionextension: formtemp.actionextension,
					buttonid: formtemp.buttonid,
					selrowid: formtemp.selrowid,
					ajaxtype: 'post',
				};
				mui.ajax(epc.root + '/extension/extensionAction.action', {
					data: data,
					type: 'get', //HTTP请求类型
					dataType: 'html',
					headers:{'Authorization':localStorage.getItem('accessToken')},
					async: false,
					timeout: 10000, //超时时间设置为10秒；
					success: function(data) {
						// console.log('data1 当前表单的信息',data);
						var jsons = $(data).find('#jsondata').html();
						console.log(22222222,data);
						console.log($(data).find('#jsondata'));
						jsonData = JSON.parse(jsons);
						//jsonData.formname = formtemp.formname;
						if(!jsonData.selrowid){
							jsonData.selrowid = formtemp.selrowid;
						}
						selrowidNode = jsonData.selrowid;
						projectId = jsonData._projectid;
					},
					error: function(xhr, type, errorThrown) {
						//异常处理；
						dialog.toast('网络异常！', 'error', 1000);
					}
				});
			}
		});
		startflow.json = jsonData;
		data = $.extend(data,jsonData);
		startflow.data = data;
		startflow.selrowidNode = selrowidNode;
		startflow.projectId = projectId;
		return startflow;
	},
	//正式附件加载
	formalFile:function(entityidNode){
		var fileNodes = [];
		var attachid = "";
		var texts = "";
		var str ="";
		mui.ajax(epc.root + '/fileupload/fileuploadAction!getAttachList.action',{
			data:{
				entityType:'com.epc.cm.base.entity.CmPub',
				entityid:entityidNode,
				filetypecode:'attach2',
				online:false
			},
			type:'GET',
			dataType:'html',
			headers:{'Authorization':localStorage.getItem('accessToken')},
			async:false,
			timeout:3000,
			success:function(data){
				// console.log('data2 both',data);
				if($(data).find('.progressWrapper')){
					$(data).find('.progressWrapper').each(function(){
						attachid = $(this).find("a[class='progressCancel']").attr("attachid");
						str = attachid.split(",").join("");
						texts = $(this).find("div[class='fl']").find("a").text();
						fileNodes.push({
							value:texts,
							href:"/fileupload/fileuploadAction!download.action?attachId="+str
						})
					})
				}
			}
		})
		return fileNodes;
	},
	//过程附件加载
	renderFile:function(entityidNode){
		var fileNodes = [];
		var attachid = "";
		var texts = "";
		var str ="";
		mui.ajax(epc.root + '/fileupload/fileuploadAction!getAttachList.action',{
			data:{
				entityType:'com.epc.cm.base.entity.CmpPay',
				entityid:entityidNode,
				filetypecode:'attach'
			},
			type:'post',
			dataType:'html',
			headers:{'Authorization':localStorage.getItem('accessToken')},
			async:false,
			timeout:3000,
			success:function(data){
				// console.log('data3 both',data);
				if($(data).find('.progressWrapper')){
					$(data).find('.progressWrapper').each(function(){
						attachid = $(this).find("a[class='progressCancel']").attr("attachid");
						str = attachid.split(",").join("");
						texts = $(this).find("div[class='fl']").find("a").text();
						fileNodes.push({
							value:texts,
							href:"/fileupload/fileuploadAction!download.action?attachId="+str
						})
					})
				}
			}
		})
		return fileNodes;
	},
	//加载表单
	renderForm: function(point, mainformid, formbtn, parms,projectId) {
// 		var parms1 = {
// 			formname: "workflow_distribute",
// 		}
// 		$.extend(parms,parms1);
		var fields = {};
		var json = {};
		var objArr = [];
		var sublist = [];
		var params = {};
		var arr = [];
		var files = [];
		var btnNode = "";
		var formbean = "";
		var btnArr = epc[point].btn[formbtn].btn; //获取配置按钮信息
		parms._projectid = projectId;
		parms.extensionid = 'com.epc.epcfoundation.extensions.ui.form2';
		mui.ajax(epc.root + '/extension/extensionAction.action', {
			data: parms,
			type: 'get', //HTTP请求类型
			dataType: 'html',
			headers:{'Authorization':localStorage.getItem('accessToken')},
			async: false,
			timeout: 5000, //超时时间设置为10秒
			success: function(data) {
				// console.log('data4 html模版',data);
				data4 = $(data).find("#formui_param").find("input[name='param']").val();
				console.log('生成签名的信息',$(data).find("#formui_param").find("input[name='param']").val());
				// console.log('子表html模板',data4);
				if(data4 == undefined){
					
				}else{
					$('.sign').show();
				}
				//开始解析dom数据
				var el = $(data);
				formbean = $('select[name="formbean_cmBpoList"]').find('option:selected').attr('id');
				if(el.find('div[title="提交"]').length == 0){
					btnNode = el.find('div[title="提交下一步"]').attr('btnid');
				}else if(el.find('div[title="提交"]').length != 0){
					btnNode = el.find('div[title="提交"]').attr('btnid');
				}
				el.find('div[needTransfer="true"]').each(function(){
					if($(this).find('input').attr('name')){
						arr.push({
							name:$(this).find('input').attr('name'),
							value:$(this).find('input').attr('value')?$(this).find('input').attr('value'):null
						});
					}else if($(this).find('select').attr('name')){
						arr.push({
							name:$(this).find('select').attr('name'),
							value:$(this).find('option:selected').attr('value')?$(this).find('option:selected').attr('value'):null
						})
					}
				});
				params.functionpointid=el.find('[name="functionpointid"]').attr("value");
				params.functiongroupid=el.find('[name="functiongroupid"]').attr("value");
				el.find('input[type="hidden"]').each(function() { //首先便利所有的hidden表单字段显示
					var obj = {};
					obj.type = 'hidden';
					obj.name = $(this).attr("name");
					obj.value = $(this).val();
					obj.title = '';
					objArr.push(obj);
				});
				var formelement = el.find('.formelement'); //其次便利所有的表单字段显示
				el.find("[nameforid='gridinfo']").each(function(){
					var sub = {
						title: $(this).parent().parent().attr("tablabel"),
						action: {
							subgridname: $(this).attr("p:subgridname"),
						}
					};
					sublist.push(sub);
				});
				
				formelement.each(function(){
					if($(this).attr("uitype") == "INNERSUBGRID") return;
					var obj = {};
					obj.title = $(this).find('.text').text() != '' ? $(this).find('.text').text() : '-------------------------------';
					if(formbtn == 'view'){
						obj.readonly = 'true';
					}
					if($(this).attr("componentid") && $(this).attr("componentid").length > 0){
						obj.componentid = $(this).attr("componentid");
					}
					if($(this).attr('triggerName') && $(this).attr('triggerName').length > 0){
						if(!($(this).find('input').attr("type") == "hidden") && ($(this).find('input').length > 0)){
							obj.type = 'text';
							obj.name = $(this).find('input').attr('name');
							obj.value = $(this).find('input').attr('value');
							var isReadonly = $(this).find('input').attr('readonly');
							if(isReadonly){
								obj.readonly = 'true';
							}else{
								obj.readonly = 'false';
							}
							if($(this).attr('uitype') == 'DATEPICKER'){
								obj.type = 'DATEPICKER';
							}else if($(this).attr('uitype') == 'TIMEPICKER'){
								obj.type = 'TIMEPICKER';
							}else if($(this).find('input').attr('type') == 'radio'){
								obj.type = 'radio';
								obj.value = [];
								$(this).find('input').each(function(){
									obj.value.push({
										id:$(this).attr('id'),
										value:$(this).val(),
										onchange:'change',
										text:$(this).next('label').html(),
										name:$(this).attr('name'),
										checked:$(this).attr('checked') == 'checked' ? 'true' : 'false'
									})
								});
							}else if($(this).find('input').attr('type') == 'checkbox'){
								obj.type = 'checkbox';
								obj.value = [];
								$(this).find('input').each(function(){
									obj.value.push({
										id:$(this).attr('id'),
										value:$(this).val(),
										onchange:'change',
										text:$(this).next('label').html(),
										name:$(this).attr('name'),
										checked:$(this).attr('checked') ? 'true' : 'false'
									})
								})
							}
						}else if($(this).find('textarea').length > 0){
							obj.type = 'textarea';
							obj.value = $(this).find('textarea').val();
							obj.name = $(this).find('textarea').attr('name');
							var isReadonly = $(this).find('textarea').attr('readonly');
							if(isReadonly){
								obj.readonly = 'true';
							}else{
								obj.readonly = 'false';
							}
						}else if($(this).find('select').length > 0){
							var isReadonly = $(this).find('select').attr('readonly');
							if(isReadonly){
								obj.disabled = 'true';
							}else{
								obj.disabled = 'false';
							}
							if($(this).attr('_extensionid') && $(this).attr('_extensionid').length > 0){
								obj.type = 'Extension';
								var options = $(this).find('option:selected');
								var textStr = "";
								var valStr = "";
								if(options.length>0){
									for(var i =0;i<options.length;i++){
										textStr += options[i].text;
										textStr += ",";
										valStr += options[i].value;
										valStr += ",";
									}
									textStr = textStr.substr(0,textStr.length-1);
									valStr = valStr.substr(0,valStr.length-1);
								}
								var arr = [];
								if(valStr.indexOf(",") != -1){
									arr = valStr.split(',');
								}else{
									arr.push(valStr);
								}
								obj.arr = arr;
								obj.value = valStr;
								obj.text = textStr;
								obj.id = $(this).find('select').attr('name') + '_picker';
								obj.picker = {};
								obj.name = $(this).find('select').attr('name');
								obj.multiple = $(this).find('select').attr('multiple');
							}else{
								obj.type = 'select';
								obj.value = [];
								obj.name = $(this).find('select').attr('name');
								obj.onchange = 'change';
								$(this).find('option').each(function(){
									obj.value.push({
										id:$(this).val(),
										text:$(this).text(),
										selected:$(this).attr('selected') == 'selected' ? 'true' :'false'
									})
								})
							}
						}
					}else{
						if($(this).find('input').attr("type") != "hidden" && $(this).find('input').length > 0){
							var isReadonly = $(this).find('input').attr('readonly');
							if(isReadonly){
								obj.readonly = 'true';
							}else{
								obj.readonly = 'false';
							}
							obj.type = 'text';
							obj.name = $(this).find('input').attr('name');
							obj.value = $(this).find('input').attr('value');
							if($(this).attr('uitype') == 'DATEPICKER'){
								obj.type = 'DATEPICKER';
							}else if($(this).attr('uitype') == 'TIMEPICKER'){
								obj.type = 'TIMEPICKER';
							}else if($(this).find('input').attr('type') == 'radio'){
								obj.type = 'radio';
								obj.value = [];
								$(this).find('input').each(function(){
									obj.value.push({
										id:$(this).attr('id'),
										value:$(this).val(),
										onchange:'no',
										text:$(this).next('label').html(),
										name:$(this).attr('name'),
										checked:$(this).attr('checked') == 'checked' ? 'true' : 'false'
									})
								})
							}else if($(this).find('input').attr('type') == 'checkbox'){
								obj.type = 'checkbox';
								obj.value = [];
								$(this).find('input').each(function(){
									obj.value.push({
										id:$(this).attr('id'),
										value:$(this).val(),
										onchange:'no',
										text:$(this).next('label').html(),
										name:$(this).attr('name'),
										checked:$(this).attr('checked') ? 'true' : 'false'
									})
								})
							}
						}else if($(this).find('textarea').length > 0 ){
							obj.type = 'textarea';
							obj.value = $(this).find('textarea').val();
							obj.name = $(this).find('textarea').attr('name');
							var isReadonly = $(this).find('textarea').attr('readonly');
							if(isReadonly){
								obj.readonly = 'true';
							}else{
								obj.readonly = 'false';
							}
						}else if($(this).find('select').length > 0){
							var isReadonly = $(this).find('select').attr('readonly');
							if(isReadonly){
								obj.disabled = 'true';
							}else{
								obj.disabled = 'false';
							}
							if($(this).attr('uitype') == 'Extension'){
								obj.type = 'Extension';
								var options = $(this).find('option:selected');
								var textStr = "";
								var valStr = "";
								if(options.length>0){
									for(var i =0;i<options.length;i++){
										textStr += options[i].text;
										textStr += ",";
										valStr += options[i].value;
										valStr += ",";
									}
									textStr = textStr.substr(0,textStr.length-1);
									valStr = valStr.substr(0,valStr.length-1);
								}
								var arr = [];
								if(valStr.indexOf(",") != -1){
									arr = valStr.split(',');
								}else{
									arr.push(valStr);
								}
								obj.arr = arr;
								obj.value = valStr;
								obj.text = textStr;
								obj.name = $(this).find('select').attr('name');
								obj.id = $(this).find('select').attr('name') + '_picker';
								obj.picker = {};
								obj.multiple = $(this).find('select').attr('multiple');
							}else{
								obj.type = 'select';
								obj.value = [];
								obj.name = $(this).find('select').attr('name');
								obj.onchange = 'no';
								$(this).find('option').each(function(){
									obj.value.push({
										id:$(this).val(),
										text:$(this).text(),
										selected:$(this).attr('selected') == 'selected' ? 'true' : 'false'
									})
								})
							}
						}
					}
					objArr.push(obj);
				});
			},
			error: function(e) {
				//异常处理；
				dialog.loading.close();
				dialog.toast('读取异常！', 'error', 1000);
			}
		});
		fields.field = objArr;
		fields.json = json;
		fields.btns = btnArr;
		fields.sublist = sublist;
		fields.params = params;
		fields.arr = arr;
		fields.files = files;
		fields.btnNode = btnNode;
		fields.formbeanNode = formbean; 
		return fields;
	},
	//加载子表
	renderSubList: function(dialog, point, mainformid, parms) {
		var objArr = [];
		var contents = {};
		var data = epc[point].form.tabList[1].action;
		parms.extensionid = data.extensionid;
		parms.mainformid = parms.selrowid;
		parms.subgridname = parms.subgridname;
		parms._projectid = -1;
		parms.async = false;
		parms.rows = 999;
		mui.ajax(epc.root + '/extension/extensionAction.action', {
			data: parms,
			type: 'get', //HTTP请求类型 
			dataType: 'html',
			headers:{'Authorization':localStorage.getItem('accessToken')},
			async: false,
			timeout: 6000, //超时时间设置为10秒
			success: function(data) {
				// console.log('data5 子表数据',data);
				//开始解析dom数据
				var taskJson = $(data).find('#jsondata').text();
				try {
					taskJson = eval("(" + taskJson + ")");
				} catch(e) {
					dialog.loading.close();
					dialog.toast('解析异常', 'error', 2000);
					return false;
				}
				//=========================================================================
				var cloNames = taskJson.gridinfo.colNames;
				var rows = taskJson.datastr.rows;
				var groupHeadersMd = {};
				if(taskJson.groupHeaders){
					$.each(taskJson.groupHeaders,function(g,ghs){
						groupHeadersMd[ghs.startColumnName] = ghs.titleText;
					});
				};
				for(var j=0;j<rows.length;j++){
					var cells = [];
					$.each(taskJson.gridinfo.colModel,function(k,col){
						if(groupHeadersMd[col.name] && groupHeadersMd[col.name].length > 0){
							cells.push({
								"title":groupHeadersMd[col.name]
							});
						}
						cells.push({
							"title":cloNames[k],
							"value":rows[j].cell[k]
						});
					});
					contents[j] = cells;
				}
				//==========================================================================
				dialog.loading.close();
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				dialog.loading.close();
				dialog.toast('读取异常！', 'error', 1000);
			}
	});
		return contents;
	},
	//保存表单 
	saveForm: function(dialog, point, mainformid, json) {
		dialog.loading.open('保存数据');
		mui.ajax(epc.root + '/extension/extensionAction.action?' + $('#form').serialize(), {
			data: {
				extensionid: 'com.epc.epcfoundation.extensions.ui.form2'
			},
			type: 'post', //HTTP请求类型
			dataType: 'html',
			headers:{'Authorization':localStorage.getItem('accessToken')},
			timeout: 6000, //超时时间设置为10秒
			success: function(data) {
				console.log('data6',data);
				var el = $(data);
				dialog.loading.close();
				if(el.find('#message').length > 0) {
					dialog.toast(el.find('#message').html(), 'error', 1000);
				} else {
					dialog.toast('保存成功！', 'success', 1000);
					setTimeout(function() {
						epcTool.clicked('/epc/data-list/data-list.html', epcTool.random(true), epc[point].title, {
							type: point
						});
					}, 500)
				}
			},
			error: function(xhr, type, errorThrown) {
				dialog.loading.close();
				dialog.toast('保存数据失败~', 'error', 1000);
			}
		});
	},
	//提交流程
	submitForm: function(dialog, point, mainformid, json) {
		mui.ajax(epc.root + '/extension/extensionAction.action?' + $('#form').serialize(), {
			data: {
				extensionid: 'com.epc.epcfoundation.extensions.ui.form2',
				buttonid: 'btn_workflow_Submit',
				_projectid: -1
			},
			type: 'post', //HTTP请求类型
			dataType: 'html',
			headers:{'Authorization':localStorage.getItem('accessToken')},
			timeout: 6000, //超时时间设置为10秒
			success: function(data) {
				console.log('data7',data);
				//开始解析dom数据
				dialog.loading.close();
				dialog.toast('提交完毕！', 'success', 1000);
				setTimeout(function() {
					epcTool.clicked('/epc/data-list/data-list.html', epcTool.random(true), epc[point].title, {type: point});
				}, 500)
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				dialog.loading.close();
				dialog.toast('流程提交失败！', 'error', 1000);
			}
		});
	},
	//提交待办
	submitTaskForm:function(dialog,point,mainformid,json,submitdata,btnNode,projectId,objNode){
		var obj = {};
		objNode.forEach(function(item,i){
			if(item.type == 'Extension' && item.disabled != 'true' && item.multiple == "multiple" ){
				obj[item.name] = item.value;
			}
		})
		$('#form').find('select').each(function(){
			$(this).removeAttr('disabled');
		})
		$('#form').find('input[type="checkbox"]').each(function(){
			$(this).removeAttr('disabled');
		})
		submitdata._projectid = projectId;
		submitdata.buttonname = 'SaveAndClose';
		dialog.loading.open("loading...");
		var str = '&extensionid=com.epc.epcfoundation.extensions.ui.form2&__projectid='+projectId+'&buttonid='+btnNode+'&formname=workflow_tasklist'+submitdata.taskid;
		$.ajax({
			type:"post",
			url:epc.root+'/extension/extensionAction.action',
			data:$('#form').serialize()+str,
			dataType:'html',
			async:false,
			success:function(data){
				var el = $(data);
				dialog.loading.close();
				if(el.find('#message').length > 0){
					dialog.toast(el.find('#message').html(), 'error', 1000);
				}else{
					var jsonStr = el.find('#jsondata').html();
					var jsonData = JSON.parse(jsonStr);
					var _globalnames = $('#form').find("[name='globalnames']").val();
					var dataObj = {};
					if(($.trim(_globalnames)).length>0)
					{
						var namesArr=_globalnames.split(",");
						for(var namei=0;namei<namesArr.length;namei++)
						{
							var _gloreg=("name="+namesArr[namei]);
							var $glodom= $('#form').find("input["+_gloreg+"],select["+_gloreg+"],textarea["+_gloreg+"]");
							if($glodom.length>0 && $glodom.eq(0).attr("type")=="radio")
							{
								for(var k=0;k<$glodom.length;k++)
								{
									if(!$glodom[k].checked) continue;
									$glodom=$glodom.eq(k);
									break;
								}
							}
							var gk=namesArr[namei];
							var gv=$glodom.val();
							if(gv == "undefined" || gv == null){
								gv = "";
							}
							var gjsonstr="{\""+gk+"\":\""+gv+"\"}";
							var gjson=eval("("+gjsonstr+")");
							dataObj = $.extend(dataObj,gjson);
						}
					}
					var data1 = $.extend(dataObj,submitdata);
					var data2 = $.extend(data1,jsonData);
					data2.extensionid = 'com.epc.epcfoundation.extensions.ui.standardflow';
					data2.functionid_settitle = 'com.epc.epcfoundation.extension.ui.tabpanel_settitle';
					data2.trend = 'SAC';
					data2.beanid = data2.selrowid;
					data2.btnid = jsonData.btnid;
					data2.functionpointid = 'com.epc.epcfoundation.base.tasklist';
					data2._reqtype = data2.ajaxtype;
					data2.formname = submitdata.formname;
					data2.selrowid = data2.taskid;
					data2.id = data2.taskid;
					var data3 = $.extend(data2,obj);
					mui.ajax(epc.root+'/extension/extensionAction.action',{
						data:data3,
						type:'post',//HTTP请求类型
						dataType:'html',
						headers:{'Authorization':localStorage.getItem('accessToken')},
						timeout:10000,//超时时间设置为10秒
						success:function(data){
							console.log('data8',data)
							//开始解析dom数据
			            	dialog.loading.close();
							mui.toast('提交完毕！');
							setTimeout(function(){
								mui.back();
							},500)
						},
						error:function(xhr,type,errorThrown){
							//异常处理；
							dialog.loading.close(); 
							dialog.toast('流程提交失败！', 'error', 1000);
						}
					});
				}
			},
			error:function(xhr,type,errorThrown){
				dialog.loading.close(); 
				dialog.toast('请求失败！', 'error', 1000);
			}
		});
	}
}