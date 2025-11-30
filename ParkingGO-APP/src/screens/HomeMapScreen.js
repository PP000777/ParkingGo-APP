import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
// Requer a instalação da biblioteca:
// npm install react-native-maps
import MapView, { Marker } from 'react-native-maps'; 
// Requer a instalação da biblioteca para ícones
// npm install react-native-vector-icons
import Icon from 'react-native-vector-icons/Ionicons'; 

// Dados de exemplo para simular estacionamentos (o backend ParkinGOV2 forneceria isso)
const mockParkingSpots = [
  { id: 1, name: "Continente Shopping", latitude: -27.600, longitude: -48.590, status: 'CHEIO', available: 12 },
  { id: 2, name: "Estacionamento Central", latitude: -27.595, longitude: -48.600, status: 'LIVRE', available: 50 },
  // ... mais spots
];

const HomeMapScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Localização inicial (exemplo: Florianópolis/SC)
  const initialRegion = {
    latitude: -27.600, 
    longitude: -48.580,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleSearch = () => {
    // 1. Lógica de busca de estacionamentos baseada em 'searchQuery'
    console.log('Buscando por:', searchQuery);
    // 2. Se a busca for bem-sucedida, atualiza o mapa e possivelmente uma lista de resultados.
  };

  const handleMarkerPress = (spot) => {
    // Ao clicar no marcador, abre o card de pré-visualização ou navega para detalhes.
    // navigation.navigate('ParkingDetail', { spotId: spot.id });
    console.log('Marcador pressionado:', spot.name);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão de Voltar (pode ser substituído por um ícone de Menu se for a tela principal logada) */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>{'<--'}</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Onde vamos reservar?</Text>

        {/* Campo de Busca */}
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </View>
        <Text style={styles.searchHint}>Selecione estado, cidade ou bairro</Text>
      </View>

      {/* Área do Mapa */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={true} // Mostrar a localização do usuário
        >
          {/* Adiciona marcadores para os estacionamentos de exemplo */}
          {mockParkingSpots.map(spot => (
            <Marker
              key={spot.id}
              coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
              title={spot.name}
              description={`Vagas: ${spot.available}`}
              onPress={() => handleMarkerPress(spot)}
            />
          ))}
          
        </MapView>
        {/* Aqui é onde o Card de Estacionamento (Tela 7) apareceria ao tocar em um marcador */}
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
  backButton: {
    padding: 15,
  },
  backText: {
    fontSize: 20,
    color: '#333',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  searchHint: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    marginLeft: 15,
    marginBottom: 10,
  },
  mapContainer: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden', // Para respeitar o borderRadius
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default HomeMapScreen;