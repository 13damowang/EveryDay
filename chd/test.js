const puppeteer = require('puppeteer');

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

  //游戏商城
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
    await page.waitForTimeout(5000)
    await console.log(addcart())
  }
  
 
  // gameMall()
  pageMal()
 
})();