import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Cast, Movie } from "../types";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { StackParamsList } from "../navigators/RootNavigator";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const Data = Array.from({ length: 10 }, (_, index) => index + 1);
const CastListShimmer = () => {
  return (
    <FlatList
      renderItem={(_) => <Item />}
      data={Data}
      keyExtractor={(item) => item.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const ItemSeparator = () => (
  <View style={{ width: 15, backgroundColor: "transparent" }} />
);

const Item = () => {
  return (
    <View style={styles.container}>
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.itemShimmerImage}
      />
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.itemShimmerTitle}
      />
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.itemShimmerSubtitle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  itemShimmerImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  itemShimmerTitle: {
    height: 10,
    width: 100,
    borderRadius: 30,
  },
  itemShimmerSubtitle: {
    height: 10,
    width: 100,
    borderRadius: 30,
  },
});

export default CastListShimmer;
