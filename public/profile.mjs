

var data = {};
                    console.log('select_link clicked');
    $.ajax('http://localhost:4000/userinfo', {
        type: 'GET',
        data: JSON.stringify(data),
        contentType: 'application/json',					
        success: function () {
            data.username = document.getElementById('currentUsername').innerHTML
            data.email = document.getElementById('currentEmail').innerHTML
            data.password = document.getElementById('currentPassword').innerHTML
        }

    })

    const firstUpdate = document.getElementById('firstUpdate');
    firstUpdate.addEventListener('click', (e) => {
    
    var data = {};
    data.username = `${regUsername}`;
    data.email = `${regEmail}`;
    data.password = `${regPassword}`;
                            e.preventDefault();
                        console.log('select_link clicked');
        $.ajax('http://localhost:4000/updateMe', {
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',					
            success: Swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "success"
              })
        });})
    
        const secondUpdate = document.getElementById('secondUpdate');
        secondUpdate.addEventListener('click', (e) => {
        
        var data = {};
        data.username = `${regUsername}`;
        data.email = `${regEmail}`;
        data.password = `${regPassword}`;
                                e.preventDefault();
                            console.log('select_link clicked');
            $.ajax('http://localhost:4000/updateMe', {
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',					
                success: Swal.fire({
                    title: "Good job!",
                    text: "You clicked the button!",
                    icon: "success"
                  })
            });})