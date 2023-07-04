const axios = require("axios");

(async () => {
  const { data } = await axios({
    data: {
      apiKey: "9be5723a12425b44da2ad1e88b6d3ea3",
      url: "https://vip.lz-cdn14.com/20230704/26084_a832d48a/index.m3u8?t=56282396",
    },
    headers: { "Content-Type": "application/json" },
    method: "POST",
    url: "https://async.scraperapi.com/jobs",
  });

  console.log(data);
})();
