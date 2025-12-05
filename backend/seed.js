require('dotenv').config();
const mongoose = require('mongoose');
const Word = require('./models/Word');

const wordList = [
  { word: "SAGAZ" },
  { word: "AMIGO" },
  { word: "EXPOR" },
  { word: "TERMO" },
  { word: "NOBRE" },
  { word: "AFETO" },
  { word: "PLENA" },
  { word: "FAVOR" },
  { word: "IDEIA" },
  { word: "GENRO" }
];

const dbUrl = process.env.DATABASE_URL;

const seedDatabase = async () => {
    console.log("Iniciando o script de seeding...");
    try {
        await mongoose.connect(dbUrl);
        console.log("Conectado ao banco de dados.");

        console.log("Limpando a coleção de palavras...");
        await Word.deleteMany({});

        console.log("Inserindo novas palavras...");
        await Word.insertMany(wordList);

        console.log("Banco de dados populado com sucesso!");
    } catch( error){
        console.error("Erro ao popular o banco de dados:", error);
    } finally {
        console.log("Desconectando do banco de dados...");
        await mongoose.disconnect();
    }
}

seedDatabase();