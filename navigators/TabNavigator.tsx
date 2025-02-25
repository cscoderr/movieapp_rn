import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Tabs/HomeScreen";
import MoviesScreen from "../screens/Tabs/MoviesScreen";
import TVShowsScreen from "../screens/Tabs/TvShowsScreen";
import FavoriteScreen from "../screens/Tabs/FavoriteScreen";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Platform, StyleProp, TextStyle, ViewStyle } from "react-native";
import SettingsScreen from "../screens/Tabs/Settings";
import { SymbolView } from "expo-symbols";

export type TabParamsList = {
  Home: undefined;
  Movies: undefined;
  TVShows: undefined;
  Favorites: undefined;
  Settings: undefined;
};
const Tab = createBottomTabNavigator<TabParamsList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={(props) => ({
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <SymbolView
              name={focused ? "house.fill" : "house"}
              style={{ width: 28, height: 28 }}
              type="hierarchical"
              tintColor={color}
              fallback={
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={size}
                  color={color}
                />
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Movies"
        component={MoviesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <SymbolView
              name={focused ? "film.fill" : "film"}
              style={{ width: 28, height: 28 }}
              type="hierarchical"
              tintColor={color}
              fallback={
                <Ionicons
                  name={focused ? "videocam" : "videocam-outline"}
                  size={size}
                  color={color}
                />
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="TVShows"
        component={TVShowsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <SymbolView
              name={focused ? "tv.fill" : "tv"}
              style={{ width: 28, height: 28 }}
              type="hierarchical"
              tintColor={color}
              fallback={
                <Ionicons
                  name={focused ? "tv" : "tv-outline"}
                  size={size}
                  color={color}
                />
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <SymbolView
              name={focused ? "heart.fill" : "heart"}
              style={{ width: 28, height: 28 }}
              type="hierarchical"
              tintColor={color}
              fallback={
                <Ionicons
                  name={focused ? "heart" : "heart-outline"}
                  size={size}
                  color={color}
                />
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ focused, size, color }) => (
            <SymbolView
              name={focused ? "gearshape.fill" : "gearshape"}
              style={{ width: 28, height: 28 }}
              type="hierarchical"
              tintColor={color}
              fallback={
                <Ionicons
                  name={focused ? "settings" : "settings-outline"}
                  size={size}
                  color={color}
                />
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

type TabIconProps = {
  style: StyleProp<TextStyle>;
  name: ComponentProps<typeof Ionicons>["name"];
};
const TabBarIcon = ({ style, name }: TabIconProps) => {
  return <Ionicons size={24} name={name} style={style} />;
};

export default TabNavigator;
