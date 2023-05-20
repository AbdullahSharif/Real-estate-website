const expres = require("express");
const connectToDb = require("./db.js");
const dotenv = require("dotenv")
const cors = require("cors");

dotenv.config();
const app = expres();

app.use(cors());

connectToDb(process.env.MONGO_URI);

PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log(`Server listening on Port: ${PORT}`));




