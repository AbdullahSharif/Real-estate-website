const mongoose = require("mongoose")

const connectToDb = (MongoURI) => {
    mongoose.connect(MongoURI, {useNewUrlParser: true, useUnifiedTopology: true}).then( () => console.log("connected to MongoDB"))
}

module.exports = connectToDb;