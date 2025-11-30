import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
// Requer a instalação da biblioteca para ícones
import Icon from 'react-native-vector-icons/Ionicons'; 

// Importar uma biblioteca de QR Code (Exemplo: react-native-qrcode-svg)
// import QRCode from 'react-native-qrcode-svg'; 

// Dados Mock da reserva confirmada (normalmente viria da rota.params)
const mockReservationData = {
  parkingName: 'Estacionamento Central Park',
  address: 'Rua das Flores, 123 - Centro',
  entryTime: '29/11/2025 às 14:00',
  exitTime: '29/11/2025 às 16:00',
  reservationCode: 'PKG-7845-AB23',
  qrCodeValue: '{"code": "PKG-7845-AB23", "user": "user_id_123"}',
  totalPaid: 17.00
};

const ConfirmationScreen = ({ navigation }) => {
  
  const handleGoHome = () => {
    // Retorna para a tela principal (Mapa/Busca)
    navigation.popToTop(); 
    // Ou navigation.navigate('HomeMap');
  };
  
  const handleAddToCalendar = () => {
      alert('Funcionalidade: Adicionar evento ao calendário nativo.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Icon name="checkmark-circle" size={80} color="#2ECC71" style={styles.successIcon} />
        <Text style={styles.mainTitle}>RESERVA CONFIRMADA!</Text>
        <Text style={styles.subtitle}>Seu acesso está pronto para uso.</Text>

        {/* --- Detalhes da Reserva --- */}
        <View style={styles.detailCard}>
          <Text style={styles.parkingName}>{mockReservationData.parkingName}</Text>
          <Text style={styles.detailText}><Icon name="location-outline" size={16} color="#666" /> {mockReservationData.address}</Text>
          <Text style={styles.detailText}><Icon name="time-outline" size={16} color="#666" /> Entrada: {mockReservationData.entryTime}</Text>
          <Text style={styles.detailText}><Icon name="time-outline" size={16} color="#666" /> Saída: {mockReservationData.exitTime}</Text>
          <Text style={styles.detailText}><Icon name="wallet-outline" size={16} color="#666" /> Pago: R$ {mockReservationData.totalPaid.toFixed(2)}</Text>
        </View>

        {/* --- Área de Acesso (QR Code) --- */}
        <View style={styles.qrCodeArea}>
          <Text style={styles.qrCodeLabel}>Apresente este código na entrada:</Text>
          
          {/* Simulação do QR Code - Use a biblioteca real aqui */}
          <View style={styles.qrCodePlaceholder}>
            {/* <QRCode
                value={mockReservationData.qrCodeValue}
                size={200}
                color="black"
                backgroundColor="white"
              /> 
            */}
            <Text style={{fontSize: 16}}> [Placeholder do QR CODE] </Text>
          </View>
          
          <Text style={styles.reservationCode}>CÓDIGO: {mockReservationData.reservationCode}</Text>
        </View>

        {/* --- Botões de Ação --- */}
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('HomeMap')}>
          <Icon name="map-outline" size={20} color="#003366" />
          <Text style={styles.actionButtonText}> Ver no Mapa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleAddToCalendar}>
          <Icon name="calendar-outline" size={20} color="#003366" />
          <Text style={styles.actionButtonText}> Adicionar ao Calendário</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Botão Principal de Finalização */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
          <Text style={styles.homeButtonText}>VOLTAR AO INÍCIO</Text>
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
  scrollContent: {
    padding: 25,
    alignItems: 'center',
  },
  successIcon: {
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  // --- Detalhes da Reserva ---
  detailCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 30,
    borderLeftWidth: 5,
    borderLeftColor: '#2ECC71',
  },
  parkingName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  // --- QR Code ---
  qrCodeArea: {
    alignItems: 'center',
    marginBottom: 40,
  },
  qrCodeLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  qrCodePlaceholder: {
    width: 220,
    height: 220,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCC',
    marginBottom: 15,
  },
  reservationCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  // --- Botões de Ação ---
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 30,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#003366',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#003366',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  // --- Footer ---
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#FFF',
  },
  homeButton: {
    backgroundColor: '#003366',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default ConfirmationScreen;