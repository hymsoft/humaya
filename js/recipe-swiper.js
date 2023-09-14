// Llamada a la api y carga de las card
const getData = () => {
  fetch('https://sazonapi.onrender.com/api/v1/recipies')
    .then(response => {
      // Verifico  si la respuesta es exitosa (código 200-299)
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la API');
      }
      // Parseo la respuesta como JSON
      return response.json();
    })
    .then(data => {
      // Aca puedo llenar las tarjetas, pero mejor lo hago en una funcion separada
      fillRecipeCards(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

const fillRecipeCards = (recipes) => {
  const swiperWrapper = document.querySelector('.swiper-wrapper');

  // Aca si lleno los datos de las tarjetas
  recipes.data.forEach(recipe => {
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
                <button class="product-btn product-btn-dark">Preparación</button>
              </div>
            </div>
          </div>
        </div>`;
    swiperWrapper.insertAdjacentHTML('beforeend', template);
  })
  // Ahora inicializo el carrusel
  initSwiper();
}

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

getData();