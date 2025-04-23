function enviarWsp() {
  const telefono = "393409691101";

  let mensaje =
    " ciao, vorrei creare insieme a te il set di Gioielli perfetto per mi mamma";

  const enlaceWsp =
    "https://wa.me/" + telefono + "?text=" + encodeURIComponent(mensaje);

  window.open(enlaceWsp, "_blank");
}
