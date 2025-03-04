function authMiddleware(req, res, next) {
  // Verificar se o usuário está autenticado
  if (req.session && req.session.userId) {
    // Se autenticado, permitir o acesso à rota
    next();
  } else {
    // Se não autenticado, retornar um erro
    res.status(401).json({ message: "Por favor, faça login primeiro!" });
  }
}

module.exports = authMiddleware;
