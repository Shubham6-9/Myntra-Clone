fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((res) => {
        // view(res);
        document.getElementById("products").innerHTML = view(res)
    })
    .catch((err) => alert(err))

function view(res) {
    return res.map((e) => {
        return `<div class="card col-12 col-md-6 col-lg-4 my-3">
                    <a href="../single product page/index.html?id=${e.id}">
                        <div id="pro-img">
                            <img src="${e.image}" alt="${e.title}" height="100%" width="100%">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${e.title}</h5>
                            <p class="card-text">${(e.description).slice(0, 70)}.....</p>
                            <p class="card-text">₹ ${e.price}</p>
                            <p class="card-text">Rating ${e.rating.rate} <i class="fa-sharp fa-solid fa-star fa-bounce" style="color: #FFD43B;"></i> (${e.rating.count})</p>
                        </div>
                    </a>
                </div>`
    }).join("");
}