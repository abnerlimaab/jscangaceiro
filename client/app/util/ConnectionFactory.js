//Armazena os nomes das stores existentes. Fica fora da classe por não ser permitido declarar propriedades
const stores = ['negociacoes']

//A mesma conexão será utilizada na aplicação inteira
//Apesar de toda conexão possuir o mnétodo close(), não será permitido chamá-lo
class ConnectionFactory {
    constructor() {

        //Passamos um erro quando o programador tenta instânciar a classe para que seja utilizado apenas o método static
        throw new Error("Não é possível criar instâncias dessa classe")

    }

    static getConnection() {
        return new Promise((resolve, reject) => {

            //Triade de eventos para a abertura de uma conexão com IndexDB

            //Itera o array de stores para construí-las
            stores.forEach(store => {

            })

            //O método open abre a conexão passando o nome da Store e sua versão
            const openRequest = indexedDB.open('jscangaceiro', 2)

            //Lógica a ser executada caso a coneão necessite de atualização
            openRequest.onupgradeneeded = e => {

            }

            //Lógica a ser utilizada caso a negociação obtenha sucesso
            openRequest.onsuccess = e => {

            }

            //Lógica a ser utilizada caso a conexão retorne um erro
            openRequest.onerror = e => {

            }

        })
    }
}