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

/**
 * Captura el evento de clic en los botones de receta y abre el modal correspondiente.
 */
const captureRecipeButton = () => {
  // Selecciono todos los botones con la clase "recipe-btn"
  const recipeButtons = document.querySelectorAll('.recipe-btn');

  // Agrego un evento de clic a cada botón
  recipeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      // obtengo el valor de data-innerid
      const innerId = event.target.dataset.innerid;
      recipeModal(innerId)
    });
  });
}

/**
 * Abre un modal con los detalles de una receta.
 *
 * @param {string} innerId - El identificador interno de la receta.
 */
const recipeModal = (innerId) => {
  const { ingredientes, instrucciones, nivel_dificultad: dificultad, tiempo_coccion: coccion, nombre } = dataRecipes[innerId];
  const column1 = Math.ceil(ingredientes.length / 2);
  const modal = new tingle.modal();
  console.log();

  // Aca armo las dos columnas con los ingredientes
  let column1HTML = '';
  let column2HTML = '';

  for (let i = 0; i < ingredientes.length; i++) {
    if (i < column1) {
      // Agrego los primeros ingredientes a la primera columna
      column1HTML += `<label class="ingredient">
                        <input type="checkbox"> <span>${ingredientes[i].nombre + ' ' + ingredientes[i].cantidad}</span>
                       </label>
                      `;
    } else {
      // Agrego el resto de ingredientes a la segunda columna
      column2HTML += `<label class="ingredient">
                        <input type="checkbox"> <span>${ingredientes[i].nombre + ' ' + ingredientes[i].cantidad}</span>
                      </label>
                      `;
    }
  }

  // Aca armo la lista desordenada para los pasos
  const listaDeInstrucciones = instrucciones.split('. ');
  let paso = 1;

  let listaHTML = '<ul>';
  for (const instruccion of listaDeInstrucciones) {
    listaHTML += `<li><span class='paso'>Paso ${paso++}</span> ${instruccion}.</li>`;
  }
  listaHTML += '</ul>';

  // Aca armo el contenido del modal
  modal.setContent(`
  <div class='recipe-modal-container'>
    <div class='properties'>
      <span class='property'><i class="bi bi-clock"></i> ${coccion}</span>
      <span class='property'><i class="bi bi-bar-chart-fill"></i> ${dificultad}</span>
    </div>
    <div class='title'>
      <h3>Ingredientes para preparar ${nombre}</h3>
    </div>
    <div class='ingredients'>
      <div class="column">
        ${column1HTML}
      </div>
      <div class="column">
        ${column2HTML}
      </div>
    </div>
    <div class='instructions'>
      ${listaHTML}
    </div>
  </div>
`);

  console.log(instrucciones);

  modal.open();
};

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