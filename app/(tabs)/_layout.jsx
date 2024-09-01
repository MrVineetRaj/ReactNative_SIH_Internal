import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const TabIcon = ({ color, name, focused, displayName }) => {
  return (
    <View className="items-center justify-center ">
      <FontAwesome name={name} size={23} color={color} className=" p-0 m-0" />
      <Text
        style={{ color: color }}
        className={`${focused ? "text-base" : "text-sm"} mt-[-3px] font-medium`}
      >
        {displayName}
      </Text>
    </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 2,
          borderTopColor: "#232533",
          height: 50,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              name="home"
              focused={focused}
              displayName="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              name="user"
              focused={focused}
              displayName="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
