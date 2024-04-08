const express = require("express");
const app = express(); 
require("./conn/conn");
const auth = require("./routes/auth");
const list = require("./routes/list");
const cors = require("cors");
require("./conn/conn");

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("hello");
});

app.use("/api/v1",auth);
app.use("/api/v2",list);

app.listen(1000, () => {
    console.log("Servidor Lanzado");
});

