const { DETAIL } = require("../../const/url");
const { getHTMLPage } = require("../../utils");

const getDetail = async (id) => {
  const url = DETAIL + "/" + id;
  const $ = await getHTMLPage(url);
  const movurls = $(".movurl ul li a");
  const data = [];
  movurls.each((index, element) => {
    const url = $(element).attr("href");
    const title = $(element).attr("title");
    data.push({
      url,
      title,
    });
  });
  return data;
};

module.exports = {
  getDetail,
};
