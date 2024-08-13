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

    