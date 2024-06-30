let totalBill = 0;

const createSmallCards = (data) => {
    return `
    <div class="sm-product">
        <img src="${data.images[0]}" class="sm-product-img" alt="${data.name}">
        <div class="sm-text">
            <p class="sm-product-name">${data.name}</p>
            <p class="sm-des">${data.description}</p>
        </div>
        <div class="item-counter">
            <button class="counter-btn decrement">-</button>
            <p class="item-count">${data.quantity}</p>
            <button class="counter-btn increment">+</button>
        </div>
        <p class="sm-price" data-price="${data.price}">₹${data.price * data.quantity}</p>
        <button class="sm-delete-btn"><img src="../images/close.png" alt="Delete"></button>
    </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const setProducts = (name) => {
        const element = document.querySelector(`.${name}`);
        let data = JSON.parse(localStorage.getItem(name));
        if (data == null || data.length === 0) {
            element.innerHTML = `<img src="../images/empty.png" class="empty-img" alt="Empty Cart">`;
        } else {
            element.innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                element.innerHTML += createSmallCards(data[i]);
            }
            if (name === 'cart') {
                updateBill(data);
            }
        }

        setupEvents(name);
    }

    const updateBill = (data) => {
        totalBill = data.reduce((sum, product) => sum + product.price * product.quantity, 0);
        let billPrice = document.querySelector('.bill');
        billPrice.innerHTML = `₹${totalBill}`;
    }

    

    const setupEvents = (name) => {
        const counterMinus = document.querySelectorAll(`.${name} .decrement`);
        const counterPlus = document.querySelectorAll(`.${name} .increment`);
        const counts = document.querySelectorAll(`.${name} .item-count`);
        const price = document.querySelectorAll(`.${name} .sm-price`);
        const deleteBtn = document.querySelectorAll(`.${name} .sm-delete-btn`);

        let product = JSON.parse(localStorage.getItem(name));

        counts.forEach((item, i) => {
            let cost = Number(price[i].getAttribute('data-price'));

            counterMinus[i].addEventListener('click', () => {
                if (item.innerHTML > 1) {
                    item.innerHTML--;
                    price[i].innerHTML = `₹${item.innerHTML * cost}`;
                    product[i].quantity = item.innerHTML;
                    localStorage.setItem(name, JSON.stringify(product));
                    updateBill(product);
                }
            })
            counterPlus[i].addEventListener('click', () => {
                if (item.innerHTML < 9) {
                    item.innerHTML++;
                    price[i].innerHTML = `₹${item.innerHTML * cost}`;
                    product[i].quantity = item.innerHTML;
                    localStorage.setItem(name, JSON.stringify(product));
                    updateBill(product);
                }
            })
        })

        deleteBtn.forEach((item, i) => {
            item.addEventListener('click', () => {
                product = product.filter((data, index) => index !== i);
                localStorage.setItem(name, JSON.stringify(product));
                location.reload();
            })
        })
    }

    setProducts('cart');
     setProducts('wishlist'); 
});
