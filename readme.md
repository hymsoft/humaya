Proyecto: **Humaya**
Curso: **REACT JS FRONT END 2023 2C**
Institucion: **Codo a Codo**
Año: **2023**

El proyecto era la reconstrucción de una pagina web, para un cliente, que solamente contaba con una fotografia de lo que era su sitio.
Mi forma de realizar el proyecto fue hacer un análisis general para la reconstrucción del sitio, luego, tomar cada seccion por separado e ir maquetando en HTML, dando estilos CSS y funciones en JavaScript de ser requeridas.
La página es estática, hasta la sección de recetas. Para hacer esta sección dinámica, opte por usar un carusel [SwiperJS](https://swiperjs.com/), que contiene unas tarjetas, las cuales lleno con datos obtenidos de una API muy sencilla, también creada por mi llamada [sazonAPI](https://sazonapi.onrender.com/). Estas tarjetas contienen un boton que al pulsarlo abre un modal [TingleJS](https://tingle.robinparisi.com/), en el que muestro los ingredientes y preparación de esa receta.

El archivo llamado **recipe-swiper.js** es el encargado de realizar toda esa interactividad.

**Este bloque de código JavaScript** se encarga de realizar varias operaciones relacionadas con la obtención y visualización de recetas desde una API. Explicaré cada parte:

**let dataRecipes = []:** Esto crea una variable llamada `dataRecipes` que inicialmente es una lista vacía. Esta lista se utilizará para almacenar las recetas obtenidas de la API.

**Función getRecipes:** Esta es una función asíncrona que se encarga de obtener las recetas de una API. Devuelve una promesa que se resolverá con los datos de las recetas o se rechazará con un error si ocurre.

Utiliza el método `fetch` para hacer una petición HTTP a una URL (`url`) que contiene las recetas.

Si la petición es exitosa, extrae y devuelve el objeto `data` del cuerpo de la respuesta.

Si hay un error en la petición, captura y maneja el error, mostrando un mensaje en la consola y lanzando el error nuevamente.

**Función fillRecipeCards:** Esta función toma un objeto de recetas como argumento y llena las tarjetas de recetas en el carrusel.

Primero, selecciona el elemento con la clase `swiper-wrapper`.
Luego, itera sobre las recetas y para cada una de ellas, crea un template HTML con la información de la receta.
Inserta el template en el elemento `swiper-wrapper`.

**Función captureRecipeButton:** Esta función se encarga de agregar un evento de clic a cada botón de receta.

Selecciona todos los botones con la clase `recipe-btn`.
Luego, para cada botón, agrega un evento de clic que captura el valor del atributo `data-innerid` y llama a la función `recipeModal` con ese valor.

**Función recipeModal:** Esta función toma un `innerId` como argumento y muestra un modal con los detalles de una receta específica.

Utiliza el `innerId` para obtener los detalles de la receta desde el arreglo `dataRecipes`.
Luego, crea el contenido del modal con información como ingredientes, instrucciones, dificultad, etc.
Finalmente, abre el modal.

**Llamada a getRecipes:** Se llama a la función `getRecipes` para obtener las recetas desde la API.

Cuando la promesa se resuelve, se asigna el resultado a `dataRecipes`, se llenan las tarjetas de recetas y se inicializa el carrusel.

Si hay un error, se muestra en la consola.

**Función initSwiper:** Inicializa el carrusel utilizando la biblioteca Swiper. Configura propiedades como la cantidad de slides visibles, el espacio entre ellos, el loop y la paginación.

También establece breakpoints para diferentes tamaños de pantalla.

Se crea una instancia de Swiper y se asigna a la clase `mySwiper`.
