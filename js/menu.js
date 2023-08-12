const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

/**
 * Función que maneja el evento de clic en el botón de alternancia del menú.
 */
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('nav-menu_visible');
    if (navMenu.classList.contains('nav-menu_visible')) {
        navToggle.setAttribute("aria-label", "Cerrar menú");
    } else {
        navToggle.setAttribute("aria-label", "Abrir menú");
    }
});

/**
 * Función que maneja el evento de clic en el menú de navegación.
 * @param {Event} event - Objeto de evento
 */
navMenu.addEventListener('click', function (event) {
    event.preventDefault();

    if (event.target.classList.contains('nav-link')) {
        const navLinks = this.querySelectorAll('.nav-link');

        navLinks.forEach(navLink => {
            navLink.classList.remove('nav-link_active');
        });

        event.target.classList.add('nav-link_active');
        if (navMenu.classList.contains('nav-menu_visible')) navMenu.classList.toggle('nav-menu_visible')
    }
});
