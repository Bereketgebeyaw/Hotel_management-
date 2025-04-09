import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// Mock data - this will later come from your backend
const mockOrders = [
  {
    id: '1',
    waiterName: 'Abebe',
    items: [
      { name: 'Coffee', price: 5 },
      { name: 'Sandwich', price: 8 },
    ],
    total: 13,
    status: 'pending',
  },
  {
    id: '2',
    waiterName: 'Kebede',
    items: [
      { name: 'Pizza', price: 12 },
    ],
    total: 12,
    status: 'pending',
  },
];

export default function CashierScreen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // In real app, fetch orders from backend
    setOrders(mockOrders);
  }, []);

  const handleAccept = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: 'accepted' } : order
      )
    );
  };

  const handleDecline = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: 'declined' } : order
      )
    );
  };

  const renderOrder = ({ item }) => (
    <View style={[styles.orderCard, getBorderStyle(item.status)]}>
      <Text style={styles.waiterText}>Waiter: {item.waiterName}</Text>
      {item.items.map((i, idx) => (
        <Text key={idx} style={styles.itemText}>- {i.name} (${i.price})</Text>
      ))}
      <Text style={styles.totalText}>Total: ${item.total}</Text>
      <Text style={styles.statusText}>Status: {item.status}</Text>

      {item.status === 'pending' && (
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.acceptButton} onPress={() => handleAccept(item.id)}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.declineButton} onPress={() => handleDecline(item.id)}>
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const getBorderStyle = (status) => {
    switch (status) {
      case 'accepted':
        return { borderLeftColor: 'green' };
      case 'declined':
        return { borderLeftColor: 'red' };
      default:
        return { borderLeftColor: 'orange' };
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders from Waiters</Text>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f0fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#4b0082',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    borderLeftWidth: 5,
  },
  waiterText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b0082',
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  totalText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4b0082',
  },
  statusText: {
    marginTop: 5,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  declineButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
