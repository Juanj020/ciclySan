import { login } from "./ApiAu.js";

const formu = document.querySelector('.formulario');
formu.addEventListener('submit', validarLogin);

function validarLogin(e) {
    e.preventDefault();

    const correo = document.querySelector('.correo').value
    const password = document.querySelector('.password').value

    const DataLog = {
        correo,
        password
    }

    if(validate(DataLog)){
        alert("LLene todos la información")
        return
    }

    login(DataLog)
    .then((response) => {
        
        if(response.success){
            window.location.href = "../index.html"
        }else{
            alert(response.msg)
        }
    })
    .catch((error)=>{
        console.log(error);
    })
}

function validate(objeto){
    return !Object.values(objeto).every(element => element !== '');
}