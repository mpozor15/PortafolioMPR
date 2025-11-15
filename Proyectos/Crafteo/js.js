// Espera a que todo el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Selección de Elementos ---
    const ingredientes = document.querySelectorAll('.objetos');
    const estaciones = document.querySelectorAll('.trabajo');

    // Zonas de destino
    const forja = document.getElementById('forja');
    const carpintero = document.getElementById('carpintero');
    const alquimia = document.getElementById('alquimia');

    // Contadores de productos
    const contAcero = document.getElementById('contador-h');
    const contFlechas = document.getElementById('contador-f');
    const contBombas = document.getElementById('contador-b');

    // --- 2. Estado ---
    let tipoIngredienteArrastrado = null;

    // --- 3. Eventos de Arrastre (Ingredientes) ---

    ingredientes.forEach(ingrediente => {
        // Evento: Comienza el arrastre
        ingrediente.addEventListener('dragstart', (e) => {
            const id = e.target.id;
            let tipo;

            // Determinamos el tipo de ingrediente
            if (id.includes('madera')) {
                tipo = 'madera';
            } else if (id.includes('hierro')) {
                tipo = 'hierro';
            } else if (id.includes('polvora')) {
                tipo = 'polvora';
            }

            // Guardamos el tipo para la validación en 'dragover'
            tipoIngredienteArrastrado = tipo;

            // Guardamos los datos para el evento 'drop'
            e.dataTransfer.setData('text/plain', id); // El ID del elemento a eliminar
            e.dataTransfer.setData('tipo-ingrediente', tipo); // El tipo de ingrediente
        });

        // Evento: Termina el arrastre [cite: 53]
        ingrediente.addEventListener('dragend', () => {
            // Limpiamos el estado
            tipoIngredienteArrastrado = null;
            
            // Limpiamos cualquier feedback visual de las estaciones
            estaciones.forEach(estacion => {
                estacion.classList.remove('active');
                estacion.classList.remove('reject');
            });
        });
    });

    // --- 4. Eventos de Zonas de Destino (Estaciones) ---

    function configurarEstacion(estacion, tipoAceptado, contador) {

        // Evento: Ingrediente entra en la zona de la estación
        estacion.addEventListener('dragenter', (e) => {
            e.preventDefault(); 
            
            // Feedback visual: Comprueba si el tipo arrastrado es el aceptado
            if (tipoIngredienteArrastrado === tipoAceptado) {
                estacion.classList.add('active'); // Feedback "aceptar"
            } else {
                estacion.classList.add('reject'); // Feedback "rechazar" 
            }
        });

        // Evento: Ingrediente se mantiene sobre la zona
        estacion.addEventListener('dragover', (e) => {
            if (tipoIngredienteArrastrado === tipoAceptado) {
                e.preventDefault();
            }
        });

        // Evento: Ingrediente sale de la zona de la estación
        estacion.addEventListener('dragleave', () => {
            estacion.classList.remove('active');
            estacion.classList.remove('reject');
        });

        // Evento: Ingrediente se suelta en la estación
        estacion.addEventListener('drop', (e) => {
            e.preventDefault(); 
            
            const tipoSoltado = e.dataTransfer.getData('tipo-ingrediente');
            
            // Doble comprobación: solo actúa si el tipo es el correcto
            if (tipoSoltado === tipoAceptado) {
                // 1. Consumir el ingrediente
                const idIngrediente = e.dataTransfer.getData('text/plain');
                const ingrediente = document.getElementById(idIngrediente);
                if (ingrediente) {
                    ingrediente.remove();
                }

                // 2. Actualizar el contador del producto
                let cantidadActual = parseInt(contador.textContent);
                contador.textContent = cantidadActual + 1;
            }
        });
    }

    // Configuración de cada estación
    configurarEstacion(forja, 'hierro', contAcero);
    configurarEstacion(carpintero, 'madera', contFlechas);
    configurarEstacion(alquimia, 'polvora', contBombas);
});