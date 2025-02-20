import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMoviesWithType } from "../services/api";

export const useMovies = (type: string) => {
  return useInfiniteQuery({
    queryKey: ["movies", type],
    queryFn: ({ pageParam }) => fetchMoviesWithType(pageParam, type),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.total_pages > pages.length ? pages.length + 1 : undefined,
  });
};
