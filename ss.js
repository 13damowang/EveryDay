<!-- build:css css/messageModeration/index.css -->
<link rel="stylesheet" id="CACHE_CSS" href="/css/messageModeration/index.scss" />
<!-- endbuild -->

<div class="content-wrapper">
	<section class="content-header">
		<h1>
			{{Options.manufactoryText}}信息更新审核
		</h1>
	</section>
	<section class="content">
		 <div class="box box-success">
			<div class="box-header with-border">
				<h3 class="box-title"><i class="glyphicon glyphicon-align-right" style="margin-right: 5px;color: #4f8cb8;"></i>基础信息
				</h3>
			</div>
			<div class="box-body">
				<div class="row">
					<div class="col-md-6">
						<div class="col-md-12"><label>省份</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.province}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="col-md-12"><label>经销商名称</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.dealerName}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="col-md-12"><label>产品名称</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.packageName}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="col-md-12"><label>更新状态</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.applyStatus  | config:'auditStatus'}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="col-md-12"><label>订单号</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.orderNo}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="col-md-12"><label>合同号</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.contractNo}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="col-md-12"><label>销售日期</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.saleTime}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="col-md-12"><label>服务日期</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.startDate}}-{{Data.detail.endDate}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="col-md-12"><label>申请日期</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.applyDate}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="col-md-12"><label>审核日期</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.auditDate}}</span>
							</div>
						</div>
					</div>
				</div>
				</div>
			</div>
	</section>
	<section class="content">
		 <div class="box box-success">
			<div class="box-header with-border">
				<h3 class="box-title"><i class="glyphicon glyphicon-align-right" style="margin-right: 5px;color: #4f8cb8;"></i>基础信息
				</h3>
			</div>
			<div class="box-body">
				<div class="row">
					<div class="col-md-6">
						<div class="col-md-12"><label>(原)车架号/VIN码</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.oldInfo.vin}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="col-md-12"><label>(新)车架号/VIN码</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.newInfo.vin}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="col-md-12"><label>(原)发动机号</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.oldInfo.engineNo}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="col-md-12"><label>(新)发动机号</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.newInfo.engineNo}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="col-md-12"><label>(原)客户姓名</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.oldInfo.insuredName}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="col-md-12"><label>(新)客户姓名</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.newInfo.insuredName}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6" ng-if="Data.manufactory !== 'SVW'">
						<div class="col-md-12"><label>(原)客户电话</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.oldInfo.mobileNo}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6" ng-if="Data.manufactory !== 'SVW'">
						<div class="col-md-12"><label>(新)客户电话</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.newInfo.mobileNo}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6" ng-if="Data.manufactory !== 'SVW'">
						<div class="col-md-12"><label>(原)联系人姓名</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.oldInfo.contactName}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6" ng-if="Data.manufactory !== 'SVW'">
						<div class="col-md-12"><label>(新)联系人姓名</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.newInfo.contactName}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6" ng-if="Data.manufactory !== 'SVW'">
						<div class="col-md-12"><label>(原)联系人电话</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.oldInfo.contactMobile}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6" ng-if="Data.manufactory !== 'SVW'">
						<div class="col-md-12"><label>(新)联系人电话</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.newInfo.contactMobile}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6" ng-if="Data.manufactory !== 'SVW'">
						<div class="col-md-12"><label>(原)证件类型</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.oldInfo.certificateType  | config: 'personalCompanyType'}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6" ng-if="Data.manufactory !== 'SVW'">
						<div class="col-md-12"><label>(新)证件类型</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.newInfo.certificateType | config: 'personalCompanyType'}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="col-md-12"><label>(原)证件号码</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.oldInfo.certificateNo}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="col-md-12"><label>(新)证件号码</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.newInfo.certificateNo}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6" ng-if="Data.detail.packageCode === 'SGM_RV_2019' || Data.detail.packageCode === 'SGM_RV_CD' || Data.detail.packageCode === 'AUTO_GAP' || Data.detail.packageCode === 'SAIC_WULING_GAP'">
						<div class="col-md-12"><label>(原)车辆发票价格</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.oldInfo.purchasePrice}}</span>
							</div>
						</div>
					</div>
					<div class="col-md-6" ng-if="Data.detail.packageCode === 'SGM_RV_2019' || Data.detail.packageCode === 'SGM_RV_CD' || Data.detail.packageCode === 'AUTO_GAP' || Data.detail.packageCode === 'SAIC_WULING_GAP'">
						<div class="col-md-12"><label>(新)车辆发票价格</label></div>
						<div class="col-md-12">
							<div class="form-group">
								<span class="form-control" style="background-color: #eee;">{{Data.detail.newInfo.purchasePrice}}</span>
							</div>
						</div>
          </div>
          <div class="col-md-6" ng-if="Data.detail.endorsable === 'Y'">
            <div class="col-md-12"><label>(原)服务日期</label></div>
            <div class="col-md-12">
              <div class="form-group">
                <span class="form-control" style="background-color: #eee;">{{Data.detail.startDate}} - {{Data.detail.oldInfo.endDate}}</span>
              </div>
            </div>
          </div>
          <div class="col-md-6" ng-if="Data.detail.endorsable === 'Y'">
            <div class="col-md-12"><label>(新)服务日期</label></div>
            <div class="col-md-12">
              <div class="form-group">
                <span class="form-control" style="background-color: #eee;">{{Data.detail.newInfo.endDate ? Data.detail.startDate : ''}} - {{Data.detail.newInfo.endDate}}</span>
              </div>
            </div>
          </div>
				</div>
				</div>
			</div>
			<div class="box box-success" ng-if="Data.detail.auditList && Data.detail.auditList.length > 0">
					<div class="box-header with-border">
						<h3 class="box-title"><i class="glyphicon glyphicon-align-right" style="margin-right: 5px;color: #4f8cb8;"></i>审批信息
						</h3>
					</div>
					<div class="box-body table-responsive">
						<div class="searchResultBox">
							<table class="searchResultList table table-bordered table-striped" style="margin-top: 10px">
								<thead>
									<tr>
										<th>审批人</th>
										<th>审批时间</th>
										<th>审批结果</th>
										<th>审批意见</th>
									</tr>
								</thead>
								<tbody>
									<tr class="searchList" ng-repeat="item in Data.detail.auditList">
										<td>
											{{item.createUser}}
										</td>
										<td>
											{{item.auditDate | date:'yyyy-MM-dd HH:mm:ss'}}
										</td>
										<td>
											{{item.auditResult | config: 'auditResult'}}
										</td>
										<td>
											{{item.auditComments}}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
		
					</div>
				</div>
	</section>
	<section class="content" ng-if="Data.detail.applyStatus == 'TO_AUDIT' || Data.detail.applyStatus == 'SYSTEM_REJECT'">
		<div class="">
			<div class="col-md-12" style="background-color: #FFFFFF;padding: 20px;">
				<div class="buttonIndex">
					<button type="button" class="btn btn-primary" ng-click="Fn.clickPass()" ng-if="Data.detail.applyStatus == 'TO_AUDIT'">通过</button>
					<a href="javascript:void(0)" class="btn btn-success add" style="margin-left: 20px;" ng-click="Fn.reject('reject')" ng-if="Data.detail.applyStatus == 'TO_AUDIT'">驳回</a>
					<a href="javascript:void(0)" class="btn btn-success add" style="margin-left: 20px;" ng-click="Fn.reject('approval')" ng-if="Data.detail.applyStatus == 'SYSTEM_REJECT'">通融通过</a>
				</div>
			</div>
		</div>
	</section>
</div>
<script type="text/ng-template" id="reject">
  <h6 class="box-title">警告</h6>
  <div class="_alertLeft"><span class="_warning"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span></div>
  <p class="_alertNow" ng-if="Options.rejectType === 'reject'">审批驳回，是否确认</p>
  <p class="_alertNow" ng-if="Options.rejectType === 'approval'">通融通过，是否确认</p>
  <div class="rejectText">
	<span ng-if="Options.rejectType === 'reject'">驳回原因</span>
	<span ng-if="Options.rejectType === 'approval'">通融通过原因</span>
	<textarea name="" rows="3" cols="30" ng-model='Options.auditComments'>

	</textarea>
  </div>
  <div class="ngdialog-buttons">
  	<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="Fn.close()">取消</button>&nbsp; &nbsp;<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="Fn.btnOk()">确认</button>
  </div>
</script>
