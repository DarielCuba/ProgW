const router = require('express').Router();
const User = require("../models/user");
const List = require("../models/list");


// create
router.post("/addTask", async (req, res) => {
    try {
        const {title, body, id} = req.body;
    const existingUser = await User.findById({id});
    if(existingUser){
        const list = new List({ title, body, user: existingUser});
        await list.save().then(() => res.status(200).json({list}));
        existingUser.list.push(list);
        existingUser.save();
    }
    } catch (error) {
        console.log(error);
    }
});

//update 
router.put("/updateTask/:id", async (req, res) => {
    try {
        const {title, body} = req.body;
        const list = await List.findByIdAndUpdate(req.params.id, {title, body});
        list.save().then(() => res.status(200).json({message: "Tarea actualizada"}));
    
         } catch (error) {
        console.log(error);
    }
});

//delete
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const { id } = req.params; 
        const existingUser = await User.findByIdAndUpdate(id, { $pull: { list: req.params.id } });
        
        if (existingUser) {
            const deletedList = await List.findByIdAndDelete(req.params.id);
            
            if (deletedList) {
                return res.status(200).json({ message: "Tarea eliminada" });
            } else {
                return res.status(404).json({ message: "La tarea no se encontró" });
            }
        } else {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error al eliminar la tarea" });
    }
});

//get
router.get("/getTask/:id", async (req, res) => {
    const list = await List.find({user: req.params.id}).sort({createdAt: -1});
    if(list.length !== 0){
        res.status(200).json({list: list});
    }else{
        res.status(200).json({message: "No hay tareas"});
    }
})





module.exports = router;