import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
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
import { useEffect, useMemo, useState } from "react";
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
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

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

  const progressColor = useMemo(() => {
    if (movie.vote_average >= 7) {
      return "#26CA67";
    } else if (movie.vote_average >= 4) {
      return "#C9CF26";
    } else {
      return "#CF004E";
    }
  }, [movie]);

  const backgroundColor = useMemo(() => {
    if (movie.vote_average >= 7) {
      return "#19361E";
    } else if (movie.vote_average >= 4) {
      return "#322F0D";
    } else {
      return "#440C28";
    }
  }, [movie]);

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
        <LinearGradient
          colors={[
            "rgba(32, 32, 53, 1)", // Equivalent to rgba(31.5, 31.5, 52.5, 1)
            "rgba(32, 32, 53, 0.84)",
            "rgba(32, 32, 53, 0.84)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0.2, 0.5, 1]}
          style={{
            position: "absolute",
            ...StyleSheet.absoluteFillObject,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: top + 35,
            marginBottom: 20,
            gap: 10,
          }}
        >
          <ImageView
            imageUri={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            style={styles.image}
          />
          <View style={{ flex: 1, gap: 10 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
              {movie.title ?? movie.name} (
              {new Date(
                movie.release_date ?? movie.first_air_date
              ).getFullYear()}
              )
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: "#091619",
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AnimatedCircularProgress
                  size={45}
                  width={3}
                  fill={movie.vote_average * 10}
                  tintColor={progressColor}
                  onAnimationComplete={() => console.log("onAnimationComplete")}
                  backgroundColor={backgroundColor}
                  rotation={0}
                >
                  {(_) => (
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      {(movie.vote_average * 10).toFixed() + "%"}
                    </Text>
                  )}
                </AnimatedCircularProgress>
              </View>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {"User\nScore"}
              </Text>
            </View>
            {movie.overview && (
              <>
                <View
                  style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                  >
                    Overview
                  </Text>
                  <Ionicons name="information-circle" size={20} color="white" />
                </View>
                <Text
                  numberOfLines={4}
                  style={{ fontSize: 12, color: "white" }}
                >
                  {movie.overview}
                </Text>
              </>
            )}
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#091619",
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 20,
            bottom: -25,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                `https://www.themoviedb.org/${
                  movie.title == null ? "tv" : "movie"
                }/${movie.id}`
              );
            }}
          >
            <Ionicons name="play" size={24} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>

      <CastSectionList
        title="Top Casts"
        id={movie.id}
        type={movie.title == null ? "tv" : "movie"}
      />
      <MovieSectionList
        title="Recommendations"
        type={MovieSectionType.popularMovies}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    // height: 400,
    width: "100%",
    padding: 15,
    // marginBottom: 80,
  },
  backdropImage: {
    position: "absolute",
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  image: {
    height: "auto",
    borderRadius: 10,
    minHeight: 170,
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
