// selecionando os elementos por id

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");

// para que quando dermos o submit no form, o evento submit seja executado
form.addEventListener("submit", (e) => {
    e.preventDefault(); // preventDefault faz com que a página não seja recarregada que é o padrão dos navegadores...

    checkInputs();
});

// poderia ser uma arrow function (const checkInput() => {}), mas nesse caso o mais ideal é usar function para não termos problemas com hoisting
function checkInputs() {
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const passwordConfirmationValue = passwordConfirmation.value;

    if (usernameValue == "") {
        setErrorFor(username, "O nome de usuário é obrigatório.");
    } else {
        setSuccessFor(username);
    }

    if (emailValue == "") {
        setErrorFor(email, "O e-mail é obrigatório.");
    } else if (!checkEmail(emailValue)) {
        setErrorFor(email, "Por favor, insira um e-mail válido.");
    } else {
        setSuccessFor(email);
    }

    if (passwordValue == "") {
        setErrorFor(password, "A senha é obrigatória.");
    } else if (passwordValue.length < 7) {
        setErrorFor(password, "A senha precisa ter no mínimo 7 caracteres.");
    } else {
        setSuccessFor(password);
    }

    if (passwordConfirmationValue == "") {
        setErrorFor(
            passwordConfirmation,
            "A confirmação de senha é obrigatória."
        );
    } else if (passwordConfirmationValue != passwordValue) {
        setErrorFor(passwordConfirmation, "A senhas não conferem.");
    } else {
        setSuccessFor(passwordConfirmation);
    }

    const formControls = form.querySelectorAll(".form-control");

    const formIsValid = [ ... formControls].every((formControl) => {
        return (formControl.className == "form-control success");
    });

    if (formIsValid) {
        console.log("O formulário está preenchido corretamente.")
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    // adiciona mensagem de erro
    small.innerText = message;

    // adiciona a classe de erro
    formControl.className = "form-control error";
}

function setSuccessFor(input) {
    const formControl = input.parentElement; // para retornar a div que é pai do input

    // adiciona a classe de sucesso
    formControl.className = "form-control success";
}

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
}
