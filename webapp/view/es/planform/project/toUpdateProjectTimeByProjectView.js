
var projectForm={};
//对时间进行校验
projectForm.checkTime=function(){
	if($("#signUpSTime").val()>=$("#signUpETime").val()){alert('报名结束时间应大于报名开始时间！');return false;}
	if($("#signUpETime").val()>=$("#tenderStartTime").val()){alert('投标开始时间应大于报名结束时间！');return false;}
	if($("#tenderStartTime").val()>=$("#tenderEndTime").val()){alert('投标结束时间应大于投标开始时间！');return false;}
	return true;
}

$(document).ready(function(){
	/**
	 * 初始化关联项目Id
	 */
	$("*[name=objId]").val($("#projectId").val());
	 
	$('#projectForm').validate();
	
	$("#signUpSTime").epsDatepicker({ timeShow:true});
	$("#signUpETime").epsDatepicker({ timeShow:true});
	$("#tenderStartTime").epsDatepicker({ timeShow:true});
	$("#tenderEndTime").epsDatepicker({ timeShow:true});
	//返回
	//关闭
	$('#closeButton').click(function(){
		$('#epsDialogClose').click();
	});
	//保存
	$('#projectSave').click(function(){
		if(!$('#projectForm').valid()){alert('请正确填写表单!');return;}
		//同步时间
		if(projectForm.checkTime()){
			if(window.confirm("确认保存?")) {
				$.getJSON($('#initPath').val()+'/ProjectController.do?method=updateProjectTime&isComplete=true', formToJsonObject('projectForm'), function(json){
					if(json.result)alert(json.result);if(json.failure)return;
					planTemplateTask.fulfillPlan($('#projectTaskId').val());
					$('#epsDialogCloseReload').click();
				});
			}
		}
	});
});


//查看历史
$('#historyId').click(function(){
	$("#historyView").loadPage($('#initPath').val()+"/CompletedWorkTaskController.do?method=getCompletedWorkTaskByBizId&bizId="+$("#objId").val()+'&taskType=01');
});