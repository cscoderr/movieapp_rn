import { Cast } from "@/types";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import CastListShimmer from "@/components/CastListShimmer";
import { fetchCasts } from "@/services/api";

type CastSectionListProps = {
  title: string;
  id: number;
  type: string;
};
const CastSectionList = ({ title, id, type }: CastSectionListProps) => {
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
      {(loading || casts.length > 0) && (
        <Text style={styles.title}>{title}</Text>
      )}
      {loading ? (
        <CastListShimmer />
      ) : (
        <FlatList
          renderItem={({ item }) => <Item item={item} />}
          data={casts}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
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
      <Text numberOfLines={2} style={styles.itemDate}>
        {item.character}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    margin: 10,
  },
  itemContainer: {
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 120,
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
