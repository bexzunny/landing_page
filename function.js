document.addEventListener('DOMContentLoaded', () => {

    // Obtener elementos del formulario
    const form = document.getElementById('formulario');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');
    const divrespuesta = document.getElementById('respuesta');

    // Verificar que existan los elementos
    if (!form || !nombreInput || !emailInput ||
        !mensajeInput || !divrespuesta) {
        console.error('No se encontraron todos los elementos del formulario.');
        return;
    }

    // Función para normalizar espacios
    function normalizarTexto(texto) {
        return texto.trim().replace(/\s+/g, ' ');
    }

    // Validar formulario
    form.addEventListener('submit', (event) => {

        event.preventDefault();

        divrespuesta.textContent = '';

        const errores = [];

        // Obtener valores
        const nombre = normalizarTexto(nombreInput.value);
        const email = emailInput.value.trim();
        const mensaje = mensajeInput.value.trim();

        
        if (nombre === '') {
            errores.push('El nombre es obligatorio.');
        } else if (nombre.length < 2) {
            errores.push('El nombre debe tener al menos 2 caracteres.');
        } else if (nombre.length > 80) {
            errores.push('El nombre no puede superar 80 caracteres.');
        } else if (!/^[\p{L}\p{M}]+(?:[ '\u2019-][\p{L}\p{M}]+)*$/u.test(nombre)) {
            errores.push('El nombre solo puede contener letras, acentos, espacios, apóstrofos y guiones entre palabras.');
        }

        
        if (email === '') {
            errores.push('El correo electrónico es obligatorio.');
        } else if (email.length > 254) {
            errores.push('El correo no puede superar 254 caracteres.');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errores.push('Introduce un correo electrónico válido.');
        }

        // Validar mensaje
        if (mensaje === '') {
            errores.push('El mensaje es obligatorio.');
        } else if (mensaje.length < 7) {
            errores.push('El mensaje debe tener al menos 7 caracteres.');
        } else if (mensaje.length > 2000) {
            errores.push('El mensaje no puede superar 2000 caracteres.');
        } else if (!/[\p{L}\p{N}]/u.test(mensaje)) {
            errores.push('El mensaje debe incluir letras o números.');
        }

        // Mostrar errores
        if (errores.length > 0) {
            divrespuesta.style.color = 'red';
            divrespuesta.textContent = errores.join(' ');
            return;
        }

        // Actualizar valores normalizados
        nombreInput.value = nombre;
        emailInput.value = email;
        mensajeInput.value = mensaje;

        // Mostrar confirmación
        divrespuesta.style.color = 'green';
        divrespuesta.textContent =
            'Formulario validado correctamente.';

        console.log('Formulario validado correctamente.');

    });

});
