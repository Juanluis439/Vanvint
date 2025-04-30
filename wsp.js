function enviarWsp() {
  const telefono = "393409691101";

  let mensaje =
    " Ciao, vorrei creare insieme a te il set di gioielli perfetto per mia mamma";

  const enlaceWsp =
    "https://wa.me/" + telefono + "?text=" + encodeURIComponent(mensaje);

  window.open(enlaceWsp, "_blank");
}
