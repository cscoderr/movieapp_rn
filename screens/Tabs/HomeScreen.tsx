import MovieSectionList, {
  MovieSectionType,
} from "../../components/MovieSectionList";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { StackParamsList } from "../../navigators/RootNavigator";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<StackParamsList>) => {
  // const nav = useNavigation<NativeStackScreenProps<StackParamsList>>();

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Settings")}
          >
            <Ionicons name="settings" size={24} />
          </TouchableOpacity>
        );
      },
    });
  }, []);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <MovieSectionList
        title="Trending Today"
        type={MovieSectionType.trending}
      />
      <MovieSectionList
        title="Popular Movies"
        type={MovieSectionType.popularMovies}
      />
      <MovieSectionList title="Popular TV" type={MovieSectionType.popularTV} />
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
