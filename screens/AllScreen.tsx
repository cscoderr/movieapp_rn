import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { MovieResponse } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamsList } from "../navigators/RootNavigator";
import { Ionicons } from "@expo/vector-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import LoadingIndicator from "../components/LoadingIndicator";
import MovieCard from "../components/MovieCard";
import EmptyContent from "../components/EmptyContent";
import { shuffle } from "../utils/shuffle";

async function fetchMovies(page = 1, path: string): Promise<MovieResponse> {
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

const AllScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<StackParamsList, "All">) => {
  const title = route.params.title;
  const type = route.params.type;
  const { width } = useWindowDimensions();
  const { status, data, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["trending", title, type],
      queryFn: ({ pageParam }) => fetchMovies(pageParam, type),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages, lastPageParam) =>
        lastPage.total_pages > pages.length ? pages.length + 1 : undefined,
    });
  useEffect(() => {
    console.log(type);

    navigation.setOptions({
      title: title,
      headerLargeTitle: true,
      headerBackVisible: true,
      headerBackTitle: "Back",
      headerSearchBarOptions: {
        inputType: "text",
        placeholder: "Enter your search",
        // hideWhenScrolling: true,
        onChangeText: (text) => {},
        onSearchButtonPress: (e) => {},
      },
      headerTransparent: false,
    });
  }, []);

  if (status === "pending") {
    return <LoadingIndicator />;
  }

  if (status === "error") {
    return <EmptyContent title={error.message} icon="information-circle" />;
  }
  return (
    <FlatList
      data={data.pages.flatMap((page) => page.results)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MovieCard
          movie={item}
          onPress={() => {
            navigation.navigate("Details", { movie: item });
          }}
          style={{ width: (width - 30) / 2 }}
        />
      )}
      numColumns={2}
      refreshControl={
        <RefreshControl onRefresh={() => {}} refreshing={false} />
      }
      ItemSeparatorComponent={() => (
        <View style={{ height: 15, backgroundColor: "transparent" }} />
      )}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      columnWrapperStyle={{ gap: 10 }}
      style={{ paddingVertical: 10, backgroundColor: "white" }}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={0.3}
      ListFooterComponent={() =>
        isFetchingNextPage ? <ActivityIndicator /> : null
      }
    />
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
