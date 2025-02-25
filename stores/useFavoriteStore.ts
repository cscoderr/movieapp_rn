import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Movie } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type FavoriteStoreState = {
  movies: Movie[];
  setMovie: (movie: Movie) => void;
  removeMovie: (movieId: number) => void;
  checkMovie: (movieId: number) => boolean;
};

export const useFavoriteStore = create<FavoriteStoreState>()(
  persist(
    (set, get) => ({
      movies: [],
      setMovie: (movie) =>
        set((state) => ({
          movies: state.movies.some((value) => value.id === movie.id)
            ? state.movies
            : [...state.movies, movie],
        })),
      removeMovie: (movieId) =>
        set((state) => ({
          movies: state.movies.filter((value) => value.id !== movieId),
        })),
      checkMovie: (movieId) =>
        get().movies.some((movie) => movie.id === movieId),
    }),
    { name: "favoriteStore", storage: createJSONStorage(() => AsyncStorage) }
  )
);
