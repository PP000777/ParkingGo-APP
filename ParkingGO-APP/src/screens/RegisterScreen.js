// Arquivo: src/screens/RegisterScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { registerUser } from '../api/auth'; // Importe sua função da API

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Novo estado para carregamento

  const handleRegister = async () => {
    console.log('--- Botão CADASTRAR pressionado. Iniciando validação. ---'); 
    
    // 1. Validação de Campos
    if (!username || !email || !password || !confirmPassword) {
        Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }
    
    setIsLoading(true); // Inicia o estado de carregamento

    try {
        // 2. CHAMA A FUNÇÃO DA API
        const result = await registerUser(username, email, password);

        if (result.success) {
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso! Bem-vindo(a) ao Parking Go!');
            // Navega para a tela principal (HomeMap)
            navigation.navigate('HomeMap'); 
        } else {
            // Exibe a mensagem de erro da API
            Alert.alert('Erro ao Cadastrar', result.error);
        }
    } catch (error) {
        // Erro de rede ou erro inesperado
        Alert.alert('Erro Grave', 'Não foi possível conectar ao servidor. Tente novamente.');
    } finally {
        setIsLoading(false); // Finaliza o estado de carregamento, mesmo em caso de erro
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ... Botão de Voltar ... */}

      <View style={styles.card}>
        <Text style={styles.title}>Cadastro</Text>
        {/* ... Seus Inputs (username, email, password, confirmPassword) ... */}

        <TextInput
          style={styles.input}
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        {/* Seus outros inputs... */}
        
        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>CADASTRAR</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ... Seus estilos (styles) ...

export default RegisterScreen;