const expres = require("express");
const connectToDb = require("./db.js");
const dotenv = require("dotenv")
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const propertyRoutes = require("./routes/propertyRoutes.js");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = expres();

connectToDb(process.env.MONGO_URI);


// routes and middlewares
app.use(cors());
app.use(expres.json());
app.use(expres.urlencoded({extended: true}));
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/properties", propertyRoutes);



PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server listening on Port: ${PORT}`));




