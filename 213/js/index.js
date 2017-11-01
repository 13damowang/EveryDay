var $$ = require('Utils2')


App.lazy.controller('purchaseModifyController', ['$scope', 'FileUploader', '$location', '$_post', 'ngDialog', '$_alert', '$_notify', '$route', '$interval', function ($scope, FileUploader, $location, $_post, ngDialog, $_alert, $_notify, $route, $interval) {
  $$.setDocTitle('增值包采购修改');

  var Req = $scope.Req = {}
  var Options = $scope.Options = {}
  var Data = $scope.Data = {}
  var Fn = $scope.Fn = {}

  Options.distributorName = [];
  Options.flag = false;
  Options.buyNumberPrompt = '';
  Options.productName = '';
  Options.totalAmount = 0;
  Options.priceList = 0;
  Options.totalPurchaseQuantity = 0;
  Options.purchaseList = 0;
  Options.totalGivenQuantity = 0;
  Options.givenList = 0;
  Options.imgAddress = '';
  Options.isShowSaveButton = true;

  Options.distributorList = '';
  Options.distributorCode = '';

  Options.buyNumber = null;
  Options.familyName = null;

  Req.applyList = [];
  Options.carList = '';

  Options.onlineBanking = [];

  Options.uploadImg = true;

  Req.onlineBanking = '';

  Options.dealerList = [];

  Options.dealerCodeAll = [];

  Options.dealerNameAll = [];




  /*获取经销商代码*/
  Fn.getDealerCodes = function () {
    var applyNo = ''
    if ($location.search().applyNo == undefined) {
      applyNo = "2017071209374605153";  //url地址栏获取
    } else {
      applyNo = $location.search().applyNo;  //url地址栏获取
    }

    $_post('/dim-api/purchase/list-dealer', {}, function (data) {
      Req.dealerCode = ''
      Options.dealerCodeList ={}
      angular.forEach(data, function (item) {
        Options.dealerCodeList[item.key]=item.value;
        Options.dealerList.push({
          val: item.value,
          key: item.key,
          brandCode: item.brandCode,
          brandName: item.brandName
        })
      })

      $_post('/dim-api/purchase/detail/' + applyNo, {}, function (data) {
        var locl = location.protocol;
        if (data.entryAttachments.length != 0) {
          Options.entryAttachments = data.entryAttachments[0];
          Options.imgAddress = Options.entryAttachments;
          var index = Options.entryAttachments.lastIndexOf("\/");
          Options.entryAttachments = Options.entryAttachments.substring(index + 1, Options.entryAttachments.length);
          Options.entryAttachments = /*locl+'//'+location.host+*/"/dim-api/getZoomImage?fileName=" + Options.entryAttachments;
          Options.entryAttachmentsTrue = true;
        } else {
          Options.entryAttachmentsTrue = false;
        }
        Options.prApplySummary = data.prApplySummary;
        Options.applyId = data.prApplySummary.applyId;
        Options.distributorName = data.prApplySummary.dealerName;
        Options.distributorCode = data.prApplySummary.dealerCode;
        Req.onlineBanking = data.prApplySummary.bankCode;

        if (data.prApplyDetails != []) {
          var prApplyDetails = data.prApplyDetails
          angular.forEach(prApplyDetails, function (data, index, array) {
            Req.applyList.push({
              dealerName: data.dealerName,
              dealerCode: data.dealerCode,
              productName: data.productName,
              familyName: data.familyName,
              purchaseQuantity: data.purchaseQuantity,
              basePrice: data.basePrice,
              givenQuantity: data.givenQuantity,
              productCode: data.productCode,
              amount: data.amount,
              detailId: data.detailId
            })
            Options.dealerCodeAll.push(data.dealerCode);
            Options.dealerNameAll.push(Options.dealerCodeList[data.dealerCode]);
          });
          if (data.entryAttachments != []) {
            Options.imgSrc = data.entryAttachments[0]
          }
          Fn.totalAmount(Req.applyList);
        }
      })

      if(data.length > 1){
        Options.dealerList.unshift({
          val: '请选择',
          key: ''
        })
      } else {
        Req.dealerCode = Options.dealerList[0].key
	      Req.brandCode = Options.dealerList[0].brandCode
	      Req.brandName = Options.dealerList[0].brandName
	      Fn.getProList(Req.brandCode)
      }
    })
  };
  Fn.getDealerCodes();

   Fn.dealerSelected = function () {
	  	angular.forEach(Options.dealerList, function (val) {
		    if(val.key == Req.dealerCode){
		    	 Req.brandCode = val.brandCode;
		    	 Req.brandName = val.brandName;
		    	 Fn.getProList(Req.brandCode);
		    }
		  })
    }

    $_post('/dim-api/common/e-bank', {}, function (data) {
      angular.forEach(data, function (val) {
        Options.onlineBanking.push({
          key: val.key,
          val: val.value
        })
      })
      Options.onlineBanking.unshift({
        key: '',
        val: '请选择'
      })
    })


  Fn.totalGivenQuantity = function (reg) {
    Options.totalGivenQuantity = 0;
    angular.forEach(reg, function (data, index, array) {
      Options.givenList = parseInt(data.purchaseQuantity);
      Options.totalGivenQuantity += Options.givenList;
    });
  }

  Fn.totalPurchaseQuantity = function (reg) {
    Options.totalPurchaseQuantity = 0;
    angular.forEach(reg, function (data, index, array) {
      Options.purchaseList = parseInt(data.givenQuantity);
      Options.totalPurchaseQuantity += Options.purchaseList;
    });
  }

  Fn.totalAmount = function (reg) {
    Options.totalAmount = 0;
    angular.forEach(reg, function (data, index, array) {
      Options.priceList = parseInt(data.amount);
      Options.totalAmount += Options.priceList;
    });
  }

  Fn.cliclDelete = function (index, id) {
    $_alert({
      title: '警告',
      type: 'warning',
      content: '确定删除该条记录？',
      text: '确认',
      cancelText: '取消',
      callback: 'Fn.requestText()',
      scope: $scope
    }, true);
    Fn.requestText = function () {
      Options.deleteIndex = index;
      Options.deleteId = id;
      if (Options.deleteId) {
     $_post('/dim-api/purchase/delete/' + Options.deleteId, {}, function (data) {
       Req.applyList.splice(Options.deleteIndex, 1);
       Options.dealerCodeAll.splice(Options.deleteIndex, 1)
       Options.dealerNameAll.splice(Options.deleteIndex, 1)
       Fn.totalAmount(Req.applyList);
       Fn.totalPurchaseQuantity(Req.applyList);
       Fn.totalGivenQuantity(Req.applyList);

       Fn.deletePreservation();
     })
     } else {
       Req.applyList.splice(Options.deleteIndex, 1);
       Options.dealerCodeAll.splice(Options.deleteIndex, 1)
       Options.dealerNameAll.splice(Options.deleteIndex, 1)
       Fn.totalAmount(Req.applyList);
       Fn.totalPurchaseQuantity(Req.applyList);
       Fn.totalGivenQuantity(Req.applyList);
     }
    }
  }

  // 采集产品列表
  Fn.getProList = function (brandCode){
  	$_post('/dim-api/purchase/get-pro-list/'+brandCode, {}, function (data) {
	    Options.productList = data;
	  })
  }


  Fn.getPrompt = function () {
    if (Req.dealerCode == null || Req.dealerCode == '请选择' || Req.dealerCode == '') {
      $_notify('请选择经销商', 3000);
      return false;
    }
    if (Options.productName == null || Options.productName == '请选择' || Options.productName == '') {
      $_notify('请选择采集产品', 3000);
      return false;
    }
    if (Options.buyNumber == null || Options.buyNumber == 0) {
      $_notify('请输入采购数量,数量不能为等于0或小于0', 3000);
      return false;
    }
  };

  //添加
  Fn.cliclIndex = function () {
    if (Fn.getPrompt() == false) {
      return false;
    }
    Req.applyList.push({
      dealerName: Options.dealerCodeList[Req.dealerCode],
      brandName: Req.brandName,
      dealerCode: Req.dealerCode,
      productName: Options.productName,
      familyName: Options.carList,
      purchaseQuantity: Math.floor(Options.buyNumber),
      basePrice: Options.carPrice,
      givenQuantity: Options.giveNumber,
      productCode: Options.productCode,
      amount: Options.price
    })

    Options.dealerCodeAll.push(Req.dealerCode);
    Options.dealerNameAll.push(Options.dealerCodeList[Req.dealerCode]);

    Fn.totalAmount(Req.applyList);
    Fn.totalPurchaseQuantity(Req.applyList);
    Fn.totalGivenQuantity(Req.applyList);
    Options.buyNumber = '';
    Options.price = '';
    Options.giveNumber = '';
    Options.productName = '';
    Options.carList = '';
    Req.dealerCode = '';
  }

  Fn.productSelected = function () {
    if (Options.productName == null || Options.productName == '请选择' || Options.productName == '') {
      Options.buyNumber = '';
      Options.price = '';
      Options.giveNumber = '';
      Options.familyName = '';
    }
    var productName = Options.productName;
    var code;
    Options.productList.map(function (item) {
      if (item.name == productName) {
        code = item.code;
        Options.productCode = item.code;
      }
    });
    $_post('/dim-api/purchase/get-family-list/' + code, {}, function (data) {
      /*data.unshift({
       property2:'请选择',
       property1:''
       })*/
      Options.carList = data.proValue;
      Options.carPrice = data.floorPrice;
      Options.ifGiven = data.ifGiven;
      if(Options.buyNumber){
      	  Fn.getNumber();
      }
    })
  }
  Fn.getNumber = function () {
    if (Options.productName == null || Options.productName == '请选择' || Options.productName == '') {
      Options.carPrice = '';
    }
    if (isNaN(Options.buyNumber)) {
      return false;
    }
    if(Options.buyNumber < 0){
    	  Options.buyNumber = "";
    	  $_notify('数量不能为等于0或小于0', 2000);
    	  return false;
    }
    if(parseInt(Options.buyNumber) != Options.buyNumber){
    	  Options.buyNumber = "";
    	  Options.price = "";
    	  $_notify('请输入整数！', 2000);
    	  return false;
    }
    Options.price = Math.floor(Options.buyNumber) * Options.carPrice;
    if(Options.ifGiven == "Y"){
    	$$.loading();
    	$_post('/dim-api/purchase/get-given-number', {
        purchaseQuantity: Math.floor(Options.buyNumber),
        familyName: Options.familyName
      }, function (data) {
        Options.giveNumber = data;
        $$.loading(true);
      })
    }
  }


  Options.data = {
    files: null
  };

  //上传文件部分开始
  /*  $scope.fileCheck = function(item) {
      if(!item.file.name.match(/\.(jpeg|jpg|gif|png|pdf)$/i)) {
        $_notify('格式不正确,支持：jpeg、jpg、gif、png、pdf', true);
      }
      else if(item.file.size > 2048000) {
        $_notify('文件大小不能超过 2 MB', true);
      }else {
        $scope.trcFile.uploadItem(item);
      }
    }

    $scope.uploadDone = function(response) {
      if(response && response.status === '100') {
        Options.uploadImg = false;
        $_notify('上传成功');
        Options.fileImg = response;
      }
      if(response && response.status !== '100') {
          $_notify(response.errorMessges[0].message, true);
      }
    }
        $scope.trcFile = new FileUploader({
          url: '/dim-api/imgupload',
          alias: 'files',
          formData: [{
            filepath: 'purchase'
          }]
        });
        $scope.trcFile.onAfterAddingFile = function(item) {
          window.clearTimeout($scope.lastItem);
          $scope.lastItem = setTimeout(function() {
            $scope.fileCheck(item)
          }, 20)
        }
        $scope.trcFile.onCompleteItem = function(fileItem, response, status, headers) {
          $scope.uploadDone(response);
        };*/
  //上传部分代码结束

  /*    Fn.dealerFilter = function(type) {
        var obj = [];
        if(type == 1){
          angular.forEach(Options.distributorName,function(data,index){
            obj.push(data.key)
          });
          console.log(obj)
          var obj = obj.join(",");
          console.log(obj)
            return obj;
        }
        if(type == 2){
          angular.forEach(Options.distributorName,function(data,index){
            obj.push(data.value)
          });
          var obj = obj.join(",");
            return obj;
        }
      }*/

  Fn.dealerSeparate = function (arr) {
    var a = arr.join(",");
    return a;
  }

  Fn.newElement = function (turnForm, element, elementValue) {
    var newElement = document.createElement("input");
    newElement.setAttribute("name", element);
    newElement.setAttribute("type", "hidden");
    newElement.setAttribute("value", elementValue);
    turnForm.appendChild(newElement);
  }

  Fn.formSend = function (url, json) {
    var turnForm = document.createElement("form");
    document.body.appendChild(turnForm);
    turnForm.method = 'post';
    turnForm.action = url;
    turnForm.target = '_blank';
    Fn.newElement(turnForm, "orderData", json.orderData);
    Fn.newElement(turnForm, "signedMsg", json.signedMsg);
    turnForm.submit();
  }

  Fn.requestMessage = function () {
    $_post('/dim-api/purchase/online-pay/' + Options.applyNo, {}, function (data) {
      var jsonData = {}
      jsonData.orderData = data.orderData;
      jsonData.signedMsg = data.signedMsg;
      if (data.errorMessage) {
        $_alert({
          title: '警告',
          type: 'warning',
          content: data.errorMessage
        }, false);
      } else {
        window.location.href = "/policy/#!/purchase-query";
        Fn.formSend(data.actionUrl, jsonData);
      }
    });
  }

  //删除时调用的保存方法
  Fn.deletePreservation = function () {
    if (Req.applyList == []) {
      return false;
    }

    if (Req.onlineBanking === '') {
      Options.isOnlineBank = true;
      $interval(function () {
        Options.isOnlineBank = false;
      }, 3000)
      return false;
    }
    var data = {};
    data = Options.prApplySummary;
    data.dealerCode = Fn.dealerSeparate(Options.dealerCodeAll);
    data.dealerName = Fn.dealerSeparate(Options.dealerNameAll);
    data.channelCode = Req.onlineBanking;
    data.amount = Options.totalAmount;
    data.givenQuantity = Options.totalGivenQuantity;
    data.purchaseQuantity = Options.totalPurchaseQuantity;

    if (Req.applyList.length == 0) {
      $_notify("集中采购详情不允许为空！", true);
      return false;
    }
    data.detailMOList = Req.applyList;
    $_post('/dim-api/purchase/submit', data, function (data) {
      Options.applyNo = data.applyNo;
      if (data.successFlg == true) {

      } else {
        $_notify(data.errorMessge, true);
      }
    })
  }

  //正常保存的方法
  Fn.preservation = function () {
    if (Req.applyList == []) {
      return false;
    }

    if (Req.onlineBanking === '') {
      Options.isOnlineBank = true;
      $interval(function () {
        Options.isOnlineBank = false;
      }, 3000)
      return false;
    }
    var data = {};
    data = Options.prApplySummary;
    data.dealerCode = Fn.dealerSeparate(Options.dealerCodeAll);
    data.dealerName = Fn.dealerSeparate(Options.dealerNameAll);
    data.channelCode = Req.onlineBanking;
    data.amount = Options.totalAmount;
    data.givenQuantity = Options.totalGivenQuantity;
    data.purchaseQuantity = Options.totalPurchaseQuantity;



    if (Req.applyList.length == 0) {
      $_notify("集中采购详情不允许为空！", true);
      return false;
    }

    data.detailMOList = Req.applyList;

    $_post('/dim-api/purchase/submit', data, function (data) {
      Options.applyNo = data.applyNo;
      if (data.successFlg == true) {
        $_alert({
          title: '警告',
          type: 'warning',
          content: '保存成功是否进行支付？',
          text: '确认',
          cancelText: '取消',
          callback: 'Fn.requestMessage()',
          cancelCallback: 'Fn.pageReload()',
          scope: $scope
        }, true);
      } else {
        $_notify(data.errorMessge, true);
      }
    })
  }


  Fn.pageReload = function () {
    window.location.href = "/policy/#!/purchase-query";
  }

}]);
