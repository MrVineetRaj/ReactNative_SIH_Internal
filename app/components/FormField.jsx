import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText} // Use onChangeText for text input
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: 16,
    color: "#FFFFFF", // Assuming you want a white text color
  },
  inputContainer: {
    width: "100%",
    height: 60,
    backgroundColor: "#F5F5F5", // Light gray background
    borderWidth: 2,
    borderColor: "#1E90FF", // Blue border
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color: "#000000", // Black text color
  },
});

export default FormField;
