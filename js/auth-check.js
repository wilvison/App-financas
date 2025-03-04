function checkAuthentication() {
  // Verifica se o usuário está autenticado (ex: verifica a existência de um token)
  const token = localStorage.getItem('token'); // ou sessionStorage.getItem('token')

  if (!token) {
    // Se não houver token, redireciona para a página de login ou exibe uma mensagem
    alert('Por favor, faça login primeiro.'); // Ou redirecione para a página de login: window.location.href = '/login';
    return false; // Indica que o usuário não está autenticado
  }

  return true; // Indica que o usuário está autenticado
}
