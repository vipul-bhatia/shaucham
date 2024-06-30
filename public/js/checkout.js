window.onload = () => {
    if(!sessionStorage.user){
        location.replace('/login');
    }
}

const placeOrderBtn = document.querySelector('.submit-address');
placeOrderBtn.addEventListener('click', () => {
    let address = getAddress();

    if(address){
        fetch('/order', {
            method:'post',
            headers: new Headers({'Content-Type': application/json}),
            body: JSON.stringify({
                order : JSON.parse(localStorage.cart),
                email:JSON.parse(sessionStorage.user).email,
                add:address,
            })
        }).then(res => res.join())
        .then(data => {
            alert(data);
        })
    }
})

const getAddress = () => {
    let name = document.querySelector('#name');
    let number = document.querySelector('#number');
    let address = document.querySelector('#address');
    let city = document.querySelector('#city');
    let state = document.querySelector('#state');
    let pincode = document.querySelector('#pincode');
    let landmark = document.querySelector('#landmark');

    if (!name || !number || !address || !city || !state || !pincode || !landmark) {
        return showAlert('Please fill all the fields');
    }

    if (!name.value.trim() || !number.value.trim() || !address.value.trim() || !city.value.trim() || !state.value.trim() ||
        !pincode.value.trim() || !landmark.value.trim()) {
        return showAlert('Please fill all the fields');
    } else {
        return {
            name: name.value,
            number: number.value,
            address: address.value,
            city: city.value,
            state: state.value,
            pincode: pincode.value,
            landmark: landmark.value
        };
    }
}