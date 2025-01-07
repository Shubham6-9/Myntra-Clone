let mail = document.getElementById("mail")
let pass = document.getElementById("pass")

document.querySelector("form").addEventListener('submit', (e) => {
    e.preventDefault()
    let valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!valid.test(mail.value)) {
        document.getElementById("mail-err").style.display = "block"
    } else {
        document.getElementById("mail-err").style.display = "none"
        valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
        if (!valid.test(pass.value)) {
            document.getElementById("pass-err").style.display = "block"
        } else {
            document.getElementById("pass-err").style.display = "none"
            fetch("http://localhost:3000/users")
                .then(res => {
                    return res.json()
                })
                .then(res => {
                    checkData(res);
                })
        }
    }
})
function checkData(res) {
    let a = 0
    res.forEach((e) => {
        if (mail.value == e.mail) {
            a = 0
            if (pass.value == e.pass) {
                document.getElementById("pass-wrong").style.display="none";
                alert("login successfull")
            } else {
                document.getElementById("pass-wrong").style.display="block";
            }
        } else {
            a = 1
        }
    })
    if (a == 1)
        document.getElementById("not-reg").style.display = "block";
    else
        document.getElementById("not-reg").style.display = "none";
}