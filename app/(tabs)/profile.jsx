import { Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import { signOut } from "../../lib/appwrite";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  return (
    <View className="flex-1 justify-center items-center p-4 bg-gray-100">
      <FontAwesome
        name="user-circle"
        size={100}
        color="gray"
        className="mb-6"
      />
      <View className="mb-6 items-center">
        <Text className="text-2xl font-bold text-gray-800">
          {user?.username}
        </Text>
        <Text className="text-lg text-gray-600">{user?.email}</Text>
      </View>
      <TouchableOpacity
        onPress={logout}
        className="mt-6 px-4 py-2 bg-red-500 rounded-full"
      >
        <Text className="text-white text-lg">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
