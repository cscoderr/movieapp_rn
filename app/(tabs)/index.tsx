import MovieSectionList, {
  MovieSectionType,
} from "../../components/MovieSectionList";
import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ title: "Home", headerShown: true }} />
      <MovieSectionList
        title="Trending Today"
        path={MovieSectionType.trending}
      />
      <MovieSectionList
        title="Popular Movies"
        path={MovieSectionType.popularMovies}
      />
      <MovieSectionList title="Popular TV" path={MovieSectionType.popularTV} />
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
