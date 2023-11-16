const registerForm = document.querySelector(".form");
const nameInput = document.getElementById("nombre");
const lastName = document.getElementById("apellido");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const phoneInput = document.getElementById("telefono");

/*------------------------------------------------------------------------- */
//----------------------------REGISTRO------------------------------------
const users = JSON.parse(localStorage.getItem("users")) || [];
const saveToLocalStorage = () => {
  localStorage.setItem("users", JSON.stringify(users));
};

//regex email
const emailValid = (input) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return re.test(input.value.trim());
};
//regex contraseña
const passwordSecure = (input) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  return re.test(input.value.trim());
};
//regex telefono
const telValid = (input) => {
  const re = /^[0-9]{10}$/;

  return re.test(input.value.trim());
};

//Verificar si el email ya esta registrado
const existingEmial = (input) => {
  return users.some((user) => users.email === input.value.trim());
};

//validar telefono
const validPhoneNumber = (input) => {
  let valid = false;
  if (!telValid(input)) {
    validError(input, "Ingrese el numero sin el 0 y sin el 15");
    return;
  }
  validCorrect(input);
  valid = true;
  return valid;
};

//Validar email
const checkEmail = (input) => {
  let valid = false;
  if (!emailValid(input)) {
    validError(input, "El email no es valido");
    return;
  }
  if (existingEmial(input)) {
    validError(input, "Este email ya se encuentra registrado.");
    return;
  }
  validCorrect(input);
  valid = true;
  return valid;
};

//validar password
const checkPassword = (input) => {
  let valid = false;
  if (!passwordSecure(input)) {
    validError(
      input,
      "La contraseña debe tener una mayuscula, un numero y un simbolo"
    );
    return;
  }
  validCorrect(input);
  valid = true;
  return valid;
};

// Validar input name y lastname
const isEmpty = (input) => {
  return !input.value.trim().length; //checkear si esta vacio
};

const isBetween = (input, min, max) => {
  return input.value.length >= min && input.value.length < max; // verifica el min y el max de cacarteres ingresado
};

//error al validar
const validError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("correcto");
  formField.classList.add("error");
  const error = formField.querySelector("small");
  error.style.dispay = "block";
  error.textContent = message;
};
// validacion correcta
const validCorrect = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("correcto");

  const error = formField.querySelector("small");
  error.textContent = "";
};

const checkInput = (input) => {
  let valid = false;

  const MIN_CHARACTERS = 3;
  const MAX_CHARACTER = 25;

  if (!isBetween(input, MIN_CHARACTERS, MAX_CHARACTER)) {
    validError(
      input,
      `Debe tener entre ${MIN_CHARACTERS} y ${MAX_CHARACTER} caracteres`
    );
    return;
  }
  validCorrect(input);
  valid = true;
  return valid;
};

/*------------------------------------------------------------------------ */
//Si todo esta correcto, registrar
const validForm = (e) => {
  e.preventDefault();
  let nameValid = checkInput(nameInput);
  let lastNameValid = checkInput(lastName);
  let emailValid = checkEmail(emailInput);
  let passwordValid = checkPassword(passwordInput);
  let phoneVaid = validPhoneNumber(phoneInput);

  let isFormValid =
    nameValid && lastNameValid && emailValid && passwordValid && phoneVaid;

  if (isFormValid) {
    users.push({
      name: nameInput.value,
      lastName: lastName.value,
      email: emailInput.value,
      password: passwordInput.value,
      phone: phoneInput.value,
    });
    saveToLocalStorage(users);
    alert("El Registro se completo con exito");
    window.location.href = "iniciosesion.html";
  }
};

const init = () => {
  nameInput.addEventListener("input", () => checkInput(nameInput));
  lastName.addEventListener("input", () => checkInput(lastName));
  emailInput.addEventListener("input", () => checkEmail(emailInput));
  passwordInput.addEventListener("input", () => checkPassword(passwordInput));
  phoneInput.addEventListener("input", () => validPhoneNumber(phoneInput));
  registerForm.addEventListener("submit", validForm);
};

init();
