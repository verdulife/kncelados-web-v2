import { extras } from "./extras.js";
import { remakeDescription } from "./remake.js";
import { writeFile } from "node:fs/promises";
import ogs from "open-graph-scraper";

const BASE_URL = "https://www.youtube.com/watch?v=";

const { id } = extras[0];
const options = { url: BASE_URL + id };

try {
  console.log(`Making ${id}`);

  const res = await ogs(options);
  const { ogTitle, ogDescription, ogImage, requestUrl } = res.result;
  const description = await remakeDescription(ogDescription);

  const data = {
    id,
    title: ogTitle,
    description,
    image: ogImage[0].url,
    url: requestUrl
  };

  const json = JSON.stringify(data, null, 2);
  await writeFile(`./src/lib/extras/${id}.json`, json, "utf-8");
} catch (error) {
  console.error(error);
}
