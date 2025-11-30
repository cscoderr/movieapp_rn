import { Tabs } from "expo-router";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Platform, StyleProp, TextStyle, ViewStyle } from "react-native";
import { SymbolView } from "expo-symbols";
import {
  NativeTabs,
  Icon,
  Label,
  VectorIcon,
} from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs
      minimizeBehavior="onScrollDown"
      labelVisibilityMode="labeled"
      tintColor={"tomato"}
    >
      <NativeTabs.Trigger name="(home)" options={{ title: "Home" }}>
        <Label>Home</Label>
        {Platform.select({
          ios: <Icon sf={{ default: "house", selected: "house.fill" }} />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="home" />} />
          ),
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="movies">
        <Label>Movies</Label>
        {Platform.select({
          ios: <Icon sf={{ default: "film", selected: "film.fill" }} />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="videocam" />} />
          ),
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="tvshows">
        <Label>TvShows</Label>
        {Platform.select({
          ios: <Icon sf={{ default: "tv", selected: "tv.fill" }} />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="tv" />} />
          ),
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="favorites">
        <Label>Favorites</Label>
        {Platform.select({
          ios: <Icon sf={{ default: "heart", selected: "heart.fill" }} />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="favorite" />} />
          ),
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(settings)">
        <Label>Settings</Label>
        {Platform.select({
          ios: (
            <Icon sf={{ default: "gearshape", selected: "gearshape.fill" }} />
          ),
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="settings" />} />
          ),
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
