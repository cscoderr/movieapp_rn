import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import {
  NativeTabs,
  Icon,
  Label,
  VectorIcon,
} from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs
      labelVisibilityMode="labeled"
      tintColor={"tomato"}
      backgroundColor={"#FFFBFF"}
      indicatorColor={"#FFDADA"}
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
