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

var connectionOptions = {

  "force new connection": true,
  "reconnectionAttempts": "infinity",
  "timeout": 10000,
  "transports": ["websocket"]
  };
  const socket = io("https://project-3-iax3.onrender.com:4000", connectionOptions);

/* add event listeners here */
const b = document.getElementById('regButton');

const exampleEvent = async function () {

  // socket.emit triggers the 'example' socket on the server side
  socket.emit('connection', 'Connection Sent!');
  socket.emit('example', 'Registration Sent!');
};

b.addEventListener('click', exampleEvent);

/* Add your socket listeners here! */
socket.on('clientSocketName', data => {
  // any code here will execute when this socket is triggered
  Swal.fire({
    title: "Good job!",
    text: `${data}`,
    icon: "success"
  }),
  console.log("Success")
});

socket.on('logged off', msg => {
  // any code here will execute when this socket is triggered
  // example, I could create a <p> tag with innerText containing the msg and append it to my <div id='app'>

console.log(msg);
});
console.log("Script Loaded");
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

    