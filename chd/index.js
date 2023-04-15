/*
 * @Date: 2021-08-04 09:34:40
 * @LastEditors: wang
 * @LastEditTime: 2021-08-04 10:25:58
 */


/**
 * 团购，等级补完等一次性调用接口方式的活动
 * 等级补完参数
 * url = 'https://chdact.web.sdo.com/project/10yuan_Autumn/BuyItem.asp?0.6792630640908661'
 * BuyType=1  大喇叭
 * BuyType=2  名片
 * BuyType=3  秘药
 * 
 * 团购参数
 * url = 'https://chdtuan.web.sdo.com/inc/Buy.Check.asp?from=39'
 * Num=5&Price=1500&ID=1741&&Timestamp=new Date().getTime().toString().substring(0,10)&&Sign=bb91949aa3361b096282c10b9f9b40d7
 * Num 数量，Price 单价 ID商品id（同样商品会根据日期变化）Timestamp 时间戳（精确10位到秒) Sign 登陆ID？
 */
let url = "https://chdtuan.web.sdo.com/inc/Buy.Check.asp?from=39"
let TimestampParams = new Date().getTime().toString().substring(0,10)
let params = `Num=5&Price=1500&ID=1741&&Timestamp=${TimestampParams}&&Sign=bb91949aa3361b096282c10b9f9b40d7`
function ajax (obj) {
  var xhr = ajaxFunction();
  xhr.onreadystatechange = function(){
    if(xhr.readyState==4){
        if(xhr.status==200||xhr.status==304){
            var data = xhr.responseText;
        }
    }
  }
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.send(params)
}

function ajaxFunction(){
 var xmlHttp;
 try{ // Firefox, Opera 8.0+, Safari
      xmlHttp=new XMLHttpRequest();
  }
  catch (e){
     try{// Internet Explorer
           xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
        }
      catch (e){
        try{
           xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e){}
        }
  }

  return xmlHttp;
}


for (let m = 0; m <= 20; m++) {
  ajax()
}

/**
 * 团购，等级补完等一次性调用接口方式的活动结束
 */


/**
 * 页面商城完成流程
 */
window.location.href = 'https://chdstore.web.sdo.com/Shop/Cart'

var arr = document.getElementsByName("radio1")
arr.forEach(function (item, index) {
    if (item.value == 71) {
        item.setAttribute("checked","checked")
        document.getElementById('cart').submit()
    }
})

function ajax (type) {
  var xhr = ajaxFunction();
  xhr.onreadystatechange = function(){
    if(xhr.readyState==4){
        if(xhr.status==200||xhr.status==304) {
            var data = xhr.responseText;
            location.reload()
        }
    }
  }
  xhr.open("POST","https://chdstore.web.sdo.com/Shop/Cart/add/" + type,true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.send()
}

function ajaxFunction(){
 var xmlHttp;
 try{ // Firefox, Opera 8.0+, Safari
      xmlHttp=new XMLHttpRequest();
  }
  catch (e){
     try{// Internet Explorer
           xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
        }
      catch (e){
        try{
           xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e){}
        }
  }

  return xmlHttp;
}




function checked (type) {
  var arr = document.getElementsByName("radio1")
  arr.forEach(function (item, index) {
      if (item.value == type) {
          item.setAttribute("checked","checked")
      }
  })
}

var shoppingNum = 0
var Ashop = 2
var Bshop = 2
function shopping () {
  if (shoppingNum < 1) {
      for (var m = 0; m < Ashop; m++) {
        ajax(4701)
      }
      for (var n = 0; n < Bshop; n++) {
        ajax(4188)
      }
    // checked(177)
    shoppingNum ++
  }
}

shopping()

/**
 * 页面商城完成流程结束
 */