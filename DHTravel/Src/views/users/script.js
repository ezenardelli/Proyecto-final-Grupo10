window.addEventListener("load", () => {
    let form = document.querySelector("form.forms");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("Evento prevenido correctamente")
    //     let errors = [];

    //     let firstName = document.querySelector('#firstName');
    //     if (firstName.value === '') {
    //         errors.push('Debe completar el campo con su nombre/s');
    //     } else if (firstName.value.length < 2) {
    //         errors.push('El nombre debe contener al menos 2 caracteres');
    //     };            
    //     if (errors.length > 0) {
            

    //         let error = document.querySelector('.firstName-error');
    //         error.innerHTML = '<h2>' + errors +'</h2>'
    //     }
    
    
    
    })
})