const express = require('express');
const app = express();
const PORT = 4000;
const routerProductos = require('./controladores/rutas/productos') 

app.use(express.json());

app.use(logger)

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.get ('/',(req,res)=>{
    res.status(200).json({
        mensaje:"Bienvenido/a a la api Mueblería Jota",
        endpoints: ['GET /api/productos','POST /api/productos']
    })
})

app.use('/api/productos', routerProductos)

// Al final de nuestro servidor, antes del app listen
app.use((err,req,res,next)=>{
    console.log('2-El middleware captura el error',err.message)

    const statusCode = err.status || 500;

    res.status(statusCode).json({
        mensaje: err.message || 'Error interno del servidor',
        timestamp: new Date().toISOString()
    });
})

app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
});