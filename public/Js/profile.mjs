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




$( document ).ready(function () {
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

    })});