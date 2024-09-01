import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import PdfCodeFee from "./PdfCollegeFeeInvoice";

const CollegeFeeTemplate = () => {
  const [form, setForm] = useState({
    studentName: "",
    rollNumber: "",
    fatherName: "",
    department: "",
    degree: "",
    semester: "",
    year: "",
    paymentMode: "",
    tuitionFee: "",
    institutionFee: "",
    universityFee: "",
    examinationFee: "",
    collegeName: "", // Added input for college name
    collegeAddress: "", // Added input for college address
  });

  const CreateInvoice = async () => {
    // Check if all fields are filled
    if (
      !form.studentName ||
      !form.rollNumber ||
      !form.fatherName ||
      !form.department ||
      !form.degree ||
      !form.semester ||
      !form.year ||
      !form.paymentMode ||
      !form.tuitionFee ||
      !form.institutionFee ||
      !form.universityFee ||
      !form.examinationFee ||
      !form.collegeName ||
      !form.collegeAddress
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Generate PDF using form data
    const html = PdfCodeFee(form);
    try {
      const { uri } = await Print.printToFileAsync({ html });
      console.log("File Saved to ", uri);
      await Sharing.shareAsync(uri, {
        UTI: ".pdf",
        mimeType: "application/pdf",
      });

      // Reset form after creating the invoice
      setForm({
        studentName: "",
        rollNumber: "",
        fatherName: "",
        department: "",
        degree: "",
        semester: "",
        year: "",
        paymentMode: "",
        tuitionFee: "",
        institutionFee: "",
        universityFee: "",
        examinationFee: "",
        collegeName: "", // Reset college name field
        collegeAddress: "", // Reset college address field
      });
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View>
      {/* Input fields for each form element */}
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="College Name"
        value={form.collegeName}
        onChangeText={(text) => setForm({ ...form, collegeName: text })}
      />
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="College Address"
        value={form.collegeAddress}
        onChangeText={(text) => setForm({ ...form, collegeAddress: text })}
      />
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Student Name"
        value={form.studentName}
        onChangeText={(text) => setForm({ ...form, studentName: text })}
      />
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Roll Number"
        value={form.rollNumber}
        onChangeText={(text) => setForm({ ...form, rollNumber: text })}
      />
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Father Name"
        value={form.fatherName}
        onChangeText={(text) => setForm({ ...form, fatherName: text })}
      />
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Department"
        value={form.department}
        onChangeText={(text) => setForm({ ...form, department: text })}
      />
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Degree"
        value={form.degree}
        onChangeText={(text) => setForm({ ...form, degree: text })}
      />
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Semester"
        value={form.semester}
        onChangeText={(text) => setForm({ ...form, semester: text })}
      />
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Year"
        value={form.year}
        onChangeText={(text) => setForm({ ...form, year: text })}
      />
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Payment Mode"
        value={form.paymentMode}
        onChangeText={(text) => setForm({ ...form, paymentMode: text })}
      />

      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Tuition Fee"
        value={form.tuitionFee}
        onChangeText={(text) => setForm({ ...form, tuitionFee: text })}
      />
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Institution Fee"
        value={form.institutionFee}
        onChangeText={(text) => setForm({ ...form, institutionFee: text })}
      />

      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="University Fee"
        value={form.universityFee}
        onChangeText={(text) => setForm({ ...form, universityFee: text })}
      />
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Examination Fee"
        value={form.examinationFee}
        onChangeText={(text) => setForm({ ...form, examinationFee: text })}
      />

      {/* Buttons for printing and downloading the invoice */}
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded mb-2"
        onPress={CreateInvoice}
      >
        <Text className="text-white text-center text-lg">Create Invoice</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CollegeFeeTemplate;
