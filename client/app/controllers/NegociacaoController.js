class NegociacaoController {
    constructor() {
        let $ = document.querySelector.bind(document)
        this._inputData = $("#data")
        this._inputQuantidade = $("#quantidade")
        this._inputValor = $("#valor")
        this._negociacoes = new Negociacoes()
    }

    adiciona(event) {
        event.preventDefault()
        this._negociacoes.adiciona(this._criaNegociacao())
        console.log(this._negociacoes.paraArray())
        this._limpaFormulario()
    }

    _criaNegociacao() {
        return new Negociacao(
            DataConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        )
    }

    _limpaFormulario() {
        this._inputData.value = ''
        this._inputQuantidade.value = 1
        this._inputValor.value = 0.0
        this._inputData.focus()
    }
}
