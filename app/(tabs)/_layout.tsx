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
      <NativeTabs.Trigger name="index" options={{ title: "Home" }}>
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
      <NativeTabs.Trigger name="settings">
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

function AndroidTabLayout() {
  return (
    <Tabs
      screenOptions={(_) => ({
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tabs.Screen
        name="index"
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
      <Tabs.Screen
        name="movies"
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
      <Tabs.Screen
        name="tvshows"
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
      <Tabs.Screen
        name="favorites"
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
      <Tabs.Screen
        name="settings"
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
    </Tabs>
  );
}
