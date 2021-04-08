//Módulos:
const colors = require ('colors')
const express = require ('express')
const { Sequelize, DataTypes } = require ('sequelize')

//Especificação da BD:
const app = express ();
const sequelize = new Sequelize ({
    dialect: 'sqlite',
    storage:'./task-list.db'
});

//Chamando o modelo e fazendo a conexão com a BD:
const Task = require ('./models/task')
const tasks = Task ( sequelize, DataTypes)

// We need to parse JSON coming from requests
// app.use(express.json()) //PARA QUE ISSO??


app.get('', (req, res) =>{
    res.send ('<h1>Página principal</h1>')
})

//Mostrar todas as tarefas
app.get('/tasks', async (req, res) =>{
    
    const tarefas = await tasks.findAll()
    res.send (tarefas) //funciona igual
    // res.json ({ action: tarefas })
})

//POR ID:
app.get('/tasks/:id', async (req, res) =>{
    
    const tarefa_ID = req.params.id //Aqui tô pegando o parametro id da requisição app.get('/tasks/:id'... [os dois pontos chutam esse parametro para o "params"]
    const tarefa = await tasks.findByPk(tarefa_ID)
    res.json({ action: tarefa })
})



app.listen (5200, () => {
    console.log('Server funcionando no porto 5200'. rainbow)
})