import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MovieShimmerList from "./MovieShimmerList";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "./MovieCard";
import { fetchDataWithPath } from "../services/api";
import { useRouter } from "expo-router";

export enum MovieSectionType {
  trending = "trending/movie/day",
  popularMovies = "movie/popular",
  popularTV = "tv/popular",
}
type MovieSectionListProps = {
  title: string;
  path: MovieSectionType;
};
const MovieSectionList = ({ title, path }: MovieSectionListProps) => {
  const router = useRouter();
  const {
    isPending: loading,
    error,
    data: movies,
  } = useQuery({
    queryKey: ["fetchMovies", path],
    queryFn: async () => {
      const movieResponse = await fetchDataWithPath(path);
      return movieResponse.results;
    },
  });

  if (error) {
    return <Text>Error loading movies</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerText}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          onPress={() =>
            router.navigate({
              pathname: "/all",
              params: { title: title, type: path },
            })
          }
        >
          <Text>See all</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <MovieShimmerList />
      ) : (
        <FlatList
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() => {
                router.push({
                  pathname: "/details",
                  params: { movie: JSON.stringify(item) },
                });
              }}
            />
          )}
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          ItemSeparatorComponent={ItemSeparator}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          initialNumToRender={5}
        />
      )}
    </View>
  );
};

const ItemSeparator = () => (
  <View style={{ width: 15, backgroundColor: "transparent" }} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 15,
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
});

export default MovieSectionList;
