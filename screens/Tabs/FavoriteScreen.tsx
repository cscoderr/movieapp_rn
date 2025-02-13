import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Movie } from "../../types";
import MovieService from "../../services/MovieService";

const FavoriteScreen = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const width = useWindowDimensions().width;
  useEffect(() => {
    MovieService.fetchMovies().then((movies) => {
      setMovies(movies);
    });
  }, []);
  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={Item}
      ItemSeparatorComponent={({ item }) => (
        <View style={{ height: 0.5, backgroundColor: "grey" }} />
      )}
      style={styles.container}
    />
  );
};

type ItemProps = { item: Movie };
const Item = ({ item }: ItemProps) => {
  const width = Dimensions.get("window").width;
  return (
    <View style={styles.itemContainer}>
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
          <Text style={styles.itemDate}>{item.release_date}</Text>
        )}
        <Text numberOfLines={3} style={styles.itemOverview}>
          {item.overview}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: 120,
    width: 100,
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
    margin: 10,
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
