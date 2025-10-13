//TODO: cambiar esto por una github action diaria

/* import * as cheerio from "cheerio";

export async function getShorts() {
  const url = "https://www.youtube.com/@kncelados/shorts";
  const $ = await cheerio.fromURL(url);
  const script = $("body script:contains('ytInitialData')").html()!;
  const videoIds = script.split("videoId\":\"").slice(1).map((v: string) => v.split("\",")[0]);
  const uniqueIds = [...new Set(videoIds)];
  const maxVideos = 4;

  return uniqueIds.slice(0, maxVideos);
} */