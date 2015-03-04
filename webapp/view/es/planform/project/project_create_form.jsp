<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/view/srplatform/common/taglibs.jsp"%>
<input type="hidden" id="isEndWorkTask" value="${isEndWorkTask}"></input>
	<form id="subprojectForm" method="post">
<div class="formLayout form2Pa">
	<h5><span>录入<dm:out value="local__package" tenderType="${param.tenderType}">包组</dm:out>信息</span></h5>
		<ul>
  			<li class="fullLine">
     			<label for="projCode"><dm:out value="local__package" tenderType="${param.tenderType}">包组</dm:out>编号：</label>
   				<input type="text" name="projCode" id="projCode" class="required" value="" onkeyup="subProjectForm.checkSubProjectName('code','projCode');"/>
   				<span class="eleRequired" id="warnNo">*</span>
   				<input type="hidden" name="parentId" id="parentId" value="${parentId}" />
   			</li>
   			<li class="fullLine">
   				<label for="projName"><dm:out value="local__package" tenderType="${param.tenderType}">包组</dm:out>名称：</label>
   				<input type="text" name="projName" id="projName" class="required" value="" onkeyup="subProjectForm.checkSubProjectName('name','projName');"/>
   				<span class="eleRequired" id="warnName">*</span>
   			</li>
   			<li class="fullLine">
   				<label for="projSummary"><dm:out value="local__package" tenderType="${param.tenderType}">项目</dm:out>摘要：</label>
   				<input type="text" name="projSummary" id="projSummary" class="required" value="" onkeyup="subProjectForm.checkSubProjectName('summary','projSummary');"/>
   				<span class="eleRequired" id="warnName">*</span>
   			</li>
    		<!--<li class="fullLine">
	      		<label for="">数量：</label>
   				<input type="text" name="quantity" id="quantity" class="required" value="" />
   				<span class="eleRequired">*</span>
			</li>
				--></ul>
				<!-- 隐藏数据用于判断 -->
			<input type="hidden" name="gloVar" id="gloVar" value=""/>
			<input type="hidden" id="flagCodeId" value="" />
			<input type="hidden" id="flagNameId" value="" />
   			<div class="conOperation">
   				<button id="subProjectSaveButton" type="button" tabindex="18"><span><spring:message code="globe.save"/></span></button>
				<button id="subProjectReturn" type="button" tabindex="19"><span><spring:message code="globe.close"/></span></button>
 			</div>
		
</div>

<div class="partContainers">
	<table class="tableList" id="SubProjectList">
		<caption>采购申报条目</caption>
  		<thead>
      		<tr class="center">
      			<th>选择</th>
          		<th>品目编号</th>
          		<th>品目名称</th>
          		<th>未拆分数量</th>
          		<th>未拆分预算（元）</th>
          		<th>拆分数量</th>
          		<th>拆分预算（元）</th>
     		</tr>
		</thead>
	<tbody >
		<c:forEach items="${taskPlanMSubList}" var="taskPlanMSub" varStatus="i">
			<tr>
				<td align="center"><input type="checkbox" id="checkboxOrgId_${i.count}" name="checkboxOrgId" value="" onclick="getRadionVal('${taskPlanMSub.taskPlanSub.realMoney}','${taskPlanMSub.taskPlanSub.purchase.objId}','${taskPlanMSub.taskPlanSub.realQuantity}','${taskPlanMSub.taskPlanSub.objId}','${taskPlanMSub.taskPlan.objId}','${i.count}');"/>
				</td>
				<td>${taskPlanMSub.taskPlanSub.purchase.categoryCode}</td>
				<td>${taskPlanMSub.taskPlanSub.purchase.categoryName}</td>
				<td>
						<fmt:formatNumber value="${taskPlanMSub.taskPlanSub.realQuantity}" type="number"  />
				</td>
				<td><fmt:formatNumber value="${taskPlanMSub.taskPlanSub.realMoney}" type="currency"/></td>
				<td style="text-align: center">
				<input type="text" name="quantity_${i.count}" id="quantity_${i.count}" value="" onkeyup="subProjectForm.showmoney('quantity_${i.count}','${taskPlanMSub.taskPlanSub.realQuantity}')" onblur="subProjectForm.recordSaveData('${taskPlanMSub.taskPlanSub.purchase.objId}','${taskPlanMSub.taskPlanSub.objId}','${taskPlanMSub.taskPlan.objId}','${i.count}');"/>
				<span id="quantity_${i.count}2"></span>
				</td>
				<td>
				<input type="text"  name="money_${i.count}" id="money_${i.count}" value="" onkeyup="subProjectForm.showmoney('money_${i.count}','${taskPlanMSub.taskPlanSub.realMoney}')" onblur="subProjectForm.recordSaveData('${taskPlanMSub.taskPlanSub.purchase.objId}','${taskPlanMSub.taskPlanSub.objId}','${taskPlanMSub.taskPlan.objId}','${i.count}');"/>
				<span id="money_${i.count}2"></span>
				</td>
				<input type="hidden" name="record" id="record_${i.count}"value=""/>
				<input type="hidden" name="quantityCheck" id="quantityCheck_${i.count}"value="${taskPlanMSub.taskPlanSub.realQuantity}"/>
			</tr>
		</c:forEach>
		
	</tbody>
    </table>
