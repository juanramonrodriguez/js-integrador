const catalogo = [
  {
    id: 1,
    nombre: "Auriculares inalámbricos",
    modelo: "ATH-M50xBT2",
    precio: 69,
    categoria: "auriculares",
    imagen: "./assets/img/products/ath-m50xbt2_01_1.png",
  },
  {
    id: 2,
    nombre: "Tocadiscos para DJ profesionales",
    modelo: "AT-LP140XP",
    precio: 2100,
    categoria: "tocadiscos",
    imagen: "./assets/img/products/tocadiscos para dj.png",
  },
  {
    id: 3,
    nombre: "Micrófono de cinta bidireccional",
    modelo: "AT4081",
    precio: 720,
    categoria: "microfonos",
    imagen: "./assets/img/products/microfono de cinta bidireccional.png",
  },
  {
    id: 4,
    nombre: "Amplificador de auriculares híbrido",
    modelo: "AT-HA5050H",
    precio: 3500,
    categoria: "amplificadores",
    imagen: "./assets/img/products/amplificador de auriculares hibrido.png",
  },
  {
    id: 5,
    nombre: "Auriculares Inalámbricos de Madera",
    modelo: "ATH-WB2022",
    precio: 120,
    categoria: "auriculares",
    imagen: "./assets/img/products/madera.png",
  },
  {
    id: 6,
    nombre: "Tocadiscos de transmisión por correa manual",
    modelo: "AT-LPW40WN",
    precio: 500,
    categoria: "tocadiscos",
    imagen: "./assets/img/products/tocadisco AT-LPW40WN.png",
  },
  {
    id: 7,
    nombre: "Micrófono de Condensador Cardioide",
    modelo: "AT4040",
    precio: 199,
    categoria: "microfonos",
    imagen: "./assets/img/products/Microfono de condensador cardioide.webp",
  },
  {
    id: 8,
    nombre: "Amplificador de audífonos balanceado",
    modelo: "AT-BHA100",
    precio: 2980,
    categoria: "amplificadores",
    imagen: "./assets/img/products/aamplificador de audifono balanceado.png",
  },
  {
    id: 9,
    nombre: "Auriculares inalámbricos",
    modelo: "ATH-TWX9",
    precio: 249,
    categoria: "auriculares",
    imagen: "./assets/img/products/ath-twx9_01.webp",
  },
  {
    id: 10,
    nombre: "Tocadiscos profesional con accionamiento directo",
    modelo: "AT-LP1240-USBXP",
    precio: 1500,
    categoria: "tocadiscos",
    imagen: "./assets/img/products/tocadisco profecional c.png",
  },
];

// funcion para dividir el array
const DivideArray = (size) => {
  let arrayNuevo = [];

  for (let i = 0; i < catalogo.length; i += size) {
    arrayNuevo.push(catalogo.slice(i, i + size));
  }
  return arrayNuevo;
};
//appstate
const appState = {
  products: DivideArray(4),
  masProducts: 0,
  porductsLimit: DivideArray(4).length,
  activeFilter: null,
};
