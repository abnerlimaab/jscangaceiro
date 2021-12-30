class NegociacaoDao {
    //O construtor da classe deverá receber uma conexão quando chamado.
    constructor(connection) {
        this._connection = connection
        this._store = 'negociacoes'
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {
            const request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao)

            request.onsuccess = e => resolve()
            request.onerror = e => {
                console.log(e.target.error)
                reject('Não foi possível salvar a negociação')
            }
        })
    }

    listaTodos() {
        return new Promise((resolve, reject) => {

        })
    }
}