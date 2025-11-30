import { use, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import LoadingIndicator from "../components/LoadingIndicator";
import MovieCard from "../components/MovieCard";
import EmptyContent from "../components/EmptyContent";
import { fetchDataWithPath } from "../services/api";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

type AllScreenParams = {
  title: string;
  type: string;
};

const AllScreen = () => {
  const { title, type } = useLocalSearchParams<AllScreenParams>();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const { status, data, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["trending", title, type],
      queryFn: ({ pageParam }) => fetchDataWithPath(type, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages, lastPageParam) =>
        lastPage.total_pages > pages.length ? pages.length + 1 : undefined,
    });
  const [query, setQuery] = useState<string>("");
  const queryData = useMemo(() => {
    if (status === "pending" || status === "error") return [];
    if (query == "") {
      return data.pages.flatMap((moviesResponse) => moviesResponse.results);
    } else {
      const movies = data.pages.flatMap(
        (moviesResponse) => moviesResponse.results
      );
      return movies.filter(
        (movie) =>
          movie.name?.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
          movie.title?.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );
    }
  }, [query, data]);

  const handleEndReached = () => {
    if (query === "") {
      fetchNextPage();
    }
  };

  if (status === "pending") {
    return <LoadingIndicator />;
  }

  if (status === "error") {
    return <EmptyContent title={error.message} icon="information-circle" />;
  }

  if (query != "" && queryData.length < 1) {
    return <EmptyContent title={`${query} not found`} icon="search-circle" />;
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: title,
          headerLargeTitle: false,
          headerBackVisible: true,
          headerBackTitle: "Back",
          headerSearchBarOptions: {
            inputType: "text",
            placeholder: "Enter your search",
            onChangeText: (event) => setQuery(event.nativeEvent.text),
            onSearchButtonPress: (event) => setQuery(event.nativeEvent.text),
          },
          headerTransparent: false,
        }}
      />
      <FlatList
        data={queryData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => {
              router.navigate({
                pathname: "/details",
                params: { movie: JSON.stringify(item) },
              });
            }}
            style={{ width: (width - 30) / 2 }}
          />
        )}
        numColumns={2}
        ItemSeparatorComponent={() => (
          <View style={{ height: 15, backgroundColor: "transparent" }} />
        )}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        style={{ paddingVertical: 10, backgroundColor: "white" }}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        ListFooterComponent={() =>
          isFetchingNextPage ? <ActivityIndicator /> : null
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: "white",
  },
  image: {
    height: 250,
    resizeMode: "cover",
    borderRadius: 15,
  },
  headerText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  listContent: {
    marginBottom: 20,
  },
  itemContainer: {
    gap: 5,
    marginHorizontal: 5,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
    marginTop: 5,
  },
  itemDate: {
    fontSize: 14,
    fontWeight: "400",
    color: "grey",
  },
});

export default AllScreen;
