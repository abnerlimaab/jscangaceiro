class NegociacaoDao {
    //O construtor da classe deverá receber uma conexão quando chamado.
    constructor(connection) {
        this._connection = connection
        this._store = 'negociacoes'
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {

        })
    }

    listaTodos() {
        return new Promise((resolve, reject) => {

        })
    }
}