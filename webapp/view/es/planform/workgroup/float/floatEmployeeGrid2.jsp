<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/view/srplatform/common/init.jsp"%>

<script type="text/javascript" src="<%=request.getContextPath()%>/view/es/planform/workgroup/float/floatEmployeeGrid2.js"></script>
<input type="hidden" name="workGroupId" id="workGroupId" value="<c:out value="${param.workGroupId}"/>"/>
<form id="employeeSearchZone" >
			<input type="hidden" name="orgId">
			<div class="conSearch">
				<h4><span><spring:message code="globe.query"/></span></h4>
				<ul>
					<li class="operationBtnDiv"><spring:message code="employeeForm.number" />:
						<input type="text" name="number" value="" style="width: 100px;"><input type="hidden" name="number_op" value="like" >
					<spring:message code="employeeForm.name" />:
						<input type="text" name="name" value="" style="width: 70px;" >
						<input type="hidden" name="name_op" value="like">
					
					论证小组:
					<select name="company.objId" id="orgId" style="width: auto;">
						<option  value="${agencyId }" >招标中心</option>
						<option  value="${monitorId }">监管</option>
						<option value="${buyId }">招标单位</option>
					</select>
				      <button type="submit" ><span><spring:message code="globe.search"/></span></button>
				    </li>
				</ul>
			</div>
		</form>
		<flex:flexgrid usepager="true" showTableToggleBtn="true"  onKeyRight="employeeGridList.keyRight" 
			id="employeeGrid" url="UserApiController.do?method=getEmpListByCompany&order=createTime&order_flag=true" queryColumns="name,number,objId"  
				searchZone="employeeSearchZone" rp="10" title="员工列表"  
				onSubmit="employeeGridList.before" onSuccess="employeeGridList.success" checkbox="true">
			<flex:flexCol name="number" display="员工编号" width="50"></flex:flexCol>
			<flex:flexCol name="name" display="姓名" sortable="true" align="left" width="100"></flex:flexCol>
			<flex:flexCol name="email" display="邮箱" sortable="true"  width="200" align="left"></flex:flexCol>
			<flex:flexBtn name="选定" bclass="add" onpress="employeeGridList.add"></flex:flexBtn>	
		</flex:flexgrid>


