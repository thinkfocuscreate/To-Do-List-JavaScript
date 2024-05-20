const inputEle = document.querySelector('.input');
const addBtn = document.querySelector('.addBtn');
const listContainerEle = document.querySelector('.listContainer');

addBtn.addEventListener('click', () => {
    if (inputEle.value === '') {
        alert('Enter something');
    } else {
        addListItem(inputEle.value);
        inputEle.value = '';
        saveData();
    }
});

function addListItem(text, completed = false) {
    const list = document.createElement('li');
    list.classList.add('list');
    if (completed) list.classList.add('toggleList');
    list.innerHTML = text;
    listContainerEle.appendChild(list);

    list.addEventListener('click', () => {
        list.classList.toggle('toggleList');
        saveData();
    });

    list.addEventListener('dblclick', () => {
        if (confirm('Do you want to delete this task?')) {
            listContainerEle.removeChild(list);
            saveData();
        }
    });
}

function saveData() {
    const listItems = Array.from(listContainerEle.children).map(item => ({
        text: item.innerHTML,
        completed: item.classList.contains('toggleList')
    }));
    localStorage.setItem('data', JSON.stringify(listItems));
}

function getTask() {
    const listItems = JSON.parse(localStorage.getItem('data')) || [];
    listContainerEle.innerHTML = '';
    listItems.forEach(item => addListItem(item.text, item.completed));
}

document.addEventListener('DOMContentLoaded', getTask);