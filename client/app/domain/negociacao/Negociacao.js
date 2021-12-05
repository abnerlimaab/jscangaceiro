class Negociacao {

    constructor(data, quantidade, valor) {
        //Atributos
        this._data = data
        this._quantidade = quantidade
        this._valor = valor
        Object.freeze(this)
    }

    get volume() {
        return this._quantidade * this._valor
    }

    get data() {
        return this._data
    }

    get quantidade() {
        return this._quantidade
    }

    get vakor() {
        return this._valor
    }
}