import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';

const RecoverPasswordEmailScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSendEmail = () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira seu e-mail.');
      return;
    }
    
    // 1. Lógica de CHAMADA à API (ParkinGOV2) para enviar o código por e-mail.
    console.log('Solicitando código de recuperação para:', email);

    // 2. Em caso de sucesso da API, navega para a próxima tela, passando o e-mail:
    navigation.navigate('VerifyCode', { userEmail: email });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Ícone de Voltar */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>{'<--'}</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>Qual seu email?</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Estilos reutilizados e adaptados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5E5',
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
    marginTop: 100,
    padding: 30,
    borderRadius: 20,
    backgroundColor: 'lightblue',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 40,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RecoverPasswordEmailScreen;