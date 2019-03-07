window.epc = {
//	root:'https://124.42.16.82:8443',
	// root:'https://192.168.0.51:8443',//中安
	//root:'http://192.168.0.2:9081/zzdoc',//流花移动
	root:localStorage.getItem("ipName")+'/zzdoc',
	// root:'http://192.168.0.2:8088',//PC
//	root:'https://192.168.9.101:8088',
//	root:'http://10.130.100.124:12',
//	root:'https://180.101.128.97:10',
	loginUrl:'/login/default!login.action',
//	loginUrl:'/struts/default.action',
	loginUrl1:'/login/default.action',
	_projectid:'4028809f6057e79901605820b505002b',
	menus:[{
		text:'待办',
		clicked:function(){
			epcTool.clicked('./data-list.html',epcTool.random(true),'我的待办',{type:'task'},true);
		},
		iconfont:'iconfont icon-daiban'
	},{
		text:'主题',
		clicked:function(){
			epcTool.clicked('epc/setting.html',epcTool.random(true),'设置主题');
		},
		iconfont:'iconfont icon-pifu'
	},{
		text:'退出',
		clicked:function(){window.quit()},
		iconfont:'iconfont icon-tuichu'
	}],
	theme:{
		color:(localStorage.getItem('themeColor') == null || typeof  localStorage.getItem('themeColor') == 'undefined')? '#009688' :localStorage.getItem('themeColor'),
	},
	workHours:{//工时
		title:'我的工时',
		buttons:[{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'left', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '15px', //String类型,String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	epcTool.clicked('./home.html',epcTool.random(true),'首页');
            },
            text:'返回',
        },{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'right', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '15px', //String类型,String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	epcTool.clicked('./tab.html',epcTool.random(true),epc['workHours'].btn.new.title,{type:'workHours',formbtn:'new',formtemp:epcTool.loadBtn('workHours','')[0]});
            },
            text:'新建',
        }],
		btn:{
			new:{
				title:'新建工时',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				}]
			},
			edit:{
				title:'编辑工时',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				}]
			},
			view:{
				title:'查看工时',
				btn:[{
					title:'关闭',
					fns:'close_fn'
				}]
			}, 
		},
		list:{
			extensionid: 'com.epc.epcfoundation.extensions.ui.grid',
			functionpointid:'com.epc.epcemp.workHours',
			functiongroupid:'4028809a4153ceb0014153d300250002',
			grid:[2,3,4,5],
			iconfont:'icon-gongzuoshijian',
			_projectid:-1,
			_search:false,
			async:false,
			sidx:'id',
			sord:'desc',
		},
		form:{
			tabList:[{
				title:'表单信息',
				active:true,
				show:true,
				tempUrl:'./form.html',
				action:{
					functionpointid:'com.epc.epcemp.workHours',
				},
			},{
				title:'未录入工时',
				active:false,
				show:true,
				tempUrl:'./sub-list.html',
				action:{
					extensionid:'com.epc.epcfoundation.extensions.ui.grid',
					functionpointid:'com.epc.epcemp.workHours',
					subgridname:'needWorkHour',
				},
				grid:[1,2,3]
			}],
			specialField:[{
				fieldId:'formbean_jobsStructure_id',//组件id
				layer:{layer:2},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.userProject());
				},
				callback:function(items){
					var text = items[0].text;
					$('#formbean_jobsStructure_id_picker').val(items[1].text);
					$('input[name="formbean_jobsStructure_id"]').val(items[1].value);
					$('input[name="formbean_jobsStructure_wbs_project_projectname"]').val(text.split(']')[1]);
					$('input[name="formbean_jobsStructure_wbs_project_projectcode"]').val(text.split(']')[0].substr(1));
				}
			}],
		},
	},
	
	leave:{//请假
		title:'请假申请',
		buttons:[{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'left', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '15px', //String类型,String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	epcTool.clicked('./home.html',epcTool.random(true),'首页');
            },
            text:'返回',
        },{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'right', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '15px', //String类型,String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	epcTool.clicked('./tab.html',epcTool.random(true),epc['leave'].btn.new.title,{type:'leave',formbtn:'new',formtemp:epcTool.loadBtn('leave','')[0]});
            },
            text:'新建',
        }],
		btn:{
			new:{
				title:'请假申请',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				},{
					title:'提交',
					fns:'submit_fn'
				}]
			},
			edit:{
				title:'编辑请假单',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				},{
					title:'提交',
					fns:'submit_fn'
				}]
			},
			view:{
				title:'查看请假单',
				btn:[{
					title:'关闭',
					fns:'close_fn'
				}]
			}, 
		},
		list:{
			extensionid:'com.epc.epcfoundation.extensions.ui.grid',
			functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
			functiongroupid:'4028809a45ac17270145ac672aba0030',
			grid:[2,10,11,12],
			iconfont:'icon-639',
		},
		form:{
			tabList:[{
				title:'表单信息',
				active:true,
				show:true,
				tempUrl:'./form.html',
				action:{
					functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
				}
			},{
				title:'流程历史',
				active:false,
				show:true,
				tempUrl:'./sub-list.html',
				action:{
					extensionid:'com.epc.epcfoundation.extensions.ui.grid',
					functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
					subgridname:'taskhistory',
				},
				grid:[1,2,3]
			}],
			specialField:[{
				fieldId:'formbean_user01_id',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcUsers());
				},
				callback:function(items){
					$('#formbean_user01_id_picker').val(items[0].text);
					$('input[name="formbean_user01_id"]').val(items[0].value);
				}
			},
			{
				fieldId : function(){
					var nodes = $("[field.type == 'Extension']");
					for(var i=0;i<nodes.length;i++){
						return nodes[i].attr(name);
					}
				},
				layer:{layer:1},
				dataSource:function(){
					return JSON.parse(epcTool.epcUsers());
				},
				callback:function(items){
					var nodes = $("[field.type == 'Extension']");
					for(var i=0;i<nodes.length;i++){
						$("'#'+nodes[i].attr(name)+'_picker'").val(items[0].text);
						$("'input[name='+nodes[i].attr(name)").val(items[0].value);
					}
				}
			}],
			
		},
		
	},
	overtime:{//加班申请
		//加班申请
		title:'加班申请',
		buttons:[{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'left', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '15px', //String类型,String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	epcTool.clicked('./home.html',epcTool.random(true),'首页');
            },
            text:'返回',
        },{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'right', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '15px', //String类型,String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	
            	epcTool.clicked('./tab.html',epcTool.random(true),epc['overtime'].btn.new.title,{type:'overtime',formbtn:'new',formtemp:epcTool.loadBtn('overtime','')[0]});

            },
            text:'新建',
        }],
		btn:{
			new:{
				title:'加班申请',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				},{
					title:'提交',
					fns:'submit_fn'
				}]
			},
			edit:{
				title:'编辑加班申请',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				},{
					title:'提交',
					fns:'submit_fn'
				}]
			},
			view:{
				title:'查看加班申请',
				btn:[{
					title:'关闭',
					fns:'close_fn'
				}]
			}, 
		},
		list:{
			extensionid:'com.epc.epcfoundation.extensions.ui.grid',
			functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
			functiongroupid:'4028809a45ac17270145ac6aadc90034',
			grid:[2,10,11,12],
			iconfont:'icon-jiaban1',
		},
		form:{
			tabList:[{
				title:'表单信息',
				active:true,
				show:true,
				tempUrl:'./form.html',
				action:{
					functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
				}
			},{
				title:'流程历史',
				active:false,
				show:true,
				tempUrl:'./sub-list.html',
				action:{
					extensionid:'com.epc.epcfoundation.extensions.ui.grid',
					functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
					componentid:'overtime.overtime.overtime_view',
					subgridname:'taskhistory',
					_projectid:-1
				},
				grid:[1,2,3]
			}],
			specialField:[
			
			{
				fieldId:'formbean_project_id',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcProject());
				},
				callback:function(items){
					$('#formbean_project_id_picker').val(items[0].text);
					$('input[name="fformbean_project_id"]').val(items[0].value);
				}
			},
			{
				fieldId:'formbean_user01_id',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcUsers());
				},
				callback:function(items){
					$('#formbean_user01_id_picker').val(items[0].text);
					$('input[name="formbean_user01_id"]').val(items[0].value);
				}
			},{
				fieldId:'_wfNextUser',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcUsers());
				},
				callback:function(items){
					$('#_wfNextUser_picker').val(items[0].text);
					$('input[name="_wfNextUser"]').val(items[0].value);
				}
			}],
			
		},
		
	
		
	},
	dailyTrip:{
		//出差申请
		title:'出差申请',
		buttons:[{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'left', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '15px', //String类型,String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	epcTool.clicked('./home.html',epcTool.random(true),'首页');
            },
            text:'返回',
        },{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'right', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '15px', //String类型,String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	
            	epcTool.clicked('./tab.html',epcTool.random(true),epc['dailyTrip'].btn.new.title,{type:'dailyTrip',formbtn:'new',formtemp:epcTool.loadBtn('dailyTrip','')[0]});

            },
            text:'新建',
        }],
		btn:{
			new:{
				title:'出差申请',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				},{
					title:'提交',
					fns:'submit_fn'
				}]
			},
			edit:{
				title:'编辑出差申请',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				},{
					title:'提交',
					fns:'submit_fn'
				}]
			},
			view:{
				title:'查看出差申请',
				btn:[{
					title:'关闭',
					fns:'close_fn'
				}]
			}, 
		},
		list:{
			extensionid:'com.epc.epcfoundation.extensions.ui.grid',
			functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
			functiongroupid:'4028809a45ac17270145ac6dad850038',
			grid:[2,10,11,12],
			iconfont:'icon-chucha1',
		},
		form:{
			tabList:[{
				title:'表单信息',
				active:true,
				show:true,
				tempUrl:'./form.html',
				action:{
					functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
				}
			},{
				title:'流程历史',
				active:false,
				show:true,
				tempUrl:'./sub-list.html',
				action:{
					extensionid:'com.epc.epcfoundation.extensions.ui.grid',
					functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
					componentid:'dailyTrip.dailyTrip.dailyTrip_view',
					subgridname:'taskhistory',
					_projectid:-1
				},
				grid:[1,2,3]
			}],
			specialField:[
			
			{
				fieldId:'formbean_project_id',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcProject());
				},
				callback:function(items){
					$('#formbean_project_id_picker').val(items[0].text);
					$('input[name="fformbean_project_id"]').val(items[0].value);
				}
			},
			{
				fieldId:'formbean_user01_id',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcUsers());
				},
				callback:function(items){
					$('#formbean_user01_id_picker').val(items[0].text);
					$('input[name="formbean_user01_id"]').val(items[0].value);
				}
			},{
				fieldId:'_wfNextUser',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcUsers());
				},
				callback:function(items){
					$('#_wfNextUser_picker').val(items[0].text);
					$('input[name="_wfNextUser"]').val(items[0].value);
				}
			}],
			
		},
	},
	
	
	
	
	
	dailyAttendance:{
			
		//考勤证明
		title:'考勤证明',
		buttons:[{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'left', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '15px', //String类型,String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	epcTool.clicked('./home.html',epcTool.random(true),'首页');
            },
            text:'返回',
        },{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'right', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '15px', //String类型,String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	
            	epcTool.clicked('./tab.html',epcTool.random(true),epc['dailyAttendance'].btn.new.title,{type:'dailyAttendance',formbtn:'new',formtemp:epcTool.loadBtn('dailyAttendance','')[0]});

            },
            text:'新建',
        }],
		btn:{
			new:{
				title:'考勤证明',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				},{
					title:'提交',
					fns:'submit_fn'
				}]
			},
			edit:{
				title:'编辑考勤证明',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				},{
					title:'提交',
					fns:'submit_fn'
				}]
			},
			view:{
				title:'查看考勤证明',
				btn:[{
					title:'关闭',
					fns:'close_fn'
				}]
			}, 
		},
		list:{
			extensionid:'com.epc.epcfoundation.extensions.ui.grid',
			functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
			functiongroupid:'4028809a45ac17270145ac7b914b0048',
			grid:[2,10,11,12],
			iconfont:'icon-jia',
		},
		form:{
			tabList:[{
				title:'表单信息',
				active:true,
				show:true,
				tempUrl:'./form.html',
				action:{
					functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
				}
			},{
				title:'流程历史',
				active:false,
				show:true,
				tempUrl:'./sub-list.html',
				action:{
					extensionid:'com.epc.epcfoundation.extensions.ui.grid',
					functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
					componentid:'dailyAttendance.dailyAttendance.dailyAttendance_view',
					subgridname:'taskhistory',
					_projectid:-1
				},
				grid:[1,2,3]
			}],
			specialField:[
			
			{
				fieldId:'formbean_project_id',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcProject());
				},
				callback:function(items){
					$('#formbean_project_id_picker').val(items[0].text);
					$('input[name="fformbean_project_id"]').val(items[0].value);
				}
			},
			{
				fieldId:'formbean_user01_id',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcUsers());
				},
				callback:function(items){
					$('#formbean_user01_id_picker').val(items[0].text);
					$('input[name="formbean_user01_id"]').val(items[0].value);
				}
			},{
				fieldId:'_wfNextUser',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcUsers());
				},
				callback:function(items){
					$('#_wfNextUser_picker').val(items[0].text);
					$('input[name="_wfNextUser"]').val(items[0].value);
				}
			}],
			
		},
		
	
		
	
	
	},
	
	
	task:{//流程
		title:'待办列表',
		buttons:[{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'left', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '15px', //String类型,String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	epcTool.clicked('./home.html',epcTool.random(true),'首页');
            },
            text:'返回',
        }],
		btn:{
			edit:{
				title:'待办工作',
				btn:[{
					title:'提交',
					fns:'submit_task_fn'
				}]
			}, 
		},
		list:{
			extensionid:'com.epc.epcfoundation.extensions.ui.grid',
			functionpointid:'com.epc.epcfoundation.base.tasklist',
			// functiongroupid	:'402880b361f91d210161f92d8ee20002',
			functiongroupid:'4028b881547a965d01547aaa7d27000c',//流花
			grid:[1,3,4,5],
			iconfont:'icon-daiban',
		},
		form:{
			tabList:[{
				title:'表单信息',
				active:true,
				show:true,
				tempUrl:'./form.html',
				action:{
					extensionid:'com.epc.epcfoundation.extensions.ui.form2',
					functionpointid:'com.epc.epcfoundation.base.tasklist',
					functiongroupid	:'402880b13c7fb7a6013c8074eacc0018',
				},
			},{
				title:'流程历史',
				active:false,
				show:true,
				tempUrl:'./sub-list.html',
				action:{
					extensionid:'com.epc.epcfoundation.extensions.ui.grid',
					functionpointid:'com.epc.epcfoundation.base.tasklist',
					functiongroupid	:'402880b13c7fb7a6013c8074eacc0018',
					subgridname:'taskhistory',					
				},
				grid:[1,2,3,4,5,6]
			}],
		},
	},
	otherSchedule:{
		title:'他人日程',
		buttons:[{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'left', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '15px', //String类型,String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	epcTool.clicked('./home.html',epcTool.random(true),'首页');
            },
            text:'返回',
        }],
        btn:{
			view:{
				title:'查看他人日程',
				btn:[{
					title:'关闭',
					fns:'close_fn'
				}]
			}, 
		},
		list:{
			extensionid:'com.epc.epcfoundation.extensions.ui.grid',
			functionpointid:'com.epc.epcemp.schedule.search',
			functiongroupid	:'4028809a446838070144683a0e440002',
			grid:[1,2,3,4],
			iconfont:'icon-3richeng',
		},
		form:{
			tabList:[{
				title:'日程详情',
				active:true,
				show:true,
				tempUrl:'./form.html',
				action:{
					functionpointid:'com.epc.epcemp.schedule.search',
				}
			}],
		},
	},	
	MyotherSchedule:{
		title:'我的日程',
		buttons:[{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'left', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '15px', //String类型,String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	epcTool.clicked('./home.html',epcTool.random(true),'首页');
            },
            text:'返回',
        },{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'right', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '15px', //String类型,String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	epcTool.clicked('./tab.html',epcTool.random(true),epc['MyotherSchedule'].btn.new.title,{type:'MyotherSchedule',formbtn:'new',formtemp:epcTool.loadBtn('MyotherSchedule','')[0]});

            },
            text:'新建',
        }],
        btn:{
			view:{
				title:'查看他人日程',
				btn:[{
					title:'关闭',
					fns:'close_fn'
				}]
			}, 
			
			new:{
				title:'新建日程',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				}]
			},
			edit:{
				title:'修改日程',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				}]
			},
		},
			
		list:{
			extensionid:'com.epc.epcfoundation.extensions.ui.grid',
			functionpointid:'com.epc.epcemp.schedule.add',
			functiongroupid	:'297ed53260a01c720160a02220050003',
			grid:[1,2,3,4],
			iconfont:'icon-3richeng',
		},
		form:{
			tabList:[{
				title:'日程详情',
				active:true,
				show:true,
				tempUrl:'./form.html',
				action:{
					functionpointid:'com.epc.epcemp.schedule.add',
				}
			}],
		},
	},
}
