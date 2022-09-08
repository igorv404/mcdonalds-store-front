let dishId = localStorage.getItem('id');
let dishName = document.querySelector('#nameField');
let dishPrice = document.querySelector('#priceField');
let dishImage = document.querySelector('#imgField');

function toMainPage() {
    window.location.href = 'index.html';
}

function showAlert() {
    document.querySelector('.alert').style.width = '25vw';
}

function hideAlert() {
    document.querySelector('.alert').style.width = '0vw';
}

async function getDish(id) {
    fetch(`https://mcdonalds-backend.herokuapp.com/dishes/${id}`)
        .then(res => res.json())
        .then(data => {
            dishName.value = data.name;
            dishPrice.value = data.price;
            dishImage.value = data.image;
        })
        .catch(() => {
            document.querySelector('.alert').textContent = 'Something go wrong';
            showAlert();
        });
}

async function updateDish() {
    if (dishName.value && dishPrice.value && dishImage.value && dishPrice.value >= 1) {
        fetch(`https://mcdonalds-backend.herokuapp.com/dishes/update/${dishId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'name': dishName.value,
                'price': dishPrice.value,
                'image': dishImage.value
            })
        })
            .then(res => {
                if (res.status === 200) {
                    dishName.value = '';
                    dishPrice.value = '';
                    dishImage.value = '';
                    localStorage.removeItem('id');
                    window.location.href = 'index.html';
                }
            })
            .catch(() => {
                document.querySelector('.alert').textContent = 'Form is invalid, check your info';
                showAlert();
            })
    }
}

getDish(dishId);
