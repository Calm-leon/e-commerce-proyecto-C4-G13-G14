const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

exports.crearUsuario = async (req, res) => {
    //console.log(req.body);
    const { password, email } = req.body;

    try{
        // Revisar que sea un único correo
        let usuario = await Usuario.findOne({ email });

        if (usuario){
            return res.status(400).json({ msg: " el usuario ya existe"})
        }

        // Crear un nuevo usuario
        usuario = new Usuario(req.body)

        // Hash
        usuario.password = await bcryptjs.hash(password, 10);

        // Guardar usuario en la bd
        const usuarioAlmacenado = await usuario.save();
        res.json(usuarioAlmacenado)

        }catch(error){
        console.log(error);
    }
};