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

            //O método open abre a conexão passando o nome da Store e sua versão
            const openRequest = indexedDB.open('jscangaceiro', 2)

            //Lógica a ser executada caso a coneão necessite ser criada ou de atualização
            openRequest.onupgradeneeded = e => {
                //Se a conexão for bem sucedida, será chamado o método responsável por criar a store
                ConnectionFactory._createStores(e.target.result)
            }

            //Lógica a ser utilizada caso a negociação obtenha sucesso
            openRequest.onsuccess = e => {
                //Se a conexão for bem sucedida, será enviada como retorno através do resolve
                resolve(e.target.result)
            }

            //Lógica a ser utilizada caso a conexão retorne um erro
            openRequest.onerror = e => {
                //Se a conexão obter erro, será enviado como retorno através de reject
                reject(e.target.result)
            }

        })
    }

    //Método criado para deixar clara a intenção de criar uma store
    static _createStores(connection) {
        stores.forEach(store => {

            //Se já houver uma store com mesmo nome, está será excluida
            if(connection.objectStoreNames.contains(store))
                connection.deleteObjectStore(store)

            //Será criada a nova store com as propriedades do objeto options passado como argumento.
            connection.createObjectStore(store, {
                autoIncrement: true
            })
        })
    }
}