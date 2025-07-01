# Parcial 2

## Consignas de entrega

- Para la entrega de este parcial, se debe forkear este repositorio en GitHub. Pueden ver informacion sobre como forkear en [esta](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) documentacion.

- Una vez forkeado, puede trabajarse en el entorno que se desee, ya sea localmente en Visual Studio Code, en la propia version web de VS Code en GitHub o en Replit.

- La fecha de entrega será la que se indique en la actividad del campus, normalmente durante la semana 14.

- Se deben subir los cambios realizados en el repositorio personal de GitHub.

- Una vez finalizado el parcial, debe hostearse en GitHub pages habilitando la opcion en el repositorio. Ver info [aqui](https://pages.github.com/?(null)&utm_term=&utm_campaign=&utm_source=adwords&utm_medium=ppc&hsa_acc=7856301356&hsa_cam=20148126406&hsa_grp=&hsa_ad=&hsa_src=x&hsa_tgt=&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=Cj0KCQjw_-GxBhC1ARIsADGgDjur6Hd6-PqkqbkymCURxu2ytEboIumdQUzAss0WHkzGmjFVhQJTPT4aAu5hEALw_wcB).

- En la entrega del campus, debe entregarse unicamente el link a la pagina hosteada en GitHub pages. **No se aceptan archivos sueltos ni comprimidos como entrega**.

## Consigna del trabajo

- Se le pide crear un programa usando código Javascript que permita realizar las funciones básicas front-end de un sistema de "carro de compras" que conste de:

    - Catalogo de productos.
    - Detalle del producto.
    - Agregar o quitar elementos de la compra.
    - Detalle del carrito

- El catálogo de productos, el detalle del producto y el detalle del carrito de compras deben cargarse dinámicamente, no puede estar ya en el HTML.

- La interacción de todo el proceso de compra (detalle del producto, detalle del carrito) debe programarse en un **único documento HTML**, se recomienda el uso de ventanas modales.

- Se deben aplicar las técnicas de **manejo de DOM**, haciendo especial implementación en la creación y eliminación de objetos, alteraciones de CSS, etc.

- Este parcial es **DOMICILIARIO**, **INDIVIDUAL** o **GRUPAL DE A 2 (DOS) PERSONAS**.

- De no aprobarse/presentarse la entrega, se pasará a un recuperatorio al final del cuatrimestre.

- Este parcial es la base de lo que será el examen final de la cursada.

- Cada alumno debe comenzar con el contenido de este repositorio:

    - `index.html`: contiene la estructura básica del parcial, incluidas las referencias para el desarrollo del parcial. Se puede modificar libremente.
    - `styles/styles.css`: contiene los estilos para darle un mínimo de "diseño" al parcial. Se **debe** modificar para dar un estilo propio.
    - `scripts/index.js`: contiene algunas líneas de código para tomar como base para el desarrollo. Puede comenzar con un código desde cero, no es obligatorio partir de la referencia.
    - `favicon.ico`: un favicon para mostrar en el navegador. Se puede cambiar libremente.
    - `images/`: en este directorio se deben poner las imagenes para los productos.
    - `productos.json`: archivo JSON con array de productos.

## Desarrollo mínimo y obligatorio (nota 4)

Cualquier faltante de los requisitos que se presentan a continuación, hará que la entrega se considere desaprobada, aunque haya hecho cosas no solicitadas o del punto siguiente. Esta condición es mínima e innegociable.

- Productos:
    - Armar el listado de productos obteniendo la información de cada uno de un Array de objectos. Como mínimo 9 productos.
    - Se deben contemplar como mínimo 3 categorías de productos.
    - Cada producto debe tener como mínimo: Nombre, descripción, precio, una imagen y categoría. Toda esta información se debe mostrar por cada ítem.
    - Debe tener un botón que permita agregar el ítem al carrito.
    - Se deben poder filtrar los productos por categoría.
    - Se debe preveer la posibilidad de ordenar los productos a la vista por precio (menor a mayor y viceversa).

- Carrito:
    - Debe haber un área del sitio que muestre (mientras el usuario interactúa con el sitio) la cantidad de productos agregados al carrito y el monto total a pagar.

- Clases:
    - Debe implementarse al menos una clase para resolver el trabajo. Esta clase debe tener métodos y propiedades apropiadas.

- DOM:
    - El manejo de DOM es obligatorio. La creacion de elementos de HTML y aplicacion de estilos debe ser dinamica a traves de los metodos del document (`createElement`, `append`, `prepend`, `setAttribute`, `before`, `after`, `parentElement`, etc).  

## Agregados para llegar a 10

Entre las entregas que cumplan el punto anterior, incrementarán su nota los desarrollos que:

- Productos:
    - Armar la ventana modal del detalle del producto, donde se podrá ver la información en detalle del producto. Si se resuelve esto, se puede obviar poner el detalle del producto en la tarjeta original del producto.
    - Esta ventana debe tener un botón que permita agregar el ítem al carrito. Programar dicho botón, para que vaya agregando el ítem al carrito.
    - Debe tener un botón que permita cerrar la ventana modal. Programar dicho botón, para que remueva la ventana modal.
    - Preveer la posibilidad de filtrar por rango de precio.
    - Contemplar la posibilidad de que los productos tengan stock.

- Carrito:
    - Armar la ventana modal del detalle del carrito, que debe listar los productos agregados.
    - Cada producto debe mostrar una imagen miniatura, el nombre, la cantidad agregadas y el monto total por la cantidad de ese producto.
    - **No mostrar productos duplicados**.
    - Debe mostrar la cantidad de productos agregados y el monto totales.
    - Debe tener un botón que permita cerrar la ventana modal (programarlo).
    - Debe permitir eliminar cada producto de a uno o agregar del mismo al carrito así como la posibilidad de eliminar todos los productos del carrito o agregar más productos.
    - Preservar los productos del carrito aunque se refresque la página.

- General:
    - Se valorará la modificación o agregado significativo de HTML / CSS al sitio.

## Consideraciones finales

- Se descontarán puntos si la entrega ya tiene TODO el HTML armado y se limitan a cambiar el display (block/none) de los objetos. El parcial es de DOM, por lo cual la grilla de productos, el detalle de cada producto, el mini carrito y el detalle del carrito de compras, **se deben crear** recién cuando sean solicitados.
- El resto de la interfaz puede crearse desde HTML.
- Esta prohibido generar los elementos mediante el uso de `innerHTML`. Se deben usar funciones nativas del manejo de DOM para crear, agregar y eliminar los elementos. De no ser asi, se descontaran puntos.
- Solamente está permitido el uso de `innerHTML` para definir el texto interno de las etiquetas (mientras no contenga código HTML).
- Se descontarán puntos por errores semánticos en el uso de los elementos HTML.
- Se descontarán puntos por el uso incorrecto de las estructuras de programación.
- La lógica del programa también será evaluada.
- Se puede utilizar la base del diseño que se está viendo en otras materias.
- Está permitido el uso de frameworks de CSS, como Bootstrap.
