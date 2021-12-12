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

### Emulando Classes abstratas

Podem ter um ou mais métodos abstratos que nada mais são do que métodos que não possuem implementação, apenas a assinatura. Esses métodos devem ser implementados pela classe filha. Em Javascript, passamos uma Exception no método da classe mãe para obrigar as filhas a implementá-lo, porém a exceção só é lançada em tempo de execução.

```javascript
//Classe Mãe
class View {
  template(model) {
    throw new Error("Você precisa implementar o método template");
  }
}

//Classe Filha
class MensagemView extends View {
  template(model) {
    return model.texto
      ? `<p class="alert alert-info">${model.texto}</p>`
      : `<p></p>`;
  }
}
```

### Recomendações quanto a definição de variáveis.

- Use const sempre que possível
- Utilize let apenas se a variável precisar receber novas atribuições.
- Não use var, pois só tem escopo definido quando declarada dentro de uma função.

### Driblando o this dinâmico de function

Objetivo: A função passada no construtor de Negociacoes deve considerar a instância de NegociacaoController.

- Criando uma variável de contexto.

```javascript
class NegociacaoController {
  constructor() {
    //Código anterior omitido
    const self = this;
    this._negociacoes = new Negociacoes(function (model) {
      console.log(this); // Instância de Negociacoes
      self._negociacoesView.update(model); // Instância de NegociacaoController obtida através da variável auxiliar self
    });
    //Código posterior omitido
  }
}
```

- Utilizando a função call (presente em todas as functions) que reccebe um contexto e os parâmetros que a função terá como escopo.

Na classe Negociacoes

```javascript
class Negociacoes {
  // contexto = NegociacaoController, armadilha = function
  constructor(contexto, armadilha) {
    this._negociacoes = [];
    this._armadilha = armadilha;
    this._contexto = contexto;
    Object.freeze(this);
  }

  adiciona(negociacao) {
    this._negociacoes.push(negociacao);
    // A function armadilha terá MegociacaoController como contexto e Negociacoes como parâmetro
    this._armadilha.call(this._contexto, this);
  }
}
```

Na classe NegociacaoController atrinuimos o this no primeiro parâmetro do constructor de Negociacoes.

```javascript
class NegociacaoController {
  constructor() {
    //Código anterior omitido
    this._negociacoes = new Negociacoes(this, function (model) {
      console.log(this); // this = NegociacaoController
      this._negociacoesView.update(model); // this = NegociacaoController
    });
    //Código posterior omitido
  }
}
```

### Arrow functions e seu this léxico

Em uma arrow function, o escopo do this é léxico (estático) e obtém seu valor do código ao redor.

```javascript
class NegociacaoController {
  constructor() {
    //Código anterior omitido
    this._negociacoes = new Negociacoes((model) => {
      console.log(this); // this = NegociacaoController
      this._negociacoesView.update(model); // model = Negociacoes
    });
    //Código posterior omitido
  }
}
```

### O padrão de projeto PROXY

Lidamos com Proxy como se ele fosse a instância do objeto que estamos querendo manipular. Para cada propriedade e método dessa instância o Proxy terá um correspondente. O ES6 já possui na própria linguagem um recurso de Proxy.

#### GET

```javascript
const negociacao = new Proxy(new Negociacao(new Date(), 2, 20), {
  // target = Negociacao, prop = 'propriedade acessada', receiver = Proxy
  get(target, prop, receiver) {
    console.log(`A propriedade ${prop} caiu na armadilha!`);
    //Acessamos a propriedade do objeto encapsulado através de colchetes com uma string correspondente ao nome da propriedade.
    return target[prop];
  },
});
```

#### SET

```javascript
const negociacao = new Proxy(new Negociacao(new Date(), 2, 20), {
  // target = Negociacao, prop = 'propriedade acessada', value = atribuição, receiver = Proxy
  set(target, prop, value, receiver) {
    console.log(`${prop} guarda ${target[prop]}, receberá ${value}`);
    //É boa prática retornarmos um bool para verificar se a atribuição foi bem sucedida
    return target[prop] == value;
  },
});
```
