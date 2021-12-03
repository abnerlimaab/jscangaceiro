class Negociacao {
    //Função construtora
    constructor(data, quantidade, valor) {
        //Atributos
        this._data = data
        this._quantidade = quantidade
        this._valor = valor
    }

    getVolume() {
        return this._quantidade * this._valor
    }

    getData() {
        return this._data
    }

    getQuantidade() {
        return this._quantidade
    }

    getValor() {
        return this._valor
    }
}