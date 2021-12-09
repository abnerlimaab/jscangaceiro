### Objetos imutáveis

Propriedades de objetos congeladas não podem receber novas atribuições.

```javascript
var n1 = new Negociacao(new Date(), 5, 700);
Object.freeze(n1);
n1._quantidade = 1000;
//O valor de quantidade continua 5
console.log(n1.quantidade);
```

Em javascript é uma boa prática congelar o objeto dentro do construtor para que as instâncias já sejam criadas não permitindo alterações diretas.

```javascript
class Negociacao {
  constructor(data, quantidade, valor) {
    //Atributos
    this._data = data;
    this._quantidade = quantidade;
    this._valor = valor;
    Object.freeze(this);
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
    this._data = new Date(data.getTime());
    this._quantidade = quantidade;
    this._valor = valor;
    Object.freeze(this);
  }

  get data() {
    //Passamos uma cópia de data
    return new Date(this._data.getTime());
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
      _valor: valor,
    });
    Object.freeze(this);
  }
}
```

Para melhorar a legibilidade, toda propriedade que precisa de alteração antes de ser atribuida não terá o auxilio de Object.assign()

```javascript
class Negociacao {
  constructor(_data, _quantidade, _valor) {
    Object.assign(this, {
      _quantidade,
      _valor,
    });
    this._data = new Date(data.getTime());
    Object.freeze(this);
  }
}
```

### Definindo alias e alterando o contexto de uma função com bind()

Neste exemplo, atribuimos a função document.querySelector() na variável $. Após a atribuição, o contexto this de querySelector não será mais document e resultará em erro. Para resolvermos, utilizamos o bind() (disponível em todas as funções javascript) para alterar o contexto this de $ para document o que a torna um alias de document.querySelector;

```javascript
let $ = document.querySelector.bind(document);
```

### Métodos estáticos

Os métodos da classe DataConverter não dependem de atributos da instância para seu código funcionar de forma que não é necessário criar uma instância para utilizá-los. Para definir um método estático basta adicionar a palavra reservada static na sua assinatura. Quando a classe possui apenas métodos estáticos, é boa prática passar um Error no construtor para impedir a criação de objetos.

```javascript
class DataConverter {
  constructor() {
    throw new Error("Essa classe não pode ser instanciada");
  }

  static paraTexto(data) {
    return (
      data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear()
    );
  }

  static paraData(texto) {
    return new Date(
      ...texto.split("-").map((item, indice) => item - (indice % 2))
    );
  }
}
```

### Boa prática do Fail Fast

O Fail Fast consiste em validar os parâmetros recebidos antes de executar a lógica do método e falharmos antecipadamente quando divergir do esperado passando uma mensagem clara.

```javascript
class DataConverter {
  static paraData(texto) {
    //Este método espera receber uma string no formato aaaa-mm-dd, caso NÃO venha neste formato será passado um erro.
    if (!/^\d(4)-\d(2)-\d(2)$/.test(texto))
      throw new Error("A data deve estar no formato aaaa-mm-dd");
    return new Date(
      ...texto.split("-").map((item, indice) => item - (indice % 2))
    );
  }
}
```

### A função reduce()

A função reduce() recebe dois parâmetros: a função com a lógica de redução e o valor inicial da variável acumuladora respectivamente. A função de redução nos dá acesso ao acumulador e ao item iterado sendo executada em cada iteração. O acumulador é passado em todas as chamadas da função até o término da iteração.

```javascript
class Negociacoes {
  constructor() {
    this._negociacoes = [];
  }

  get volumeTotal() {
    return this._negociacoes.reduce(
      (total, negociacao) => total + negociacao.volume,
      0
    );
  }
}
```
