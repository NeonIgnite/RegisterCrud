document.querySelector('input[type="submit"]').addEventListener('click', function(e){
e.preventDefault();
var inputs = document.querySelectorAll('input:not([type="submit"])');
var error = false
for (var i = 0; i < inputs.length; i++){
    if(inputs[i].value.length ==0){
        inputs[i].nextElementSibling.innerHTML =`${inputs[i].name} required`
        error=true
    }else{
        inputs[i].nextElementSibling.innerHTML =``
    }
}

var username =document.querySelector('input[type="text"]')
var username_pattern = /^[A-Z][a-z]{3,8}$/
if(username.value.length !=0){
    if(username_pattern.test(username.value)==false){
        username.nextElementSibling.innerHTML = `Username Not Valid`
        error=true
    }else{
        username.nextElementSibling.innerHTML =``
    }
}

var email = document.querySelector('input[type="email"]')
var email_pattern = /^[a-z]{3,8}@(gmail|yahoo)\.com$/

if(email.value.length !=0){
    if(email_pattern.test(email.value)==false){
        email.nextElementSibling.innerHTML = `Email Not Valid`
        error=true
    }else{
        email.nextElementSibling.innerHTML =``
    }
}

var password = document.querySelector('input[type="password"]')
var password_pattern = /^[0-9]{3,8}$/
if(password.value.length !=0){
    if(password_pattern.test(password.value)==false){
        password.nextElementSibling.innerHTML = `Password Not Valid`
        error=true
    }else{
        password.nextElementSibling.innerHTML =``
    }
}

if(!error){
    var userSignUp ={
        name : document.querySelector('input[type="text"]').value,
        email:document.querySelector('input[type="email"]').value,
        password:document.querySelector('input[type="password"]').value
    }
   localStorage.setItem('userform', JSON.stringify(userSignUp))
   window.location.href=`http://127.0.0.1:5501/login.html` 
}

})