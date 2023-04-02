

// document.getElementById('title').innerHTML += userLoggedIn.name

// var counter=0;

// var x=setInterval(function(){
//     counter++
//     var container=document.getElementById('main')
//     container.style.textAlign="center"

//     var image= document.createElement('img')
//     image.setAttribute('src','Images/Chicken.png')
//     image.style.width= `60px`

//     container.append(image)
//     if(counter==100){
//         clearInterval(x)
//     }
// },30)
// ****************************************************************************************
// var signUpName=document.getElementById()
// var signUpEmail=document.getElementById()
// var signUpPassword=document.getElementById()
// var signUpBtn=document.getElementById()
// var userForm=[]

// signUpBtn.addEventListener('click',function(){
//     var userInfo={
//         name: signUpName.value,
//         email: signUpEmail.value,
//         password:signUpPassword.value
//     }
//     userForm.push(userInfo)
//     localStorage.setItem('user',JSON.stringify(userForm))
// })
var productName=document.getElementById('name')
var productPrice=document.getElementById('price')
var productCategory=document.getElementById('cat')
var productDescription=document.getElementById('desc')
var addProduct=document.getElementById('addBtn')
var updateBtnn=document.getElementById('updateBtn')
var productContainer=[]
let userform= JSON.parse(localStorage.getItem('userform'))
let userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'))
let adminLoggedIn=JSON.parse(localStorage.getItem('adminLoggedIn'))
var searchInput=document.getElementById('searchInpt')
// let label=inputError.querySelectorAll('label')
var inputError=document.getElementById('errorform')
let ifAdmin=false
// var inputs= inputError.querySelectorAll('input:not([type="search"])')

if(userform.email==adminLoggedIn.email && userform.password==adminLoggedIn.password){
    
    // inputError.style.display=none;
    inputError.style.display="show";
    ifAdmin=true
    // console.log("hello admin");
}
else if(userform.email==userLoggedIn.email && userform.password==userLoggedIn.password){
    document.getElementById('identity').innerHTML=`Hello ${userLoggedIn.name} `
    // searchInput.style.display="show"
    inputError.style.display="none";
    
    // searchInput.style.visibility="visible";
    ifAdmin=false
    // getElementById("update").style.display="none"
    // console.log("hello user")
}
// seperation
if(localStorage.getItem('Products')!=null){
    productContainer=JSON.parse(localStorage.getItem('Products'))
    if(ifAdmin==true){
        displayProductAdmin()
    }
    else{
        displayProductUser()
    }
}
addProduct.addEventListener('click',function(){
    
    var product={
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        description:productDescription.value,
    }
    var inputs= inputError.querySelectorAll('input:not([type="search"])')
    var error=false;
    for (var i = 0; i < inputs.length; i++){
        if(inputs[i].value.length ==0){
            inputs[i].nextElementSibling.innerHTML =`${inputs[i].name} required`
            error=true
        }else{
            inputs[i].nextElementSibling.innerHTML =``
            
        }
    }
    //Name validation rule:1-only 1 word is allowed
    //2-can start with either small or capital letter
    //3-the length of the word ranges from 6-10
    var productName_pattern = /^[a-zA-Z]{5,10}$/
    if(productName.value.length !=0){
        if(productName_pattern.test(productName.value)==false){
            productName.nextElementSibling.innerHTML = `Username Not Valid`
            error=true
        }else{
            productName.nextElementSibling.innerHTML =``
        }
    }
    // //Price validation rule:1-the first number must be from 1-9 
    // //2-the next number can be from 0-9
    // //3-there can only be 5 numbers 
    var productPrice_pattern = /^[1-9]\d{2,4}$/
    if(productPrice.value.length !=0){
        if(productPrice_pattern.test(productPrice.value)==false){
            productPrice.nextElementSibling.innerHTML = `Price Not Valid`
            error=true
        }else{
            productPrice.nextElementSibling.innerHTML =``
        }
    }
    // //Category validation rule:1-first letter capital 
    // //2-only 1 word is allowed to be entered
    // //3-the length of this word ranges rom 3-15
    var productCategory_pattern = /^[A-Z][a-z]{3,15}$/gm
    if(productCategory.value.length !=0){
        if(productCategory_pattern.test(productCategory.value)==false){
            productCategory.nextElementSibling.innerHTML = `Category Syntax Not Valid`
            error=true
        }else{
            productCategory.nextElementSibling.innerHTML =``
        }
    }
    // //Description validation rule:1- the first word must start with capital letter 
    // //2-spaces between all words if there is more than one word
    // //3-the user has no restriction to the number of words entered
    var productDescription_pattern=/^[A-Z][a-z]{1,15} ?(([a-z]{1,15})? ?([a-z]{1,15}))*$/g
    if(productDescription.value.length !=0){    
        if(productDescription_pattern.test(productDescription.value)==false){
            productDescription.nextElementSibling.innerHTML=`Description Syntax Not Valid`
            error=true
        }else{
            productDescription.nextElementSibling.innerHTML=``
        }
    }
        
    
    //Dont add the product if there is an error
    if(!error){
        productContainer.push(product)
        localStorage.setItem('Products', JSON.stringify(productContainer))
        if(ifAdmin==true){
            displayProductAdmin()
        }
        else{
            displayProductUser()
        }
        
        clearProduct()
    }
    
   
    
    
})

