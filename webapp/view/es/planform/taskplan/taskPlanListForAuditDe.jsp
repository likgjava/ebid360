<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/view/srplatform/common/taglibs.jsp"%>
<style type="text/css">
<!--
a.abtn {text-decoration:underline}
--> 
</style>
<script>
/*
 * 执行平台，审核采购申报书资金列表
 * author: 梁潇静
 * mail: liangxj@gpcsoft.com
 */
var taskPlanListAudit={};

//审核
taskPlanListAudit.audit = function(name,grid){
	var ids = $(grid).getSelects().split(",");
	if(ids == ""){
		alert("请至少选择一个申报书!");
		return false;
	}else{
		var json = {};
		json['idsP']='ids';
		json['opinionP']='opinion';
		json['ids'] =ids;
		json['passAction'] = 'TaskPlanController.do?method=auditStockBankrollPass';
		json['noPassAction'] = 'TaskPlanController.do?method=auditStockBankrollReject';
		$.epsDialog({
					title:'批量审核',
					url:$('#initPath').val()+'/view/srplatform/batch/audit.jsp?json='+obj2str(json), 
					width: 500,
					height: 200,
					afterLoad: function(){}, //加载完url后调用
					onClose: function(){$(grid).reload()} //关闭后调用
				});	
		
	}
}

//列表操作验证
taskPlanListAudit.validation=function(name,grid){
	if($(grid).isSelectEmpty()){alert('请选择一个申报书');return false;}//是否选中
	if(!$(grid).isSelectOne()){alert('请只选择一个申报书');return false;}//是否只选中一个
	return true;
}

//查询条件过滤
taskPlanListAudit.before=function(){
	var option={"auditDetail":"01"}
	option["government.objId"] = PlatForm.user.emp.department.objId;
	$('#taskPlanGrid').flexOptions({params:option});
	return true;
}
taskPlanListAudit.success=function(){
	$("#taskPlanGrid").flexAddOptionStr({
		'<span><a href="#" class="abtn">审核</a>&nbsp;&nbsp;&nbsp;&nbsp;</span>' : function(btn,rowId,obj){
		btn.click(function(){
			$('#conBody').loadPage($('#initPath').val()+'/view/es/planform/taskplan/taskPlanFormForAuditDe.jsp?objId='+rowId);
		}).appendTo(obj);
	}
	});
}

$(document).ready(function(){
	//日历控件
	$('#applyDate').epsDatepicker();

	//设定返回路径
	$("#returnUrl").val($('#initPath').val()+"/view/es/planform/taskplan/taskPlanListForAuditDe.jsp");
});
</script>

<form id="taskPlanSearchZone" >
	<div class="conSearch">
		<h4><span><spring:message code="globe.query"/></span></h4>
		<ul>
			<li>
				<label>
					<spring:message code="taskPlanForm.taskCode" />：
				</label>
		    	<input type="text" name="taskCode" value="">
				<input type="hidden" name="taskCode_op" value="like">
			</li>
			<li>
				<label>
					<spring:message code="taskPlanForm.applyDate" />：
				</label>
		    	<input class="sysicon siDate" id="applyDate" name="applyDate">
			</li>
			<li class="operationBtnDiv">
				<button type="submit"><span><spring:message code="globe.query"/></span></button>
			</li>
		</ul>
	</div>
</form>
<flex:flexgrid checkbox="true"
	id="taskPlanGrid" url="TaskPlanController.do?method=list" queryColumns=""  
		searchZone="taskPlanSearchZone" rp="10" title="采购申报书列表"   
		onSubmit="taskPlanListAudit.before" onSuccess="taskPlanListAudit.success">
				<flex:flexCol name="taskCode" display="taskPlanForm.taskCode" sortable="true" width="80" align="center"></flex:flexCol>
					<flex:flexCol name="taskName" display="taskPlanForm.taskName" sortable="true" width="100" align="left"></flex:flexCol>
					<flex:flexCol name="ebuyMethod" alias="ebuyMethodCN"  display="taskPlanForm.ebuyMethod" sortable="true" width="60" align="center"></flex:flexCol>
					<flex:flexCol name="budgetName" display="taskPlanForm.budget" sortable="true" width="150" align="left"></flex:flexCol>
					<flex:flexCol name="departmentName" display="taskPlanForm.department" sortable="true" width="150" align="left"></flex:flexCol>
					<flex:flexCol name="governmentName" display="taskPlanForm.government" sortable="true" width="50" align="left"></flex:flexCol>
					<flex:flexCol name="applyDate" format="date" display="taskPlanForm.applyDate" sortable="true" width="100" align="center"></flex:flexCol>
	<flex:flexBtn name="批量审核" bclass="audit" onpress="taskPlanListAudit.audit"></flex:flexBtn>	
</flex:flexgrid>
