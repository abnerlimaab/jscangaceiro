System.register(['./controllers/NegociacaoController'], function (_export, _context) {
    "use strict";

    var NegociacaoController;
    return {
        setters: [function (_controllersNegociacaoController) {
            NegociacaoController = _controllersNegociacaoController.NegociacaoController;
        }],
        execute: function () {

            const controller = new NegociacaoController();
            const $ = document.querySelector.bind(document);

            $('.form').addEventListener('submit', controller.adiciona.bind(controller));

            $('#botao-apaga').addEventListener('click', controller.apaga.bind(controller));

            $('#botao-importa').addEventListener('click', controller.importaNegociacoes.bind(controller));
        }
    };
});
//# sourceMappingURL=app.js.map