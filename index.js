const express = require("express");

const { getHomePageData } = require("./src/page/home");
const { getDetail } = require("./src/page/detail");
const { getPlayPageData } = require("./src/page/play");
const app = express();

getPlayPageData();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8001");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

//测试
//测试

app.get("/", async (req, res) => {
  const r = await getHomePageData();
  res.send(r);
});

app.get("/detail", async (req, res) => {
  const { id } = req.query;

  const r = await getDetail(id);

  res.send(r);
});

app.get("/play", async (req, res) => {
  const r = await getPlayPageData(
    "https://www.agedm.tv/play/20170031?playid=2_1"
  );

  res.send(r);
});

// getPlayPageData("https://www.agedm.tv/play/20100004?playid=2_1");

app.listen(4000, () => {
  console.log("服务器启动成功");
});
