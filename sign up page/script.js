let uname = document.getElementById("uname")
let mail = document.getElementById("mail")
let pass = document.getElementById("pass")

document.getElementById("sign-in").addEventListener('submit', (e) => {
    e.preventDefault();
    if (!((uname.value).length >= 3 && (uname.value).length <= 10)) {
        document.getElementById("uname-err").style.display = "block";
    } else {
        document.getElementById("uname-err").style.display = "none";
        let valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!valid.test(mail.value)) {
            document.getElementById("mail-err").style.display = "block";
        } else {
            document.getElementById("mail-err").style.display = "none";
            valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
            if (!valid.test(pass.value)) {
                document.getElementById("pass-err").style.display = "block";
            } else {
                document.getElementById("pass-err").style.display = "none";
                fetch("http://localhost:3000/users")
                    .then(res => res.json())
                    .then(res => {
                        checkDuplicateData(res);
                    })
            }
        }
    }
})
function checkDuplicateData(res) {
    let unames = []
    let mails = []
    res.forEach((e) => {
        unames.push(e.uname);
        mails.push(e.mail);
    })
    if (unames.includes(uname.value)) {
        alert("already registered username");
    } else {
        if (mails.includes(mail.value)) {
            alert("already registered email");
        } else {
            insertData();
        }
    }
}
function insertData() {
    fetch("http://localhost:3000/users", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            uname: `${uname.value}`,
            mail: `${mail.value}`,
            pass: `${pass.value}`,
            cart: []
        })
    })
        .then(res => {
            return res.json()
        })
        .then(res => {
            window.location.href = "../login page/index.html"
        })
}