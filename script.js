const productosEnCarrito = new Set();
const carrito = document.getElementById("carrito");
const elementos1 = document.getElementById("lista-1");
const lista = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const contenedorProductos = document.getElementById("lista-productos");

cargarEventListers();

lista.addEventListener("click", (e) => {
  const fila = e.target.closest("tr");
  if (!fila) return;

  const cantidadSpan = fila.querySelector(".cantidad");
  const precioUnitario = parseFloat(
    fila.querySelector(".precio-unitario").textContent
  );
  const precioTotal = fila.querySelector(".precio-total");
  let cantidad = parseInt(cantidadSpan.textContent);

  if (e.target.classList.contains("incrementar")) {
    cantidad++;
  } else if (e.target.classList.contains("decrementar")) {
    if (cantidad > 1) cantidad--;
  }

  cantidadSpan.textContent = cantidad;
  precioTotal.textContent = (precioUnitario * cantidad).toFixed(2);
  actualizarTotalGeneral();
});

function cargarEventListers() {
  if (elementos1) {
    elementos1.addEventListener("click", comprarElemento);
  }
  if (carrito) {
    carrito.addEventListener("click", eliminarElemento);
    if (carrito) {
      carrito.addEventListener("click", (e) => {
        eliminarElemento(e);
        manejarCantidad(e); // 👈 añade esta función
      });
    }
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
  if (productosEnCarrito.has(elemento.id)) return;

  productosEnCarrito.add(elemento.id);
  elemento.cantidad = 1;

  const row = document.createElement("tr");
  row.setAttribute("data-id", elemento.id);

  const precioNumerico = parseFloat(elemento.precio.replace(/[^\d.]/g, ""));

  row.innerHTML = `
    <td><img src="${elemento.imagen}" width="100" /></td>
    <td>${elemento.titulo}</td>
    <td>
      <span class="precio-unitario" style="display:none;">${precioNumerico}</span>
      <span class="precio-total">${precioNumerico.toFixed(2)}</span> €
    </td>
    <td>
    <button class="incrementar">+</button>  
      <span class="cantidad">1</span>
      <button class="decrementar">-</button>
    </td>
    <td><a href="#" class="borrar" data-id="${elemento.id}">X</a></td>
  `;

  lista.appendChild(row);
  agregarElementoLocalStorage(elemento);
  actualizarNotificacionCarrito();
  actualizarTotalGeneral();
}

function agregarElementoLocalStorage(elemento) {
  let elementos = obtenerElementosLocalStorage();
  const index = elementos.findIndex((el) => el.id === elemento.id);

  if (index !== -1) {
    elementos[index].cantidad = (elementos[index].cantidad || 1) + 1;
  } else {
    elemento.cantidad = 1;
    elementos.push(elemento);
  }

  localStorage.setItem("carrito", JSON.stringify(elementos));
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
  actualizarTotalGeneral();
}

function eliminarElementoLocalStorage(id) {
  let elementos = obtenerElementosLocalStorage();
  elementos = elementos.filter((el) => el.id !== id);
  localStorage.setItem("carrito", JSON.stringify(elementos));
  productosEnCarrito.delete(id);
}

function vaciarCarrito() {
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }

  productosEnCarrito.clear();
  localStorage.removeItem("carrito");
  actualizarNotificacionCarrito();
  actualizarTotalGeneral();
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

  if (notificacion) {
    if (productos.length > 0) {
      notificacion.style.display = "inline-block";
      notificacion.textContent = productos.length;
    } else {
      notificacion.style.display = "none";
      notificacion.textContent = "0";
    }
  }
}

function manejarCantidad(e) {
  const id = e.target.getAttribute("data-id");
  if (!id) return;

  let elementos = obtenerElementosLocalStorage();
  const index = elementos.findIndex((el) => el.id === id);
  if (index === -1) return;

  const cantidadSpan = lista.querySelector(`.cantidad[data-id="${id}"]`);

  if (e.target.classList.contains("incrementar")) {
    elementos[index].cantidad = (elementos[index].cantidad || 1) + 1;
  }

  if (e.target.classList.contains("decrementar")) {
    elementos[index].cantidad = (elementos[index].cantidad || 1) - 1;
    if (elementos[index].cantidad <= 0) {
      elementos.splice(index, 1);
      const fila = e.target.closest("tr");
      fila.remove();
      productosEnCarrito.delete(id);
    }
  }

  if (cantidadSpan) {
    cantidadSpan.textContent = elementos[index]?.cantidad || 0;
  }

  localStorage.setItem("carrito", JSON.stringify(elementos));
  actualizarNotificacionCarrito();
}

function actualizarTotalGeneral() {
  const filas = lista.querySelectorAll("tr");
  let total = 0;

  filas.forEach((fila) => {
    const precioTotal = parseFloat(
      fila.querySelector(".precio-total").textContent
    );
    total += precioTotal;
  });

  document.getElementById("monto-total").textContent = total.toFixed(2);
}
