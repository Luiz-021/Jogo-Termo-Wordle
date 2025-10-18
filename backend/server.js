const express = require('express');

const app = express();

const PORT = process.env.PORT || 3001;

app.get('/api', (req,res) => { 
    res.json({message:"Hello someone from anywhere!"})
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})