let id = new URLSearchParams(window.location.search).get("id")
fetch(`http://localhost:3000/products?id=${id}`)
.then((res)=>res.json())
.then((res)=>{
    
})