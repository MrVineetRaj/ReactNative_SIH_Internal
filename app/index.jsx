import { StatusBar } from "expo-status-bar";
import { Text, View, Image, ActivityIndicator } from "react-native";
import { Link, Redirect } from "expo-router";
import CustomButton from "./components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { loading, isLogged } = useGlobalContext();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-4 text-lg text-gray-800">Loading...</Text>
      </View>
    );
  }
  if (isLogged) return <Redirect href="/home" />;

  const backgroundColor = "rgb(241, 246, 255)";

  return (
    <View
      className="flex-1 justify-center items-center bg-white p-4 "
      style={{ backgroundColor }}
    >
      <Image
        source={{
          uri: "https://i.pinimg.com/originals/aa/74/2b/aa742b56a7ab591a3a068aefe51ca68c.gif",
        }}
        style={{ width: 400, height: 500 }}
        className="mb-6"
      />
      <StatusBar style="auto" />
      <Link href="/home" className="text-blue-500 text-lg mb-4">
        View as Guest
      </Link>
      <Link href="/sign-in">
        <CustomButton className="bg-red-500 text-white py-2 px-4 rounded" />
      </Link>
    </View>
  );
}
