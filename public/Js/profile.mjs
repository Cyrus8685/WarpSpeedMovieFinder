/* initiates socket on client side */
const socket = io("https://project-3-fiv4.onrender.com/");

/* Add your socket listeners here! */
socket.on('clientSocketName2', data => {
  // any code here will execute when this socket is triggered
  Swal.fire({
    title: "Good job!",
    text: `${data}`,
    icon: "success"
  })
});

/* Add your socket listeners here! */
socket.on('clientSocketName3', data => {
  // any code here will execute when this socket is triggered
  Swal.fire({
    title: "Good job!",
    text: `${data}`,
    icon: "success"
  })
});

socket.on('Username Already Exists', data => {
  // any code here will execute when this socket is triggered
  Swal.fire({

    icon: "error",
    title: "Oops...",
    text: `${data}`
}),

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

var data = {};
    fetch('/userinfo', {
        type: 'GET',
        body: {        
          "userid": req.cookies.userid,
          "iat": 1707012086,
          "exp": 1707015686
        },
        data: JSON.stringify(data),
        contentType: 'application/json',					
        success: function () {
          data.username = document.getElementById('currentUsername').innerHTML,
          data.email = document.getElementById('currentEmail').innerHTML,
          console.log("User Information Retrieved")
      }

    })