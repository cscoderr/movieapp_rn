import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MovieService from "../../services/MovieService";
import { Movie, MovieResponse } from "../../types";
import MovieSectionList from "../../components/MovieSectionList";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { StackParamsList } from "../../navigators/RootNavigator";

const HomeScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<StackParamsList>;
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [todayMovies, setTodayMovies] = useState<Movie[]>([]);
  useEffect(() => {
    MovieService.fetchMovies().then((movies) => {
      setMovies(movies);
    });

    MovieService.fetchPopularMovies().then((popular) => {
      setPopular(popular);
    });

    MovieService.fetchTodayMovies().then((movies) => {
      setTodayMovies(movies);
    });
  }, []);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <MovieSectionList
        title="Trending Today"
        movies={todayMovies}
        navigation={navigation}
      />
      <MovieSectionList
        title="What's Popular"
        movies={movies}
        navigation={navigation}
      />
      <MovieSectionList
        title="Free to Watch"
        movies={popular}
        navigation={navigation}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: 300,
    width: 200,
    resizeMode: "cover",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomeScreen;
