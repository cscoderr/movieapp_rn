import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { MovieResponse } from "../../types";
import { useInfiniteQuery } from "@tanstack/react-query";
import MovieCard from "../../components/MovieCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../navigators/RootNavigator";
import LoadingIndicator from "../../components/LoadingIndicator";
import EmptyContent from "../../components/EmptyContent";

async function fetchTV(page: number = 1): Promise<MovieResponse> {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.EXPO_PUBLIC_API_KEY}&page=${page}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("An error occur while fetching movies");
  }
  return response.json();
}

type TVShowsProps = {
  navigation: NativeStackNavigationProp<StackParamsList>
}
const TVShowsScreen = ({navigation}: TVShowsProps) => {
  const { status, error, fetchNextPage, data, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['tv'],
    queryFn: ({pageParam}) => fetchTV(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.total_pages > pages.length ? pages.length + 1 : undefined,
  });
  const {width} = useWindowDimensions();

  if(status === "pending") {
    return <LoadingIndicator />
  }

  if(status === "error") {
    return <EmptyContent title={error.message} icon="information-circle" />;
  }
  
  return (
    <FlatList
      data={data.pages.flatMap((page) => page.results)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MovieCard
          movie={item}
          onPress={() => navigation.push("Details", { movie: item })}
          style={{ width: (width - 30) / 2 }}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      numColumns={2}
      columnWrapperStyle={{ gap: 10 }}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={0.3}
      style={{ paddingVertical: 15, backgroundColor: "white" }}
      ListFooterComponent={() => {
        if (isFetchingNextPage) {
          return <ActivityIndicator />;
        }
      }}
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
});

export default TVShowsScreen;
