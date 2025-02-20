import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie } from "../types";

const FAVORITE_STORAGE_KEY = "_movie_app_favorites_";

export const getFavoriteMovies = async (): Promise<Movie[]> => {
  try {
    const data = await AsyncStorage.getItem(FAVORITE_STORAGE_KEY);
    return data ? (JSON.parse(data) as Movie[]) : [];
  } catch (error) {
    console.log(
      `An error occur ${error instanceof Error ? error.message : error}`
    );
    return [];
  }
};

const saveFavoriteMovies = async (movies: Movie[]): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify(movies));
    return true;
  } catch (error) {
    console.log(
      `An error occur ${error instanceof Error ? error.message : error}`
    );
    return false;
  }
};

export const addMovieToFavorites = async (
  movie: Movie | Movie[]
): Promise<boolean> => {
  const currentFavorites = await getFavoriteMovies();
  const moviesToAdd = Array.isArray(movie) ? movie : [movie];
  const uniqueMovies = new Map(
    currentFavorites.map((movie) => [movie.id, movie])
  );
  moviesToAdd.forEach((movie) => uniqueMovies.set(movie.id, movie));
  return saveFavoriteMovies([...uniqueMovies.values()]);
};

export const removeMovieFromStorage = async (
  movieId: number
): Promise<boolean> => {
  const currentFavorites = await getFavoriteMovies();
  const updatedFavorites = currentFavorites.filter(
    (movie, _) => movie.id != movie.id
  );
  return saveFavoriteMovies(updatedFavorites);
};

export const isMovieInFavorites = async (movieId: number): Promise<boolean> => {
  console.log("called");
  const currentFavorites = await getFavoriteMovies();

  return currentFavorites.some((movie) => movie.id === movieId);
};
