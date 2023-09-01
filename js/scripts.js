const form = document.querySelector("#form");
const container = document.querySelector("#nameContainer");
const nameInput = document.querySelector("#username");
const telInput = document.querySelector("#usertel");
const emailInput = document.querySelector("#useremail");
const textInput = document.querySelector("#text");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (nameInput.value === "") {
    alert("Por favor, informe o seu nome!");
    return;
  }

  if (telInput.value === "" || !isTelValid(telInput.value)) {
    alert("Por favor, informe o seu telefone");
  }

  if (emailInput.value === "" || !isEmailValid(emailInput.value)) {
    alert("Por favor, informe o seu email!");
  }

  if (textInput.value === "") {
    alert("Por favor, informe a sua dúvida");
  }

  form.submit();
});

// Função regex para validar telefone
function isTelValid(tel) {
  const telRegex = new RegExp(/^[0-9]{2,}+\s+[0-9]{5,}+[0-9]{4,}$/);

  if (telRegex.test(tel)) {
    return true;
  }

  return false;
}

// Função regex para validar email
function isEmailValid(email) {
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/
  );

  if (emailRegex.test(email)) {
    return true;
  }

  return false;
}
