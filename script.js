document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.color = 'red';
        });

        link.addEventListener('mouseout', () => {
            link.style.color = 'white';
        });
    });

    const pilotForm = document.getElementById('pilotForm');
    const pilotsList = document.getElementById('pilotsList');

    const pilotosGuardados = JSON.parse(localStorage.getItem('pilotos')) || [];
    pilotosGuardados.forEach(piloto => agregarPilotoALista(piloto));

    pilotForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const nacionalidad = document.getElementById('nacionalidad').value;
        const equipo = document.getElementById('equipo').value;
        const gp = document.getElementById('gp').value;

        const nuevoPiloto = {
            nombre,
            apellido,
            nacionalidad,
            equipo,
            gp
        };
        pilotosGuardados.push(nuevoPiloto);
        localStorage.setItem('pilotos', JSON.stringify(pilotosGuardados));

        agregarPilotoALista(nuevoPiloto);
        pilotForm.reset();
    });

    function agregarPilotoALista(piloto) {
        const li = document.createElement('li');
        li.textContent = `${piloto.nombre} ${piloto.apellido} (${piloto.nacionalidad}) - Equipo: ${piloto.equipo}, GP Favorito: ${piloto.gp}`;
        pilotsList.appendChild(li);
    }
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productosList = document.getElementById('productosList');

    // Función para agregar productos al carrito
    window.agregarAlCarrito = function(producto, precio) {
        carrito.push({ producto, precio });
        localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar en localStorage
        alert(`${producto} ha sido agregado al carrito.`);
    };

    // Función para mostrar productos en la lista
    function mostrarProductos() {
        const productos = [
            { nombre: 'Camiseta F1', precio: 29.99 },
            { nombre: 'Gorra F1', precio: 15.99 },
            { nombre: 'Modelo de Coche F1', precio: 59.99 },
            { nombre: 'Póster F1', precio: 9.99 },
            { nombre: 'Bufanda F1', precio: 19.99 },
            { nombre: 'Taza F1', precio: 12.99 }
        ];

        productos.forEach(producto => {
            const li = document.createElement('li');
            li.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
            
            const botonAgregar = document.createElement('button');
            botonAgregar.textContent = 'Agregar al Carrito';
            botonAgregar.onclick = () => agregarAlCarrito(producto.nombre, producto.precio);
            
            li.appendChild(botonAgregar);
            productosList.appendChild(li);
        });
    }

    mostrarProductos();
    
});