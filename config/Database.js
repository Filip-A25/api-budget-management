require("dotenv").config();

const connection = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

const authenticateDatabase = (db) => {
    try {
        db.authenticate()
            .then(() => {
                console.log("Connection to database successfully established.");
            }).catch((err) => {
                console.log("Unable to connect to database: ", err);
            })
    } catch (err) {
        throw new Error(err);
    }
}

const closeDatabase = (db) => {
    try {
        db.close()
            .then(() => {
                console.log("Connection to database successfully closed.");
            }).catch((err) => {
                console.log("Unable to close database: " + err);
            }) 
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {authenticateDatabase, closeDatabase, connection};