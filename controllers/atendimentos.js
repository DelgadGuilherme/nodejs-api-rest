const { parseTwoDigitYear } = require('moment')
const { lista } = require('../models/atendimentos')
const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res)
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.buscaId(id, res)
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        Atendimento.adiciona(atendimento, res)
    })

    app.patch('/atedimento/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const data = req.body

        Atendimento.altera(id, data, res)
    })

    app.delete('/atendimento/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.deletar(id, res)
    })

}