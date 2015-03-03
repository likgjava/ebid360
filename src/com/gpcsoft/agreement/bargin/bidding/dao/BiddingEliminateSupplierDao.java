package com.gpcsoft.agreement.bargin.bidding.dao;

import java.util.List;
import java.util.Map;

import com.gpcsoft.agreement.bargin.bidding.domain.BiddingEliminateSupplier;
import com.gpcsoft.core.dao.BaseGenericDao;

public interface BiddingEliminateSupplierDao extends BaseGenericDao<BiddingEliminateSupplier> {
	/** 
	 * Description :  根据项目ID和轮次ID获取剔除供应商信息
	 * Create Date: 2010-9-28上午11:15:50 by sunl  Modified Date: 2010-9-28上午11:15:50 by sunl
	 * @param   
	 * @return  
	 * @Exception   
	 */
	public boolean isSupplierEliminated(String projId,String turnId,String supplierId) throws Exception;
	
	/** 
	 * Description :  获取报名供应商和供应商剔除信息
	 * Create Date: 2010-9-28上午11:15:50 by sunl  Modified Date: 2010-9-28上午11:15:50 by sunl
	 * @param   
	 * @return  
	 * @Exception   
	 */
	public List<Object> getSignupSupplierAndEliminate(String projId,String turnId) throws Exception;

	/** 
	 * Description :  获取剔除的供应商
	 * Create Date: 2011-7-4下午04:40:46 by likg  Modified Date: 2011-7-4下午04:40:46 by likg
	 * @param   
	 * @return  
	 * @Exception   
	 */
	public List<BiddingEliminateSupplier> getEliminateSupplier(Map<String, Object> param) throws Exception;
}