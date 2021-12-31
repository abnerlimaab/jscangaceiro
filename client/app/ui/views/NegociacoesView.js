System.register(['./View', '../converters/DateConverter'], function (_export, _context) {
    "use strict";

    var View, DataConverter;
    return {
        setters: [function (_View) {
            View = _View.View;
        }, function (_convertersDateConverter) {
            DataConverter = _convertersDateConverter.DataConverter;
        }],
        execute: function () {
            class NegociacoesView extends View {

                template(model) {
                    return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                ${model.paraArray().map(negociacao => {
                        return `
                    <tr>
                        <th>${DataConverter.paraTexto(negociacao.data)}</th>
                        <th>${negociacao.quantidade}</th>
                        <th>${negociacao.valor}</th>
                        <th>${negociacao.volume}</th>
                    </tr>
                    `;
                    }).join('')}
            </tbody>
            
            <tfoot>
                <tr>
                    <td colspan="3"></td>
                    <td>${model.volumeTotal}</td>
                </tr>
            </tfoot>
        </table>
        `;
                }

            }

            _export('NegociacoesView', NegociacoesView);
        }
    };
});
//# sourceMappingURL=NegociacoesView.js.map