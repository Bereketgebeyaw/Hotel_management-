import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('waiter'); // default

  const handleLogin = () => {
    if (!name || !password || !role) {
      Alert.alert("Please enter your name, password, and select a role.");
      return;
    }

    // Once logged in, navigate to the OrderScreen
    navigation.navigate('Order', { role, name });
  };


  navigation.navigate('Order', { role, name });


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Muluken Hotel Login</Text>
      
      {/* Role selection clarity */}
      <Text style={styles.subTitle}>Please choose your role</Text>

      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            role === 'waiter' && styles.selectedRole
          ]}
          onPress={() => setRole('waiter')}
        >
          <Text style={[
            styles.roleText,
            role === 'waiter' && styles.selectedRoleText
          ]}>
            Waiter
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleButton,
            role === 'cashier' && styles.selectedRole
          ]}
          onPress={() => setRole('cashier')}
        >
          <Text style={[
            styles.roleText,
            role === 'cashier' && styles.selectedRoleText
          ]}>
            Cashier
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0e6f6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: '#4b0082',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#4b0082',
    fontWeight: '500',
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  roleButton: {
    flex: 1,
    height: 60,
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4b0082',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedRole: {
    backgroundColor: '#4b0082',
  },
  roleText: {
    color: '#4b0082',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedRoleText: {
    color: '#fff',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4b0082',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
