import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Movie } from "../types";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StackParamsList } from "../navigators/RootNavigator";

type Props = {
  title: string;
  movies: Movie[];
  navigation: NativeStackNavigationProp<StackParamsList>;
};
const MovieSectionList = ({ title, movies, navigation }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerText}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        renderItem={({ item }) => (
          <Item item={item} onPress={() => navigation.push("Details", item)} />
        )}
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.listContent}
      />
    </View>
  );
};

type ItemProps = { item: Movie; onPress: () => void };
const Item = ({ item, onPress }: ItemProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemContainer}>
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
    </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: "800",
  },
  listContent: {
    marginBottom: 20,
  },
  itemContainer: {
    width: 170,
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

export default MovieSectionList;
