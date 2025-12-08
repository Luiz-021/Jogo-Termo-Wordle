const Word = require('../models/Word');

exports.getWordOfTheDay = async (req, res) => {
    try{
        const randomWord = await Word.aggregate([{ $sample: { size: 1 } }]);
        
        if(!randomWord.length){
            return res.status(404).json({ message: "Nenhuma palavra encontrada." })
        }

        res.status(200).json({word: randomWord[0].word});
    } catch (error) {
        console.error("Erro ao buscar a palavra do dia: ", error);
        res.status(500).json({message: "Erro interno do servidor."});
    }
};

exports.checkWordExistence = async (req, res) => {
    try {
        const { word } = req.body;

        if (!word) {
            return res.status(400).json({ isValid: false, message: "Palavra inválida" })
        }

        const inputNormalized = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        const foundWord = await Word.findOne({ normalized: inputNormalized });

        if (foundWord) {
            return res.json({
                isValid: true,
                correctWord: foundWord.word
            });
        } else {
            return res.json({ isValid: false });
        }

    } catch (error) {
        console.error("Erro na validação:", error);
        res.status(500).json({ error: "Erro interno ao validar" });
    }
};