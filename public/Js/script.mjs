const logregBox = document.querySelector('.logreg-box');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click', () => {
    logregBox.classList.add('active');
});

loginLink.addEventListener('click', () => {
    logregBox.classList.remove('active');
});

/* initiates socket on client side */
const socket = io("https://project-3-fiv4.onrender.com");

/* Add your socket listeners here! */
socket.on('clientSocketName', data => {
  // any code here will execute when this socket is triggered
  Swal.fire({
    title: "Good job!",
    text: `${data}`,
    icon: "success"
  }),
  console.log("Registration Complete")
});

socket.on('Server Error', data => {
  // any code here will execute when this socket is triggered
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${data}`,
  });

  console.log("Server Error")
});

socket.on('Email Address Not Found', data => {
  // any code here will execute when this socket is triggered
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${data}`,
  });

  console.log("Email Address Not Found")
});

socket.on('Incorrect Password', data => {
  // any code here will execute when this socket is triggered
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${data}`,
  });

  console.log("Incorrect Password")
});

socket.on('Username Already Exists', data => {
  // any code here will execute when this socket is triggered
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${data}`,
  });

  console.log("Username Already Exists")
});

socket.on('Email Already Exists', data => {
  // any code here will execute when this socket is triggered
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${data}`,
  });

  console.log("Email Already Exists")
});

socket.on('Cannot Use Same Password', data => {
  // any code here will execute when this socket is triggered
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${data}`,
  });

  console.log("Cannot Use Same Password")
});

addEventListener("DOMContentLoaded", (event) => {
  const password = document.getElementById("password-input");
  const passwordAlert = document.getElementById("password-alert");
  const requirements = document.querySelectorAll(".requirements");
  const leng = document.querySelector(".leng");
  const bigLetter = document.querySelector(".big-letter");
  const num = document.querySelector(".num");
  const specialChar = document.querySelector(".special-char");

  requirements.forEach((element) => element.classList.add("wrong"));

  password.addEventListener("focus", () => {
      passwordAlert.classList.remove("d-none");
      if (!password.classList.contains("is-valid")) {
          password.classList.add("is-invalid");
      }
  });

  password.addEventListener("input", () => {
      const value = password.value;
      const isLengthValid = value.length >= 8;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*()\[\]{}\\|;:'",<.>/?`~]/.test(value);

      leng.classList.toggle("good", isLengthValid);
      leng.classList.toggle("wrong", !isLengthValid);
      bigLetter.classList.toggle("good", hasUpperCase);
      bigLetter.classList.toggle("wrong", !hasUpperCase);
      num.classList.toggle("good", hasNumber);
      num.classList.toggle("wrong", !hasNumber);
      specialChar.classList.toggle("good", hasSpecialChar);
      specialChar.classList.toggle("wrong", !hasSpecialChar);

      const isPasswordValid = isLengthValid && hasUpperCase && hasNumber && hasSpecialChar;

      if (isPasswordValid) {
          password.classList.remove("is-invalid");
          password.classList.add("is-valid");

          requirements.forEach((element) => {
              element.classList.remove("wrong");
              element.classList.add("good");
          });

          passwordAlert.classList.remove("alert-warning");
          passwordAlert.classList.add("alert-success");
      } else {
          password.classList.remove("is-valid");
          password.classList.add("is-invalid");

          passwordAlert.classList.add("alert-warning");
          passwordAlert.classList.remove("alert-success");
      }
  });

  password.addEventListener("blur", () => {
      passwordAlert.classList.add("d-none");
  });
});
setTimeout(function () {
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})  }, 545*1.33);

/*const baseUrl = 'http://localhost:4000'

async function postUser(e) {
                      input.value = data.info
                      e.preventDefault()
                      if (!input.value == '') {return}
              const res = await fetch(baseUrl + '/register',
                {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
          body: JSON.stringify (Input.value),					
        success: Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success"
          })
         })}
  /*
    Result:
    [API Error] {status: "failure", code: 401, message: "You are not authorized. Please read https://spoonacular.com/food-api/docs#Authentication"}
  */		

    // if there is a warning, show a sweet alert

    