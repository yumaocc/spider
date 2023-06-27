const { HOME } = require("../../const/url");
const { getDynamicHTMLPage, parseHTMLAttribute } = require("../../utils");
const getHomePageData = async () => {
  try {
    const res = await getDynamicHTMLPage(HOME);
    const data = parseHTMLAttribute(res, ".anime_icon1_img", [
      "src",
      "alt",
      "title",
    ]);

    const listUrl = parseHTMLAttribute(res, ".anime_icon1_name_a", "href");
    return data?.map((item, index) => ({ ...item, url: listUrl[index] }));
  } catch (error) {
    console.log("获取主页数据失败", error);
  }
};

module.exports = {
  getHomePageData,
};
