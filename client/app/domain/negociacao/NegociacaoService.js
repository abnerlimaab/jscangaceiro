System.register(['../../util/HttpService', './Negociacao'], function (_export, _context) {
    "use strict";

    var HttpService, Negociacao;
    return {
        setters: [function (_utilHttpService) {
            HttpService = _utilHttpService.HttpService;
        }, function (_Negociacao) {
            Negociacao = _Negociacao.Negociacao;
        }],
        execute: function () {
            class NegociacaoService {
                constructor() {
                    this._http = new HttpService();
                }
                obterNegociacoesDaSemana() {
                    return this._http.get('negociacoes/semana').then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)), erro => {
                        throw new Error('Não foi possível obter as negociações');
                    });
                }
                obterNegociacoesDaSemanaAnterior(url) {
                    return this._http.get('negociacoes/anterior').then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)), erro => {
                        throw new Error('Não ffoi possível obter as negociações dasemana anterior.');
                    });
                }
                obterNegociacoesDaSemanaRetrasada() {
                    return this._http.get('negociacoes/retrasada').then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)), erro => {
                        throw new Error('Não foi possível obter as negociações da semana retrasada');
                    });
                }
                obterNegociacoesDoPeriodo() {
                    return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(periodo => periodo.reduce((novoArray, item) => novoArray.concat(item), []).sort((a, b) => b.data.getTime() - a.data.getTime())).catch(erro => {
                        console.log(erro);
                        throw new Error('Não foi possível obter as negociações do período');
                    });
                }
            }

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map