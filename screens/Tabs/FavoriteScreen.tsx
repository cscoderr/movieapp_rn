import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Movie } from "../../types";
import { getFavoriteMovies } from "../../services/favorite";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamsList } from "../../navigators/RootNavigator";
import EmptyContent from "../../components/EmptyContent";

const FavoriteScreen = ({
  navigation,
}: NativeStackScreenProps<StackParamsList>) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getFavoriteMovies().then((movies) => {
      setMovies(movies);
    });
  }, []);

  if (movies.length < 1) {
    return <EmptyContent title="No Favorite Available" icon="bookmark" />;
  }

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Item
          item={item}
          onPress={() => navigation.push("Details", { movie: item })}
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
          <Text style={styles.itemDate}>{item.release_date}</Text>
        )}
        <Text numberOfLines={3} style={styles.itemOverview}>
          {item.overview}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
