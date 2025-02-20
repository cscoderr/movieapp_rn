import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Movie, MovieResponse } from "../types";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StackParamsList } from "../navigators/RootNavigator";
import MovieShimmerList from "./MovieShimmerList";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "./MovieCard";
import { useNavigation } from "@react-navigation/native";

export enum MovieSectionType {
  trending = "trending/movie/day",
  popularMovies = "movie/popular",
  popularTV = "tv/popular",
  similar = "similar",
}

async function fetchMoviesWithType(type: MovieSectionType): Promise<Movie[]> {
  if (type == MovieSectionType.trending) {
    return fetchTrendingMovies();
  } else if (type == MovieSectionType.popularMovies) {
    return fetchPopular();
  } else if (type == MovieSectionType.similar) {
    return fetchSimilarMoviesorTv("movie", "id");
  } else {
    return freeToWatchMovies();
  }
}

async function fetchPopular(): Promise<Movie[]> {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
    {
      method: "GET",
    }
  );
  if (response.ok) {
    const json = await response.json();
    const result = json as MovieResponse;
    return result.results;
  } else {
    console.log(`Error ${response.status}`);
    return [];
  }
}

async function fetchTrendingMovies(): Promise<Movie[]> {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
    {
      method: "GET",
    }
  );
  if (response.ok) {
    const json = await response.json();
    const result = json as MovieResponse;
    return result.results;
  } else {
    console.log(`Error ${response.status}`);
    return [];
  }
}

async function freeToWatchMovies(): Promise<Movie[]> {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
    {
      method: "GET",
    }
  );
  if (response.ok) {
    const json = await response.json();
    const result = json as MovieResponse;
    return result.results;
  } else {
    console.log(`Error ${response.status}`);
    return [];
  }
}

async function fetchSimilarMoviesorTv(
  type: string,
  id: string
): Promise<Movie[]> {
  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
    {
      method: "GET",
    }
  );
  if (response.ok) {
    const json = await response.json();
    const result = json as MovieResponse;
    return result.results;
  } else {
    console.log(`Error ${response.status}`);
    return [];
  }
}

type MovieState = {
  movies: Record<MovieSectionType, Movie[]>;
  setMovies: (type: MovieSectionType, movies: Movie[]) => Promise<void>;
};

// const useMoviesStore = create<MovieState>((set) => ({
//   movies: {
//     [MovieSectionType.trending]: [],
//     [MovieSectionType.popularMovies]: [],
//     [MovieSectionType.popularTV]: [],
//   },
//   setMovies: async (type: MovieSectionType, movies: Movie[]) => {
//     set((state) => ({ movies: { ...state.movies, [type]: movies } }));
//   },
// }));

type Props = {
  title: string;
  type: MovieSectionType;
};
const MovieSectionList = ({ title, type }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const {
    isPending: loading,
    error,
    data: movies,
  } = useQuery({
    queryKey: ["fetchMovies", type],
    queryFn: async () => fetchMoviesWithType(type),
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
            navigation.navigate("All", { title: title, type: type })
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
              onPress={() => navigation.push("Details", { movie: item })}
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
