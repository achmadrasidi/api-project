import axios from "axios";
import * as cheerio from "cheerio";

export const getAll = async () => {
  const result = [];
  const all = await axios.get("http://195.2.81.233/");
  const html = all.data;
  const $ = cheerio.load(html);

  $("article h3 a", html).each(function () {
    const title = $(this).text();
    const stream = $(this).attr("href");
    const source = "Nonton 01";
    const status = "Open";
    result.push({ title, stream, source, status });
  });
  return result;
};

export const getTvShow = async () => {
  const result = [];
  const tvShow = await axios.get("http://195.2.81.233/tvshows");
  if (!tvShow) {
    return undefined;
  }

  const html = tvShow.data;
  if (!tvShow) {
    return undefined;
  }

  const $ = cheerio.load(html);

  $("article h3 a", html).each(function () {
    const title = $(this).text();
    const stream = $(this).attr("href");
    const source = "Nonton 01";
    const status = "open";
    result.push({ title, stream, source, status });
  });
  return result;
};
export const getMovie = async () => {
  const result = [];

  const movie = await axios.get("http://195.2.81.233/movies");

  if (!movie) {
    return undefined;
  }
  const html = movie.data;
  const $ = cheerio.load(html);

  $("article h3 a", html).each(function () {
    const title = $(this).text();
    const stream = $(this).attr("href");
    const source = "Nonton 01";
    const status = "Open";
    result.push({ title, stream, source, status });
  });

  return result;
};
