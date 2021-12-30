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
        this._init()
    }
    
    _init() {
        DaoFactory
            .getNegociacaoDao()
            .then(dao => dao.listaTodos())
            .then(negociacoes => negociacoes.forEach(
                negociacao => this._negociacoes.adiciona(negociacao)
            ))
            .catch(erro => this._mensagem.texto = erro)
    }

    adiciona(event) {
        try {
            event.preventDefault()
            const negociacao = this._criaNegociacao()
            DaoFactory
                .getNegociacaoDao()
                .then(dao => dao.adiciona(negociacao))
                .then(() => {
                    this._negociacoes.adiciona(negociacao)
                    this._mensagem.texto = 'Negociação adicionada com sucesso'
                    this._limpaFormulario()
                })
        } catch (erro) {
            console.log(erro)
            console.log(erro.stack)
            if (erro instanceof DataInvalidaException) {
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
        this._service
            .obterNegociacoesDoPeriodo()
                .then(negociacoes => {
                    negociacoes
                        .filter(novaNegociacao => this._negociacoes.paraArray()
                            .some(negociacaoExistente => novaNegociacao.equals(negociacaoExistente)))
                        .forEach(negociacao => this._negociacoes.adiciona(negociacao))
                    this._mensagem.texto = 'Negociações do período importadas com sucessoo'
                })
                .catch(erro => this._mensagem.texto = erro)
    }
}
