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

// We need to parse JSON coming from requests
app.use(express.json()) //PARA QUE ISSO??


app.get('', (req, res) =>{
    res.send ('<h1>Página principal</h1>')
})

//GET Mostrar todas as tarefas
app.get('/tasks', async (req, res) =>{
    
    const tarefas = await tasks.findAll()
    // res.send (tarefas) //funciona igual
    // res.json ({ action: tarefas })
    res.json ({ tarefas })

})

//GET Mostrar UMA determinada tarefa por ID:
app.get('/tasks/:id', async (req, res) =>{
    
    const tarefa_ID = req.params.id //Aqui tô pegando o parametro id da requisição app.get('/tasks/:id'... [os dois pontos chutam esse parametro para o "params"]
    const tarefa = await tasks.findByPk(tarefa_ID)
    res.json({ tarefa })
})

//POST Criar tarefas
app.post('/tasks', async (req, res) =>{
    const body = req.body
    
    const nova_tarefa = await tasks.create({
        description: body.description,
        done: body.done
    })
    
    res.json({ nova_tarefa })
    
    // const nova_tarefa = await tasks.create({
    //     description: b.description,
    //     done: true
    // })
    // res.send({ nova_tarefa })
})

//PUT Atualizar uma determinada tarefa
app.put('/tasks/:id', async (req, res) =>{
    const tarefa_ID = req.params.id
    const body = req.body
    const tarefa = await tasks.findByPk(tarefa_ID)

    tarefa.update({
        description: body.description,
        done: body.done
      });

    res.send({ action: 'Atualizando tarefa', tarefa: tarefa })
})

//DELETE Apagar uma determinada tarefa
app.delete('/tasks/:id', async (req, res) =>{
    const ID = req.params.id
    const apagando_tarefa = await tasks.destroy({ where: { ID: ID } })
    res.send({ apagando_tarefa })
})



app.listen (5200, () => {
    console.log('Server funcionando no porto 5200'. rainbow)
})