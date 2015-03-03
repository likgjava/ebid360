package com.gpcsoft.epp.worktask.manager.impl;
import java.util.Date;

import org.springframework.stereotype.Repository;

import com.gpcsoft.core.manager.impl.BaseManagerImpl;
import com.gpcsoft.epp.worktask.domain.CompletedWorkTask;
import com.gpcsoft.epp.worktask.manager.CompletedWorkTaskManager;
import com.gpcsoft.plugin.acegi.AuthenticationHelper;

@Repository
public class CompletedWorkTaskManagerImpl extends BaseManagerImpl<CompletedWorkTask> implements CompletedWorkTaskManager {
	/** 
	 * Description :  被动产生已完成任务
	 * Create Date: 2010-7-30下午04:23:57 by yangx  Modified Date: 2010-7-30下午04:23:57 by yangx
	 * @param taskName		任务名称
	 * @param taskType 		任务类型
	 * @param opinion		任务操作记录
	 * @param bizId 		业务Id
	 * @param parentBizId 	上级Id
	 * @param viewResultURL 到操作页面的URL
	 * @param processResult 处理结果
	 */
	public void createCompTaskByPassivity(String taskName,String taskType, String opinion, String bizId, String parentBizId,String viewResultURL,String processResult) {
		CompletedWorkTask completedWorkTask = new CompletedWorkTask();
		completedWorkTask.setWorktaskName(taskName);
		completedWorkTask.setWorktaskType(taskType);
		completedWorkTask.setOpinion(opinion);
		completedWorkTask.setBizId(bizId);
		completedWorkTask.setPrcessResult(processResult);
		completedWorkTask.setViewProcResultUrl(viewResultURL);
		completedWorkTask.setCreateUser(AuthenticationHelper.getCurrentUser());
		completedWorkTask.setCreateTime(new Date());
		this.save(completedWorkTask);
	}
}
