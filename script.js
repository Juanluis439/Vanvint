const productosEnCarrito = new Set();
const carrito = document.getElementById("carrito");
const elementos1 = document.getElementById("lista-1");
const lista = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const contenedorProductos = document.getElementById("lista-productos");

cargarEventListers();

function cargarEventListers() {
  if (elementos1) {
    elementos1.addEventListener("click", comprarElemento);
  }
  if (carrito) {
    carrito.addEventListener("click", eliminarElemento);
  }
  if (vaciarCarritoBtn) {
    vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  }
  if (contenedorProductos) {
    contenedorProductos.addEventListener("click", comprarElemento);
  }

  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

function leerLocalStorage() {
  const elementos = obtenerElementosLocalStorage();
  elementos.forEach((el) => {
    insertarCarrito(el);
    productosEnCarrito.add(el.id); // ✅ Aquí sí funciona
  });
  actualizarNotificacionCarrito();
}

function obtenerElementosLocalStorage() {
  return localStorage.getItem("carrito")
    ? JSON.parse(localStorage.getItem("carrito"))
    : [];
}

function comprarElemento(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const elemento = e.target.closest(".product");
    if (elemento) {
      leerDatosElemento(elemento);
    }
  }
}

function leerDatosElemento(elemento) {
  const infoElemento = {
    imagen: elemento.querySelector("img").src,
    titulo: elemento.querySelector("h3").textContent,
    precio: elemento.querySelector(".precio").textContent,
    id: elemento.querySelector("a").getAttribute("data-id"),
  };
  insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
  if (productosEnCarrito.has(elemento.id)) {
    alert("Este producto ya está en el carrito.");
  } else {
    productosEnCarrito.add(elemento.id);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${elemento.imagen}" width=100 /></td>
      <td>${elemento.titulo}</td>
      <td>${elemento.precio}</td>
      <td><a href="#" class="borrar" data-id="${elemento.id}">X</a></td>
    `;
    lista.appendChild(row);
    agregarElementoLocalStorage(elemento);
  }

  actualizarNotificacionCarrito(); // 👈 FUERA del if, se ejecuta siempre
}

function agregarElementoLocalStorage(elemento) {
  let elementos = obtenerElementosLocalStorage();
  const existe = elementos.some((el) => el.id === elemento.id);

  if (!existe) {
    elementos.push(elemento);
    localStorage.setItem("carrito", JSON.stringify(elementos));

    actualizarNotificacionCarrito();
  }
}

function eliminarElemento(e) {
  e.preventDefault();
  let elemento, elementoId;
  if (e.target.classList.contains("borrar")) {
    e.target.parentElement.parentElement.remove();
    elemento = e.target.parentElement.parentElement;
    elementoId = elemento.querySelector("a").getAttribute("data-id");
  }
}

function eliminarElemento(e) {
  e.preventDefault();
  if (e.target.classList.contains("borrar")) {
    const fila = e.target.parentElement.parentElement;
    const elementoId = e.target.getAttribute("data-id");

    fila.remove();
    eliminarElementoLocalStorage(elementoId);
  }
  actualizarNotificacionCarrito();
}

function eliminarElementoLocalStorage(id) {
  let elementos = obtenerElementosLocalStorage();
  elementos = elementos.filter((el) => el.id !== id);
  localStorage.setItem("carrito", JSON.stringify(elementos));
}

function vaciarCarrito() {
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }

  productosEnCarrito.clear();
  localStorage.removeItem("carrito");
  actualizarNotificacionCarrito();
  return false;
}

// wsp

function enviarWhatsApp() {
  const telefono = "393409691101";

  const productos = obtenerElementosLocalStorage();

  if (productos.length === 0) {
    alert("Il carrello è vuoto.");
    return;
  }

  let mensaje = "Ciao! Sono interessato ad acquistare i seguenti prodotti:\n\n";

  productos.forEach((producto) => {
    mensaje += `Nome: ${producto.titulo}\n`;
    mensaje += `Quantità: 1\n`; // Puedes modificar esto si manejas cantidades
    mensaje += `Prezzo: ${producto.precio}\n`;
    mensaje += `Immagine: ${producto.imagen}\n\n`;
  });

  const enlaceWhatsApp =
    "https://wa.me/" + telefono + "?text=" + encodeURIComponent(mensaje);

  window.open(enlaceWhatsApp, "_blank");
}

const btnAcquistare = document.getElementById("btnAcquistare");
if (btnAcquistare) {
  btnAcquistare.addEventListener("click", enviarWhatsApp);
}

function actualizarNotificacionCarrito() {
  const notificacion = document.getElementById("notificacionCarrito");
  const productos = obtenerElementosLocalStorage();

  if (productos.length > 0) {
    notificacion.style.display = "inline-block";
    notificacion.textContent = productos.length;
  } else {
    notificacion.style.display = "none";
  }
}
