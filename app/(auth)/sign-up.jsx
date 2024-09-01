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
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const backgroundColor = "rgb(241, 246, 255)";

  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the details");
    }
    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);
      //set to global state using context
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
      <View className="w-full items-center justify-center p-4 min-h-[70vh]">
        <Text className="text-2xl font-bold text-black pb-5">
          Sign Up to Invoice App
        </Text>

        <FormField
          title="Username"
          value={form.username}
          placeholder="Username"
          handleChangeText={(e) => setForm({ ...form, username: e })}
        />

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
        <Text className="text-white text-center">Sign Up</Text>
      </TouchableOpacity>
      <View className="justify-center items-center gap-2 mt-1 flex-row">
        <Text className="text-base ">Already have account</Text>
        <Link href="/sign-in" className=" font-bold">
          Sign In
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
