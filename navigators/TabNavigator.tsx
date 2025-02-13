import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Tabs/HomeScreen";
import MoviesScreen from "../screens/Tabs/MoviesScreen";
import TVShowsScreen from "../screens/Tabs/TvShowsScreen";
import FavoriteScreen from "../screens/Tabs/FavoriteScreen";
import { Ionicons } from "@expo/vector-icons";

export type TabParamsList = {
  Home: undefined;
  Movies: undefined;
  TVShows: undefined;
  Favorites: undefined;
};
const Tab = createBottomTabNavigator<TabParamsList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={(props) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;

          if (props.route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (props.route.name === "Movies") {
            iconName = focused ? "videocam" : "videocam-outline";
          } else if (props.route.name === "TVShows") {
            iconName = focused ? "tv" : "tv-outline";
          } else if (props.route.name === "Favorites") {
            iconName = focused ? "bookmark" : "bookmark-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Movies" component={MoviesScreen} />
      <Tab.Screen name="TVShows" component={TVShowsScreen} />
      <Tab.Screen name="Favorites" component={FavoriteScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
