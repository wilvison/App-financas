const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Rota para salvar os dados da planilha (protegida por autenticação)
router.post('/salvar', authMiddleware, (req, res) => {
  // Lógica para salvar os dados da planilha
  // ...
  res.status(200).json({ message: 'Dados salvos com sucesso!' });
});

module.exports = router;
