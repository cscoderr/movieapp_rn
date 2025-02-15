import { LinearGradient } from "expo-linear-gradient";
import { Animated, FlatList, StyleSheet, View } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

const DATA = Array.from({ length: 5 }, (_, index) => index + 1);

const MovieShimmerList = () => {
  return (
    <FlatList
      data={DATA}
      renderItem={(item) => (
        <View style={styles.container}>
          <View style={{ marginBottom: 25 }}>
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={styles.shimmerImage}
            />
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={styles.progressShimmerItem}
            />
          </View>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.titleShimmerItem}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.dateShimmerItem}
          />
        </View>
      )}
      horizontal={true}
      keyExtractor={(item) => item.toString()}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const ItemSeparator = () => (
  <View style={{ width: 15, backgroundColor: "transparent" }} />
);

const styles = StyleSheet.create({
  container: {
    width: 170,
    gap: 5,
  },
  shimmerImage: {
    height: 250,
    width: 170,
    borderRadius: 25,
  },
  progressShimmerItem: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    bottom: -25,
    left: 10,
  },
  titleShimmerItem: {
    height: 15,
    borderRadius: 5,
    width: 170,
  },
  dateShimmerItem: {
    height: 15,
    width: 80,
    borderRadius: 5,
  },
});

export default MovieShimmerList;
