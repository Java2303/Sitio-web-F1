document.addEventListener('DOMContentLoaded', () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoUl = document.getElementById('carrito');
    const totalSpan = document.getElementById('total');

    function actualizarCarrito() {
        carritoUl.innerHTML = '';
        let total = 0;

        carrito.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.producto} - $${item.precio.toFixed(2)}`;

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList.add('eliminar');
            botonEliminar.onclick = () => eliminarDelCarrito(index);
            li.appendChild(botonEliminar);

            carritoUl.appendChild(li);
            total += item.precio;
        });

        totalSpan.textContent = total.toFixed(2);
    }

    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }

    // Función para vaciar el carrito
    window.vaciarCarrito = function() {
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }

    actualizarCarrito();
});
