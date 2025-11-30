import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
// Requer a instalação da biblioteca para ícones
// npm install react-native-vector-icons
import Icon from 'react-native-vector-icons/Ionicons'; 

const ConfigsScreen = ({ navigation }) => {
  
  // Array que define as opções do menu de navegação
  const configOptions = [
    { name: "Conta", icon: "person-circle-outline", screen: "AccountDetails" },
    { name: "Contas Vinculadas", icon: "link-outline", screen: "LinkedAccounts" },
    { name: "Senha e Segurança", icon: "lock-closed-outline", screen: "SecuritySettings" },
    { name: "Pagamentos", icon: "card-outline", screen: "PaymentMethods" },
    { name: "Transações", icon: "receipt-outline", screen: "TransactionsHistory" },
    { name: "Assinaturas (PLUS+)", icon: "star-outline", screen: "SubscriptionPlans" },
  ];

  const renderOption = (item) => (
    <TouchableOpacity 
      key={item.name} 
      style={styles.optionButton} 
      onPress={() => navigation.navigate(item.screen)}
    >
      <View style={styles.optionContent}>
        <Icon name={item.icon} size={24} color="#003366" style={styles.optionIcon} />
        <Text style={styles.optionText}>{item.name}</Text>
      </View>
      <Icon name="chevron-forward-outline" size={20} color="#888" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Informações da Conta (Simulação da Sub-Tela, mas resumida) */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Informações da Conta</Text>
          <Text style={styles.infoText}>ID: Cbkb134huinU32nwe3</Text>
          <Text style={styles.infoText}>Nome: Usuário de Exemplo</Text>
          <Text style={styles.infoText}>Email: email@gmail.com</Text>
        </View>

        {/* Menu de Configurações */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuHeader}>Gerenciamento</Text>
          {configOptions.map(renderOption)}
        </View>

        {/* Detalhes Pessoais (Link para edição) */}
        <TouchableOpacity style={styles.detailsLink} onPress={() => navigation.navigate('EditDetails')}>
          <Text style={styles.cardTitle}>Detalhes Pessoais</Text>
          <Icon name="create-outline" size={20} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.policyText}>
          Gerencie seu nome e informações de contato. Essas informações pessoais são privadas e não serão exibidas para outros usuários. Veja nossa <Text style={{textDecorationLine: 'underline'}}>Política de Privacidade</Text>.
        </Text>

      </ScrollView>
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
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backButton: {
    paddingRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContent: {
    padding: 20,
  },
  // --- Info Card (Topo) ---
  infoCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#007AFF', // Cor de destaque
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  // --- Menu de Configurações ---
  menuContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden', // Para que o border-radius funcione com separadores
  },
  menuHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
    padding: 15,
    backgroundColor: '#F9F9F9',
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  // --- Detalhes Pessoais Link ---
  detailsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 5,
  },
  policyText: {
    fontSize: 12,
    color: '#888',
    lineHeight: 18,
  }
});

export default ConfigsScreen;