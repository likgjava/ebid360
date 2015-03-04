
var InqpDocConfig = {};
InqpDocConfig.auditpurchaseDoc = function(){
	$.getJSON($('#initPath').val()+'/SingleSourceDocController.do?method=purchaseDocConfig&objId='+$("#purchaseDocId").val()+'&auditStatus='+$("#auditStatus").val()+'&projectId='+$("#projectId").val(), function(json){
		if(json.result)alert(json.result);if(json.failure)return;
		if($("#fromType").val()=='fromList'){ //从项目列表进入
			$("#tabform2").click();
		}else if($("#fromType").val()=='fromDesk'){//从我的桌面进入
			$("#myDesktop").click();
		}
		
	});
}

InqpDocConfig.checkOpinion = function(){
	//操作权限
	var doAuth = true;
	if($("#auditStatus").val()=="N"){
		if(($("textarea[name='opinion']").val()==null || $("textarea[name='opinion']").val()=="")){
			alert("请填写审核不通过原因!");
			doAuth = false;
		}
	}
	return doAuth;
}

InqpDocConfig.downloadFile = function(attachRelaId){	
	$.getJSON($('#initPath').val()+'/InqpDocBuyRecordController.do?method=dosIsDownLoad&projectId='+$("#projectId").val(),function(json){
		if(json.result)alert(json.result);if(json.failure)return;
	    if(json.isPay){
	    	$('#downLoadView').empty().loadPage($('#initPath').val()+"/view/es/singlesource/singlesourcedoc/docDownLoad.jsp?attachRelaId="+attachRelaId);
	    }
	});
}

InqpDocConfig.getFileName = function(attachRelaId){
	 $.getJSON($('#initPath').val()+'/InqpDocBuyRecordController.do?method=getAttachmentByobjId&attachmentId='+attachRelaId,function(json){
		 if(json.result)alert(json.result);if(json.failure)return;
		 $("#fileName").text(json.attachment.viewName);
		});
}



$(document).ready(function(){
	  var AttachmentId = $("#attachmentId").val();
	  InqpDocConfig.getFileName(AttachmentId);
	
	//确认
	$('#passButton').click(function(){
		$("#auditStatus").val("Y");
		if(InqpDocConfig.checkOpinion()) {
			InqpDocConfig.auditpurchaseDoc();
		}
		
	});
	//不确认
	$('#noPassButton').click(function(){
		$("#auditStatus").val("N");
		if(InqpDocConfig.checkOpinion()) {
			InqpDocConfig.auditpurchaseDoc();
		}
	});
		
});

//查看历史
$('#historyId').click(function(){
	$("#historyView").loadPage($('#initPath').val()+"/CompletedWorkTaskController.do?method=getCompletedWorkTaskByBizId&bizId="+$("#purchaseDocId").val()+'&taskType=03');
});