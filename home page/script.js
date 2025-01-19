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

fetch(`http://localhost:3000/users`)
    .then((res) => res.json())
    .then((res) => {
        res.forEach((e) => {
            if (e.id == localStorage.getItem("User")) {
                document.getElementById("username").innerText = `${res[0].uname}`
            }
        })
    })

document.getElementById("logout").addEventListener('click', () => {
    localStorage.setItem("loginSuccess", false)
    localStorage.setItem("User", "")
    window.location.reload()
})