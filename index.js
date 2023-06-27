const express = require("express");

const { getHomePageData } = require("./src/page/home");
const { getDetail } = require("./src/page/detail");
const { getRenderedDOM } = require("./src/page/play");
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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
  const r = await getRenderedDOM(
    "https://www.agedm.tv/play/20080021?playid=2_1"
  );
  res.send(r);
});

app.listen(4000, () => {
  console.log("服务器启动成功");
});
