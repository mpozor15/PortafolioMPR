// Espera a que el documento HTML esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleccionamos los elementos que necesitamos
    const searchIconMobile = document.querySelector('.search-icon-mobile');
    const navbar = document.querySelector('.navbar');

    // 2. Comprobamos que el icono existe
    if (searchIconMobile) {
        
        // 3. Añadimos el "escuchador de clics"
        searchIconMobile.addEventListener('click', (evento) => {
            
            // Prevenimos que el enlace (<a>) recargue la página
            evento.preventDefault(); 
            
            // 4. Añade o quita la clase 'search-active' en el <header>
            navbar.classList.toggle('search-active');
        });
    }
});