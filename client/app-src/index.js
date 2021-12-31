// Armazena os valores dos campos de formulário correspondentes ao id da classe CSS
var campos = [
    document.querySelector('#data'),
    document.querySelector('#valor'),
    document.querySelector('#quantidade'),
]

// Verifica o conteúdo do Array
console.log(campos)

// Seleciona a tabela com classe css correspondente ao id
var tbody = document.querySelector('table tbody')

// Adiciona uma reação ao evento submit do formulário
document.querySelector('.form').addEventListener('submit', (evento) => {
    // Cancelando o comportamento padrão de submit para que não atualize a página
    evento.preventDefault()
    // Cria uma table row
    var tr = document.createElement('tr')
    // Para cada campo no array campos...
    campos.forEach((campo) => {
        // Cria uma table data
        var td = document.createElement('td')
        // Insere o valor do elemento iterado em campos na table data
        td.textContent = campo.value
        // adicional a table data na table row
        tr.appendChild(td)
    })
    // Nova td que armazenará o volume da negociação
    var tdVolume = document.createElement('td')
    // adiciona o valor de Volume = valor * quantidade na td
    tdVolume.textContent = campos[1].value * campos[2].value
    // Adiciona a td volume na table row
    tr.appendChild(tdVolume)
    // adiciona a tr na table
    tbody.appendChild(tr)
    // Limpa o campo data
    campos[0].value = ''
    // Limpa o campo quantidade
    campos[1].value = 1
    // Limpa o campo valor
    campos[2].value = 0
    // Foca no campo da data
    campos[0].focus()
})
