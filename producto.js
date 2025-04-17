productos = [
  { index: 0, name: "Anello Lexa", price: "13.90", img: "img1.jpg" },
  { index: 1, name: "Anello Daris", price: "14.00", img: "img2.jpg" },
  { index: 2, name: "Anello Maria", price: "13.90", img: "img3.jpg" },
  { index: 3, name: "Anello Anabel", price: "13.90", img: "img4.jpg" },
  { index: 4, name: "Anello Snake", price: "13.90", img: "img5.jpg" },
  { index: 5, name: "Anello Infinity", price: "12.90", img: "img6.jpg" },
  { index: 6, name: "Anello Susan", price: "14.90", img: "img7.jpg" },
  { index: 7, name: "Anello Valery", price: "10.00", img: "img8.jpg" },
  { index: 8, name: "Anello Andrea", price: "14.90", img: "img9.png" },
  { index: 9, name: "Anello Mon Amour", price: "15.00", img: "img10.jpg" },
  { index: 10, name: "Anello Double", price: "11.90", img: "img11.jpg" },
  { index: 11, name: "Anello Isabel", price: "13.90", img: "img12.jpg" },
  { index: 12, name: "Anello Vivian", price: "12.90", img: "img13.jpg" },
  { index: 13, name: "Anello Briar", price: "12.00", img: "img14.jpg" },
  { index: 14, name: "Anello Laura", price: "9.00", img: "img15.jpg" },
  { index: 15, name: "Anello Assia", price: "€9,50", img: "img16.jpg" },
  {
    index: 16,
    name: "Orecchini Aura",
    price: "10.00",
    img: "img17.jpg",
  },
  { index: 17, name: "Orecchini Amelia", price: "13.00", img: "img18.jpg" },
  { index: 18, name: "Earcuff", price: "7.00", img: "img19.jpg" },
  { index: 19, name: "Piercing cerchietto", price: "5.00", img: "img20.jpg" },
  { index: 20, name: "Bracciale Aurora", price: "14.86", img: "img21.png" },
  { index: 21, name: "Orecchini Ros", price: "12.90", img: "img22.png" },
  { index: 22, name: "Orecchini Drop", price: "10.90", img: "img23.jpg" },
  { index: 23, name: "Orecchini Saliscendi", price: "12.00", img: "img24.jpg" },
  { index: 24, name: "Orecchini Ámbar", price: "12.50", img: "img25.jpg" },
  { index: 25, name: "Piercing Flower", price: "7.00", img: "img26.jpg" },
  { index: 26, name: "Piercing Aila", price: "6.50", img: "img27.jpg" },
  { index: 27, name: "Orecchini Laura", price: "10.90", img: "img29.jpg" },
  { index: 28, name: "Orecchini Nadette", price: "10.90", img: "img30.jpg" },
  {
    index: 29,
    name: "Earcuff orecchio completo",
    price: "14.99",
    img: "img31.jpg",
  },
  { index: 30, name: "Earcuff Coquette", price: "14.99", img: "img32.jpg" },
  { index: 31, name: "Orecchini Nerlin", price: "12.00", img: "img33.jpg" },
  { index: 32, name: "Orecchini Drop", price: "10.00", img: "img34.jpg" },
  { index: 33, name: "Orecchini Rosa", price: "14.00", img: "img35.jpg" },
  { index: 34, name: "Orecchini Delia", price: "10.00", img: "img36.jpg" },
  { index: 35, name: "Anello Summer", price: "€8,50", img: "img37.jpg" },
  {
    index: 36,
    name: "Orecchini Melita",
    price: "12.50",
    img: "img38.jpg",
  },
  { index: 37, name: "Punti luce", price: "7.00", img: "img39.jpg" },
  { index: 38, name: "Orecchino Flora", price: "14.00", img: "img40.jpg" },
];

const contenedor = document.getElementById("lista-productos");

productos.forEach((producto) => {
  const div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `
    <img src="img-new/${producto.img}" alt="${producto.name}">
    <h3>${producto.name}</h3>
    <p class="precio">€ ${producto.price}</p>
    <a href="#" class="agregar-carrito btn-2" data-id="4"
              >Agregar al Carrito</a
            >
  `;
  contenedor.appendChild(div);
});
