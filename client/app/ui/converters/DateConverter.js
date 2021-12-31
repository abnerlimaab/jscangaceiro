System.register(['./DataInvalidaException'], function (_export, _context) {
    "use strict";

    var DataInvalidaException;
    return {
        setters: [function (_DataInvalidaException) {
            DataInvalidaException = _DataInvalidaException.DataInvalidaException;
        }],
        execute: function () {
            class DataConverter {

                constructor() {
                    throw new Error('Essa classe não pode ser instanciada');
                }

                static paraTexto(data) {
                    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
                }

                static paraData(texto) {
                    if (!/\d{2}\/\d{2}\/\d{4}/.test(texto)) throw new DataInvalidaException();
                    return new Date(...texto.split('/').reverse().map((item, indice) => item - indice % 2));
                }

            }

            _export('DataConverter', DataConverter);
        }
    };
});
//# sourceMappingURL=DateConverter.js.map