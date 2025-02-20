import { MovieResponse } from "../types";
import { shuffle } from "../utils/shuffle";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export async function fetchMoviesWithType(
  page: number = 1,
  type: string
): Promise<MovieResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${type}?api_key=${API_KEY}&page=${page}`,
      { method: "GET" }
    );
    if (!response.ok) {
      throw new Error("An error occur while fetching movies");
    }
    const json = (await response.json()) as MovieResponse;
    json.results = shuffle(json.results);
    return json;
  } catch (error) {
    throw new Error("An error occur, Try again");
  }
}

export async function fetchTVWithType(
  page: number = 1,
  type: string
): Promise<MovieResponse> {
  console.log(`tv/${type}`);

  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${type}?api_key=${process.env.EXPO_PUBLIC_API_KEY}&page=${page}`,
    { method: "GET" }
  );
  if (!response.ok) {
    throw new Error("An error occur while fetching movies");
  }
  const json = (await response.json()) as MovieResponse;
  json.results = shuffle(json.results);
  return json;
}
