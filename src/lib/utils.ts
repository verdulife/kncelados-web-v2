import "core-js/actual/object/group-by";
import type { Metadata, Episode } from "./types";
import slugify from "slugify";

const timezone = 2;
const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
export const currentHours = currentDate.getHours() + timezone;
const TIME_TO_SHOW = 20;

const episodes_obj: Record<string, Episode> = import.meta.glob('./episodes/*.json', { import: 'default', eager: true });
const sortedEpisodes = Object.values(episodes_obj).sort((a, b) => b.episode - a.episode);

export const episodes = sortedEpisodes.map((episode) => {
  const [_, name] = episode.title.split(' | ');
  const episodeData = { ...episode, name };

  if (!episode.createdAt) return episodeData;

  const episodeDate = new Date(episode.createdAt);
  const episodeDay = episodeDate.getDate();
  const episodeMonth = episodeDate.getMonth();
  const episodeYear = episodeDate.getFullYear();
  const sameDate = currentDay === episodeDay && currentMonth === episodeMonth && currentYear === episodeYear;

  if (sameDate && currentHours < TIME_TO_SHOW) {
    return { ...episodeData, hidden: true };
  } else {
    return episodeData;
  }
});

const seasons_object = Object.groupBy(episodes, ({ season }) => season);
export const seasons = Object.values(seasons_object).reverse();

const lastSeason = seasons[0]!;
export const lastEpisode = lastSeason[0].hidden ? lastSeason[1] : lastSeason[0];
export const hiddenEpisode = lastSeason[0].hidden ? lastSeason[0] : lastSeason[1];

const extras_obj: Record<string, Metadata> = import.meta.glob('./extras/*.json', { import: 'default', eager: true });
export const extras = Object.values(extras_obj).reverse();

const shorts_obj: Record<string, Metadata> = import.meta.glob('./shorts/*.json', { import: 'default', eager: true });
export const shorts = Object.values(shorts_obj).reverse();

const allVideos = [...episodes, ...shorts, ...extras];
const titles = allVideos.map(({ title }) => generateSlug(title));

export function generateSlug(title: string) {
  return slugify(title, { strict: true, lower: true });
}

export function getCurrentEpisode(slug: string) {
  const ind = titles.findIndex((title) => title === slug);
  return allVideos[ind];
}

export function getCurrentEpisodeById(id: string) {
  return allVideos.find((episode) => episode.id === id);
}