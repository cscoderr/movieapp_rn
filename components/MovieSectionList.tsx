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
import ImageViewWithProgess from "./ImageViewWithProgress";
import { useEffect, useState } from "react";
import MovieService from "../services/MovieService";
import { create } from "zustand";
import MovieShimmerList from "./MovieShimmerList";
import { useQuery } from "@tanstack/react-query";

export enum MovieSectionType {
  trending = "trending",
  popularMovies = "popularMovies",
  popularTV = "popularTV",
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
  navigation: NativeStackNavigationProp<StackParamsList>;
};
const MovieSectionList = ({ title, type, navigation }: Props) => {
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
        <TouchableOpacity onPress={() => navigation.navigate("All", { title })}>
          <Text>See all</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <MovieShimmerList />
      ) : (
        <FlatList
          renderItem={({ item }) => (
            <Item
              item={item}
              onPress={() => navigation.push("Details", { movie: item })}
            />
          )}
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          ItemSeparatorComponent={ItemSeparator}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      )}
    </View>
  );
};

const ItemSeparator = () => (
  <View style={{ width: 15, backgroundColor: "transparent" }} />
);

type ItemProps = { item: Movie; onPress: () => void };
const Item = ({ item, onPress }: ItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      <ImageViewWithProgess
        imageUri={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
        progress={item.vote_average}
      />
      <Text numberOfLines={1} style={styles.itemTitle}>
        {item.title ?? item.name}
      </Text>
      {(item.release_date || item.first_air_date) && (
        <Text style={styles.itemDate}>
          {item.release_date ?? item.first_air_date}
        </Text>
      )}
    </TouchableOpacity>
  );
};

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
  itemContainer: {
    width: 170,
    gap: 5,
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
