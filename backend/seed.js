require('dotenv').config();
const mongoose = require('mongoose');
const Word = require('./models/Word');
const fs = require('fs');
const path = require('path');

const wordsFilePath = path.join(__dirname, 'words.json');
const wordsRaw = fs.readFileSync(wordsFilePath, 'utf-8');
const wordsArray = JSON.parse(wordsRaw);

const formattedWords = wordsArray.map(word =>{
    const normalized = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    return {
        word: word.toUpperCase(),
        normalized: normalized
    };
});

const dbUrl = process.env.DATABASE_URL;

const seedDatabase = async () => {
    console.log("Iniciando o script de seeding...");
    try {
        await mongoose.connect(dbUrl);
        console.log("Conectado ao banco de dados.");

        console.log("Limpando a coleção de palavras.");
        await Word.deleteMany({});

        console.log(`Inserindo ${formattedWords.length} palavras.`);
        await Word.insertMany(formattedWords);

        console.log("Banco de dados populado com sucesso.");
    } catch( error){
        console.error("Erro ao popular o banco de dados:", error);
    } finally {
        console.log("Desconectando do banco de dados...");
        await mongoose.disconnect();
    }
}

seedDatabase();