const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    database: "TravelApp",
    username: "Cyrus",
    password: process.env.DB_PW,
    host: "travel-application-users.czqk6e0s0vr8.us-east-2.rds.amazonaws.com",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
      }
    },
  });

module.exports = sequelize;