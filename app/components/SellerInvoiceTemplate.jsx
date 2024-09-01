import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import PdfCode from "./PdfSellerInvoice";

// Component to render item row for the seller invoice template
const ItemRow = ({ item, index, onChange, onRemove }) => (
  <View className="flex-row items-center mb-2">
    <TextInput
      className="bg-white p-2 border border-gray-300 rounded flex-1 mr-2"
      placeholder="Item"
      value={item.name}
      onChangeText={(text) => onChange(index, "name", text)}
    />
    <TextInput
      className="bg-white p-2 border border-gray-300 rounded flex-1 mr-2 max-w-[45px] text-center"
      placeholder="Qty."
      keyboardType="numeric"
      value={item.quantity}
      onChangeText={(text) => onChange(index, "quantity", text)}
    />
    <TextInput
      className="bg-white p-2 border border-gray-300 rounded flex-1 mr-2 max-w-[60px] text-center"
      placeholder="Price"
      keyboardType="numeric"
      value={item.price}
      onChangeText={(text) => onChange(index, "price", text)}
    />
    <TouchableOpacity
      className="bg-red-500 p-2 rounded"
      onPress={() => onRemove(index)}
    >
      <Text className="text-white">Remove</Text>
    </TouchableOpacity>
  </View>
);

const SellerInvoiceTemplate = () => {
  const [form, setForm] = useState({
    name: "",
    companyName: "",
    address: "",
    invoiceNumber: "",
    date: "",
    email: "",
    phone: "",
    customerName: "",
    customerAddress: "",
    customerEmail: "",
    customerPhone: "",
    items: [{ name: "", quantity: "", price: "" }], // Start with one empty item
  });

  const CreateInvoice = async () => {
    if (
      !form.name ||
      !form.companyName ||
      !form.address ||
      !form.invoiceNumber ||
      !form.date ||
      !form.email ||
      !form.phone ||
      !form.customerName ||
      !form.customerAddress ||
      !form.customerEmail ||
      !form.customerPhone ||
      form.items.some((item) => !item.name || !item.quantity || !item.price)
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Pass form data to PdfCode
    const html = PdfCode(form);
    try {
      const { uri } = await Print.printToFileAsync({ html });
      console.log("File Saved to ", uri);
      await Sharing.shareAsync(uri, {
        UTI: ".pdf",
        mimeType: "application/pdf",
      });

      setForm({
        name: "",
        companyName: "",
        address: "",
        invoiceNumber: "",
        date: "",
        email: "",
        phone: "",
        customerName: "",
        customerAddress: "",
        customerEmail: "",
        customerPhone: "",
        items: [{ name: "", quantity: "", price: "" }],
      });
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { name: "", quantity: "", price: "" }],
    });
  };

  const removeItem = (index) => {
    setForm({
      ...form,
      items: form.items.filter((_, i) => i !== index),
    });
  };

  const updateItem = (index, field, value) => {
    const updatedItems = form.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setForm({
      ...form,
      items: updatedItems,
    });
  };

  const calculateTotal = () => {
    return form.items
      .reduce((total, item) => {
        const itemTotal = parseFloat(item.price) * parseFloat(item.quantity);
        return total + (isNaN(itemTotal) ? 0 : itemTotal);
      }, 0)
      .toFixed(2);
  };

  return (
    <>
      <Text className="text-lg font-bold mb-2">From :</Text>
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Company Name"
        value={form.companyName}
        onChangeText={(text) => setForm({ ...form, companyName: text })}
      />
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Name"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Address"
        value={form.address}
        onChangeText={(text) => setForm({ ...form, address: text })}
      />
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
      />
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Phone"
        keyboardType="numeric"
        value={form.phone}
        onChangeText={(text) => setForm({ ...form, phone: text })}
      />

      <Text className="text-lg font-bold mb-2">To :</Text>
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Name"
        value={form.customerName}
        onChangeText={(text) => setForm({ ...form, customerName: text })}
      />
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Address"
        value={form.customerAddress}
        onChangeText={(text) => setForm({ ...form, customerAddress: text })}
      />
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Email"
        value={form.customerEmail}
        onChangeText={(text) => setForm({ ...form, customerEmail: text })}
      />
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Phone"
        keyboardType="numeric"
        value={form.customerPhone}
        onChangeText={(text) => setForm({ ...form, customerPhone: text })}
      />

      <Text className="text-lg font-bold mb-2">Invoice Information</Text>
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Invoice Number"
        keyboardType="numeric"
        value={form.invoiceNumber}
        onChangeText={(text) => setForm({ ...form, invoiceNumber: text })}
      />
      <TextInput
        className="bg-white p-2 mb-2 border border-gray-300 rounded"
        placeholder="Date (YYYY-MM-DD)"
        value={form.date}
        onChangeText={(text) => setForm({ ...form, date: text })}
      />

      <Text className="text-lg font-bold mb-2">Items</Text>
      {form.items.map((item, index) => (
        <ItemRow
          key={index}
          item={item}
          index={index}
          onChange={updateItem}
          onRemove={removeItem}
        />
      ))}

      <TouchableOpacity
        className="bg-blue-500 p-2 rounded mb-4 w-32"
        onPress={addItem}
      >
        <Text className="text-white text-center text-lg">+ Add Item</Text>
      </TouchableOpacity>

      <View className="border-t border-gray-300 py-2 mb-4">
        <Text className="text-right text-lg font-bold">
          Total: ₹{calculateTotal()}
        </Text>
      </View>

      <TouchableOpacity
        className="bg-green-500 rounded p-4"
        onPress={CreateInvoice}
      >
        <Text className="text-white text-center text-lg">Create Invoice</Text>
      </TouchableOpacity>
    </>
  );
};

export default SellerInvoiceTemplate;
