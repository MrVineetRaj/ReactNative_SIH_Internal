import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import FormField from "../components/FormField";
import { Link, router } from "expo-router";
import { signIn, getCurrentUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const backgroundColor = "rgb(241, 246, 255)";

  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the details");
    }
    setSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }

    console.log("Form submitted with:", form);
  };
  return (
    <SafeAreaView className="h-full bg-blue-400" style={{ backgroundColor }}>
      <View className="w-full items-center justify-center p-4 min-h-[60vh]">
        <Text className="text-2xl font-bold text-black pb-5">
          Login to Invoice App
        </Text>
        <FormField
          title="Email"
          value={form.email}
          placeholder="Enter your email"
          handleChangeText={(e) => setForm({ ...form, email: e })}
          keyboardType="email-address"
        />

        <FormField
          title="Password"
          value={form.password}
          placeholder="Enter your password"
          handleChangeText={(e) => setForm({ ...form, password: e })}
        />
      </View>
      <TouchableOpacity
        onPress={submit}
        activeOpacity={0.7}
        className="bg-orange-500 p-4 mx-4 rounded-lg border-2 border-white"
      >
        <Text className="text-white text-center">Login</Text>
      </TouchableOpacity>
      <View className="justify-center items-center gap-2 mt-1 flex-row">
        <Text className="text-base ">Don't have account</Text>
        <Link href="/sign-up" className=" font-bold">
          Sign Up
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
