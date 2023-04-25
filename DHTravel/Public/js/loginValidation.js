window.addEventListener("load", () => {
    let form = document.querySelector("form.forms");
    
    form.addEventListener("submit", (e) => {
        
        let errors = [];

        let email = document.querySelector('#email');
        if (email.value == '') {
            errors.push('Debe completar el campo con su correo electronico.');
        } else if (!/\S+@\S+\.\S+/.test(email.value)) {
            errors.push('Debe ingresar un formato de correo valido.');
        };            
        if (errors.length > 0) {
            let error = document.querySelector('.email-error');
            error.innerHTML = `<h3 class="error-message">${errors[0]}</h3>`;
        } else {
            let error = document.querySelector('.email-error');
            error.innerHTML = '';
        };

        let password = document.querySelector('#password');
        errors = [];
        if (password.value == '') {
            errors.push('Debe completar el campo con su contraseña.');
        // }  else if (w22) {
        //     errors.push('La contraseña no es valida.');
        };            
        if (errors.length > 0) {
            let error = document.querySelector('.password-error');
            error.innerHTML = `<h3 class="error-message">${errors[0]}</h3>`;
        } else {
            let error = document.querySelector('.password-error');
            error.innerHTML = '';
        };
        
        if (errors.length > 0) {
            e.preventDefault();
        } else {
            form.submit();
        }
    
    })
})