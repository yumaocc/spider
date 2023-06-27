const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const axios = require("axios");
/**
 *这个是用来解析静态页面的
 * @param {string} url 请求页面的地址
 * @returns {Promise} 解析过后的页面
 */
const getHTMLPage = async (url) => {
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);
  return $;
};
/**
 * 这个函数是用来解析动态生成的页面，至于参数，我自己也还没搞明白，就不写备注了
 */
const getDynamicHTMLPage = async (url, headerOptions, pageOptions) => {
  const browser = await puppeteer.launch(headerOptions);

  const page = await browser.newPage();
  await page.goto(url, pageOptions);

  const html = await page.content();
  await browser.close();
  return html;
};

module.exports = {
  getHTMLPage,
  getDynamicHTMLPage,
};
