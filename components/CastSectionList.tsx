import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Cast, CastResponse, Movie } from "../types";
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
import { useQuery } from "@tanstack/react-query";
import CastListShimmer from "./CastListShimmer";

async function fetchCasts(type: string, id: number): Promise<Cast[]> {
  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
    {
      method: "GET",
    }
  );
  if (response.ok) {
    const json = await response.json();
    const result = json as CastResponse;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return result.cast;
  } else {
    console.log(`Error ${response.status}`);
    return [];
  }
}

type Props = {
  title: string;
  id: number;
  type: string;
};
const CastSectionList = ({ title, id, type }: Props) => {
  const {
    isPending: loading,
    error,
    data: casts,
  } = useQuery({
    queryKey: ["fetchCasts", id],
    queryFn: () => fetchCasts(type, id),
  });

  if (error) {
    return <Text>An Error occur</Text>;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {loading ? (
        <CastListShimmer />
      ) : (
        <FlatList
          renderItem={({ item }) => <Item item={item} />}
          data={casts}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          // style={styles.listContent}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          ItemSeparatorComponent={ItemSeparator}
        />
      )}
    </View>
  );
};

const ItemSeparator = () => (
  <View style={{ width: 15, backgroundColor: "transparent" }} />
);

type ItemProps = { item: Cast };
const Item = ({ item }: ItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        style={styles.image}
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}`,
        }}
      />
      <Text numberOfLines={1} style={styles.itemTitle}>
        {item.name}
      </Text>
      <Text style={styles.itemDate}>{item.character}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
  },
  image: {
    height: 120,
    width: 120,
    resizeMode: "cover",
    borderRadius: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    marginHorizontal: 10,
    marginTop: 10,
  },
  itemContainer: {
    width: 120,
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 14,
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

export default CastSectionList;
