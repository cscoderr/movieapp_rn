import Movie from "./Movie";

export default interface MovieResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: Movie[];
}
