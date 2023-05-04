window.addEventListener('load', () => {
    let form = document.querySelector('form.product-create');

    form.addEventListener('submit', (e) => {
        
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

        let image = document.getElementById('image');
        errors = [];
        let imageExtensions = ['.png', '.gif', '.jpeg', '.jpg'];
        if (image.value == '') {
            errors.push('Debe subir una imagen producto.');
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

        let origin = document.querySelector('#origin');
        errors = [];
        if (origin.value == '') {
            errors.push('Debe completar con el origen del producto.');
        } else if (origin.value.length < 3) {
            errors.push('El origen debe contener al menos 3 caracteres.');
        };            
        if (errors.length > 0) {
            let error = document.querySelector('.origin-error');
            error.innerHTML = `<h3 class="error-message">${errors[0]}</h3>`;
        } else {
            let error = document.querySelector('.origin-error');
            error.innerHTML = '';
        };

        let destination = document.querySelector('#destination');
        errors = [];
        if (destination.value == '') {
            errors.push('Debe completar con el destino del producto.');
        } else if (destination.value.length < 3) {
            errors.push('El destino debe contener al menos 3 caracteres.');
        };            
        if (errors.length > 0) {
            let error = document.querySelector('.destination-error');
            error.innerHTML = `<h3 class="error-message">${errors[0]}</h3>`;
        } else {
            let error = document.querySelector('.destination-error');
            error.innerHTML = '';
        };

        let person = document.querySelector('#person');
        errors = [];
        if (person.value == '') {
            errors.push('Debe especificar la cantidad de personas incluidas.');
        } else if (person.value.length < 1 ) {
            errors.push('No debe superar el maximo de 10.');
        };            
        if (errors.length > 0) {
            let error = document.querySelector('.person-error');
            error.innerHTML = `<h3 class="error-message">${errors[0]}</h3>`;
        } else {
            let error = document.querySelector('.person-error');
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

        let date = document.querySelector('#date');
        errors = [];
        if (date.value == '') {
            errors.push('Debe especificar la fecha del producto.');
        };            
        if (errors.length > 0) {
            let error = document.querySelector('.date-error');
            error.innerHTML = `<h3 class="error-message">${errors[0]}</h3>`;
        } else {
            let error = document.querySelector('.date-error');
            error.innerHTML = '';
        };

        let price = document.querySelector('#price');
        errors = [];
        if (price.value == '') {
            errors.push('Debe especificar el valor del producto.');
        };            
        if (errors.length > 0) {
            let error = document.querySelector('.price-error');
            error.innerHTML = `<h3 class="error-message">${errors[0]}</h3>`;
        } else {
            let error = document.querySelector('.price-error');
            error.innerHTML = '';
        };

        if (errors.length > 0) {
            e.preventDefault();
        } else {
            form.submit();
        };

    })
})