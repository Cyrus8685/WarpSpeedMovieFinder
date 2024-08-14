const express = require('express');
const mongoose = require('mongoose');
const User = require("./models/User.js");// Import User Model
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
var helmet = require('helmet');
const cookieParser = require("cookie-parser");

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
      origin: "https://project-3-fiv4.onrender.com",
      methods: ["GET", "POST", "PATCH"]
    }});
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 
app.use(cors());
app.use(helmet());
app.use(cookieParser());

mongoose
    .connect('mongodb+srv://Cyrus:39sRx9dFzpDX8PB5@warpspeed.6bimxtn.mongodb.net/?retryWrites=true&w=majority&appName=WarpSpeed')
    .then(() => {
        console.log("Database synced");
        http.listen(10000, () => console.log (`Server Listening on Port 10000`));
    })
    .catch(err => console.error("Error syncing database:", err));


//User Registration
app.post("/register", async function (req, res) {

         try {
            const { username, email, password } = req.body;
            console.log({ username, email, password })
        
            io.on('connection', socket => {
                // any code here will run upon the 'connection' event
                console.log(`user: ${socket.id} connected`);
                  });
            const currentEmail = await User.findOne({ where: { email } });
            if (currentEmail) {
                return res.status(204),
                io.emit('Email Already Exists', "Email Already Exists")
            }
        const currentUsername = await User.findOne({ where: { username } });
        if (currentUsername) {
            return res.status(204),
            io.emit('Username Already Exists', "Username Already Exists")
        }
        const hashedPassword = await bcrypt.hash(`${password}`, 10);
        await User.create({ username, email, password: hashedPassword });
  /* Add your listeners here! */
  /* Add your listeners here! */

  // create a listener using socket.on(eventName, callback)
        console.log ('Registration Complete!');
            const newData = "Registration Complete";
    
            // io.emit triggers listeners for all connected clients
        res.status(204);
        io.emit('clientSocketName', newData);
    } catch (error) {
        console.error('Error Registering User:', error);
        return res.status(204),
        io.emit('Server Error', "Server Error")
    }
})

//User Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(204),
            io.emit('Email Address Not Found', "Email Address Not Found")
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(204),
            io.emit('Incorrect Password', "Incorrect Password")
        }
        const token = jwt.sign({ userId: user.id }, process.env.DB_SECRET, { expiresIn: '1h' });
        process.env.User_ID = user.id
        console.log(token);
        console.log(process.env.User_ID);
        res.cookie('token', `Bearer ${token}`, { httpOnly: true });
        res.cookie('userid', `${user.id}`, { httpOnly: true });
        setTimeout(() => {
        res.status(204).redirect('/Html/profile.html');
    }, "2000");
    } catch (error) {
        return res.status(204),
        io.emit('Server Error', "Server Error")
    }
})

app.post('/update', verifyToken, async (req, res) => {
    
        try {

            const id = req.cookies.userid;
            const { username, email } = req.body;
            console.log(id);

            const currentUserInfo = await User.findOne({ where: { id } });
            console.log(currentUserInfo);
            console.log(currentUserInfo.email);
            console.log(currentUserInfo.username);
            if (currentUserInfo.username === username) {
                return res.status(204),
                io.emit('Username Already Exists', "Username Already Exists")
            };
            if (currentUserInfo.email === email) {
                    return res.status(204),
                    io.emit('Email Already Exists', "Email Already Exists")
                };
            var userId = { where : {id: id} };
            newUserData = { username, email };
            await User.update( newUserData, userId, {
                new: true,
                runValidators: true,
            });
          const newData = "User Information Updated";
          // io.emit triggers listeners for all connected clients
    res.status(204);
    io.emit('clientSocketName2', newData);
    console.log("User Information Updated");
}
catch (error) {
    return res.status(204),
    io.emit('Server Error', "Server Error")
}
})

app.post('/password', verifyToken, async (req, res) => {
    
        try {
            const { password, NewPassword } = req.body;
            const id = req.cookies.userid
            console.log(id);
            console.log({ password, NewPassword });
            const user = await User.findOne({ where: { id } });
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.status(204),
                io.emit('Incorrect Password', "Incorrect Password")
            };

            if (password === user.password) {
                return res.status(204),
                io.emit('Cannot Use Same Password', "Cannot Use Same Password")
            };
            const hashedPassword = await bcrypt.hash(`${NewPassword}`, 10);
            newUserData = { password:  hashedPassword };
            var userId = { where : {id: id} };
            await User.update( newUserData, userId, {
                new: true,
                runValidators: true,
            });
      const newData = "User Password Updated";
          // io.emit triggers listeners for all connected clients
    res.status(204);
    io.emit('clientSocketName3', newData);
    console.log("User Password Updated");
}
catch (error) {
    console.error('Error Registering User:', error);
    res.status(204);
    io.emit('Server Error', "Server Error")
}
})

app.get('/userinfo', verifyToken, async (req, res) => {
        
    try {
        const CookieId = req.cookies.userid
        user = {id: CookieId};
        const UserInfo = await User.findOne({ where: { user } });
        console.log(user);
        console.log(UserInfo);
        if (!UserInfo) {
            return res.status(404);
        }
        return res.status(204, UserInfo);
    
    }   catch (error) {
        console.error('Error Fetching User Info:', error);
        res.status(204);
        io.emit('Server Error', "Server Error")
    }
})

app.post('/deleteuser', verifyToken, async (req, res) => {
        
    try {
        const id = req.cookies.userid
        console.log(id);
        const user = await User.findOne({ where: { id } });
        console.log(user);
        await user.destroy();
        res.status(204).redirect('/index.html');
    
    }   catch (error) {
        console.error('Error Fetching User Info:', error);
        res.status(204);
        io.emit('Server Error', "Server Error")
    }
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: 'Access Denied'});
    } try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.DB_SECRET);
        req.user = decoded;
        next();
    }   catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Invalid Token' });
    }
}

// Protected route to get user info
