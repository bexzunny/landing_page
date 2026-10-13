
document.addEventListener('DOMContentLoaded', () => {

    // Obtener elementos del formulario
    const form = document.getElementById('formulario');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');
    const divrespuesta = document.getElementById('respuesta');

    // Evitar errores si los elementos todavía no existen
    if (!form || !nombreInput || !emailInput ||
        !mensajeInput || !divrespuesta) {
        console.error('No se encontraron todos los elementos del formulario.');
        return;
    }

    const LIMITES = {

        emailMax: 254,
        mensajeMin: 10,
        mensajeMax: 2000
    };

    const patrones = {
        nombre: /^[\p{L}\p{M}]+(?:[ '\u2019-][\p{L}\p{M}]+)*$/u,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    };

    // Normalizar espacios repetidos
    const normalizarTexto = (texto) =>
        texto.trim().replace(/\s+/g, ' ');

    
    function mostrarErrores(errores) {
        divrespuesta.replaceChildren();

        if (errores.length > 0) {
            divrespuesta.style.color = 'red';

            const lista = document.createElement('ul');

            errores.forEach((error) => {
                const elemento = document.createElement('li');
                elemento.textContent = error;
                lista.appendChild(elemento);
            });

            divrespuesta.appendChild(lista);
            return;
        }

        divrespuesta.style.color = 'green';
        divrespuesta.textContent =
            'Formulario validado correctamente.';
    }

    // Validar formulario
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const errores = [];

        // Obtener y normalizar valores
        const nombre = normalizarTexto(nombreInput.value);
        const email = emailInput.value.trim();
        const mensaje = mensajeInput.value.trim();

        // Validar nombre
        if (!nombre) {
            errores.push('El nombre es obligatorio.');
        } else if (nombre.length < 2) {
            errores.push('El nombre debe tener al menos 2 caracteres.');
        } else if (nombre.length > 80) {
            errores.push('El nombre no puede superar 80 caracteres.');
        } else if (/^[\p{L}\p{M}]+(?:[ '\u2019-][\p{L}\p{M}]+)*$/u.test(nombre.value)) {
            errores.push(
                'El nombre solo puede contener letras, espacios y acentos ' 
                
            );
        }

        // Validar correo
        if (!email) {
            errores.push('El correo electrónico es obligatorio.');
        } else if (email.length > 254) {
            errores.push('El correo no puede superar 254 caracteres.');
        } else if (!patrones.email.test(email)) {
            errores.push('Introduce un correo electrónico válido.');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
            errores.push('El formato del correo electrónico no es válido.');
        }

        // Validar mensaje
        if (!mensaje) {
            errores.push('El mensaje es obligatorio.');
        } else if (mensaje.length < 7) {
            errores.push('El mensaje debe tener al menos 7 caracteres.');
        } else if (mensaje.length > 2000) {
            errores.push('El mensaje no puede superar 2000 caracteres.');
        } else if (!/[\p{L}\p{N}]/u.test(mensaje)) {
            errores.push('El mensaje debe incluir letras o números.');
        }

        // Mostrar resultado
        if (errores.length > 0) {
            mostrarErrores(errores);
            return;
        }

        // Actualizar valores normalizados
        nombreInput.value = nombre;
        emailInput.value = email;
        mensajeInput.value = mensaje;

        mostrarErrores([]);

        // No se envía información a ningún servidor
        console.log('Formulario validado correctamente.');
    });

});
