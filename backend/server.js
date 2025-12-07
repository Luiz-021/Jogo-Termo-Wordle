const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const wordRoutes = require('./routes/wordRoutes');

const app = express();

const PORT = process.env.PORT || 3001;

app.use('/api/words', wordRoutes);

app.get('/api', (req, res) => { 
    res.json({ message: "Hello someone from anywhere!" })
});

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error("Erro: A variável de ambiente DATABASE_URL não está definida.");
  process.exit(1);
}

mongoose.connect(dbUrl)
  .then(() => {
    console.log("Sucesso conectando-se ao MongoDB Atlas.");
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Não foi possível conectar ao MongoDB Atlas.");
    console.error(err);
  });