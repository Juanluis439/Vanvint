productos = [
  { index: 0, img: "img17.jpeg" },
  { index: 3, img: "img20.jpeg" },
  { index: 4, img: "img21.jpeg" },
  { index: 5, img: "img22.jpeg" },
  { index: 6, img: "img23.jpeg" },
  { index: 7, img: "img24.jpeg" },
  { index: 8, img: "img25.jpeg" },
  { index: 9, img: "img10.jpeg" },
  { index: 10, img: "img11.jpeg" },
  { index: 11, img: "img12.jpeg" },
  { index: 12, img: "img13.jpeg" },
  { index: 13, img: "img14.jpeg" },
  { index: 14, img: "img15.jpeg" },
  { index: 15, img: "img16.jpeg" },
  { index: 16, img: "img1.jpeg" },
  { index: 17, img: "img2.jpeg" },
  { index: 18, img: "img3.jpeg" },
  { index: 19, img: "img4.jpeg" },
  { index: 20, img: "img5.jpeg" },
  { index: 21, img: "img6.jpeg" },
  { index: 22, img: "img7.jpeg" },
  { index: 23, img: "img8.jpeg" },
  { index: 24, img: "img9.jpeg" },
];

const contenedor = document.getElementById("lista-productos");

productos.forEach((producto) => {
  const div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `
      <img src="comentarios/${producto.img}" alt="${producto.name}">
    `;
  contenedor.appendChild(div);
});
