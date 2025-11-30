import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de autenticação com o backend (API ParkinGOV2)
    console.log('Tentativa de Login:', email);
    // Em caso de sucesso: navigation.navigate('HomeMap');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Ícone de Voltar (Pode ser um componente de biblioteca como react-native-vector-icons) */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>{'<--'}</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity onPress={() => navigation.navigate('RecoverPassword')}>
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Estilos básicos (baseados nas cores azuis do seu design)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5E5', // Fundo claro
  },
  backButton: {
    padding: 15,
  },
  backText: {
    fontSize: 20,
    color: '#333',
  },
  card: {
    margin: 20,
    marginTop: 50,
    padding: 30,
    borderRadius: 20,
    backgroundColor: 'lightblue', // Gradiente simulado com cor sólida
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  forgotPasswordText: {
    color: '#003366',
    textAlign: 'right',
    width: '100%',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#003366',
    fontSize: 14,
  }
});

export default LoginScreen;