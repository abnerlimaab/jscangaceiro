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
        this._service = new NegociacaoService()
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
        //Caso a função que recebeu o callback consiga executar sua operação, no primeiro parâmetro do calback receberemos null e no segundo os dados resultantes da operação. A partir da ausência ou não de valor em null, lidamos com o sucesso ou fracasso da operação.
        this._service.obterNegociacoesDaSemana((erro, negociacoes) => {
            if(erro) {
                this._mensagem.texto = 'Não foi possível obter as negociacoes da semana'
                return
            }
            negociacoes.forEach(negociacao => {
                this._negociacoes.adiciona(negociacao)
                this._mensagem.texto = 'Negociações importadas com sucesso'
            })
        })
    }
}
