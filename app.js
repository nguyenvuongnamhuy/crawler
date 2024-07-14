const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs");

const HOST = "https://123job.vn/tuyen-dung";

request(HOST, (error, response, html) => {
  if (error && response.statusCode !== 200) {
    throw new Error(error);
  }

  console.log(`> Crawling data from ${HOST}`);

  const data = [];
  const $ = cheerio.load(html);

  $(".job__list-item").each((_index, el) => {
    const job = $(el).find(".job__list-item-title a").text();
    const company = $(el).find(".job__list-item-company span").text();
    const address = $(el).find(".job__list-item-info").find(".address").text();
    const salary = $(el).find(".job__list-item-info").find(".salary").text();

    data.push({
      job,
      company,
      address,
      salary,
    });
  });

  fs.writeFileSync("data.json", JSON.stringify(data));

  console.log("> Finish");
});
