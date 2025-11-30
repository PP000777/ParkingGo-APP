// Arquivo: App.js (na raiz do projeto)

import React from 'react';
import AppRouter from './src/navigation/AppRoutes'; // Ajuste o caminho conforme sua estrutura

function App() {
  // Renderiza o componente que contém toda a lógica de navegação.
  return <AppRouter />;
}

export default App;