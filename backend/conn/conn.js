const mongoose = require("mongoose");

const conn = async (req, res )=> {
   try {
    await mongoose
    .connect("mongodb+srv://dariel:1234@cluster0.odrzb1h.mongodb.net/")
    .then(() =>{
        console.log("connected");
    })
   } catch (error) {
    res.status(400).json({
        message: "No conectado",
        
    });
   }
};
conn();
