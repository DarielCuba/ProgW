const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require("bcryptjs");

//Registrarse 
router.post("/register", async(req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashpassword = bcrypt.hashSync(password);
        const user = new User({email, username,password:hashpassword});
        await user.save().then(() => res.status(200).json({message: "Registrado correctamente"}));
    } catch (error) {
        res.status(200).json({message: "Ya existe el usuario"});
    }
});

//Sing IN
router.post("/signin", async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(200).json({message: "Debe registrarse primero"});
        }

        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!isPasswordCorrect){
            res.status(200).json({message: "La contraseña no es correcta"});
        }
        const { password, ...others} = user._doc;
        res.status(200).json({others});

    } catch (error) {
        res.status(200).json({message: "Ya existe el usuario"});
    }
});

module.exports = router;