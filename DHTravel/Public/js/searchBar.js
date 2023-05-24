window.addEventListener('load', () => {
    document.getElementById("searchButton").addEventListener("click", buscarProductos);
    async function buscarProductos() {
        let input = document.getElementById("searchInput").value.toLowerCase();
        let resultado = document.getElementById("resultadoBusqueda");
        resultado.innerHTML = "";

        try {
            // Realiza la consulta a la base de datos
            const productos = await db.Product.findAll({
                where: {
                    nombre: {
                        [Op.like]: '%' + input + '%'
                    }
                }
            });

            // Muestra los resultados de la búsqueda
            productos.forEach(function (producto) {
                resultado.innerHTML += '<p>' + producto.nombre + '</p>';
            });
        } catch (error) {
            console.log('Error al buscar productos:', error);
        }
    }
})