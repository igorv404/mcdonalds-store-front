function toMainPage() {
    window.location.href = 'index.html';
}

function showAlert() {
    document.querySelector('.alert').style.width = '25vw';
}

function hideAlert() {
    document.querySelector('.alert').style.width = '0vw';
}

async function createDish() {
    let image = document.querySelector('#imgField').value;
    let name = document.querySelector('#nameField').value;
    let price = document.querySelector('#priceField').value;
    if (image && name && price && price >= 1) {
        fetch('https://mcdonalds-backend.herokuapp.com/dishes/add', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                'name': name,
                'price': price,
                'image': image
            })
        })
            .then(res => {
                if (res.status === 200) {
                    image = '';
                    name = '';
                    price = '';
                    window.location.href = 'index.html';
                }
            })
            .catch(() => {
                document.querySelector('.alert').textContent = 'Form is invalid, check your info';
                showAlert();
            });
    }
}
