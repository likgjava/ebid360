/*
 * 执行平台，采购申报书 表单
 * author: 梁潇静
 * mail: liangxj@gpcsoft.com
 */
var taskPlanFormForSum={};
//加载附件
taskPlanFormForSum.loadAttachment = function(itemId){
	//附件
	$('#TPFFSUploadAttachment').loadPage($('#initPath').val()+'/view/ext/srplatform/upload/attachmentAjaxFile.jsp',{
		defineSelf:'attachRelaId',//存放关联id的属性名
		attBizId:$("#objId").val(),
		attBizType:"TASKPLAN",
		itemId:itemId,
		readOnly:'no'
	});
}
//加载子项
taskPlanFormForSum.showSubsAndDetails = function(){
	$("#taskPlanSubListView").empty().load($('#initPath').val()+'/view/es/planform/taskplan/taskPlanSubList.jsp');
	$("#taskPlanDetailListView").empty().load($('#initPath').val()+'/view/es/planform/taskplan/taskPlanDetailList.jsp');
	$("#taskPlanSubListForSumView").load($('#initPath').val()+'/view/es/planform/taskplan/taskPlanSubListForSum.jsp');
	$("#taskPlanDetailListForSumView").load($('#initPath').val()+'/view/es/planform/taskplan/taskPlanDetailListForSum.jsp');
}

taskPlanFormForSum.formatNumber=function(number){
	var number = ""+number;
	if(number.length > 3){
	   var mod = number.length%3;
	   var put = (mod > 0 ? (number.substring(0,mod)) : "");
	   var j=(number.length-mod)/3;
	   for(i=0;i<j;i++){
	    if(mod==0&&i==0){
	     put+=number.substring(mod+3*i,mod+3*i+3);
	    }else if(mod==0&&i!=0){
	     put+=","+number.substring(mod+3*i,mod+3*i+3);
	    }else {
	     put+=","+number.substring(mod+3*i,mod+3*i+3);
	    }
	   }
	   number=put;
	}
	return number;
	}
 
$("[name=taskType]").change( function() {
	 selectEbuyMethod(this.value);
});  


function  selectEbuyMethod(taskType){  //根据申报书类型值返回采购方式值
	var ebuyMethodArray = new Array();
	if(taskType=='01'){//政府采购
		ebuyMethodArray.push(['00','公开招标'],['01','邀请招标'],['02','竞争性谈判'],['03','询价'],['04','单一来源']);
	}else if(taskType=='02'){//土地交易
		ebuyMethodArray.push(['08','挂牌'],['09','竞标'],['10','拍卖']);
	}else if(taskType=='03'){//产权交易
		ebuyMethodArray.push(['06','竞价']);
	}else if(taskType=='04'){//建筑工程
		ebuyMethodArray.push(['00','公开招标'],['01','邀请招标']);
	}
 var selectObj = $("[name=ebuyMethod]");
 selectObj.find('option').remove();
 for(var i=0;i<ebuyMethodArray.length;i++){
	 selectObj.append("<option class='required' value="+ebuyMethodArray[i][0]+">"+ebuyMethodArray[i][1]+"</option>");
 }
	 selectObj.val(ebuyMethodArray[0]);
}



