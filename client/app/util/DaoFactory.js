System.register(['./ConnectionFactory', '../domain/negociacao/NegociacaoDao'], function (_export, _context) {
    "use strict";

    var ConnectionFactory, NegociacaoDao;
    function getNegociacaoDao() {
        return ConnectionFactory.getConnection().then(connection => new NegociacaoDao(connection));
    }

    _export('getNegociacaoDao', getNegociacaoDao);

    return {
        setters: [function (_ConnectionFactory) {
            ConnectionFactory = _ConnectionFactory.ConnectionFactory;
        }, function (_domainNegociacaoNegociacaoDao) {
            NegociacaoDao = _domainNegociacaoNegociacaoDao.NegociacaoDao;
        }],
        execute: function () {}
    };
});
//# sourceMappingURL=DaoFactory.js.map