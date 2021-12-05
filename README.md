### Objetos imutáveis

Propriedades de objetos congeladas não podem receber novas atribuições.

```javascript
var n1 = new Negociacao(new Date(), 5, 700)
Object.freeze(n1)
n1._quantidade = 1000
//O valor de quantidade continua 5
console.log(n1.quantidade)
```
Em javascript é uma boa prática congelar o objeto dentro do construtor para que as instâncias já sejam criadas não permitindo alterações diretas.

```javascript
class Negociacao {
    constructor(data, quantidade, valor) {
        //Atributos
        this._data = data
        this._quantidade = quantidade
        this._valor = valor
        Object.freeze(this)
    }
}
```