const { DETAIL } = require("../../const/url");
const { getDynamicHTMLPage, parseHTMLAttribute } = require("../../utils");
const getDetail = async (id) => {
  const url = DETAIL + "/" + id;
  const html = await getDynamicHTMLPage(url);
  const data = parseHTMLAttribute(html, ".movurl ul li a", ["href", "title"]);

  return data;
};

module.exports = {
  getDetail,
};
