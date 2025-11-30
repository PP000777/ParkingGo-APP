import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';

const ResetPasswordScreen = ({ navigation, route }) => {
  // Recebe o email da tela anterior
  const { userEmail } = route.params || {};

  const [code, setCode] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Refs para controle de foco nos campos de código
  const codeInputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Mudar o foco automaticamente para o próximo campo
    if (text && index < 3) {
      codeInputs[index + 1].current.focus();
    }
  };

  const handleResetPassword = () => {
    const verificationCode = code.join('');

    if (verificationCode.length !== 4) {
        Alert.alert('Erro', 'Por favor, insira o código completo.');
        return;
    }
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Erro', 'As novas senhas não coincidem!');
      return;
    }
    
    // 1. Lógica de CHAMADA à API para validar o código e redefinir a senha
    console.log('Redefinindo senha para:', userEmail, 'com código:', verificationCode);
    
    // 2. Em caso de sucesso:
    // navigation.navigate('Login'); // Volta para o login
    Alert.alert('Sucesso', 'Sua senha foi redefinida com sucesso!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>{'<--'}</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>Redefinir Senha</Text>
        
        <Text style={styles.instructionText}>
          Enviamos um código para o seu email. Por favor verifique sua caixa de entrada ou spam
        </Text>

        {/* Campos de Entrada de Código */}
        <View style={styles.codeInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={codeInputs[index]}
              style={styles.codeInput}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        <TouchableOpacity onPress={() => console.log('Reenviando código para:', userEmail)} style={styles.resendButton}>
          <Text style={styles.resendText}>Não recebeu o código? Reenviar</Text>
        </TouchableOpacity>

        {/* Campos da Nova Senha */}
        <TextInput
          style={styles.input}
          placeholder="Nova Senha"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Nova Senha"
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>REDEFINIR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Estilos
const styles = StyleSheet.create({
  // ... (Reutilizar styles.container, styles.backButton, styles.backText)
  container: { flex: 1, backgroundColor: '#F5F5E5' },
  backButton: { padding: 15 },
  backText: { fontSize: 20, color: '#333' },
  card: {
    margin: 20,
    marginTop: 50,
    padding: 30,
    borderRadius: 20,
    backgroundColor: 'lightblue',
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
    marginBottom: 20,
  },
  instructionText: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
    lineHeight: 20,
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  codeInput: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    fontSize: 20,
  },
  resendButton: {
    marginBottom: 30,
  },
  resendText: {
    color: '#003366',
    textDecorationLine: 'underline',
  },
  input: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResetPasswordScreen;