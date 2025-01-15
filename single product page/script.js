let id = new URLSearchParams(window.location.search).get("id")
let uid = localStorage.getItem("User")
cartDisplay();
let currentProduct;
fetch(`http://localhost:3000/products?id=${id}`)
.then((res) => res.json())
.then((res) => {
    currentProduct = res[0]
    view();
})

function view() {
    document.getElementById("img").style.backgroundImage = `url(${currentProduct.image})`;
    document.getElementById("title").innerText = currentProduct.title;
    document.getElementById("description").innerText = currentProduct.description;
    document.getElementById("rating").innerHTML = `${star(Number(currentProduct.rating.rate))} ${currentProduct.rating.rate} (${currentProduct.rating.count})`;
    document.getElementById("cate").innerText = `Type : ${currentProduct.category}`;
    if (currentProduct.category.includes("clothing")) {
        document.getElementById("size").style.display = "block"
        let btn = document.querySelectorAll(".size")
        btn.forEach((e) => {
            e.addEventListener('click', () => {
                console.log(e.value)
            })
        })
    } else {
        document.getElementById("size").style.display = "none"
    }
    document.getElementById("price").innerText = `₹ ${currentProduct.price}`
}

function star(rate) {
    rate = Math.floor(rate)
    let a = []
    for (let i = 1; i <= rate; i++) {
        a.push(`<i class="fa-sharp fa-solid fa-star" style="color: #FFD43B;"></i>`);
    }
    for (let i = 1; i <= 5 - rate; i++) {
        a.push(`<i class="fa-sharp fa-light fa-star" style="color: #FFD43B;"></i>`);
    }
    return a.join("")
}
document.getElementById("cart").addEventListener('click', () => {
    fetch(`http://localhost:3000/users/${uid}`)
        .then((res) => res.json())
        .then((res) => cart(res))
})

function cart(res) {
    currentProduct.quantity = 1
    if (res.cart[0] == undefined) {
        fetch(`http://localhost:3000/users/${uid}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                cart: [currentProduct]
            })
        })
            .then((res) => res.json())
            .then((res) => {
                cartDisplay()
            })
            .catch((err) => alert(err))
    } else {
        let index = (res.cart).findIndex((e) => e.id === currentProduct.id)
        if (index == -1) {
            let newCart = res.cart
            newCart.push(currentProduct)
            fetch(`http://localhost:3000/users/${uid}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cart: newCart
                })
            })
                .then((res) => res.json())
                .then((res) => {
                    cartDisplay()
                })
                .catch((err) => {
                    alert(err)
                })
        } else {
            let newCart = res.cart
            let index = newCart.findIndex((e) => e.id === currentProduct.id)
            newCart[index].quantity++
            console.log(newCart)
            fetch(`http://localhost:3000/users/${uid}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cart: newCart
                })
            })
                .then((res) => res.json())
                .then((res) => {

                })
                .catch((err) => alert(err))
        }
    }
}

function cartDisplay() {
    fetch(`http://localhost:3000/users/${uid}`)
        .then((res) => res.json())
        .then((res) => {
            let a = 0
            res.cart.forEach((e) => a++)
            document.getElementById("cart-count").innerHTML = `<p>${a}</p>`
        })
}