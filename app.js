const express = require('express');
const sequelize = require('./db.js'); // Import Sequelize instance
const User = require("./models/User.js")(sequelize);// Import User Model
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
app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 
app.use(cors());
app.use(helmet());
app.use(cookieParser());

sequelize
    .sync()
    .then(() => {
        console.log("Database synced");
        http.listen(process.env.PORT, () => console.log (`Server Listening on Port ${process.env.PORT}`));
    })
    .catch(err => console.error("Error syncing database:", err));


//User Registration
app.post("/register", async function (req, res) {

    io.on('connection', socket => {
        // any code here will run upon the 'connection' event
        console.log(`user: ${socket.id} connected`);
          })

    try {
        const { username, email, password } = req.body;
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
        res.status(500).json({ message: 'Server Error' });
    }
});

//User Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid Credentials '});
        }
        const token = jwt.sign({ userId: user.id }, process.env.DB_SECRET, { expiresIn: '1h' });
        res.cookie('token', `Bearer ${token}`, { httpOnly: true });
        res.redirect('/Html/profile.html');
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server Error'});
    }
});

app.post('/update', verifyToken, async (req, res) => {
    
    try {
    const { username, email } = req.body;
    newUserData = { username, email};
    var userId = { where : {id: req.user.userId} }; 
    await User.update( newUserData, userId, {
        new: true,
        runValidators: true,
    });
          const newData = "User Information Updated";
          // io.emit triggers listeners for all connected clients
    res.status(200).json({status: "succes", results: {newUserData}});
    io.emit('clientSocketName2', newData);
    console.log("User Information Updated");
}
catch (error) {
    console.error('Error Registering User:', error);
    res.status(500).json({ message: 'Server Error' });
}
});

app.patch('/password', verifyToken, async (req, res) => {
    
    try {
    const { CurrentPassword, NewPassword } = req.body;
    const isPasswordMatch = await bcrypt.compare(CurrentPassword, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid Password'});
    }
    newUserData = { NewPassword };
    var userId = { where : {id: req.user.userId} }; 
    await User.update( newUserData, userId, {
        new: true,
        runValidators: true,
    });
      const newData = "User Password Updated";
          // io.emit triggers listeners for all connected clients
    res.status(200).json({status: "succes", results: {newUserData}});
    io.emit('clientSocketName3', newData);
    console.log("User Information Updated");
}
catch (error) {
    console.error('Error Registering User:', error);
    res.status(500).json({ message: 'Server Error' });
}
});

app.get('/userinfo', verifyToken, async (req, res) => {
    try {
        const data = await User.findOne(req.user.userId);
        if (!data) {
            return res.status(404).json({ message: 'User Not Found'});
        }
        return res.status({data});
    }   catch (error) {
        console.error('Error Fetching User Info:', error);
        res.status(500).json({ message: 'Server Error'});
    }
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.cookies.token
    console.log(token);
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
