//  retrieving list
const _listToDo = JSON.parse(localStorage.getItem('List_Todo')) || [];
const _showItemContent = document.querySelector(".cardContent")

// selecting form 
const formList = document.querySelector("#formList")


// creating modal item
function createItem(_assignment) {
    const item = {
        name: _assignment,
        state: false,
    }
    _listToDo.push(item)

}

// listening form event
formList.addEventListener('submit', (event) => {
    event.preventDefault()

    // retrieving  input value
    const _assignment = document.querySelector("#tarefa").value


    //  verificar se o valor nao esta vazio e nao começa com numero
    // check that the value is not empty and does not start with a number
    if (_assignment == '' || typeof parseInt(_assignment[0]) == 'number') {
        console.log("imposible");

    } else {
        createItem(_assignment)
        ShowItemList(true)
        console.log(_listToDo);
    }




})


// 
function ShowItemList(clearList = false) {

    if (clearList) {
        _showItemContent.innerHTML = ''
    }

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

function deleteItem(id) {
    const _itemsList = document.querySelector(`#${id}`)

    for (let i = 0; i < _listToDo.length; i++) {
        if (_listToDo[i].name == id) {
            const index = _listToDo.indexOf(_listToDo[i])

            console.log(index);
            _listToDo.splice(index, 1)
            ShowItemList(true)
        }

    }
}