</div>
    </form>

<script language="javascript">

var subProjectForm = {}

//提交
$('#subProjectSaveButton').click(function(){
	if(!$('#subprojectForm').valid()){alert('请准确填写表单！');return;}
		if ($('#flagCodeId').val()=='false') {
			alert('包组编号只能由数字或字母组成,请正确输入！');
			return false;
		}
		if ($('#flagNameId').val()=='false') {
			alert('该包组名称已存在！');
			return false;
		}
		//获取拼装好的值：条目Id、申报书Id、数量
		 var recordCount='';
		  $('input[name="record"]').each(function(){
			  if($(this).val()!=""){
			  recordCount+=$(this).val()+':';
			  }
		  });
		//判断是否有选中的申报书条目
		 var checkSelected = '';
		  $('input[name="checkboxOrgId"]:checked').each(function(){
			  checkSelected='yes';
			});
					  
		if(recordCount==''||checkSelected==''){
			alert("请选择条目！");
			return false;
		}else{
			var jsonObj =  formToJsonObject('subprojectForm');
			if ($('#isEndWorkTask').val() == 'true') {
				var workFlowTaskId = $('[id=auditTaskId]').val();
				if(undefined == workFlowTaskId || null == workFlowTaskId || '' == workFlowTaskId){
					workFlowTaskId = $('[id=auditTask_Id]').val();
				}
				jsonObj.workFlowTaskId = workFlowTaskId;
				jsonObj.auditStatus = 'Y';
			}
			jsonObj.projectTaskId = $('#projectTaskId').val();
		  	$.getJSON($('#initPath').val()+'/ProjectController.do?method=saveProjectAndReq&recordCount='+recordCount+'&ebuyMethod='+$('#ebuyMethod').val(),jsonObj, function(json){
			   	if(json.result)alert(json.result);if(json.failure)return;
			   	$('#epsDialogCloseReload').click();
			    if($("#projectTaskId") && $("#projectTaskId").val() != "" &&$("#projectTaskId").val() !=null && $("#projectTaskId").val()!= undefined){
					planTemplateTask.clickMethod($("#projectTaskId").val()+"");
					//planTemplateTask.fulfillPlan($("#projectTaskId").val()+"");
				  } else {
					$("#myDesktop").click();
				}
			});	
		}
});
//关闭
$("#subProjectReturn").click(function(){
	$('#epsDialogCloseNoReload').click();
});

	function getRadionVal(money,purchaseId,quantity,taskPlanSubId,taskPlanId,num){
		if(Number(money)==0){alert("预算已用完！");$("#checkboxOrgId_"+num).removeAttr("checked");return false;}
		var golvar = $('#gloVar').val();
		//判断是否为同一品目
		if(golvar==""||golvar==purchaseId){
		//判断是否被选中
		if($("#checkboxOrgId_"+num).attr("checked")==true)
		{
		//var relMoney = Number(quantity)*Number(unitPrice)*1;//拆分预算金额
		//默认拆分数量
		$('#quantity_'+num).val(quantity);
		//默认拆分预算
		$('#money_'+num).val(money);
		//拼装后台处理数据
		var record = taskPlanSubId+','+taskPlanId+','+quantity+','+money
		$('#record_'+num).val(record);
		//用于判断是否为同一品目
		$('#gloVar').val(purchaseId);
		//subProjectForm.showRealMoney(num,money);//预算金额
		}
/**		else if (Number(money)<relMoney) {
			alert("填写数量过大，预算总金额不足！");
			$("#moneyRId_"+num).empty();
			$('#quantity_'+num).val("");
			return false;
		}
*/
		else{
			//判断是否还有选中的
			if($("[name='checkboxOrgId']").attr("checked")==true){
			$('#record_'+num).val("");
			$('#quantity_'+num).val("");
			}else{
			$('#record_'+num).val("");
			$('#quantity_'+num).val("");
			//没有选中的置为空
			$('#gloVar').val("");
			}
			//默认拆分预算
			$('#money_'+num).val("");
		}
		}//不是同一品目
		else{
			alert("请选择同一品目！");
			$("#checkboxOrgId_"+num).removeAttr("checked");
			$('#quantity_'+num).val("");
			//默认拆分预算
			$('#money_'+num).val("");
		}
	}
