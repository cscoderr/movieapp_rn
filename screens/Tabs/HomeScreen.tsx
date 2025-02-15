import MovieSectionList, {
  MovieSectionType,
} from "../../components/MovieSectionList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../navigators/RootNavigator";
import { ScrollView, StyleSheet } from "react-native";

const HomeScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<StackParamsList>;
}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <MovieSectionList
        title="Trending Today"
        type={MovieSectionType.trending}
        navigation={navigation}
      />
      <MovieSectionList
        title="Popular Movies"
        type={MovieSectionType.popularMovies}
        navigation={navigation}
      />
      <MovieSectionList
        title="Popular TV"
        type={MovieSectionType.popularTV}
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
