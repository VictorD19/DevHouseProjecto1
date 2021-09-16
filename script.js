//  Recuperando Lista
const _listToDo = JSON.parse(localStorage.getItem('List_Todo')) || [];
const _showItemContent = document.querySelector(".cardContent")

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
            console.log("Digite Um Id Valido");
            break;

        default:
            createItem(_assignment)
            ShowItemList(true)

            break;
    }

    //  verificar se o valor nao esta vazio e nao começa com numero




})


// Mosutrando Item na lista de conteudo
function ShowItemList(clearList = false) {

    if (clearList) {
        _showItemContent.innerHTML = ''
    }

    // Adiciona os item na lista
    _listToDo.forEach(item => {
        _showItemContent.innerHTML += `<div  class="cardItem">
                 <input type="checkbox" name="itemList" id="${item.name}"/> 
                 <label for="${item.name}"> ${item.name} </label>
                 <button onClick="deleteItem('${item.name}')">
                    <i class="fas fa-trash-alt"></i>
                 </button>

                 </div>`
    });

}

// elimina item da lista 
function deleteItem(id) {

    for (let i = 0; i < _listToDo.length; i++) {

        // 
        if (_listToDo[i].name == id) {

            const index = _listToDo.indexOf(_listToDo[i])

            _listToDo.splice(index, 1)
            ShowItemList(true)
            saveList()
        }

    }
}

// salva a lista no localStorage
function saveList() {
    localStorage.setItem('List_Todo', JSON.stringify(_listToDo))

}

window.onload = ShowItemList()