//Módulos:
const colors = require ('colors')
const express = require ('express')
const { Sequelize, DataTypes } = require ('sequelize')


const app = express ();
const sequelize = new Sequelize ({
    dialect: 'sqlite',
    storage:'./task-list.db'
});




app.get('', (req, res) =>{
    res.send ('<h1>Página Principal!</h1>')
})

app.get('/task', (req, res) =>{

})


app.listen (5200, () => {
    console.log('Server funcionando no porto 5200'. rainbow)
})