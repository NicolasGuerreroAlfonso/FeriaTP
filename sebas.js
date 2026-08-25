// ============================
// BOTONES
// ============================

const btnLogin = document.getElementById("btnLogin");
const btnRegistro = document.getElementById("btnRegistro");

const formLogin = document.getElementById("formLogin");
const formRegistro = document.getElementById("formRegistro");


// ============================
// MOSTRAR LOGIN
// ============================

btnLogin.addEventListener("click", function () {

    formLogin.classList.remove("oculto");
    formRegistro.classList.add("oculto");

    btnLogin.classList.add("activo");
    btnRegistro.classList.remove("activo");

});


// ============================
// MOSTRAR REGISTRO
// ============================

btnRegistro.addEventListener("click", function () {

    formRegistro.classList.remove("oculto");
    formLogin.classList.add("oculto");

    btnRegistro.classList.add("activo");
    btnLogin.classList.remove("activo");

});


// ============================
// LOGIN
// ============================

formLogin.addEventListener("submit", function(event) {

    event.preventDefault();

    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;

    if (correo !== "" && password !== "") {

        alert("🎉 ¡Bienvenido a Aula Activa!");

    } else {

        alert("⚠️ Completa todos los campos.");

    }

});


// ============================
// REGISTRO
// ============================

formRegistro.addEventListener("submit", function(event) {

    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correoRegistro").value;
    const password = document.getElementById("passwordRegistro").value;

    if (nombre !== "" && correo !== "" && password !== "") {

        alert("🚀 ¡Cuenta creada correctamente, " + nombre + "!");

    } else {

        alert("⚠️ Completa todos los campos.");

    }

});