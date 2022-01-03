const customExpress = require('./config/customExpress')
const conexao = require('./infra/conexao')
const Tabelas = require('./infra/tabelas')

conexao.connect(erro => {
    if (erro) {
        console.log(erro)
    } else {
        console.log('conexão realizada com sucesso')
        
        Tabelas.init(conexao)
        const app = customExpress()
        app.listen(3000)
        //app.listen(3000, () => console.log('ola mundo!'))
    }
})
