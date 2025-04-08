import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';

const menuItems = [
  { id: '1', name: 'Coffee', price: 5, type: 'drink' },
  { id: '2', name: 'Tea', price: 3, type: 'drink' },
  { id: '3', name: 'Burger', price: 10, type: 'food' },
  { id: '4', name: 'Pizza', price: 12, type: 'food' },
  { id: '5', name: 'Juice', price: 4, type: 'drink' },
  { id: '6', name: 'Sandwich', price: 8, type: 'food' },
];

export default function OrderScreen({ route }) {
  const { role, name } = route.params;
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
      <View>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => addItemToOrder(item)}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );

  const filteredItems = menuItems.filter((item) => item.type === selectedCategory);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Hello ${name} (${role})`}</Text>

      {!selectedCategory ? (
        <>
          <Text style={styles.subtitle}>Select Category</Text>
          <View style={styles.categoryContainer}>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => setSelectedCategory('drink')}
            >
              <Text style={styles.categoryText}>Drinks</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => setSelectedCategory('food')}
            >
              <Text style={styles.categoryText}>Foods</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.headerWithBack}>
            <TouchableOpacity onPress={() => setSelectedCategory(null)} style={styles.topBackButton}>
              <Text style={styles.topBackButtonText}>← Back to Categories</Text>
            </TouchableOpacity>
            <Text style={styles.sectionHeader}>
              {selectedCategory === 'drink' ? 'Drinks Menu' : 'Foods Menu'}
            </Text>
          </View>

          <FlatList
            data={filteredItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id}
          />
        </>
      )}

      {selectedItems.length > 0 && (
        <View style={styles.orderSummary}>
          <Text style={styles.summaryTitle}>Selected Items:</Text>
          {selectedItems.map((item, index) => (
            <Text key={index} style={styles.selectedItem}>
              {item.name} - ${item.price}
            </Text>
          ))}
        </View>
      )}

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
    backgroundColor: '#f4f0fa',
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
    marginBottom: 15,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#4b0082',
    padding: 15,
    borderRadius: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  categoryText: {
    color: '#fff',
    fontSize: 18,
  },
  headerWithBack: {
    marginBottom: 10,
  },
  topBackButton: {
    marginBottom: 8,
    backgroundColor: '#e0d6f8',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  topBackButtonText: {
    color: '#4b0082',
    fontSize: 16,
    fontWeight: '500',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4b0082',
    marginBottom: 10,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  itemName: {
    fontSize: 18,
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
  },
  addButton: {
    backgroundColor: '#4b0082',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orderSummary: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b0082',
    marginBottom: 10,
  },
  selectedItem: {
    fontSize: 16,
    color: '#4b0082',
  },
  finalizeButton: {
    marginTop: 20,
    backgroundColor: '#4b0082',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  finalizeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
