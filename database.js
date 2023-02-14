const Sequelize = require('sequelize');
const config = require('./config');
// Connect to the MySQL database
const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Test the connection to the database
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;