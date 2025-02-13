import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Cast, Movie } from "../types";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StackParamsList } from "../navigators/RootNavigator";

type Props = {
  title: string;
  casts: Cast[];
  navigation: NativeStackNavigationProp<StackParamsList>;
};
const CastSectionList = ({ title, casts, navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        renderItem={({ item }) => <Item item={item} />}
        data={casts}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.listContent}
      />
    </View>
  );
};

type ItemProps = { item: Cast };
const Item = ({ item }: ItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        style={styles.image}
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}`,
        }}
      />
      <Text numberOfLines={1} style={styles.itemTitle}>
        {item.original_name}
      </Text>
      <Text style={styles.itemDate}>{item.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  image: {
    height: 120,
    resizeMode: "cover",
    borderRadius: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    margin: 10,
  },
  listContent: {
    marginBottom: 20,
  },
  itemContainer: {
    width: 120,
    gap: 5,
    marginHorizontal: 5,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
    marginTop: 5,
  },
  itemDate: {
    fontSize: 14,
    fontWeight: "400",
    color: "grey",
  },
});

export default CastSectionList;
