class NegociacaoService {
    constructor() {
        this._http = new HttpService()
    }
    obterNegociacoesDaSemana() {
        return this._http
            .get('negociacoes/semana')
            .then(dados => {
                const negociacoes = dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                return negociacoes
            },
                erro => {
                    throw new Error('Não foi possível obter as negociações')
                })
    }
}