//Armazena os nomes das stores existentes. Fica fora da classe por não ser permitido declarar propriedades
const stores = ['negociacoes']

//Variável que auxilia na verificação se já há uma conexão ativa
let connection = null

//A mesma conexão será utilizada na aplicação inteira
//Apesar de toda conexão possuir o mnétodo close(), não será permitido chamá-lo
//Retorna a definição da classe para que seja acessível no restante da aplicação.
export class ConnectionFactory {
    constructor() {

        //Passamos um erro quando o programador tenta instânciar a classe para que seja utilizado apenas o método static
        throw new Error("Não é possível criar instâncias dessa classe")

    }

    static getConnection() {
        return new Promise((resolve, reject) => {

            //Se uma conexão já foi criada, será retornada no resolve evitando percorrer novamente o processo de criação.
            if (connection) return resolve(connection)

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
                //Só será executado na primeira vez que a conexão for criada
                connection = e.target.result
                //Guarda a função original close p´resente em todas as conexões no escopo de connection
                close = connection.close.bind(connection)
                //Utilizando o Monkey Pack, sobreescrevemos a função original close presente em todas as conexões para que seja emitido um erro ao tentar chamá-lo diretamente.
                connection.close = () => {
                    throw new Error('Você não pode fechar diretamente a conexão')
                }
                //Se a conexão for bem sucedida, será enviada como retorno através do resolve
                resolve(connection)
            }

            //Lógica a ser utilizada caso a conexão retorne um erro
            openRequest.onerror = e => {
                console.log(e.target.error)
                //Se a conexão obter erro, será enviado como retorno através de reject
                reject(e.target.error.name)
            }

        })
    }

    //Método criado para deixar clara a intenção de criar uma store
    static _createStores(connection) {
        stores.forEach(store => {

            //Se já houver uma store com mesmo nome, está será excluida
            if (connection.objectStoreNames.contains(store))
                connection.deleteObjectStore(store)

            //Será criada a nova store com as propriedades do objeto options passado como argumento.
            connection.createObjectStore(store, {
                autoIncrement: true
            })
        })
    }

    static closeConnection() {
        //Chama a função close original
        if (connection) close()
    }
}