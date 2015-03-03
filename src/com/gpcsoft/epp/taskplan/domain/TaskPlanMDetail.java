package com.gpcsoft.epp.taskplan.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.GenericGenerator;

import com.gpcsoft.core.model.GpcBaseObject;

/** 
  *  Comments: <strong>申报书与条目中间表</strong>            		
  *	 <br/>		        																							
  *  <br/>CopyRright (c)2008-xxxx:   珠海政采软件技术有限公司    		
  *  <br/>Project:   srplatform                    					          
  *  <br/>Module ID: 权限平台     		
  *  <br/>Create Date：2010-6-3 下午08:13:05 by Administrator    					                            
  *  <br/>Modified Date:  2010-6-3 下午08:13:05 by Administrator  
  *  
  *  
  *  @gpcsoft.package packageDir="com.gpcsoft.epp.taskplan"
  *  @gpcsoft.page domain="planform/taskplan" project="es"
  *  @gpcsoft.domain
  *  @gpcsoft.title value="采购计划"
  */ 



@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@org.hibernate.annotations.Entity(dynamicUpdate = true, dynamicInsert = true)

@Table(name = "ECP_TASK_DETAIL")
public class TaskPlanMDetail implements GpcBaseObject{
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "TASK_M_DETAIL_ID", length = 36)
	@GeneratedValue(generator = "paymentableGenerator")
	@GenericGenerator(name = "paymentableGenerator", strategy = "uuid.hex")
	private String objId;//主键
	
	@ManyToOne(fetch=FetchType.LAZY, optional=true)
	@JoinColumn(name="TASK_PLAN_ID", updatable = false)//关联的外键	 
	@BatchSize(size = 15)//批量抓取
	private TaskPlan taskPlan;

	@ManyToOne(fetch=FetchType.LAZY, optional=true)
	@JoinColumn(name="TASK_PLAN_DETAIL_ID", updatable = false)//关联的外键	 
	@BatchSize(size = 15)//批量抓取
	@Cascade({CascadeType.DELETE_ORPHAN})
	private TaskPlanDetail taskPlanDetail;
	
	@Column(name="STATUS")
	private String status;
	

	@Transient
	private Boolean   isSum; //是否汇总（数据交换时使用）
	
	public Boolean getIsSum() {
		return isSum;
	}

	public void setIsSum(Boolean isSum) {
		this.isSum = isSum;
	}
	
	
	/**
	 * @gpcsoft.property title="申报书"
	 * @gpcsoft.validate class="required"
	 */
	public TaskPlan getTaskPlan() {
		return taskPlan;
	}

	public void setTaskPlan(TaskPlan taskPlan) {
		this.taskPlan = taskPlan;
	}

	/**
	 * @gpcsoft.property title="申报书条目"
	 * @gpcsoft.validate class="required"
	 */
	public TaskPlanDetail getTaskPlanDetail() {
		return taskPlanDetail;
	}

	public void setTaskPlanDetail(TaskPlanDetail taskPlanDetail) {
		this.taskPlanDetail = taskPlanDetail;
	}
	
	/**
	 * @gpcsoft.property title="状态"
	 * @gpcsoft.validate class="required"
	 */
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setObjId(String objId) {
		this.objId = objId;
	}

	public Date getCreateTime() {
		// TODO Auto-generated method stub
		return null;
	}

	public String getObjId() {
		return this.objId;
	}

	public void setCreateTime(Date arg0) {
		// TODO Auto-generated method stub
		
	}

}
