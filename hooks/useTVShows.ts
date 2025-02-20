import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTVWithType } from "../services/api";

export const useTVShows = (type: string) => {
  return useInfiniteQuery({
    queryKey: ["tv", type],
    queryFn: ({ pageParam }) => fetchTVWithType(pageParam, type),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.total_pages > pages.length ? pages.length + 1 : undefined,
  });
};
