//Módulos:
const colors = require ('colors')
const express = require ('express')

const app = express ()


app.get('', (req, res) =>{
    res.send ('<h1>Página Principal!</h1>')
})


app.listen (5200, () => {
    console.log('Server funcionando no porto 5200'. rainbow)
})