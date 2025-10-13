import { episodes } from "./episodes.js";
import { remakeDescription } from "./remake.js";
import { writeFile } from "node:fs/promises";
import ogs from "open-graph-scraper";

const BASE_URL = "https://www.youtube.com/watch?v=";

const { episode, season, id, part } = episodes[0];
const options = { url: BASE_URL + id };

try {
  console.log(`Making ${season}x${episode}${part ? "_" + part : ""}`);

  const res = await ogs(options);
  const { ogTitle, ogDescription, ogImage, requestUrl } = res.result;
  const description = await remakeDescription(ogDescription);
  const createdAt = new Date();

  const data = {
    createdAt,
    episode,
    season,
    id,
    title: ogTitle,
    description,
    image: ogImage[0].url,
    url: requestUrl
  };

  const json = JSON.stringify(data, null, 2);
  await writeFile(`./src/lib/episodes/${season}x${episode}${part ? "_" + part : ""}.json`, json, "utf-8");

  console.log(`Wrote ${season}x${episode}${part ? "_" + part : ""}.json`);
} catch (error) {
  console.error(error);
}
