let dataRecipes = []
/**
 * Función asíncrona para obtener las recetas de una API.
 * @returns {Promise} Una promesa que se resolverá con los datos de las recetas, o se rechazará con un error si ocurre.
 */
const getRecipes = async () => {
  const url = "https://sazonapi.hymsoft.repl.co/api/v1/recipies";
  try {
    const response = await fetch(url);
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener las recetas:", error);
    throw error;
  }
};

/**
 * Llena las tarjetas de recetas en el carrusel.
 * @param {Object} recipes - Objeto de recetas obtenidas de la API.
 */
const fillRecipeCards = (recipes) => {
  const swiperWrapper = document.querySelector('.swiper-wrapper');

  // Aca si lleno los datos de las tarjetas
  let innerId = 0
  recipes.forEach(recipe => {
    /* Template for the Team Cards */
    const template = `
        <div class="swiper-slide">
          <div class="card">
            <div class="card_image">
              <img src="${recipe.imagen}" alt="Fotografía de ${recipe.nombre}" />
            </div>
            <div class="card_content">
              <h2 class="card_title">${recipe.nombre}</h2>
              <div class="card_text">
                <p>${recipe.descripcion_tipo}</p>
              </div>
              <div class="card_btn_container">
                <button class="product-btn product-btn-dark recipe-btn" data-innerId = "${innerId++}">Preparación</button>
              </div>
            </div>
          </div>
        </div>`;
    swiperWrapper.insertAdjacentHTML('beforeend', template);
  })
}

const captureRecipeButton = () => {
  // Selecciono todos los botones con la clase "recipe-btn"
  const recipeButtons = document.querySelectorAll('.recipe-btn');

  // Agrego un evento de clic a cada botón
  recipeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      // obtengo el valor de data-innerid
      const innerId = event.target.dataset.innerid;
      console.log(`Valor de data-innerid: ${innerId}`);
    });
  });

}

// Llama a la función para obtener recetas y luego llenar las tarjetas.
getRecipes()
  .then((recipes) => {
    dataRecipes = recipes
    fillRecipeCards(dataRecipes)
    // Ahora inicializo el carrusel
    initSwiper();
    // Capturo los botones de las cards
    captureRecipeButton()
  })
  .catch((error) => {
    console.error(error);
  });



// Swiper
const initSwiper = () => {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    speed: 1000,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
}