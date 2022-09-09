let dishes = [];
let filterArr = [];
let total = 0;

function toCreatePage() {
    window.location.href = 'create.html';
}

function toEditPage(id) {
    localStorage.setItem('id', id);
    window.location.href = 'edit.html';
}

function showAlert() {
    document.querySelector('.alert').style.width = '25vw';
}

function hideAlert() {
    document.querySelector('.alert').style.width = '0vw';
}

function createDishElem(arr) {
    let index = 0;
    arr.forEach(element => {
        document.querySelector('.content').innerHTML += `
        <div class="item">
            <img src="${element.image}" alt="">
            <h2>${element.name}</h2>
            <p>${element.price}$</p>
            <div class="actions">
                <button class="edit" onclick="toEditPage(${element.id})">Edit</button>
                <button class="delete" onclick="deleteDish(${element.id}, ${index++})">Delete</button>
            </div>
        </div>
        `;
    });
}

async function getDishes() {
    fetch('https://mcdonalds-backend.herokuapp.com/dishes')
        .then(res => res.json())
        .then(data => {
            dishes = data;
            document.querySelector('.content').replaceChildren();
            createDishElem(dishes);
            getTotalPrice(dishes);
        })
        .catch(err => console.log(err));
}

function searchDish() {
    document.querySelector('#name').checked = false;
    document.querySelector('#price').checked = false;
    let search = document.querySelector('#search').value;
    if (search) {
        let reg = new RegExp(`${search}`);
        filterArr = dishes.filter(element => reg.test(element.name) === true);
        document.querySelector('.content').replaceChildren();
        createDishElem(filterArr);
        getTotalPrice(filterArr);
    } else {
        getDishes();
    }
}

function sortNameAl(arr) {
    document.querySelector('#price').checked = false;
    arr.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        } else {
            return 0;
        }
    });
    document.querySelector('.content').replaceChildren();
    createDishElem(arr);
}

function sortByName() {
    if (document.querySelector('#name').checked) {
        if (document.querySelector('#search').value) {
            sortNameAl(filterArr);
        } else {
            sortNameAl(dishes);
        }
    } else if (!document.querySelector('#search').value) {
        document.querySelector('.content').replaceChildren();
        getDishes();
    }
}

function sortPriceAl(arr) {
    document.querySelector('#name').checked = false;
    arr.sort((a, b) => {
        return a.price - b.price;
    });
    document.querySelector('.content').replaceChildren();
    createDishElem(arr);
}

function sortByPrice() {
    if (document.querySelector('#price').checked) {
        if (document.querySelector('#search').value) {
            sortPriceAl(filterArr);
        } else {
            sortPriceAl(dishes);
        }
    } else if (!document.querySelector('#search').value) {
        document.querySelector('.content').replaceChildren();
        getDishes();
    }
}

function getTotalPrice(arr) {
    total = 0;
    arr.forEach(element => {
        total += element.price;
    });
    document.querySelector('#totalPrice').textContent = `${total}$`;
}

async function deleteDish(id, index) {
    fetch(`https://mcdonalds-backend.herokuapp.com/dishes/delete/${id}`, {
        method: 'DELETE'
    })
        .then(res => {
            if (res.status === 200) {
                document.querySelector('.content').replaceChildren();
                dishes.splice(index, 1);
                createDishElem(dishes);
                getTotalPrice(dishes);
            } else {
                showAlert();
            }
        });
}

getDishes();
