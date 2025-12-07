const Word = require('../models/Word');

exports.getWordOfTheDay = async (req, res) => {
    try{
        const randomWord = await Word.aggregate([{ $sample: { size: 1 } }]);
        
        if(!randomWord.length){
            return res.status(404).json({ message: "Nenhuma palavra encontrada." })
        }

        res.status(200).json(randomWord[0]);
    }   catch(error){
        console.error("Erro ao buscar a palavra do dia: ", error);
        res.status(500).json({message: "Erro interno do servidor."});
    }

}