import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  VirtualizedList,
} from "react-native";
import { StackParamsList } from "../navigators/RootNavigator";
import { Cast, CastResponse, Movie, MovieResponse } from "../types";
import { Ionicons } from "@expo/vector-icons";
import MovieSectionList, {
  MovieSectionType,
} from "../components/MovieSectionList";
import { useEffect, useState } from "react";
import MovieService from "../services/MovieService";
import CastSectionList from "../components/CastSectionList";
import ImageView from "../components/ImageView";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import CastListShimmer from "../components/CastListShimmer";
import {
  addMovieToFavorites,
  isMovieInFavorites,
  removeMovieFromStorage,
} from "../services/favorite";

const DetailsScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<StackParamsList, "Details">) => {
  const movie = route.params.movie;
  const [favorite, setFavorite] = useState(false);
  const { top } = useSafeAreaInsets();
  const checkFavorite = async () => {
    const isFavorite = await isMovieInFavorites(movie.id);
    setFavorite(isFavorite);
  };

  useEffect(() => {
    checkFavorite();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <View style={[styles.topButtonContainer, { top: top }]}>
          <View style={styles.circleButton}>
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Ionicons name="arrow-back" size={24} color={"white"} />
            </TouchableOpacity>
          </View>

          <View style={styles.circleButton}>
            <TouchableOpacity
              onPress={async () => {
                if (favorite) {
                  await removeMovieFromStorage(movie.id);
                } else {
                  await addMovieToFavorites(movie);
                }
                await checkFavorite();
              }}
            >
              <Ionicons
                name={favorite ? "bookmark" : "bookmark-outline"}
                size={24}
                color={"white"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Image
          style={styles.backdropImage}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
          }}
        />
        <ImageView
          imageUri={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          style={styles.image}
        />
      </View>
      <CastSectionList
        title="Cast"
        id={movie.id}
        type={movie.title == null ? "tv" : "movie"}
      />
      <MovieSectionList
        title="Similar"
        type={MovieSectionType.popularMovies}
        navigation={navigation}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  imageContainer: {
    height: 300,
    width: "100%",
    marginBottom: 80,
  },
  backdropImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.6,
    resizeMode: "cover",
  },
  image: {
    position: "absolute",
    left: 20,
    bottom: -100,
  },
  topButtonContainer: {
    position: "absolute",
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
