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

### Programação defensiva

No momento da criação do design de classes, seja cuidadoso com a mutabilidade. Quando congelamos o objeto, não permitimos que sejam atribuidos novos valores as suas propriedades, mas as referências ainda podem ser alteradas por métodos.
Neste exemplo, realizamos a blindagem do atributo data no construtor e no get.

```javascript
class Negociacao {

    constructor(data, quantidade, valor) {
        //Criamos uma nova referencia para a data que será salva no objeto
        this._data = new Date(data.getTime())
        this._quantidade = quantidade
        this._valor = valor
        Object.freeze(this)
    }

    get data() {
        //Passamos uma cópia de data
        return new Date(this._data.getTime())
    }
}
```

### Menos verbosidade no constructor com Object.assign()

Simplificamos a atribuição das propriedades do objeto que antes era realizada em três instruções para apenas uma.

```javascript
class Negociacao {

    constructor(data, quantidade, valor) {
        Object.assign(this, {
            _data: new Date(data.getTime()),
            _quantidade: quantidade,
            _valor: valor
        })
        Object.freeze(this)
    }
}
```