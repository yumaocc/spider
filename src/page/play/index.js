const cheerio = require("cheerio");
const { getDynamicHTMLPage, parseHTMLAttribute } = require("../../utils");

async function getPlayPageData(url) {
  const html = await getDynamicHTMLPage(url);

  const iframeUrl = parseHTMLAttribute(html, "#age_playfram", "src");
  console.log("iframeUrl", iframeUrl);
  const res = await getDynamicHTMLPage(iframeUrl);
  console.log("res   =====", res);
  const src = parseHTMLAttribute(res, "video", "src");
  console.log("src", src);
  return src;
}

module.exports = {
  getPlayPageData,
};
