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
                    `
                }).join('')}
            </tbody>
            
            <tfoot>
                <tr>
                    <td colspan="3"></td>
                    <td>${model.volumeTotal}</td>
                </tr>
            </tfoot>
        </table>
        `
    }

}