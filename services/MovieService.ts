import { Cast, CastResponse, Movie, MovieResponse } from "../types";

import movies from "../utils/movies_data.json";
import discover from "../utils/discover_data.json";
import popular from "../utils/popular_data.json";
import cast from "../utils/cast_data.json";

class MovieService {
  static async fetchMovies(): Promise<Movie[]> {
    const parsedData = movies as MovieResponse;
    return parsedData.results;
  }

  static async fetchTodayMovies(): Promise<Movie[]> {
    const parsedData = discover as MovieResponse;
    return parsedData.results;
  }

  static async fetchPopularMovies(): Promise<Movie[]> {
    const parsedData = popular as MovieResponse;
    return parsedData.results;
  }

  static async fetchCasts(): Promise<Cast[]> {
    const parsedData = cast as CastResponse;
    return parsedData.cast;
  }
}

export default MovieService;
