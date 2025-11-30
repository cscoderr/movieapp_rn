import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Movie } from "../../types";
import EmptyContent from "../../components/EmptyContent";
import { useFavoriteStore } from "../../stores/useFavoriteStore";
import { TabBar, TabView } from "react-native-tab-view";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

type FavoriteRouteProps = {
  type: string;
};

const FavoriteRoute: React.FC<FavoriteRouteProps> = ({ type }) => {
  const movies = useFavoriteStore((state) => state.movies);
  const router = useRouter();
  const favoriteMovies = React.useMemo(() => {
    if (type === "all") return movies.toReversed();
    if (type === "movie")
      return movies.filter((movie) => movie.title != null).toReversed();
    if (type === "tv")
      return movies.filter((movie) => movie.name != null).toReversed();
    return [];
  }, [type, movies]);
  return favoriteMovies.length <= 0 ? (
    <EmptyContent
      title={`No Favorite${
        type !== "all"
          ? ` ${type.substring(0, 1).toUpperCase()}${type.substring(1)}`
          : ""
      } Available`}
      icon="heart"
    />
  ) : (
    <FlatList
      data={favoriteMovies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Item
          item={item}
          onPress={() =>
            router.push({
              pathname: "/details",
              params: { movie: JSON.stringify(item) },
            })
          }
        />
      )}
      ItemSeparatorComponent={ItemSeperator}
      style={styles.container}
      contentContainerStyle={{ paddingHorizontal: 10 }}
    />
  );
};

const ItemSeperator = ({ item }) => (
  <View style={{ height: 10, backgroundColor: "transparent" }} />
);

type ItemProps = {
  item: Movie;
  onPress: () => void;
};
const Item = ({ item, onPress }: ItemProps) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <Image
        style={styles.image}
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
        }}
      />
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.itemTitle}>
          {item.title ?? item.name}
        </Text>
        {item.release_date && (
          <Text style={styles.itemDate}>
            {item.release_date ?? item.first_air_date}
          </Text>
        )}
        <Text numberOfLines={3} style={styles.itemOverview}>
          {item.overview}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const renderScene = (route: { key: string; title: string }) => (
  <FavoriteRoute type={route.key} />
);

const routes = [
  { key: "all", title: "All" },
  { key: "movie", title: "Movie" },
  { key: "tv", title: "TV" },
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

const FavoriteScreen = () => {
  const { width } = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  return (
    <SafeAreaView
      edges={{ bottom: "off", top: "additive" }}
      style={{ flex: 1, backgroundColor: "white" }}
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
    backgroundColor: "white",
    paddingVertical: 10,
  },
  image: {
    height: 120,
    width: 80,
    resizeMode: "cover",
    borderRadius: 5,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    gap: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    gap: 10,
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
  itemOverview: {
    fontSize: 14,
    fontWeight: "400",
  },
});

export default FavoriteScreen;
