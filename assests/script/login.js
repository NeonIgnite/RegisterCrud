let emailInput=document.querySelector('input[type="email"]')
let passwordInput=document.querySelector('input[type="password"]')
let checkAdmin=false
let adminEmail="admin@gmail.com"
let adminPassword="112233"
document.querySelector('input[type="submit"]').addEventListener('click', function(e){
e.preventDefault()

var inputs = document.querySelectorAll('input:not([type="submit"])')
for (var i = 0; i < inputs.length; i++){
    if (inputs[i].value.length ==0){
        inputs[i].nextElementSibling.innerHTML =`${inputs[i].name} required`;
    }else{
        inputs[i].nextElementSibling.innerHTML =``
    }
}

var userform =JSON.parse(localStorage.getItem('userform'))
if(userform.email==adminEmail && userform.password==adminPassword){
    localStorage.setItem('adminLoggedIn',JSON.stringify(userform));
    // window.location.href =`http://127.0.0.1:5501/admin.html`
}
else if(userform.email != adminEmail && userform.password != adminPassword){
    localStorage.setItem('userLoggedIn',JSON.stringify(userform));
    
}
window.location.href =`http://127.0.0.1:5501/welcome.html`

})