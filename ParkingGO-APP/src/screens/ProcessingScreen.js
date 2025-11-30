import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
// Requer a instalação da biblioteca para ícones
import Icon from 'react-native-vector-icons/Ionicons'; 

const ProcessingScreen = ({ navigation }) => {
    
  useEffect(() => {
    // 1. Simulação da Chamada à API de Pagamento/Reserva
    const processReservation = async () => {
      console.log('Iniciando processamento da reserva...');
      
      // Simula o tempo de latência da rede e do back-end (3 segundos)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // 2. Lógica para verificar o resultado da transação
      const transactionSuccess = Math.random() > 0.2; // 80% de chance de sucesso
      
      if (transactionSuccess) {
        // Em caso de sucesso: Navega para a tela de confirmação
        navigation.replace('ConfirmationScreen'); 
      } else {
        // Em caso de falha: Exibe um alerta e volta para a tela de reserva
        alert('❌ Falha na transação! Tente novamente ou verifique seu método de pagamento.');
        navigation.goBack(); 
      }
    };

    processReservation();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão de Voltar Desabilitado: NUNCA deve permitir que o usuário volte durante uma transação */}
      {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>...</TouchableOpacity> */}

      <View style={styles.content}>
        
        {/* Ícone de Carregamento */}
        <ActivityIndicator size="large" color="#003366" style={styles.loadingIndicator} />
        
        <Text style={styles.title}>CarrenganGo!</Text>
        <Text style={styles.subtitle}>Processando sua reserva e pagamento...</Text>
        <Text style={styles.warning}>Por favor, não feche o aplicativo.</Text>

      </View>
    </SafeAreaView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 30,
  },
  loadingIndicator: {
    transform: [{ scale: 1.5 }], // Aumenta um pouco o tamanho do indicador
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  warning: {
    fontSize: 14,
    color: '#E74C3C',
    fontWeight: 'bold',
  }
});

export default ProcessingScreen;