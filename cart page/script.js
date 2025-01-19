var uid = localStorage.getItem("User")
cartCount();
function cartCount() {
    fetch(`http://localhost:3000/users/${uid}`)
        .then((res) => res.json())
        .then((res) => {
            let a = 0
            res.cart.forEach((e) => a++)
            document.getElementById("cart-count").innerHTML = `<p>${a}</p>`
        })
}

fetch(`http://localhost:3000/users/${uid}`)
    .then((res) => res.json())
    .then((res) => {
        document.getElementById("dis-cart-prod-box").innerHTML = cartDisplay(res.cart)
        document.querySelectorAll(".add").forEach((e) => {
            e.addEventListener('click', () => {
                e.style.display = "block"
                addQuantity(e.value);
            })
        })
        document.querySelectorAll(".sub").forEach((e) => {
            e.addEventListener('click', () => {
                e.style.display = "block"
                subQuantity(e.value);
            })
        })
        document.getElementById("dis-orders").innerHTML = ordersDisplay(res.orders)
        document.querySelectorAll(".order-btn").forEach((e) => {
            e.addEventListener('click', () => {
                // console.log()
                orderItemDisplay(e.value);
            })
        })
    })

function cartDisplay(cart) {
    cartTotal();
    return cart.map((e) => {
        return `<div class="cart-prod my-3 p-3 row d-flex justify-content-evenly">
                    <div class="col-2">
                        <img src="${e.image}" height="100%" width="100%">
                    </div>
                    <div class="col-5">
                        <p><b>${e.title}</b></p>
                        <p>${e.description}</p>
                        <p>₹ ${e.price}</p>
                    </div>
                    <div class="col-3">
                        <p>Category : ${e.category}</p>
                        <p>${star(Number(e.rating.rate))} ${e.rating.rate} (${e.rating.count})</p>
                        <div class="d-flex gap-2 align-items-center">
                            <button class="add" value=${e.id}>+</button>
                            <p class="quantity">Quantity ${e.quantity}</p>
                            <button class="sub" value=${e.id}>-</button>
                        </div>
                    </div>
                </div>`
    }).join("")
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

function addQuantity(prodId) {
    var cart
    fetch(`http://localhost:3000/users/${uid}`)
        .then((res) => res.json())
        .then((res) => {
            cart = res.cart
            cart.forEach((e) => {
                if (e.id == prodId) {
                    if (e.quantity < 10) {
                        e.quantity++
                    }
                }
            })
            fetch(`http://localhost:3000/users/${uid}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cart: cart
                })
            })
                .then((res) => res.json())
                .then((res) => {

                })
                .catch((err) => alert(err))

        })
        .catch((err) => alert(err))
}

function subQuantity(prodId) {
    var cart
    fetch(`http://localhost:3000/users/${uid}`)
        .then((res) => res.json())
        .then((res) => {
            cart = res.cart
            cart.forEach((e) => {
                if (e.id == prodId) {
                    if (e.quantity > 1) {
                        e.quantity--
                    }
                }
            })
            fetch(`http://localhost:3000/users/${uid}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cart: cart
                })
            })
                .then((res) => res.json())
                .then((res) => {

                })
                .catch((err) => alert(err))

        })
        .catch((err) => alert(err))
}

function cartTotal() {
    fetch(`http://localhost:3000/users/${uid}`)
        .then((res) => res.json())
        .then((res) => {
            let price = 0;
            (res.cart).forEach((e) => {
                price += (e.quantity * Math.ceil(e.price))
            })
            document.getElementById("cart-price").innerText = `Cart Total: ₹ ${price}`
        })
        .catch((err) => alert(err))
}

document.getElementById("checkout-btn").addEventListener('click', () => {
    fetch(`http://localhost:3000/users/${uid}`)
        .then((res) => res.json())
        .then((res) => {
            let newOrders = res.orders;
            if (res.cart != "") {
                newOrders.push(res.cart)
                fetch(`http://localhost:3000/users/${uid}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        cart: [],
                        orders: newOrders
                    })
                })
                    .then((res) => res.json())
                    .then((res) => {
                        console.log(res)
                        // ordersDisplay(res.orders)
                    })
            }
        })
        .catch((err) => alert(err))
})

function ordersDisplay(orders) {
    let i = 0
    return orders.map((e) => {
        i++
        let orderPrice = 0
        e.forEach((ele)=>{
            orderPrice += Math.ceil(ele.price)
        })
        return `<button class="order-btn" value="${i - 1}">Order ${i}</button> <p>₹ ${orderPrice}</p><br>`
    }).join("")
}

function orderItemDisplay(index) {
    fetch(`http://localhost:3000/users/${uid}`)
        .then((res) => res.json())
        .then((res) => {
            let order = res.orders[index]
            document.getElementById("dis-cart-prod-box").innerHTML = cartDisplay(order)
            document.querySelectorAll(".add").forEach(e => {
                e.style.display = "none"
            })
            document.querySelectorAll(".sub").forEach(e => {
                e.style.display = "none"
            })
            index++
            document.getElementById("orderNo").innerText = `Order ${index}`

        })
        .catch(err => alert(err))
}