const puppeteer = require('puppeteer');
// const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch(
    {
      headless: false,
      args: [
        '–no-sandbox',
        '--window-size=1920,1080'
      ],
  
    });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height: 800,
    deviceScaleFactor: 1,
  });


  //新版游戏商城
  async function gameMall () {
    let url = 'https://login.sdo.com/sdo/Login/LoginFrameFC.php?pm=2&appId=6666&areaId=-1&returnURL=https%3A%2F%2Fqu.sdo.com%2Fgame%2F5'
    await page.goto(url)
    await page.click('#nav_btn_code2d')
    await page.waitForTimeout(8000)
    await page.goto('https://qu.sdo.com/product-detail/50a9a718852f42e741cb')
    await page.click('.detail-btn-buy')
  }

  //页面商城
  async function pageMal () {
    let url = 'https://login.sdo.com/sdo/Login/LoginFrameFC.php?pm=2&appId=991000350&areaId=1&customSecurityLevel=2&target=iframe%810%853_param=from%3D991000350&returnURL=https%3A%2F%2Fchdstore.web.sdo.com%2FUser%2FLogin'
    await page.goto(url)
    await page.click('#nav_btn_code2d') //选择二维码
    await page.waitForTimeout(8000)
    await page.click('#area_click') //选择区服
    await page.waitForTimeout(2000)
    await page.evaluate(async () => {
      return document.querySelector('img[src="https://static.web.sdo.com/avata/pic/shop/image/CHD/confir.jpg"]').click()
    })
    await page.waitForTimeout(1000)
    await page.goto('https://chdstore.web.sdo.com/Shop/Cart/')  //跳转至结账页面
    await page.evaluate(() => { //内部支持js代码
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

      /**
       * shopId: 商品id
       * num: 商品数量
       */
      let arr = [
        {
          shopId: 5238,
          num: 2
        }, {
          shopId: 5240,
          num: 4
        }
      ]
      function shoppingCart (arr) {
        arr.forEach(item => {
          new Array(item.num).fill(item.shopId).forEach(attr => {
            ajax(attr)
          })
        })
      }
      shoppingCart(arr)
    })
    // page.on('dialog', async dialog => { //检测alert
    //   await page.waitForTimeout(2000)
    //   await dialog.accept() //alert确认流程
    // });
  }

  //团购页面
  async function bulkMall () {
    let url = 'https://login.sdo.com/sdo/Login/LoginFrameFC.php?pm=2&appId=991000350&areaId=1&customSecurityLevel=2&target=iframe%810%853_param=from%3D991000350&returnURL=https%3A%2F%2Fchdtuan%2Eweb%2Esdo%2Ecom%2Flogin%2Easp%3Ffrom%3D39'
    await page.goto(url)
    await page.click('#isAgreementAccept')  //同意服务协议
    await page.click('#nav_btn_code2d') //选择二维码
    await page.waitForTimeout(8000)
    await page.click('.btn-primary') //选择区服
    await page.waitForTimeout(2000)
    let bulkID = '1906' //选择团购商品
    page.on('dialog', async dialog => { //检测alert
      await page.waitForTimeout(2000)
      await dialog.accept() //alert确认流程
    });
    async function groupPurchase () {
      await page.goto(`https://chdtuan.web.sdo.com/buy.asp?from=39&Id=${bulkID}`) //跳转到团购购买页面
      await page.$eval('#Num', el => el.value = 1);
      await page.click('.buy_btn a')
    }
    for (let m = 0; m <= 6; m++) {
      groupPurchase()
    }
  }
  
 
  // gameMall()
  // pageMal()
  bulkMall()


})();