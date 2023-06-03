// variavel para capturar input text
const inputEl = document.querySelector("#password");

const copybuttonEl2 = document.querySelector("#copy-1");
const copybuttonEl = document.querySelector("#copy-2");

// seleção de elementos p/ lógica checkar
const upperCaseCheckEl = document.querySelector("#uppercase-check");
const numberCheckEl = document.querySelector("#numbers-check");
const symbolCheckEl = document.querySelector("#simbolos-check");

// variavel global p/ tamanho da senha
let passwordLength = 16;

function generatePassword() {
  // const chars =
  //   "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789?!@&*()[]";

  let chars = "abcdefghjkmnpqrstuvwxyz";

  const UpperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const NumbersChars = 123456789;
  const SymbolsChars = "?!@&*()[]";

  if (upperCaseCheckEl.checked) {
    chars += UpperCaseChars;
  }

  if (numberCheckEl.checked) {
    chars += NumbersChars;
  }

  if (symbolCheckEl.checked) {
    chars += SymbolsChars;
  }

  // variavel p/ armazenar senha gerada
  let password = "";

  // loop para gerar senha aleatória
  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  // add senha ao input
  inputEl.value = password;

  calculateQuality();
  calculateFontSize();
}

// função para ajustar tamnho da senha
function calculateFontSize() {
  if (passwordLength > 45) {
    inputEl.classList.remove("font-sm");
    inputEl.classList.remove("font-xs");
    inputEl.classList.add("font-xxs");
  } else if (passwordLength > 32) {
    inputEl.classList.remove("font-sm");
    inputEl.classList.add("font-xs");
    inputEl.classList.remove("font-xxs");
  } else if (passwordLength > 22) {
    inputEl.classList.add("font-sm");
    inputEl.classList.remove("font-xs");
    inputEl.classList.remove("font-xxs");
  } else {
    inputEl.classList.remove("font-sm");
    inputEl.classList.remove("font-xs");
    inputEl.classList.remove("font-xxs");
  }
}

// função para copiar senha
function copy() {
  navigator.clipboard.writeText(inputEl.value);
}

// elemento barra
const barEl = document.querySelector(".bar");

console.log(barEl);

// Função para calcular porcentagem da barra em relação a segurança da senha
function calculateQuality() {
  // VALORES DOS PESOS:
  // Tamanho -> 0.25
  // Maísculas -> 0.15
  // numeros -> 0.25
  // simbolos -> 0.35

  const percent = Math.round(
    (passwordLength / 64) * 100 * 0.25 +
      (upperCaseCheckEl.checked ? 15 : 0) +
      (numberCheckEl.checked ? 25 : 0) +
      (symbolCheckEl.checked ? 35 : 0)
  );
  // ajuste da barra
  barEl.style.width = `${percent}%`;

  // condições barra senha
  if (percent > 69) {
    barEl.classList.remove("critical");
    barEl.classList.remove("warning");
    barEl.classList.add("safe");
  } else if (percent > 50) {
    barEl.classList.remove("critical");
    barEl.classList.add("warning");
    barEl.classList.remove("safe");
  } else {
    barEl.classList.add("critical");
    barEl.classList.remove("warning");
    barEl.classList.remove("safe");
  }
  // condição barra completa
  if (percent < 100) {
    console.log(barEl.classList.add("completed"));
  } else {
    console.log(barEl.classList.remove("completed"));
  }
}

// seleção do input range
const passwordLengthEl = document.querySelector("#password-length");

// retorna um valor null usando class ou id se usado com querySelector()
const textEl = document.getElementById("password-length-text");
// console.log(textEl);

// evento relacionado a barra da senha
passwordLengthEl.addEventListener("input", () => {
  textEl.innerText = passwordLength = passwordLengthEl.value;

  // textEl.innerText = passwordLength;

  generatePassword();
});

// eventos do botão checked
upperCaseCheckEl.addEventListener("click", generatePassword);
numberCheckEl.addEventListener("click", generatePassword);
symbolCheckEl.addEventListener("click", generatePassword);

document.querySelector("#copy-1").addEventListener("click", () => {
  Swal.fire({
    title: "Senha Copiada com Sucesso!",
    // text: "Do you want to continue",
    icon: "success",
    // confirmButtonText: "Cool",
  });
  copy();
  // console.log("clicou");
});
document.querySelector("#copy-2").addEventListener("click", () => {
  Swal.fire({
    title: "Senha Copiada com Sucesso!",
    // text: "Do you want to continue",
    icon: "success",
    // confirmButtonText: "Cool",
  });
  copy();
});

// evento para gerar nova senha
document.querySelector("#renew").addEventListener("click", generatePassword);

generatePassword();
