window.addEventListener('load', () => {
    const form = document.querySelector('form.formsAdmin');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let errors = [];

        let name = document.querySelector('#name');
        errors = [];
        if (name.value == '') {
            errors.push('Debe completar el nombre del producto.');
        } else if (name.value.length < 5) {
            errors.push('El nombre debe contener al menos 5 caracteres.');
        };            
        if (errors.length > 0) {
            let error = document.querySelector('.name-error');
            error.innerHTML = `<h3 class="error-message">${errors[0]}</h3>`;
        } else {
            let error = document.querySelector('.name-error');
            error.innerHTML = '';
        };

        let description = document.querySelector('#description');
        errors = [];
        if (description.value == '') {
            errors.push('Debe completar la descripcion del producto.');
        } else if (description.value.length < 5) {
            errors.push('La descrpcion debe contener al menos 20 caracteres.');
        };            
        if (errors.length > 0) {
            let error = document.querySelector('.description-error');
            error.innerHTML = `<h3 class="error-message">${errors[0]}</h3>`;
        } else {
            let error = document.querySelector('.description-error');
            error.innerHTML = '';
        };

        let image = document.querySelector('#description');
        errors = [];
        if (image.value == '') {
            errors.push('Debe subir una imagen producto.');
        } else if (image.value.length < 5) {
            errors.push('Las extenciones permitidas son .JPG, .JPEG, .PNG, .GIF .');
        };            
        if (errors.length > 0) {
            let error = document.querySelector('.image-error');
            error.innerHTML = `<h3 class="error-message">${errors[0]}</h3>`;
        } else {
            let error = document.querySelector('.image-error');
            error.innerHTML = '';
        };



    })
})