var goodsPriceCreate = {};

//选择区域
goodsPriceCreate.selectDistrict = function(){
    $.epsDialog({
    	id:'districtDiv',
        title:'请选择区域',
        url:$('#initPath').val()+'/TreeController.do?method=toTree&property=district&className=District&action=listTop&isOpen=1&dialogId=districtDiv'
    }); 
}

//保存或提交
goodsPriceCreate.saveOrSubmit = function(opType){
	if(!$('#priceForm').valid()){alert('请正确填写表单!');return;}
	var priceJson = formToJsonObject("priceForm");
	priceJson.goodsId = $("#GoodsDetailForm").find("input[id=objId]").val();
	priceJson.OptFitPriceJson = "";
	priceJson.opType = opType;
	
	//拼装js串
	$.each($("#priceForm").find("input[name^=relativePrice]"),function(index,obj){
		if($(obj).val()){
			if(index==0||priceJson.OptFitPriceJson==""){
				priceJson.OptFitPriceJson += $(obj).parent().find("input[name^=optId]").val()+":"+$(obj).val()+":"+$(obj).parent().find("input[name^=optpriceId]").val();
			}else{
				priceJson.OptFitPriceJson += ","+$(obj).parent().find("input[name^=optId]").val()+":"+$(obj).val()+":"+$(obj).parent().find("input[name^=optpriceId]").val();
			}
		}
	})
	
	$.getJSON($("#initPath").val()+"/GoodsPriceController.do?method=savePrice",priceJson,function(json){
		if(json.success){
			alert("操作成功！");
			$('.epsDialogClose').trigger('click');
			goodsPriceForm.oTable.fnDraw();
		}else{
			alert("操作失败！");
		}
	})
}

//关闭
goodsPriceCreate.close = function(){
	$('.epsDialogClose').trigger('click');
}

$(document).ready(function(){
	$('#priceForm').validate();
	
	//取得供应商可以录入行情的区间
	$.getJSON($("#initPath").val()+"/AgreementController.do?method=getDistrictByOrg",{"goodsId":$("#GoodsDetailForm").find("input[name=objId]").val()},function(json){
		if(json.success){
			var currentoption = $("select[name=district.objId]").find("option");
			$.each(json.districtList,function(index,obj){
				var flag = false;
				$.each(currentoption,function(i,o){
					if($(o).val()==obj[0]){
						flag = true;
					}
				})
				if(!flag){
					$("select[name=district.objId]").append('<option value="'+obj[0]+'">'+obj[1]+'</option>');
				}
			})
		}
	})
	
	//开始时间
    $("#efctDate").epsDatepicker({applyRule: endRule });  //增加结束时间的规则
    //结束时间
    $("#endDate").epsDatepicker({applyRule: startRule });  //增加开始时间的规则
})