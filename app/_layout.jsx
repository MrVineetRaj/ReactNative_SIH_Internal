import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import GlobalProvider from "../context/GlobalProvider";

const RootLayout = () => {
  return (
    // <>
    //   <Text>Header</Text>
    //   <View style={styles.container}>
    //     <Slot></Slot>
    //   </View>
    //   <Text>footer</Text>
    // </>

    <>
      <GlobalProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="(auth)"
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          ></Stack.Screen>
        </Stack>
      </GlobalProvider>
    </>
  );
};

export default RootLayout;
