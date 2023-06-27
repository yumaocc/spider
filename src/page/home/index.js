const axios = require("axios");
const cheerio = require("cheerio");
const { HOME } = require("../../const/url");
const { getHTMLPage } = require("../../utils");

const getHomePageData = async () => {
  try {
    const $ = await getHTMLPage(HOME);
    const images = $(".anime_icon1_img");
    const titles = $(".anime_icon1_name_a");
    const imageUrls = [];
    //对页面进行解析
    images.each((index, element) => {
      const imageUrl = $(element).attr("src");
      const name = $(element).attr("alt");
      const title = $(element).attr("title");
      imageUrls.push({
        imageUrl,
        name,
        title,
      });
    });

    titles.each((index, element) => {
      const url = $(element).attr("href");
      imageUrls[index] = {
        ...imageUrls[index],
        videoId: url.split("/").pop(),
      };
    });
    return imageUrls;
  } catch (error) {
    console.log("获取主页数据失败", error);
  }
};

module.exports = {
  getHomePageData,
};
