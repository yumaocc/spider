const puppeteer = require("puppeteer");
const request = require("superagent");
const { getDynamicHTMLPage, parseHTMLAttribute } = require("../../utils");
const { HOME } = require("../../const/url");
const axios = require("axios");
const { userAgents } = require("../../utils");
const scraperAPIKey = "9be5723a12425b44da2ad1e88b6d3ea3";
const headers = {
  "User-Agent": "Mozilla/5.0", // 设置User-Agent请求头字段
  Referer: "http://example.com", // 设置Referer请求头字段
  // 其他请求头字段...
};
const getPlayPageData = async () => {
  try {
    const res = await getDynamicHTMLPage(
      "https://www.agedm.tv/play/20140061?playid=2_1"
    );
    const [url] = parseHTMLAttribute(res, "iframe ", "src");
    console.log("url=====", url);
    const data = await axios({
      data: {
        apiKey: scraperAPIKey,
        url: url,
      },
      headers: { "Content-Type": "application/json" },
      method: "POST",
      url: "https://async.scraperapi.com/jobs",
    });
    axios
      .get(data.data.statusUrl)
      .then((res) => {
        console.log("响应体============", res);
        const html = res.data.response.body;
        const video = parseHTMLAttribute(html, "#loading", "id");
        console.log("video =====  ", video);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log("失败==========", error);
  }
};

module.exports = {
  getPlayPageData,
};
