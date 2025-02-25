import { Cast, CastResponse, Movie, MovieResponse } from "../types";
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

export async function fetchSimilarMoviesorTv(
  type: string,
  movieId: number
): Promise<Movie[]> {
  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${movieId}/similar?api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
    { method: "GET" }
  );
  if (response.ok) {
    const json = await response.json();
    const result = json as MovieResponse;
    return result.results;
  } else {
    console.log(`Error ${response.status}`);
    return [];
  }
}

export async function fetchDataWithPath(
  path: string,
  page = 1
): Promise<MovieResponse> {
  const response = await fetch(
    `https://api.themoviedb.org/3/${path}?api_key=${process.env.EXPO_PUBLIC_API_KEY}&page=${page}`,
    { method: "GET" }
  );
  if (!response.ok) {
    throw new Error("Unable to fetch movies");
  }
  const json = (await response.json()) as MovieResponse;
  json.results = shuffle(json.results);
  return json;
}

export async function fetchCasts(type: string, id: number): Promise<Cast[]> {
  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
    {
      method: "GET",
    }
  );
  if (response.ok) {
    const json = (await response.json()) as CastResponse;
    json.cast = shuffle(json.cast);
    return json.cast;
  } else {
    console.log(`Error ${response.status}`);
    return [];
  }
}
