const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const { getDynamicHTMLPage } = require("../../utils");
async function getRenderedDOM(url) {
  const html = await getDynamicHTMLPage(
    url,
    { headless: "new" },
    {
      waitUntil: "networkidle2",
    }
  );

  const $ = cheerio.load(html);
  const iframeUrl = $("#age_playfram").attr("src");
  const res = await getDynamicHTMLPage(
    iframeUrl,
    { headless: "new" },
    {
      waitUntil: "networkidle2",
    }
  );
  const iframePage = cheerio.load(res);
  const src = iframePage("video").attr("src");
  return src;
}

module.exports = {
  getRenderedDOM,
};
