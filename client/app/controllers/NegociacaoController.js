class NegociacaoController {
    constructor() {
        const $ = document.querySelector.bind(document)
        this._inputData = $("#data")
        this._inputQuantidade = $("#quantidade")
        this._inputValor = $("#valor")
        this._negociacoes = new Bind(
            new Negociacoes(),
            new NegociacoesView('#negociacoes'),
            'adiciona', 'esvazia'
        )
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView('#mensagemView'),
            'texto'
        )
    }

    adiciona(event) {
        try {
            event.preventDefault()
            this._negociacoes.adiciona(this._criaNegociacao())
            this._mensagem.texto = 'Negociação adicionada com sucesso'
            this._limpaFormulario()
        } catch(erro) {
            console.log(erro)            
            console.log(erro.stack)
            if(erro instanceof DataInvalidaException) {
                this._mensagem.texto = erro.message
            } else {
                this._mensagem.texto = 'Um erro inesperado aconteceu. Entre em contato com o suporte.'
            }
        }
    }

    _criaNegociacao() {
        return new Negociacao(
            DataConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value),
        )
    }

    _limpaFormulario() {
        this._inputData.value = ''
        this._inputQuantidade.value = 1
        this._inputValor.value = 0.0
        this._inputData.focus()
    }

    apaga() {
        this._negociacoes.esvaziar()
        this._mensagem.texto = 'Negociações apagadas com sucesso'
    }

    importaNegociacoes() {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', 'negociacoes/semana')
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log('Obtendo as requisições do servidor')
                } else {
                    console.log('Não foi possível obter as requisições da semana')
                }
            }
        }
        xhr.send()
    }
}