$(document).ready(function(){
	 selectEbuyMethod('01'); //默认选取政府采购
	
	var dateObj = {};
	
	$('[name=taskType]').click(function(){
		$('#taskTypes').val($(this).val());
		var objId = $('#taskPlanFormForSum input[name=objId]').val();
		if (undefined != objId && null != objId && '' != objId) {
			// 根据申报书ID获取下级申报书明细
			$.getJSON($('#initPath').val()+'/TaskPlanSubController.do?method=getLowerLeverTaskPlanSubByTaskPlan',{'taskPlanId':objId}, function(json){
				if(json.result)alert(json.result);if(json.failure)return;
				if (json.taskPlanSubList.length>0) {
					if(confirm("更改申报书类型，将会退回汇总的申报书明细。\n 确认变更申报书类型吗？")){
						$.getJSON($('#initPath').val()+'/TaskPlanMSubController.do?method=removeSumMSubs',{'taskPlanSubIds':json.taskPlanSubIds}, function(msg){// 退回汇总的申报书明细
							if(json.result)alert(json.result);if(json.failure)return;
							$("#taskPlanSubListForSumView").empty().load($('#initPath').val()+'/view/es/planform/taskplan/taskPlanSubListForSum.jsp');
						});
					}else{
						$('[name=taskType][checked=false]').attr("checked",true);
					}
				}
			});
		}
	})
	
	//加载tabs
	$('#epsTabs').tabs();
	$('#epsTabs2').tabs();
	
	//时间控件
    $("#applyDate").val(new Date().Format('yyyy-MM-dd')).epsDatepicker();
    var finishdate = new Date();
    finishdate.setDate(finishdate.getDate()+31);//取得系统时间的前一天,重点在这里,负数是前几天,正数是后几天 
    $("#finishDate").val(finishdate.Format('yyyy-MM-dd')).epsDatepicker();
     			
    //判断id是否为空
    if($("#objId").val()=='')
    {
    	//$("#taskCodeSpan").empty().append("保存后编号自动生成.");
    	$("#epsTabs").hide();  //隐藏下面的子项
    	$("#epsTabs2").hide();  //隐藏下面的子项
    	$('#taskPlanSubmit').hide();  //隐藏提交审核按钮
    } 			
    else
    {
    	//加载子项
    	taskPlanFormForSum.showSubsAndDetails();
    } 			
	
	//选择业务处室
	$("#governmentName").autocomplete(
		$('#initPath').val() + '/UserApiController.do?method=getDepartmentByQueryObject&queryColumns=objId,name,contact,tel', 
		{
			matchColumn:'name,shortSpellName',//作为查询显示, 被选中之后匹配的列
			extraParams:{
			'status':'1',
			'status_relative':'[and]'},
			mustMatch: true,
			formatItem: function(data, i, total) {
				return data.name;
			},
			formatMatch: function(data, i, total) {
				return data.name;
			},
			formatResult: function(data) {
				return data.name;
			}
		}
	).result(function(event,data,formatted){
		dateObj = data;
		if(data){
			$("#governmentName").val(data.name);//回填id
			$("input[id=government.objId]").val(data.objId);//回填id
			$("#govLinker").val(data.contact);  //联系人
			$("#govLinkerTel").val(data.tel);  //联系电话
			
			// 选择联系人(多选)
			$.epsDialog({
				id:"select_linker",
		    	title:'请选择&nbsp;'+data.name+'&nbsp;联系人',
		    	url:$('#initPath').val()+'/TaskPlanController.do?method=toSelectGovernmentLinkerView&params='+data.objId,
		    	width: '480',
		    	height: '270',
		    	isReload: false
			});
		}
	});
	
	//选择招标中心
	$("#taskAgentName").autocomplete(
		$('#initPath').val() + '/OrgInfoController.do?method=getObjectQuery&queryColumns=objId,orgName', 
		{
			matchColumn:'orgName',//作为查询显示, 被选中之后匹配的列
			extraParams:{"agencyId":null,"agencyId_op":"!="},
			mustMatch: true,
			formatItem: function(data, i, total) {
				return data.orgName;
			},
			formatMatch: function(data, i, total) {
				return data.orgName;
			},
			formatResult: function(data) {
				return data.orgName;
			}
		}
	).result(function(event,data,formatted){
		if(data){
			$("#taskAgentName").val(data.orgName);//回填id
			$("input[id=taskAgent.objId]").val(data.objId);//回填id
		}
	});
	
	//保存
	$('#taskPlanSave').click(function(){
		if(!$('#taskPlanFormForSum').valid()){alert('请正确填写表单!');return;}
		// 验证是否选择联系人
		var govLinker = $("#govLinker").val();
		if(null == govLinker || "" == govLinker){
			alert("请选择业务处室联系人！");
			return false;
		}
		
		$("#taskPlanSave").attr("disabled","disabled");
		$.getJSON($('#initPath').val()+'/TaskPlanController.do?method=createTaskPlanStair', formToJsonObject('taskPlanFormForSum'), function(json){
			if(json.result)alert(json.result);if(json.failure)return;
			$("#taskCodeSpan").empty().append(json.taskCode);
			$("#taskCode").val(json.taskCode);
			//隐藏“下一步”
			$("#taskPlanSave").hide();
			if($("#objId").val() == ''){
				$("#objId").val(json.taskPlanId);
				//显示子项和提交按钮
				$("#epsTabs").show();
				$("#epsTabs2").show();
			    //加载附件信息部分第一个TabPanel的数据
				$('#epsTabs2').find("li").each(function(i,n){
						$(this).find(">a").click();
						return false;
				});
				$("#taskPlanSubmit").show();
				taskPlanFormForSum.showSubsAndDetails();
			}
		});
	});
	
	//提交审核
	$('#taskPlanSubmit').click(function(){
		var sub_rows=$('#taskPlanSubGrid').flexOptions()[0].p.total;   //本级申报书明细
		var detail_rows=$('#taskPlanDetailGrid').flexOptions()[0].p.total;  //本级采购资金明细
		var sub_forsum_rows=$('#taskPlanSubForSumGrid').flexOptions()[0].p.total;  //下级申报书明细
		var detail_forsum_rows=$('#taskPlanDetailForSumGrid').flexOptions()[0].p.total;  //下级采购资金明细
		
		// 验证是否选择联系人
		var govLinker = $("#govLinker").val();
		if(null == govLinker || "" == govLinker){
			alert("请选择业务处室联系人！");
			return false;
		}
		
		if(!((sub_rows != 0 && detail_rows != 0) || (sub_forsum_rows !=0 && detail_forsum_rows !=0))){
			alert('请填写"本级申报书明细"和"资金明细"或"下级申报书明细"和"下级资金明细" ！');
			return;
		}
		if(sub_rows==0&&detail_rows!=0){
			alert('请填写"本级申报书明细" ！');
			return;
		}
		if(sub_rows!=0&&detail_rows==0){
			alert('请填写"本级采购资金明细" ！');
			return;
		}
		var b=taskPlanFormForSum.formatNumber(Number($("#moneySub").val())-Number($("#moneyDetail").val()));
		if(Number($("#moneySub").val())>Number($("#moneyDetail").val())){alert("申报书明细超出预算￥"+b+"元,请调整申报书明细的资金或采购资金明细的预算金额!");return false;}
		if(window.confirm('确认要提交立项吗？')){
			$("#taskPlanSubmit").attr("disabled","disabled");
			$.getJSON($('#initPath').val()+'/TaskPlanController.do?method=submitTaskPlanStair',formToJsonObject('taskPlanFormForSum'), function(json){
				if(json.result)alert(json.result);if(json.failure)return;
				if('desktop' == $('#paramType').val()){// 从桌面进入,返回到桌面
					$("#myDesktop").click();
					return false;
				}
				if('desktopList' == $('#paramType').val()){// 从桌面列表进入,返回到列表
					var url = 'TaskPlanController.do?method=getMoreForTaskPlanList&useStatus=01&confirmStatus=04&auditDetail=04';
	    			$('#conBody').loadPage($('#initPath').val()+'/'+url);
					return false;
				}
				$('button[name=historyBackBtn]').click();
			});	
		}
	});
});
//查看历史
$('#historyId').click(function(){
	$("#historyView").loadPage($('#initPath').val()+"/CompletedWorkTaskController.do?method=getCompletedWorkTaskByBizId&bizId="+$("#objId").val()+'&taskType=00');
});

