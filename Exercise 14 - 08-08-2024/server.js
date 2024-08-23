const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const BookRoutes = require("./Routing/BookRoutes");

const corsOptions = {
    origin: "http://127.0.0.1:5500",
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions))

app.use("/", BookRoutes);


(async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/libraryDB");
        console.log("Connected to Database");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch(err){
        console.log(err);
    }
})();