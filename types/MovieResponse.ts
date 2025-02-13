import Movie from "./Movie";

export default interface MovieResponse {
  page: number;
  results: Movie[];
}
