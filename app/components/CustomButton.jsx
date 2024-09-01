import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CustomButton = () => {
  return (
    <View className=" w-72">
      <Text className=" w-72 p-4 text-xl border-2 border-black rounded-lg bg-blue-400 text-white text-center font-semibold">
        Continue with Email
      </Text>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
