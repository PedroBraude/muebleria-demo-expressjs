const express = require('express');
const router =  express.Router();

const productos = [

];

router.get('/', (req, res,next) => {
    if(productos.length === 0){
        const error =  new Error("No existen productos")
        error.status = 400;
        return next(error)
    }
    res.status(200).json(productos);
});

router.post('/', (req, res,next) => {
        const traeAlgoElBody = req.body.precio || req.body.nombre;
    
        if (!traeAlgoElBody) { 
               const error = new Error('Campos vacíos(precio o nombre)');
               error.status = 400;               
               return next(error)
            } 
        
        const nuevoProducto = {
            id: productos.length + 1,
            nombre: req.body.nombre,
            precio: req.body.precio
        };
    
        productos.push(nuevoProducto);
        res.status(201).json(nuevoProducto);        
    
});

module.exports = router;