function displayProductAdmin(){
    var hamada=``
    for(var i=0;i<productContainer.length;i++){
        hamada+=`<tr>
                    <th scope="row"> <p id='nameProduct'> ${productContainer[i].name} </p><input type="text" class="form-control d-none " id="nameUpdate"></th>
                    <td> <p id='priceProduct'>${productContainer[i].price}</p><input type="text" class="form-control d-none " id="priceUpdate"></td>
                    <td> <p id='catProduct'>${productContainer[i].category}</p><input type="text" class="form-control d-none " id="catUpdate"></td>
                    <td> <p id='descProduct'>${productContainer[i].description}</p><input type="text" class="form-control d-none " id="descUpdate"></td>
                    <td><button id ="add" class="btn btn-outline-danger"onclick="deleteData(${i})">Delete</button></td> 
                    <td><button id ="update" class="btn btn-outline-warning"onclick="updateProduct(${i})">Update</button>
                    <button class="btn btn-outline-success px-3 d-none" id='savebtn'>Save</button></td>
                </tr>`
    }
    document.getElementById('info').innerHTML=hamada

    searchInput.addEventListener('input',function(){
        var hamada=``
        var searchValue=searchInput.value
        for(var i=0;i<productContainer.length;i++){
            if(productContainer[i].name.toLowerCase().includes(searchValue.toLowerCase())==true){
                hamada+=`<tr>
                            <th scope="row"> <p id='nameProduct'> ${productContainer[i].name} </p><input type="text" class="form-control d-none " id="nameUpdate"></th>
                            <td> <p id='priceProduct'>${productContainer[i].price}</p><input type="text" class="form-control d-none " id="priceUpdate"></td>
                            <td> <p id='catProduct'>${productContainer[i].category}</p><input type="text" class="form-control d-none " id="catUpdate"></td>
                            <td> <p id='descProduct'>${productContainer[i].description}</p><input type="text" class="form-control d-none " id="descUpdate"></td>
                            <td><button class="btn btn-outline-danger"onclick="deleteData(${i})">Delete</button></td> 
                            <td><button class="btn btn-outline-warning"onclick="updateProduct(${i})">Update</button>
                            <button class="btn btn-outline-success px-3 d-none" id='savebtn'>Save</button></td>
                        </tr>`
                
            }
            document.getElementById('info').innerHTML=hamada
        }
    })
}
function displayProductUser(){
    var hamada=``
    for(var i=0;i<productContainer.length;i++){
        hamada+=`<tr>
                    <th scope="row"> <p id='nameProduct'> ${productContainer[i].name} </p><input type="text" class="form-control d-none " id="nameUpdate"></th>
                    <td> <p id='priceProduct'>${productContainer[i].price}</p><input type="text" class="form-control d-none " id="priceUpdate"></td>
                    <td> <p id='catProduct'>${productContainer[i].category}</p><input type="text" class="form-control d-none " id="catUpdate"></td>
                    <td> <p id='descProduct'>${productContainer[i].description}</p><input type="text" class="form-control d-none " id="descUpdate"></td>
                </tr>`
    }
    document.getElementById('info').innerHTML=hamada

    searchInput.addEventListener('input',function(){
        var hamada=``
        var searchValue=searchInput.value
        for(var i=0;i<productContainer.length;i++){
            if(productContainer[i].name.toLowerCase().includes(searchValue.toLowerCase())==true){
                hamada+=`<tr>
                            <th scope="row"> <p id='nameProduct'> ${productContainer[i].name} </p><input type="text" class="form-control d-none " id="nameUpdate"></th>
                            <td> <p id='priceProduct'>${productContainer[i].price}</p><input type="text" class="form-control d-none " id="priceUpdate"></td>
                            <td> <p id='catProduct'>${productContainer[i].category}</p><input type="text" class="form-control d-none " id="catUpdate"></td>
                            <td> <p id='descProduct'>${productContainer[i].description}</p><input type="text" class="form-control d-none " id="descUpdate"></td>
                            
                        </tr>`
                
            }
            document.getElementById('info').innerHTML=hamada
        }
    })
}

function clearProduct(){
    productName.value=``
    productPrice.value=``
    productCategory.value=``
    productDescription.value=``
}
function deleteData(indexed){
    productContainer.splice(indexed,1)
    localStorage.setItem('Products',JSON.stringify(productContainer))
    displayProductAdmin()
}

var x;
function updateProduct(indexed){
    x=indexed
    productName.value = productContainer[indexed].name
    productPrice.value = productContainer[indexed].price
    productCategory.value = productContainer[indexed].category
    productDescription.value = productContainer[indexed].description
    updateBtnn.classList.toggle('show')
    addProduct.classList.toggle('show')

}
updateBtnn.addEventListener('click',function(){
    productContainer[x].name=productName.value
    productContainer[x].price=productPrice.value
    productContainer[x].category=productCategory.value
    productContainer[x].description=productDescription.value
    localStorage.setItem('Products',JSON.stringify(productContainer))
    updateBtnn.classList.toggle('show')
    addProduct.classList.toggle('show')
    displayProductAdmin()
    clearProduct()
})


