/*
 * 执行平台，采购申报书详情
 * author: 梁潇静
 * mail: liangxj@gpcsoft.com
 */
var taskPlanDetail={};

//显示委托协议信息
taskPlanDetail.showConsign = function(id){
	if($("#isBlockTrade").val()=='isBlockTrade'){//大宗交易
		$('#conBody').empty().loadPage($('#initPath').val()+'/ConsignController.do?method=showDetail&isBlockTrade=isBlockTrade&objId='+id);
	}else{ //非大宗交易
		if($("#fromto").val()=='consignList'){
			$('#conBody').empty().loadPage($('#initPath').val()+'/ConsignController.do?method=showDetail&fromto=consignList&taskPlanId&fromto=fromTaskplan&objId='+id);	
		}else{
			$('#conBody').empty().loadPage($('#initPath').val()+'/ConsignController.do?method=showDetail&taskPlanId&fromto=fromTaskplan&objId='+id);
		}
	}
}

$(document).ready(function(){
	$('[id=epsTabs]').tabs();
	//historyBackBtn
	$("[name=return_to_list]").click(function(){
	   $('#epsDialogClose').click();
	})
	
    //查询条件过滤
    taskPlanDetail.before=function(){
    	var option={"taskPlan.objId":$("#objId").val()}
    	$('#taskPlanDetailGrid').flexOptions({params:option});
    	$('#taskPlanSubGrid').flexOptions({params:option});
    	return true;
    }
    
    //隐藏发起委托的按钮
    if($("#auditDetail").val() != '02' || $("#confirmStatus").val() != '02' || $("#consigns").text().length > 10){
    	$("#toConsign").hide();
    }
    
    //隐藏返回按钮
    if($("#taskPlanId").val() && $("#taskPlanId").val() != ''){
    	$("#taskPlanForm").find("button[name=historyBackBtn]").hide();
    	$("#toConsign").hide();
    }

    //打印预览
    $('#toPrint').click(function(){
    	var taskPlanId = $("#taskPlanIds").val();
		$.getJSON($('#initPath').val()+'/TaskPlanController.do?method=toBuyerTaskPlanPrintPage&taskPlanId='+taskPlanId,function(json){
		    if(json.result)alert(json.result);if(json.failure)return;
		    window.open($('#initPath').val()+'/view/es/common/RequestContentPrint.jsp');
		});	
	});
    
    
	//发起委托
	$('#toConsign').click(function(){
		$('#conBody').loadPage($('#initPath').val()+'/ConsignController.do?method=toDraft&taskPlanId='+$("#objId").val());
	});
	
	//tabs的点击事件  modify by xiaojf
//	$("li a.refreshData").click(function(){
//		var funcname = $(this).attr("id")+"GridRender";
//		eval(funcname+"()");
//	})
	
	taskPlanDetail.success = function(){
		$("#taskPlanSubGrid").flexGetColByName({
			 'taskPlanSub.objId' : function(id,t){
			 	var json = $("#taskPlanSubGrid").flexGetRowJsonById(id); 
			 	$(t).html('<span><a href="#" class="abtn" onclick="taskPlanDetail.showDetail(\''+json['taskPlanSub.objId']+'\')">详情</a>&nbsp;&nbsp;&nbsp;&nbsp;</span>');
			}
		});
	}
	taskPlanDetail.showDetail = function(objId){
		$.epsDialog({
	    	title:'申报书条目-查看需求信息',
	    	url:$('#initPath').val()+'/TaskPlanController.do?method=toLookTaskPlanSubRequireInfoView&objId='+objId,
	    	width: '650',
	    	height: '450',
	    	onClose: function(){ 
	        	
	       }
		});
	}
	taskPlanDetail.showConsign2 = function(objId){
		$.epsDialog({
	    	title:'申报书条目-查看需求信息',
	    	url:$('#initPath').val()+'/ConsignController.do?method=showDetail&taskPlanId&fromto=fromTaskplan&objId='+objId,
	    	width: '650',
	    	height: '260',
	    	onClose: function(){ 
	        	
	       }
		});
	}
	//授权的查看历史
	$('#historyGrantedBtn').click(function(){
		$("#historyView").loadPage($('#initPath').val()+"/CompletedWorkTaskController.do?method=getCompletedWorkTaskByBizId&bizId="+$("#taskPlanIds").val()+'&taskType=00');
	});
});