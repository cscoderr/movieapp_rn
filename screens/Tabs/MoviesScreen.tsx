import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Movie, MovieResponse } from "../../types";
import MovieService from "../../services/MovieService";
import MovieCard from "../../components/MovieCard";
import {
  NativeStackNavigationProp,
  NativeStackNavigatorProps,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { StackParamsList } from "../../navigators/RootNavigator";
import {
  useQuery,
  keepPreviousData,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import MovieShimmerList from "../../components/MovieShimmerList";
import LoadingIndicator from "../../components/LoadingIndicator";
import EmptyContent from "../../components/EmptyContent";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

type FectchMoviesType = {
  page?: number;
};
async function fetchMovies({
  page = 1,
}: FectchMoviesType): Promise<MovieResponse> {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.EXPO_PUBLIC_API_KEY}&page=${page}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("An error occur while fetching movies");
  }
  return response.json();
}

type MoviewScreenProps = {
  navigation: NativeStackNavigationProp<StackParamsList>;
};
const MoviesScreenRoute = ({ navigation }: MoviewScreenProps) => {
  const firstTextRef = useRef(null);
  const { width } = useWindowDimensions();
  const { status, error, fetchNextPage, isFetchingNextPage, data } =
    useInfiniteQuery({
      queryKey: ["movies"],
      queryFn: ({ pageParam }) => fetchMovies({ page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        lastPage.total_pages > pages.length ? pages.length + 1 : undefined,
    });

  if (status === "pending") {
    return <LoadingIndicator />
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
      style={{ paddingVertical: 15,  backgroundColor: "white" }}
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


const renderScene = SceneMap({
  first: MoviesScreenRoute,
  second: MoviesScreenRoute,
  third: MoviesScreenRoute,
  fourth: MoviesScreenRoute,
});

const routes = [
{ key: 'first', title: 'Popular' },
{ key: 'second', title: 'Now Playing' },
{ key: 'third', title: 'Upcoming' },
{ key: 'fourth', title: 'Top Rated' },
];

const renderTabBar = props => (
  <TabBar
    {...props}
    activeColor='tomato'
    inactiveColor='grey'
    pressOpacity={0.5}
    gap={0}
    indicatorStyle={{ backgroundColor: 'tomato' }}
    style={{ backgroundColor: 'white', borderWidth: 0 }}
  />
);

const MoviesScreen = ({navigation}: NativeStackScreenProps<StackParamsList>) => {
  const {width} = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  return (<SafeAreaView style={{flex: 1, backgroundColor: "white"}} edges={{bottom: "off", top: "additive"}}>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: width }}
      pagerStyle={{backgroundColor: "white"}}
      lazy
      swipeEnabled={false}
    />
  </SafeAreaView>)
}

export default MoviesScreen;
