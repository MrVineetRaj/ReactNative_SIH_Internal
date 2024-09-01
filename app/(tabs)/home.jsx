// InvoiceForm.js
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import SellerInvoiceTemplate from "../components/SellerInvoiceTemplate";
import CollegeFeeTemplate from "../components/CollegeFeeTemplate";

const InvoiceForm = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("template1");

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="p-4">
        <View className="mb-8">
          <Text className="text-2xl font-bold pt-4 mb-3 text-center">
            Invoice Form
          </Text>

          <View className="mb-4 p-2 bg-slate-300 rounded-lg">
            <Text className="text-lg font-medium">Selected Template:</Text>
            <Picker
              selectedValue={selectedTemplate}
              onValueChange={(itemValue) => setSelectedTemplate(itemValue)}
            >
              <Picker.Item label="1: Seller Invoice" value="template1" />
              <Picker.Item label="2: College Fee Invoice" value="template2" />
            </Picker>
          </View>

          {selectedTemplate === "template1" && <SellerInvoiceTemplate />}
          {selectedTemplate === "template2" && <CollegeFeeTemplate />}

          {/* <TouchableOpacity className="bg-red-500 p-4 rounded mt-4">
            <Text className="text-white text-center text-lg">
              Preview Invoice
            </Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InvoiceForm;
