import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Movie } from "../../types";
import MovieService from "../../services/MovieService";

const TVShowsScreen = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    MovieService.fetchPopularMovies().then((movies) => {
      setMovies(movies);
    });
  }, []);
  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={Item}
      numColumns={3}
    />
  );
};

type ItemProps = { item: Movie };
const Item = ({ item }: ItemProps) => {
  const width = Dimensions.get("window").width;
  return (
    <View style={[styles.itemContainer, { width: (width - 30) / 3 }]}>
      <Image
        style={styles.image}
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
        }}
      />
      <Text numberOfLines={1} style={styles.itemTitle}>
        {item.title ?? item.name}
      </Text>
      {item.release_date && (
        <Text style={styles.itemDate}>{item.release_date}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
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

export default TVShowsScreen;
