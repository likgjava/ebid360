package com.gpcsoft.epp.common.timerTask;

import java.util.TimerTask;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.gpcsoft.epp.project.service.ProjectPlanService;

/**
 * Comments: <strong>定时调整开始开标的项目</strong> <br/>
 * <br/>
 * CopyRright (c)2008-xxxx: 珠海政采软件技术有限公司 <br/>
 * Project: srplatform <br/>
 * Module ID: 权限平台 <br/>
 * Create Date：2010-9-10 上午10:14:12 by liuy <br/>
 * Modified Date: 2010-9-10 上午10:14:12 by liuy
 */
public class ProjectStartOpenBidTimeTask extends TimerTask {

	@Autowired(required=true) @Qualifier("projectPlanServiceImpl")
	private ProjectPlanService projectPlanService;

	private final Log logger = LogFactory
			.getLog(ProjectStartOpenBidTimeTask.class);

	private static boolean isRunning = false;// 当前是否正在执行的状态标志

	@Override
	public void run() {
		if (!isRunning) {
			logger.info("" + ProjectStartOpenBidTimeTask.class.getSimpleName()
					+ " is running!");
			isRunning = true;
			projectPlanService.updateOpenBid();
			isRunning = false;
		} else {
			logger.info("上次任务未完成。。。。。。");
		}
	}

}
