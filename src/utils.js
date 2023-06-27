const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const axios = require("axios");

/**
 *这个是用来请求静态页面的
 * @param {string} url 请求页面的地址
 * @returns {Promise} 解析过后的页面
 */
const getHTMLPage = async (url) => {
  const res = await axios.get(url);

  const html = cheerio.load(res.data);

  return html;
};

/**
 * 这个函数是用来请求动态生成的页面，至于参数，我自己也还没搞明白，就不写备注了
 */
const getDynamicHTMLPage = async (url, headerOptions, pageOptions) => {
  const browser = await puppeteer.launch({ ...headerOptions, headless: "new" });

  const page = await browser.newPage();

  await page.goto(url, { ...pageOptions, waitUntil: "networkidle2" });

  const html = await page.content();

  await browser.close();

  return html;
};

/**
 * 解析页面
 * @param {string} html 需要解析的页面
 * @param {string} tag 需要解析的标签 class类型需要加上.,同理id选择器要加上#
 * @param {object[]|string}attribute 包含解析结果的对象数组，或者一个字符串
 * @returns 根据attribute解析后的结果，如果穿的是数组则返回数组，如果是单个属性，就返回单个值
 */
const parseHTMLAttribute = (html, tag, attribute) => {
  const data = [];
  const $ = cheerio.load(html);

  if (Array.isArray(attribute)) {
    $(tag).each((index, element) => {
      const res = attribute.reduce((pre, idx) => {
        return { ...pre, [idx]: $(element).attr(idx) };
      }, {});

      data.push(res);
    });

    return data;
  } else {
    $(tag).each((index, element) => {
      const attr = $(element).attr(attribute);

      data.push(attr);
    });
  }

  return data;
};

module.exports = {
  getHTMLPage,
  getDynamicHTMLPage,
  parseHTMLAttribute,
};