/**
	function checkQuantity(money,purchaseId,quantity,taskPlanSubId,taskPlanId,num){
		var quantity = $('#quantity_'+num).val();
		var quantityCheck = $('#quantityCheck_'+num).val();
		var relMoney = Number(quantity)*Number(unitPrice)*1;
		var golvar = $('#gloVar').val();
		if(Number(quantity)==0){
			alert("请正确填写数量！");
			$('#quantity_'+num).val('');
			$("#moneyRId_"+num).empty();
			$("#checkboxOrgId_"+num).attr("checked",false);
			return false;
		}else if(Number(quantity)>Number(quantityCheck)){
			alert("填写数量过大，未拆分数量不足！");
			$('#quantity_'+num).val('');
			$("#moneyRId_"+num).empty();
			$("#checkboxOrgId_"+num).attr("checked",false);
			return false;
		}else if (Number(money)<relMoney) {
			alert("填写数量过大，预算总金额不足！");
			$('#quantity_'+num).val('');
			$("#moneyRId_"+num).empty();
			$("#checkboxOrgId_"+num).attr("checked",false);
			return false;
		}else if (golvar!=purchaseId&&golvar!=''&&golvar!=null) {
			alert("请选择同一品目！");
			$('#quantity_'+num).val('');
			$("#moneyRId_"+num).empty();
			$("#checkboxOrgId_"+num).attr("checked",false);
			return false;
		}else{
			subProjectForm.showRealMoney(num,relMoney);
			//拼装后台处理数据
			var record = taskPlanSubId+','+taskPlanId+','+quantity+','+relMoney
			$('#record_'+num).val(record);
		}
	}
*/
	subProjectForm.recordSaveData=function(purchaseId,taskPlanSubId,taskPlanId,num){
		var golvar = $('#gloVar').val();
		if (golvar!=purchaseId&&golvar!=''&&golvar!=null) {
			alert("请选择同一品目！");
			$('#quantity_'+num).val('');
			$("#money_"+num).val('');
			$("#checkboxOrgId_"+num).attr("checked",false);
			return false;
		}else{
			//subProjectForm.showRealMoney(num,relMoney);
			var money = $('#money_'+num).val();
			var quantity = $('#quantity_'+num).val();
			//拼装后台处理数据
			var record = taskPlanSubId+','+taskPlanId+','+quantity+','+money
			$('#record_'+num).val(record);
		}
	}

//	subProjectForm.showRealMoney = function(num,relMoney){
//		$("#moneyRId_"+num).empty().html("<font color='red'>￥"+subProjectForm.formatNumber(relMoney)+".00</font>");
//	}
	
	subProjectForm.showmoney = function(obj,money){
		   var a = $("#"+obj).val();
		   var re = /^[0-9]+.?[0-9]*$/;   //判断字符串是否为数字      
		   if (money!=null&&money!=''&&money!=undefined) {
				if (Number(a)>Number(money)) {
					$("#"+obj+"2").html("<font color='red'>输入的值过大</font>");
			    	$("#"+obj).val('');
			    	$("#"+obj).focus();
				}else{
					   $("#"+obj+"2").empty();
				}
		   }else if (!re.test(a)){ //判断正整数 /^[1-9]+[0-9]*]*$/   
		    	 $("#"+obj+"2").html("<font color='red'>请输入数字</font>");
		    	 $("#"+obj).val('');
		         $("#"+obj).focus();    
		         return false;    
		   }else{
			   $("#"+obj+"2").empty();
		   }
		}
	
	subProjectForm.formatNumber=function(number){
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
	subProjectForm.checkSubProjectName = function(name,id){
		var idVal = $('#'+id).val();
		var parentId = $('#parentId').val();
		var tes =  /^[a-zA-Z0-9]+$/;
		if (idVal!=null&&idVal!=''&&idVal!=undefined) {//判断是否有值
			if ('code'==name) {//编号
				var jsonObj = {};
				jsonObj.value = idVal;
				$.getJSON($('#initPath').val()+'/ProjectController.do?method=checkSubProject&key=code&projectId='+parentId,jsonObj,function(json){
				   	if(json.result)alert(json.result);if(json.failure)return;
					if (json.projectList.length!=''&&json.projectList.length!=null&&json.projectList.length!=undefined&&json.projectList.length>0) {
						$('#warnNo').empty().html('该包组编号已存在!');
						$('#flagCodeId').val('false');
					}else if(!tes.test(idVal)) {//给编号加一个判断，编号只能由数字 和字母组成。若非，则return false.
						$('#warnNo').empty().html('包组编号只能由数字或字母组成!');
						$('#flagCodeId').val('false');		
					}else{
						$('#warnNo').empty();
						$('#flagCodeId').val('true');
					}
				});	
			}else{//名称
				var jsonObj = {};
				jsonObj.value = idVal;
				$.getJSON($('#initPath').val()+'/ProjectController.do?method=checkSubProject&key=name&projectId='+parentId,jsonObj, function(json){
				   	if(json.result)alert(json.result);if(json.failure)return;
				   	if (json.projectList.length!=''&&json.projectList.length!=null&&json.projectList.length!=undefined&&json.projectList.length>0) {
						$('#warnName').empty().html('该包组名称已存在!');
						$('#flagNameId').val('false');
					}else{
						$('#warnName').empty();
						$('#flagNameId').val('true');
					}
				});	
			}
		}

	}
</script>