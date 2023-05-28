window.addEventListener('load', () => {
    document.getElementById("searchButton").addEventListener("click", buscarProductos);
    async function buscarProductos() {
        let input = document.getElementById("searchInput").value.toLowerCase();
        let resultado = document.getElementById("resultadoBusqueda");
        resultado.innerHTML = "";

        try {
            const response = await fetch(`http://localhost:3031/api/products/?name=${input}`);

            const data = await response.json();

            const productos = data.products;

            const productosFiltrados = productos.filter(producto => {
                const productName = producto[0].name.toLowerCase();
                return productName.includes(input);

            });            
            
            productosFiltrados.forEach(function (producto) {
                resultado.innerHTML += `<a href="/product/${producto[0].id}/detail"><p>${producto[0].name}</p></a>`;
            });
        } catch (error) {
            console.log('Error al buscar productos:', error);
        }
    }
})