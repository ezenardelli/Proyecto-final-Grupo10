window.addEventListener('load', () => {
    let form = document.querySelector("form.forms");
    
    form.addEventListener('submit', (e) => {
        
        let errors = [];

        let firstName = document.querySelector('#firstName');
        errors = [];
        if (firstName.value == '') {
            errors.push('Debe completar el campo con su nombre/s.');
        } else if (firstName.value.length < 2) {
            errors.push('El nombre debe contener al menos 2 caracteres.');
        };            
        if (errors.length > 0) {
            let error = document.querySelector('.firstName-error');
            error.innerHTML = `<h3 class="error-message">${errors[0]}</h3>`;
        } else {
            let error = document.querySelector('.firstName-error');
            error.innerHTML = '';
        };

        let lastName = document.querySelector('#lastName');
        errors = [];
        if (lastName.value == '') {
            errors.push('Debe completar el campo con su apellido/s.');
        } else if (lastName.value.length < 2) {
            errors.push('El apellido debe contener al menos 2 caracteres.');
        };            
        if (errors.length > 0) {
            let error = document.querySelector('.lastName-error');
            error.innerHTML = `<h3 class="error-message">${errors[0]}</h3>`;
        } else {
            let error = document.querySelector('.lastName-error');
            error.innerHTML = '';
        };
        
        let email = document.querySelector('#email');
        let emailError = [];
        if (email.value == '') {
            emailError.push('Debe completar el campo con su correo electronico.');
        } else if (!/\S+@\S+\.\S+/.test(email.value)) {
            emailErrors.push('Debe ingresar un formato de correo valido.');
        };
        // } else if (dbEmail) {
        //     errors.push('El correo electronico ya se encuentra en uso.');
        // };            
        if (emailError.length > 0) {
            let error = document.querySelector('.email-error');
            error.innerHTML = `<h3 class="error-message">${emailError[0]}</h3>`;
        } else {
            let error = document.querySelector('.email-error');
            error.innerHTML = '';
        };

        let category = document.querySelector('#category');
        errors = [];
        if (category.value == '') {
            errors.push('Debe elegir una categoria.');
        };           
        if (errors.length > 0) {
            let error = document.querySelector('.category-error');
            error.innerHTML = `<h3 class="error-message">${errors[0]}</h3>`;
        } else {
            let error = document.querySelector('.category-error');
            error.innerHTML = '';
        };

        let image = document.getElementById('image');
        errors = [];
        let imageExtensions = ['.png', '.gif', '.jpeg', '.jpg'];
        if (image.value == '') {
            errors.push('Debe seleccionar una imagen de perfil.');
        } else if (image.value.length > 0 && !imageExtensions.find(img => image.value.includes(img))) {
            errors.push('Las extenciones permitidas son .JPG, .JPEG, .PNG, .GIF .');
        };           
        if (errors.length > 0) {
            let error = document.querySelector('.image-error');
            error.innerHTML = `<h3 class="error-message">${errors[0]}</h3>`;
        } else {
            let error = document.querySelector('.image-error');
            error.innerHTML = '';
        };

        let password = document.querySelector('#password');
        errors = [];
        if (password.value == '') {
            errors.push('Debe completar el campo con su contraseña.');
        } else if (password.value.length < 8) {
            errors.push('La contraseña debe contener al menos 8 caracteres.');
        }  else if (!password.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/)) {
            errors.push('Debe contener una letra minuscula, una mayuscula, un numero y un caracter especial.');
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