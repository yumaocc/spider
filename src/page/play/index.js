const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // 设置 window.navigator.webdriver 属性为 false
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "webdriver", {
      get: () => undefined,
    });
  });

  await page.goto(
    "https://vip.sp-flv.com:8443/?url=age_703fWoBMPqV6x7LMjlQVv55zMSZtzEyR2GfZu5FyzldtW%2B3%2FbO11Ad3q7ALMRwYwYp6Q%2FXna0rNvEAVkrpbj4OdT1Czx&vlt_l=0&vlt_r=0"
  );
  const html = await page.content();
  console.log("加载页面成功", html);
  // await page.screenshot({ path: "example.png" });

  // await browser.close();
})();
//window.navigator.webdriver
