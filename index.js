const productCards = document.querySelector(".cards-products");
const verMas = document.querySelector(".ver-mas");
const categoryList = document.querySelectorAll(".category");
const containerCategory = document.querySelector(".categories");
const cartBtn = document.querySelector(".cart-label");
const menuBtn = document.querySelector(".menu-label");
const cartMenu = document.querySelector(".cart");
const barMenu = document.querySelector(".navbar-list");
const overlay = document.querySelector(".overlay");
const cartBubble = document.querySelector(".cart-bubble");
const total = document.querySelector(".total");
const comprar = document.querySelector(".btn-comprar");
const delet = document.querySelector(".btn-delete");
const productsCart = document.querySelector(".item-product");
const totalCart = document.querySelector(".total-cart");
const modal = document.querySelector(".add-modal");
//------------------------------------------------------
const registerForm = document.querySelector(".form");
const name = document.getElementById("nombre");
const lastName = document.getElementById("apellido");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phone = document.getElementById("tel");
//--------------------------------------------------------
const logOutBtn = document.getElementById("btn-logout");
const userName = document.querySelector(".user-name");

//seteamos
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Guardar carrito en el localStorage
const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

/*--------------------------------------------------------------------- */
//Renderizar
const createCard = (product) => {
  const { id, nombre, imagen, precio, modelo } = product;
  return `<div class="product-card">
          <img src="${imagen}" alt="" />
          <div class="name">
            <h2>${nombre}</h2>
            <p>Modelo: ${modelo}</p>
            <p>Precio: $ ${precio}</p>
          </div>
          <div class="btn-agregar">
              <button class="btn-add"
              data-id='${id}'
               data-name= '${nombre}'
               data-precio='${precio}'
               data-img= '${imagen}'
               data-modelo='${modelo}'
              >Agregar al Carrito</button>
            </div>
        </div>`;
};

const renderPoducts = (productsItem) => {
  productCards.innerHTML += productsItem.map(createCard).join("");
};

const masProducts = () => {
  appState.masProducts += 1;
  let { products, masProducts } = appState;
  renderPoducts(products[masProducts]);
  if (masProducts === appState.porductsLimit - 1) {
    verMas.classList.add("ocultar");
  }
};

const setShowMoreVisibility = () => {
  if (!appState.activeFilter) {
    verMas.classList.remove("ocultar");
  } else verMas.classList.add("ocultar");
};
const changeBtnActive = (slectedcategory) => {
  const categories = [...categoryList];

  categories.forEach((categoryBoton) => {
    if (categoryBoton.dataset.category !== slectedcategory) {
      categoryBoton.classList.remove("active");
      return;
    }
    categoryBoton.classList.add("active");
  });
};
/*------------------------------------------------------------ */
//filtro
const renderfilter = () => {
  const filterProducts = catalogo.filter(
    (product) => product.categoria === appState.activeFilter
  );
  renderPoducts(filterProducts);
};

const changeFilterState = (btn) => {
  const change = (appState.activeFilter = btn.dataset.category);
  changeBtnActive(appState.activeFilter);
  setShowMoreVisibility(appState.activeFilter);
};
const aplicarFiltro = ({ target }) => {
  if (!inactiveFilterBtn(target)) return;
  changeFilterState(target);
  productCards.innerHTML = "";
  if (appState.activeFilter) {
    renderfilter();
    return;
  }
  renderPoducts(appState.products[0]);
};

const inactiveFilterBtn = (element) => {
  return (
    element.classList.contains("category") &&
    !element.classList.contains("active")
  );
};

/*----------------------------------------------------------------------- */
// menu- carrito
const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");

  if (barMenu.classList.contains("open-menu")) {
    barMenu.classList.remove("open-menu");
    return;
  }
  overlay.classList.toggle("show-overlay");
};
const toggleMenu = () => {
  barMenu.classList.toggle("open-menu");

  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

const closeMenuCart = () => {
  barMenu.classList.remove("open-menu");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
};

const closeOnScroll = () => {
  closeMenuCart();
  if (
    barMenu.classList.contains("open-menu") &&
    cartMenu.classList.contains("open-cart")
  )
    return;
};

/*------------------------------------------------------- */
//Agregar productos al carrito

//Render carrito
const renderCart = () => {
  if (!cart.length) {
    productsCart.innerHTML = `<p class="msg-cart">No hay Productos en el Carrito</p>`;
    comprar.classList.add("ocultar-btn-comprar");
    delet.classList.add("ocultar-btn-delete");
    return;
  }
  productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
  comprar.classList.remove("ocultar-btn-comprar");
  delet.classList.remove("ocultar-btn-delete");
};

/*------------------------------------------------------------ */
//Funciones para el estado del carrito
const updateCartState = () => {
  saveCart();
  renderCart();
  showCartTotal();
  renderCartBubble();
};

const addProduct = (e) => {
  if (!e.target.classList.contains("btn-add")) return;
  const product = e.target.dataset;

  //verificamos si el producto esta o no en el carrito
  if (existingCartProduct(product)) {
    addUnitProduct(product);
    window.confirm("Desea agregar otra unidad de este producto?");
  } else {
    createProductCart(product);
    confirmModal("Producto añadido");
  }

  updateCartState();
};
const existingCartProduct = (product) => {
  return cart.find((item) => item.id === product.id);
};

//agregar una uidad al carrito
const addUnitProduct = (product) => {
  cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct
  );
};

