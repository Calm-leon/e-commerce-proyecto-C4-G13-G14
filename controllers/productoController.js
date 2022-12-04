const Producto = require("../models/producto");
const Categoria = require("../models/categoria")

// req es lo que podemos leer desde postman
// res es lo que enviamos hacia postman

exports.leerProducto = async (req, res) => {
    try {
        const producto = await Producto.find();
        res.json({ producto });
    } catch (error) {
        console.log(error);
    }
};

exports.crearProducto = async (req, res) => {
    const { categoriaId } = req.body;
    console.log(categoriaId);

    try {
        const { categoriaEncontrada } = await Categoria.findById(categoriaId);
        
        if (!categoriaEncontrada) {
            return res.status(400).json({ msg: "Ingrese una categoría valida" });
        }

        const producto = new Producto(req.body);
        /*producto.categoriaId = req.categoria.id;*/
        await producto.save();
        res.json(producto);
    } catch (error) {
        console.log(error);
    }
};

exports.actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findById(id);

    if(!producto){
        return res.status(400).json({ msg: "producto no encontrado"});
    }

    /*if(producto.categoriaId.toString() !== req.categoria.id.toString()){
        return res.status(400).json({ msg: "acción no valida para este usuario"});
    }*/

    producto.nombre = req.body.nombre || producto.nombre;
    producto.descripcion = req.body.descripcion || producto.descripcion;
    producto.stock = req.body.stock || producto.stock;
    producto.precio = req.body.precio || producto.precio;
    producto.imagen = req.body.imagen || producto.imagen;
    producto.save();
    res.json({ Producto });
};

exports.borrarProducto = async (req, res) => {
    try {
        await Producto.deleteOne({ _id: req.params.id });
        res.json({ msg: "Producto eliminado" });
    } catch (error) {
        console.log(error);
    }
};