//  Recuperando Lista
const _listToDo = JSON.parse(localStorage.getItem('List_Todo')) || [];
const _showItemContent = document.querySelector(".listTarefas")
const cardForm = document.querySelector(".cardForm")


// Selecionando Formulario
const formList = document.querySelector("#formList")


// Creando modelo de item
function createItem(_assignment) {
    const item = {
        name: _assignment,
        state: false,
    }
    _listToDo.push(item)
    saveList()
}

// evento submit
formList.addEventListener('submit', (event) => {
    event.preventDefault()

    //Recuperando valor del input
    const _assignment = document.querySelector("#tarefa").value

    // alerta 
    const _alert = document.querySelector(".alert")

    // Validação da primera letra do input para criação do id fututamente
    switch (_assignment[0]) {
        case undefined:
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            // Alerta caso o valor esteja vazio ou começe com algum numero
            _alert.style = "background: #d12438; display: block;"
            _alert.innerHTML = `<i class="fas fa-exclamation-circle"></i> Digite um nome valido`
            break;

        default:
            // Criando uma tarefa e mostrando a lista de tarefas
            if (event.submitter.id == 'add') {
                createItem(_assignment)
                ShowItemList(true)

                // Resetando o formulario
                formList.reset()

                // Alerta de Tarefa Adicionada com sucesso
                _alert.style = "background: #4faa0e; display: block;"
                _alert.innerHTML = `<i class="fas fa-check-circle"></i> Adicionada com sucesso`


            }
            break;
    }

    // fecha o formulario de cadastro de tarefa
    if (event.submitter.id == 'hidden') {
        cardForm.style = "display: none; "
        _alert.style = "display: none;"

        formList.reset()
    }

})


// Mosutrando Item na lista de conteudo
function ShowItemList(clearList = false) {

    // limpando lista
    if (clearList) {
        _showItemContent.innerHTML = ''
    }

    if (_listToDo.length > 0) {
        // Adiciona os item na lista
        _listToDo.forEach(item => {
            if (item.state == false) {
                _showItemContent.innerHTML += `<div  class="cardItem"  >
                 <input type="checkbox" name="itemList" id="${item.name}" onclick="changeText('${item.name}','t${item.name}')"/> 
                 <label for="${item.name}"  id="t${item.name}"> ${item.name} </label>
                 <button onClick="deleteItem('${item.name}')">
                    <i class="fas fa-trash-alt"></i>
                 </button>

                 </div>`
            } else {
                _showItemContent.innerHTML += `<div  class="cardItem"  >
                 <input type="checkbox" name="itemList" id="${item.name}" checked onclick="changeText('${item.name}','t${item.name}')"/> 
                 <label for="${item.name}"  id="t${item.name}" style="text-decoration: line-through;'"> ${item.name} </label>
                 <button onClick="deleteItem('${item.name}')">
                    <i class="fas fa-trash-alt"></i>
                 </button>

                 </div>`

            }
        });
    } else {
        _showItemContent.innerHTML = ' Sem tarefas Diponiveis'

    }

}

// elimina item da lista 
function deleteItem(id) {
    const _alert = document.querySelector(".alertDelete")
    const _confirmDelete = document.querySelector("#confirm")
    const _closeAlert = document.querySelector("#close")
    _alert.style = 'display:flex;'

    _confirmDelete.onclick = () => {
        for (let i = 0; i < _listToDo.length; i++) {
            if (_listToDo[i].name == id) {
                const index = _listToDo.indexOf(_listToDo[i])
                _listToDo.splice(index, 1)
                ShowItemList(true)
                saveList()
                _alert.style = 'display:none;'

            }

        }
    }
    _closeAlert.onclick = () => {
        _alert.style = 'display:none;'

    }

    console.log(_confirmDelete);
    console.log(_closeAlert);


}

// salva a lista no localStorage
function saveList() {
    localStorage.setItem('List_Todo', JSON.stringify(_listToDo))
}

// Mostra o formulario de cadastro das tarefas
function createTask() {
    cardForm.style = "display: flex; "
}

// Muda a formatação do nome da tarefa
function changeText(id, idText) {
    const _state = document.querySelector(`#${id}`)
    const _textItem = document.querySelector(`#${idText}`)

    for (let i = 0; i < _listToDo.length; i++) {
        if (_listToDo[i].name == id) {
            if (_state.checked) {
                _textItem.style = 'text-decoration: line-through;'
                _listToDo[i].state = true
                saveList()
            } else {
                _textItem.style = 'text-decoration: none;'
                _listToDo[i].state = false
                saveList()
            }



        }

    }
}


window.onload = ShowItemList()