//info del producto para agregar al carito
const createProductCart = (product) => {
  cart = [...cart, { ...product, quantity: 1 }];
};

//Msj proucto agregado al carro

const confirmModal = (msg) => {
  modal.classList.add("active-modal");
  modal.textContent = msg;

  setTimeout(() => {
    modal.classList.remove("active-modal");
  }, 2000);
};

//Mostrar los productos en el carrito

const createCartProductTemplate = (cartProduct) => {
  const { id, precio, img, name, quantity, modelo } = cartProduct;
  return `
   <div class="product">
            <div class="imagen">
              <img
              src="${img}"
              alt=""
              />
            </div>
            <div class="info-cart">
              <div class="item-info">
                <h3 class="product-name">${name}</h3>
                <p class="modelo">Modelo ${modelo}</p>
                <p class="price">Precio:${precio}</p>
              </div>
              <div class="handler">
                <button class="handler-up" data-id=${id}>+</button>
                <button class="quantity">${quantity}</button>
                <button class="handler-down" data-id=${id}>-</button>
              </div>
            </div>
          </div>
  `;
};
/*-------------------------------------------------------- */
//total del pedido
const getCartTotal = () => {
  return cart.reduce((acc, cur) => acc + Number(cur.precio) * cur.quantity, 0);
};

const showCartTotal = () => {
  total.innerHTML = ` <p class="cart-total">Total:</p> $ ${getCartTotal().toFixed(
    2
  )}`;
};
/*-------------------------------------------------------------- */
//contador del carrito
const renderCartBubble = () => {
  cartBubble.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0);
};

/*--------------------------------------------------------------------- */
//Boton + de productos en el carrito
const handlerUpEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  addUnitProduct(existingCartProduct);
};

//Boton - de productos en el carrito
const handlerDownEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);

  if (existingCartProduct.quantity === 1) {
    if (window.confirm("Deseas eliminar el producto?")) {
      removeProductFromCart(existingCartProduct);
    }
    return;
  }

  substractProductUnit(existingCartProduct);
};

const substractProductUnit = (existingCartProduct) => {
  cart = cart.map((product) => {
    return product.id === existingCartProduct.id
      ? { ...product, quantity: Number(product.quantity) - 1 }
      : product;
  });
};

const removeProductFromCart = (existingCartProduct) => {
  cart = cart.filter((product) => product.id !== existingCartProduct.id);
  updateCartState();
};

//Agregar unidad a los productos del carrito
const handlerQuantity = (e) => {
  if (e.target.classList.contains("handler-up")) {
    handlerUpEvent(e.target.dataset.id);
  } else if (e.target.classList.contains("handler-down")) {
    handlerDownEvent(e.target.dataset.id);
  }
  updateCartState();
  renderCart();
};
/*------------------------------------------------------------ */
//Comprar y eliminar todoso los productos del cart

const resetCartItems = () => {
  cart = [];
  updateCartState();
};

//Confirmaciones
const cartAction = (confirmMsg) => {
  if (!cart.length) return;
  if (window.confirm(confirmMsg)) {
    resetCartItems();
  }
};
const completeBuy = () => {
  cartAction("¡Gracias por tu compra!");
};

const deleteCart = () => {
  cartAction("¿Está seguro de borrar el carrito?");
};
/*------------------------------------------------------------------------- */
//----------------------------REGISTRO------------------------------------
const isEmpty = (input) => {
  return !input.valu.trim().length; //checkear si esta vacio
};

const isBetween = (input, min, max) => {
  return input.value.length >= min && input.valu.length < max; // verifica el min y el max de cacarteres ingresado
};

const error = (input, message) => {
  const formField = input.parentElement;
  formField.classList.add("error");
  console.log(formField);
};
//------------------------------user name, salir---------------
const activeUser = JSON.parse(sessionStorage.getItem("activeUser"));
console.log(activeUser);

const showUserName = () => {
  userName.textContent = `${activeUser.name}`;
  cartBtn.classList.add("mostrar-cart-label");
};
const logOut = () => {
  if (window.confirm("Estas seguro que deseas cerrar sesion?")) {
    sessionStorage.removeItem("activeUser");
    window.location.href = "iniciosesion.html";
    alert("Cerraste sesion");
  }
};

//const checkInput = (input) => {};

const init = () => {
  renderPoducts(appState.products[0]);
  verMas.addEventListener("click", masProducts);
  containerCategory.addEventListener("click", aplicarFiltro);
  cartBtn.addEventListener("click", toggleCart);
  menuBtn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeMenuCart);
  window.addEventListener("scroll", closeOnScroll);
  productCards.addEventListener("click", addProduct);
  productsCart.addEventListener("click", handlerQuantity);
  document.addEventListener("DOMContentLoaded", renderCart);
  comprar.addEventListener("click", completeBuy);
  delet.addEventListener("click", deleteCart);
  renderCartBubble();
  //--------------------------------------------------
  // name.addEventListener("input", () => checkInput(name));

  showUserName();
  logOutBtn.addEventListener("click", logOut);
};
init();
