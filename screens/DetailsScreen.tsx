import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { StackParamsList } from "../navigators/RootNavigator";
import { Cast, Movie } from "../types";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native-gesture-handler";
import MovieSectionList from "../components/MovieSectionList";
import { useEffect, useState } from "react";
import MovieService from "../services/MovieService";
import CastSectionList from "../components/CastSectionList";

function shuffle(array: Movie[]): Movie[] {
  let newArray = array.slice();
  let currentIndex = newArray.length;

  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }
  return newArray;
}

const DetailsScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<StackParamsList>) => {
  const movie = route.params as Movie;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [casts, setCasts] = useState<Cast[]>([]);
  useEffect(() => {
    MovieService.fetchMovies().then((movies) => {
      setMovies(shuffle(movies));
    });

    MovieService.fetchCasts().then((casts) => {
      setCasts(casts);
    });
  }, []);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, paddingTop: 400 }}
    >
      <View style={styles.imageContainer}>
        <View style={styles.topButtonContainer}>
          <View style={styles.circleButton}>
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Ionicons name="arrow-back" size={24} color={"white"} />
            </TouchableOpacity>
          </View>

          <View style={styles.circleButton}>
            <TouchableOpacity
              onPress={() => {
                console.log("Add to favorite");
              }}
            >
              <Ionicons name="bookmark-outline" size={24} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
        <Image
          style={styles.backdropImage}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
          }}
        />
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          }}
        />
      </View>
      <CastSectionList title="Cast" casts={casts} navigation={navigation} />
      <MovieSectionList
        title="Similar"
        movies={movies}
        navigation={navigation}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  imageContainer: {
    position: "absolute",
    height: 300,
    width: "100%",
  },
  backdropImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
  },
  image: {
    height: 200,
    width: 150,
    borderRadius: 15,
    left: 20,
    top: 200,
  },
  topButtonContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 1,
  },
  circleButton: {
    height: 40,
    width: 40,
    backgroundColor: "black",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DetailsScreen;
