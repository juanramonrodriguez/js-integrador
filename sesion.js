const loginForm = document.querySelector(".form-login");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const msjError = document.getElementById("form-error");

const users = JSON.parse(localStorage.getItem("users")) || [];
const saveToSessionStorage = (user) => {
  sessionStorage.setItem("activeUser", JSON.stringify(user));
};

//si el campo no esta vacio
const isEmpty = (input) => {
  return !input.value.trim().length;
};

//existecia del email
const isExistingEmail = (input) => {
  return users.some((user) => user.email === input.value.trim());
};

//vaidar si la contraseña coincide con la registrada
const machaPass = (input) => {
  const user = users.find((user) => user.email === emailInput.value.trim());
  return user.password === input.value.trim();
};

// validar email y pass
const validAccount = () => {
  let valid = false;
  if (isEmpty(emailInput)) {
    showError("El mail no es valido");
    return;
  }

  if (!isExistingEmail(emailInput)) {
    showError("El correo electrónico no existe");
    return;
  }

  if (!machaPass(passwordInput)) {
    showError("La contraseña es incorrecta");
    return;
  }
  alert("Ya estas en linea");
  valid = true;
  return valid;
};

// mensaje de error
const showError = (message) => {
  msjError.textContent = message;
};
const login = (e) => {
  e.preventDefault();

  if (validAccount()) {
    const user = users.find((user) => user.email === emailInput.value.trim());
    saveToSessionStorage(user);
    window.location.href = "index.html";
  }
};

const activeUser = JSON.parse(sessionStorage.getItem("acrtiveUser"));
console.log(activeUser);

const init = () => {
  loginForm.addEventListener("submit", login);
};

init();
