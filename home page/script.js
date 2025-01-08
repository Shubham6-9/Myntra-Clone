document.getElementById("login").addEventListener('click', () => {
    window.location.href = "../login page/index.html"
})
document.getElementById("signup").addEventListener('click', () => {
    window.location.href = "../sign up page/index.html"
})
document.getElementById("product").addEventListener('click', () => {
    window.location.href = "../product page/index.html"
})

let valid = localStorage.getItem("loginSuccess");
if (valid == 'true') {
    document.getElementById("profile-login").addEventListener('mouseover', () => {
        document.getElementById("profile-login-true").style.display = "block"
    })
    document.getElementById("profile-login").addEventListener('mouseout', () => {
        document.getElementById("profile-login-true").style.display = "none"
    })
} else {
    document.getElementById("profile-login").addEventListener('mouseover', () => {
        document.getElementById("profile-login-page").style.display = "block"
    })
    document.getElementById("profile-login").addEventListener('mouseout', () => {
        document.getElementById("profile-login-page").style.display = "none"
    })
}

const id = (new URLSearchParams(window.location.search)).get("id")
fetch(`http://localhost:3000/users?id=${id}`)
    .then((res) => res.json())
    .then((res) => {
        console.log(res[0].uname)
        document.getElementById("username").innerText = `${res[0].uname}`
    })

document.getElementById("logout").addEventListener('click', () => {
    localStorage.setItem("loginSuccess", false)
    window.location.reload()
})