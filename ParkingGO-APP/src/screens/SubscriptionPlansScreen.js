import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const subscriptionPlans = [
  { 
    id: 'free', 
    name: 'FREE', 
    price: 'R$ 0,00 / mês', 
    description: 'Acesso básico e buscas limitadas.',
    benefits: [
      'Busca de estacionamentos', 
      'Informação de fluxo de vagas (CHEIO/LIVRE)', 
      'Suporte padrão'
    ] 
  },
  { 
    id: 'vip', 
    name: 'VIP', 
    price: 'R$ 19,90 / mês', 
    description: 'Acesso a detalhes em tempo real e descontos.',
    benefits: [
      'Tudo do Plano FREE', 
      'Visualização da quantidade de vagas disponíveis (Ex: 12 Vagas)', 
      '5% de desconto em todas as reservas', 
      'Alertas de baixa disponibilidade'
    ] 
  },
  { 
    id: 'mvp_plus', 
    name: 'MVP+', 
    price: 'R$ 39,90 / mês', 
    description: 'Experiência completa com reservas prioritárias.',
    benefits: [
      'Tudo do Plano VIP', 
      'Reservar vaga diretamente pelo mapa (Ação Rápida)', 
      '10% de desconto em todas as reservas', 
      'Suporte prioritário 24/7'
    ] 
  },
];

const SubscriptionPlansScreen = ({ navigation }) => {
  const [selectedPlanId, setSelectedPlanId] = useState('vip'); // Plano VIP como padrão inicial (simulando destaque na imagem)
  const selectedPlan = subscriptionPlans.find(p => p.id === selectedPlanId);

  // Componente para renderizar os botões de plano
  const PlanButton = ({ plan }) => {
    const isSelected = plan.id === selectedPlanId;
    return (
      <TouchableOpacity 
        style={[styles.planButton, isSelected ? styles.planButtonSelected : styles.planButtonDefault]}
        onPress={() => setSelectedPlanId(plan.id)}
      >
        <Text style={[styles.planText, isSelected ? styles.planTextSelected : styles.planTextDefault]}>
          {plan.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleSubscribe = () => {
    if (selectedPlanId === 'free') {
      alert('Seu plano FREE está ativo!');
      navigation.goBack(); // Volta para a tela de configurações
    } else {
      // Lógica de navegação para a tela de pagamento e checkout
      console.log(`Iniciando checkout para o plano: ${selectedPlan.name}`);
      // navigation.navigate('PaymentCheckout', { plan: selectedPlan });
      alert(`Você será redirecionado para o checkout do plano ${selectedPlan.name}.`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>{'<--'}</Text>
      </TouchableOpacity>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.mainTitle}>ESCOLHA O MELHOR PLANO PARA VOCÊ</Text>

        {/* --- Seleção de Botões --- */}
        <View style={styles.planSelectionContainer}>
          {subscriptionPlans.map(plan => <PlanButton key={plan.id} plan={plan} />)}
        </View>

        {/* --- Detalhes do Plano Selecionado --- */}
        {selectedPlan && (
          <View style={styles.detailsCard}>
            <Text style={styles.detailTitle}>{selectedPlan.name}</Text>
            <Text style={styles.detailPrice}>{selectedPlan.price}</Text>
            <Text style={styles.detailDescription}>{selectedPlan.description}</Text>

            <View style={styles.benefitsContainer}>
              <Text style={styles.benefitsHeader}>O que está incluído:</Text>
              {selectedPlan.benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <Icon name="checkmark-circle" size={18} color="#2ECC71" />
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* --- Botão de Ação --- */}
        <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
          <Text style={styles.subscribeButtonText}>
            {selectedPlanId === 'free' ? 'PLANO FREE ATUAL' : `ASSINAR ${selectedPlan.name}`}
          </Text>
        </TouchableOpacity>

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
  backButton: {
    padding: 15,
  },
  backText: {
    fontSize: 20,
    color: '#333',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 30,
    textAlign: 'center',
  },
  // --- Botões de Seleção de Plano ---
  planSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  planButton: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  planButtonDefault: {
    borderColor: '#CCC',
    backgroundColor: '#FFF',
  },
  planButtonSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#99CCFF', // Simula o gradiente azul claro
  },
  planText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  planTextDefault: {
    color: '#333',
  },
  planTextSelected: {
    color: '#003366',
  },
  // --- Detalhes do Plano ---
  detailsCard: {
    backgroundColor: '#FFF',
    width: '100%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 30,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
  },
  detailPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ECC71',
    marginVertical: 5,
  },
  detailDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  benefitsContainer: {
    marginTop: 10,
  },
  benefitsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#555',
  },
  // --- Botão de Ação ---
  subscribeButton: {
    backgroundColor: '#003366',
    padding: 18,
    borderRadius: 30,
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
  },
  subscribeButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SubscriptionPlansScreen;