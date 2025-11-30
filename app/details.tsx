import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useMemo } from "react";
import CastSectionList from "../components/CastSectionList";
import ImageView from "../components/ImageView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { LinearGradient } from "expo-linear-gradient";
import { useFavoriteStore } from "../stores/useFavoriteStore";
import RecommendationsList from "../components/RecommendationsList";
import { StackParamsList } from "../types/StackParamsList";

const DetailsScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<StackParamsList, "Details">) => {
  const movie = route.params.movie;
  const { top } = useSafeAreaInsets();
  const setFavoriteMovie = useFavoriteStore((state) => state.setMovie);
  const removeFavoriteMovies = useFavoriteStore((state) => state.removeMovie);
  const isFavorite = useFavoriteStore((state) => state.checkMovie(movie.id));
  const toogleFavorite = useCallback(() => {
    if (isFavorite) {
      removeFavoriteMovies(movie.id);
    } else {
      setFavoriteMovie(movie);
    }
  }, [movie.id, isFavorite, removeFavoriteMovies, setFavoriteMovie]);
  const handleOpenURL = useCallback(async () => {
    const url = `https://www.themoviedb.org/${
      movie.title == null ? "tv" : "movie"
    }/${movie.id}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert("Error", "Cannot open URL");
    }
  }, [movie]);
  const progressColor = useMemo(() => {
    if (movie.vote_average >= 7) return "#26CA67";
    if (movie.vote_average >= 4) return "#C9CF26";
    return "#CF004E";
  }, [movie.vote_average]);

  const backgroundColor = useMemo(() => {
    if (movie.vote_average >= 7) return "#19361E";
    if (movie.vote_average >= 4) return "#322F0D";
    return "#440C28";
  }, [movie.vote_average]);

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
            <TouchableOpacity onPress={toogleFavorite}>
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
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
                  onAnimationComplete={() => {}}
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
          <TouchableOpacity onPress={handleOpenURL}>
            <Ionicons name="play" size={24} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>

      <CastSectionList
        title="Top Casts"
        id={movie.id}
        type={movie.title == null ? "tv" : "movie"}
      />
      <RecommendationsList
        type={movie.title ? "movie" : "tv"}
        movieId={movie.id}
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
    width: "100%",
    padding: 15,
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
