import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';

const menuItems = [
  { id: '1', name: 'Coffee', price: 5, type: 'drink' },
  { id: '2', name: 'Tea', price: 3, type: 'drink' },
  { id: '3', name: 'Burger', price: 10, type: 'food' },
  { id: '4', name: 'Pizza', price: 12, type: 'food' },
  { id: '5', name: 'Juice', price: 4, type: 'drink' },
  { id: '6', name: 'Sandwich', price: 8, type: 'food' },
];

export default function OrderScreen({ route }) {
  const { role, name } = route.params; // Get the role and name from login
  const [selectedItems, setSelectedItems] = useState([]);

  const addItemToOrder = (item) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
  };

  const finalizeOrder = () => {
    if (selectedItems.length === 0) {
      Alert.alert('No items selected', 'Please select some items to order.');
    } else {
      const totalPrice = selectedItems.reduce((total, item) => total + item.price, 0);
      Alert.alert('Order placed successfully', `Total: $${totalPrice}`);
    }
  };

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => addItemToOrder(item)}>
        <Text style={styles.addButtonText}>Add to Order</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Hello ${name} (${role})`}</Text>
      <Text style={styles.subtitle}>Place Your Order</Text>

      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.orderSummary}>
        <Text style={styles.summaryTitle}>Your Order:</Text>
        {selectedItems.map((item, index) => (
          <Text key={index} style={styles.selectedItem}>
            {item.name} - ${item.price}
          </Text>
        ))}
      </View>

      <TouchableOpacity style={styles.finalizeButton} onPress={finalizeOrder}>
        <Text style={styles.finalizeButtonText}>Finalize Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0e6f6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4b0082',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#4b0082',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemName: {
    fontSize: 18,
    color: '#4b0082',
  },
  itemPrice: {
    fontSize: 16,
    color: '#4b0082',
  },
  addButton: {
    backgroundColor: '#4b0082',
    borderRadius: 5,
    padding: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orderSummary: {
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedItem: {
    fontSize: 16,
    color: '#4b0082',
  },
  finalizeButton: {
    marginTop: 30,
    backgroundColor: '#4b0082',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  finalizeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
