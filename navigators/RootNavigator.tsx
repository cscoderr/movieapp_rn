import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Tabs/HomeScreen";
import MoviesScreen from "../screens/Tabs/MoviesScreen";
import TVShowsScreen from "../screens/Tabs/TvShowsScreen";
import FavoriteScreen from "../screens/Tabs/FavoriteScreen";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import DetailsScreen from "../screens/DetailsScreen";
import { Movie } from "../types";

export type StackParamsList = {
  Main: undefined;
  Details: Movie;
};
const Stack = createNativeStackNavigator<StackParamsList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
