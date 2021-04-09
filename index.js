//Módulos:
const colors = require ('colors')
const express = require ('express')
const { Sequelize, DataTypes } = require ('sequelize');
const task = require('./models/task');

//Especificação da BD:
const app = express ();
const sequelize = new Sequelize ({
    dialect: 'sqlite',
    storage:'./task-list.db'
});

//Chamando o modelo e fazendo a conexão com a BD:
const Task = require ('./models/task')
const tasks = Task ( sequelize, DataTypes)

// Para analisar os JSON provenientes das requisições (Sem isso não tem como interpretar o que chega)
app.use(express.json()) 

//Página Principal
app.get('', (req, res) =>{
    res.send ('<h1>Página principal</h1>')
})

//GET Mostrar todas as tarefas
app.get('/tasks', async (req, res) =>{    
    const tarefas = await tasks.findAll()
    res.json ({ tarefas })
    // res.send (tarefas) //funciona igual
    // res.json ({ action: tarefas })
})

//GET Mostrar UMA determinada tarefa por ID:
app.get('/tasks/:id', async (req, res) =>{
    const tarefa_ID = req.params.id //Aqui tô pegando o parametro id da requisição app.get('/tasks/:id'... [os dois pontos chutam esse parametro para o "params"]
    const tarefa = await tasks.findByPk(tarefa_ID)
    res.json({ tarefa })
})

//POST Criar tarefas:
app.post('/tasks', async (req, res) =>{
    const body = req.body
    const nova_tarefa = await tasks.create({
        description: body.description,
        done: body.done
    })
    res.json({ nova_tarefa })
})

//PUT Atualizar uma determinada tarefa (uso de try catch para pegar os erros e que não fique carregando):
app.put('/tasks/:id', async (req, res) =>{
    try{
        const tarefa_ID = req.params.id
        const body = req.body
        const tarefa = await tasks.findByPk(tarefa_ID)
        tarefa.update({
            description: body.description,
            done: body.done
        });        
        res.send({ action: 'Atualizando tarefa', tarefa: tarefa })
    } catch (error) {
        return res.send( `<h1>Esta é uma mensagem amigável de erro :P</h1><br><h2>O que aconteceu foi o seguinte:</h2><br><h2>${error}</h2>`)
    }
})

//DELETE Apagar uma determinada tarefa
app.delete('/tasks/:id', async (req, res) => {
    try{
        const ID = req.params.id
        const apagando_tarefa = await tasks.destroy({ where: { ID: ID } })
        res.send({ action: 'Apagando tarefa', apagando_tarefa: apagando_tarefa })
    } catch (error) {
        return res.send( `<h1>Esta é uma mensagem amigável de erro :P</h1><br><h2>O que aconteceu foi o seguinte:</h2><br><h2>${error}</h2>`)
    }
})

app.listen (3000, () => {
    console.log('Server funcionando no porto 3000'. rainbow)
})