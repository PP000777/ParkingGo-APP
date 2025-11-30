// Arquivo: src/api/auth.js

const API_BASE_URL = 'https://parkingov2-hgge.onrender.com'; // <-- IMPORTANTE: Use o endereço real do seu backend!

export const registerUser = async (username, email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username, // Se o seu backend espera este campo
                email,
                password,
                // Adicione outros campos que seu backend espera (ex: confirmPassword, nome completo, etc.)
            }),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, user: data.user, token: data.token };
        } else {
            // Se o status HTTP não for 2xx
            return { success: false, error: data.message || 'Falha no cadastro.' };
        }
    } catch (error) {
        console.error("Erro na comunicação com a API de Cadastro:", error);
        return { success: false, error: 'Erro de rede. Verifique sua conexão.' };
    }
};