const moment = require('moment')

const conexao = require('../infra/conexao')

class Atendimento {
    
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteValido = atendimento.cliente.length >= 3
        const validacao = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Cliente pelo menos deve ter mais de 5 caracteres'
            }
        ]

        const erros = validacao.filter(campo => !campo.valido)
        const possuiErros = erros.length

        if(possuiErros){
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = 'insert into atendimentos set ?'

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            })
        }
    }

    lista(res) {
        const sql = 'select * from atendimentos'

        conexao.query(sql, (erro, resultados) =>{
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaId(id, res) {
        const sql = `select * from atendimentos where id=${id}`

        conexao.query(sql, (erro, result) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(result[0])
            }
        })
    }

    altera(id, atendimento, result) {
        const dataValida = moment(data.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        const sql = 'update atendimento set ? where id = ?'

        conexao.query(sql, [{...atendimento, data}, id], (erro, result) => {
            if(erro) {
                result.status(400).json(erro)
            } else {
                result.status(200).json({...valores, id})
            }
        })
    }

    deletar(id, res) {
        const sql =  'delete from atendimentos where id = ?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento