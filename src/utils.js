const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const axios = require("axios");

const userAgents = [
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Acoo Browser; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.0.04506)",
  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6",
  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.71 Safari/537.1 LBBROWSER",
  "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0) ,Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9",
  "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
  "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)",
  "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; QQDownload 732; .NET4.0C; .NET4.0E)",
  "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:2.0b13pre) Gecko/20110307 Firefox/4.0b13pre",
  "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12",
  "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; LBBROWSER)",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6",
  "Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/527+ (KHTML, like Gecko, Safari/419.3) Arora/0.6",
  "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)",
  "Opera/9.25 (Windows NT 5.1; U; en), Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9",
  "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36",
];

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
  const browser = await puppeteer.launch({
    ...headerOptions,
    headless: "false",
  });

  const page = await browser.newPage();

  await page.goto(url, { ...pageOptions, waitUntil: "networkidle2" });

  const html = await page.content();

  // await browser.close();

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
  userAgents,
};
