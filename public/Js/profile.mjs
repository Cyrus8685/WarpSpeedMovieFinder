/* initiates socket on client side */
const socket = io("https://project-3-fiv4.onrender.com/");

/* add event listeners here */
const b = document.getElementById('firstUpdate');

const exampleEvent = async function () {

  // socket.emit triggers the 'example' socket on the server side
  socket.emit('connection2', 'User Info Update Sent!');
  socket.emit('example2', 'User Info Update Sent!');
  console.log("User Info Update Sent");
};

b.addEventListener('click', exampleEvent);

/* Add your socket listeners here! */
socket.on('clientSocketName2', data => {
  // any code here will execute when this socket is triggered
  Swal.fire({
    title: "Good job!",
    text: `${data}`,
    icon: "success"
  })
});

const c = document.getElementById('secondUpdate');

const exampleEvent2 = async function () {

  // socket.emit triggers the 'example' socket on the server side
  socket.emit('connection2', 'Password Update Sent!');
  socket.emit('example2', 'Password Update Sent!');
  console.log("Password Update Sent");
};

c.addEventListener('click', exampleEvent2);

/* Add your socket listeners here! */
socket.on('clientSocketName2', data => {
  // any code here will execute when this socket is triggered
  Swal.fire({
    title: "Good job!",
    text: `${data}`,
    icon: "success"
  })
});


socket.on('logged off', msg => {
  // any code here will execute when this socket is triggered
  // example, I could create a <p> tag with innerText containing the msg and append it to my <div id='app'>

console.log(msg);
});






var data = {};
                    console.log('select_link clicked');
    $.ajax('https://project-3-fiv4.onrender.com:10000/userinfo', {
        type: 'GET',
        data: JSON.stringify(data),
        contentType: 'application/json',					
        success: function () {
            data.username = document.getElementById('currentUsername').innerHTML,
            data.email = document.getElementById('currentEmail').innerHTML,
            console.log("User Info Obtained")
        },

    })