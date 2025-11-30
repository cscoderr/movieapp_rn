import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import MovieCard from "../../components/MovieCard";
import LoadingIndicator from "../../components/LoadingIndicator";
import EmptyContent from "../../components/EmptyContent";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabBar, TabView } from "react-native-tab-view";
import React from "react";
import { useMovies } from "../../hooks/useMovies";
import { useRouter } from "expo-router";

type MoviewRouteProps = {
  type: string;
};
const MoviesRoute: React.FC<MoviewRouteProps> = ({ type = "popular" }) => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const { status, error, fetchNextPage, isFetchingNextPage, data } =
    useMovies(type);

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
          onPress={() =>
            router.push({
              pathname: "/details",
              params: { movie: JSON.stringify(item) },
            })
          }
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
      ListFooterComponent={() =>
        isFetchingNextPage ? <ActivityIndicator /> : null
      }
    />
  );
};

const renderScene = (route: { key: string; title: string }) => (
  <MoviesRoute type={route.key} />
);

const routes = [
  { key: "popular", title: "Popular" },
  { key: "now_playing", title: "Now Playing" },
  { key: "upcoming", title: "Upcoming" },
  { key: "top_rated", title: "Top Rated" },
];

const renderTabBar = (props) => (
  <TabBar
    {...props}
    activeColor="tomato"
    inactiveColor="grey"
    pressOpacity={0.5}
    gap={0}
    indicatorStyle={{ backgroundColor: "tomato" }}
    style={{ backgroundColor: "white", borderWidth: 0 }}
  />
);

const MoviesScreen = () => {
  const { width } = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={{ bottom: "off", top: "additive" }}
    >
      <TabView
        navigationState={{ index, routes }}
        renderScene={({ route }) => renderScene(route)}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: width }}
        pagerStyle={{ backgroundColor: "white" }}
        // lazy
      />
    </SafeAreaView>
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

export default MoviesScreen;
