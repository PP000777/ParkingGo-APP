import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';
// Requer a instalação da biblioteca para ícones
import Icon from 'react-native-vector-icons/Ionicons'; 
// OBS: Para uma experiência real, você precisaria de um componente de data/hora como @react-native-community/datetimepicker

// Dados Mock (simulando que a tela recebeu o ID do estacionamento)
const mockParkingData = {
  name: 'Continente Shopping',
  pricePerHour: 8.50, // Exemplo de tarifa
  accepts: ['Visa', 'Mastercard', 'ApplePay'],
  illustration: 'URL_DA_ILUSTRACAO_CARRO', // Substituir por require('./path/to/image.png')
};

const ReservationScreen = ({ navigation, route }) => {
  const parkingId = route.params?.parkingId || 1; // ID real do estacionamento
  const [entryTime, setEntryTime] = useState(new Date(Date.now() + 3600000)); // Simula entrada daqui a 1 hora
  const [exitTime, setExitTime] = useState(new Date(Date.now() + 7200000)); // Simula saída daqui a 2 horas
  const [totalValue, setTotalValue] = useState(0);

  // Função para calcular o valor total
  const calculateTotal = () => {
    const durationMs = exitTime.getTime() - entryTime.getTime();
    if (durationMs <= 0) {
      setTotalValue(0);
      return;
    }
    
    // Simplesmente calcula as horas e multiplica pela tarifa
    const durationHours = durationMs / (1000 * 60 * 60);
    const calculatedValue = durationHours * mockParkingData.pricePerHour;
    
    setTotalValue(calculatedValue.toFixed(2));
  };

  useEffect(() => {
    calculateTotal();
  }, [entryTime, exitTime]);
  
  // Função que seria chamada para abrir o seletor de data/hora
  const showTimePicker = (isEntry) => {
    // Aqui você integraria um componente como DateTimePicker para escolher a hora.
    alert(`Abrindo seletor para Hora de ${isEntry ? 'Entrada' : 'Saída'}`);
    // Após a seleção, chame setEntryTime ou setExitTime com a nova data.
  };

  const handleReservation = () => {
    if (totalValue <= 0) {
      alert('Selecione um horário de saída posterior ao de entrada.');
      return;
    }
    // 1. Enviar dados de reserva para o back-end (ParkinGOV2)
    console.log('Reservando:', mockParkingData.name, 'Valor:', totalValue);

    // 2. Navegar para a tela de Carregamento/Processamento
    navigation.navigate('ProcessingScreen'); 
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Parking Go!</Text>
        <View style={{ width: 24 }} /> {/* Espaçador */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Card de Reserva */}
        <View style={styles.reservationCard}>
          <View>
            <Text style={styles.cardTitle}>Horários:</Text>
            
            {/* Seletor de Hora de Entrada */}
            <TouchableOpacity style={styles.timeSelector} onPress={() => showTimePicker(true)}>
              <Text style={styles.selectorText}>Entrada: {formatTime(entryTime)}</Text>
              <Icon name="chevron-down" size={20} color="#333" />
            </TouchableOpacity>

            {/* Seletor de Hora de Saída */}
            <TouchableOpacity style={styles.timeSelector} onPress={() => showTimePicker(false)}>
              <Text style={styles.selectorText}>Saída: {formatTime(exitTime)}</Text>
              <Icon name="chevron-down" size={20} color="#333" />
            </TouchableOpacity>

            <View style={styles.valueSection}>
              <Text style={styles.cardTitle}>Valor:</Text>
              <Text style={styles.totalValueText}>R$ {totalValue}</Text>
            </View>

            <View style={styles.paymentIcons}>
              {/* Ícones de pagamento (Simulados) */}
              {mockParkingData.accepts.map((method, index) => (
                <Text key={index} style={styles.paymentText}>{method} | </Text> 
              ))}
            </View>
          </View>

          {/* Ilustração (Substitua pela imagem real) */}
          <View style={styles.imagePlaceholder}>
            <Text> [Imagem da Vaga] </Text>
          </View>
        </View>
        
      </ScrollView>

      {/* Botão de Ação (Fixo na parte inferior) */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleReservation}>
          <Text style={styles.confirmButtonText}>CONFIRMAR RESERVA (R$ {totalValue})</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5E5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#99CCFF', // Cor do cabeçalho
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  reservationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  timeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    padding: 10,
    borderRadius: 8,
    width: 150,
    marginBottom: 15,
  },
  selectorText: {
    fontSize: 14,
    color: '#333',
  },
  valueSection: {
    marginTop: 10,
  },
  totalValueText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  paymentIcons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  paymentText: {
    fontSize: 12,
    color: '#555',
  },
  imagePlaceholder: {
    flex: 1,
    height: 200,
    backgroundColor: '#EEE',
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // --- Footer e Botão de Ação ---
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#FFF',
  },
  confirmButton: {
    backgroundColor: '#003366',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default ReservationScreen;